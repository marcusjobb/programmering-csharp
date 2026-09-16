---
title: ToString-override
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
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
public class Bil
{
    public string Märke { get; set; }
    public int    År    { get; set; }
}

var bil = new Bil { Märke = "Volvo", År = 2020 };
Console.WriteLine(bil.ToString());  // Bil
Console.WriteLine(bil);             // Bil (anropar ToString() automatiskt)
```

### Output

```
Bil
Bil
```

Inte speciellt informativt.

## Override av ToString

Lägg till `override ToString()` för att styra utskriften.

```csharp
public class Bil
{
    public string Märke { get; set; }
    public int    År    { get; set; }

    public override string ToString()
    {
        return $"{Märke} ({År})";
    }
}

var bil = new Bil { Märke = "Volvo", År = 2020 };
Console.WriteLine(bil);             // Volvo (2020)
Console.WriteLine($"Bilen: {bil}"); // Bilen: Volvo (2020)
```

### Output

```
Volvo (2020)
Bilen: Volvo (2020)
```

## Vanliga användningsfall

`ToString()` anropas implicit av:
- `Console.WriteLine(objekt)`
- Stränginterpolation `$"... {objekt} ..."`
- Debuggern i Visual Studio / Rider (hover-tooltip visar ToString)
- `string.Format`, `StringBuilder.Append`, m.fl.

Det gör override av `ToString()` till ett enkelt och kraftfullt verktyg för felsökning.

## Exempel: flera klasser

```csharp
public class Produkt
{
    public string Namn  { get; set; }
    public double Pris  { get; set; }

    public override string ToString() => $"{Namn} — {Pris:C}";
}

public class Person
{
    public string Förnamn { get; set; }
    public string Efternamn { get; set; }
    public int    Ålder { get; set; }

    public override string ToString() => $"{Förnamn} {Efternamn} ({Ålder} år)";
}

var p = new Produkt { Namn = "Kaffemaskin", Pris = 499.0 };
var u = new Person  { Förnamn = "Anna", Efternamn = "Svensson", Ålder = 32 };

Console.WriteLine(p);   // Kaffemaskin — 499,00 kr
Console.WriteLine(u);   // Anna Svensson (32 år)
```

### Output

```
Kaffemaskin — 499,00 kr
Anna Svensson (32 år)
```

## TL;DR

- Alla klasser ärver `ToString()` från `object`
- Standardversionen returnerar typnamnet — inte så användbart
- Skriv `public override string ToString()` för att styra hur objektet visas
- Anropas automatiskt av `Console.WriteLine`, stränginterpolation och debuggern
