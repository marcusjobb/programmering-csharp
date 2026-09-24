---
title: "Arrayer och listor (kurs)"
description: "Ibland räcker det inte med en enda variabel. Tänk dig att du vill lagra fem poäng från ett spel. Du kan skapa fem separata variabler — score, score, score…"
parent: "Datastrukturer"
nav_order: 15
---

# Lästext — Arrayer och listor

## Vad är en array?

Ibland räcker det inte med en enda variabel. Tänk dig att du vill lagra fem poäng från ett spel. Du _kan_ skapa fem separata variabler — `score`, `score`, `score` och så vidare — men det blir snabbt opraktiskt. Vad händer när du behöver femtio poäng?

En **array** löser det här. Den är en samling av värden av samma typ, ordnade i en rad. Du bestämmer storleken en gång när du skapar den, och den storleken ändras aldrig.

```csharp
// En array med fem veckodagar
string[] weekdays = { "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag" };

// En array med poäng
int[] score = { 42, 17, 88, 56, 73 };
```

Tänk på en array som en rad med lådor. Alla lådor är likadana (samma typ), de sitter i ordning, och du kan inte lägga till eller ta bort lådor efteråt.

---

## Indexering — nollbaserad

Varje plats i en array har ett nummer som kallas **index**. Det första elementet har index `0`, inte `1`. Det kan kännas ovant till en början, men det är standard i nästan alla programmeringsspråk.

```csharp
string[] weekdays = { "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag" };

Console.WriteLine(weekdays[0]);   // Måndag
Console.WriteLine(weekdays[1]);   // Tisdag
Console.WriteLine(weekdays[4]);   // Fredag
```

```mermaid
flowchart LR
    A["[0]\nMåndag"] --- B["[1]\nTisdag"] --- C["[2]\nOnsdag"] --- D["[3]\nTorsdag"] --- E["[4]\nFredag"]
    style A fill:#1a5276,stroke:#154360,color:#fff
    style B fill:#1a5276,stroke:#154360,color:#fff
    style C fill:#1a5276,stroke:#154360,color:#fff
    style D fill:#1a5276,stroke:#154360,color:#fff
    style E fill:#1a5276,stroke:#154360,color:#fff
```

Det sista giltiga indexet är alltid `array.Length - 1`. Försöker du läsa `weekdays[5]` på en array med fem element kraschar programmet med ett `IndexOutOfRangeException`. Det är ett av de vanligaste nybörjarmisstagen — håll det i bakhuvudet.

**Se även:** [programmeringstermer/arrayer.md](../programmeringstermer/arrayer.md)

---

## Loopa med for och foreach

Att skriva ut varje element för hand fungerar för tre element. För trettio är det omöjligt. Då loopar du istället.

### for-loopen ger dig index

`for`-loopen är bra när du behöver veta _vilken position_ du befinner dig på.

```csharp
int[] score = { 42, 17, 88, 56, 73 };

// Beräkna summan av alla poäng
int sum = 0;
for (int i = 0; i < score.Length; i++)
{
    sum += score[i];
}

double average = (double)sum / score.Length;
Console.WriteLine("Summa: " + sum);
Console.WriteLine("Medelvärde: " + average);
```

Observera `i < score.Length` — inte `i <= score.Length`. Det sista giltiga indexet är `Length - 1`, inte `Length`.

### foreach är renare när du bara vill läsa

När du bara vill gå igenom varje element utan att bry dig om positionen är `foreach` kortare och tydligare.

```csharp
string[] weekdays = { "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag" };

foreach (string day in weekdays)
{
    Console.WriteLine(day);
}
```

`foreach` kan inte ändra elementen och ger dig inget index. Men när du bara vill _läsa_ varje värde är det det rakaste sättet.

<details markdown="block">
<summary>Vilken loop ska jag välja?</summary>

| Situation | Loop |
|---|---|
| Jag behöver indexet (t.ex. skriva ut "Dag 1: Måndag") | `for` |
| Jag vill beräkna något med positionsbaserad logik | `for` |
| Jag vill bara läsa varje element i tur och ordning | `foreach` |
| Jag vill ändra elementen | `for` |

Välj den som gör koden mest läsbar för just det du gör. Det finns inget svar som alltid är rätt.

</details>

---

## List\<T\> — dynamisk storlek

En array är bra när du vet exakt hur många element du behöver. Men ofta vet du inte det i förväg. Du kanske bygger en shoppinglista och vet inte hur många varor användaren kommer att lägga till.

Det är där `List<T>` kommer in. En lista fungerar som en array, men den kan **växa och krympa** medan programmet kör. Du behöver inte bestämma storleken i förväg.

```csharp
// Skapa en tom lista för strängar
List<string> shoppingList = new List<string>();
```

`T` i `List<T>` är en platshållare för typen. `List<string>` är en lista med strängar, `List<int>` är en lista med heltal. Du berättar för kompilatorn vilken typ listan ska hålla.

**Se även:** [programmeringstermer/listor.md](../programmeringstermer/listor.md)

---

## Add, Remove, Contains, Count

De metoder och properties du använder mest med en lista:

```csharp
List<string> shoppingList = new List<string>();

// Lägg till varor
shoppingList.Add("Mjölk");
shoppingList.Add("Bröd");
shoppingList.Add("Ägg");
shoppingList.Add("Smör");
shoppingList.Add("Ost");

Console.WriteLine("Antal varor: " + shoppingList.Count);   // 5

// Kolla om en vara finns
bool hasBread = shoppingList.Contains("Bröd");
Console.WriteLine("Har Bröd? " + hasBread);                  // True

// Ta bort en vara
shoppingList.Remove("Bröd");
Console.WriteLine("Antal varor kvar: " + shoppingList.Count);  // 4

// Skriv ut listan
foreach (string be in shoppingList)
{
    Console.WriteLine("- " + be);
}
```

Lägg märke till att listor använder `Count`, inte `Length`. Det är en av de detaljer som är lätta att blanda ihop när man använder båda.

<details markdown="block">
<summary>Mer om Remove</summary>

`Remove()` tar bort den _första_ förekomsten av värdet. Om värdet inte finns händer ingenting — inget fel kastas.

Vill du ta bort ett element på ett visst index (inte ett visst värde) använder du `RemoveAt(int index)`:

```csharp
List<string> fruits = new List<string> { "Äpple", "Banan", "Citron" };
fruits.RemoveAt(1);   // tar bort "Banan"
```

</details>

---

## Array vs List — när väljer man vad?

| | Array | List\<T\> |
|---|---|---|
| Storlek | Fast — bestäms vid skapandet | Dynamisk — växer och krymper |
| Skapa | `string[] arr = { "a", "b" }` | `List<string> list = new List<string>()` |
| Antal element | `arr.Length` | `list.Count` |
| Lägga till | Inte möjligt | `list.Add(...)` |
| Ta bort | Inte möjligt | `list.Remove(...)` |
| Bra när... | Antalet är känt och fast | Antalet varierar under körning |

I praktiken är `List<T>` det vanligaste valet. Du vet sällan i förväg exakt hur många element du behöver. Arrayer används när storleken verkligen är fast och känd — till exempel ett schackbräde som alltid är 8x8 — eller när prestanda är kritisk och storleken aldrig ändras.

**Se även:** [programmeringstermer/arrayer.md](../programmeringstermer/arrayer.md), [programmeringstermer/listor.md](../programmeringstermer/listor.md)
