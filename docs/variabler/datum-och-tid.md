---
title: Datum och tid
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Variabler
nav_order: 62
---
# Datum och tid

Datum och tid är svårare än de ser ut. Tidszoner, skottår, sommartid, antalet dagar i månader — allt detta hanterar .NET åt dig om du använder rätt typer.

Det finns fyra typer att känna till:

| Typ | Lagrar | Typiskt användningsfall |
|-----|--------|------------------------|
| `DateTime` | Datum + tid | Timestamps, händelser |
| `DateOnly` | Bara datum | Födelsedag, deadline |
| `TimeOnly` | Bara tid | Öppettider, alarm |
| `TimeSpan` | En tidslängd | Hur länge något tog |

## När du läst detta ska du kunna

- Läsa aktuellt datum och tid
- Skapa och jämföra datum
- Formatera datum som text
- Beräkna tidsskillnader med `TimeSpan`
- Välja rätt typ för rätt situation

## DateTime

Lagrar både datum och tid ned till nanosekunder.

```csharp
DateTime nu = DateTime.Now;       // Lokal tid
DateTime idag = DateTime.Today;   // Dagens datum, tid 00:00:00
DateTime utc = DateTime.UtcNow;   // UTC-tid (oberoende av tidszon)

Console.WriteLine(nu);            // 2026-09-16 14:32:07
Console.WriteLine(idag);          // 2026-09-16 00:00:00
```

### Skapa ett specifikt datum

```csharp
DateTime födelsedag = new DateTime(1990, 6, 15);
DateTime möte = new DateTime(2026, 10, 1, 9, 30, 0);  // 1 okt 2026 kl 09:30

Console.WriteLine(födelsedag);    // 1990-06-15 00:00:00
Console.WriteLine(möte);          // 2026-10-01 09:30:00
```

### Läsa delar

```csharp
DateTime nu = DateTime.Now;

Console.WriteLine(nu.Year);       // 2026
Console.WriteLine(nu.Month);      // 9
Console.WriteLine(nu.Day);        // 16
Console.WriteLine(nu.Hour);       // 14
Console.WriteLine(nu.DayOfWeek);  // Tuesday
```

## DateOnly och TimeOnly

Sedan .NET 6 finns separata typer för bara datum respektive bara tid. Tydligare och säkrare när du faktiskt bara behöver en av dem.

```csharp
DateOnly deadline = new DateOnly(2026, 12, 1);
DateOnly idag = DateOnly.FromDateTime(DateTime.Today);

Console.WriteLine(deadline);      // 2026-12-01
Console.WriteLine(idag);          // 2026-09-16
```

```csharp
TimeOnly öppnar = new TimeOnly(8, 30);
TimeOnly stänger = new TimeOnly(17, 0);

Console.WriteLine(öppnar);        // 08:30
Console.WriteLine(stänger);       // 17:00
```

## Formatera datum som text

```csharp
DateTime nu = DateTime.Now;

Console.WriteLine(nu.ToString("yyyy-MM-dd"));           // 2026-09-16
Console.WriteLine(nu.ToString("d MMMM yyyy"));          // 16 september 2026
Console.WriteLine(nu.ToString("HH:mm"));                // 14:32
Console.WriteLine(nu.ToString("yyyy-MM-dd HH:mm:ss"));  // 2026-09-16 14:32:07
```

Vanliga formatspecificerare:

| Mönster | Exempel |
|---------|---------|
| `yyyy` | 2026 |
| `MM` | 09 |
| `dd` | 16 |
| `HH` | 14 (24h) |
| `mm` | 32 (minuter) |
| `ss` | 07 (sekunder) |
| `MMMM` | september (fullständigt månadsnamn) |

## Parsa datum från text

```csharp
DateTime parsed = DateTime.Parse("2026-12-01");
Console.WriteLine(parsed);  // 2026-12-01 00:00:00

// Säker parsing — ger false om texten inte är ett giltigt datum
if (DateTime.TryParse("inte-ett-datum", out DateTime resultat))
    Console.WriteLine(resultat);
else
    Console.WriteLine("Ogiltigt datum");
```

## TimeSpan — tidslängder

`TimeSpan` representerar en längd i tid, inte en tidpunkt.

```csharp
TimeSpan enTimme = TimeSpan.FromHours(1);
TimeSpan trettiMin = TimeSpan.FromMinutes(30);
TimeSpan enVecka = TimeSpan.FromDays(7);

Console.WriteLine(enTimme);    // 01:00:00
Console.WriteLine(trettiMin);  // 00:30:00
Console.WriteLine(enVecka);    // 7.00:00:00
```

### Beräkna tidsskillnad

```csharp
DateTime start = new DateTime(2026, 1, 1);
DateTime slut = new DateTime(2026, 9, 16);

TimeSpan skillnad = slut - start;

Console.WriteLine(skillnad.Days);          // 257
Console.WriteLine(skillnad.TotalHours);    // 6168
```

### Mäta körtid

```csharp
DateTime startTid = DateTime.Now;

// Simulera arbete
System.Threading.Thread.Sleep(500);

TimeSpan elapsed = DateTime.Now - startTid;
Console.WriteLine($"Tog: {elapsed.TotalMilliseconds} ms");
```

### Lägga till tid

```csharp
DateTime nu = DateTime.Now;

DateTime imorgon = nu.AddDays(1);
DateTime omEnMånad = nu.AddMonths(1);
DateTime omTioMinuter = nu.AddMinutes(10);

Console.WriteLine(imorgon);
Console.WriteLine(omEnMånad);
```

## Jämföra datum

```csharp
DateTime a = new DateTime(2026, 1, 1);
DateTime b = new DateTime(2026, 6, 1);

Console.WriteLine(a < b);   // True
Console.WriteLine(a == b);  // False

if (DateTime.Today > new DateTime(2026, 9, 1))
    Console.WriteLine("Hösttermin har börjat");
```

## TL;DR

Använd `DateTime` för tidsstämplar och händelser. Använd `DateOnly` när du bara bryr dig om datumet, `TimeOnly` för klockslag. Beräkna tidsskillnader med `TimeSpan`. Formatera med `.ToString("yyyy-MM-dd")`.
