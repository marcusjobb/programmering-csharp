---
title: DbContext-livscykeln
description: "En DbContext ska leva kort och gott – skapas sent, användas snabbt, kastas direkt. Här är varför, och vad som går snett när du bryter mot det."
parent: Kontext
nav_order: 10
---
# DbContext-livscykeln

En `DbContext` är inte en databas-anslutning du sätter upp en gång och glömmer. Den är mer som en engångsgrill — packa upp den, grilla, släng. Håll den vid liv för länge och den samlar på sig allt du någonsin laddat in, tills prestandan tar stryk.

## När du läst detta ska du kunna

- Förklara varför en `DbContext` ska vara kortlivad
- Registrera den korrekt i ASP.NET Core med `AddDbContext`
- Hantera den själv i en konsolapp eller testkod med `using`
- Känna igen de vanligaste fallgroparna innan de blir produktionsbuggar

## Ett kort liv – av goda skäl

En `DbContext` bär på en change tracker som håller reda på allt du laddar in eller ändrar. Ju längre kontexten lever, desto mer växer trackern — och desto sämre prestanda får du. Lösningen är att skapa kontexten per "scope": ett HTTP-request, ett CLI-kommando, en avgränsad arbetsenhet. Sen kastar du den.

## Registrering i ASP.NET Core

```csharp
builder.Services.AddDbContext<SchoolContext>(options =>
    options.UseSqlite("Data Source=school.db"));
```

Det här registrerar kontexten som **Scoped** — en instans per request. Perfekt för webbappar: request kommer in, jobbet görs, anslutningen stängs.

## Konsolapp eller testkod

Ingen DI-container som sköter det åt dig? Då tar du hand om livscykeln själv:

```csharp
using var context = new SchoolContext(options);

var students = context.Students.ToList();
```

`using`-blocket garanterar att kontexten kastas när du är klar, även om något går fel längs vägen.

## Vanliga fallgropar

- **Singleton-kontext** — anslutningar hålls öppna, trackern växer obegränsat, du får concurrency-problem.
- **Delad kontext över trådar** — en `DbContext` är inte trådsäker. Skapa en ny per tråd, aldrig en delad.
- **Glömd `Dispose`** — särskilt i konsolappar. Med SQLite betyder det låsta filer nästa gång du kör.

## När behövs en långlivad kontext?

Sällan. Om du kör ett batchjobb med tusentals operationer, skapa en kontext, jobba i mindre block och anropa `context.ChangeTracker.Clear()` mellan blocken — annars äter trackern allt minne innan jobbet är klart.

## Obligatorisk dad-joke

Varför gick DbContexten aldrig på en andra dejt?

Den ville aldrig ha en "long term relationship" — bara korta scopes.
