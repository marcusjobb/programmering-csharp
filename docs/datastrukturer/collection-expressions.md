---
title: Samlingsuttryck
description: "Samlingsuttryck och with()-argument i Datastrukturer — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Datastrukturer
nav_order: 35
---
# Samlingsuttryck

Samlingsuttryck (`[...]`) introducerades i C# 12 som ett enklare sätt att initiera listor, arrayer och andra samlingar. Med `with(...)`-elementet kan du dessutom skicka med argument direkt till samlingens konstruktor — till exempel för att reservera kapacitet i förväg.

## När du läst detta ska du kunna

- Skapa samlingar med `[...]`-syntaxen
- Skicka konstruktorargument med `with(...)`
- Sprida en befintlig samling med `..`-operatorn
- Välja rätt syntax beroende på situationen

## Grundläggande samlingsuttryck

```csharp
// Innan C# 12
var names = new List<string> { "Anna", "Björn", "Clara" };
int[] scores = new int[] { 10, 20, 30 };

// Med samlingsuttryck
List<string> names  = ["Anna", "Björn", "Clara"];
int[]        scores = [10, 20, 30];
```

Typen härleds från variabeldeklarationen — `[...]` skapar rätt typ automatiskt.

## with(...) — skicka argument till konstruktorn

`with(...)` är ett speciellt element i ett samlingsuttryck som skickar argument till samlingens konstruktor eller fabriksmetod. Det gör att du kan styra hur samlingen skapas — utan att ge upp den kortare syntaxen.

### Reservera kapacitet

```csharp
// Skapar en List<int> med initial kapacitet 1000
// Undviker upprepade reallokeringar när listan fylls
List<int> numbers = [with(capacity: 1000), 1, 2, 3];
```

Utan `with(capacity: ...)` börjar `List<T>` med liten kapacitet och dubblar sig varje gång den är full. Om du vet att listan kommer att innehålla många element sparar du tid och minne på att reservera i förväg.

```csharp
// Utan kapacitetsreservation
List<int> small = [1, 2, 3];

// Med kapacitetsreservation — smart när du vet ungefär hur stor listan blir
List<int> preallocated = [with(capacity: 10_000), ..GetLargeDataset()];
```

## Spread-operatorn ..

`..` sprider ut en befintlig samling inuti ett samlingsuttryck:

```csharp
int[] first  = [1, 2, 3];
int[] second = [4, 5, 6];

int[] combined = [..first, ..second];           // [1, 2, 3, 4, 5, 6]
int[] extended = [0, ..first, ..second, 7];     // [0, 1, 2, 3, 4, 5, 6, 7]
```

### Kombinera med with(...)

```csharp
var source = new[] { 10, 20, 30, 40, 50 };

List<int> result = [with(capacity: 100), ..source, 60, 70];
```

Samlingen reserverar 100 platser och fylls med elementen från `source` plus 60 och 70.

## Samlingstyper som stöds

Samma `[...]`-syntax fungerar för många typer:

```csharp
List<string>         list    = ["Anna", "Björn"];
string[]             array   = ["Anna", "Björn"];
IEnumerable<string>  seq     = ["Anna", "Björn"];
ImmutableArray<int>  immut   = [1, 2, 3];
HashSet<int>         set     = [1, 2, 2, 3];   // {1, 2, 3} — dubletter tas bort
```

## Praktiskt exempel

```csharp
const int ExpectedItems = 500;

var categories = new[] { "Mat", "Dryck", "Snacks" };
var extras     = new[] { "Övrigt" };

List<string> allCategories = [with(capacity: ExpectedItems), ..categories, ..extras];

Console.WriteLine(allCategories.Count);     // 4
Console.WriteLine(allCategories[^1]);       // Övrigt
```

## TL;DR

| Syntax | Vad den gör |
|--------|-------------|
| `[a, b, c]` | Skapar en samling med dessa element |
| `[..existing]` | Sprider ut en befintlig samling |
| `[with(capacity: n)]` | Reserverar kapacitet i konstruktorn |
| `[with(capacity: n), ..src, a]` | Kombination av alla tre |

`with(...)` är framför allt användbart för `List<T>` när du vet i förväg hur stor samlingen kommer att bli.
