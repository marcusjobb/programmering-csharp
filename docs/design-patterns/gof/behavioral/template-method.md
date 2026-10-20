---
title: Template Method
description: "Flera algoritmer följer samma grundstruktur (t.ex. flera sorteringsalgoritmer: jämför, byt plats, upprepa) men skiljer sig i detaljer. Att kopiera hela…"
parent: "Beteendemönster (Behavioral)"
nav_order: 70
---

# Template Method

## Problemet

Flera algoritmer följer samma grundstruktur (t.ex. flera sorteringsalgoritmer: jämför, byt plats, upprepa) men skiljer sig i detaljer. Att kopiera hela strukturen för varje variant duplicerar kod som egentligen är identisk.

## Lösningen

```csharp
public abstract class SorteringsAlgoritm
{
    // Template method — skelettet, aldrig överskuggat
    public void Sortera(int[] data)
    {
        Console.WriteLine($"Startar {Namn}...");
        UtförSortering(data);
        Console.WriteLine($"Klar: {string.Join(", ", data)}");
    }

    protected abstract string Namn { get; }
    protected abstract void UtförSortering(int[] data);   // Subklasser fyller i DETTA steget
}

public class BubbleSort : SorteringsAlgoritm
{
    protected override string Namn => "Bubble Sort";

    protected override void UtförSortering(int[] data)
    {
        for (int i = 0; i < data.Length - 1; i++)
            for (int j = 0; j < data.Length - i - 1; j++)
                if (data[j] > data[j + 1])
                    (data[j], data[j + 1]) = (data[j + 1], data[j]);
    }
}
```

```csharp
SorteringsAlgoritm sortering = new BubbleSort();
sortering.Sortera(new[] { 5, 2, 8, 1 });
// Startar Bubble Sort...
// Klar: 1, 2, 5, 8
```

`Sortera` (skelettet: skriv ut start, gör jobbet, skriv ut resultat) är gemensamt och definierat en gång i basklassen. Varje ny sorteringsalgoritm behöver bara implementera `UtförSortering` — loggningen runt om skrivs aldrig om.

## Släktskap med Strategy

Template Method och [Strategy](strategy.md) löser ett liknande problem — utbytbara algoritmer — på olika sätt. Strategy byter ut *hela* algoritmen via komposition (ett objekt som injiceras). Template Method byter ut *delar* av en algoritm via arv (en metod som överskuggas), medan resten av strukturen är gemensam och fast.

## TL;DR

Template Method lägger den gemensamma strukturen av en algoritm i en basklass, och låter subklasser fylla i bara de steg som faktiskt skiljer sig — duplicerar aldrig det som redan är gemensamt.
