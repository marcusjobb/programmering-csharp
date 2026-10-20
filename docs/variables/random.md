---
title: Random
description: "Datorer är deterministiska — de gör exakt det du säger åt dem. Slump finns inte på riktigt. Vad Random faktiskt gör är att beräkna en lång sekvens av tal…"
parent: Variabler
nav_order: 60
---
# Random

Datorer är deterministiska — de gör exakt det du säger åt dem. Slump finns inte på riktigt. Vad `Random` faktiskt gör är att beräkna en lång sekvens av tal som _ser ut_ som slump, baserat på ett startvärde (seed).

I de flesta program är det precis vad du behöver.

## När du läst detta ska du kunna

- Använda `Random.Shared` för enkel slump
- Generera heltal, decimaltal och booleska värden
- Förklara vad ett seed är och varför det spelar roll
- Blanda en lista med `Random`

## Random.Shared — det moderna sättet

Sedan .NET 6 finns `Random.Shared` — en trådsäker delad instans som du kan använda direkt utan att skapa ett eget objekt.

```csharp
int diceRoll = Random.Shared.Next(1, 7);  // 1–6
Console.WriteLine(diceRoll);
```

Använd `Random.Shared` som förstaval i nya program.

## Skapa en egen instans

```csharp
var rng = new Random();

int wholeNumber = rng.Next(1, 101);       // 1–100 (övre gränsen exkluderas)
double randomDecimal = rng.NextDouble();   // 0.0 – 0.9999...
bool truthy = rng.NextBool();              // true eller false (50/50)
```

## Vanliga metoder

```csharp
var rng = new Random();

// Heltal — övre gränsen exkluderas
Console.WriteLine(rng.Next(1, 7));      // Tärning: 1–6
Console.WriteLine(rng.Next(0, 52));     // Kortlek: 0–51
Console.WriteLine(rng.Next(100, 200));  // 100–199

// Decimaltal
Console.WriteLine(rng.NextDouble());    // 0.0 – <1.0

// Boolean (kräver .NET 6+)
Console.WriteLine(rng.NextBool());      // True eller False

// Bytes
byte[] buffer = new byte[8];
rng.NextBytes(buffer);                  // Fyller bufferten med slumpmässiga bytes
```

## Seed — reproducerbar slump

Med ett fast seed ger `Random` alltid samma sekvens. Användbart för tester och demo.

```csharp
var rng1 = new Random(42);
var rng2 = new Random(42);

// Båda ger exakt samma sekvens
Console.WriteLine(rng1.Next(1, 7));  // T.ex. 3
Console.WriteLine(rng2.Next(1, 7));  // Också 3
```

Utan seed används systemklockan som startvärde, vilket ger en annan sekvens varje körning.

## Blanda en lista

```csharp
var deck = new List<string> { "Hjärter A", "Spader K", "Ruter Q", "Klöver J" };

// Fisher-Yates shuffle
for (int i = deck.Count - 1; i > 0; i--)
{
    int j = Random.Shared.Next(i + 1);
    (deck[i], deck[j]) = (deck[j], deck[i]);
}

foreach (var card in deck)
    Console.WriteLine(card);
```

## Plocka ett slumpmässigt element

```csharp
string[] answers = { "Ja", "Nej", "Kanske", "Fråga igen" };

int index = Random.Shared.Next(answers.Length);
Console.WriteLine(answers[index]);  // Ett av de fyra svaren
```

## Fallgropar

**Skapa inte ett nytt `Random()`-objekt i en loop.** Samma seed (via klockan) ger samma sekvens — du får inte slump.

```csharp
// Fel — alla instanser kan få samma seed
for (int i = 0; i < 5; i++)
{
    var rng = new Random();          // Kan ge samma seed varje varv
    Console.WriteLine(rng.Next());
}

// Rätt
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(Random.Shared.Next());  // Delar en instans
}
```

## TL;DR

`Random.Shared.Next(min, max)` för enkel slump — övre gränsen exkluderas. Skapa en enda instans och återanvänd den. Sätt ett seed om du vill ha reproducerbara resultat.
