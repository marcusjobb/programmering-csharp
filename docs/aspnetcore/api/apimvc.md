---
title: MVC och API
description: "I dagens digitala era är det viktigt att kunna skapa webbapplikationer som är både användbara och effektiva. För att uppnå detta använder sig många…"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2026-09-16"
parent: API
nav_order: 40
---
# MVC och API

I dagens digitala era är det viktigt att kunna skapa webbapplikationer som är både användbara och effektiva. För att uppnå detta använder sig många utvecklare av den populära arkitekturen Model-View-Controller (MVC) i kombination med Application Programming Interfaces (API). I denna artikel kommer vi att utforska hur du kan använda MVC och API för att skapa en webbapplikation som integrerar med Cat Facts API.

## Förstå MVC-arkitekturen

MVC är en arkitektonisk design som används för att separera olika ansvarsområden inom en webbapplikation. Genom att följa Single Responsibility Principle (SRP) delas applikationen upp i tre huvudsakliga komponenter:

1. Model (Modell): Modellen representerar data och affärslogik för applikationen.

2. View (Vy): Vyn hanterar användargränssnittet och visar data för användaren.

3. Controller (Kontroller): Kontrollern tar emot inkommande förfrågningar, bearbetar dem och samverkar med modellen och vyn.

Genom att separera dessa komponenter enligt SRP blir koden mer strukturerad, lättare att underhålla och möjliggör enklare återanvändning av kod.

## Använda Cat Facts API med ASP.NET Core MVC i C#

Nu när vi har förstått MVC-arkitekturen kan vi använda den för att integrera med Cat Facts API i en ASP.NET Core MVC-applikation i C#. Cat Facts API ger oss slumpmässiga fakta om katter, vilket kan vara ett roligt inslag i vår webbapplikation. Här är ett exempel på hur du kan göra det:

1. Börja med att skapa ett nytt ASP.NET Core MVC-projekt i Visual Studio.

2. Lägg till en modell som representerar en CatFact. Modellen följer SRP genom att endast innehålla egenskaper för att lagra fakta om katter.

```csharp
public class CatFact
{
    public string Text { get; set; }
    public string Author { get; set; }
}
```

3. Skapa en controller som följer SRP genom att endast hantera begäranden och kommunicera med Cat Facts API.

```csharp
public class CatFactController : Controller
{
    public async Task<ActionResult> Index()
    {
        using (HttpClient client = new HttpClient())
        {
            HttpResponseMessage response = await client.GetAsync("https://cat-fact.herokuapp.com/facts/random");
            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                CatFact catFact = JsonConvert.DeserializeObject<CatFact>(json);
                return View(catFact);
            }
        }

        return View();
    }
}
```

I exemplet ovan används HttpClient-klassen för att göra en GET-förfrågan till Cat Facts API och hämta en slumpmässig faktarad om katter. Den erhållna JSON-datan deserialiseras sedan till en CatFact-modell, som skickas till vyn för att visas för användaren.

4. Skapa en vy för att visa den slumpmässiga kattfakten för användaren.

```html
@model CatFact

<!-- Visa den slumpmässiga kattfakten -->
<h2>Cat Fact:</h2>
<p>@Model.Text</p>
<p>Author: @Model.Author</p>
```

5. Koppla samman vyn med kontrollern genom att lägga till en länk eller knapp i en annan vy som leder till CatFactController och dess Index-åtgärd.

```html
<a href="@Url.Action("Index", "CatFact")">Get Random Cat Fact</a>
```

## Avslutande ord

Nu har du fått en grundläggande förståelse för hur du kan använda MVC-arkitekturen och API i en ASP.NET Core MVC-applikation. Genom att följa Single Responsibility Principle (SRP) kan du skapa mer strukturerad och underhållbar kod.
