---
title: Strategy
description: "Du har redan sett grunderna i det här mönstret på Factory och Strategy — den här sidan går lite djupare med ett fullständigt exempel och sätter det i sitt…"
parent: "Beteendemönster (Behavioral)"
nav_order: 65
---

# Strategy

Du har redan sett grunderna i det här mönstret på [Factory och Strategy](../../factory-strategy.md) — den här sidan går lite djupare med ett fullständigt exempel och sätter det i sitt GoF-sammanhang.

## Problemet

Du har flera sätt att göra samma sak (olika betalningsmetoder, olika sorteringsordningar) och vill kunna byta metod vid körning, utan en lång `if`/`switch`-kedja som växer för varje ny variant.

## Lösningen

```csharp
public interface IBetalningsStrategi
{
    void Betala(decimal belopp);
}

public class KreditkortsBetalning : IBetalningsStrategi
{
    public void Betala(decimal belopp) => Console.WriteLine($"Betalade {belopp} kr med kreditkort");
}

public class PayPalBetalning : IBetalningsStrategi
{
    public void Betala(decimal belopp) => Console.WriteLine($"Betalade {belopp} kr med PayPal");
}

// Context — använder en strategi, vet inget om HUR den faktiskt betalar
public class Kundvagn
{
    public IBetalningsStrategi BetalningsMetod { get; set; } = new KreditkortsBetalning();

    public void CheckaUt(decimal totalbelopp) => BetalningsMetod.Betala(totalbelopp);
}
```

```csharp
var vagn = new Kundvagn { BetalningsMetod = new PayPalBetalning() };
vagn.CheckaUt(499m);   // Betalade 499 kr med PayPal
```

Byt betalningsmetod genom att sätta en annan `IBetalningsStrategi` — `Kundvagn` ändras aldrig, oavsett hur många betalningssätt som läggs till.

## Komponenterna, formellt

| Roll | I exemplet |
|---|---|
| **Strategy** | `IBetalningsStrategi` — gränssnittet för algoritmen |
| **ConcreteStrategy** | `KreditkortsBetalning`, `PayPalBetalning` — konkreta implementationer |
| **Context** | `Kundvagn` — håller en referens till en strategi och använder den |

## Du har redan använt Strategy

`.Sort()` med ett `Comparison<T>`-lambda, och `.OrderBy()` i LINQ — se [Factory och Strategy](../../factory-strategy.md) för de exemplen. Sorteringsordningen *är* strategin, injicerad istället för hårdkodad.

## TL;DR

Strategy kapslar in en algoritm bakom ett gemensamt gränssnitt och gör den utbytbar genom komposition — sätt en annan implementation istället för att skriva om `Context`-klassen.
