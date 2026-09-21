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
bool IsEven(int n) => n % 2 == 0;

// Lambda — samma sak, utan metodnamn
Func<int, bool> isEven = n => n % 2 == 0;

Console.WriteLine(isEven(4));   // True
Console.WriteLine(isEven(7));   // False
```

### Output

```
True
False
```

## LINQ — Language Integrated Query

LINQ låter dig arbeta med samlingar på ett deklarativt sätt. Metoderna kedjas direkt på listan.

```csharp
var number = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Imperativt (hur)
var even = new List<int>();
foreach (var t in number)
    if (t % 2 == 0)
        even.Add(t);

// Funktionellt med LINQ (vad)
var jämnaLinq = number.Where(t => t % 2 == 0).ToList();
```

Båda ger samma resultat — LINQ-varianten är kortare och lättare att läsa.

## Where — filtrera

```csharp
var number = new List<int> { 1, 2, 3, 4, 5, 6 };

var large = number.Where(t => t > 3).ToList();

foreach (var t in large)
    Console.Write($"{t} ");
```

### Output

```
4 5 6
```

## Select — transformera

`Select` mappar varje element till något nytt (som `map` i andra språk).

```csharp
var name = new List<string> { "anna", "björn", "clara" };

var large = name.Select(n => n.ToUpper()).ToList();

foreach (var n in large)
    Console.Write($"{n} ");
```

### Output

```
ANNA BJÖRN CLARA
```

## Aggregera — Sum, Count, Max, Min, Average

```csharp
var number = new List<int> { 3, 1, 4, 1, 5, 9, 2, 6 };

Console.WriteLine(number.Sum());      // 31
Console.WriteLine(number.Count());    // 8
Console.WriteLine(number.Max());      // 9
Console.WriteLine(number.Min());      // 1
Console.WriteLine(number.Average());  // 3.875
```

## Method chaining — kedja ihop

Du kan kedja hur många LINQ-metoder som helst:

```csharp
var result = number
    .Where(t => t > 2)        // filtrera
    .Select(t => t * t)       // kvadrera
    .OrderByDescending(t => t) // sortera
    .Take(3)                  // ta de tre första
    .ToList();

foreach (var t in result)
    Console.Write($"{t} ");
```

### Output

```
81 36 25
```

## Expression-bodied members

Methods och properties kan skrivas kortare med `=>` när kroppen är ett enda uttryck.

```csharp
public class Circle
{
    public double Radius { get; }

    public Circle(double radius) => Radius = radius;

    // Expression-bodied property
    public double Area => Math.PI * Radius * Radius;

    // Expression-bodied method
    public string Describe() => $"Cirkel med radie {Radius:F2} och area {Area:F2}";
}

var c = new Circle(5);
Console.WriteLine(c.Describe());
```

### Output

```
Circle med radius 5.00 och area 78.54
```

## Func och Action

| Typ | Beskrivning | Exempel |
|-----|-------------|---------|
| `Func<T, TResult>` | Tar argument, returnerar värde | `Func<int, bool>` |
| `Action<T>` | Tar argument, returnerar inget | `Action<string>` |
| `Predicate<T>` | Tar argument, returnerar `bool` | `Predicate<int>` |

```csharp
Func<int, int, int>  add  = (a, b) => a + b;
Action<string>       write   = s => Console.WriteLine(s);
Predicate<int>       positive = n => n > 0;

write(add(3, 4).ToString());   // 7
Console.WriteLine(positive(-5));    // False
```

## TL;DR

Funktionell kodning i C# = lambdas + LINQ. Deklarativt: beskriv vad du vill, inte hur. `Where` filtrerar, `Select` transformerar, aggregatmetoder räknar ihop. Kedja metoder för läsbar, kompakt kod.
