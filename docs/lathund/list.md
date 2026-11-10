---
title: "Lathund: lista (List<T>)"
description: "List<T> i C#: lägga till, ta bort, söka och sortera i en lista som växer och krymper, samt varför ArrayList undviks i nya program."
parent: Lathund
nav_order: 72
---
# Lathund: lista (List\<T\>)

`List<T>` är en lista som växer och krymper av sig själv. Det är den vanligaste samlingen i C#. Java-motsvarigheten är `ArrayList<E>`.

Läs mer: [List\<T\>](../data-structures/list.md) och [Datastrukturer](../data-structures/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Namnrymd | `System.Collections.Generic` |
| Storlek | Växer och krymper automatiskt |
| Index | Börjar på 0 |
| Dubbletter | Tillåts |
| Ordning | Behålls som du lägger in den |
| Tom lista | `new List<int>()` eller `[]` |

## Operationer

```csharp
List<string> namn = new List<string>();     // tom lista
List<int> tal = [3, 1, 2];                  // collection expression, C# 12 och senare

namn.Add("Kalle");
namn.Add("Pelle");
namn.Insert(1, "Tjalle");                   // ["Kalle", "Tjalle", "Pelle"]
namn.Remove("Kalle");                       // tar bort första förekomsten
namn.RemoveAt(0);                           // tar bort elementet på index 0

Console.WriteLine(namn.Count);              // 1
Console.WriteLine(namn[0]);                 // Pelle
```

| Metod / egenskap | Betydelse | Exempel | Resultat |
|------------------|-----------|---------|----------|
| `Add(värde)` | Lägger till sist | `tal.Add(4)` | Listan blir `[3, 1, 2, 4]` |
| `AddRange(samling)` | Lägger till flera sist | `tal.AddRange([5, 6])` | Listan får `5` och `6` sist |
| `Insert(index, värde)` | Lägger till på ett index | `tal.Insert(0, 9)` | Listan börjar med `9` |
| `Remove(värde)` | Tar bort första förekomsten, returnerar `bool` | `tal.Remove(1)` | `true` om något togs bort |
| `RemoveAt(index)` | Tar bort elementet på ett index | `tal.RemoveAt(0)` | Första elementet tas bort |
| `RemoveAll(villkor)` | Tar bort alla element som matchar | `tal.RemoveAll(x => x > 2)` | Antal borttagna returneras |
| `Contains(värde)` | Finns värdet i listan? | `tal.Contains(2)` | `true` |
| `IndexOf(värde)` | Index för första förekomsten | `tal.IndexOf(2)` | Index, eller `-1` om saknas |
| `Find(villkor)` | Första elementet som matchar | `tal.Find(x => x > 1)` | Elementet, eller `default` om inget matchar |
| `Exists(villkor)` | Finns något element som matchar? | `tal.Exists(x => x > 1)` | `true` |
| `Sort()` | Sorterar i stigande ordning | `tal.Sort()` | Listan ändras |
| `Reverse()` | Vänder ordningen | `tal.Reverse()` | Listan ändras |
| `ToArray()` | Kopia som array | `int[] arr = tal.ToArray();` | Ny array |
| `Clear()` | Tar bort alla element | `tal.Clear()` | Tom lista |
| `Count` | Antal element | `tal.Count` | Antalet |

## Jämförelser

Java använder `ArrayList<Integer>`. I C# skriver du `List<int>`. Det finns även en klass som heter `ArrayList` i `System.Collections`, men den lagrar allt som `object` och används inte i nya program.

| Egenskap | `List<T>` | `ArrayList` |
|----------|-----------|-------------|
| Namnrymd | `System.Collections.Generic` | `System.Collections` |
| Typ | Generisk, till exempel `List<int>` | Lagrar `object` |
| Kontroll av typ | Vid kompilering | Först vid körning |
| Värdetyper (`int`) | Lagras utan omvandling | Boxas till `object` |

```csharp
// Undvik i nya program: fel typ upptäcks först när programmet kör
ArrayList gammal = new ArrayList();
gammal.Add(42);
gammal.Add("text");

// Använd i stället: samma typ hela vägen
List<int> tal = new List<int>();
tal.Add(42);
// tal.Add("text");                         // kompileringsfel
```

## Vanliga misstag

- **Index utanför intervallet** kastar `ArgumentOutOfRangeException`. Kontrollera `Count` först.
- **`Sort()` och `Reverse()` returnerar ingenting.** `var sorterad = tal.Sort();` fungerar inte. Anropet ändrar listan på plats.
- **Ändra inte listan i en `foreach`.** Ändringen kastar `InvalidOperationException`. Samla de element du vill ta bort och ta bort dem efteråt.
- **`Remove` kastar inget** om värdet saknas. Kontrollera returvärdet om det spelar roll.
- **`Find` returnerar `default`**, till exempel `0` för `int`, när inget matchar. Använd `Exists` om du bara vill veta om något finns.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Generisk** | Typ som tar en typparameter, skrivs med `<>` |
| **Typparameter** | Platshållaren `T` som du ersätter med en riktig typ |
| **Dynamisk storlek** | Listan växer när du lägger till element |
| **Boxning** | Omvandling av en värdetyp till `object`, som kostar prestanda |
| **Kapacitet** | Antal platser listan har reserverat internt, inte antalet element |
