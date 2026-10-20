---
title: Egna exceptions, throw vs throw ex
description: "Att kasta en generisk Exception fungerar, men berättar ingenting om vad som gick fel förutom texten i Message. Anroparen kan inte skilja på \"kunden…"
parent: Undantagshantering
nav_order: 20
---

# Egna exceptions, throw vs throw ex

## När du läst detta ska du kunna

- Skapa en egen exception-klass för domänspecifika fel
- Förklara skillnaden mellan `throw` och `throw ex` — och varför den ena är fel
- Kasta ett undantag med `throw new ...`

## Varför skapa egna exceptions?

Att kasta en generisk `Exception` fungerar, men berättar ingenting om *vad* som gick fel förutom texten i `Message`. Anroparen kan inte skilja på "kunden hittades inte" och "kundens saldo räcker inte" utan att läsa strängen.

Egna exception-klasser gör felet till en typ — anroparen kan `catch` specifikt det den bryr sig om.

```csharp
public class InsufficientFundsException : Exception
{
    public decimal Saldo { get; }
    public decimal Begärt { get; }

    public InsufficientFundsException(decimal saldo, decimal begärt)
        : base($"Saldo {saldo} räcker inte för uttag på {begärt}.")
    {
        Saldo = saldo;
        Begärt = begärt;
    }
}
```

```csharp
public class Konto
{
    public decimal Saldo { get; private set; }

    public void TaUt(decimal belopp)
    {
        if (belopp > Saldo)
            throw new InsufficientFundsException(Saldo, belopp);

        Saldo -= belopp;
    }
}
```

Anroparen kan nu fånga exakt det felet, och läsa ut `Saldo`/`Begärt` för att t.ex. visa ett bra felmeddelande i UI:t:

```csharp
try
{
    konto.TaUt(500);
}
catch (InsufficientFundsException e)
{
    Console.WriteLine($"Du försökte ta ut {e.Begärt} men har bara {e.Saldo}.");
}
```

Konventionen är att namnet slutar på `Exception`, och att klassen ärver från `Exception` (eller en mer specifik basklass om det finns en som passar bättre).

## throw vs throw ex

Det här är ett av de vanligaste misstagen i C# — och det syns inte förrän du faktiskt behöver läsa en stacktrace i produktion.

```csharp
catch (Exception ex)
{
    // Fel — nollställer stacktracen, du ser bara raden nedan, inte var felet egentligen uppstod
    throw ex;
}

catch (Exception ex)
{
    // Rätt — behåller hela den ursprungliga stacktracen
    throw;
}
```

`throw ex` skapar en **ny** stacktrace som börjar vid `throw ex`-raden — informationen om var undantaget *faktiskt* uppstod försvinner. `throw` (utan `ex`) kastar vidare samma undantagsobjekt, med hela den ursprungliga stacktracen intakt.

**Minnesregel:** skriv `throw;` — aldrig `throw ex;` — om du bara kastar vidare samma undantag.

Vill du kasta ett *nytt* undantag men behålla informationen om det ursprungliga, använd `innerException`-parametern:

```csharp
catch (SqlException ex)
{
    throw new InvalidOperationException("Kunde inte spara kund.", ex);
    //                                                               ↑
    //                                     ursprungsundantaget bevaras här
}
```

Då kan du läsa `e.InnerException` senare och fortfarande se hela kedjan.

## TL;DR

Egna exception-klasser gör fel till typer anroparen kan fånga specifikt och läsa strukturerad data från. Kastar du vidare ett undantag du fångat, skriv `throw;` — aldrig `throw ex;`, som tyst förstör stacktracen och gör felsökning i produktion mycket svårare.
