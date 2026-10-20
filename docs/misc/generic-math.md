---
title: Generisk matematik
description: "Generic math — INumber<T> och matematiska interface-operatorer (C# 11, ninja) — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Övrigt
nav_order: 37
---
# Generisk matematik

> 🥷 **Ninjastoff** — behövs för matematikbibliotek, räkneintensiv kod och generiska algoritmer. Sällan nödvändigt i vardaglig applikationskod.

C# 11 introducerade statiska abstrakta interface-members — och använde dem direkt för att lösa ett gammalt problem: du kunde inte skriva en generisk metod som adderar `T + T` utan att veta om `T` är `int`, `double` eller något annat.

## Problemet — generisk addition fungerade inte

```csharp
// Försök att skriva en generisk Sum-metod
static T Sum<T>(IEnumerable<T> values)
{
    T total = default;
    foreach (var v in values)
        total += v;   // KOMPILERINGSFEL — operatorn + är inte definierad för T
    return total;
}
```

Kompilatorn vet inte att `T` stödjer `+`. Förut löste man det med reflection, dynamic eller en hög `if`-satser. C# 11 löser det med interface-constraints.

## INumber\<T\> och IAdditionOperators

```csharp
using System.Numerics;

// INumber<T> garanterar att T stödjer +, -, *, / och jämförelser
static T Sum<T>(IEnumerable<T> values) where T : INumber<T>
{
    T total = T.Zero;
    foreach (var v in values)
        total += v;
    return total;
}

Console.WriteLine(Sum([1, 2, 3, 4, 5]));           // 15     (int)
Console.WriteLine(Sum([1.5, 2.5, 3.0]));           // 7      (double)
Console.WriteLine(Sum([1.1m, 2.2m, 3.3m]));        // 6.6    (decimal)
```

Samma metod — tre typer — noll kod duplicerad.

## Statiska abstrakta interface-members

Det som gör det möjligt är att interface numera kan ha **statiska abstrakta** och **statiska virtuella** members:

```csharp
public interface IAdditionOperators<TSelf, TOther, TResult>
    where TSelf : IAdditionOperators<TSelf, TOther, TResult>
{
    static abstract TResult operator +(TSelf left, TOther right);
}
```

`static abstract` innebär: alla typer som implementerar det här interfacet *måste* definiera operatorn `+` som en statisk member. `int`, `double` och `decimal` gör det redan — du kan därför constraina din generiska metod mot det.

## Implementera egna typer med generisk matematik

```csharp
public readonly struct Money : IAdditionOperators<Money, Money, Money>,
                               IComparable<Money>
{
    public decimal Amount   { get; }
    public string  Currency { get; }

    public Money(decimal amount, string currency) => (Amount, Currency) = (amount, currency);

    public static Money operator +(Money a, Money b)
    {
        if (a.Currency != b.Currency)
            throw new InvalidOperationException("Kan inte addera olika valutor");
        return new Money(a.Amount + b.Amount, a.Currency);
    }

    public int CompareTo(Money other) => Amount.CompareTo(other.Amount);

    public override string ToString() => $"{Amount:F2} {Currency}";
}
```

```csharp
var sek100 = new Money(100m, "SEK");
var sek50  = new Money(50m,  "SEK");

Console.WriteLine(sek100 + sek50);   // 150.00 SEK

// Fungerar nu i generiska metoder!
var purchases = new[] { new Money(250m, "SEK"), new Money(80m, "SEK"), new Money(40m, "SEK") };
Console.WriteLine(Sum(purchases));   // 370.00 SEK
```

## Användbara interface i System.Numerics

| Interface | Vad det garanterar |
|-----------|--------------------|
| `INumber<T>` | `+`, `-`, `*`, `/`, jämförelse, `Zero`, `One` |
| `IAdditionOperators<T,T,T>` | `+` |
| `IMinMaxValue<T>` | `MinValue`, `MaxValue` |
| `IParsable<T>` | `Parse(string)`, `TryParse` |
| `IFloatingPoint<T>` | Flytpunktsoperationer (sin, cos, sqrt...) |

## Generisk min/max utan if

```csharp
static T Clamp<T>(T value, T min, T max) where T : INumber<T>
    => T.Max(min, T.Min(max, value));

Console.WriteLine(Clamp(150, 0, 100));    // 100
Console.WriteLine(Clamp(3.14, 0.0, 2.0)); // 2
```

## TL;DR

```csharp
using System.Numerics;

// Fungerar för int, double, decimal, float — och egna typer
static T Average<T>(IEnumerable<T> values) where T : INumber<T>
{
    T sum   = T.Zero;
    int count = 0;
    foreach (var v in values) { sum += v; count++; }
    return sum / T.CreateChecked(count);
}

Console.WriteLine(Average([1, 2, 3, 4, 5]));      // 3
Console.WriteLine(Average([1.0, 2.0, 3.0]));       // 2
```

Generisk matematik låter dig skriva matematiska algoritmer en gång — och återanvända dem för alla numeriska typer, inklusive dina egna.
