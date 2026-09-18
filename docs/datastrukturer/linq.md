---
title: LINQ
description: "LINQ i Datastrukturer — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Datastrukturer
nav_order: 40
---
# LINQ — Language Integrated Query

LINQ är ett av C#:s kraftfullaste verktyg. Det låter dig filtrera, transformera och aggregera samlingar med en konsekvent syntax — oavsett om du jobbar med listor, arrayer, databaser eller XML.

## När du läst detta ska du kunna

- Använda `Where`, `Select`, `OrderBy`, `GroupBy`, `First`, `Any`, `Count`
- Kedja LINQ-metoder (method chaining)
- Förstå skillnaden mellan lazy evaluation och `ToList()`
- Skriva LINQ mot egna klasser

## Grundläggande metoder

```csharp
var tal = new List<int> { 5, 2, 8, 1, 9, 3, 7, 4, 6 };
```

### Where — filtrera

```csharp
var stora = tal.Where(t => t > 5).ToList();
// [8, 9, 7, 6]
```

### Select — transformera

```csharp
var kvadrater = tal.Select(t => t * t).ToList();
// [25, 4, 64, 1, 81, 9, 49, 16, 36]
```

### OrderBy / OrderByDescending

```csharp
var sorterade   = tal.OrderBy(t => t).ToList();
// [1, 2, 3, 4, 5, 6, 7, 8, 9]

var omvända     = tal.OrderByDescending(t => t).ToList();
// [9, 8, 7, 6, 5, 4, 3, 2, 1]
```

### Aggregat

```csharp
Console.WriteLine(tal.Sum());      // 45
Console.WriteLine(tal.Max());      // 9
Console.WriteLine(tal.Min());      // 1
Console.WriteLine(tal.Average());  // 5
Console.WriteLine(tal.Count());    // 9
```

### First / Last / Single

```csharp
Console.WriteLine(tal.First());               // 5
Console.WriteLine(tal.First(t => t > 7));     // 8
Console.WriteLine(tal.Last());                // 6
Console.WriteLine(tal.FirstOrDefault(t => t > 100));  // 0 (default int)
```

### Any / All / Contains

```csharp
Console.WriteLine(tal.Any(t => t > 8));    // True
Console.WriteLine(tal.All(t => t > 0));    // True
Console.WriteLine(tal.Contains(7));         // True
```

## LINQ mot egna klasser

```csharp
public class Student
{
    public string Namn  { get; set; }
    public int    Betyg { get; set; }
}

var studenter = new List<Student>
{
    new() { Namn = "Anna",  Betyg = 5 },
    new() { Namn = "Björn", Betyg = 3 },
    new() { Namn = "Clara", Betyg = 5 },
    new() { Namn = "David", Betyg = 4 },
};

// Alla med betyg 5, sorterade på namn
var topplista = studenter
    .Where(s => s.Betyg == 5)
    .OrderBy(s => s.Namn)
    .Select(s => s.Namn)
    .ToList();

foreach (var namn in topplista)
    Console.WriteLine(namn);
```

### Output

```
Anna
Clara
```

## GroupBy — gruppera

```csharp
var grupperadePerBetyg = studenter
    .GroupBy(s => s.Betyg)
    .OrderByDescending(g => g.Key);

foreach (var grupp in grupperadePerBetyg)
{
    Console.Write($"Betyg {grupp.Key}: ");
    Console.WriteLine(string.Join(", ", grupp.Select(s => s.Namn)));
}
```

### Output

```
Betyg 5: Anna, Clara
Betyg 4: David
Betyg 3: Björn
```

## Take och Skip — paginering

```csharp
var sida1 = studenter.OrderBy(s => s.Namn).Take(2).ToList();
var sida2 = studenter.OrderBy(s => s.Namn).Skip(2).Take(2).ToList();
```

## Distinct och Union

```csharp
var med = new List<int> { 1, 2, 2, 3, 3, 3 };
var unika = med.Distinct().ToList();  // [1, 2, 3]
```

## Lazy evaluation — viktigt!

LINQ-frågor körs **inte** förrän du itererar över resultatet. `ToList()` tvingar exekvering direkt.

```csharp
var fråga = tal.Where(t => t > 5);  // ingen beräkning än

tal.Add(99);

var resultat = fråga.ToList();  // körs nu — 99 är med!
```

Anropa alltid `ToList()` (eller `ToArray()`, `ToDictionary()`) när du vill ha ett fast resultat.

## Snabbreferens

| Metod | Vad den gör |
|-------|-------------|
| `Where(x => ...)` | Filtrera — behåll de som matchar |
| `Select(x => ...)` | Transformera — ny form på varje element |
| `OrderBy` / `OrderByDescending` | Sortera |
| `GroupBy(x => ...)` | Gruppera i nycklar |
| `First` / `Last` / `Single` | Hämta ett element (kastar om inte hittat) |
| `FirstOrDefault` | Hämta ett element eller default |
| `Any` / `All` | Finns något / gäller det alla? |
| `Count` / `Sum` / `Max` / `Min` / `Average` | Aggregera |
| `Take(n)` / `Skip(n)` | Paginering |
| `Distinct()` | Ta bort dubbletter |
| `ToList()` | Materialisera resultatet |

## TL;DR

LINQ = deklarativt arbete med samlingar. `Where` filtrerar, `Select` transformerar, `OrderBy` sorterar, aggregatmetoderna räknar ihop. Kedja metoderna för läsbar, kompakt kod. Kom ihåg `ToList()` när du vill ha ett fast resultat.
