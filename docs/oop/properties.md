---
title: Properties
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Objektorienterad programmering (OOP)
nav_order: 14
---
# Properties

En property är ett kontrollerat fönster in till ett objekts data. Istället för att exponera ett fält direkt kan du styra vad som får läsas och skrivas.

## När du läst detta ska du kunna

- Förklara varför vi gick från Get/Set-metoder till properties
- Förklara skillnaden mellan ett fält och en property
- Skriva auto-properties med get/set
- Begränsa skrivåtkomst med `private set`
- Använda `init` för egenskaper som bara sätts vid skapandet
- Skriva beräknade properties (expression-bodied)
- Använda `required` (C# 11)

## Historik — hur det såg ut förr

Innan C# hade properties fick man skriva `Get`- och `Set`-metoder för hand — precis som i Java.

```csharp
public class Person
{
    private string _namn;  // backing field

    public string GetNamn()
    {
        return _namn;
    }

    public void SetNamn(string namn)
    {
        _namn = namn;
    }
}

// Användning
var p = new Person();
p.SetNamn("Marcus");
Console.WriteLine(p.GetNamn());  // Marcus
```

Det fungerar — men det är ordigt, och felstavningar i metodnamnet (`GetNamnn`) ger inget kompileringsfel.
C# löste det med properties: samma kontroll, halva koden.

## Fält vs property

```csharp
// Fält — direkt exponering, ingen kontroll
public class Produkt
{
    public double Pris;       // farligt — vem som helst kan sätta -99
}

// Property — kontrollerad åtkomst
public class Produkt
{
    public double Pris { get; private set; }   // alla läser, bara klassen skriver
}
```

## Auto-property

Den enklaste formen — C# genererar det underliggande fältet automatiskt.

```csharp
public class Produkt
{
    public string Namn  { get; set; }     // läs och skriv utifrån
    public double Pris  { get; private set; }  // skriv bara inifrån klassen
    public int    Antal { get; set; }
}
```

## Full property med backing field

Ibland behövs extra logik vid get eller set — t.ex. validering.

```csharp
public class BankAccount
{
    private double _saldo;   // backing field

    public double Saldo
    {
        get { return _saldo; }
        set
        {
            if (value < 0)
                throw new ArgumentException("Saldo kan inte vara negativt");
            _saldo = value;
        }
    }
}
```

## Expression-bodied property

När logiken är ett enkelt uttryck kan du använda `=>` för att korta ner koden.

```csharp
public class Rektangel
{
    public double Bredd { get; set; }
    public double Höjd  { get; set; }

    // Beräknad property — inget backing field
    public double Area => Bredd * Höjd;
    public double Omkrets => 2 * (Bredd + Höjd);
}

var r = new Rektangel { Bredd = 5, Höjd = 3 };
Console.WriteLine(r.Area);      // 15
Console.WriteLine(r.Omkrets);   // 16
```

## init — sätt bara vid skapandet (C# 9) ✨

Med `init` kan en property sättas i object initializer men inte ändras efteråt.

```csharp
public class Person
{
    public string Namn  { get; init; }
    public int    Ålder { get; init; }
}

// Sätts en gång vid skapandet
var p = new Person { Namn = "Anna", Ålder = 30 };

// p.Namn = "Björn";  // kompileringsfel — init tillåter inte ändring
```

> **✨ C# 9 — `init`:** Som `set` men bara tillåtet i object initializer och konstruktor. Ger oföränderlighet utan att du behöver skriva en konstruktor med alla parametrar.

## required — tvinga initiering (C# 11) ✨

`required` markerar att en property måste sättas när objektet skapas. Kompilatorn varnar om du glömmer den.

```csharp
public class Produkt
{
    public required string Namn { get; set; }   // måste anges
    public double Pris { get; set; }            // valfri
}

var p1 = new Produkt { Namn = "Kaffebryggare" };          // OK
var p2 = new Produkt { Namn = "Kaffebryggare", Pris = 499.0 };  // OK
// var p3 = new Produkt { Pris = 499.0 };                 // kompileringsfel
```

> **✨ C# 11 — `required`:** Ersätter mönstret att kasta i konstruktorn om ett fält saknas. Felet syns redan vid kompilering.

## Kombinera init + required

```csharp
public class Adress
{
    public required string Gata   { get; init; }
    public required string Stad   { get; init; }
    public string          Land   { get; init; } = "Sverige";
}

var a = new Adress { Gata = "Storgatan 1", Stad = "Göteborg" };
Console.WriteLine($"{a.Gata}, {a.Stad}, {a.Land}");
// Storgatan 1, Göteborg, Sverige
```

## init vs readonly — vad är skillnaden?

Båda ger oföränderlighet, men på olika sätt:

```csharp
class MedReadonly
{
    private readonly string _namn;

    public MedReadonly(string namn)
    {
        _namn = namn;  // readonly — sätts bara i konstruktor
    }
}

class MedInit
{
    public string Namn { get; init; }  // init — sätts i konstruktor ELLER object initializer
}

// Med readonly måste du ha en konstruktor med parametrar
var a = new MedReadonly("Marcus");

// Med init kan du använda object initializer
var b = new MedInit { Namn = "Marcus" };
```

| | `readonly` (fält) | `{ get; }` (property) | `{ get; init; }` (C# 9) |
|-|-------------------|------------------------|--------------------------|
| Sätts i konstruktor | ✓ | ✓ | ✓ |
| Sätts i object initializer | ✗ | ✗ | ✓ |
| Sätts efter skapande | ✗ | ✗ | ✗ |
| Kan ha validering | Via konstruktor | Via konstruktor | Via konstruktor |

`init` är flexiblare — du behöver inte en konstruktor med alla parametrar för att skapa oföränderliga objekt.

## TL;DR

| Variant | Syntax | När |
|---------|--------|-----|
| Auto-property | `public T Prop { get; set; }` | Standard |
| Read-only utifrån | `{ get; private set; }` | Klassen skriver, alla läser |
| Beräknad | `public T Prop => uttryck;` | Värdet räknas ut |
| init | `{ get; init; }` | Sätt vid skapande, sedan oföränderlig |
| required | `public required T Prop { get; set; }` | Tvinga initiering |
| Full property | `get { } set { }` | Behöver validering |
