---
title: Namngivna loopar
description: "Namngivna loopar med break och continue — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Loopar
nav_order: 47
---
# Namngivna loopar

När du har nästlade loopar kan `break` och `continue` bara styra den innersta loopen. Med namngivna loopar kan du peka ut exakt vilken loop du vill bryta ur eller hoppa vidare i.

## När du läst detta ska du kunna

- Namnge en loop med en etikett
- Använda `break etikett` för att hoppa ur en yttre loop
- Använda `continue etikett` för att hoppa till nästa varv i en yttre loop
- Förklara när detta är bättre än en bool-flagga

## Syntax

Sätt etiketten direkt före loop-nyckelordet, följt av kolon:

```csharp
outerLoop: foreach (var row in matrix)
{
    foreach (var item in row)
    {
        if (item == target)
            break outerLoop;
    }
}
```

## Problemet namngivna loopar löser

Utan namngivna loopar behöver du en flagga för att signalera att den yttre loopen ska avslutas:

```csharp
// Utan namngivna loopar — krånglig bool-flagga
bool found = false;

foreach (var row in matrix)
{
    foreach (var item in row)
    {
        if (item == target)
        {
            found = true;
            break;
        }
    }

    if (found) break;
}
```

```csharp
// Med namngivna loopar — direkt och tydligt
outerLoop: foreach (var row in matrix)
{
    foreach (var item in row)
    {
        if (item == target)
            break outerLoop;
    }
}
```

## break — hoppa ur en yttre loop

```csharp
int[][] matrix =
{
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
};

int target = 5;
bool found = false;

searchLoop: for (int row = 0; row < matrix.Length; row++)
{
    for (int col = 0; col < matrix[row].Length; col++)
    {
        if (matrix[row][col] == target)
        {
            Console.WriteLine($"Hittade {target} på rad {row}, kolumn {col}");
            found = true;
            break searchLoop;
        }
    }
}

Console.WriteLine(found ? "Klar." : "Hittades inte.");
```

### Output

```
Hittade 5 på rad 1, kolumn 1
Klar.
```

## continue — hoppa till nästa varv i yttre loop

`continue` med en etikett hoppar vidare till nästa iteration av den namngivna loopen — och hoppar alltså ur den inre loopen helt:

```csharp
var departments = new List<string[]>
{
    ["Anna", "SKIP", "Björn"],
    ["Clara", "David"],
    ["SKIP", "Emma"]
};

nextDept: foreach (var dept in departments)
{
    foreach (var name in dept)
    {
        if (name == "SKIP")
            continue nextDept; // Hoppar till nästa department

        Console.WriteLine(name);
    }
}
```

### Output

```
Anna
Clara
David
```

Varje department som innehåller `"SKIP"` avslutas direkt och nästa startar.

## Etikettnamn

Etiketter kan heta vad som helst — välj något som beskriver vad loopen gör:

```csharp
rowSearch: for (int i = 0; i < rows; i++)
pageLoop: foreach (var page in pages)
retryLoop: while (attempts < maxAttempts)
```

## TL;DR

| Sats | Vad den gör |
|------|-------------|
| `break label` | Hoppar ur den namngivna loopen direkt |
| `continue label` | Hoppar till nästa varv i den namngivna loopen |

Använd namngivna loopar när du annars skulle behöva en bool-flagga för att kommunicera ut ur en inre loop.
