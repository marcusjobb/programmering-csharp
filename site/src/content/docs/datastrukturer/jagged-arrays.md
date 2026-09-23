---
title: Jagged arrays
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-23"
updated: "2026-09-23"
parent: Datastrukturer
nav_order: 23
---
# Jagged arrays

En [tvådimensionell array](tvadimensionella-arrayer.md) kräver att alla rader har exakt samma längd — ett riktigt rutnät. Men ibland varierar radlängden: en triangel av tal, en lista med olika antal elever per klass, eller ett schema där olika dagar har olika antal pass. Då är en jagged array ("taggig array") rätt verktyg — en array där varje rad är sin egen, självständiga array, med sin egen längd.

## När du läst detta ska du kunna

- Förklara skillnaden mellan en jagged array och en vanlig tvådimensionell array
- Skapa en jagged array med rader av olika längd
- Loopa igenom en jagged array

## Skillnaden mot en riktig matris

En tvådimensionell array (`int[,]`) är **ett enda sammanhängande block** i minnet — exakt lika många kolumner på varje rad. En jagged array (`int[][]`) är istället **en array av arrayer** — den yttre arrayen håller bara referenser till andra, helt separata arrayer, och de behöver inte vara lika långa. Namnet "jagged" (taggig) syftar på att raderna, om du ritar upp dem, inte bildar en jämn rektangel utan en taggig kant.

## Skapa en jagged array

```csharp
int[][] triangel = new int[4][];

triangel[0] = new int[] { 1 };
triangel[1] = new int[] { 1, 2 };
triangel[2] = new int[] { 1, 2, 3 };
triangel[3] = new int[] { 1, 2, 3, 4 };
```

_OMG! Detta är ett monster_ 🤯
_En icke-fyrkantig tvådimensionell array..._ 

`new int[4][]` skapar bara den yttre arrayen — fyra platser som var och en ska innehålla en egen `int[]`. Lägg märke till att de fyra raderna sätts separat, och att var och en får precis så många element som den behöver. Det går inte att skriva `new int[4][4]` och förvänta sig samma sak som en riktig matris — de två hakparentespar-varianterna, `[,]` och `[][]`, är två helt olika datastrukturer.

## Loopa igenom en jagged array

```csharp
for (int rad = 0; rad < triangel.Length; rad++)
{
    for (int kolumn = 0; kolumn < triangel[rad].Length; kolumn++)
    {
        Console.Write(triangel[rad][kolumn] + " ");
    }
    Console.WriteLine();
}
```

Lägg märke till skillnaden mot en riktig matris: inre loopens gräns är `triangel[rad].Length`, inte ett fast tal — varje rad frågas om sin **egen** längd, eftersom den kan skilja sig från de andra. Adressering sker också med två separata hakparenteser, `triangel[rad][kolumn]`, till skillnad från matrisens `matrix[rad, kolumn]` med ett gemensamt par.

_Var är huvudvärkstabletterna?_ 😒

## När väljer man vilken?

Om alla rader **ska** vara lika långa — ett rutnät, ett schackbräde, en bild — välj den [tvådimensionella arrayen](tvadimensionella-arrayer.md). Den är enklare att skapa, enklare att loopa igenom, och kompilatorn hjälper dig undvika buggar där rader råkar bli olika långa av misstag. Jagged array är rätt val bara när radlängden faktiskt **ska** variera som en del av datan du representerar.

## TL;DR

| Vad | Syntax |
|-----|--------|
| Skapa yttre array | `int[][] triangel = new int[4][];` |
| Skapa en rad | `triangel[0] = new int[] { 1, 2, 3 };` |
| Läsa en cell | `triangel[rad][kolumn]` |
| Radens längd | `triangel[rad].Length` (olika per rad) |
| Passar när | Raderna har olika, meningsfullt olika längd |
