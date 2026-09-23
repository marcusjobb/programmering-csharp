---
title: TempData
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Cookies
nav_order: 20
---
# TempData

Tempdata används i ASP.NET Core för att överföra data mellan olika sidor.

<details open markdown="block">
  <summary>
    Innehållsförteckning
  </summary>
  {: .text-delta }

1. TOC
{:toc}

</details>

## TL;DR

TempData används för att tillfälligt lagra data som behöver skickas mellan olika sidor. Det är användbart när du vill dela information under samma användarsession, och data försvinner när sidan laddas om.

## Beskrivning

TempData är en funktion i ASP.NET Core MVC som låter dig överföra data mellan sidor. Det är en temporär lagring som bara finns så länge användaren navigerar mellan sidorna i webbapplikationen. TempData är en del av ASP.NET Core MVC och är inte tillgänglig i ASP.NET Core Razor Pages.

I ASP.NET Core MVC finns det två sätt att använda TempData: antingen med TempDataDictionary eller med TempDataProvider.

### TempDataDictionary

TempDataDictionary är en klass som ingår i TempData och används för att läsa och skriva data. Du kan använda TempDataDictionary för att lagra och hämta värden i TempData.

### TempDataProvider

TempDataProvider är en annan del av TempData och fungerar som en brygga mellan TempData och användargränssnittet. Den gör det möjligt att använda TempData med hjälp av sessionsdata.

## Exempel

Här är ett exempel på hur du kan använda TempData i en controller:

```csharp
public class HomeController : Controller
{
    public IActionResult Index()
    {
        TempData["Message"] = "Hej världen!";
        return RedirectToAction("About");
    }

    public IActionResult About()
    {
        return View();
    }
}
```

Och här är hur du kan använda TempData i en view:

```csharp
@{
    ViewData["Title"] = "Om";
}

<h2>Om</h2>

<p>@TempData["Message"]</p>
```

## Obligatorisk Dad-joke

Varför hade cookien svårt att sova?

Den var rädd för Cookie-monstret!
