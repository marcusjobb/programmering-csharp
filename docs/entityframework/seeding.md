---
title: Seeding
description: "Förifylld databas utan att skriva INSERT-satser för hand — via migrationer, en startup-rutin, eller genererad testdata med Bogus."
parent: Entity Framework
nav_order: 42
---
# Seeding

En tom databas är svår att utveckla mot. Seeding fyller den med startdata innan du behöver den — grundroller och statusvärden i produktion, realistisk testdata i utveckling, konsistenta rader för dina tester. EF Core ger dig två huvudvägar dit: `HasData()` i migrationerna, eller en egen initieringsrutin vid appstart.

## När du läst detta ska du kunna

- Seeda statisk data via `HasData()` så den blir en del av migrationshistoriken
- Seeda dynamiskt vid appstart när `HasData()` blir för stelbent
- Välja rätt metod beroende på om datan är fast eller ska kunna ändras
- Undvika de vanligaste seeding-buggarna

## HasData() i OnModelCreating

Den vanligaste vägen — datan blir en del av migrationen:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Student>().HasData(
        new Student { Id = 1, Name = "Ada Lovelace", Email = "ada@example.com" },
        new Student { Id = 2, Name = "Grace Hopper", Email = "grace@example.com" },
        new Student { Id = 3, Name = "Margaret Hamilton", Email = "margaret@example.com" }
    );
}
```

Kör `dotnet ef migrations add SeedData` och `dotnet ef database update` — studenterna finns i databasen. Notera att du **måste** sätta `Id` manuellt; `HasData()` kan inte förlita sig på auto-increment.

## Seeda relationer

En-till-många är rakt fram — sätt bara foreign key direkt i seed-datan:

```csharp
modelBuilder.Entity<Teacher>().HasData(
    new Teacher { Id = 1, Name = "Professor Smith" },
    new Teacher { Id = 2, Name = "Dr. Johnson" }
);

modelBuilder.Entity<Student>().HasData(
    new Student { Id = 1, Name = "Ada", TeacherId = 1 },
    new Student { Id = 2, Name = "Grace", TeacherId = 1 },
    new Student { Id = 3, Name = "Margaret", TeacherId = 2 }
);
```

Många-till-många kräver att du seedar kopplingstabellen separat, och property-namnen måste matcha exakt vad EF Core genererat:

```csharp
modelBuilder.Entity("CourseStudent").HasData(
    new { CoursesId = 1, StudentsId = 1 },
    new { CoursesId = 2, StudentsId = 1 },
    new { CoursesId = 1, StudentsId = 2 }
);
```

Har du en egen kopplingsklass (se [Relationer](relationer.md#explicit-join-entitet--när-kopplingen-bär-egen-data)), seedar du den som en vanlig entitet:

```csharp
modelBuilder.Entity<Enrollment>().HasData(
    new Enrollment { StudentId = 1, CourseId = 1, EnrollmentDate = new DateTime(2025, 1, 15) }
);
```

## Seeda från fil

```csharp
using System.Text.Json;

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    var jsonData = File.ReadAllText("SeedData/students.json");
    var students = JsonSerializer.Deserialize<List<Student>>(jsonData);

    if (students != null)
    {
        modelBuilder.Entity<Student>().HasData(students);
    }
}
```

Praktiskt när seed-datan är omfattande nog att du inte vill ha den hårdkodad i C#-filen.

## Dynamisk seeding vid appstart

`HasData()` är stelbent — fasta Id:n, svårt att uppdatera, växande migrationsfiler. Behöver du logik, slumpdata eller enklare uppdateringar, seeda istället i en initieringsrutin som körs när appen startar:

```csharp
public static class DbInitializer
{
    public static void Initialize(SchoolContext context)
    {
        context.Database.Migrate();          // kör väntande migrationer, inte EnsureCreated()

        if (context.Students.Any())
        {
            return;                          // redan seedad
        }

        context.Students.AddRange(
            new Student { Name = "Ada", Email = "ada@example.com" },
            new Student { Name = "Grace", Email = "grace@example.com" }
        );
        context.SaveChanges();
    }
}
```

```csharp
// Program.cs
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SchoolContext>();
    DbInitializer.Initialize(context);
}
```

**En riktig fälla här:** `context.Database.EnsureCreated()` skapar databasen direkt från din modell och struntar helt i migrationshistoriken. Blandar du den med `dotnet ef migrations`, hamnar din databas och dina migrationer i otakt utan att något klagar — förrän dagen du behöver köra en migration på riktigt. Använd `Migrate()`, inte `EnsureCreated()`, så fort du redan har migrationer i projektet.

## Generera realistisk testdata med Bogus

```bash
dotnet add package Bogus
```

```csharp
using Bogus;

var studentFaker = new Faker<Student>()
    .RuleFor(s => s.Name, f => f.Name.FullName())
    .RuleFor(s => s.Email, f => f.Internet.Email())
    .RuleFor(s => s.City, f => f.Address.City());

var students = studentFaker.Generate(100);
context.Students.AddRange(students);
context.SaveChanges();
```

Hundra rimligt trovärdiga studenter, utan att du skrivit ett enda påhittat namn själv.

## Seeda olika beroende på miljö

```csharp
public static void Initialize(SchoolContext context, IWebHostEnvironment env)
{
    context.Database.Migrate();
    if (context.Students.Any()) return;

    if (env.IsDevelopment())
    {
        context.Students.AddRange(GenerateFakeStudents(1000));   // mycket data att jobba mot
    }
    else
    {
        context.Students.Add(new Student { Name = "Admin", Email = "admin@school.com", IsAdmin = true });
    }

    context.SaveChanges();
}
```

## HasData eller DbInitializer?

| | `HasData()` | `DbInitializer` |
|---|---|---|
| Versionshanterad | Ja, via migrationer | Nej |
| Körs automatiskt i CI/CD | Ja | Nej — måste anropas manuellt |
| Kan använda logik/slump | Nej | Ja |
| Passar | Fast data som inte ändras: roller, statusvärden | Testdata, miljöberoende data, stora dataset |

Tumregel: **grunddata som aldrig ändras** (roller, kategorier, statuskoder) går i `HasData()`. **Allt som är dynamiskt, slumpat eller miljöspecifikt** går i en initieringsrutin.

## Vanliga fallgropar

**Glömt `Id` i `HasData()`** — utan explicit `Id` vet EF Core inte vilken rad den seedar, och migrationen misslyckas eller beter sig oväntat.

**Seeda utan att kolla om datan redan finns** — kör din `DbInitializer` en gång till utan `if (context.Students.Any()) return;` och du får dubbletter, eller en krasch på ett unikt index.

**Fel property-namn i många-till-många-seeding** — `CourseId`/`StudentId` ser rimligt ut, men EF Core:s genererade kopplingstabell heter oftast `CoursesId`/`StudentsId` (pluralformen av navigation-propertyn). Kontrollera det exakta namnet innan du seedar, annars misslyckas migrationen tyst eller med ett förvirrande felmeddelande.

## Obligatorisk dad-joke

Varför är databasutvecklare så bra trädgårdsmästare?

De vet exakt hur man planterar rätt data i rätt tabell.
