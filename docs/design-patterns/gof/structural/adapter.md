---
title: Adapter
description: "Du har en klass med ett gränssnitt din kod förväntar sig (ITarget), och en annan klass som gör det du behöver men med ett helt annat gränssnitt (Adaptee)…"
parent: "Strukturmönster (Structural)"
nav_order: 10
---

# Adapter

## Problemet

Du har en klass med ett gränssnitt din kod förväntar sig (`ITarget`), och en annan klass som gör det du behöver men med ett helt annat gränssnitt (`Adaptee`) — t.ex. ett tredjepartsbibliotek du inte kan ändra.

## Lösningen

```csharp
// Gränssnittet din kod förväntar sig
public interface ITarget
{
    void Request();
}

// Den befintliga klassen — inkompatibelt gränssnitt, går inte att ändra
public class Adaptee
{
    public void SpecificRequest() => Console.WriteLine("Specifik begäran hanterad");
}

// Adaptern — översätter mellan de två
public class Adapter : ITarget
{
    private readonly Adaptee _adaptee;
    public Adapter(Adaptee adaptee) => _adaptee = adaptee;

    public void Request() => _adaptee.SpecificRequest();
}
```

```csharp
ITarget target = new Adapter(new Adaptee());
target.Request();   // Anropar SpecificRequest() bakom kulisserna
```

Klientkoden pratar bara med `ITarget` — den vet aldrig att `Adaptee` med sitt annorlunda gränssnitt finns bakom.

## Ett verkligt exempel — en strömadapter

Precis som en fysisk reseadapter (svenskt eluttag → amerikanskt) inte ändrar väggkontakten eller laddaren, utan bara översätter mellan dem — gör kod-adaptern samma sak mellan två API:er som inte var designade att prata med varandra.

## TL;DR

Adapter lägger ett översättande lager mellan ett gränssnitt din kod förväntar sig och en klass som redan gör jobbet men talar "fel språk" — utan att ändra någon av de två.
