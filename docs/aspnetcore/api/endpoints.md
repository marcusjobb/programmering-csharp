---
title: Endpoints
description: "Endpoints i API — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2026-09-16"
parent: API
nav_order: 30
---
# Endpoints

En endpoint är som en speciell webbadress som används för att prata med en webbapplikation. Tänk på det som en dörr till webbapplikationen där du kan skicka och hämta information. Varje endpoint har en specifik uppgift och gör något särskilt, som att visa information, skapa nya saker eller uppdatera befintliga saker.

## Vad är en Endpoint?

En endpoint består av några delar:

- **Protokoll**: Regler för hur vi ska prata med webbapplikationen (http/https)
- **Domän**: Adressen till webbapplikationens server
- **Sökväg**: Vilken funktion vi vill använda eller vilken information vi vill ha
- **Parametrar**: Extra bitar av information vi kan skicka med

Exempel på endpoints:

- `https://api.example.com/användare` — hämta information om användare
- `https://api.example.com/produkter/123` — information om produkt med ID 123
- `https://api.example.com/beställningar` — skicka en ny beställning

## HTTP-metoder

| Metod | Används för |
|-------|-------------|
| `GET` | Hämta data |
| `POST` | Skapa ny data |
| `PUT` | Uppdatera befintlig data |
| `DELETE` | Radera data |

## Exempel i ASP.NET Core

```csharp
[HttpGet]
public ActionResult<IEnumerable<string>> Get()
{
    return new string[] { "value1", "value2" };
}
```

I koden ovan finns ett exempel på en endpoint i ASP.NET Core. Detta är en `HttpGet`-metod som returnerar en `ActionResult<IEnumerable<string>>`. Denna endpoint kan användas för att hämta data från webbapplikationen.

## Obligatorisk Dad-joke

Varför hade webbapplikationen så svårt att hitta vägen hem?

För att alla endpoints ständigt skickade den i olika riktningar! 😄
