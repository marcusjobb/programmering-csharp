---
title: Enum
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Variabler
nav_order: 30
---
# Enum

En enum (uppräkning) är en namngiven uppsättning av fasta heltalsvärden. Istället för att skriva magiska siffror eller strängar i koden ger enum dem meningsfulla namn.

## När du läst detta ska du kunna

- Deklarera och använda en enum
- Använda enum i switch-satser
- Förstå att enum är baserat på heltal
- Använda `[Flags]` för kombinerbara enum-värden

## Grundsyntax

```csharp
enum Veckodag
{
    Måndag,
    Tisdag,
    Onsdag,
    Torsdag,
    Fredag,
    Lördag,
    Söndag
}
```

Standardvärdet börjar på 0 och ökar med 1. `Måndag = 0`, `Tisdag = 1`, osv.

## Använda en enum

```csharp
Veckodag idag = Veckodag.Onsdag;

Console.WriteLine(idag);          // Onsdag
Console.WriteLine((int)idag);     // 2
```

### Output

```
Onsdag
2
```

## Enum i switch

Enum passar utmärkt ihop med `switch`:

```csharp
Veckodag dag = Veckodag.Lördag;

string typ = dag switch
{
    Veckodag.Lördag => "Helg",
    Veckodag.Söndag => "Helg",
    _               => "Vardag"
};

Console.WriteLine(typ);
```

### Output

```
Helg
```

## Sätta egna värden

Du kan bestämma exakta heltalsvärden:

```csharp
enum HttpStatus
{
    Ok          = 200,
    NotFound    = 404,
    ServerError = 500
}

HttpStatus svar = HttpStatus.NotFound;
Console.WriteLine((int)svar);  // 404
```

### Output

```
404
```

## Konvertera mellan int och enum

```csharp
// int → enum
Veckodag dag = (Veckodag)3;
Console.WriteLine(dag);    // Torsdag

// string → enum
Veckodag parsed = Enum.Parse<Veckodag>("Fredag");
Console.WriteLine(parsed); // Fredag
```

## [Flags] — kombinerbara värden

Med attributet `[Flags]` kan du kombinera enum-värden med `|` (bitvis eller). Varje värde måste vara en tvåpotens.

```csharp
[Flags]
enum Behörighet
{
    Ingen   = 0,
    Läsa    = 1,
    Skriva  = 2,
    Radera  = 4,
    Admin   = Läsa | Skriva | Radera
}

Behörighet roll = Behörighet.Läsa | Behörighet.Skriva;
Console.WriteLine(roll);                          // Läsa, Skriva
Console.WriteLine(roll.HasFlag(Behörighet.Läsa)); // True
Console.WriteLine(roll.HasFlag(Behörighet.Radera)); // False
```

### Output

```
Läsa, Skriva
True
False
```

## TL;DR

Enum ger namn åt fasta heltalsvärden. Bättre än magiska siffror och strängar — kompilatorn kontrollerar att du använder giltiga värden. Passar perfekt med `switch`. Använd `[Flags]` när värden kan kombineras.
