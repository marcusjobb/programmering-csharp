---
title: "Lathund: hashset (HashSet<T>)"
description: "HashSet<T> i C#: en samling unika värden, snabb kontroll om ett värde finns, och mängdoperationer som ändrar mängden på plats."
parent: Lathund
nav_order: 75
---
# Lathund: hashset (HashSet\<T\>)

`HashSet<T>` är en samling där varje värde bara finns en gång. Den är snabb på att kontrollera om ett värde finns, och den kan räkna union, snitt och differens mellan två mängder.

Läs mer: [HashSet](../data-structures/hash-set.md) och [Datastrukturer](../data-structures/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Namnrymd | `System.Collections.Generic` |
| Dubbletter | Tillåts inte |
| Index | Nej. Ingen `mangd[0]` |
| Ordning | Garanteras inte |
| Sökning | Snabb, i genomsnitt konstant tid |
| Tom mängd | `new HashSet<int>()` |

## Operationer

```csharp
HashSet<string> kalle = new HashSet<string> { "Tennis", "Fotboll" };

Console.WriteLine(kalle.Add("Tennis"));     // False, finns redan
Console.WriteLine(kalle.Add("Simning"));    // True, nytt värde
Console.WriteLine(kalle.Contains("Tennis")); // True
```

| Metod / egenskap | Betydelse | Exempel | Resultat |
|------------------|-----------|---------|----------|
| `Add(värde)` | Lägger till. Returnerar `false` om värdet redan finns | `mangd.Add(1)` | `true` eller `false` |
| `Remove(värde)` | Tar bort värdet, returnerar `bool` | `mangd.Remove(1)` | `true` om något togs bort |
| `Contains(värde)` | Finns värdet? | `mangd.Contains(1)` | `true` eller `false` |
| `Count` | Antal unika värden | `mangd.Count` | Antalet |
| `Clear()` | Tar bort alla värden | `mangd.Clear()` | Tom mängd |
| `TrimExcess()` | Frigör reserverat minne som inte används | `mangd.TrimExcess()` | Mängden ändras inte |
| `ToArray()` | Kopia som array (från `System.Linq`) | `mangd.ToArray()` | Ny array |

### Mängdoperationer

Dessa metoder ändrar den mängd du anropar. De skapar inte en ny.

| Metod | Betydelse | Exempel |
|-------|-----------|---------|
| `UnionWith(annan)` | Lägger till alla värden från `annan` | `mangd.UnionWith(annan)` |
| `IntersectWith(annan)` | Behåller bara värden som finns i båda | `mangd.IntersectWith(annan)` |
| `ExceptWith(annan)` | Tar bort värden som finns i `annan` | `mangd.ExceptWith(annan)` |
| `IsSubsetOf(annan)` | Finns alla värden även i `annan`? | `mangd.IsSubsetOf(annan)` |
| `IsSupersetOf(annan)` | Innehåller `mangd` alla värden i `annan`? | `mangd.IsSupersetOf(annan)` |
| `Overlaps(annan)` | Finns minst ett gemensamt värde? | `mangd.Overlaps(annan)` |
| `SetEquals(annan)` | Innehåller båda exakt samma värden? | `mangd.SetEquals(annan)` |

```csharp
HashSet<string> kalle = new HashSet<string> { "Tennis", "Fotboll" };
HashSet<string> pelle = new HashSet<string> { "Fotboll", "Simning" };

kalle.IntersectWith(pelle);                 // kalle innehåller nu bara "Fotboll"
Console.WriteLine(kalle.Count);             // 1
```

## Jämförelser

| Java | C# |
|------|-----|
| `set.add(v)` | `set.Add(v)` |
| `set.remove(v)` | `set.Remove(v)` |
| `set.contains(v)` | `set.Contains(v)` |
| `set.size()` | `set.Count` |
| `set.retainAll(annan)` | `set.IntersectWith(annan)` |
| `set.addAll(annan)` | `set.UnionWith(annan)` |
| `set.removeAll(annan)` | `set.ExceptWith(annan)` |

## Vanliga misstag

- **Mängdoperationer ändrar originalet.** `UnionWith`, `IntersectWith` och `ExceptWith` ändrar `mangd` på plats. Om du behöver originalet, kopiera först: `new HashSet<string>(kalle)`.
- **`Add` kastar inget vid dubblett.** Den returnerar `false`. Kontrollera returvärdet om du behöver veta om värdet var nytt.
- **Ingen index.** `mangd[0]` finns inte. Gå igenom mängden med `foreach`.
- **Ordningen garanteras inte.** Använd en `List<T>` om ordningen spelar roll.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Mängd** | Samling där varje värde bara finns en gång |
| **Union** | Alla värden från båda mängderna |
| **Snitt** (intersection) | Värden som finns i båda mängderna |
| **Differens** | Värden i den ena mängden som inte finns i den andra |
| **Delmängd** (subset) | Mängd där alla värden finns i en annan mängd |
