---
title: Funktionell kodning
description: "Funktionell kodning i Övrigt — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Övrigt
nav_order: 10
---
# Funktionell kodning

C# är primärt objektorienterat, men har starkt stöd för funktionell stil. Funktionell kodning handlar om att beskriva **vad** som ska göras, inte **hur** — med lambdas, LINQ och method chaining.

## När du läst detta ska du kunna

- Skriva lambda-uttryck
- Använda LINQ för att filtrera, transformera och aggregera samlingar
- Kedja metoder (method chaining)
- Skriva expression-bodied members

## Lambda-uttryck

En lambda är en anonym funktion som du kan skicka som ett argument eller tilldela en variabel.

```csharp
// Klassisk metod
bool ÄrJämnt(int n) => n % 2 == 0;

// Lambda — samma sak, utan metodnamn
Func<int, bool> ärJämnt = n => n % 2 == 0;

Console.WriteLine(ärJämnt(4));   // True
Console.WriteLine(ärJämnt(7));   // False
```

### Output

```
True
False
```

## LINQ — Language Integrated Query

LINQ låter dig arbeta med samlingar på ett deklarativt sätt. Metoderna kedjas direkt på listan.

```csharp
var tal = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Imperativt (hur)
var jämna = new List<int>();
foreach (var t in tal)
    if (t % 2 == 0)
        jämna.Add(t);

// Funktionellt med LINQ (vad)
var jämnaLinq = tal.Where(t => t % 2 == 0).ToList();
```

Båda ger samma resultat — LINQ-varianten är kortare och lättare att läsa.

## Where — filtrera

```csharp
var tal = new List<int> { 1, 2, 3, 4, 5, 6 };

var stora = tal.Where(t => t > 3).ToList();

foreach (var t in stora)
    Console.Write($"{t} ");
```

### Output

```
4 5 6
```

## Select — transformera

`Select` mappar varje element till något nytt (som `map` i andra språk).

```csharp
var namn = new List<string> { "anna", "björn", "clara" };

var stora = namn.Select(n => n.ToUpper()).ToList();

foreach (var n in stora)
    Console.Write($"{n} ");
```

### Output

```
ANNA BJÖRN CLARA
```

## Aggregera — Sum, Count, Max, Min, Average

```csharp
var tal = new List<int> { 3, 1, 4, 1, 5, 9, 2, 6 };

Console.WriteLine(tal.Sum());      // 31
Console.WriteLine(tal.Count());    // 8
Console.WriteLine(tal.Max());      // 9
Console.WriteLine(tal.Min());      // 1
Console.WriteLine(tal.Average());  // 3.875
```

## Method chaining — kedja ihop

Du kan kedja hur många LINQ-metoder som helst:

```csharp
var resultat = tal
    .Where(t => t > 2)        // filtrera
    .Select(t => t * t)       // kvadrera
    .OrderByDescending(t => t) // sortera
    .Take(3)                  // ta de tre första
    .ToList();

foreach (var t in resultat)
    Console.Write($"{t} ");
```

### Output

```
81 36 25
```

## Expression-bodied members

Methods och properties kan skrivas kortare med `=>` när kroppen är ett enda uttryck.

```csharp
public class Cirkel
{
    public double Radie { get; }

    public Cirkel(double radie) => Radie = radie;

    // Expression-bodied property
    public double Area => Math.PI * Radie * Radie;

    // Expression-bodied method
    public string Beskriv() => $"Cirkel med radie {Radie:F2} och area {Area:F2}";
}

var c = new Cirkel(5);
Console.WriteLine(c.Beskriv());
```

### Output

```
Cirkel med radie 5.00 och area 78.54
```

## Func och Action

| Typ | Beskrivning | Exempel |
|-----|-------------|---------|
| `Func<T, TResult>` | Tar argument, returnerar värde | `Func<int, bool>` |
| `Action<T>` | Tar argument, returnerar inget | `Action<string>` |
| `Predicate<T>` | Tar argument, returnerar `bool` | `Predicate<int>` |

```csharp
Func<int, int, int>  addera  = (a, b) => a + b;
Action<string>       skriv   = s => Console.WriteLine(s);
Predicate<int>       positiv = n => n > 0;

skriv(addera(3, 4).ToString());   // 7
Console.WriteLine(positiv(-5));    // False
```

## TL;DR

Funktionell kodning i C# = lambdas + LINQ. Deklarativt: beskriv vad du vill, inte hur. `Where` filtrerar, `Select` transformerar, aggregatmetoder räknar ihop. Kedja metoder för läsbar, kompakt kod.
