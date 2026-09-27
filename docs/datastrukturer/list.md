---
title: List
description: "En array är bra när du vet exakt hur många element du behöver. List<T> är samma idé, men den kan växa och krympa medan programmet kör."
parent: Datastrukturer
nav_order: 15
---
# List\<T\>

[Arrays](arrays.md) är bra när du vet exakt hur många element du behöver. Men ofta vet du inte det i förväg. Du kanske bygger en shoppinglista och vet inte hur många varor användaren kommer att lägga till.

Det är där `List<T>` kommer in. En lista fungerar som en array — samma indexering, samma loopmönster — men den kan **växa och krympa** medan programmet kör. Du behöver inte bestämma storleken i förväg.

```csharp
List<string> shoppingList = new List<string>();
```

`T` i `List<T>` är en platshållare för typen. `List<string>` är en lista med strängar, `List<int>` är en lista med heltal. Du berättar för kompilatorn vilken typ listan ska hålla, och den håller dig till det — `shoppingList.Add(42)` kompilerar inte på en `List<string>`.

## När du läst detta ska du kunna

- Skapa en `List<T>` och lägga till/ta bort element
- Använda `Add`, `Remove`, `RemoveAt`, `Insert`, `Contains`, `IndexOf`
- Sortera en lista med `Sort()`
- Förklara varför `List<T>` nästan alltid vinner över den äldre `ArrayList`

## Add, Remove, Contains, Count

De metoder och properties du använder mest med en lista:

```csharp
List<string> shoppingList = new List<string>();

shoppingList.Add("Mjölk");
shoppingList.Add("Bröd");
shoppingList.Add("Ägg");

Console.WriteLine("Antal varor: " + shoppingList.Count);   // 3

bool hasBread = shoppingList.Contains("Bröd");
Console.WriteLine("Har Bröd? " + hasBread);                  // True

shoppingList.Remove("Bröd");
Console.WriteLine("Antal varor kvar: " + shoppingList.Count);  // 2

foreach (string item in shoppingList)
{
    Console.WriteLine("- " + item);
}
```

Lägg märke till att listor använder `Count`, inte `Length` — en av de detaljer som är lätta att blanda ihop när man använder båda.

<details markdown="block">
<summary>Mer om Remove och RemoveAt</summary>

`Remove()` tar bort den *första* förekomsten av värdet. Om värdet inte finns händer ingenting — inget fel kastas.

Vill du ta bort ett element på ett visst index (inte ett visst värde) använder du `RemoveAt(int index)`:

```csharp
List<string> fruits = new List<string> { "Äpple", "Banan", "Citron" };
fruits.RemoveAt(1);   // tar bort "Banan"
```

</details>

## Insert — lägg till på en specifik plats

`Add()` lägger alltid till sist. Vill du sticka in ett element på en given position, använd `Insert`:

```csharp
List<string> queue = new List<string> { "Anna", "Björn", "Carina" };
queue.Insert(1, "Prioriterad kund");

// "Anna", "Prioriterad kund", "Björn", "Carina"
```

Allt från den positionen och framåt flyttas ett steg bakåt — det är en `O(n)`-operation, inte gratis för en stor lista.

## IndexOf och Sort

```csharp
List<int> numbers = new List<int> { 42, 17, 88, 56, 73 };

int position = numbers.IndexOf(88);
Console.WriteLine(position);   // 3

numbers.Sort();
Console.WriteLine(string.Join(", ", numbers));   // 17, 42, 56, 73, 88
```

`IndexOf` returnerar `-1` om värdet inte finns — kolla alltid det innan du använder returvärdet som ett index. `Sort()` sorterar listan på plats; vill du behålla originalordningen, sortera en kopia istället (`numbers.OrderBy(n => n).ToList()`, se [LINQ](linq.md)).

## Array vs List — snabb jämförelse

| | Array | List\<T\> |
|---|---|---|
| Storlek | Fast — bestäms vid skapandet | Dynamisk — växer och krymper |
| Antal element | `arr.Length` | `list.Count` |
| Lägga till/ta bort | Inte möjligt | `Add`, `Remove`, `Insert` |
| Bra när... | Antalet är känt och fast | Antalet varierar under körning |

I praktiken är `List<T>` det vanligaste valet. Du vet sällan i förväg exakt hur många element du behöver.

## Varför inte ArrayList?

Innan generics (C# 2, 2005) fanns bara `ArrayList` — en lista som kunde lagra *vilken typ som helst* blandat, eftersom den internt jobbade med `object`:

```csharp
ArrayList mixed = new ArrayList();
mixed.Add("text");
mixed.Add(42);          // helt tillåtet — och det är problemet

int value = (int)mixed[1];   // måste castas manuellt, kan krascha om typen är fel
```

`List<T>` löser det: du deklarerar typen en gång, kompilatorn håller koll resten av vägen, och ingen boxning/casting behövs för värdetyper. Det finns i praktiken inget skäl att välja `ArrayList` i ny kod — den lever kvar bara för bakåtkompatibilitet med gammal kod.

## Obligatorisk dad-joke

Varför är `List<T>` så avslappnad jämfört med en array?

Den vet att den alltid kan växa om den behöver plats för fler bekymmer.
