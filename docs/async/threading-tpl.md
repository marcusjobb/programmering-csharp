---
title: Threading och Task Parallel Library
description: "async/await (se Asynkron) löser väntan — att inte blockera medan något annat tar tid (en fil läses, ett nätverkssvar väntas in). Det är inte samma sak som…"
parent: Asynkron
nav_order: 20
---

# Threading och Task Parallel Library

`async`/`await` (se [Asynkron](index.md)) löser väntan — att inte blockera medan något annat tar tid (en fil läses, ett nätverkssvar väntas in). Det är inte samma sak som **parallellism** — att faktiskt köra flera saker samtidigt på flera processorkärnor. Den här sidan handlar om det senare.

## När du läst detta ska du kunna

- Förklara skillnaden mellan en tråd och en task
- Köra flera oberoende operationer samtidigt med `Task.WhenAll`
- Använda `Parallel.ForEach` för CPU-tung loop-bearbetning

## Tråd vs Task — vad är skillnaden?

| | Thread | Task |
|---|---|---|
| Vad det är | En riktig OS-tråd — dyr att skapa | En abstraktion ovanpå en trådpool — billig |
| Skapas av dig direkt | `new Thread(...)` — sällan rätt val idag | `Task.Run(...)`, `async`/`await` |
| Vanlig användning idag | Nästan aldrig direkt | Standardsättet att köra saker asynkront eller parallellt |

I modern C# skriver du nästan aldrig `new Thread()` för hand — `Task` (som körs på en delad trådpool .NET sköter åt dig) täcker nästan alla behov, med mindre overhead och enklare felhantering.

## Task.WhenAll — kör flera oberoende operationer samtidigt

Har du flera operationer som inte beror på varandra, och väntar på dem en i taget, slösar du tid i onödan:

```csharp
// Sekventiellt — väntar på varje anrop innan nästa startar
var väder = await HämtaVäderAsync("Göteborg");
var nyheter = await HämtaNyheterAsync();
var kurs = await HämtaValutakursAsync("USD");
// Total tid ≈ summan av alla tre anropen
```

```csharp
// Parallellt — alla tre startar samtidigt
var väderTask   = HämtaVäderAsync("Göteborg");
var nyheterTask = HämtaNyheterAsync();
var kursTask    = HämtaValutakursAsync("USD");

await Task.WhenAll(väderTask, nyheterTask, kursTask);

var väder   = väderTask.Result;
var nyheter = nyheterTask.Result;
var kurs    = kursTask.Result;
// Total tid ≈ det långsammaste av de tre anropen
```

Genom att starta alla tre tasks innan du `await`:ar någon av dem, körs de samtidigt istället för i tur och ordning.

## Task.WhenAny — reagera på det som blir klart först

```csharp
var snabbast = await Task.WhenAny(väderTask, nyheterTask, kursTask);
Console.WriteLine($"Först klar: {snabbast.Result}");
```

Användbart för timeout-mönster — race:a en operation mot en `Task.Delay(...)` och agera på vilken som blir klar först.

## Parallel.ForEach — CPU-tunga loopar

`Task.WhenAll` är till för I/O (nätverk, filer — vänta *på* något). `Parallel.ForEach` är till för CPU-tungt arbete du vill sprida över flera kärnor:

```csharp
var bilder = Directory.GetFiles("bilder", "*.jpg");

Parallel.ForEach(bilder, bild =>
{
    KomprimeraBild(bild);   // Tungt CPU-arbete, körs på flera kärnor samtidigt
});
```

.NET delar automatiskt upp arbetet över tillgängliga kärnor. Du behöver inte (och bör inte) räkna ut trådantal för hand.

## När ska du använda vad?

| Situation | Verktyg |
|---|---|
| Vänta på ett nätverksanrop, en fil, en databasfråga | `async`/`await` |
| Flera oberoende väntande operationer | `Task.WhenAll` |
| Reagera på det snabbaste av flera | `Task.WhenAny` |
| CPU-tung bearbetning av en samling | `Parallel.ForEach` / `Parallel.For` |

## TL;DR

`Task` (inte `Thread`) är standardverktyget för både asynkron väntan och parallellism i modern C#. `Task.WhenAll` kör flera väntande operationer samtidigt istället för i tur och ordning. `Parallel.ForEach` sprider CPU-tungt arbete över flera kärnor. Blanda inte ihop dem — det ena löser väntan, det andra löser beräkningskraft.
