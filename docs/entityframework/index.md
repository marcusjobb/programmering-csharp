---
title: Entity Framework
description: "Entity Framework Core är ORM:en som låter dig prata med databasen genom vanliga C#-objekt istället för SQL-strängar."
parent: C# bok
nav_order: 110
has_children: True
---
# Entity Framework

Utan ORM ser databaskod ofta ut som en vägg av SQL-strängar, parametrar du måste komma ihåg att escapa, och manuell mappning mellan kolumner och properties. Entity Framework Core löser det genom att låta dig jobba med vanliga klasser och LINQ — och sköta SQL:en, mappningen och relationerna åt dig.

```csharp
var activeStudents = context.Students
    .Where(s => s.IsActive)
    .OrderBy(s => s.Name)
    .ToList();
```

Ingen SQL i sikte. Bara ett filter och en sortering, uttryckta i C#.

## När du läst detta ska du kunna

- Förklara vad ett ORM gör och varför Entity Framework Core finns
- Sätta upp en `DbContext` och registrera den korrekt via DI
- Veta när EF Core är rätt verktyg — och när ren SQL vinner

## Fördelar

- **Mindre repetitiv kod** — inga handskrivna `SELECT`/`INSERT`-strängar för varje tabell.
- **Objektorienterat** — dina klasser *är* modellen, inte en separat mappningsfil.
- **Migrationer** — databasstrukturen versionshanteras i kod, se [Migrationer](migrationer.md).
- **Databasoberoende** — samma kod fungerar mot SQL Server, SQLite, MySQL eller Postgres, bara providern byts.

## Begränsningar

EF Core abstraherar bort SQL, och det har ett pris: en viss prestandaöverhead jämfört med handskriven SQL, och vid riktigt komplexa frågor (djupa joins, fönsterfunktioner, rapporter) kan ren SQL fortfarande vara det tydligare och snabbare valet. Se [Prestanda](performance.md) för de vanligaste fällorna.

## Kom igång

```csharp
public class SchoolContext : DbContext
{
    public SchoolContext(DbContextOptions<SchoolContext> options) : base(options) { }

    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Courses { get; set; }
}
```

```csharp
// Program.cs
builder.Services.AddDbContext<SchoolContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SchoolConnection")));
```

Kontexten konfigureras utifrån via DI — den ska aldrig hårdkoda en anslutningssträng i sig själv. Fortsätt till [Kontext](kontext/index.md) för hela resonemanget.

## Nästa steg

- [Kontext](kontext/index.md) — vad en `DbContext` är, hur den konfigureras och hur länge den ska leva
- [Entiteter](entiteter.md) — modellera dina tabeller som klasser
- [Relationer](relationer.md) — 1:1, 1:M och M:M
- [Migrationer](migrationer.md) — versionshantera databasstrukturen
- [Seeding](seeding.md) — få in testdata utan att skriva INSERT-satser för hand
- [LINQ-frågor](linq-queries.md) — hämta data utan att skriva SQL
- [Prestanda](performance.md) — N+1-problemet, tracking och när du ska gå runt EF helt

## Obligatorisk dad-joke

Varför är Entity Framework så populärt på fester?

Det är experten på att hantera relationer.
