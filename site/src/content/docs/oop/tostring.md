---
title: ToString-override
description: "ToString-override i Objektorienterad programmering (OOP) — C#-boken av Marcus Ackre Medina"
layout: default
parent: Objektorienterad programmering (OOP)
nav_order: 18
---
# ToString — override av basobjektets metod

Alla klasser i C# ärver från `object`. Det ger alla objekt en `ToString()`-metod — men standardversionen returnerar bara typnamnet. Genom att overrida den kan du styra hur ditt objekt visas som text.

## När du läst detta ska du kunna

- Förklara varför alla klasser har `ToString()`
- Skriva en `override` av `ToString()` i en klass
- Använda `ToString()` implicit via `Console.WriteLine` och stränginterpolation
- Förklara när `ToString()` är användbart i felsökning

## Standardbeteendet

Utan override returnerar `ToString()` klassens fullständiga typnamn.

```csharp
public class Car
{
    public string Brand { get; set; }
    public int    Year    { get; set; }
}

var car = new Car { Brand = "Volvo", Year = 2020 };
Console.WriteLine(car.ToString());  // Bil
Console.WriteLine(car);             // Bil (anropar ToString() automatiskt)
```

### Output

```
Car
Car
```

Inte speciellt informativt.

## Override av ToString

Lägg till `override ToString()` för att styra utskriften.

```csharp
public class Car
{
    public string Brand { get; set; }
    public int    Year    { get; set; }

    public override string ToString()
    {
        return $"{Brand} ({Year})";
    }
}

var car = new Car { Brand = "Volvo", Year = 2020 };
Console.WriteLine(car);             // Volvo (2020)
Console.WriteLine($"Bilen: {car}"); // Bilen: Volvo (2020)
```

### Output

```
Volvo (2020)
Car: Volvo (2020)
```

## Vanliga användningsfall

`ToString()` anropas implicit av:
- `Console.WriteLine(object)`
- Stränginterpolation `$"... {object} ..."`
- Debuggern i Visual Studio / Rider (hover-tooltip visar ToString)
- `string.Format`, `StringBuilder.Append`, m.fl.

Det gör override av `ToString()` till ett enkelt och kraftfullt verktyg för felsökning.

## Exempel: flera klasser

```csharp
public class Product
{
    public string Name  { get; set; }
    public double Price  { get; set; }

    public override string ToString() => $"{Name} — {Price:C}";
}

public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int    Age { get; set; }

    public override string ToString() => $"{FirstName} {LastName} ({Age} år)";
}

var p = new Product { Name = "Kaffemaskin", Price = 499.0 };
var u = new Person  { FirstName = "Anna", LastName = "Svensson", Age = 32 };

Console.WriteLine(p);   // Kaffemaskin — 499,00 kr
Console.WriteLine(u);   // Anna Svensson (32 år)
```

### Output

```
CoffeeMachine — 499,00 kr
Anna Svensson (32 year)
```

## TL;DR

- Alla klasser ärver `ToString()` från `object`
- Standardversionen returnerar typnamnet — inte så användbart
- Skriv `public override string ToString()` för att styra hur objektet visas
- Anropas automatiskt av `Console.WriteLine`, stränginterpolation och debuggern
