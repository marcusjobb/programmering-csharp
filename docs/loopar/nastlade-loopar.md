---
title: "Nästlade loopar"
description: "En loop inuti en annan loop — den yttre styr hur många gånger den inre körs helt och hållet, om och om igen."
parent: "Loopar"
nav_order: 30
---

# Nästlade loopar

En nästlad loop är en loop som ligger inuti en annan loop. Den inre loopen körs **helt och hållet**, från början till slut, för varje enda varv av den yttre. Det är kraftfullt när ett problem har två dimensioner — rader och kolumner, dagar och tider, grupper och medlemmar i varje grupp.

## Ett enkelt exempel — multiplikationstabellen

```csharp
for (int rad = 1; rad <= 3; rad++)
{
    for (int kolumn = 1; kolumn <= 3; kolumn++)
    {
        Console.Write(rad * kolumn + "\t");
    }
    Console.WriteLine();
}
```

```
1    2    3
2    4    6
3    6    9
```

Den yttre loopen (`rad`) går tre varv. För **varje** varv av `rad` kör den inre loopen (`kolumn`) sina tre varv helt och hållet, innan den yttre loopen går vidare till nästa `rad`. Totalt antal varv i den inre koden: 3 × 3 = 9 — inte 3 + 3.

## Bygga ett mönster

Nästlade loopar är också hur du bygger visuella mönster rad för rad, där varje rad beror på var i loopen du är:

```csharp
for (int i = 1; i <= 5; i++)
{
    for (int j = 1; j <= i; j++)
    {
        Console.Write(j);
    }
    Console.WriteLine();
}
```

```
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

Lägg märke till att den inre loopens gräns (`j <= i`) beror på den yttre loopens **aktuella** värde — det är just det som gör att varje rad blir en siffra längre än den förra.

## Var dyker det upp?

Nästlade loopar är precis mekaniken bakom att loopa igenom en [tvådimensionell array](../datastrukturer/tvadimensionella-arrayer.md) — en yttre loop för raden, en inre för kolumnen. Samma mönster, bara att det du skriver ut kommer från `matrix[rad, kolumn]` istället för att räknas fram direkt i loopen.

## Prestanda — tänk på antalet varv

Två nästlade loopar med `n` varv var ger `n²` totala varv genom den inre koden, inte `2n`. Tre nästlade loopar ger `n³`. Det växer snabbt:

| Nästling | `n = 10` | `n = 100` | `n = 1000` |
|---|---|---|---|
| En loop | 10 | 100 | 1 000 |
| Två nästlade | 100 | 10 000 | 1 000 000 |
| Tre nästlade | 1 000 | 1 000 000 | 1 000 000 000 |

För små `n` spelar det sällan roll. Loopar du igenom en stor datamängd i flera nästlade varv är det värt att fråga dig om det verkligen behöver vara `n²` — ofta finns en smartare lösning, till exempel ett [HashSet](../datastrukturer/hashset.md) eller [Dictionary](../datastrukturer/dictionary.md) som gör uppslagningen till `O(1)` istället för att loopa igenom allt igen för varje element.

## Obligatorisk dad-joke

Varför tog den yttre loopen det lugnt?

Den visste att den inre loopen skulle göra hela jobbet innan den själv behövde gå vidare.
