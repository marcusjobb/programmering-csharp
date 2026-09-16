---
title: Överlagring
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Objektorienterad programmering (OOP)
nav_order: 16
---
# Överlagring (Method Overloading)

Överlagring innebär att du kan ha flera metoder med **samma namn** i en klass — så länge de har **olika parametrar**. Kompilatorn väljer rätt version baserat på vad du skickar in.

## När du läst detta ska du kunna

- Förklara vad överlagring är
- Skriva överlagrade metoder med olika parametertyper
- Förklara hur C# väljer vilken version som körs
- Skilja på överlagring och överskuggning (override)

## Grundexempel — Hälsa

Samma metod, olika parametertyper. Kompilatorn väljer version baserat på argumentet.

```csharp
public class Hälsning
{
    public void SägHej(string namn)
    {
        Console.WriteLine($"Hej, {namn}!");
    }

    public void SägHej(string namn, string tid)
    {
        Console.WriteLine($"God {tid}, {namn}!");
    }

    public void SägHej(int antalGånger)
    {
        for (int i = 0; i < antalGånger; i++)
            Console.WriteLine("Hej!");
    }
}

var h = new Hälsning();
h.SägHej("Anna");              // Hej, Anna!
h.SägHej("Björn", "morgon");   // God morgon, Björn!
h.SägHej(3);                   // Hej! Hej! Hej!
```

### Output

```
Hej, Anna!
God morgon, Björn!
Hej!
Hej!
Hej!
```

## Räknare — olika taltyper

Samma `Addera`-metod fungerar med både heltal och decimaltal.

```csharp
public class Räknare
{
    public int Addera(int x, int y)
    {
        Console.WriteLine($"int + int = {x + y}");
        return x + y;
    }

    public double Addera(double x, double y)
    {
        Console.WriteLine($"double + double = {x + y}");
        return x + y;
    }

    public string Addera(string x, string y)
    {
        Console.WriteLine($"string + string = {x + " " + y}");
        return x + " " + y;
    }
}

var r = new Räknare();
r.Addera(3, 4);              // int + int = 7
r.Addera(1.5, 2.3);         // double + double = 3.8
r.Addera("Hej", "Världen"); // string + string = Hej Världen
```

### Output

```
int + int = 7
double + double = 3.8
string + string = Hej Världen
```

## Konstruktoröverlagring

Konstruktorer kan också överlagras — se [Konstruktorer](konstruktor.md) för fler detaljer.

```csharp
public class Point
{
    public int X { get; }
    public int Y { get; }

    public Point()             : this(0, 0) { }    // origo
    public Point(int xy)       : this(xy, xy) { }  // diagonal
    public Point(int x, int y) { X = x; Y = y; }
}

var p1 = new Point();        // (0, 0)
var p2 = new Point(5);       // (5, 5)
var p3 = new Point(3, 7);    // (3, 7)
```

## Vad skiljer överlagring från override?

| Begrepp | Innebär | Nyckelord |
|---------|---------|-----------|
| Överlagring (overloading) | Flera metoder, **samma namn, olika parametrar**, i **samma klass** | — |
| Överskuggning (overriding) | Subklass byter ut en metods **implementation** | `virtual` + `override` |

Se [Arv](arv.md) för mer om `override`.

## TL;DR

Överlagring = samma metodnamn, olika parametersignaturer. Kompilatorn väljer rätt version vid kompilering. Används för att ge ett naturligt API utan att behöva hitta på olika metodnamn för varje variant.
