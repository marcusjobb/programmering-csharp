---
title: Radera
description: "Man kan radera cookien när användaren loggar ut eller när användaren har varit inaktiv under en viss tid."
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Cookies
nav_order: 50
---
# Radera

Man kan radera cookien när användaren loggar ut eller när användaren har varit inaktiv under en viss tid.

<details open markdown="block">
  <summary>
    Innehållsförteckning
  </summary>
  {: .text-delta }

1. TOC
{:toc}


## TL;DR

För att radera en cookie i ASP.NET Core kan vi använda `Response.Cookies.Remove("CookieName");`-metoden. Detta är användbart när användaren loggar ut eller vid inaktivitet under en viss tid.

## Beskrivning

För att radera en cookie kan vi använda `Response.Cookies.Remove("CookieName");`-metoden. Här tar vi bort cookien genom att ange dess namn.

När en användare loggar ut från en applikation kan det vara önskvärt att radera eventuella cookies som har använts för att lagra användarspecifik information. Genom att använda `Response.Cookies.Remove()` kan vi säkerställa att cookien tas bort och inte längre är tillgänglig på användarens dator.

## Exempel

```csharp
public ActionResult LogOut()
{
    Response.Cookies.Remove("CookieName");
    return RedirectToAction("Index", "Home");
}
```

I exemplet ovan har vi en `LogOut()`-metod som anropas när användaren loggar ut från applikationen. Genom att använda `Response.Cookies.Remove("CookieName")` raderas cookien med namnet "CookieName". Efter att cookien har tagits bort omdirigeras användaren till startsidan.

Det är viktigt att vara noggrann med att ange rätt namn på den cookie som ska tas bort för att säkerställa att endast rätt cookie raderas.

## Obligatorisk Dad-joke

Varför ville cookien inte bli raderad?

För att den inte ville bli "kaklöst" i världen! 😄
