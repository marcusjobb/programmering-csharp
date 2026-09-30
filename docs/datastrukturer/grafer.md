---
title: Grafer och BFS
description: "Grafer, BFS och kortaste-väg-problemet — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Datastrukturer
nav_order: 65
---
# Grafer och BFS

En graf är en datastruktur av **noder** (punkter) och **kanter** (förbindelser). Till skillnad från listor och träd kan kanter peka åt valfritt håll — och en nod kan ha hur många grannar som helst.

Grafer modellerar saker som: vägnät, routernätverk, sociala kontakter, beroenden i ett byggsystem.

> Analogin som fick mig att förstå BFS: [Svamp-metoden](https://marcusmedina.pro/sv/junior-tips/svamp-metoden/) på marcusmedina.pro

## När du läst detta ska du kunna

- Representera en graf som en `Dictionary<string, List<string>>`
- Förklara hur BFS (bredd-först-sökning) fungerar
- Skriva BFS i C# för att hitta kortaste vägen
- Sätta BFS i relation till Dijkstras algoritm

## Representera en graf i C#

```csharp
// Riktad graf: varje nod har en lista av grannar
var graf = new Dictionary<string, List<string>>
{
    ["A"] = ["B", "C"],
    ["B"] = ["D"],
    ["C"] = ["D", "E"],
    ["D"] = ["F"],
    ["E"] = ["F"],
    ["F"] = [],
};
```

```
A → B → D ↘
  ↘ C → D   F
      ↘ E ↗
```

## BFS — bredd-först-sökning

BFS utforskar noder i "ringar" utåt från startnoden — alla grannar på avstånd 1, sedan avstånd 2, och så vidare.

Det gör att den **alltid hittar kortaste vägen** (mätt i antal kanter) när den för första gången når en nod.

```csharp
static List<string>? HittaKortasteVäg(
    Dictionary<string, List<string>> graf,
    string start,
    string mål)
{
    var besökta = new HashSet<string> { start };
    var kö = new Queue<List<string>>();
    kö.Enqueue([start]);

    while (kö.Count > 0)
    {
        var väg = kö.Dequeue();
        var nuvarande = väg[^1];

        if (nuvarande == mål)
            return väg;

        foreach (var granne in graf.GetValueOrDefault(nuvarande, []))
        {
            if (besökta.Add(granne))           // Add returnerar false om redan besökt
                kö.Enqueue([..väg, granne]);   // Ny väg med grannen tillagd
        }
    }

    return null;   // Ingen väg hittades
}
```

```csharp
var kortasteVäg = HittaKortasteVäg(graf, "A", "F");
Console.WriteLine(string.Join(" → ", kortasteVäg ?? []));
// A → B → D → F
```

### Varför Queue?

`Queue<T>` ger FIFO-ordning (First In, First Out). Det är det som gör att vi utforskar nivå för nivå — alla vägar av längd 1 är klara innan vi tittar på längd 2.

```
Iteration 1: kö = [ [A,B], [A,C] ]
Iteration 2: kö = [ [A,C], [A,B,D] ]
Iteration 3: kö = [ [A,B,D], [A,C,D], [A,C,E] ]
...
```

### Svampanalogin

Tänk på BFS som svampens mycel: det skickar ut trådar (vägar) i alla riktningar. Varje tråd som träffar en återvändsgränd dör — men den som hittar maten (målet) är per definition den kortaste vägen.

## Från BFS till Dijkstra

BFS räknar kanter (hopp). Det fungerar bra när alla kanter är lika "dyra".

Dijkstras algoritm gör samma sak men med **vikter** — varje kant har en kostnad (avstånd, tid, bränsle). Istället för `Queue` används en `PriorityQueue` som alltid processar den billigaste vägen härnäst.

```csharp
// Viktad graf — (granne, kostnad)
var viktadGraf = new Dictionary<string, List<(string, int)>>
{
    ["A"] = [("B", 1), ("C", 4)],
    ["B"] = [("D", 2)],
    ["C"] = [("D", 1), ("E", 3)],
    ["D"] = [("F", 5)],
    ["E"] = [("F", 1)],
    ["F"] = [],
};

static int Dijkstra(
    Dictionary<string, List<(string Node, int Cost)>> graf,
    string start,
    string mål)
{
    var avstånd = new Dictionary<string, int>();
    var pq = new PriorityQueue<string, int>();

    avstånd[start] = 0;
    pq.Enqueue(start, 0);

    while (pq.Count > 0)
    {
        var nuvarande = pq.Dequeue();

        if (nuvarande == mål)
            return avstånd[mål];

        foreach (var (granne, kostnad) in graf.GetValueOrDefault(nuvarande, []))
        {
            int nyttAvstånd = avstånd[nuvarande] + kostnad;
            if (!avstånd.TryGetValue(granne, out int gammalt) || nyttAvstånd < gammalt)
            {
                avstånd[granne] = nyttAvstånd;
                pq.Enqueue(granne, nyttAvstånd);
            }
        }
    }

    return -1;   // Ingen väg
}
```

```csharp
Console.WriteLine(Dijkstra(viktadGraf, "A", "F"));
// 9  (A→C→E→F: 4+3+1 = 8, faktiskt kortaste)
// A→B→D→F: 1+2+5 = 8 — lika!
```

## Visualisera innan du kodar

Det viktigaste rådet för graf-algoritmer: rita grafen **innan du skriver en rad kod**.

```
Fråga dig:
1. Vad är noderna?      (routrar, städer, uppgifter...)
2. Vad är kanterna?     (kablar, vägar, beroenden...)
3. Har kanterna riktning? Har de vikt?
4. Vad är start och mål?
```

Det tar fem minuter. Det sparar timmar av debugging.

## TL;DR

| Algoritm | Datastruktur | Hittar | Kanter |
|----------|-------------|--------|--------|
| BFS | `Queue` | Kortaste i hopp | Oviktade |
| Dijkstra | `PriorityQueue` | Kortaste i kostnad | Viktade |

```csharp
// BFS i korthet
var kö = new Queue<List<string>>();
kö.Enqueue([start]);

while (kö.Count > 0)
{
    var väg = kö.Dequeue();
    var nod = väg[^1];

    if (nod == mål) return väg;

    foreach (var granne in graf[nod])
        if (besökta.Add(granne))
            kö.Enqueue([..väg, granne]);
}
```

Grafer är överallt — städernas vägnät, paketens väg genom internet, dina kollegors LinkedIn-nätverk. BFS är din första nyckel till att navigera dem.
