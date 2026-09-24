---
title: POCO och DTO
description: "Två vanliga begrepp för \"enkla dataklasser\" som du möter ofta i C#-projekt."
parent: Objektorienterad programmering (OOP)
nav_order: 37
---
# POCO och DTO

Två vanliga begrepp för "enkla dataklasser" som du möter ofta i C#-projekt.

## När du läst detta ska du kunna

- Förklara vad POCO och DTO är
- Skriva en enkel POCO- och DTO-klass
- Skilja dem från klasser med affärslogik
- Använda records som ett modernt alternativ

## POCO — Plain Old C# Object

**POCO** (Plain Old C# Object) är en klass som inte ärver från något ramverk och inte beror på extern infrastruktur. Den innehåller bara data (properties) och eventuellt enkel logik.

Begreppet kommer från Java's POJO och används i C# för att betona att en klass är "ren" — utan ramverksberoenden.

```csharp
// POCO — en enkel klass utan koppling till databas, nätverk eller UI
public class Product
{
    public int    Id    { get; set; }
    public string Name  { get; set; }
    public double Price  { get; set; }
    public bool   AktivI lager { get; set; }
}
```

Entity Framework använder POCO-klasser för att mappa tabeller. Klassen vet ingenting om databasen — EF hanterar det åt dig.

## DTO — Data Transfer Object

**DTO** (Data Transfer Object) är ett designmönster: en klass vars enda syfte är att **flytta data** mellan lager i en applikation — t.ex. från databas till API till klient.

En DTO är:
- Enkel: bara properties, inga metoder med logik
- Anpassad: innehåller bara de fält som mottagaren behöver
- Fristående: inte kopplad till databasens modell

```csharp
// Domänklass — hela modellen i databasen
public class User
{
    public int    Id           { get; set; }
    public string UserName { get; set; }
    public string LösenordHash { get; set; }  // skickas ALDRIG till klienten
    public string Email        { get; set; }
    public DateTime SkapadDatum { get; set; }
}

// DTO — bara det klienten behöver se
public class AnvändarDto
{
    public int    Id           { get; set; }
    public string UserName { get; set; }
    public string Email        { get; set; }
}
```

## Varför använda DTO?

- **Säkerhet**: skicka aldrig känsliga fält (lösenord, interna ID:n) till klienten
- **Prestanda**: överför bara det som behövs, inte hela domänmodellen
- **Frikoppling**: API:ets svar förändras inte om du ändrar din databasmodell

## Records som POCO/DTO (C# 9) ✨

Records är ett modernt alternativ som ger dig en kortare och oföränderlig klass.

```csharp
// Gammalt sätt — klass
public class ProduktDto
{
    public int    Id   { get; init; }
    public string Name { get; init; }
    public double Price { get; init; }
}

// ✨ C# 9 — record (kortare, inbyggd equality, oföränderlig)
public record ProduktDto(int Id, string Name, double Price);

// Används på samma sätt
var p = new ProduktDto(1, "Kaffemaskin", 499.0);
Console.WriteLine(p);  // ProduktDto { Id = 1, Namn = Kaffemaskin, Pris = 499 }
```

> **✨ C# 9 — records:** En record är perfekt för DTO och POCO. Inbyggd `ToString()`, `Equals()` och `GetHashCode()` baserade på innehållet. Oföränderlig som standard med `init`-properties.

## POCO vs DTO — skillnaden

| | POCO | DTO |
|-|------|-----|
| **Syfte** | Representera ett domänobjekt | Flytta data mellan lager |
| **Logik** | Kan ha lite logik | Ingen logik |
| **Livstid** | Länge (används i hela appen) | Kort (skapas för en request/response) |
| **Källa** | Databasen, affärslagret | Domänklassen (mappas från den) |

## TL;DR

- **POCO**: en enkel klass utan ramverksberoenden — används t.ex. som Entity Framework-modell
- **DTO**: en klass som bara transporterar data — styr vad som skickas mellan lager
- Records (C# 9) är ett modernt, kortare sätt att skriva dessa klasser
