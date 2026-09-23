---
title: Arrays
description: "Arrays i Datastrukturer — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Datastrukturer
nav_order: 20
---
# Arrays

<details open markdown="block">
  <summary>
    Innehållsförteckning
  </summary>
  {: .text-delta }

1. TOC
{:toc}

</details>

## Beskrivning

En array är en grundläggande datastruktur inom programmering som tillåter lagring av en samling av element av samma datatyp. Den används för att organisera och hantera större mängder data på ett strukturerat sätt.

En array kan tänkas som en linjär samling av "lådor" eller "fack", där varje låda innehåller ett element. Varje element i arrayen har en specifik position, känd som dess index, som används för att komma åt och manipulera elementet.

För att deklarera och skapa en array i C# använder vi följande syntax:

```csharp
dataType[] arrayName = new dataType[arrayLength];
```

Här är en förklaring av de olika delarna av arraydeklarationen:

- `dataType`: Anger den datatyp som elementen i arrayen kommer att ha, t.ex. int, string, bool, osv.
- `arrayName`: Namnet på arrayen, som du kan välja själv.
- `arrayLength`: Antalet element som arrayen ska ha.

Exempelvis kan vi deklarera och skapa en array av heltal med 5 element på följande sätt:

```csharp
int[] numbers = new int[5];
```

Efter att en array har skapats kan vi tilldela värden till dess enskilda element och få tillgång till elementen genom att använda deras index. Indexeringen i en array börjar alltid på 0, vilket innebär att det första elementet i arrayen har index 0, det andra elementet har index 1, och så vidare.

Här är ett exempel som tilldelar värden till några element i vår tidigare skapade array och sedan skriver ut dessa värden:

```csharp
numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;
numbers[3] = 40;
numbers[4] = 50;

Console.WriteLine(numbers[0]);  // Output: 10
Console.WriteLine(numbers[2]);  // Output: 30
Console.WriteLine(numbers[4]);  // Output: 50
```

Det finns också olika metoder och egenskaper som kan användas tillsammans med arrayer för att underlätta deras hantering och bearbetning. Till exempel kan vi använda egenskapen `Length` för att få antalet element

 i en array:

```csharp
int[] numbers = new int[5];
Console.WriteLine(numbers.Length);  // Output: 5
```

Det är viktigt att komma ihåg att storleken på en array inte kan ändras efter att den har skapats. Om vi behöver lägga till eller ta bort element i en samling på ett dynamiskt sätt kan det vara mer lämpligt att använda andra datastrukturer, som List i C#.

## Exempel

Här är ett exempel som visar hur man kan använda en array för att lagra och manipulera en samling av namn:

```csharp
string[] heroes = new string[3];
heroes[0] = "Batman";
heroes[1] = "Spider-Man";
heroes[2] = "Wonder Woman";

Console.WriteLine(heroes[1]);  // Output: Spider-Man

heroes[1] = "Iron Man";
Console.WriteLine(heroes[1]);  // Output: Iron Man
```

I det här exemplet deklarerar vi en array av strängar och tilldelar värden till några av elementen. Vi använder sedan indexering för att komma åt och uppdatera ett av elementen i arrayen.

Detta är bara en grundläggande introduktion till arrays i C#. Det finns mycket mer att lära sig om hur man hanterar och bearbetar arrayer, inklusive användning av slingor för att iterera över elementen och olika metoder för att söka, sortera och filtrera arrayer. Men förhoppningsvis ger denna introduktion dig en bra startpunkt för att förstå grunderna i arrayhantering.

## Slutsats

Arrays är en viktig datastruktur inom programmering som används för att organisera och hantera samlingar av element av samma datatyp. Genom att använda indexering kan vi komma åt och manipulera enskilda element i en array. Det är viktigt att komma ihåg att storleken på en array är fastställd vid skapandet och inte kan ändras i efterhand. Om du behöver en dynamiskt storlek anpassningsbar samling, kan andra datastrukturer som List vara mer lämpliga att använda.

För att bli mer bekant med användningen av arrays och utforska avancerade funktioner och tekniker, rekommenderas det att du fortsätter din läsning och experimenterar med kodexempel. Det finns många resurser tillgängliga online, inklusive dokumentation och handledningar, som kan hjälpa dig att fördjupa din förståelse och behärskning av arrayer i C#.

Lycka till med ditt fortsatta lärande och utforskande av arrays!

## TL;DR

En array är en datastruktur som används för att lagra en samling av element av samma datatyp. Den tillåter strukturerad hantering av data och kan nås och manipuleras genom indexering. Storleken på en array är fast vid skapandet och kan inte ändras i efterhand. Om du behöver en dynamiskt storlek anpassningsbar samling, kan andra datastrukturer som List vara mer lämpliga att använda.

## Obligatorisk dad-joke

Varför älskar programmerare att använda arrays?

För att de känner sig som riktiga "array-stokrater"!
