---
title: Foreach
description: "foreach är den vanligaste loopen i C# när du jobbar med samlingar. Den går igenom varje element ett i taget — du behöver aldrig hantera ett index."
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

## Inline foreach med List\<T\>.ForEach

`List<T>` har en egen `ForEach`-metod som tar ett lambda-uttryck — ett alternativ till `foreach`-satsen när du bara ska köra en enkel operation per element:

```csharp
var names = new List<string> { "Anna", "Björn", "Clara" };
names.ForEach(name => Console.WriteLine(name));
```

Den finns bara på `List<T>`, inte på arrayer. Vill du loopa baklänges, vänd listan (eller arrayen) innan du loopar:

```csharp
names.Reverse();
names.ForEach(name => Console.WriteLine(name));

// På en array används Array.Reverse istället:
int[] numbers = { 10, 20, 30 };
Array.Reverse(numbers);
foreach (var n in numbers) Console.WriteLine(n);
```

`List<T>.ForEach` är kortare för enkla fall, men en vanlig `foreach`-sats är oftast tydligare att felsöka och stega igenom — särskilt så fort logiken blir mer än en rad.

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
