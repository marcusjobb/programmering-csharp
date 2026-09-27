---
title: Konfigurera DbContext
description: "Anslutningssträng, provider och loggning hör hemma i Program.cs — inte hårdkodade i DbContext-klassen."
parent: Kontext
nav_order: 20
---
# Konfigurera DbContext

`DbContext` ska inte veta var databasen står eller vad den heter för sig själv — den ska få de uppgifterna utifrån. Det gör det möjligt att byta databas mellan utveckling, test och produktion utan att röra en rad kod.

## Anslutningssträngar i appsettings

```json
{
  "ConnectionStrings": {
    "SchoolConnection": "Server=localhost;Database=school;User Id=sa;Password=P@ssword;"
  }
}
```

```csharp
builder.Services.AddDbContext<SchoolContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("SchoolConnection");
    options.UseSqlServer(connectionString);
});
```

Byt provider genom att byta metod — `UseSqlite`, `UseSqlServer`, `UseMySql`, `UseNpgsql` — och byt databas genom att byta strängen i konfigurationen. Koden rör du aldrig.

## OnConfiguring — bara som nödfallback

`OnConfiguring` finns kvar av bakåtkompatibilitetsskäl och är bekväm i småtestkonsoller, men i en riktig applikation ska DI:n redan ha konfigurerat kontexten innan den når hit:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    if (!optionsBuilder.IsConfigured)
    {
        optionsBuilder.UseSqlite("Data Source=school.db");
    }
}
```

`IsConfigured`-kollen är poängen — utan den skriver du av misstag över det DI redan satt upp.

## Bygga modellen i OnModelCreating

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Student>()
        .HasIndex(s => s.Email)
        .IsUnique();

    modelBuilder.Entity<Course>()
        .Property(c => c.Name)
        .HasMaxLength(120);

    modelBuilder.Entity<Student>().HasData(
        new Student { Id = 1, Name = "Ada Lovelace" }
    );
}
```

Index, textlängder, relationer och seed-data hör hemma här — allt du sätter i modellen blir en del av nästa migration.

## Loggning och diagnostik

```csharp
optionsBuilder
    .LogTo(Console.WriteLine, LogLevel.Information)
    .EnableSensitiveDataLogging(builder.Environment.IsDevelopment());
```

`LogTo` visar dig den genererade SQL:en när du felsöker en LINQ-fråga som inte gör vad du väntade dig. `EnableSensitiveDataLogging` skriver ut parametervärden i klartext i loggen — bra under utveckling, en läcka du inte vill ha i produktion. Villkora den mot miljön, som ovan.

## Flera databaser i samma app

```csharp
builder.Services.AddDbContext<ReportContext>(options =>
    options.UseMySql(reportConnection, new MySqlServerVersion(new Version(8, 0, 36))));

builder.Services.AddDbContext<AppContext>(options =>
    options.UseSqlServer(appConnection));
```

En kontext per databas, injicerad där den behövs. Låt aldrig en kontext försöka prata med en databas den inte äger.

## Obligatorisk dad-joke

Varför är DbContext så bra på gym?

Den har alltid koll på sin egen konfiguration.
