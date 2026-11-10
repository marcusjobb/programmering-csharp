---
title: "Lathund: arrayer"
description: "Arrayer i C#: skapa, läsa och ändra element, de vanligaste metoderna i Array-klassen och skillnader mot Java."
parent: Lathund
nav_order: 71
---
# Lathund: arrayer

En array är en samling värden av samma typ med fast storlek. Använd den när du vet hur många värden du ska lagra och inte behöver ändra storleken.

Läs mer: [Datastrukturer](../data-structures/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Storlek | Fast, sätts när arrayen skapas |
| Typ | Alla element är av samma typ |
| Index | Börjar på 0 |
| Standardvärde | `0` för tal, `false` för `bool`, `null` för `string` och andra referenstyper |
| Längd | Egenskapen `Length` |
| Klass | `Array` (namnrymden `System`) |

## Operationer

### Skapa

<details>
<summary>Med angiven storlek</summary>

```csharp
int[] tal = new int[5];                // fem element, alla 0
```

</details>

<details>
<summary>Med startvärden</summary>

```csharp
int[] tal = [1, 2, 3, 4, 5];           // collection expression, C# 12 och senare
```

</details>

<details>
<summary>Med startvärden, långa form</summary>

```csharp
int[] tal = new int[] { 1, 2, 3, 4, 5 };
```

</details>

| Metod / egenskap | Betydelse | Exempel | Resultat |
|------------------|-----------|---------|----------|
| `tal[index]` | Läser eller ändrar ett element | `tal[0]` | Första elementet |
| `tal[^1]` | Läser från slutet | `tal[^1]` | Sista elementet |
| `tal.Length` | Antal element | `tal.Length` | `5` |
| `Array.Sort(tal)` | Sorterar i stigande ordning | `Array.Sort(tal)` | Arrayen ändras |
| `Array.Reverse(tal)` | Vänder ordningen | `Array.Reverse(tal)` | Arrayen ändras |
| `Array.IndexOf(tal, 3)` | Index för första förekomsten | `Array.IndexOf(tal, 3)` | `2`, eller `-1` om värdet saknas |
| `Array.Find(tal, x => x > 3)` | Första elementet som matchar ett villkor | `Array.Find(tal, x => x > 3)` | `4` |
| `Array.FindAll(tal, x => x > 3)` | Alla element som matchar ett villkor | `Array.FindAll(tal, x => x > 3)` | En ny array med `4` och `5` |
| `Array.Exists(tal, x => x > 3)` | Finns något element som matchar? | `Array.Exists(tal, x => x > 3)` | `true` |
| `Array.ForEach(tal, x => ...)` | Kör en handling på varje element | `Array.ForEach(tal, x => Console.WriteLine(x));` | Skriver ut alla element |
| `Array.Clear(tal, 0, tal.Length)` | Sätter alla element till standardvärdet | `Array.Clear(tal, 0, tal.Length)` | Alla element blir `0` |
| `Array.Copy(kalla, mal, antal)` | Kopierar element till en befintlig array | `Array.Copy(a, b, a.Length)` | `b` får samma innehåll som `a` |
| `(int[])tal.Clone()` | Skapar en ny array med samma innehåll | `int[] kopia = (int[])tal.Clone();` | Ny array, separat från `tal` |
| `Array.Resize(ref tal, 10)` | Byter storlek genom att skapa en ny array och kopiera | `Array.Resize(ref tal, 10);` | `tal` pekar på en array med 10 element |

```csharp
int[] tal = [1, 2, 3, 4, 5];

Console.WriteLine(tal[0]);             // 1
Console.WriteLine(tal[^1]);            // 5
tal[2] = 99;                           // ändrar tredje elementet

foreach (int nummer in tal)
{
    Console.WriteLine(nummer);
}
```

## Jämförelser

| Java | C# |
|------|-----|
| `int[] tal = new int[5];` | `int[] tal = new int[5];` (samma) |
| `tal.length` | `tal.Length` |
| `Arrays.sort(tal)` | `Array.Sort(tal)` |
| `Arrays.fill(tal, 0)` | `Array.Fill(tal, 0)` |
| `Arrays.copyOf(tal, tal.length)` | `(int[])tal.Clone()` |
| `Arrays.toString(tal)` | `string.Join(", ", tal)` |

## Vanliga misstag

- **Index utanför intervallet** kastar `IndexOutOfRangeException`. En array med fem element har index 0 till 4.
- **`Array.Find` returnerar standardvärdet** (`0` för `int`) när inget matchar, inte `-1`. Använd `Array.Exists` eller `Array.IndexOf` om du behöver veta om värdet finns.
- **Tilldelning kopierar inte arrayen.** `int[] b = a;` ger två namn på samma array. Använd `Clone()` för en kopia.
- **Fast storlek.** Du kan inte lägga till element i en array. Behöver du växa, använd [List\<T\>](list.md).

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Array** | Samling av värden av samma typ med fast storlek |
| **Index** | Platsen för ett element, räknat från 0 |
| **Element** | Ett enskilt värde i arrayen |
| **Längd** (Length) | Antalet element i arrayen |
| **Standardvärde** | Värdet varje plats får när arrayen skapas |
