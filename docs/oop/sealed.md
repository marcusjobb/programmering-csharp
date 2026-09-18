---
title: Sealed
description: "Sealed i Objektorienterad programmering (OOP) — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
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
sealed class Licensnyckel
{
    public string Värde { get; }

    public Licensnyckel(string värde)
    {
        Värde = värde;
    }
}

// Kompileringsfel — kan inte ärva från sealed klass
class CrackadNyckel : Licensnyckel { }
```

`string` i .NET är ett känt exempel — den är `sealed` och kan inte subklassas.

## Sealed override — låser en specifik metod

Du kan också sätta `sealed` på en enskild override-metod. Det tillåter arv av klassen, men förhindrar att just den metoden overridas längre ner i hierarkin.

```csharp
class Djur
{
    public virtual string Ljud() => "...";
}

class Hund : Djur
{
    public sealed override string Ljud() => "Voff!";  // låst här
}

class Labrador : Hund
{
    // Kompileringsfel — Ljud() är sealed i Hund
    public override string Ljud() => "Woof!";
}
```

`Labrador` kan fortfarande ärva från `Hund` och lägga till egna metoder — men just `Ljud()` är låst.

## När är sealed ett bra val?

**Säkerhet och kontroll.** Om en klass hanterar känslig logik — kryptering, licensvalidering, betalningsflöden — minskar `sealed` risken att någon råkar skriva en subklass som beter sig fel.

```csharp
sealed class BetalningsProcessor
{
    public bool Genomför(decimal belopp) { ... }
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
