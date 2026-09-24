---
title: Tupler
description: "En tuple grupperar flera värden i en enda variabel, utan att du behöver skapa en egen klass för det. Tänk på det som ett litet, namnlöst (eller döpt)…"
parent: Variabler
nav_order: 27
---
# Tupler

En tuple grupperar flera värden i **en** enda variabel, utan att du behöver skapa en egen klass för det. Tänk på det som ett litet, namnlöst (eller döpt) paket med värden som hör ihop.

## När du läst detta ska du kunna

- Skapa och läsa ut värden ur en tuple
- Ge tuple-elementen egna namn
- Deconstructa (packa upp) en tuple till separata variabler
- Returnera flera värden från en metod med en tuple
- Byta plats på två variabler i en rad med tuple-deconstruction

## Skapa en tuple

```csharp
var person = ("Kim", 32);

Console.WriteLine(person.Item1);  // Kim
Console.WriteLine(person.Item2);  // 32
```

Utan namngivna element heter de `Item1`, `Item2`, `Item3` och så vidare — praktiskt, men inte särskilt läsbart.

## Namngivna element

Ge elementen egna namn så koden blir självförklarande:

```csharp
var person = (Namn: "Kim", Ålder: 32);

Console.WriteLine(person.Namn);   // Kim
Console.WriteLine(person.Ålder);  // 32
```

Du kan även deklarera typen explicit:

```csharp
(string Namn, int Ålder) person = ("Kim", 32);
```

## Deconstruction — packa upp i separata variabler

En tuple kan packas upp direkt till egna variabler:

```csharp
var person = (Namn: "Kim", Ålder: 32);
var (namn, ålder) = person;

Console.WriteLine(namn);   // Kim
Console.WriteLine(ålder);  // 32
```

## Byt plats på två variabler — swap i en rad

Deconstruction gör en klassisk swap till en enda rad, helt utan temp-variabel eller `ref`:

```csharp
int x = 3, y = 7;
(x, y) = (y, x);
Console.WriteLine($"x={x}, y={y}");
```

```
x=7, y=3
```

`(y, x)` bygger en ny tuple med värdena i omvänd ordning, och `(x, y) =` packar upp den rakt in i de befintliga variablerna — allt sker samtidigt, innan någon av dem hinner skrivas över. Se även [ref-parametrar](../metoder/ref.md) för hur samma problem löstes innan tupler fanns.

## Returnera flera värden från en metod

Innan tupler fick man välja mellan `out`-parametrar eller en egen klass bara för att returnera två värden. En tuple löser det utan ceremoni:

```csharp
(double Min, double Max) HittaMinMax(double[] tal)
{
    double min = tal[0], max = tal[0];
    foreach (var t in tal)
    {
        if (t < min) min = t;
        if (t > max) max = t;
    }
    return (min, max);
}

var (min, max) = HittaMinMax([3.5, 1.2, 9.8, 4.1]);
Console.WriteLine($"Min: {min}, Max: {max}");
```

```
Min: 1.2, Max: 9.8
```

## Tupler vs out vs egen klass

| Situation | Välj |
|-----------|------|
| 2–3 värden, används direkt vid anropet | Tuple |
| Lyckades/misslyckades + ett värde | `out` (TryParse-mönstret) — se [out-parametrar](../metoder/out.md) |
| Värdena hör ihop begreppsmässigt och återanvänds på flera ställen | Egen klass eller `record` |

En tuple är perfekt för ett tillfälligt, lokalt gruppvärde. Behöver du samma grupp av värden på många ställen i koden, eller vill ge den egna metoder, är en klass eller `record` ett bättre val.

## Tuple-jämförelse

Tupler kan jämföras direkt med `==`, elementvis:

```csharp
var a = (1, "x");
var b = (1, "x");

Console.WriteLine(a == b);  // True — samma värden i samma ordning
```

## TL;DR

En tuple = flera värden i en variabel, utan att du behöver skriva en klass. `(namn: värde, ...)` för att skapa, `var (a, b) = tuple;` för att packa upp. Använd tupler för korta, lokala grupperingar — som att returnera flera värden från en metod, eller byta plats på två variabler i en rad: `(x, y) = (y, x);`.
