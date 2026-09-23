---
title: ViewBag
description: "ViewBag i Cookies — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Cookies
nav_order: 30
---
# ViewBag

En ViewBag finns i ASP.NET Core MVC och används för att överföra data mellan olika sidor.

<details open markdown="block">
  <summary>
    Innehållsförteckning
  </summary>
  {: .text-delta }

1. TOC
{:toc}

</details>

## TL;DR

ViewBag är en smidig och enkel funktion i ASP.NET Core MVC som används för att överföra data mellan sidor i en webbapplikation.

## Beskrivning

ViewBag är en dynamisk variabel i ASP.NET Core MVC som kan användas för att skicka data mellan kontrollern och vyn. Det är ett enkelt sätt att dela information mellan olika delar av en webbapplikation. Men det är viktigt att komma ihåg att ViewBag inte är säker och att det finns en risk för att data kan manipuleras av obehöriga användare. Därför rekommenderas det inte att använda ViewBag för att överföra känslig eller viktig data.

Om du behöver överföra data som behöver vara tillgänglig längre än en enskild request eller som är mer säkerhetskritisk, bör du istället använda [TempData](./tempdata).

## Exempel

Här är ett exempel på hur du kan använda ViewBag i en kontroller:

```csharp
public ActionResult Index()
{
    ViewBag.Message = "Hej världen!";
    return View();
}
```

Och så här använder vi ViewBag i en vy:

```csharp
@{
    ViewBag.Title = "Index";
}
<h2>@ViewBag.Message</h2>
```

## Obligatorisk Dad-joke

Varför älskar webbläsaren sina cookies så mycket?

För att de är "bak-sligt" trevliga! 🍪😄
