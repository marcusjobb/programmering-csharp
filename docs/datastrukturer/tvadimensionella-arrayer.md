---
title: Tvådimensionella arrayer
description: "En vanlig array är en rad av platser. Ibland räcker inte det — ett schackbräde, ett rutnät i ett spel, eller en tabell med rader och kolumner behöver två…"
parent: Datastrukturer
nav_order: 21
---
# Tvådimensionella arrayer

En vanlig array är en rad av platser. Ibland räcker inte det — ett schackbräde, ett rutnät i ett spel, eller en tabell med rader och kolumner behöver två dimensioner istället för en. C# löser det med en tvådimensionell array, ibland kallad matris.

## När du läst detta ska du kunna

- Skapa en tvådimensionell array och förstå vad `[,]` betyder
- Läsa och skriva en specifik cell med två index
- Välja rätt loop-typ beroende på om du behöver veta positionen eller inte

## Skapa en tvådimensionell array

```csharp
int[,] matrix = new int[10, 10];

matrix[3, 4] = 9;
matrix[3, 5] = 1;
```

Kommatecknet inuti hakparenteserna, `[,]`, är det som skiljer en tvådimensionell array från en vanlig — det säger åt C# att skapa två dimensioner istället för en. `new int[10, 10]` ger dig 10 rader gånger 10 kolumner, alltså 100 platser totalt, alla `int` och alla satta till standardvärdet `0` från början. En cell adresseras med två index i samma ordning som du skapade den: `matrix[rad, kolumn]`.

## Loopa igenom en tvådimensionell array

En vanlig `foreach` fungerar, men ger dig bara värdena i tur och ordning — du tappar informationen om vilken rad och kolumn varje värde satt i. Vill du gruppera utskriften per rad, eller veta positionen på ett värde, behöver du en `for`-loop med explicit index — och det betyder två kapslade loopar, en för raden och en för kolumnen inuti den:

```csharp
for (int rad = 0; rad < 10; rad++)
{
    Console.Write($"Rad {rad}: ");
    for (int kolumn = 0; kolumn < 10; kolumn++)
    {
        Console.Write(matrix[rad, kolumn] + ",");
    }
    Console.WriteLine();
}
```

Den yttre loopen går genom raderna, den inre går genom kolumnerna i just den raden — och `Console.WriteLine()` efter den inre loopen bryter av med en radbrytning innan nästa rad börjar. Det är just den kontrollen — att veta exakt var i arrayen du befinner dig — som gör `for` till rätt val här, där `foreach` bara hade gett dig 100 värden på rad utan att visa var gränserna mellan raderna gick.

## Praktiskt exempel — Tic Tac Toe

Ett tre-i-rad-bräde är ett klassiskt exempel på en tvådimensionell array i praktiken: tre rader, tre kolumner, en spelmarkering (`'X'`, `'O'` eller tomt) i varje cell.

```csharp
char[,] bräde = new char[3, 3];

for (int rad = 0; rad < 3; rad++)
    for (int kolumn = 0; kolumn < 3; kolumn++)
        bräde[rad, kolumn] = ' ';   // tomt bräde från start

bräde[1, 1] = 'X';   // spelare sätter X i mitten
bräde[0, 2] = 'O';   // motståndaren sätter O uppe till höger
```

Att skriva ut brädet är samma rad/kolumn-loop som tidigare, bara med lite extra formatering för att det ska se ut som ett bräde:

```csharp
for (int rad = 0; rad < 3; rad++)
{
    for (int kolumn = 0; kolumn < 3; kolumn++)
    {
        Console.Write(bräde[rad, kolumn]);
        if (kolumn < 2) Console.Write("|");
    }
    Console.WriteLine();
    if (rad < 2) Console.WriteLine("-----");
}
```

Att kolla om någon har vunnit bygger på samma idé som att läsa vilken cell som helst — du jämför tre celler i taget. En rad vinner om alla tre cellerna i den raden är lika och inte tomma:

```csharp
bool RadVinner(char[,] bräde, int rad)
    => bräde[rad, 0] != ' ' && bräde[rad, 0] == bräde[rad, 1] && bräde[rad, 1] == bräde[rad, 2];
```

Samma mönster upprepas för kolumner (`bräde[0, kol] == bräde[1, kol] == bräde[2, kol]`) och de två diagonalerna (`bräde[0,0]/[1,1]/[2,2]` respektive `bräde[0,2]/[1,1]/[2,0]`) — åtta kontroller totalt, alla samma idé: tre celler, samma markering, ingen av dem tom.

## TL;DR

| Vad | Syntax |
|-----|--------|
| Skapa | `int[,] matrix = new int[rader, kolumner];` |
| Läsa/skriva en cell | `matrix[rad, kolumn]` |
| Loopa utan att bry sig om position | `foreach (int v in matrix)` |
| Loopa och veta rad/kolumn | två kapslade `for`-loopar |

Vill du ha rader med olika längd (inte alla lika breda), räcker inte den här typen — se [Jagged arrays](jagged-arrays.md). Behöver du en tredje dimension, se [Tredimensionella arrayer](tredimensionella-arrayer.md).
