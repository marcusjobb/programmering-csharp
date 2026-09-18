---
title: Sökalgoritmer
description: "Sökalgoritmer i Datastrukturer — C# bok av Marcus Ackre Medina"
parent: Datastrukturer
nav_order: 60
---

# Sökalgoritmer

Hur hittar du ett värde i en samling utan att kontrollera varje element i onödan? Det är frågan sökalgoritmer svarar på.

## TL;DR

- Linjär sökning: gå ett steg i taget — `O(n)`. Enkel, ingen krav på ordning.
- Binär sökning: halvera möjlighetsrymden varje steg — `O(log n)`. Kräver sorterad lista.
- Välj strategi utifrån hur ofta du söker och om listan är sorterad.

---

## Linjär sökning

Gå igenom varje element tills du hittar rätt.

```csharp
public static int LinjärSökning<T>(IEnumerable<T> källa, T mål)
    where T : IEquatable<T>
{
    int index = 0;
    foreach (var item in källa)
    {
        if (item.Equals(mål))
            return index;
        index++;
    }
    return -1;
}
```

**Komplexitet:** `O(n)` — varje element besöks som mest en gång.

Välj linjär sökning när:
- Listan är kort (under ~50 element).
- Du söker i en ström du inte kan hoppa i (fil rad för rad, nätverkspaket).
- Listan är osorterad och du inte vill sortera.

---

## Binär sökning

Avfärda halva listan i varje steg. Fungerar bara på sorterade listor.

```csharp
public static int BinärSökning<T>(IList<T> källa, T mål)
    where T : IComparable<T>
{
    int vänster = 0;
    int höger = källa.Count - 1;

    while (vänster <= höger)
    {
        int mitt = vänster + ((höger - vänster) / 2); // undviker overflow
        int jämförelse = källa[mitt].CompareTo(mål);

        if (jämförelse == 0) return mitt;
        if (jämförelse < 0) vänster = mitt + 1;
        else höger = mitt - 1;
    }

    return -1;
}
```

**Komplexitet:** `O(log n)` — 1 miljon element kräver max 20 jämförelser.

Välj binär sökning när:
- Listan är sorterad och förändras sällan.
- Du söker upprepade gånger i samma data.
- Svaret måste komma snabbt.

---

## Snabbguide

| Situation                            | Algoritm         | Kommentar                                        |
|--------------------------------------|------------------|--------------------------------------------------|
| Lista med < 50 element               | Linjär           | Inte värt att sortera för en sökning              |
| Stort sorterat register              | Binär            | Logaritmisk tid, bäst vid återkommande sökningar |
| Data uppdateras ofta                 | Linjär / HashSet | Binär kräver omsortering vid varje ändring        |
| Söker i ström (fil, nätverk)         | Linjär           | Kan inte hoppa i ett flöde                        |
| Behöver alla träffar, inte bara en   | Linjär           | Binär hittar bara en matchning                    |

---

## Använd ramverket

Du behöver sällan rulla eget:

```csharp
var namnlista = new List<string> { "Anna", "Kalle", "Pelle", "Sara" };
namnlista.Sort(); // Sortera först!

int index = namnlista.BinarySearch("Kalle");
// index >= 0 → hittades; annars bitwise complement av insättningspunkten

// För existenskontroll: byt List mot HashSet
var namn = new HashSet<string> { "Anna", "Kalle", "Pelle", "Sara" };
bool finns = namn.Contains("Kalle"); // O(1)
```

---

## Vanliga misstag

- **Glömmer att sortera** innan binär sökning — resultatet är odefinierat.
- **Halverar fel**: `(left + right) / 2` kan overflowa för stora int-värden. Använd `left + ((right - left) / 2)`.
- **Upprepar linjär sökning** på stora listor — varje anrop kostar `O(n)`. Sortera en gång och sök binärt, eller använd `Dictionary`/`HashSet`.
- **Rätt jämförelselogik**: typen måste implementera `IComparable<T>`, eller skicka in en `Comparer<T>`.

---

## Vidare

- LINQ-metoderna `FirstOrDefault`, `SingleOrDefault`, `Any` använder linjär logik under huven.
- `Span<T>` och `ReadOnlySpan<T>` minskar allokeringar i prestandakritiska sökningar.
- B-träd och tries är datastrukturer som har sökning inbyggt i sin uppbyggnad — relevanta när samlingar växer till miljoner element.

---

## Övningar

1. Implementera linjär sökning som returnerar **alla** index där ett värde förekommer (inte bara det första).
2. Skriv en binär sökning som tar en `Comparison<T>` som parameter, så att du kan söka i både stigande och fallande listor.
3. Bygg en hjälpklass som automatiskt väljer sökstrategi baserat på listans storlek och om den är sorterad.
