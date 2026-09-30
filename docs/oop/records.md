---
title: Records
description: "Records i OOP — immutabla dataklasser i C# — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Objektorienterad programmering (OOP)
nav_order: 38
---
# Records

En record är en klass vars syfte är att hålla data — oföränderlig och kortfattad. Records kom med C# 9 som ett svar på ett återkommande behov: enkla dataklasser som jämförs på *innehåll*, inte på *identitet*, och som helst inte borde kunna ändras efter att de skapats.

> Se också: [Records vs POJOs/DTOs](https://marcusmedina.pro/sv/junior-tips/records-vs-pojos-dtos/) på marcusmedina.pro

## När du läst detta ska du kunna

- Deklarera en positional record med ett-rads-syntax
- Förklara skillnaden mellan värdelikhet (record) och referenslikhet (class)
- Använda `with` för att skapa modifierade kopior
- Skilja `record` (referenstyp) från `record struct` (värdetyp)
- Välja rätt: record vs klass vs struct

## Grundsyntax

```csharp
public record Person(string Name, int Age);

var anna  = new Person("Anna", 30);
var kopia = new Person("Anna", 30);

Console.WriteLine(anna == kopia);        // True
Console.WriteLine(anna.Equals(kopia));   // True
```

En rad — och du får en klass med properties, konstruktor, `Equals`, `GetHashCode` och en läsbar `ToString()` helt gratis.

## Varför spelar det här roll?

Det löser ett verkligt problem: **kan du lita på att datan inte tystnat ändrats på vägen genom din kod?**

Tänk dig en banktransaktion som skickas genom flera lager — valideras, loggas, skickas vidare till ett betalningssystem. Med en vanlig muterbar klass kan *vilken metod som helst* längs vägen ändra ett fält, av misstag eller avsikt, utan att det syns. Med en `record` är det omöjligt. Behöver en senare del av flödet en "ändrad" version skapar den en **ny** instans med `with` — originalet rörs aldrig.

## Jämför med vanlig klass

```csharp
public class PersonKlass
{
    public string Name { get; }
    public int Age { get; }

    public PersonKlass(string name, int age)
    {
        Name = name;
        Age  = age;
    }
}

var a = new PersonKlass("Anna", 30);
var b = new PersonKlass("Anna", 30);

Console.WriteLine(a == b);   // False — olika objekt i minnet, trots samma innehåll
```

| | `class` | `record` |
|---|---|---|
| `==` jämför | Referens — är det samma objekt? | Värde — har alla properties samma innehåll? |
| `ToString()` | Bara typnamnet | Automatiskt: `Person { Name = Anna, Age = 30 }` |
| Mutabilitet | Du väljer | Tänkt att vara immutable |

## Positional record — ett-rads-syntax

```csharp
public record UserDto(int Id, string Name, string Email);
```

Kompilatorn genererar automatiskt:
- En konstruktor med dessa parametrar
- `init`-properties för varje parameter
- `ToString()` som listar alla värden
- `Equals()` och `GetHashCode()` baserade på värden
- `==` och `!=` som jämför värden (inte referens)

```csharp
var user = new UserDto(1, "Anna", "anna@exempel.se");
Console.WriteLine(user);          // UserDto { Id = 1, Name = Anna, Email = anna@exempel.se }
Console.WriteLine(user.Name);     // Anna
```

## with — skapa en modifierad kopia

`with` skapar ett nytt objekt med ett eller flera ändrade värden. Originalet är oförändrat:

```csharp
var original = new UserDto(1, "Marcus", "marcus@exempel.se");
var updated  = original with { Email = "ny@exempel.se" };

Console.WriteLine(original.Email);  // marcus@exempel.se
Console.WriteLine(updated.Email);   // ny@exempel.se
```

## Full record med extra logik

```csharp
public record Order(int Id, string Customer, decimal Total)
{
    public decimal WithVat  => Total * 1.25m;
    public string  Summary() => $"#{Id} — {Customer}: {Total:C}";

    public Order
    {
        if (Total < 0) throw new ArgumentOutOfRangeException(nameof(Total));
    }
}
```

```csharp
var order = new Order(1, "Anna", 800m);
Console.WriteLine(order.WithVat);      // 1000 kr
Console.WriteLine(order.Summary());    // #1 — Anna: 800,00 kr
```

## record struct — värdetyp (C# 10)

En vanlig `record` är en referenstyp (lever på heapen). `record struct` är en värdetyp (lever på stacken):

```csharp
// Referenstyp — på heapen
public record Point(double X, double Y);

// Värdetyp — på stacken, snabbare för små strukturer
public record struct Point(double X, double Y);
```

Välj `record struct` för små, frekventa datastrukturer där prestanda spelar roll.

## Record-arv

```csharp
public record Person(string Name, int Age);
public record Employee(string Name, int Age, string Department) : Person(Name, Age);
```

```csharp
var emp = new Employee("Anna", 30, "IT");
Console.WriteLine(emp);   // Employee { Name = Anna, Age = 30, Department = IT }
```

## När ska du använda records?

| Situation | Record | Klass |
|-----------|--------|-------|
| API request / response | ✓ | |
| DTO och view model | ✓ | |
| Konfigurationsobjekt | ✓ | |
| Händelser i event-driven kod | ✓ | |
| Domain entity som muterar | | ✓ |
| Klass med komplex affärslogik | | ✓ |
| Klass med livscykel (start, stop, dispose) | | ✓ |

## TL;DR

```csharp
// En rad — kompilatorn sköter resten
public record UserDto(int Id, string Name, string Email);

// Skapa
var user = new UserDto(1, "Marcus", "marcus@exempel.se");

// Modifiera — ny instans, originalet oförändrat
var updated = user with { Email = "ny@exempel.se" };

// Jämförelse på värde
new UserDto(1, "X", "y") == new UserDto(1, "X", "y")   // True
```

Records ersätter mutable DTOs. De är säkrare, kortare och lättare att resonera kring.
