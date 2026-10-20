---
title: Dijkstras algoritm
description: "Hur hittar Google Maps den snabbaste vägen mellan två adresser, av miljontals möjliga vägar? Dijkstras algoritm (uppkallad efter Edsger Dijkstra, 1956) är…"
parent: Algoritmer
nav_order: 30
---

# Dijkstras algoritm

Hur hittar Google Maps den snabbaste vägen mellan två adresser, av miljontals möjliga vägar? Dijkstras algoritm (uppkallad efter Edsger Dijkstra, 1956) är grundstenen — den hittar den kortaste vägen från en startpunkt till alla andra punkter i ett nätverk med viktade kanter (t.ex. vägsträckor med olika längd).

## När du läst detta ska du kunna

- Förklara idén bakom Dijkstras algoritm
- Modellera ett nätverk som en graf i C#
- Implementera algoritmen med en prioritetskö

## Grundidén

Algoritmen jobbar girigt: utgå från startnoden, besök alltid den obesökta noden med lägst känt avstånd, uppdatera avstånden till dess grannar om en kortare väg hittas via den, upprepa tills alla noder besökts (eller målet nåtts).

```
     4
  A ---- B
  |    / |
 1|  2/  |5
  |  /   |
  C ---- D
     3
```

Kortaste vägen A → D är inte nödvändigtvis A→B→D (4+5=9) — algoritmen upptäcker att A→C→D (1+3=4) är billigare, genom att alltid utforska den för närvarande billigaste vägen härnäst.

## Implementation

```csharp
public class Graf
{
    private readonly Dictionary<string, List<(string Granne, int Vikt)>> _kanter = new();

    public void LäggTillKant(string från, string till, int vikt)
    {
        _kanter.TryAdd(från, new List<(string, int)>());
        _kanter.TryAdd(till, new List<(string, int)>());
        _kanter[från].Add((till, vikt));
        _kanter[till].Add((från, vikt));   // Oriktad graf — kanten gäller åt båda hållen
    }

    public Dictionary<string, int> KortasteVägar(string start)
    {
        var avstånd = _kanter.Keys.ToDictionary(nod => nod, _ => int.MaxValue);
        avstånd[start] = 0;

        var kö = new PriorityQueue<string, int>();
        kö.Enqueue(start, 0);

        var besökta = new HashSet<string>();

        while (kö.Count > 0)
        {
            var nuvarande = kö.Dequeue();
            if (!besökta.Add(nuvarande)) continue;   // Redan besökt — hoppa över

            foreach (var (granne, vikt) in _kanter[nuvarande])
            {
                int nyttAvstånd = avstånd[nuvarande] + vikt;
                if (nyttAvstånd < avstånd[granne])
                {
                    avstånd[granne] = nyttAvstånd;
                    kö.Enqueue(granne, nyttAvstånd);
                }
            }
        }

        return avstånd;
    }
}
```

```csharp
var graf = new Graf();
graf.LäggTillKant("A", "B", 4);
graf.LäggTillKant("A", "C", 1);
graf.LäggTillKant("B", "D", 5);
graf.LäggTillKant("C", "B", 2);
graf.LäggTillKant("C", "D", 3);

var avstånd = graf.KortasteVägar("A");
Console.WriteLine(avstånd["D"]);   // 4 — via A→C→D, inte A→B→D (som hade gett 9)
```

`PriorityQueue<TElement, TPriority>` (inbyggd i .NET sedan .NET 6) plockar alltid ut elementet med lägst prioritet (här: kortast avstånd) härnäst — exakt det Dijkstras algoritm behöver för att alltid utforska den billigaste vägen först.

## Var det används

| Domän | Användning |
|---|---|
| Kartor/GPS | Kortaste eller snabbaste väg mellan adresser |
| Nätverksrouting | Hitta effektivaste vägen för datapaket |
| Spel | Pathfinding för AI-karaktärer på en spelkarta |
| Logistik | Optimera leveransrutter |

## Begränsning

Dijkstra fungerar bara med **icke-negativa** kantvikter — en "väg" kan inte ha negativ längd. Behöver du hantera negativa vikter (ovanligt i praktiken, men förekommer i vissa finansiella grafmodeller) krävs en annan algoritm, t.ex. Bellman-Ford.

## TL;DR

Dijkstras algoritm hittar den kortaste vägen från en startpunkt till alla andra noder i en viktad graf, genom att girigt alltid utforska den för närvarande billigaste kända vägen först. `PriorityQueue<T, TPriority>` i .NET gör implementationen rakt fram.
