---
title: Session
description: "En session är en tillfällig lagring av data som är kopplad till en användare. Sessionen lagras på servern och är inte tillgänglig för andra användare…"
parent: Cookies
nav_order: 60
---
# Session

En session är en tillfällig lagring av data som är kopplad till en användare. Sessionen lagras på servern och är inte tillgänglig för andra användare. Sessionen lagras som en cookie på användarens dator och kan användas för att spara användarinställningar eller temporära värden som används under en session, till exempel varukorgsinformation eller aktuell sida i ett forum.


## TL;DR

En session i ASP.NET Core är en temporär lagring av data kopplad till en användare. Den används för att spara användarinställningar och temporära värden under en session. Sessionen lagras på servern och kan nås genom en cookie på användarens dator.

## Beskrivning

Sessionen möjliggör att vi kan lagra data som är kopplad till en specifik användare. Till exempel kan vi använda sessionen för att spara information om vilka produkter som finns i användarens varukorg. Sessionen kan också användas för att temporärt lagra värden som behövs under en session, såsom vilken sida användaren är på i ett forum.

Genom att använda sessionen kan vi erbjuda en mer anpassad och personlig användarupplevelse genom att spara och hämta användarspecifik information under hela sessionen.

## Exempel

### Konfigurering av ASP.NET Core för att använda session

För att använda sessionen i ASP.NET Core måste vi först konfigurera applikationen för att stödja sessionen. Detta kan göras genom att lägga till följande kod i `Startup.cs`:

Efter raden `services.AddControllersWithViews();`:
```csharp
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromSeconds(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
```

Efter raden `app.UseRouting();`:
```csharp
app.UseSession();
```

### Använda sessionen i en controller

För att använda sessionen i en controller kan vi tilldela värden till sessionen och hämta värden från sessionen. Här är ett exempel:

```csharp
public class HomeController : Controller
{
    public IActionResult Index()
    {
        Session["SessionName"] = "SessionValue";
        return View();
    }
}
```

### Använda sessionen i en vy

I en vy kan vi använda sessionen för att visa lagrade värden eller genomföra olika åtgärder baserat på sessionens tillstånd. Här är ett exempel:

```csharp
@{
    ViewData["Title"] = "Index";
}

<h1>Index</h1>

<p>Session: @Session["SessionName"]</p>
```

I exemplet ovan har vi en

 vy som visar värdet av `Session["SessionName"]`. Genom att använda `@Session["SessionName"]` kan vi hämta och visa värdet som tidigare har tilldelats till sessionen.

## Obligatorisk Dad-joke

Varför älskar kakor att använda sessions?

För att de får "lagras" i en varm och mysig serverrum! 😄
