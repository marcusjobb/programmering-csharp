---
title: Jaccard-similaritet
description: "Hur lika är två kundvagnar? Två taggade artiklar? Två dokument? Jaccard-similaritet (uppkallad efter Paul Jaccard, 1901) svarar på precis den frågan med…"
parent: Algoritmer
nav_order: 40
---

# Jaccard-similaritet

Hur lika är två kundvagnar? Två taggade artiklar? Två dokument? Jaccard-similaritet (uppkallad efter Paul Jaccard, 1901) svarar på precis den frågan med ett enda tal mellan 0 och 1 — och kräver ingenting mer avancerat än mängdoperationer du redan känner från [HashSet](../datastrukturer/hashset.md).

## När du läst detta ska du kunna

- Förklara formeln bakom Jaccard-similaritet
- Beräkna den i C# med `HashSet<T>`
- Känna igen situationer där den är rätt verktyg

## Formeln

$$
J(A, B) = \frac{|A \cap B|}{|A \cup B|}
$$

I klartext: **antal gemensamma element, delat på totala antalet unika element i båda mängderna tillsammans.**

- Identiska mängder → `1.0` (100 % lika)
- Inga gemensamma element → `0.0` (0 % lika)
- Allt däremellan → en grad av likhet

## Ett exempel för hand

```
A = { äpple, banan, kiwi }
B = { banan, kiwi, mango }

Snitt (gemensamt):  { banan, kiwi }         → 2 element
Union (allt unikt):  { äpple, banan, kiwi, mango } → 4 element

J(A, B) = 2 / 4 = 0.5
```

Hälften av alla unika frukter som förekommer i någon av mängderna finns i båda.

## Implementation

```csharp
public static double JaccardSimilaritet<T>(HashSet<T> a, HashSet<T> b)
{
    var snitt = new HashSet<T>(a);
    snitt.IntersectWith(b);   // Behåller bara element som finns i BÅDA

    var union = new HashSet<T>(a);
    union.UnionWith(b);       // Alla element från båda, dubbletter räknas en gång

    if (union.Count == 0) return 0;   // Två tomma mängder — odefinierat, returnera 0

    return (double)snitt.Count / union.Count;
}
```

```csharp
var kundA = new HashSet<string> { "Skor", "Jacka", "Mössa" };
var kundB = new HashSet<string> { "Jacka", "Mössa", "Halsduk" };

double likhet = JaccardSimilaritet(kundA, kundB);
Console.WriteLine(likhet);   // 0.5
```

`IntersectWith` och `UnionWith` är [HashSet](../datastrukturer/hashset.md)-metoder byggda exakt för det här — snitt och union i `O(n)`, istället för att jämföra varje par av element för hand.

## Var det används

| Domän | Användning |
|---|---|
| Rekommendationssystem | "Kunder som köpte X köpte också Y" — jämför köpta produktmängder mellan kunder |
| Dubblettdetektering | Hitta nära-identiska dokument eller produktposter genom att jämföra ordmängder |
| Taggning/kategorisering | Mäta hur relaterade två artiklar är baserat på delade taggar |
| Plagiatkontroll | Jämför mängder av ord/fraser mellan texter (grov, snabb första approximation) |

## Begränsning

Jaccard bryr sig bara om **förekomst**, inte om **frekvens** eller **ordning**. "Kunden köpte 10 st Skor" och "kunden köpte 1 st Skor" räknas identiskt — bägge har bara "Skor" i sin mängd. Behöver du väga in hur *mycket* av något, är Jaccard fel verktyg; titta då på cosinus-likhet med viktade vektorer istället.

## TL;DR

Jaccard-similaritet mäter hur lika två mängder är: gemensamma element delat på totalt unika element, ett tal mellan 0 och 1. Trivialt att implementera med `HashSet<T>.IntersectWith`/`UnionWith` — och förvånansvärt användbart för enkla rekommendationer och dubblettdetektering.
