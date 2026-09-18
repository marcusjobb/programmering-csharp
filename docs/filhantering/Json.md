---
title: JSON
description: "JSON i Filhantering — C#-boken av Marcus Ackre Medina"
layout: default
author: Campus Mölndal
author_github: CampusMolndalEducation
author_url: "https://github.com/CampusMolndalEducation"
school: Campus Mölndal
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Filhantering
nav_order: 70
---
# JSON

Nu ska kolla på ett fantastiskt verktyg för datahantering: JSON! Du kanske undrar vad JSON är och hur det kan hjälpa dig i din C#-programmering. Oroa dig inte, jag kommer att förklara allt på ett enkelt och vardagligt sätt.

## TL;DR

TL;DR: JSON är ett textbaserat filformat som används för att lagra och överföra data. Det är enklare att läsa och skriva än XML och används ofta i webbapplikationer. I C# kan du använda Newtonsoft.Json biblioteket för att serialisera och deserialisera JSON-data.

## Vad är JSON och Varför är Det Coolt?

JSON står för JavaScript Object Notation. Det är ett textbaserat filformat som används för att lagra och överföra data på ett strukturerat sätt. JSON är enklare att läsa och skriva än XML och används ofta inom webbapplikationer. Den är också populär inom C#-programmering eftersom den är lätt att konvertera till och från C#-objekt. JSON är ett populärt filformat och har stort stöd i olika programmeringsspråk och plattformar.

Det finns inga regler för uppbyggnaden mer än att det ska vara en textsträng. Det är upp till dig att bestämma hur du vill strukturera din data. Det finns dock några vanliga konventioner som används för att göra JSON-data lättare att läsa och skriva. Till exempel används klammerpar för att representera objekt och arrayer, och kolon används för att separera nycklar och värden.

- [ ] - Med klammer talar man om att det som följer är en array/lista
- nyckel : värde - med nyckel menar man att variabeln heter så, och värde är det som variabeln innehåller

Om du använt [Library objekt](../datastrukturer/dictionary.md) i C# så har du redan använt JSON. Det är nämligen så det sparas i filen. Det är också så det sparas i en databas. Det är ett väldigt vanligt sätt att spara data på.

## Exempel på en JSON-fil

Låt oss ta en titt på ett exempel på hur en JSON-fil kan se ut. Tänk dig att vi har en fil som lagrar information om Star Wars-karaktärer:

```json
{
  "karaktärer": [
    {
      "namn": "Luke Skywalker",
      "ålder": 25,
      "kön": "Manlig"
    },
    {
      "namn": "Leia Organa",
      "ålder": 23,
      "kön": "Kvinnlig"
    }
  ]
}
```

I det här exemplet har vi en överordnad nyckel "karaktärer" som innehåller en array av objekt. Varje objekt representerar en Star Wars-karaktär och har egenskaper som "namn", "ålder" och "kön".

Det är som en array av en klass i C#. Vi kan tänka på JSON som en textbaserad version av C#-objekt.

## Hur Skriver och Läser Man JSON i C#?

Nu när vi har förstått vad JSON är, låt oss utforska hur vi kan hantera JSON i C#.

För att skriva och läsa JSON-data i C# kan vi använda ett populärt bibliotek som heter Newtonsoft.Json (även känt som Json.NET). Det är en kraftfull och lättanvänd bibliotek som ger oss verktygen för att serialisera (konvertera objekt till JSON) och deserialisera (konvertera JSON till objekt) data.

### Steg 1: Lägga Till Newtonsoft.Json via PowerShell eller Visual Studio GUI

Innan vi dyker in i koden, låt mig visa dig hur du kan lägga till Newtonsoft.Json-biblioteket till ditt C#-projekt. Det finns två sätt att göra det:

1. PowerShell: Öppna PowerShell-fönstret och navigera till projektmappen för ditt C#-projekt. Kör sedan följande kommando:

   ```
   dotnet add package Newtonsoft.Json
   ```

   Detta kommando lägger till Newtonsoft.Json-paketet till ditt projekt.

2. Visual Studio GUI: Öppna Visual Studio och högerklicka på ditt projekt i Solution Explorer. Välj "Manage NuGet Packages" och sök efter "Newtonsoft.Json". Klicka på "Install" för att lägga till paketet till ditt projekt.

Nu när vi har lagt till Newtonsoft.Json-biblioteket, är vi redo att använda det för att hantera JSON-data i C#.

### Steg 2: Serialisera och Deserialisera JSON-data med Newtonsoft.Json

Låt oss nu gå vidare och titta på hur vi kan serialisera och deserialisera JSON-data i C#.

#### Serialisera JSON-data

Först ska vi titta på hur vi kan konvertera C#-objekt till JSON-format (serialisera). Anta att vi har en C#-klass som representerar en Star Wars-karaktär:

```csharp
public class Karaktär
{
    public string Namn { get; set; }
    public int Ålder { get; set; }
    public string Kön { get; set; }
}
```

Nu kan vi använda Newtonsoft.Json för att serialisera en instans av vår Karaktär-klass till JSON-format:

```csharp
Karaktär lukeSkywalker = new Karaktär
{
    Namn = "Luke Skywalker",
    Ålder = 25,
    Kön = "Manlig"
};

string json = JsonConvert.SerializeObject(lukeSkywalker);
```

Strängen json kommer nu att innehålla följande

```json
{
  "Namn": "Luke Skywalker",
  "Ålder": 25,
  "Kön": "Manlig"
}
```

I det här exemplet skapar vi en instans av Karaktär-klassen och fyller den med värden. Sedan använder vi `JsonConvert.SerializeObject()`-metoden från Newtonsoft.Json för att konvertera vår instans till en JSON-sträng.

#### Deserialisera JSON-data

Nästa steg är att titta på hur vi kan konvertera JSON-data till C#-objekt (deserialisera). Antag att vi har en JSON-sträng som representerar en Star Wars-karaktär:

```csharp
string json = @"
{
  ""namn"":Leia Organa"",
  ""ålder"": 23,
  ""kön"":Kvinnlig""
}";
```

Nu kan vi använda Newtonsoft.Json för att deserialisera JSON-strängen till en instans av Karaktär-klassen:

```csharp
Karaktär leiaOrgana = JsonConvert.DeserializeObject<Karaktär>(json);
```

I det här exemplet använder vi `JsonConvert.DeserializeObject<T>()`-metoden från Newtonsoft.Json för att konvertera JSON-strängen till en instans av Karaktär-klassen.

### Skapa en JSON-sträng med StringBuilder

Förutom att använda bibliotek som Newtonsoft.Json kan vi också skapa en JSON-sträng manuellt med hjälp av StringBuilder-klassen. Det här kan vara användbart om du behöver bygga en JSON-sträng dynamiskt eller om du inte vill använda ett tredjepartsbibliotek för att hantera JSON.

Här är ett exempel på hur du kan använda StringBuilder för att skapa en JSON-sträng som representerar en Star Wars-karaktär:

```csharp
StringBuilder sb = new StringBuilder();
sb.Append("{");
sb.Append("\"namn\": \"Han Solo\",");
sb.Append("\"ålder\": 35,");
sb.Append("\"kön\": \"Manlig\"");
sb.Append("}");

string json = sb.ToString();
```

I det här exemplet skapar vi en StringBuilder-instans och använder dess `Append()`-metod för att bygga upp JSON-strängen steg för steg. Till slut använder vi `ToString()`-metoden för att få den färdiga JSON-strängen.

### Läsa av JSON-data utan Newtonsoft.Json

Visst, vi har pratat mycket om Newtonsoft.Json, men vad händer om du inte vill använda det? Oroa dig inte, du kan fortfarande läsa av JSON-data i C# utan att använda något tredjepartsbibliotek.

En vanlig metod för att läsa av JSON-data utan Newtonsoft.Json är att använda den inbyggda `System.Text.Json`-namnrymden i C#.

Här är ett exempel på hur du kan använda `System.Text.Json` för att läsa av JSON-data:

```csharp
string json = @"
{
  ""namn"":Darth Vader"",
  ""ålder"": 45,
  ""kön"":Manlig""
}";

JsonDocument doc = JsonDocument.Parse(json);

string namn = doc.RootElement.GetProperty("namn").GetString();
int ålder = doc.RootElement.GetProperty("ålder").GetInt32();
string kön = doc.RootElement.GetProperty("kön").GetString();
```

I det här exemplet använder vi `JsonDocument.Parse()`-metoden från `System.Text.Json` för att analysera JSON-strängen och skapa ett `JsonDocument`-objekt. Sedan använder vi `GetProperty()`-metoden för att få tag på specifika egenskaper från JSON-data.

Du kan även serialisera klasser med System.Text.Json. Här är ett exempel på hur du kan göra det:

```csharp
using System;
using System.Text.Json;

public class Karaktär
{
    public string Namn { get; set; }
    public int Ålder { get; set; }
    public string Kön { get; set; }
}

public class Program
{
    public static void Main()
    {
        Karaktär lukeSkywalker = new Karaktär
        {
            Namn = "Luke Skywalker",
            Ålder = 25,
            Kön = "Manlig"
        };

        string json = JsonSerializer.Serialize(lukeSkywalker);
        Console.WriteLine(json);
    }
}
```

När du kör detta program kommer det att skapa en instans av `Karaktär`-klassen med värdena för Luke Skywalker och sedan serialisera den till en JSON-sträng med `System.Text.Json`. Den genererade JSON-strängen skrivs sedan ut på konsolen.

Output:

```json
{ "Namn": "Luke Skywalker", "Ålder": 25, "Kön": "Manlig" }
```

Detta är det grundläggande exemplet på hur man serialiserar med `System.Text.Json`. Du kan anpassa och använda det i din egen kod för att serialisera olika objekt till JSON.

## Fördelar och Nackdelar med JSON

Nu när du har lärt dig grunderna i JSON, låt oss titta på några fördelar och nackdelar med att använda JSON:

### Fördelar:

- JSON är lätt att läsa och skriva för både människor och maskiner.
- Det är ett populärt filformat och har stort stöd i olika programmeringsspråk och plattformar.
- JSON-data kan enkelt konverteras till objekt och vice versa, vilket gör det lätt att arbeta med.

### Nackdelar:

- JSON saknar några av de mer avancerade funktionaliteterna som XML erbjuder.
- Det kan vara mindre lämpligt för strukturerade dokument med hierarkiska datastrukturer.
- JSON kan bli svårt att hantera om filerna blir mycket stora.

## Varför använda Newtonsoft.Json istället för System.Text.Json?

Du kanske undrar varför jag rekommenderar Newtonsoft.Json istället för System.Text.Json. Det finns flera skäl till detta:

Både Newtonsoft.Json och System.Text.Json är JSON-hanteringsbibliotek i C# som kan användas för att serialisera och deserialisera JSON-data. Båda biblioteken har sina egna fördelar och användningsområden. Här är några skäl till varför du kanske vill använda Newtonsoft.Json istället för System.Text.Json:

- Newtonsoft.Json är ett mer etablerat bibliotek med större användarbas och mer dokumentation.
- Newtonsoft.Json har stöd för fler funktioner och är mer flexibelt än System.Text.Json.
- Newtonsoft.Json är mer stabilt och har färre buggar än System.Text.Json.
- Bred användning: Newtonsoft.Json (också känt som Json.NET) har funnits på marknaden mycket längre än System.Text.Json och har en bred användarbas. Detta betyder att det finns en stor mängd dokumentation, exempel och community-stöd tillgängligt för att hjälpa dig när du arbetar med biblioteket.
- Flexibilitet och anpassningsbarhet: Newtonsoft.Json erbjuder en mängd olika funktioner och inställningar som ger dig möjlighet att anpassa serialiserings- och deserialiseringsprocessen. Du kan styra hur objekt och egenskaper ska serialiseras, hantera referensloopar, ignorera specifika egenskaper och mycket mer. Detta ger dig en större flexibilitet när du behöver finjustera JSON-hanteringen efter dina behov.
- Bättre hantering av komplexa scenarier: Newtonsoft.Json har en robust och mogen implementation som är väl anpassad för att hantera mer komplexa scenarier, till exempel när du arbetar med hierarkiska JSON-strukturer eller behöver hantera specialfall som formatterade datumsträngar. Det erbjuder även möjligheter att skapa anpassade konverterare och resolver för att hantera specifika datatyper och egenskaper på ett mer avancerat sätt.
- Bakåtkompatibilitet: Om du arbetar med befintlig kod eller projekt som redan använder Newtonsoft.Json, kan det vara praktiskt att fortsätta använda det för att undvika eventuella brytningar eller kompatibilitetsproblem. Det kan också vara enklare att migrera befintlig kod från Newtonsoft.Json till System.Text.Json om det skulle behövas i framtiden, eftersom det finns verktyg och resurser tillgängliga för en smidig övergång.

Det är viktigt att notera att System.Text.Json har också sina egna fördelar. Det är inbyggt i .NET Core och .NET 5+ och erbjuder prestandafördelar, särskilt vid hantering av stora datamängder, och enkel användning utan att behöva lägga till ett externt paket.

Beroende på dina specifika krav och preferenser kan du välja det bibliotek som bäst passar dina behov.

## Tabell av termer

| Term             | Förklaring                                                     |
| ---------------- | -------------------------------------------------------------- |
| JSON             | JavaScript Object Notation, ett textbaserat filformat för data |
| Serialisera      | Konvertera C#-objekt till JSON-format                          |
| Deserialisera    | Konvertera JSON till C#-objekt                                 |
| Newtonsoft.Json  | Ett populärt bibliotek för JSON-hantering i C#                 |
| StringBuilder    | En klass i C# för att bygga upp textsträngar dynamiskt         |
| System.Text.Json | Namnrymd i C# för att hantera JSON-data                        |
| Json.NET         | Ett annat namn för Newtonsoft.Json                             |
| JsonDocument     | En klass i System.Text.Json för att hantera JSON-data          |
| NuGet            | Ett pakethanteringsverktyg för .NET                            |
| PowerShell       | Ett kommandoradsverktyg för Windows                            |
| [XML](./XML.md)  | Extensible Markup Language, ett textbaserat filformat för data |

För att fördjupa dina kunskaper och utforska mer om JSON och C#-programmering, rekommenderar jag följande resurser:

- [JSON.org](https://json.org/): Den officiella webbplatsen för JSON med massor av information och exempel.
- [Newtonsoft.Json Dokumentation](https://www.newtonsoft.com/json/help/html/Introduction.htm): Officiell dokumentation för Newtonsoft.Json-biblioteket.
- [Microsoft Docs - System.Text.Json](https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-overview): Microsoft Docs-artikel om System.Text.Json.

## Obligatorisk Dad Joke

Varför gick JSON till terapeuten?

För att det hade problem med att parse-a sina känslor!

*aaaaw*
