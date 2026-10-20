---
title: Typalias med using
description: "using-alias för alla typer i C# 12 — tupler, arrayer, generics — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Variabler
nav_order: 16
---
# Typalias med using

`using` låter dig ge ett kortare eller tydligare namn åt en typ. Före C# 12 fungerade det bara med enkla namnrymdssökvägar — i C# 12 fungerar det med alla typer: tupler, arrayer, generics och pekare.

## När du läst detta ska du kunna

- Skriva `using`-alias för tupler och generics
- Välja när ett alias gör koden tydligare
- Förklara skillnaden mot `var` och faktisk typedef

## Grundläggande alias

```csharp
// Gammal version — fungerade redan
using StringList = System.Collections.Generic.List<string>;

// Nu (C# 12) — fungerar med alla typer
using Point      = (int X, int Y);
using Matrix     = int[][];
using IntList    = List<int>;
using StringDict = Dictionary<string, string>;
```

Aliaset är bara ett annat namn — kompilatorn ser det som exakt samma typ.

## Tupler som typalias

```csharp
using Point   = (int X, int Y);
using RGB     = (byte R, byte G, byte B);
using NameAge = (string Name, int Age);
```

```csharp
Point origin = (0, 0);
Point cursor = (12, 34);

RGB red   = (255, 0, 0);
RGB green = (0, 255, 0);

NameAge person = ("Anna", 30);
Console.WriteLine(person.Name);  // Anna
Console.WriteLine(person.Age);   // 30
```

## Generics som alias

Långa generiska typer kan bli svårlästa. Alias hjälper:

```csharp
using ErrorOr<T>  = (T? Value, string? Error);
using Lookup      = Dictionary<string, List<int>>;
using StringPair  = (string First, string Second);
```

```csharp
Lookup wordPositions = new()
{
    ["hej"]   = [0, 5, 12],
    ["världen"] = [4, 17],
};

foreach (var (word, positions) in wordPositions)
    Console.WriteLine($"{word}: [{string.Join(", ", positions)}]");
```

## Returnera namngivna tupler med alias

```csharp
using ParseResult = (bool Success, int Value, string Error);

static ParseResult TryParseInt(string input)
{
    if (int.TryParse(input, out int value))
        return (true, value, "");
    return (false, 0, $"'{input}' är inte ett giltigt heltal");
}

var result = TryParseInt("42");
Console.WriteLine(result.Success);   // True
Console.WriteLine(result.Value);     // 42

var fail = TryParseInt("abc");
Console.WriteLine(fail.Error);       // 'abc' är inte ett giltigt heltal
```

## Scope — var gäller aliaset?

Ett `using`-alias gäller i filen det definieras (file-scoped). Det är inte en global typedef.

```csharp
// I toppen av filen — gäller hela filen
using Point = (int X, int Y);

// Om du vill ha det globalt — lägg det i en egen fil med global using
global using Point = (int X, int Y);   // gäller hela projektet
```

## När ska du använda alias?

| Situation | Alias? |
|-----------|--------|
| Tupel som returntyp med tydlig semantik | Ja |
| Lång generisk typ som upprepas | Ja |
| Enkel `int` eller `string` | Nej — ingen vinst |
| Bara för att spara några tecken | Nej |

Alias gör koden tydligare när namnet **tillför semantik** — `RGB` berättar vad tupeln representerar, `(byte, byte, byte)` gör inte det.

## TL;DR

```csharp
using Point  = (int X, int Y);          // tupel med namn
using IntList = List<int>;              // generisk typ
using Matrix  = int[][];               // array-typ

Point p = (3, 4);
IntList numbers = [1, 2, 3];

Console.WriteLine(p.X);   // 3
```

Typalias ersätter inte typer — de är genvägar som tillför läsbarhet. Använd dem när de gör koden tydligare, inte bara kortare.
