---
title: Foreach
description: "Foreach i Loopar — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Loopar
nav_order: 25
---
# Foreach

`foreach` är den vanligaste loopen i C# när du jobbar med samlingar. Den går igenom varje element ett i taget — du behöver aldrig hantera ett index.

## När du läst detta ska du kunna

- Förklara vad `foreach` gör och varför den passar för samlingar
- Skriva en `foreach`-loop över lista, array och dictionary
- Jämföra `foreach` med `for` och välja rätt

## Grundsyntax

```csharp
foreach (var element in collection)
{
    // körs för varje element
}
```

`var element` är en ny variabel som får värdet av ett element åt gången. `collection` är det du loopar över — en lista, array, eller vad som helst som implementerar `IEnumerable`.

## Exempel — lista

```csharp
var names = new List<string> { "Anna", "Björn", "Clara" };

foreach (var name in names)
{
    Console.WriteLine(name);
}
```

### Output

```
Anna
Björn
Clara
```

## Exempel — array

```csharp
int[] numbers = { 10, 20, 30, 40 };

foreach (var number in numbers)
{
    Console.WriteLine(number);
}
```

### Output

```
10
20
30
40
```

## Exempel — dictionary

När du loopar över ett `Dictionary` får du ett `KeyValuePair` per iteration.

```csharp
var grades = new Dictionary<string, int>
{
    { "Anna",  5 },
    { "Björn", 4 },
    { "Clara", 5 }
};

foreach (var entry in grades)
{
    Console.WriteLine($"{entry.Key}: {entry.Value}");
}
```

### Output

```
Anna: 5
Björn: 4
Clara: 5
```

## Foreach vs for — när väljer du vad?

| Situation | Använd |
|-----------|--------|
| Loopa igenom alla element, inget index behövs | `foreach` |
| Du behöver index (`i`) för att komma åt position | `for` |
| Du ska modifiera samlingen under loopen | `for` (foreach tillåter inte det) |
| Kod som ska läsas lätt och snabbt | `foreach` |

## Modern syntax — utan `var`

Du kan skriva ut typen explicit om du vill vara tydlig:

```csharp
foreach (string name in names)
{
    Console.WriteLine(name);
}
```

Båda fungerar — `var` är kortare och vanligast i modern C#.

## TL;DR

`foreach` loopar igenom varje element i en samling. Inget index, inget `i++` — bara elementet direkt. Förstahandsvalet för listor och arrayer när du inte behöver positionen.
