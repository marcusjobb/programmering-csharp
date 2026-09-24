---
title: Builder
description: "Ett objekt med många valfria delar blir snabbt en konstruktor med för många parametrar — svårt att läsa, lätt att kasta om argument i fel ordning av…"
parent: "Skapande mönster (Creational)"
nav_order: 30
---

# Builder

## Problemet

Ett objekt med många valfria delar blir snabbt en konstruktor med för många parametrar — svårt att läsa, lätt att kasta om argument i fel ordning av misstag.

```csharp
// Vilken parameter är vilken, utan att kolla signaturen?
var email = new Email("Peter", "Parker", "webcrawler", "us", true, false, "Hej!");
```

## Lösningen — fluent builder

```csharp
public class EmailBuilder
{
    private string _namn = "";
    private string _efternamn = "";
    private string _domän = "";
    private string _land = "";

    public EmailBuilder WithName(string namn)       { _namn = namn; return this; }
    public EmailBuilder WithLastName(string efternamn) { _efternamn = efternamn; return this; }
    public EmailBuilder WithDomain(string domän)     { _domän = domän; return this; }
    public EmailBuilder WithCountry(string land)     { _land = land; return this; }

    public string Build() => $"{_namn}.{_efternamn}@{_domän}.{_land}".ToLower();
}
```

```csharp
var email = new EmailBuilder()
    .WithName("Peter")
    .WithLastName("Parker")
    .WithDomain("webcrawler")
    .WithCountry("us")
    .Build();

Console.WriteLine(email);   // peter.parker@webcrawler.us
```

Varje `With...`-metod returnerar `this`, vilket gör att anropen kan kedjas. Ordningen spelar ingen roll, och varje del är namngiven — självdokumenterande, till skillnad från en lång parameterlista.

## Inbyggt i .NET

`StringBuilder` (se [StringBuilder](../../../variabler/stringbuilder.md)) är ett builder-mönster för strängar — bygg upp innehållet steg för steg, hämta resultatet med `.ToString()` när du är klar, istället för att skapa massor av mellanliggande strängar.

## TL;DR

Builder bryter ner konstruktionen av ett komplext objekt i namngivna, kedjebara steg — läsbarare och säkrare än en lång positionsberoende konstruktor.
