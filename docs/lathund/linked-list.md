---
title: "Lathund: länkad lista (LinkedList<T>)"
description: "LinkedList<T> i C#: en dubbelt länkad lista där du lägger till och tar bort i början och slutet, och varför den inte har index."
parent: Lathund
nav_order: 73
---
# Lathund: länkad lista (LinkedList\<T\>)

`LinkedList<T>` är en dubbelt länkad lista. Varje element pekar på nästa och föregående, i stället för att ligga bredvid varandra i minnet. Den passar när du ofta lägger till och tar bort i början eller slutet.

Läs mer: [LinkedList](../data-structures/linked-list.md) och [Datastrukturer](../data-structures/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Namnrymd | `System.Collections.Generic` |
| Struktur | Dubbelt länkad, varje element är en nod |
| Index | Nej. Ingen `tal[0]` |
| Lägga till i början eller slutet | Snabbt |
| Söka efter ett värde | Går igenom listan från början |
| Storlek | Växer och krymper automatiskt |

## Operationer

```csharp
LinkedList<int> tal = new LinkedList<int>();
tal.AddLast(2);
tal.AddLast(3);
tal.AddFirst(1);                            // 1, 2, 3

foreach (int t in tal)
{
    Console.WriteLine(t);
}

tal.RemoveFirst();                          // 2, 3
```

| Metod / egenskap | Betydelse | Exempel | Resultat |
|------------------|-----------|---------|----------|
| `AddFirst(värde)` | Lägger till i början | `tal.AddFirst(0)` | Värdet blir första |
| `AddLast(värde)` | Lägger till i slutet | `tal.AddLast(4)` | Värdet blir sista |
| `RemoveFirst()` | Tar bort det första elementet | `tal.RemoveFirst()` | Första elementet tas bort |
| `RemoveLast()` | Tar bort det sista elementet | `tal.RemoveLast()` | Sista elementet tas bort |
| `Remove(värde)` | Tar bort första förekomsten, returnerar `bool` | `tal.Remove(2)` | `true` om något togs bort |
| `Find(värde)` | Hittar första noden med värdet | `LinkedListNode<int>? nod = tal.Find(2);` | Noden, eller `null` |
| `FindLast(värde)` | Hittar sista noden med värdet | `tal.FindLast(2)` | Noden, eller `null` |
| `AddAfter(nod, värde)` | Lägger till efter en nod | `tal.AddAfter(nod, 5);` | Nytt element efter `nod` |
| `First` / `Last` | Första och sista noden | `tal.First.Value` | Värdet i första noden |
| `Contains(värde)` | Finns värdet i listan? | `tal.Contains(3)` | `true` |
| `Count` | Antal element | `tal.Count` | Antalet |
| `Clear()` | Tar bort alla element | `tal.Clear()` | Tom lista |

```csharp
LinkedListNode<int>? nod = tal.Find(3);

if (nod is not null)
{
    Console.WriteLine(nod.Value);           // 3
}
```

## Jämförelser

| Java | C# |
|------|-----|
| `list.addFirst(v)` | `list.AddFirst(v)` |
| `list.addLast(v)` | `list.AddLast(v)` |
| `list.removeFirst()` | `list.RemoveFirst()` |
| `list.get(i)` | Finns inte. Gå igenom listan eller använd `List<T>` |
| `list.size()` | `list.Count` |

## Vanliga misstag

- **`tal[0]` finns inte** i `LinkedList<T>`. Gå igenom listan med `foreach` eller börja från `First`.
- **`Find` returnerar en nod, inte värdet.** Läs värdet med `nod.Value`.
- **Kontrollera `null`** efter `Find` och `FindLast`. Noden finns bara om värdet finns i listan.
- **Välj inte `LinkedList` av vana.** I praktiken är `List<T>` ofta snabbare, även när du lägger till i mitten. Det är en tumregel och inte en mätning, så mät själv om det är viktigt. Välj `LinkedList` när du ofta lägger till och tar bort i början eller slutet.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Nod** | Ett element i en länkad lista, med värdet och pekare till grannarna |
| **Dubbelt länkad** | Varje nod pekar både framåt och bakåt |
| **Pekare** | Referens till nästa eller föregående nod |
