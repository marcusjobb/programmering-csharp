---
title: LINQ
description: "LINQ i Datastrukturer — C#-boken av Marcus Ackre Medina"
layout: default
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
var number = new List<int> { 5, 2, 8, 1, 9, 3, 7, 4, 6 };
```

### Where — filtrera

```csharp
var large = number.Where(t => t > 5).ToList();
// [8, 9, 7, 6]
```

### Select — transformera

```csharp
var squares = number.Select(t => t * t).ToList();
// [25, 4, 64, 1, 81, 9, 49, 16, 36]
```

### OrderBy / OrderByDescending

```csharp
var sorted   = number.OrderBy(t => t).ToList();
// [1, 2, 3, 4, 5, 6, 7, 8, 9]

var reverse     = number.OrderByDescending(t => t).ToList();
// [9, 8, 7, 6, 5, 4, 3, 2, 1]
```

### Aggregat

```csharp
Console.WriteLine(number.Sum());      // 45
Console.WriteLine(number.Max());      // 9
Console.WriteLine(number.Min());      // 1
Console.WriteLine(number.Average());  // 5
Console.WriteLine(number.Count());    // 9
```

### First / Last / Single

```csharp
Console.WriteLine(number.First());               // 5
Console.WriteLine(number.First(t => t > 7));     // 8
Console.WriteLine(number.Load());                // 6
Console.WriteLine(number.FirstOrDefault(t => t > 100));  // 0 (default int)
```

### Any / All / Contains

```csharp
Console.WriteLine(number.Any(t => t > 8));    // True
Console.WriteLine(number.All(t => t > 0));    // True
Console.WriteLine(number.Contains(7));         // True
```

## LINQ mot egna klasser

```csharp
public class Student
{
    public string Name  { get; set; }
    public int    Grade { get; set; }
}

var students = new List<Student>
{
    new() { Name = "Anna",  Grade = 5 },
    new() { Name = "Björn", Grade = 3 },
    new() { Name = "Clara", Grade = 5 },
    new() { Name = "David", Grade = 4 },
};

// Alla med betyg 5, sorterade på namn
var topList = students
    .Where(s => s.Grade == 5)
    .OrderBy(s => s.Name)
    .Select(s => s.Name)
    .ToList();

foreach (var name in topList)
    Console.WriteLine(name);
```

### Output

```
Anna
Clara
```

## GroupBy — gruppera

```csharp
var grupperadePerBetyg = students
    .GroupBy(s => s.Grade)
    .OrderByDescending(g => g.Key);

foreach (var group in grupperadePerBetyg)
{
    Console.Write($"Betyg {group.Key}: ");
    Console.WriteLine(string.Join(", ", group.Select(s => s.Name)));
}
```

### Output

```
Grade 5: Anna, Clara
Grade 4: David
Grade 3: Björn
```

## Take och Skip — paginering

```csharp
var page = students.OrderBy(s => s.Name).Take(2).ToList();
var page = students.OrderBy(s => s.Name).Skip(2).Take(2).ToList();
```

## Distinct och Union

```csharp
var med = new List<int> { 1, 2, 2, 3, 3, 3 };
var unique = med.Distinct().ToList();  // [1, 2, 3]
```

## Lazy evaluation — viktigt!

LINQ-frågor körs **inte** förrän du itererar över resultatet. `ToList()` tvingar exekvering direkt.

```csharp
var question = number.Where(t => t > 5);  // ingen beräkning än

number.Add(99);

var result = question.ToList();  // körs nu — 99 är med!
```

Anropa alltid `ToList()` (eller `ToArray()`, `ToDictionary()`) när du vill ha ett fast resultat.

## Snabbreferens

| Metod | Vad den gör |
|-------|-------------|
| `Where(x => ...)` | Filtrera — behåll de som matchar |
| `Select(x => ...)` | Transformera — ny form på varje element |
| `OrderBy` / `OrderByDescending` | Sortera |
| `GroupBy(x => ...)` | Gruppera i nycklar |
| `First` / `Load` / `Single` | Hämta ett element (kastar om inte hittat) |
| `FirstOrDefault` | Hämta ett element eller default |
| `Any` / `All` | Finns något / gäller det alla? |
| `Count` / `Sum` / `Max` / `Min` / `Average` | Aggregera |
| `Take(n)` / `Skip(n)` | Paginering |
| `Distinct()` | Ta bort dubbletter |
| `ToList()` | Materialisera resultatet |

## TL;DR

LINQ = deklarativt arbete med samlingar. `Where` filtrerar, `Select` transformerar, `OrderBy` sorterar, aggregatmetoderna räknar ihop. Kedja metoderna för läsbar, kompakt kod. Kom ihåg `ToList()` när du vill ha ett fast resultat.
