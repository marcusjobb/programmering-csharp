---
title: Endpoints
layout: default
author: Campus Mölndal
author_github: CampusMolndalEducation
author_url: "https://github.com/CampusMolndalEducation"
school: Campus Mölndal
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: API
nav_order: 30
---
# Endpoints

En endpoint är som en speciell webbadress som används för att prata med en webbapplikation. Tänk på det som en dörr till webbapplikationen där du kan skicka och hämta information. Varje endpoint har en specifik uppgift och gör något särskilt, som att visa information, skapa nya saker eller uppdatera befintliga saker.

<details open markdown="block">
  <summary>
    Innehållsförteckning
  </summary>
  {: .text-delta }

1. TOC
{:toc}

</details>

## Beskrivning

Självklart! Här är en mer lättförståelig stil som passar nybörjare:

# Vad är en Endpoint?

En endpoint består av några delar. Först har vi protokollet, vilket är som regler för hur vi ska prata med webbapplikationen. Sedan har vi domänen, som är adressen till webbapplikationens server. Sedan kommer sökvägen, som är som en vägskylt som berättar vilken funktion vi vill använda eller vilken information vi vill ha. Slutligen kan vi ha parametrar, som är extra bitar av information som vi kan skicka med för att säga mer specifikt vad vi vill ha eller göra.

Här är några exempel på endpoints:

- `https://api.example.com/användare`: Denna endpoint kan användas för att hämta information om användare.
- `https://api.example.com/produkter/123`: Denna endpoint används för att få information om en specifik produkt med ID 123.
- `https://api.example.com/beställningar`: Genom att använda den här endpointen kan vi skicka en ny beställning till webbapplikationen.

För att använda en endpoint, behöver vi veta vilken typ av "åtgärd" vi vill göra. Det kan vara att få information (hämta), skicka information (skapa eller uppdatera), eller ta bort information (radera). Vi använder olika "verb" för att tala om för webbapplikationen vad vi vill göra. Till exempel, om vi vill hämta information använder vi "GET", och om vi vill skicka information använder vi "POST".

Endpoints är väldigt användbara eftersom de låter oss interagera med webbapplikationer och utbyta data. Genom att använda olika endpoints kan vi göra olika saker som att visa information, skapa nya saker eller uppdatera befintliga saker. Utvecklare använder endpoints för att bygga webbapplikationer och API:er som gör det möjligt för oss att använda och utbyta information på ett smidigt sätt.

Det är viktigt att ha tydliga och lättförståeliga endpoints för att underlätta användningen av en webbapplikation eller ett API. Det innebär att använda klara namn på endpoints, välja rätt verb för att beskriva vad vi vill göra, och ge bra dokumentation som förklarar hur man använder varje endpoint.

Så, endpoints är som speciella webbadresser som låter oss prata med webbapplikationer och göra olika saker som att visa och skicka information. Genom att använda endpoints kan vi interagera med webbapplikationer på ett smidigt sätt och få ut det bästa av dem!

I en webbapplikation används endpoints för att definiera och hantera olika funktioner och åtgärder. En endpoint representerar en specifik funktion eller åtgärd som kan utföras genom att skicka en förfrågan till en viss URL. Det kan vara en URL som används för att hämta data från en server eller en URL som används för att skicka data till servern för att utföra en handling.

Vanligtvis består en endpoint av följande delar:

- **HTTP-metod:** Detta anger vilken typ av åtgärd som ska utföras, till exempel GET, POST, PUT eller DELETE.
- **URL:** Detta är den specifika adressen där endpointen är tillgänglig.
- **Parametrar:** Vissa endpoints kan kräva ytterligare parametrar för att utföra åtgärden, såsom en sökterm eller ett ID.

Exempel på en endpoint-URL: `https://api.example.com/api/endpoint/parametrar`

Genom att använda olika kombinationer av HTTP-metoder, URL:er och parametrar kan utvecklare definiera olika funktioner och interaktioner i en webbapplikation.

## Exempel

```csharp
[HttpGet]
public ActionResult<IEnumerable<string>> Get()
{
    return new string[] { "value1", "value2" };
}
```

I koden ovan finns ett exempel på en endpoint i ASP.NET. Detta är en `HttpGet`-metod som returnerar en `ActionResult<IEnumerable<string>>`. I detta fall returneras en array av strängar med värdena "value1" och "value2". Denna endpoint kan användas för att hämta data från webbapplikationen.

En endpoint kan ha olika HTTP-metoder för att definiera olika typer av åtgärder. Till exempel kan `HttpGet` användas för att hämta data, `HttpPost` för att skicka data, `HttpPut` för att uppdatera data och `HttpDelete` för att ta bort data.

Det är viktigt att notera att hanteringen av endpoints kan variera beroende på ramverk och plattform. Ovanstående exempel är specifikt för ASP.NET, men principerna och koncepten bakom endpoints gäller generellt för webbapplikationer.

Jag hoppas att denna förklaring och det tillagda exemplet hjälper till att förstå vad endpoints är och hur de används i en webbapplikation.

---

## Obligatorisk Dad-joke

Varför hade webbapplikationen så svårt att hitta vägen hem?

För att alla endpoints ständigt skickade den i olika riktningar! 😄
