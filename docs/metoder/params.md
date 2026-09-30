---
title: params
description: "params låter en metod ta emot hur många argument du vill — utan att anroparen behöver skapa en array. Inuti metoden är de ett vanligt array."
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
Fruits:
  - Apple
  - Banana
  - Pear
Empty:
```

`params` måste alltid vara sista parametern.

## Console.WriteLine använder params

`Console.WriteLine` och `string.Format` är exempel ur .NET:

```csharp
// Internt: WriteLine(string format, params object?[] args)
Console.WriteLine("{0} + {1} = {2}", 3, 4, 7);
```

## params med andra samlingstyper

Sedan C# 13 fungerar `params` med fler typer än bara arrayer. Du kan använda `IEnumerable<T>`, `List<T>`, `ReadOnlySpan<T>` och andra samlingstyper:

```csharp
// IEnumerable<T> — accepterar vilken samling som helst
void PrintAll(params IEnumerable<string> items)
{
    foreach (var item in items)
        Console.WriteLine(item);
}

// ReadOnlySpan<T> — nollkopiering, bra för prestanda
int FastSum(params ReadOnlySpan<int> numbers)
{
    int total = 0;
    foreach (var n in numbers)
        total += n;
    return total;
}
```

```csharp
// Alla anropssätt fungerar
PrintAll("Anna", "Björn", "Clara");

var list = new List<string> { "David", "Emma" };
PrintAll(list);                         // skicka en List<string> direkt

Console.WriteLine(FastSum(1, 2, 3));    // 6
Console.WriteLine(FastSum([4, 5, 6])); // 15 — samlingsuttryck fungerar
```

### Välj typ efter behov

| Typ | Passar när |
|-----|-----------|
| `params T[]` | Standard — enkelt och universellt |
| `params IEnumerable<T>` | Vill ta emot vilken samling som helst |
| `params ReadOnlySpan<T>` | Prestanda-kritisk kod — undviker heap-allokering |
| `params List<T>` | Behöver ändra listan inuti metoden |

## Regler

- Bara en `params`-parameter per metod
- Måste vara sista parametern
- Kan anropas med 0 argument

## TL;DR

`params int[] numbers` — anroparen skickar valfritt antal int. Inuti metoden är det en vanlig array. Sedan C# 13 funkar `params` med `IEnumerable<T>`, `List<T>` och `ReadOnlySpan<T>` också.
