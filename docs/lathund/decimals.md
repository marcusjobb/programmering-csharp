---
title: "Lathund: decimaltal (double, float, decimal)"
description: "Decimaltalen double, float och decimal i C#: omfång, suffix, omvandling, avrundning och de vanligaste misstagen."
parent: Lathund
nav_order: 23
---
# Lathund: decimaltal (double, float, decimal)

`double`, `float` och `decimal` lagrar tal med decimaler. Vilken du väljer avgör hur exakt resultatet blir och hur stort tal den kan hålla.

Läs mer: [Variabler](../variables/index.md).

## Snabbfakta

| Typ | Storlek | Omfång | Precision | Suffix |
|-----|---------|--------|-----------|--------|
| `float` | 32 bitar (4 byte) | ±1,5 x 10^-45 till ±3,4 x 10^38 | Ca 7 siffror | `F` |
| `double` | 64 bitar (8 byte) | ±5,0 x 10^-324 till ±1,7 x 10^308 | Ca 15-16 siffror | Inget |
| `decimal` | 128 bitar (16 byte) | ±1,0 x 10^-28 till ±7,9 x 10^28 | 28-29 siffror | `m` |

```csharp
double pi = 3.14159265359;
float pris = 19.99F;          // Utan F ger kompileringsfel
decimal saldo = 1000.50m;     // Utan m ger kompileringsfel
```

Använd `decimal` för pengar. Använd `double` för vetenskapliga beräkningar där en liten avvikelse går att leva med.

## Omvandling

| Metod | Beskrivning | Exempel | Resultat |
|-------|-------------|---------|----------|
| `Convert.ToDouble` | Till `double` | `Convert.ToDouble(42)` | `42,0` |
| `Convert.ToSingle` | Till `float` | `Convert.ToSingle(19.99)` | `19,99` |
| `Convert.ToDecimal` | Till `decimal` | `Convert.ToDecimal(1000.5)` | `1000,5` |
| `Convert.ToInt32` | Till `int`, avrundar | `Convert.ToInt32(42.99)` | `43` |
| `Convert.ToInt64` | Till `long` | `Convert.ToInt64(1234567890123)` | `1234567890123` |

```csharp
double dubbel = Convert.ToDouble(42);     // 42,0
int heltal = Convert.ToInt32(42.99);      // 43. Convert avrundar, den klipper inte av
int avklippt = (int)42.99;                // 42. Cast klipper bort decimalerna
```

## Avrundning

| Metod | Beskrivning | Exempel | Resultat |
|-------|-------------|---------|----------|
| `Math.Round` | Rundar till angivet antal decimaler | `Math.Round(3.14159, 2)` | `3,14` |
| `Math.Floor` | Närmaste heltal nedåt | `Math.Floor(3.99)` | `3,0` |
| `Math.Ceiling` | Närmaste heltal uppåt | `Math.Ceiling(3.01)` | `4,0` |

`Math`-metoderna returnerar samma typ som de får in. Med `double` blir resultatet alltså `double`, även när decimalerna är noll.

## Vanliga misstag

- **Glömt suffix.** `float pris = 19.99;` ger kompileringsfel, eftersom `19.99` är en `double`. Samma gäller `decimal saldo = 1000.50;`.
- **Flyttal är approximationer.** Med `double` blir `0.1 + 0.2 == 0.3` falskt. Med `decimal` stämmer det:

```csharp
Console.WriteLine(0.1 + 0.2 == 0.3);       // False
Console.WriteLine(0.1m + 0.2m == 0.3m);    // True
```

- **Cast och `Convert` ger olika resultat.** `(int)42.99` blir `42`, men `Convert.ToInt32(42.99)` blir `43`.
- **Bankirsavrundning.** `Math.Round` och `Convert.ToInt32` avrundar `2,5` till `2` och `3,5` till `4`. Det är standard i .NET och inte ett fel, men det överraskar många.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Flyttal** | Tal där decimalpunkten kan "flyta", som `double` och `float` |
| **Precision** | Antal korrekta siffror som typen kan lagra |
| **Avrundning** | Att förkorta ett tal till färre decimaler |
| **Suffix** | Bokstav efter ett tal som anger typen, som `F` och `m` |
| **Bankirsavrundning** | Avrundning till närmaste jämna tal när talet ligger mitt emellan |
