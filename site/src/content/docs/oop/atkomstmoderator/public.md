---
title: Public
description: "Public i Åtkomstmoderator — C#-boken av Marcus Ackre Medina"
layout: default
parent: Åtkomstmoderator
nav_order: 40
---
# Public

Public är en åtkomstmoderator som gör att en klass, metod eller egenskap är tillgänglig för alla klasser.
<details open markdown="block">
  <summary>
    Innehållsförteckning
  </summary>
  {: .text-delta }

1. TOC
{:toc}

</details>

## Beskrivning

Med public kan vi göra en klass, metod eller egenskap tillgänglig för alla klasser. Detta är bra om vi vill dela kod mellan flera klasser i olika projekt.

## Exempel

```csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}
```

## Förklaring

I exemplet ovan är klassen Person tillgänglig för alla klasser i alla projekt. Detta gör att vi kan skapa en ny instans av Person i en annan klass och lägga till ett namn och ålder.
