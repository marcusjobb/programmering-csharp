---
title: Statiska variabler
description: "Statiska variabler i Variabler — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Variabler
nav_order: 30
---
# Statiska variabler

Vanliga variabler tillhör ett objekt. Varje instans av en klass har sin egen kopia. En statisk variabel tillhör klassen själv — alla instanser delar på samma värde.

```csharp
class Räknare
{
    public static int AntalSkapade = 0;

    public Räknare()
    {
        AntalSkapade++;
    }
}

new Räknare();
new Räknare();
new Räknare();

Console.WriteLine(Räknare.AntalSkapade);  // 3
```

Notera att du når den via klassnamnet (`Räknare.AntalSkapade`), inte via ett objekt.

## När du läst detta ska du kunna

- Förklara skillnaden mellan instansvariabel och statisk variabel
- Deklarera och använda `static`-variabler
- Känna till `static readonly` och när den används
- Se vanliga mönster och vanliga fallgropar

## Grundsyntax

```csharp
class Klass
{
    public static int DeladVariabel = 0;       // Statisk variabel
    public int EgenVariabel = 0;               // Instansvariabel
}
```

Instansvariabler är unika per objekt. Statiska variabler är gemensamma för alla objekt av klassen.

## static readonly

`const` kräver att värdet är känt vid kompilering. `static readonly` låter dig beräkna värdet en gång när programmet startar — och sedan är det låst.

```csharp
class Config
{
    public const string AppNamn = "MittProgram";              // Känt vid kompilering
    public static readonly string Version = HämtaVersion();  // Beräknas vid start

    static string HämtaVersion() => "1.0.0";
}
```

Använd `const` för enkla värden som aldrig ändras. Använd `static readonly` när värdet behöver initieras men sedan aldrig ändras.

## Statiska klasser

En statisk klass kan inte instansieras — den är en samling hjälpmetoder och/eller konstanter.

```csharp
static class MathUtils
{
    public static double Kvadrat(double x) => x * x;
    public static double Kub(double x) => x * x * x;
}

Console.WriteLine(MathUtils.Kvadrat(4));  // 16
Console.WriteLine(MathUtils.Kub(3));      // 27
```

`Console`, `Math`, `File` i .NET är alla statiska klasser.

## Räknare-mönstret

En vanlig och legitim användning: räkna hur många objekt som skapats.

```csharp
class Produkt
{
    private static int _nästaId = 1;

    public int Id { get; }
    public string Namn { get; }

    public Produkt(string namn)
    {
        Id = _nästaId++;
        Namn = namn;
    }
}

var p1 = new Produkt("Kaffe");
var p2 = new Produkt("Te");
var p3 = new Produkt("Juice");

Console.WriteLine($"{p1.Id}: {p1.Namn}");  // 1: Kaffe
Console.WriteLine($"{p2.Id}: {p2.Namn}");  // 2: Te
Console.WriteLine($"{p3.Id}: {p3.Namn}");  // 3: Juice
```

## Fallgropar

**Delat tillstånd kan ge oväntade bieffekter.** Om två delar av koden läser och skriver till samma statiska variabel kan de störa varandra.

```csharp
class Kalkylator
{
    public static double Resultat = 0;  // Dålig idé — alla delar delar resultatet
}
```

Föredra att returnera värden från metoder framför att lagra dem i statiska variabler.

**Statiska variabler lever hela programmets livstid.** De rensas inte när ett objekt förstörs — de finns kvar tills programmet avslutas.

## TL;DR

Statiska variabler tillhör klassen, inte instansen — alla objekt delar på samma värde. Använd dem för delad konfiguration, räknare och hjälpmetoder. Undvik att lagra föränderligt tillstånd i dem utan genomtänkt anledning.
