---
title: List
description: "List i Datastrukturer — C#-boken av Marcus Ackre Medina"
layout: default
parent: Datastrukturer
nav_order: 10
---
# List


## Beskrivning

Vi använder olika typer av listor, för att slippa hantera Arrays :)

### Vad är en lista?

En lista är en klass som implementerar en samling av objekt. Listan är en dynamisk samling av objekt, vilket innebär att den kan växa och minska i storlek. Detta är en stor fördel jämfört med en array, som har en fast storlek.

Listan är en klass som ärver från CollectionBase, vilket innebär att den har samma egenskaper som en array.

### Vilka typer av listor finns det?

Det finns Arraylistor, LinkedListor och Generiska listor. Det finns även en Stack och en Queue, som är en specialiserad lista.

Absolut! Här är en fortsättning på artikeln om List med förklaringar och exempel med hjälp av Star Wars-hjältar:

## Vad är en generisk lista?

En generisk lista är en typ av lista som tillåter hantering av objekt av vilken typ som helst. Genom att använda generiska listor kan du undvika behovet av att omvandla objekt till och från en specifik typ, vilket ger enklare och mer typsäker kod. I C# används den generiska List-klassen från System.Collections.Generic-namespace för att skapa generiska listor.

För att skapa en generisk lista i C# med Star Wars-hjältar kan du använda följande kodexempel:

```csharp
List<string> starWarsHeroes = new List<string>();

// Lägg till hjältar i listan
starWarsHeroes.Add("Luke Skywalker");
starWarsHeroes.Add("Princess Leia");
starWarsHeroes.Add("Han Solo");
starWarsHeroes.Add("Obi-Wan Kenobi");

// Hämta antalet hjältar i listan
int count = starWarsHeroes.Count;
Console.WriteLine("Antal hjältar: " + count);

// Hämta en hjälte från listan baserat på index
string hero = starWarsHeroes[0];
Console.WriteLine("Första hjälten: " + hero);

// Uppdatera en hjälte i listan
starWarsHeroes[3] = "Yoda";

// Ta bort en hjälte från listan
starWarsHeroes.Remove("Han Solo");

// Loopa igenom och skriv ut alla hjältar i listan
foreach (string name in starWarsHeroes)
{
    Console.WriteLine(name);
}
```

Output:
```
Count heroes: 4
First hero: Luke Skywalker
Luke Skywalker
Princess Leia
Yoda
```

I det här exemplet skapar vi en generisk lista av typen `string` och fyller den med Star Wars-hjältarnas namn. Vi använder sedan olika metoder som `Add`, `Count`, `Remove` och indexeringsoperatorn `[]` för att hantera och manipulera listan. Slutligen loopar vi igenom listan med hjälp av en `foreach`-loop och skriver ut namnen på hjältarna.

Genom att använda den generiska List-klassen kan du enkelt hantera och manipulera listor med objekt av vilken typ som helst, inklusive Star Wars-hjältar!

Fortsätt gärna att utforska andra datastrukturer och hur de kan användas inom programmering. Varje datastruktur har sina egna unika egenskaper och användningsområden, och kunskap om dem kan vara värdefull för att skapa effektiv och strukturerad kod.

## Vad är en arraylista?

En arraylista är en typ av lista som tillåter hantering av objekt av vilken typ som helst. Arraylistan är en dynamisk samling av objekt, vilket innebär att den kan växa och minska i storlek. Detta är en stor fördel jämfört med en array, som har en fast storlek.

Arraylistan är en klass som ärver från CollectionBase, vilket innebär att den har samma egenskaper som en array.

För att skapa en arraylista i C# med Star Wars-hjältar kan du använda följande kodexempel:

```csharp
ArrayList starWarsHeroes = new ArrayList();

// Lägg till hjältar i listan
starWarsHeroes.Add("Luke Skywalker");
starWarsHeroes.Add("Princess Leia");
starWarsHeroes.Add("Han Solo");
starWarsHeroes.Add("Obi-Wan Kenobi");

// Hämta antalet hjältar i listan
int count = starWarsHeroes.Count;
Console.WriteLine("Antal hjältar: " + count);

// Hämta en hjälte från listan baserat på index
string hero = (string)starWarsHeroes[0];
Console.WriteLine("Första hjälten: " + hero);

// Uppdatera en hjälte i listan
starWarsHeroes[3] = "Yoda";

// Ta bort en hjälte från listan
starWarsHeroes.Remove("Han Solo");

// Loopa igenom och skriv ut alla hjältar i listan
foreach (string name in starWarsHeroes)
{
    Console.WriteLine(name);
}
```

Output:
```
Count heroes: 4
First hero: Luke Skywalker
Luke Skywalker
Princess Leia
Yoda
```

I det här exemplet skapar vi en arraylista och fyller den med Star Wars-hjältarnas namn. Vi använder sedan olika metoder som `Add`, `Count`, `Remove` och indexeringsoperatorn `[]` för att hantera och manipulera listan. Slutligen loopar vi igenom listan med hjälp av en `foreach`-loop och skriver ut namnen på hjältarna.

Genom att använda en arraylista kan du enkelt hantera och manipulera listor med objekt av vilken typ som helst, inklusive Star Wars-hjältar!

ArrayListor kan ta emot olika typer samtidigt, detta gör att man måste omvandla tillbaka till den typ man vill använda. Det kan göra ArrayListor lite krångliga att använda.

```csharp
ArrayList luke = new ArrayList();

luke.Add("Luke Skywalker");
luke.Add(23); // Ålder
luke.Add(true); // Är han en jedi?

string name = (string)luke[0];
int age = (int)luke[1];
bool isJedi = (bool)luke[2];
```

Fortsätt gärna att utforska andra datastrukturer och hur de kan användas inom programmering. Varje datastruktur har sina egna unika egenskaper och användningsområden, och kunskap om dem kan vara värdefull för att skapa effektiv och strukturerad kod.

## TL;DR

Med listor kan vi samla ihop flera objekt av samma typ. Vi kan sedan använda olika metoder för att hantera listan. Vi kan t.ex. lägga till och ta bort objekt, eller hämta ett objekt baserat på dess index. Vi kan även loopa igenom listan och göra något med varje objekt.

## Obligatorisk dad-joke

Varför gillar programmerare att arbeta med listor?

För att de är *listiga* och hjälper till att *hålla ordning* på saker!
