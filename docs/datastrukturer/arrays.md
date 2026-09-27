---
title: Arrays
description: "Ibland räcker det inte med en enda variabel. En array är en samling av värden av samma typ, ordnade i en rad, med en storlek som bestäms en gång och aldrig ändras."
parent: Datastrukturer
nav_order: 10
---
# Arrays

Ibland räcker det inte med en enda variabel. Tänk dig att du vill lagra fem poäng från ett spel. Du *kan* skapa fem separata variabler — `score1`, `score2` och så vidare — men det blir snabbt opraktiskt. Vad händer när du behöver femtio poäng?

En **array** löser det här. Den är en samling av värden av samma typ, ordnade i en rad. Du bestämmer storleken en gång när du skapar den, och den storleken ändras aldrig.

```csharp
// En array med fem veckodagar
string[] weekdays = { "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag" };

// En array med poäng
int[] score = { 42, 17, 88, 56, 73 };
```

Tänk på en array som en rad med lådor. Alla lådor är likadana (samma typ), de sitter i ordning, och du kan inte lägga till eller ta bort lådor efteråt.

## När du läst detta ska du kunna

- Deklarera och fylla en array
- Läsa och ändra element via index
- Loopa över en array med `for` och `foreach`
- Avgöra när en array är rätt val, och när `List<T>` är bättre

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

**Se även:** [Samlingar i ordlistan](../ordlista/Samlingar.md)

## Loopa med for och foreach

Att skriva ut varje element för hand fungerar för tre element. För trettio är det omöjligt. Då loopar du istället.

### for-loopen ger dig index

`for`-loopen är bra när du behöver veta *vilken position* du befinner dig på.

```csharp
int[] score = { 42, 17, 88, 56, 73 };

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

`foreach` kan inte ändra elementen och ger dig inget index. Men när du bara vill *läsa* varje värde är det det rakaste sättet.

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

## Array vs List — när väljer man vad?

En array är rätt val när storleken verkligen är fast och känd i förväg — ett schackbräde som alltid är 8x8, veckans sju dagar. I de flesta andra fall vet du inte hur många element du kommer behöva, och då är [List\<T\>](list.md) det bättre valet — den har samma indexering och loopmönster som en array, men kan växa och krympa.

## Obligatorisk dad-joke

Varför gick arrayen aldrig ut och festade?

Den visste redan exakt hur många den skulle bli — ingen plats för överraskningar.
