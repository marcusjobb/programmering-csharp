---
title: Migrationer
description: "Beskriv databasändringen i kod, låt EF Core generera SQL:en — och checka in resultatet så hela teamet delar samma schema."
parent: Entity Framework
nav_order: 40
---
# Migrationer

Migrationer låter dig uppdatera databasens struktur utan att skriva SQL-skript för hand. Du beskriver ändringen i C#-modellen, EF Core räknar ut skillnaden och genererar SQL:en åt dig — lokalt och i produktion.

## När du läst detta ska du kunna

- Skapa och applicera en migration med `dotnet ef`
- Namnge migrationer så andra förstår vad de gör
- Rulla tillbaka en migration som gått fel
- Hantera migrationer i team utan att krocka

## Komma igång

1. Se till att `Microsoft.EntityFrameworkCore.Tools` är installerat i projektet.
2. Bekräfta att din `DbContext` går att instansiera (via DI eller en parameterlös konstruktor).
3. Kör:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

`Migrations/`-mappen får två filer: själva migrationen och en uppdaterad modell-snapshot. Snapshoten beskriver nuläget och används när nästa migration räknas fram.

## Namnge smart

Beskriv förändringen, inte tidpunkten: `AddEnrollment`, `RenameCourseTitle`, `SeedStatusValues` — inte `Migration1` eller `Fix`. PascalCase, inga mellanslag. Ångrat dig innan du applicerat den? `dotnet ef migrations remove` tar bort den senaste.

## Uppdatera databasen

```bash
dotnet ef database update
```

Uppdaterar standarddatabasen från konfigurationen. Ska du mot en annan miljö, lägg till `--connection` med en annan anslutningssträng.

## Rulla tillbaka

```bash
dotnet ef database update PreviousMigrationName
```

Bra när en migration beter sig konstigt i test. Sista utvägen — `dotnet ef database update 0` — river databasen och börjar om från noll.

## Migrationer i team

Checka in migrationsfilerna i Git precis som all annan kod. Kör `dotnet ef database update` direkt efter en pull så din lokala databas hänger med koden. Krockar två migrationer? Ta bort dem lokalt, generera om från den senaste koden, pusha igen.

## Inför produktion

- `dotnet ef migrations bundle` bygger ett fristående verktyg som kan köra migrationen utan .NET SDK installerat på servern.
- `dotnet ef migrations script` genererar rå SQL, om du vill granska eller köra den manuellt.
- Kör alltid i staging innan produktion — en migration som ser oskyldig ut kan låsa en stor tabell längre än du tror.

## Obligatorisk dad-joke

Varför är databaser så bra på att flytta?

De har redan övat på migrationer.
