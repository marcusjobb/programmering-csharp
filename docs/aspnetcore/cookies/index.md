---
title: Cookies
description: "Cookies är en liten fil som sparas på en användares dator."
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: ASP.net Core
nav_order: 10
has_children: True
---
# Cookies

Cookies är en liten fil som sparas på en användares dator.

<details open markdown="block">
  <summary>
    Innehållsförteckning
  </summary>
  {: .text-delta }

1. TOC
{:toc}

</details>


## TL;DR

Cookies är små datasegment som sparas på användarens dator och används för att lagra information mellan besök på en webbplats. I ASP.NET Core kan vi använda inbyggda funktioner för att skapa, hämta och ta bort cookies. Genom att använda cookies kan en webbapplikation identifiera användare och anpassa upplevelsen baserat på sparad information.

## Beskrivning

Cookies är en vanlig teknik som används för att spara information på en användares dator. Det kan vara användbart för att identifiera en användare och lagra viss information mellan olika besök på en webbplats. I ASP.NET Core finns inbyggda funktioner för att hantera cookies och interagera med dem.

När en webbapplikation använder cookies kan den lagra små datasegment på användarens dator. Denna data kan sedan skickas tillbaka till servern varje gång användaren gör en begäran till webbplatsen. På så sätt kan applikationen känna igen användaren och anpassa upplevelsen baserat på den sparade informationen.

I ASP.NET Core kan vi använda `Response.Cookies`-objektet för att skapa och hantera cookies. Vi kan ställa in egenskaper som cookie-namn, värde, utgångsdatum och andra attribut. Här är ett exempel på hur man skapar en cookie:

```csharp
public IActionResult SetCookie()
{
    CookieOptions options = new CookieOptions
    {
        Expires = DateTime.Now.AddDays(7) // Sätter utgångsdatumet till 7 dagar framåt
    };
    Response.Cookies.Append("username", "John Doe", options);

    return RedirectToAction("Index");
}
```

I exemplet ovan skapar vi en cookie med namnet "username" och värdet "John Doe". Vi ställer också in utgångsdatumet till 7 dagar framåt. Detta innebär att cookien kommer att vara giltig och tillgänglig på användarens dator under 7 dagar.

För att hämta värdet av en cookie kan vi använda `Request.Cookies`-objektet. Här är ett exempel:

```csharp
public IActionResult GetCookie()
{
    string username = Request.Cookies["username"];

    // Använd värdet av cookien i applikationen

    return View();
}
```

I exemplet ovan hämtar vi värdet av cookien med namnet "username" och lagrar det i variabeln `username`. Vi kan sedan använda detta värde i applikationen för olika ändamål.

För att ta bort en cookie kan vi använda `Response.Cookies.Delete()`-metoden och ange namnet på cookien som ska tas bort.

Det är viktigt att vara medveten om att cookies kan ha integritets- och säkerhetskonsekvenser. Användning av cookies bör göras med omsorg och med hänsyn till användarnas integritet.

## Hur missbrukas cookies?

Cookies kan missbrukas på olika sätt. En vanlig metod är att använda cookies för att spåra användarens aktivitet på webbplatsen. Detta kan göras genom att lagra information om vilka sidor som besöks och hur länge användaren stannar på varje sida. Denna information kan sedan användas för att skapa en profil av användaren och användas för riktad reklam eller andra ändamål.

Tredje parts cookies kan också användas för att spåra användarens aktivitet på webbplatsen. Dessa cookies kan skapas av tredje part och användas för att spåra användarens aktivitet på webbplatsen. Denna information kan sedan användas för att skapa en profil av användaren och användas för riktad reklam eller andra ändamål.

Google vill ha bort tredje parts cookies och har lovat länge att de ska blockeras, men då Gooogles egna tjänster använder sig av tredjepartscookies så har de inte gjort det. Detta har lett till att Google har fått en stor del av marknaden för annonsering på internet.

## Länkar
+ [Microsoft Docs - Cookies in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/security/gdpr/cookies?view=aspnetcore-6.0)
+ [Microsoft Docs - CookieOptions Class](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.cookieoptions?view=aspnetcore-6.0)
+ [Microsoft Docs - ResponseCookies Class](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.responsecookies?view=aspnetcore-6.0)
+ [Microsoft Docs - RequestCookies Class](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.requestcookies?view=aspnetcore-6.0)
+ [Microsoft Docs - Cookie Consent](https://docs.microsoft.com/en-us/aspnet/core/security/gdpr/consent?view=aspnetcore-6.0)
+ [Microsoft Docs - Cookie Policy](https://docs.microsoft.com/en-us/aspnet/core/security/gdpr/cookies?view=aspnetcore-6.0#cookie-policy)
+ [Microsoft Docs - Cookie Policy Sample](https://docs.microsoft.com/en-us/aspnet/core/security/gdpr/cookies?view=aspnetcore-6.0#cookie-policy-sample)
+ [Microsoft Docs - Cookie Policy Provider Sample](https://docs.microsoft.com/en-us/aspnet/core/security/gdpr/cookies?view=aspnetcore-6.0#cookie-policy-provider-sample)
+ [Microsoft Docs - Cookie Policy Middleware Sample](https://docs.microsoft.com/en-us/aspnet/core/security/gdpr/cookies?view=aspnetcore-6.0#cookie-policy-middleware-sample)
+ [Microsoft Docs - Cookie Policy Middleware](https://docs.microsoft.com/en-us/aspnet/core/security/gdpr/cookies?view=aspnetcore-6.0#cookie-policy-middleware)
+ [Google - Why Google is wrong about cookies](https://www.theguardian.com/technology/2021/mar/31/why-google-is-wrong-about-cookies-and-why-it-still-matters)
+ [Google - Google’s FLoC Is a Terrible Idea](https://www.eff.org/deeplinks/2021/03/googles-floc-terrible-idea)
+ [SR - Så kan du slippa cookies](https://sverigesradio.se/avsnitt/sa-kan-du-slippa-acceptera-cookies-repris)

## Obligatorisk Dad-joke

Varför älskar webbutvecklare att arbeta med kakor?

För att de är de bästa "sessions" de någonsin har haft! 😄
