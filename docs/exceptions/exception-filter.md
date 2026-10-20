---
title: Exception-filter med when
description: "Med when kan du fånga ett undantag bara om ett villkor är uppfyllt — utan att behöva fånga allt och sedan kasta vidare det du inte ville ha."
parent: Undantagshantering
nav_order: 30
---

# Exception-filter med when

## När du läst detta ska du kunna

- Använda `when` för att filtrera undantag på ett villkor
- Förklara varför `when` är bättre än att fånga och kasta vidare
- Kombinera `when` med egna exception-klasser

## Problemet utan filter

Utan `when` fastnar du lätt i det här mönstret:

```csharp
try
{
    await HämtaDataAsync(url);
}
catch (HttpRequestException ex)
{
    if (ex.StatusCode == HttpStatusCode.NotFound)
        Console.WriteLine("Resursen finns inte.");
    else
        throw; // Inte vårt problem — kasta vidare
}
```

Det fungerar, men `catch`-blocket körs *alltid* — även när du direkt kastar vidare. Stacktracen bevaras (du skriver `throw`, inte `throw ex`), men det är onödig kod.

## Lösningen — when

`when` gör villkoret till en del av `catch`-uttrycket. Matchar inte villkoret, körs blocket aldrig:

```csharp
try
{
    await HämtaDataAsync(url);
}
catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
{
    Console.WriteLine("Resursen finns inte.");
}
```

Om `StatusCode` är något annat än `NotFound` bubblar undantaget vidare som om `catch`-blocket inte existerade — stacktracen är helt opåverkad.

## Flera filter på samma typ

Du kan ha flera `catch`-block för samma exception-typ, med olika `when`-villkor:

```csharp
try
{
    await HämtaDataAsync(url);
}
catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
{
    Console.WriteLine("404 — resursen finns inte.");
}
catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.Unauthorized)
{
    Console.WriteLine("401 — du är inte inloggad.");
}
catch (HttpRequestException ex)
{
    Console.WriteLine($"Nätverksfel: {ex.Message}");
}
```

Det sista `catch`-blocket (utan `when`) fångar allt som inte matchade ovanför.

## with egna exception-klasser

`when` fungerar lika bra med egna exceptions och egna properties:

```csharp
catch (InsufficientFundsException ex) when (ex.Begärt < 1000)
{
    Console.WriteLine("Litet uttag nekat — kontakta banken.");
}
catch (InsufficientFundsException ex)
{
    Console.WriteLine($"Uttag på {ex.Begärt} nekades, saldo {ex.Saldo}.");
}
```

## when för loggning utan att svälja undantaget

Ett lite oväntat men användbart mönster — `when` kan köra ett uttryck med sidoeffekt och returnera `false` för att aldrig fånga undantaget, men ändå logga det:

```csharp
catch (Exception ex) when (Logga(ex))
{
    // Körs aldrig — Logga() returnerar alltid false
}

static bool Logga(Exception ex)
{
    Console.WriteLine($"[LOG] {ex.GetType().Name}: {ex.Message}");
    return false;
}
```

Undantaget bubblar vidare, men du har loggat det. Använd sparsamt — det är ett trick, inte ett mönster för vardagsbruk.

## TL;DR

`when` filtrerar ett `catch`-block på ett villkor — matchar inte villkoret körs blocket aldrig och undantaget bubblar vidare med stacktracen intakt. Bättre än att fånga och kasta vidare, och gör det möjligt att ha flera `catch`-block för samma exception-typ.
