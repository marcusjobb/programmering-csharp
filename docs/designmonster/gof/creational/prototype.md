---
title: Prototype
description: "Vissa objekt är dyra eller krångliga att skapa från grunden — mycket konfiguration, en tung initieringsprocess. Behöver du många liknande instanser är det…"
parent: "Skapande mönster (Creational)"
nav_order: 40
---

# Prototype

## Problemet

Vissa objekt är dyra eller krångliga att skapa från grunden — mycket konfiguration, en tung initieringsprocess. Behöver du många liknande instanser är det ofta billigare att kopiera en redan konfigurerad instans än att köra hela skapandeprocessen igen.

## Lösningen

```csharp
public abstract class Shape
{
    public string Color { get; set; } = "";
    public abstract Shape Clone();
}

public class Circle : Shape
{
    public int Radius { get; set; }

    public override Shape Clone() => new Circle
    {
        Color = this.Color,
        Radius = this.Radius
    };
}
```

```csharp
var original = new Circle { Color = "Röd", Radius = 10 };

var kopia = original.Clone();
kopia.Color = "Blå";

Console.WriteLine(original.Color);  // Röd — orörd
Console.WriteLine(kopia.Color);     // Blå — egen kopia
```

`Clone()` returnerar en ny instans med samma tillstånd som originalet, redo att justeras utan att påverka originalet.

## Inbyggt i .NET

`ICloneable`-gränssnittet i .NET Framework var en direkt inbyggd version av det här mönstret (mindre använt i modern .NET, delvis för att det inte gör tydligt om det är en djup eller ytlig kopia — se hellre [records](../../../oop/records.md) och `with`-uttryck för en modernare variant av samma idé: skapa en ny instans baserad på en befintlig).

## TL;DR

Prototype skapar nya objekt genom att klona en färdigkonfigurerad instans istället för att köra hela konstruktionslogiken igen — snabbare när skapandet är dyrt, och ett tydligt släktskap med hur `record`s `with`-uttryck fungerar.
