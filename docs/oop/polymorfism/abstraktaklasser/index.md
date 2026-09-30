---
title: Abstrakta klasser
description: "En abstrakt klass blandar färdig kod med metoder som saknar implementation — och tvingar varje subklass att fylla i resten."
parent: Polymorfism
nav_order: 10
has_children: True
---
# Abstrakta klasser

En abstrakt klass är en mellanting mellan en vanlig klass och ett [interface](../interfaces/index/): den kan innehålla färdig, delad kod precis som en vanlig klass, men den kan också deklarera metoder utan implementation — `abstract`-metoder — som varje subklass **måste** skriva sin egen version av. Och till skillnad från en vanlig klass går det aldrig att skapa ett objekt direkt av en abstrakt klass; den existerar bara för att ärvas.

## När du läst detta ska du kunna

- Deklarera en abstrakt klass med en `abstract`-metod
- Förklara varför en abstrakt klass inte kan instansieras
- Skriva subklasser som implementerar den abstrakta metoden på olika sätt

## Exempel — Shape

```csharp
public abstract class Shape
{
    public abstract double Area();
}

public class Circle : Shape
{
    public double Radius { get; set; }
    public override double Area() => Math.PI * Radius * Radius;
}

public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }
    public override double Area() => Width * Height;
}
```

```csharp
// Shape shape = new Shape();   // kompileringsfel — abstrakt klass, kan inte instansieras

List<Shape> shapes = [new Circle { Radius = 3 }, new Rectangle { Width = 4, Height = 5 }];

foreach (var shape in shapes)
    Console.WriteLine(shape.Area());
```

### Output

```
28,274333882308138
20
```

`Shape` vet att varje form har en area — det är precis vad `abstract double Area();` säger — men den vet inte *hur* man räknar ut den, för det är olika för varje form. Varje subklass måste svara på den frågan själv, annars vägrar kompilatorn bygga klassen.

## Abstrakt klass eller interface?

Båda tvingar subklasser att implementera vissa medlemmar, men de skiljer sig på en viktig punkt: en abstrakt klass kan innehålla **delad, färdig kod** utöver de abstrakta metoderna, ett interface kan inte innehålla någon implementation alls. Behöver dina subklasser dela på faktisk logik (inte bara ett gemensamt kontrakt), och räcker det med att ärva från en enda basklass, är abstrakt klass ofta rätt val. Behöver du att helt orelaterade klasser ska kunna lova samma kontrakt — en `Circle` och en helt annan typ av objekt som råkar också ha en area — är ett interface flexiblare, eftersom en klass kan implementera flera interfaces men bara ärva från en klass.

## Obligatorisk dad-joke

Varför fick den abstrakta klassen aldrig gå på egen hand?

Den hade ingen implementation att stå på.
