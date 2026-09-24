---
title: Konstruktoröverlagring
description: "En klass kan ha flera konstruktorer med olika parametrar — precis som metoder kan överlagras. Det låter dig skapa objekt på olika sätt utan att tvinga…"
parent: Objektorienterad programmering (OOP)
nav_order: 16
---
# Konstruktoröverlagring

En klass kan ha flera konstruktorer med olika parametrar — precis som metoder kan överlagras. Det låter dig skapa objekt på olika sätt utan att tvinga anroparen att ange allt varje gång.

Metodöverlagring i allmänhet behandlas i [Metodöverlagring](../metoder/metodoverlagring).

## När du läst detta ska du kunna

- Skriva en klass med flera konstruktorer
- Använda `this(...)` för att kedja konstruktorer
- Förklara varför konstruktoröverlagring minskar kodduplicering

## Grundexempel — Point

```csharp
public class Point
{
    public int X { get; }
    public int Y { get; }

    public Point()             : this(0, 0) { }    // origo
    public Point(int xy)       : this(xy, xy) { }  // diagonal
    public Point(int x, int y) { X = x; Y = y; }  // fullständig
}

var origin   = new Point();       // (0, 0)
var diagonal = new Point(5);      // (5, 5)
var specific = new Point(3, 7);   // (3, 7)
```

`this(...)` anropar en annan konstruktor i samma klass — logiken för att sätta X och Y finns bara på ett ställe.

## Praktiskt exempel — Person

```csharp
public class Person
{
    public string Name { get; }
    public int    Age  { get; }
    public string Role { get; }

    public Person(string name) : this(name, 0) { }

    public Person(string name, int age) : this(name, age, "user") { }

    public Person(string name, int age, string role)
    {
        Name = name;
        Age  = age;
        Role = role;
    }
}

var guest   = new Person("Björn");
var member  = new Person("Anna", 28);
var admin   = new Person("Clara", 35, "admin");
```

Den fullständiga konstruktorn innehåller all logik. De kortare är bekväma ingångar.

## Konstruktorkedja — varför?

Utan kedja dupliceras logiken:

```csharp
// Fel sätt — logiken upprepas
public Person(string name)
{
    Name = name;
    Age  = 0;
    Role = "user";
}

public Person(string name, int age)
{
    Name = name;   // ← duplicerat
    Age  = age;
    Role = "user"; // ← duplicerat
}
```

Med `: this(...)` lever logiken på ett ställe och alla konstruktorer är konsistenta.

## Overloading vs Override

| Begrepp | Innebär | Nyckelord |
|---------|---------|-----------|
| Överlagring (overloading) | Flera konstruktorer/metoder med **olika parametrar** i **samma klass** | — |
| Överskuggning (overriding) | Subklass byter ut en metods **implementation** | `virtual` + `override` |

Se [Arv](arv.md) för mer om `override`.

## TL;DR

Konstruktoröverlagring = flera `new()`-varianter. Koppla dem med `: this(...)` så logiken lever på ett ställe.
