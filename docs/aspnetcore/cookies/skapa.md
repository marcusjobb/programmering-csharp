---
title: Skapa
description: "Hur skapar man cookies? Det ska jag visa dig!"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Cookies
nav_order: 70
---
# Skapa

Hur skapar man cookies? Det ska jag visa dig!
<details open markdown="block">
  <summary>
    Innehållsförteckning
  </summary>
  {: .text-delta }

1. TOC
{:toc}

</details>

## TL;DR

Att skapa cookies i ASP.NET Core är superenkelt och användbart! Genom att använda `Response.Cookies` kan vi skapa och hantera cookies. Vi kan ange hur länge cookien ska leva genom att använda `Expires`. Om ingen `Expires` anges kommer cookien att finnas så länge webbläsaren är öppen. Cookies är bra för att spara användarinformation som inloggning och preferenser.

## Beskrivning

Att skapa cookies är jätteenkelt och användbart! Vi kan använda `Response.Cookies` för att skapa och hantera cookies. De cookies vi skapar kan leva så länge vi vill, beroende på vad vi anger i `Expires`. Om vi inte anger något så kommer cookien att leva så länge som webbläsaren är öppen.

Cookies kan vara riktigt användbara för att spara information som användarens inloggning eller användarens preferenser. Det låter coolt, eller hur?

## Exempel

Låt mig visa dig hur man skapar cookies med hjälp av lite kod:
```csharp
Response.Cookies["CookieName"].Value = "CookieValue";
Response.Cookies["CookieName"].Expires = DateTime.Now.AddDays(1);
```
I detta exempel skapar vi en cookie med namnet `"CookieName"` och sätter värdet till `"CookieValue"`. Vi har också angett att cookien ska leva i 1 dag genom att använda `DateTime.Now.AddDays(1)`. Det betyder att cookien kommer att finnas där för användaren i hela 24 timmar. Yay!

Det är så enkelt att skapa cookies och använda dem för att göra våra webbapplikationer ännu mer användarvänliga och personliga. Awesome, eller hur?

## Exempel

Låt oss titta på ett exempel där vi skapar en cookie:

```csharp
Response.Cookies["CookieName"].Value = "CookieValue";
Response.Cookies["CookieName"].Expires = DateTime.Now.AddDays(1);
```

I detta exempel skapar vi en cookie med namnet `"CookieName"` och sätter värdet till `"CookieValue"`. Vi använder `DateTime.Now.AddDays(1)` för att ange att cookien ska leva i 1 dag. Det betyder att cookien kommer att finnas där för användaren i hela 24 timmar.

Genom att skapa och använda cookies kan vi göra våra webbapplikationer ännu mer användarvänliga och personliga. Najs, eller hur?

## Obligatorisk dad-joke

Varför var cookien så ledsen?

För att den inte hade någon till att dela sitt liv med. Men sedan träffade den en mjölkchokladkaka, och de blev ett perfekt par! 😄
