---
title: Sealed
description: "Sealed i Objektorienterad programmering (OOP) — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Objektorienterad programmering (OOP)
nav_order: 45
---
# Sealed

`sealed` är ett nyckelord som låser arv — antingen för en hel klass, eller för en specifik metod. Det är ett sätt att säga: "Designen slutar här. Inga fler ändringar neråt i arvshierarkin."

## När du läst detta ska du kunna

- Deklarera en `sealed class` som inte kan ärvas
- Använda `sealed override` för att låsa en metod i en subklass
- Förklara när `sealed` är ett bra val

## Sealed class — ingen arver vidare

En `sealed class` kan inte användas som basklass. Försöker du ärva från den får du ett kompileringsfel.

```csharp
sealed class LicenseKey
{
    public string Value { get; }

    public LicenseKey(string value)
    {
        Value = value;
    }
}

// Kompileringsfel — kan inte ärva från sealed klass
class CrackedKey : LicenseKey { }
```

`string` i .NET är ett känt exempel — den är `sealed` och kan inte subklassas.

## Sealed override — låser en specifik metod

Du kan också sätta `sealed` på en enskild override-metod. Det tillåter arv av klassen, men förhindrar att just den metoden overridas längre ner i hierarkin.

```csharp
class Animal
{
    public virtual string Sound() => "...";
}

class Dog : Animal
{
    public sealed override string Sound() => "Voff!";  // låst här
}

class Labrador : Dog
{
    // Kompileringsfel — Ljud() är sealed i Hund
    public override string Sound() => "Woof!";
}
```

`Labrador` kan fortfarande ärva från `Dog` och lägga till egna metoder — men just `Sound()` är låst.

## När är sealed ett bra val?

**Säkerhet och kontroll.** Om en klass hanterar känslig logik — kryptering, licensvalidering, betalningsflöden — minskar `sealed` risken att någon råkar skriva en subklass som beter sig fel.

```csharp
sealed class BetalningsProcessor
{
    public bool Perform(decimal amount) { ... }
}
```

**Tydlig design.** `sealed` kommunicerar till andra utvecklare: den här klassen är inte tänkt att utökas. Det är dokumentation i koden.

**Prestandatips.** Kompilatorn kan göra optimeringar för sealed klasser eftersom metodanrop inte behöver vara polymorfiska. I praktiken är skillnaden liten, men den finns.

## sealed vs abstract — olika riktningar

| | `sealed` | `abstract` |
|-|----------|------------|
| Kan instansieras | ✓ | ✗ |
| Kan ärvas | ✗ | ✓ (måste) |
| Syfte | Stäng arvshierarkin | Tvinga subklasser |

## TL;DR

`sealed class` kan inte ärvas. `sealed override` kan inte overridas i subklasser. Använd det när designen är färdig och du inte vill att någon ska ändra beteendet via arv.
