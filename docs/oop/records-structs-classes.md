---
title: "Class, struct eller record — vilken?"
description: "Du har nu läst om alla fyra — Klasser, Struct och Records — separat. Den här sidan samlar dem i en beslutstabell."
parent: Objektorienterad programmering (OOP)
nav_order: 39
---

# Class, struct eller record — vilken?

Du har nu läst om alla fyra — [Klasser](klasser.md), [Struct](struct.md) och [Records](records.md) — separat. Den här sidan samlar dem i en beslutstabell.

## De fyra alternativen

| | `class` | `struct` | `record` | `record struct` |
|---|---|---|---|---|
| Semantik | Referens | Värde | Referens | Värde |
| `==` jämför | Identitet | Innehåll | Innehåll | Innehåll |
| Kan ärvas | Ja | Nej | Ja (från annan record) | Nej |
| Kan vara `null` | Ja | Nej (utan `?`) | Ja | Nej (utan `?`) |
| Tänkt att muteras | Ja, ofta | Ja, ofta | Nej — `init`-only | Nej — `init`-only |
| `with`-stöd | Nej | Nej | Ja | Ja |
| Typisk storlek | Valfri | Liten | Valfri | Liten |

## Beslutsvägen

**Behöver typen arv, eller representerar den en identitet (ett objekt med beteende som kan ändras över tid)?** → `class`.

```csharp
public class Konto  // Har beteende, muterbart tillstånd, kan ärvas från
{
    public decimal Saldo { get; private set; }
    public void SättIn(decimal belopp) => Saldo += belopp;
}
```

**Representerar typen ett värde som ska jämföras på innehåll, och helst inte förändras efter skapandet — och behöver den kunna ärvas eller vara `null`?** → `record`.

```csharp
public record Transaktion(decimal Belopp, DateTime Tid);  // Data, jämförs på innehåll, immutable
```

**Samma som ovan, men typen är liten och du vill undvika onödiga heap-allokeringar?** → `record struct`.

```csharp
public record struct Punkt(int X, int Y);  // Litet värde, värdesemantik, immutable
```

**Ett litet, enkelt värde där mutabilitet är okej och identitet inte spelar roll — men du inte behöver `record`s extra funktioner?** → `struct`.

```csharp
struct RGB { public byte R, G, B; }  // Litet, enkelt, sällan behöver Equals/with
```

## Konkreta exempel ur den här boken

| Typ | Vad den var | Val |
|---|---|---|
| `Person` (i [Records](records.md)) | Data som jämförs på innehåll, ska inte muteras | `record` |
| `Point` (i [Struct](struct.md)) | Litet värde, kopieras billigt | `struct` eller `record struct` |
| `Konto` (i [Undantagshantering](../undantagshantering/egna-exceptions.md)) | Har beteende och muterbart tillstånd (`TaUt`) | `class` |
| `Kronor` (i [Egna datatyper](egna-datatyper.md)) | Litet numeriskt värde med aritmetik | `record struct` |

## TL;DR

`class` är standardvalet för allt med beteende eller identitet. `struct`/`record struct` för små värden som kopieras ofta. `record`/`record struct` när du vill ha värdelikhet och immutability gratis. Osäker? Börja med `class` eller `record` — optimera till `struct` bara när du faktiskt mätt att kopieringskostnaden spelar roll.
