---
title: out-parametrar
description: "out-parametrar i Metoder — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Metoder
nav_order: 30
---
# out — utparametrar

`out` låter en metod returnera extra värden utöver det vanliga returvärdet. Metoden *måste* tilldela parametern ett värde innan den returnerar.

## När du läst detta ska du kunna

- Använda `out` för att returnera flera värden
- Förstå TryParse-mönstret
- Deklarera `out`-variabeln inline vid anrop

## Syntax

```csharp
// Definition: out i signaturen
void ParseCoordinate(string input, out double latitude, out double longitude)
{
    var parts = input.Split(',');
    latitude  = double.Parse(parts[0]);
    longitude = double.Parse(parts[1]);
}

// Anrop: out + variabeldeklaration
ParseCoordinate("57.7,11.9", out double lat, out double lon);
Console.WriteLine($"Lat: {lat}, Lon: {lon}");
```

### Output

```
Lat: 57,7, Lon: 11,9
```

## TryParse — det klassiska out-mönstret

`out` används genomgående i .NET för att kombinera en bool (lyckades?) med ett värde:

```csharp
Console.Write("Ange ett heltal: ");
string input = Console.ReadLine() ?? "";

if (int.TryParse(input, out int number))
{
    Console.WriteLine($"Du angav: {number}");
}
else
{
    Console.WriteLine("Det där var inte ett heltal.");
}
```

### Output (lyckat)

```
Ange ett heltal: 42
Du angav: 42
```

### Output (misslyckat)

```
Ange ett heltal: hej
Det där var inte ett heltal.
```

Andra `Try`-metoder i .NET som följer samma mönster: `double.TryParse`, `DateTime.TryParse`, `Guid.TryParse`, `Dictionary.TryGetValue`.

## Inline-deklaration (C# 7+)

Du kan deklarera `out`-variabeln direkt vid anropet:

```csharp
// Gammalt sätt
int result;
bool ok = int.TryParse("123", out result);

// Modernt sätt (deklarera inline)
bool ok = int.TryParse("123", out int result);
```

Variabeln `result` är tillgänglig efter anropet.

## Ignorera ett out-värde med _

Om du inte behöver alla out-värden, kasta det med discard `_`:

```csharp
if (int.TryParse("42", out _))
{
    Console.WriteLine("Det var ett giltigt heltal.");
}
```

## Regler

- Metoden **måste** sätta värdet innan den returnerar — annars kompileringsfel
- Anroparen behöver inte initialisera variabeln i förväg
- En `out`-variabel är garanterat satt efter ett lyckat anrop

## out vs returvärde — när vilket?

| Situation | Välj |
|-----------|------|
| Ett värde att returnera | Returvärde |
| Lyckades/misslyckades + ett värde | `out` (TryParse-mönstret) |
| Flera värden | `out` eller tuple `(a, b)` |
| Möjligen null | Nullable returvärde (`T?`) |

## TL;DR

`out` = en extra "utgång" från metoden. Används mest för TryParse-mönstret — `bool TryX(input, out T result)`.
