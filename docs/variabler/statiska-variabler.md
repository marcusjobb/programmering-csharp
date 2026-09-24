---
title: Statiska variabler
description: "Vanliga variabler tillhör ett objekt. Varje instans av en klass har sin egen kopia. En statisk variabel tillhör klassen själv — alla instanser delar på…"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Variabler
nav_order: 30
---
# Statiska variabler

Vanliga variabler tillhör ett objekt. Varje instans av en klass har sin egen kopia. En statisk variabel tillhör klassen själv — alla instanser delar på samma värde.

```csharp
class Counter
{
    public static int TotalCreated = 0;

    public Counter()
    {
        TotalCreated++;
    }
}

new Counter();
new Counter();
new Counter();

Console.WriteLine(Counter.TotalCreated);  // 3
```

Notera att du når den via klassnamnet (`Counter.TotalCreated`), inte via ett objekt.

## När du läst detta ska du kunna

- Förklara skillnaden mellan instansvariabel och statisk variabel
- Deklarera och använda `static`-variabler
- Känna till `static readonly` och när den används
- Se vanliga mönster och vanliga fallgropar

## Grundsyntax

```csharp
class Example
{
    public static int SharedVariable = 0;       // Statisk variabel
    public int InstanceVariable = 0;             // Instansvariabel
}
```

Instansvariabler är unika per objekt. Statiska variabler är gemensamma för alla objekt av klassen.

## static readonly

`const` kräver att värdet är känt vid kompilering. `static readonly` låter dig beräkna värdet en gång när programmet startar — och sedan är det låst.

```csharp
class Config
{
    public const string AppName = "MittProgram";              // Känt vid kompilering
    public static readonly string Version = GetVersion();  // Beräknas vid start

    static string GetVersion() => "1.0.0";
}
```

Använd `const` för enkla värden som aldrig ändras. Använd `static readonly` när värdet behöver initieras men sedan aldrig ändras.

## Statiska klasser

En statisk klass kan inte instansieras — den är en samling hjälpmetoder och/eller konstanter.

```csharp
static class MathUtils
{
    public static double Square(double x) => x * x;
    public static double Cube(double x) => x * x * x;
}

Console.WriteLine(MathUtils.Square(4));  // 16
Console.WriteLine(MathUtils.Cube(3));      // 27
```

`Console`, `Math`, `File` i .NET är alla statiska klasser.

## Räknare-mönstret

En vanlig och legitim användning: räkna hur många objekt som skapats.

```csharp
class Product
{
    private static int _nextId = 1;

    public int Id { get; }
    public string Name { get; }

    public Product(string name)
    {
        Id = _nextId++;
        Name = name;
    }
}

var p1 = new Product("Kaffe");
var p2 = new Product("Te");
var p3 = new Product("Juice");

Console.WriteLine($"{p1.Id}: {p1.Name}");  // 1: Kaffe
Console.WriteLine($"{p2.Id}: {p2.Name}");  // 2: Te
Console.WriteLine($"{p3.Id}: {p3.Name}");  // 3: Juice
```

## Fallgropar

**Delat tillstånd kan ge oväntade bieffekter.** Om två delar av koden läser och skriver till samma statiska variabel kan de störa varandra.

```csharp
class Calculator
{
    public static double Result = 0;  // Dålig idé — alla delar delar resultatet
}
```

Föredra att returnera värden från metoder framför att lagra dem i statiska variabler.

**Statiska variabler lever hela programmets livstid.** De rensas inte när ett objekt förstörs — de finns kvar tills programmet avslutas.

## TL;DR

Statiska variabler tillhör klassen, inte instansen — alla objekt delar på samma värde. Använd dem för delad konfiguration, räknare och hjälpmetoder. Undvik att lagra föränderligt tillstånd i dem utan genomtänkt anledning.
