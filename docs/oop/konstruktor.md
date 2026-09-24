---
title: Konstruktorer
description: "Konstruktorer i Objektorienterad programmering (OOP) — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Objektorienterad programmering (OOP)
nav_order: 12
---
# Konstruktorer

En konstruktor är den metod som körs när ett objekt skapas. Den ser till att objektet startar i ett giltigt tillstånd.

## När du läst detta ska du kunna

- Förklara vad en konstruktor är och när den körs
- Skriva en standardkonstruktor och en parametriserad konstruktor
- Använda konstruktoröverlagring (flera konstruktorer)
- Använda `: this()` för att anropa en annan konstruktor i samma klass
- Använda primärkonstruktor (C# 12)

## Vad är en konstruktor?

En konstruktor ser ut som en metod men har alltid **samma namn som klassen** och har **inget returvärde** — inte ens `void`.

```csharp
public class Car
{
    public string Brand { get; private set; }
    public int ModelYear { get; private set; }

    // Konstruktor — körs automatiskt när "new Bil(...)" anropas
    public Car(string brand, int modelYear)
    {
        Brand     = brand;
        ModelYear = modelYear;
    }
}

var car = new Car("Volvo", 2020);
Console.WriteLine(car.Brand);      // Volvo
Console.WriteLine(car.ModelYear);  // 2020
```

## Standardkonstruktor (ingen parameter)

Om klassen inte definierar någon konstruktor alls skapar C# automatiskt en tom standardkonstruktor. Definierar du en parametriserad konstruktor försvinner standardkonstruktorn — vill du ha båda, skriv ut dem.

```csharp
public class Car
{
    public string Brand { get; set; }

    // Standardkonstruktor — skapar ett "tomt" Bil-objekt
    public Car()
    {
        Brand = "Okänt";
    }
}

var car = new Car();
Console.WriteLine(car.Brand);  // Okänt
```

## Konstruktoröverlagring

Du kan ha flera konstruktorer med olika parameterlistor. C# väljer rätt baserat på vilka argument du skickar med.

```csharp
public class Person
{
    public string Name { get; private set; }
    public int    Age { get; private set; }

    // Konstruktor 1: bara namn
    public Person(string name)
    {
        Name  = name;
        Age = 0;
    }

    // Konstruktor 2: namn och ålder
    public Person(string name, int age)
    {
        Name  = name;
        Age = age;
    }
}

var p1 = new Person("Anna");
var p2 = new Person("Björn", 30);

Console.WriteLine($"{p1.Name}, {p1.Age}");  // Anna, 0
Console.WriteLine($"{p2.Name}, {p2.Age}");  // Björn, 30
```

## Anropa annan konstruktor med `: this()`

Istället för att upprepa initieringskod kan du låta en konstruktor anropa en annan i samma klass med `: this(...)`.

```csharp
public class Person
{
    public string Name  { get; private set; }
    public int    Age { get; private set; }

    // Huvud-konstruktor som gör jobbet
    public Person(string name, int age)
    {
        Name  = name;
        Age = age;
    }

    // Delegerar till huvud-konstruktorn med ett standardvärde
    public Person(string name) : this(name, 0) { }
}
```

### Output

```
Anna, 0
Björn, 30
```

## Object initializer — alternativ syntax

Object initializer låter dig sätta properties direkt vid skapandet utan att skriva en konstruktor för varje kombination.

```csharp
public class Book
{
    public string Title  { get; set; }
    public string Author { get; set; }
    public int    Year     { get; set; }
}

// Alla properties sätts i ett block
var book = new Book
{
    Title       = "Dune",
    Author  = "Herbert",
    Year          = 1965
};
```

> OBS: Object initializer kräver `public set` (eller `init`) på properties. Det ger sämre inkapsling än en konstruktor — använd konstruktor när data krävs för att objektet ska vara giltigt.

## Primärkonstruktor — C# 12 ✨

I C# 12 kan du deklarera parametrar direkt på klassrubriken. Parametrarna finns tillgängliga i hela klassen.

```csharp
// Gammalt sätt
public class Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }
}

// ✨ C# 12 — primärkonstruktor
public class Point(int x, int y)
{
    public int X { get; } = x;
    public int Y { get; } = y;
}

var p = new Point(3, 7);
Console.WriteLine($"X={p.X}, Y={p.Y}");  // X=3, Y=7
```

> **✨ C# 12 — Primary constructors:** Kortare och tydligare när konstruktorn bara sätter properties. Fungerar på vanliga klasser och structs — inte bara records.

## TL;DR

| Variant | Syntax | Används när |
|---------|--------|-------------|
| Standardkonstruktor | `public Class() { }` | Objektet kan skapas utan argument |
| Parametriserad | `public Class(type param) { }` | Argumenten krävs för giltigt objekt |
| Överlagring | Flera konstruktorer | Olika kombinationer av argument |
| `: this()` | Delegerar till annan konstruktor | Undvika upprepning |
| Object initializer | `new Class { Prop = choice }` | Snabb syntax, kräver public set |
| Primärkonstruktor (C# 12) | `public class Class(type param)` | Modernt och kortfattat |
