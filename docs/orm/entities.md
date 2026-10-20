---
title: Entiteter
description: "En entitet är bara en vanlig C#-klass — men properties den har blir kolumner, och varje instans blir en rad."
parent: Entity Framework
nav_order: 25
---
# Entiteter

En entitet är en vanlig C#-klass som EF Core mappar till en tabell. Properties blir kolumner, en instans blir en rad, och navigation properties beskriver relationerna till andra entiteter.

```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime EnrollmentDate { get; set; }
}
```

`Student` blir en tabell med fyra kolumner: `Id`, `Name`, `Email`, `EnrollmentDate`. Ingen mappningsfil, inget XML — klassen är modellen.

## När du läst detta ska du kunna

- Skapa entiteter som EF Core kan mappa automatiskt
- Styra mappningen med Data Annotations eller Fluent API när konventionen inte räcker
- Undvika de vanligaste fallgroparna med collections, records och strängkolumner

## Primärnycklar

EF Core känner automatiskt igen en primärnyckel om propertyn heter `Id` eller `<Klassnamn>Id`:

```csharp
public class Student
{
    public int Id { get; set; }          // Känns igen som PK
}

public class Course
{
    public int CourseId { get; set; }    // Känns igen som PK
}
```

Vill du bryta konventionen, konfigurera det explicit:

```csharp
public class Student
{
    [Key]
    public int StudentNumber { get; set; }
}
```

## Datatyper och mappning

EF Core mappar C#-typer till SQL-typer automatiskt, men typerna skiljer sig mellan providers:

| C#-typ | SQL Server | SQLite | MySQL |
|--------|-----------|---------|-------|
| `int` | `INT` | `INTEGER` | `INT` |
| `long` | `BIGINT` | `INTEGER` | `BIGINT` |
| `string` | `NVARCHAR(MAX)` | `TEXT` | `LONGTEXT` |
| `bool` | `BIT` | `INTEGER` | `TINYINT(1)` |
| `DateTime` | `DATETIME2` | `TEXT` | `DATETIME` |
| `decimal` | `DECIMAL(18,2)` | `TEXT` | `DECIMAL(18,2)` |
| `byte[]` | `VARBINARY(MAX)` | `BLOB` | `LONGBLOB` |

## Data Annotations

Attribut styr hur en property mappas, utan att du behöver röra `OnModelCreating`:

```csharp
using System.ComponentModel.DataAnnotations;

public class Student
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;
}
```

```csharp
public class Product
{
    public int Id { get; set; }

    [StringLength(200, MinimumLength = 3)]
    public string Name { get; set; } = string.Empty;

    [Range(0, double.MaxValue)]
    public decimal Price { get; set; }
}
```

`[Table]` och `[Column]` byter namn om databasen redan har en egen namnkonvention att följa:

```csharp
[Table("tbl_Students")]
public class Student
{
    [Column("student_id")]
    public int Id { get; set; }

    [Column("full_name", TypeName = "nvarchar(200)")]
    public string Name { get; set; } = string.Empty;
}
```

## Fluent API — när attribut inte räcker

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Student>(entity =>
    {
        entity.ToTable("Students");
        entity.HasKey(s => s.Id);

        entity.Property(s => s.Name)
            .IsRequired()
            .HasMaxLength(100);

        entity.HasIndex(s => s.Email)
            .IsUnique();

        entity.Property(s => s.EnrollmentDate)
            .HasDefaultValueSql("GETDATE()");
    });
}
```

Fluent API vinner när du behöver villkor, sammansatta index eller regler som inte uttrycks som ett enkelt attribut.

## Beräknade properties och shadow properties

En property markerad `[NotMapped]` finns bara i C#, aldrig i databasen:

```csharp
public class Student
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    [NotMapped]
    public string FullName => $"{FirstName} {LastName}";
}
```

Omvänt kan en *shadow property* finnas i databasen utan att synas i klassen — praktiskt för metadata du inte vill blanda in i domänmodellen:

```csharp
modelBuilder.Entity<Student>()
    .Property<DateTime>("CreatedDate");

// Sätts via ChangeTracker, inte som en vanlig property
db.Entry(student).Property("CreatedDate").CurrentValue = DateTime.Now;
```

## Value objects

Ett värdeobjekt utan egen tabell kapslas in med `OwnsOne`:

```csharp
public class Address
{
    public string Street { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
}

public class Student
{
    public int Id { get; set; }
    public Address Address { get; set; } = new();
}

modelBuilder.Entity<Student>()
    .OwnsOne(s => s.Address);
```

Kolumnerna för `Street`, `City` och `ZipCode` hamnar direkt i `Students`-tabellen — ingen separat `Address`-tabell skapas.

## Enums

```csharp
public enum StudentStatus
{
    Active,
    Inactive,
    Graduated,
    Suspended
}
```

Sparas som `int` per default. Vill du kunna läsa databasen utan att slå upp enum-värdet, spara den som text istället:

```csharp
modelBuilder.Entity<Student>()
    .Property(s => s.Status)
    .HasConversion<string>();
```

## Modern C# i entiteter

```csharp
public class Student
{
    public int Id { get; set; }
    public required string Name { get; set; }        // C# 11: måste sättas vid skapande
    public string? MiddleName { get; set; }            // nullable — får saknas
    public List<Course> Courses { get; set; } = new(); // aldrig null, alltid en tom lista
}
```

`required` fångar ett glömt fält vid kompilering istället för en null-krasch i produktion. Nullable reference types (`string?`) gör explicit vad som faktiskt får saknas. Initierade collections slår undan en av de vanligaste `NullReferenceException`-källorna i EF-kod.

## Vanliga fallgropar

**Oinitierade collections** — glöm `= new()` och första `Courses.Add(...)` kraschar med null reference, långt innan du ens hunnit till databasen.

**`record` istället för `class`** — records fungerar tekniskt som entiteter, men deras värdesemantik krockar med hur EF Core:s change tracker identifierar objekt. Håll dig till `class` för entiteter.

**Strängar utan `MaxLength`** — en `string`-property utan gräns blir `NVARCHAR(MAX)` i SQL Server, vilket kostar dig indexering och prestanda du inte behövde ge upp. Sätt en rimlig gräns även när du inte tror att den behövs.

## Obligatorisk dad-joke

Varför blev entiteten inbjuden till alla fester?

Den hade äkta, garanterade properties — inga fejkade.
