---
title: params
description: "params i Metoder — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Metoder
nav_order: 50
---
# params — variabelt antal argument

`params` låter en metod ta emot hur många argument du vill — utan att anroparen behöver skapa en array. Inuti metoden är de ett vanligt array.

## När du läst detta ska du kunna

- Skriva en metod med `params`
- Anropa den med 0, 1 eller hur många argument som helst
- Förstå att `params` måste vara sista parametern

## Utan params — lite klumpigt

```csharp
int Sum(int[] numbers)
{
    return numbers.Sum();
}

// Anroparen måste skapa en array
Console.WriteLine(Sum(new[] { 1, 2, 3, 4 }));
```

## Med params — rent anrop

```csharp
int Sum(params int[] numbers)
{
    return numbers.Sum();
}

Console.WriteLine(Sum(1, 2, 3, 4));  // 10
Console.WriteLine(Sum(10, 20));       // 30
Console.WriteLine(Sum());             // 0 (tom array)
```

### Output

```
10
30
0
```

Du kan fortfarande skicka en array explicit om du föredrar det:

```csharp
int[] values = [5, 6, 7];
Console.WriteLine(Sum(values));  // 18
```

## params kombinerat med vanliga parametrar

```csharp
void PrintAll(string label, params string[] items)
{
    Console.WriteLine($"{label}:");
    foreach (var item in items)
        Console.WriteLine($"  - {item}");
}

PrintAll("Frukter", "Äpple", "Banan", "Päron");
PrintAll("Tomt");
```

### Output

```
Frukter:
  - Äpple
  - Banan
  - Päron
Tomt:
```

`params` måste alltid vara sista parametern.

## Console.WriteLine använder params

`Console.WriteLine` och `string.Format` är exempel ur .NET:

```csharp
// Internt: WriteLine(string format, params object?[] args)
Console.WriteLine("{0} + {1} = {2}", 3, 4, 7);
```

## Regler

- Bara en `params`-parameter per metod
- Måste vara sista parametern
- Måste vara ett array-typ
- Kan anropas med 0 argument (ger tom array)

## TL;DR

`params int[] numbers` — anroparen skickar valfritt antal int. Inuti metoden är det en vanlig array.
