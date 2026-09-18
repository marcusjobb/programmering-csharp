---
title: Konstruktorer
description: "Konstruktorer i Objektorienterad programmering (OOP) — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
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
public class Bil
{
    public string Märke { get; private set; }
    public int Årsmodell { get; private set; }

    // Konstruktor — körs automatiskt när "new Bil(...)" anropas
    public Bil(string märke, int årsmodell)
    {
        Märke     = märke;
        Årsmodell = årsmodell;
    }
}

var bil = new Bil("Volvo", 2020);
Console.WriteLine(bil.Märke);      // Volvo
Console.WriteLine(bil.Årsmodell);  // 2020
```

## Standardkonstruktor (ingen parameter)

Om klassen inte definierar någon konstruktor alls skapar C# automatiskt en tom standardkonstruktor. Definierar du en parametriserad konstruktor försvinner standardkonstruktorn — vill du ha båda, skriv ut dem.

```csharp
public class Bil
{
    public string Märke { get; set; }

    // Standardkonstruktor — skapar ett "tomt" Bil-objekt
    public Bil()
    {
        Märke = "Okänt";
    }
}

var bil = new Bil();
Console.WriteLine(bil.Märke);  // Okänt
```

## Konstruktoröverlagring

Du kan ha flera konstruktorer med olika parameterlistor. C# väljer rätt baserat på vilka argument du skickar med.

```csharp
public class Person
{
    public string Namn { get; private set; }
    public int    Ålder { get; private set; }

    // Konstruktor 1: bara namn
    public Person(string namn)
    {
        Namn  = namn;
        Ålder = 0;
    }

    // Konstruktor 2: namn och ålder
    public Person(string namn, int ålder)
    {
        Namn  = namn;
        Ålder = ålder;
    }
}

var p1 = new Person("Anna");
var p2 = new Person("Björn", 30);

Console.WriteLine($"{p1.Namn}, {p1.Ålder}");  // Anna, 0
Console.WriteLine($"{p2.Namn}, {p2.Ålder}");  // Björn, 30
```

## Anropa annan konstruktor med `: this()`

Istället för att upprepa initieringskod kan du låta en konstruktor anropa en annan i samma klass med `: this(...)`.

```csharp
public class Person
{
    public string Namn  { get; private set; }
    public int    Ålder { get; private set; }

    // Huvud-konstruktor som gör jobbet
    public Person(string namn, int ålder)
    {
        Namn  = namn;
        Ålder = ålder;
    }

    // Delegerar till huvud-konstruktorn med ett standardvärde
    public Person(string namn) : this(namn, 0) { }
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
public class Bok
{
    public string Titel  { get; set; }
    public string Författare { get; set; }
    public int    År     { get; set; }
}

// Alla properties sätts i ett block
var bok = new Bok
{
    Titel       = "Dune",
    Författare  = "Herbert",
    År          = 1965
};
```

> OBS: Object initializer kräver `public set` (eller `init`) på properties. Det ger sämre inkapsling än en konstruktor — använd konstruktor när data krävs för att objektet ska vara giltigt.

## Primärkonstruktor — C# 12 ✨

I C# 12 kan du deklarera parametrar direkt på klassrubriken. Parametrarna finns tillgängliga i hela klassen.

```csharp
// Gammalt sätt
public class Punkt
{
    public int X { get; }
    public int Y { get; }

    public Punkt(int x, int y)
    {
        X = x;
        Y = y;
    }
}

// ✨ C# 12 — primärkonstruktor
public class Punkt(int x, int y)
{
    public int X { get; } = x;
    public int Y { get; } = y;
}

var p = new Punkt(3, 7);
Console.WriteLine($"X={p.X}, Y={p.Y}");  // X=3, Y=7
```

> **✨ C# 12 — Primary constructors:** Kortare och tydligare när konstruktorn bara sätter properties. Fungerar på vanliga klasser och structs — inte bara records.

## TL;DR

| Variant | Syntax | Används när |
|---------|--------|-------------|
| Standardkonstruktor | `public Klass() { }` | Objektet kan skapas utan argument |
| Parametriserad | `public Klass(typ param) { }` | Argumenten krävs för giltigt objekt |
| Överlagring | Flera konstruktorer | Olika kombinationer av argument |
| `: this()` | Delegerar till annan konstruktor | Undvika upprepning |
| Object initializer | `new Klass { Prop = val }` | Snabb syntax, kräver public set |
| Primärkonstruktor (C# 12) | `public class Klass(typ param)` | Modernt och kortfattat |
