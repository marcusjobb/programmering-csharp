---
title: "Lathund: dictionary (Dictionary<TKey, TValue>)"
description: "Dictionary<TKey, TValue> i C#: nyckel-värde-par, skillnaden mellan Add och indexern, säker läsning med TryGetValue och jämförelse med Java HashMap."
parent: Lathund
nav_order: 74
---
# Lathund: dictionary (Dictionary\<TKey, TValue\>)

`Dictionary<TKey, TValue>` lagrar nyckel-värde-par och hittar ett värde utifrån sin nyckel. Den är C#:s motsvarighet till Java:s `HashMap`.

Läs mer: [Dictionary](../data-structures/dictionary.md) och [Datastrukturer](../data-structures/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Namnrymd | `System.Collections.Generic` |
| Nycklar | Unika. Nyckeln får inte vara `null` |
| Värden | Får vara `null` om typen tillåter det |
| Ordning | Garanteras inte |
| Sökning | Snabb, i genomsnitt konstant tid |
| Tom ordbok | `new Dictionary<string, int>()` |

## Operationer

### Skapa

<details>
<summary>Tom dictionary</summary>

```csharp
Dictionary<string, int> poang = new Dictionary<string, int>();
```

</details>

<details>
<summary>Med startvärden</summary>

```csharp
Dictionary<string, int> poang = new() { ["Bella"] = 87, ["Carlos"] = 65 };
```

</details>

| Metod / egenskap | Betydelse | Exempel | Resultat |
|------------------|-----------|---------|----------|
| `poang[nyckel] = värde` | Lägger till, eller skriver över om nyckeln finns | `poang["Bella"] = 90;` | Värdet för Bella blir `90` |
| `poang[nyckel]` | Hämtar värdet | `poang["Bella"]` | `90`. Kastar `KeyNotFoundException` om nyckeln saknas |
| `Add(nyckel, värde)` | Lägger till. Kastar undantag om nyckeln redan finns | `poang.Add("Dani", 70);` | Nytt par |
| `TryAdd(nyckel, värde)` | Lägger till, returnerar `false` om nyckeln redan finns | `poang.TryAdd("Bella", 50);` | `false`, ingen ändring |
| `ContainsKey(nyckel)` | Finns nyckeln? | `poang.ContainsKey("Carlos")` | `true` |
| `ContainsValue(värde)` | Finns värdet? Söker igenom alla par | `poang.ContainsValue(65)` | `true` |
| `TryGetValue(nyckel, out värde)` | Hämtar värdet utan att kasta undantag | `poang.TryGetValue("Bella", out int p)` | `true`, och `p` får värdet |
| `Remove(nyckel)` | Tar bort paret, returnerar `bool` | `poang.Remove("Carlos")` | `true` om paret fanns |
| `Keys` | Samling av alla nycklar | `poang.Keys` | Nycklarna |
| `Values` | Samling av alla värden | `poang.Values` | Värdena |
| `Count` | Antal par | `poang.Count` | Antalet |
| `Clear()` | Tar bort alla par | `poang.Clear()` | Tom ordbok |

```csharp
Dictionary<string, int> poang = new Dictionary<string, int>();
poang.Add("Bella", 87);
poang["Carlos"] = 65;                       // lägger till ett nytt par

if (poang.TryGetValue("Bella", out int bellasPoang))
{
    Console.WriteLine(bellasPoang);         // 87
}

foreach (KeyValuePair<string, int> par in poang)
{
    Console.WriteLine($"{par.Key}: {par.Value}");
}
```

## Jämförelser

| Java `HashMap<K, V>` | C# `Dictionary<TKey, TValue>` |
|----------------------|-------------------------------|
| `map.put(k, v)` | `dict[k] = v` |
| `map.get(k)` (ger `null` om saknas) | `dict[k]` (kastar `KeyNotFoundException`). Använd `TryGetValue` |
| `map.containsKey(k)` | `dict.ContainsKey(k)` |
| `map.containsValue(v)` | `dict.ContainsValue(v)` |
| `map.remove(k)` | `dict.Remove(k)` |
| `map.keySet()` | `dict.Keys` |
| `map.values()` | `dict.Values` |
| `map.entrySet()` | `dict`, där `foreach` ger `KeyValuePair` |
| `map.size()` | `dict.Count` |
| `map.isEmpty()` | `dict.Count == 0` |

## Vanliga misstag

- **`Add` med en nyckel som redan finns** kastar `ArgumentException`. Indexern skriver däremot över tyst. Välj det du menar.
- **Läsa med en saknad nyckel** kastar `KeyNotFoundException`. Använd `TryGetValue` eller kontrollera med `ContainsKey` först.
- **Ordningen garanteras inte.** Om du behöver sorterad ordning, använd `SortedDictionary<TKey, TValue>`.
- **`ContainsValue` är långsam** eftersom den går igenom alla par. Använd den bara när du inte kan söka med nyckeln.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Nyckel** | Unik identifierare som används för att hitta ett värde |
| **Värde** | Det som lagras under nyckeln |
| **KeyValuePair** | Ett par av nyckel och värde, som `foreach` ger dig |
| **Hash** | Ett tal som beräknas från nyckeln och används för att hitta platsen |
