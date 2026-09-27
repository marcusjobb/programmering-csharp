---
title: Relationer
description: "En-till-en, en-till-många, många-till-många — hur EF Core kopplar ihop tabeller via navigation properties, och vad som händer när du raderar en av dem."
parent: Entity Framework
nav_order: 28
---
# Relationer

Relationer är det som gör en samling tabeller till en databas — utan dem har du bara isolerade listor. EF Core stödjer tre typer: en-till-en, en-till-många och många-till-många, och känner ofta igen dem automatiskt via konvention.

## När du läst detta ska du kunna

- Modellera alla tre relationstyperna med navigation properties
- Konfigurera relationer explicit när konventionen inte räcker
- Välja rätt delete behavior för din situation
- Undvika cirkulära referenser vid JSON-serialisering

## En-till-många

Den vanligaste relationen. En lärare har många studenter, men varje student har bara en klassföreståndare:

```csharp
public class Teacher
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public List<Student> Students { get; set; } = new();   // collection navigation
}

public class Student
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public int TeacherId { get; set; }                     // foreign key
    public Teacher? Teacher { get; set; }                  // reference navigation
}
```

EF Core skapar automatiskt en foreign key `TeacherId` i `Students`-tabellen — ingen extra konfiguration behövs.

## En-till-en

Varje student har exakt ett studentkort:

```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public StudentCard? Card { get; set; }
}

public class StudentCard
{
    public int Id { get; set; }
    public string CardNumber { get; set; } = string.Empty;

    public int StudentId { get; set; }
    public Student? Student { get; set; }
}
```

## Många-till-många

Studenter går flera kurser, kurser har många studenter:

```csharp
public class Student
{
    public int Id { get; set; }
    public List<Course> Courses { get; set; } = new();
}

public class Course
{
    public int Id { get; set; }
    public List<Student> Students { get; set; } = new();
}
```

Två collections som pekar på varandra räcker — EF Core skapar en kopplingstabell (`CourseStudent`) med båda foreign keys automatiskt.

## Konfigurera relationer

EF Core känner igen relationer via konvention: en property som heter `<Klassnamn>Id` blir en foreign key, en collection-property blir en-till-många, en enskild referens blir en-till-en, och två collections som pekar på varandra blir många-till-många.

När konventionen inte räcker, styr det explicit — via attribut:

```csharp
public class Student
{
    [ForeignKey("Teacher")]
    public int SupervisorId { get; set; }
    public Teacher? Teacher { get; set; }
}
```

eller via Fluent API, för full kontroll:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Teacher>()
        .HasMany(t => t.Students)
        .WithOne(s => s.Teacher)
        .HasForeignKey(s => s.TeacherId)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<Student>()
        .HasOne(s => s.Card)
        .WithOne(c => c.Student)
        .HasForeignKey<StudentCard>(c => c.StudentId);

    modelBuilder.Entity<Student>()
        .HasMany(s => s.Courses)
        .WithMany(c => c.Students)
        .UsingEntity(j => j.ToTable("StudentCourses"));
}
```

## Delete behaviors

Vad ska hända med studenterna när deras lärare raderas? Det är inte en retorisk fråga — EF Core tvingar dig att bestämma:

| Behavior | Vad händer |
|----------|-------------|
| `Cascade` | De relaterade raderna raderas också |
| `Restrict` | Raderingen nekas om relaterade rader finns |
| `SetNull` | Foreign key sätts till `null` |
| `NoAction` | Inget görs på ORM-nivå — kan ge databasfel |

```csharp
// Radera studenter när läraren tas bort
modelBuilder.Entity<Teacher>()
    .HasMany(t => t.Students)
    .WithOne(s => s.Teacher)
    .OnDelete(DeleteBehavior.Cascade);

// Neka radering av en kurs som fortfarande har registrerade studenter
modelBuilder.Entity<Course>()
    .HasMany(c => c.Enrollments)
    .WithOne(e => e.Course)
    .OnDelete(DeleteBehavior.Restrict);
```

`Cascade` är bekvämt men farligt att sätta reflexmässigt — tänk igenom vad som faktiskt ska försvinna innan du väljer det.

## Självrefererande relationer

En entitet kan peka på sin egen typ — en klassisk chef/underordnad-struktur:

```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public int? ManagerId { get; set; }
    public Employee? Manager { get; set; }
    public List<Employee> Subordinates { get; set; } = new();
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Employee>()
        .HasOne(e => e.Manager)
        .WithMany(e => e.Subordinates)
        .HasForeignKey(e => e.ManagerId)
        .OnDelete(DeleteBehavior.Restrict);   // en VD ska inte kunna radera hela företaget
}
```

## Explicit join-entitet — när kopplingen bär egen data

En ren många-till-många-tabell räcker inte om kopplingen själv har data, som ett betyg eller ett registreringsdatum:

```csharp
public class Enrollment
{
    public int StudentId { get; set; }
    public Student Student { get; set; } = null!;

    public int CourseId { get; set; }
    public Course Course { get; set; } = null!;

    public DateTime EnrollmentDate { get; set; }
    public int? Grade { get; set; }
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Enrollment>()
        .HasKey(e => new { e.StudentId, e.CourseId });

    modelBuilder.Entity<Enrollment>()
        .HasOne(e => e.Student)
        .WithMany(s => s.Enrollments)
        .HasForeignKey(e => e.StudentId);

    modelBuilder.Entity<Enrollment>()
        .HasOne(e => e.Course)
        .WithMany(c => c.Enrollments)
        .HasForeignKey(e => e.CourseId);
}
```

Hur du sedan hämtar relaterad data effektivt — `Include`, projektion, och varför "glömma ladda relationen" och "ladda för mycket" är samma fälla i olika riktningar — täcks i [Prestanda](performance.md).

## Vanlig fallgrop: cirkulära referenser vid JSON-serialisering

En `Teacher` med en lista av `Student`, där varje `Student` pekar tillbaka på sin `Teacher`, blir en oändlig loop för en JSON-serializer:

```csharp
// Krockar vid serialisering: Teacher → Students → Teacher → Students → ...
public class Student
{
    public Teacher Teacher { get; set; } = null!;
}
```

Bryt loopen med `[JsonIgnore]` på den sida du inte behöver i just det svaret, eller — bättre i en riktig API — mappa till en DTO som bara innehåller det klienten faktiskt ska se.

## Obligatorisk dad-joke

Varför var många-till-många-relationen så eftertraktad på festen?

Den kunde koppla upp sig med precis vem som helst.
