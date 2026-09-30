---
title: required-members
description: "required-nyckelordet — tvinga initiering av properties utan konstruktor (C# 11) — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Objektorienterad programmering (OOP)
nav_order: 40
---
# required-members

`required` tvingar den som skapar ett objekt att sätta en property — utan att du behöver skriva en konstruktor. Lösningen på "hur gör jag init-only obligatorisk?"

## När du läst detta ska du kunna

- Markera properties som `required`
- Förklara skillnaden mot en konstruktor med parametrar
- Kombinera `required` med `init` och records
- Veta när `required` är rätt val

## Problemet — valfria properties utan garanti

```csharp
public class UserDto
{
    public int    Id    { get; init; }
    public string Name  { get; init; }   // ingenting hindrar null
    public string Email { get; init; }
}

// Kompileras utan varning trots att Name och Email saknas
var user = new UserDto { Id = 1 };
Console.WriteLine(user.Name);   // null — ingen klagade
```

## Lösning med required

```csharp
public class UserDto
{
    public required int    Id    { get; init; }
    public required string Name  { get; init; }
    public required string Email { get; init; }
}

// Kompileringsfel om något saknas
var user = new UserDto
{
    Id    = 1,
    Name  = "Anna",
    Email = "anna@exempel.se",
};

// var user = new UserDto { Id = 1 };   // ← KOMPILERINGSFEL
```

Felet syns vid kompilering, inte vid körning.

## Kombinera med init och set

`required` fungerar med både `init` (skrivs bara vid skapande) och `set` (kan ändras efteråt):

```csharp
public class Config
{
    public required string ConnectionString { get; init; }   // sätts en gång
    public required int    Timeout          { get; set; }    // kan ändras
    public string?         Comment          { get; set; }    // valfri
}
```

## Required i konstruktor-kombination

Om du vill tillåta *både* konstruktor och object initializer:

```csharp
public class Order
{
    public required int     Id       { get; init; }
    public required string  Customer { get; init; }
    public decimal          Total    { get; init; }   // inte required — defaultar till 0

    // Konstruktor som fyller required-properties
    public Order(int id, string customer, decimal total)
    {
        Id       = id;
        Customer = customer;
        Total    = total;
    }
}

// Via konstruktor — OK
var o1 = new Order(1, "Anna", 500m);

// Via object initializer — OK, required är satta
var o2 = new Order { Id = 2, Customer = "Björn" };
```

## SetsRequiredMembers — hoppa över required i konstruktor

```csharp
public class UserDto
{
    public required string Name  { get; init; }
    public required string Email { get; init; }

    // Säger åt kompilatorn: "den här konstruktorn sätter alla required-members"
    [System.Diagnostics.CodeAnalysis.SetsRequiredMembers]
    public UserDto(string name, string email)
    {
        Name  = name;
        Email = email;
    }
}

var user = new UserDto("Anna", "anna@exempel.se");   // OK — konstruktorn sätter allt
```

## required vs record vs konstruktor

| Metod | Syntax | Immutable | Flexibel init |
|-------|--------|-----------|---------------|
| Konstruktor med parametrar | `new Klass(a, b)` | Ja (med `readonly`) | Nej |
| Record (positional) | `record Dto(int A, string B)` | Ja (`init`) | Nej |
| `required` + `init` | Object initializer | Ja (`init`) | Ja |
| `required` + `set` | Object initializer | Nej | Ja |

Records är kortare men kräver positionellt syntax. `required` passar bättre när du vill ha object-initializer-syntax men ändå garantera att inget obligatoriskt fält saknas.

## TL;DR

```csharp
public class Config
{
    public required string Host     { get; init; }
    public required int    Port     { get; init; }
    public string?         Password { get; set; }   // valfri
}

// Kompileringsfel om Host eller Port saknas
var cfg = new Config { Host = "localhost", Port = 5432 };
```

`required` är "konstruktor-kontrakt utan konstruktor" — du får flexibiliteten av object initializers men säkerheten av obligatoriska parametrar.
