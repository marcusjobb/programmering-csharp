---
title: Abstrakta klasser
description: "Abstrakta klasser i Polymorfism — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Polymorfism
nav_order: 10
has_children: True
---
# Abstrakta klasser

Abstrakta klasser är klasser som innehåller både kod och abstrakta metoder. Som en slags mellanting mellan en interface och en klass.
<details open markdown="block">
  <summary>
    Innehållsförteckning
  </summary>
  {: .text-delta }

1. TOC
{:toc}

</details>

## Beskrivning

En abstrakt klass är bara till för att andra klasser ska kunna arva från den. Det går inte att skapa objekt av en abstrakt klass. Det är bara till för att andra klasser ska kunna arva från den.

## Exempel

```csharp
public abstract class Shape
{
    public abstract double Area();
}
public class Circle : Shape
{
    public double Radius { get; set; }
    public override double Area()
    {
        return Math.PI * Radius * Radius;
    }
}
public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }
    public override double Area()
    {
        return Width * Height;
    }
}
```

## Referenser

- [Abstrakta klasser](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/abstract-classes)
- [Abstract class W3Schools](https://www.w3schools.com/cs/cs_abstract.php)
