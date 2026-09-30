---
title: Kontext
description: "DbContext är porten mellan din kod och databasen — en klass som representerar dina tabeller som samlingar av vanliga C#-objekt."
parent: Entity Framework
nav_order: 20
has_children: True
---
# Kontext

En `DbContext` är klassen som håller ihop hela din databas i kod. Varje `DbSet<T>` på den motsvarar en tabell, och varje entitet — en vanlig klass med properties som matchar kolumnerna — motsvarar en rad.

```csharp
public class SchoolContext : DbContext
{
    public SchoolContext(DbContextOptions<SchoolContext> options) : base(options) { }

    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Courses { get; set; }
}
```

Notera konstruktorn: kontexten tar emot sina `DbContextOptions` utifrån, via beroendeinjektion — den konfigurerar inte sig själv. Anslutningssträng, provider (SQL Server, SQLite, MySQL, …) och loggning sätts på ett ställe, i `Program.cs`, inte hårdkodat i klassen. Se [Konfigurera DbContext](konfiguration/) för hur det ser ut i praktiken, och [DbContext-livscykeln](livscykel/) för hur länge en instans ska leva och varför det spelar roll.

## När du läst detta ska du kunna

- Förklara vad en `DbContext` och en `DbSet<T>` gör
- Skapa en egen kontext med konstruktorinjicerade `DbContextOptions`
- Veta var konfiguration och livscykelhantering hör hemma (och varför inte i kontexten själv)

## Obligatorisk dad-joke

Varför gick DbContext till terapeuten?

Den hade svårt att släppa relationer den borde ha stängt för länge sedan.
