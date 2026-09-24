---
title: Properties
description: "En property är ett kontrollerat fönster in till ett objekts data. Istället för att exponera ett fält direkt kan du styra vad som får läsas och skrivas."
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
    private string _name;  // backing field

    public string GetName()
    {
        return _name;
    }

    public void SetName(string name)
    {
        _name = name;
    }
}

// Användning
var p = new Person();
p.SetName("Marcus");
Console.WriteLine(p.GetName());  // Marcus
```

Det fungerar — men det är ordigt, och felstavningar i metodnamnet (`GetNamnn`) ger inget kompileringsfel.
C# löste det med properties: samma kontroll, halva koden.

## Fält vs property

```csharp
// Fält — direkt exponering, ingen kontroll
public class Product
{
    public double Price;       // farligt — vem som helst kan sätta -99
}

// Property — kontrollerad åtkomst
public class Product
{
    public double Price { get; private set; }   // alla läser, bara klassen skriver
}
```

## Auto-property

Den enklaste formen — C# genererar det underliggande fältet automatiskt.

```csharp
public class Product
{
    public string Name  { get; set; }     // läs och skriv utifrån
    public double Price  { get; private set; }  // skriv bara inifrån klassen
    public int    Count { get; set; }
}
```

## Full property med backing field

Ibland behövs extra logik vid get eller set — t.ex. validering.

```csharp
public class BankAccount
{
    private double _balance;   // backing field

    public double Balance
    {
        get { return _balance; }
        set
        {
            if (value < 0)
                throw new ArgumentException("Saldo kan inte vara negativt");
            _balance = value;
        }
    }
}
```

## Expression-bodied property

När logiken är ett enkelt uttryck kan du använda `=>` för att korta ner koden.

```csharp
public class Rectangle
{
    public double Width { get; set; }
    public double Height  { get; set; }

    // Beräknad property — inget backing field
    public double Area => Width * Height;
    public double Perimeter => 2 * (Width + Height);
}

var r = new Rectangle { Width = 5, Height = 3 };
Console.WriteLine(r.Area);      // 15
Console.WriteLine(r.Perimeter);   // 16
```

## init — sätt bara vid skapandet (C# 9) ✨

Med `init` kan en property sättas i object initializer men inte ändras efteråt.

```csharp
public class Person
{
    public string Name  { get; init; }
    public int    Age { get; init; }
}

// Sätts en gång vid skapandet
var p = new Person { Name = "Anna", Age = 30 };

// p.Namn = "Björn";  // kompileringsfel — init tillåter inte ändring
```

> **✨ C# 9 — `init`:** Som `set` men bara tillåtet i object initializer och konstruktor. Ger oföränderlighet utan att du behöver skriva en konstruktor med alla parametrar.

## required — tvinga initiering (C# 11) ✨

`required` markerar att en property måste sättas när objektet skapas. Kompilatorn varnar om du glömmer den.

```csharp
public class Product
{
    public required string Name { get; set; }   // måste anges
    public double Price { get; set; }            // valfri
}

var p1 = new Product { Name = "Kaffebryggare" };          // OK
var p2 = new Product { Name = "Kaffebryggare", Price = 499.0 };  // OK
// var p3 = new Produkt { Pris = 499.0 };                 // kompileringsfel
```

> **✨ C# 11 — `required`:** Ersätter mönstret att kasta i konstruktorn om ett fält saknas. Felet syns redan vid kompilering.

## Kombinera init + required

```csharp
public class Address
{
    public required string Street   { get; init; }
    public required string City   { get; init; }
    public string          Land   { get; init; } = "Sverige";
}

var a = new Address { Street = "Storgatan 1", City = "Göteborg" };
Console.WriteLine($"{a.Street}, {a.City}, {a.Land}");
// Storgatan 1, Göteborg, Sverige
```

## init vs readonly — vad är skillnaden?

Båda ger oföränderlighet, men på olika sätt:

```csharp
class MedReadonly
{
    private readonly string _name;

    public MedReadonly(string name)
    {
        _name = name;  // readonly — sätts bara i konstruktor
    }
}

class MedInit
{
    public string Name { get; init; }  // init — sätts i konstruktor ELLER object initializer
}

// Med readonly måste du ha en konstruktor med parametrar
var a = new MedReadonly("Marcus");

// Med init kan du använda object initializer
var b = new MedInit { Name = "Marcus" };
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
| Beräknad | `public T Prop => expression;` | Värdet räknas ut |
| init | `{ get; init; }` | Sätt vid skapande, sedan oföränderlig |
| required | `public required T Prop { get; set; }` | Tvinga initiering |
| Full property | `get { } set { }` | Behöver validering |
