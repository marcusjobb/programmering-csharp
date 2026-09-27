---
title: Övning — Code-First dagbok
description: "Bygg en liten konsol-dagbok från grunden: modell, DbContext, migration och en meny som läser och skriver via EF Core."
parent: Entity Framework
nav_order: 50
---
# Övning — Code-First dagbok

En dagboksapp i konsolen: skriv ett inlägg, se dina tidigare inlägg, allt sparat i en riktig databas. Ingen webbserver, inget UI-krångel — bara modellen, kontexten och en meny, vilket gör den perfekt för att öva Code-First-flödet från noll.

**Code-First** betyder att du skriver C#-klasserna först och låter EF Core generera databasschemat från dem, via migrationer. Motsatsen — **Database-first** — går åt andra hållet: du har redan en databas och genererar C#-klasserna från den. I den här övningen kör vi Code-First.

## Förutsättningar

- .NET SDK installerat
- `Microsoft.EntityFrameworkCore.Sqlite` och `Microsoft.EntityFrameworkCore.Design`

```bash
dotnet new console -n DiaryApp
cd DiaryApp
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
```

## Steg 1: Modellen

`DiaryEntry.cs`:

```csharp
using System.ComponentModel.DataAnnotations;

public class DiaryEntry
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    public string Content { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
```

## Steg 2: DbContext

`DiaryContext.cs` — kontexten tar emot sina options utifrån, den konfigurerar inte sig själv (se [Kontext](kontext/index.md)):

```csharp
using Microsoft.EntityFrameworkCore;

public class DiaryContext : DbContext
{
    public DiaryContext(DbContextOptions<DiaryContext> options) : base(options) { }

    public DbSet<DiaryEntry> DiaryEntries { get; set; }
}
```

## Steg 3: Skapa migrationen

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Se [Migrationer](migrationer.md) om kommandona känns nya.

## Steg 4: Program.cs

Ingen ASP.NET-server behövs för en DI-container — `ServiceCollection` räcker för en konsolapp:

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();
services.AddDbContext<DiaryContext>(options =>
    options.UseSqlite("Data Source=diary.db"));

using var provider = services.BuildServiceProvider();
using var scope = provider.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<DiaryContext>();

while (true)
{
    Console.WriteLine();
    Console.WriteLine("1. Visa alla inlägg");
    Console.WriteLine("2. Skriv ett nytt inlägg");
    Console.WriteLine("0. Avsluta");

    switch (Console.ReadLine())
    {
        case "1":
            await ShowAllEntriesAsync(context);
            break;
        case "2":
            await CreateNewEntryAsync(context);
            break;
        case "0":
            return;
        default:
            Console.WriteLine("Ogiltigt val.");
            break;
    }
}

static async Task ShowAllEntriesAsync(DiaryContext context)
{
    var entries = await context.DiaryEntries
        .OrderByDescending(e => e.CreatedAt)
        .ToListAsync();

    if (entries.Count == 0)
    {
        Console.WriteLine("Inga inlägg än.");
        return;
    }

    foreach (var entry in entries)
    {
        Console.WriteLine($"[{entry.CreatedAt:yyyy-MM-dd}] {entry.Title}");
        Console.WriteLine(entry.Content);
        Console.WriteLine();
    }
}

static async Task CreateNewEntryAsync(DiaryContext context)
{
    Console.WriteLine("Titel:");
    var title = Console.ReadLine() ?? string.Empty;

    Console.WriteLine("Innehåll:");
    var content = Console.ReadLine() ?? string.Empty;

    context.DiaryEntries.Add(new DiaryEntry { Title = title, Content = content });
    await context.SaveChangesAsync();

    Console.WriteLine("Sparat.");
}
```

Toppnivå-`Main`, `async`/`await` genomgående och en riktig DI-container istället för `new DiaryContext()` utspridd i koden — samma mönster du kommer använda i en webbapp, bara utan webbservern runt omkring.

## Steg 5: Kör

```bash
dotnet run
```

Skriv ett par inlägg, avsluta, kör igen — och se att de fortfarande finns där. Det är hela poängen med att ha en databas istället för en lista i minnet.

## Bygg vidare

- Lägg till redigering och radering av inlägg (`context.DiaryEntries.Update(...)` / `.Remove(...)`)
- Lägg till en `Mood`-property och gruppera inlägg efter humör med LINQ (se [LINQ-frågor](linq-queries.md))
- Byt `Console.ReadLine()`-menyn mot ett enkelt REST-API ovanpå samma `DiaryContext`

## Obligatorisk dad-joke

Varför skrev dagboksappen aldrig något dåligt om sig själv?

Den hade redan `SaveChanges()` inbyggt.
