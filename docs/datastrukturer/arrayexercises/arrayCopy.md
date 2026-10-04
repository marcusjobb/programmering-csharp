---
title: Plocka ut en del av en array
description: "Skapa en array med 10 heltal, och plocka ut de fem första talen till en ny array."
parent: Array övningar
nav_order: 10
---
# Plocka ut en del av en array

Skriv ett program som skapar en array med 10 heltal, och plockar ut de fem första talen till en ny, separat array.

## Instruktioner

1. Skapa en array med 10 heltal.
2. Skapa en ny array som innehåller de fem första talen i den första arrayen.
3. Skriv ut båda arrayerna.

## Kodmall

```csharp
int[] numbers = { 5, 2, 7, 1, 9, 3, 8, 4, 6, 10 };

// Skapa en ny array med de fem första talen från "numbers"


// Skriv ut båda arrayerna
```

#### Förväntad output

```
Siffror: 5 2 7 1 9 3 8 4 6 10
De fem första talen: 5 2 7 1 9
```

#### Facit

<details markdown="block">
<summary>Klicka här för att se facit</summary>

```csharp
int[] numbers = { 5, 2, 7, 1, 9, 3, 8, 4, 6, 10 };

int[] firstFive = new int[5];
Array.Copy(numbers, firstFive, 5);

Console.WriteLine("Siffror: " + string.Join(" ", numbers));
Console.WriteLine("De fem första talen: " + string.Join(" ", firstFive));
```

`Array.Copy(källa, mål, antal)` kopierar ett angivet antal element från början av källarrayen till målarrayen — här de fem första talen från `numbers` in i den nya, mindre `firstFive`.

Samma resultat går även att nå med LINQ:

```csharp
int[] firstFive = numbers.Take(5).ToArray();
```

</details>

## Obligatorisk dad-joke

Varför gick arrayen till terapeuten?

Den hade för många olösta index att bearbeta.
