---
title: ref-parametrar
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Metoder
nav_order: 40
---
# ref — referensparametrar

`ref` skickar en *referens* till originalet istället för en kopia. Det metoden gör med parametern påverkar direkt den variabel du skickade in.

## När du läst detta ska du kunna

- Förklara skillnaden mellan värdeöverföring och `ref`
- Använda `ref` för att låta en metod ändra ett värde hos anroparen
- Förklara skillnaden mellan `ref` och `out`

## Utan ref — originalet påverkas inte

```csharp
void TryDouble(int number)
{
    number *= 2;
}

int value = 10;
TryDouble(value);
Console.WriteLine(value); // 10 — oförändrat
```

## Med ref — originalet ändras

```csharp
void Double(ref int number)
{
    number *= 2;
}

int value = 10;
Double(ref value);         // ref krävs vid anrop också
Console.WriteLine(value);  // 20
```

### Output

```
20
```

`ref` måste stå vid *både* definitionen och anropet.

## Praktiskt exempel — swap

Klassiskt exempel: byt plats på två variabler utan att returnera något.

```csharp
void Swap(ref int a, ref int b)
{
    int temp = a;
    a = b;
    b = temp;
}

int x = 3, y = 7;
Swap(ref x, ref y);
Console.WriteLine($"x={x}, y={y}");
```

### Output

```
x=7, y=3
```

## ref vs out

| | `ref` | `out` |
|--|-------|-------|
| Måste vara initialiserad innan anrop | Ja | Nej |
| Metoden måste tilldela värdet | Nej | Ja |
| Används för | Läsa och ändra | Returnera extra värden |
| Typiskt mönster | Swap, modify-in-place | TryParse |

```csharp
// ref: variabeln måste vara satt FÖRE anropet
int a = 5;
Modify(ref a);

// out: variabeln behöver INTE vara satt före anropet
Compute(out int b);
```

## Undvik ref i vanliga fall

`ref` kan göra koden svårare att följa — funktioner med sidoeffekter är svårare att testa och resonera kring. Föredra returvärden eller tupler för de flesta fall.

```csharp
// Hellre så här:
(int a, int b) Swap(int a, int b) => (b, a);

var (x, y) = Swap(3, 7);
```

## Regler

- `ref`-variabeln måste vara initialiserad innan anropet
- `ref` krävs vid *både* definition och anrop
- Fungerar med value types (`int`, `struct`) — ger faktisk referenssemantik

## TL;DR

`ref` = skicka originalvariabeln. Metoden kan läsa och ändra den. Använd sparsamt — föredra returvärden.
