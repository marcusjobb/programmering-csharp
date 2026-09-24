---
title: Try, catch och finally
description: "finally är till för sådant som måste hända oavsett utfall — stänga en fil, koppla ner en anslutning, frigöra en resurs. Även om catch-blocket kastar ett…"
parent: Undantagshantering
nav_order: 10
---

# Try, catch och finally

## När du läst detta ska du kunna

- Fånga ett undantag med `try`/`catch`
- Förklara vad `finally` gör och när den körs
- Läsa `Message` och `StackTrace` från ett undantag
- Känna igen de vanligaste inbyggda exception-typerna

## Grundstrukturen

```csharp
try
{
    int result = 10 / int.Parse("0");
}
catch (DivideByZeroException e)
{
    Console.WriteLine($"Kunde inte dela: {e.Message}");
}
finally
{
    Console.WriteLine("Det här körs alltid.");
}
```

| Block | Kör när |
|---|---|
| `try` | Alltid — det är koden du faktiskt vill köra |
| `catch` | Bara om ett undantag av matchande typ kastades i `try` |
| `finally` | **Alltid** — oavsett om ett undantag kastades, fångades, eller inte |

### Output

```
Kunde inte dela: Attempted to divide by zero.
Det här körs alltid.
```

## Varför finally alltid körs

`finally` är till för sådant som måste hända oavsett utfall — stänga en fil, koppla ner en anslutning, frigöra en resurs. Även om `catch`-blocket kastar ett nytt undantag, eller om metoden gör `return` inifrån `try`, körs `finally` innan kontrollen lämnar metoden.

```csharp
static string LäsFörstaRaden(string path)
{
    StreamReader? reader = null;
    try
    {
        reader = new StreamReader(path);
        return reader.ReadLine() ?? "";
    }
    finally
    {
        reader?.Dispose();   // Körs även om ReadLine kastar
    }
}
```

I praktiken skriver du sällan det här för hand längre — se [using-deklarationer](../filhantering/Fileklassen.md) som gör exakt det här automatiskt. Men mekaniken bakom är `finally`.

## Flera catch-block

Du kan fånga olika exceptiontyper olika — men ordningen spelar roll. Mer specifika typer måste komma **före** mer generella, annars fångar den generella allt och de specifika blocken blir oåtkomliga (och koden kompilerar inte ens).

```csharp
try
{
    var tal = int.Parse(input);
    var result = 100 / tal;
}
catch (FormatException e)
{
    Console.WriteLine("Det där var inte ett tal.");
}
catch (DivideByZeroException e)
{
    Console.WriteLine("Kan inte dela med noll.");
}
catch (Exception e)
{
    Console.WriteLine($"Något annat gick fel: {e.Message}");
}
```

`Exception` är basklassen för alla undantag i .NET — ett `catch (Exception e)` sist fångar allt som inte redan matchat ett tidigare block.

## Vanliga inbyggda exceptions

| Exception | Kastas när |
|---|---|
| `NullReferenceException` | Du anropar något på ett objekt som är `null` |
| `IndexOutOfRangeException` | Du använder ett array-index utanför gränserna |
| `FormatException` | `int.Parse` (m.fl.) får text den inte kan tolka |
| `DivideByZeroException` | Heltalsdivision med 0 |
| `ArgumentNullException` | Ett argument som inte fick vara `null` var `null` |
| `ArgumentOutOfRangeException` | Ett argument låg utanför tillåtet intervall |
| `InvalidOperationException` | Metoden anropades i fel tillstånd för objektet |

## Undantagsobjektet

Varje exception bär information om vad som gick fel:

```csharp
catch (Exception e)
{
    Console.WriteLine(e.Message);      // Kort, läsbar felbeskrivning
    Console.WriteLine(e.StackTrace);   // Var i koden felet uppstod, anrop för anrop
    Console.WriteLine(e.GetType());    // Den exakta exception-typen
}
```

`StackTrace` är ovärderlig vid felsökning — den visar hela kedjan av metodanrop som ledde fram till felet.

## TL;DR

`try` kör koden, `catch` fångar undantag av matchande typ (specifika typer före generella), `finally` körs alltid — perfekt för städning. Undantagsobjektet ger dig `Message`, `StackTrace` och den exakta typen för att förstå vad som gick fel.
