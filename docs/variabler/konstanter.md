---
title: Konstanter
description: "Konstanter i Variabler — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Variabler
nav_order: 20
---
# Konstanter

En konstant är ett värde som aldrig ändras under programmets körning. I C# finns två nyckelord för detta: `const` och `readonly`.

## När du läst detta ska du kunna

- Förklara skillnaden mellan `const` och `readonly`
- Använda `const` för kompileringstidskonstanter
- Använda `readonly` för körtidskonstanter
- Välja rätt nyckelord i rätt situation

## const — känd vid kompilering

`const` används när värdet är känt redan när koden kompileras. Det måste tilldelas direkt vid deklarationen och kan aldrig ändras.

```csharp
const double Pi        = 3.14159265358979;
const int    MaxScore  = 100;
const string Version   = "1.0.0";

Console.WriteLine($"Pi = {Pi}");
Console.WriteLine($"Max poäng: {MaxScore}");
```

### Output

```
Pi = 3.14159265358979
Max poäng: 100
```

`const` är implicit `static` — den tillhör klassen, inte ett objekt.

Apropå Pi, om du vill memorisera siffrorna kolla den här [videon](https://www.youtube.com/watch?v=XanjZw5hPvE).

## readonly — sätts en gång vid körning

`readonly` används när värdet inte är känt vid kompilering — till exempel ett värde som läses från en fil, databas eller beräknas i konstruktorn. Det kan bara tilldelas i deklarationen eller i konstruktorn.

```csharp
public class Configuration
{
    public readonly string ConnectionString;
    public readonly DateTime StartTime;

    public Configuration(string connectionString)
    {
        ConnectionString = connectionString;
        StartTime          = DateTime.Now;
    }
}

var config = new Konfiguration("Server=localhost;Database=Min");
Console.WriteLine(config.StartTid);
```

### Output

```
2026-09-16 09:23:11
```

## const vs readonly

| | `const` | `readonly` |
|--|---------|-----------|
| Värdet känt | Vid kompilering | Kan sättas i konstruktor |
| Kan ändras | Aldrig | Aldrig (efter konstruktorn) |
| Implicit static | Ja | Nej |
| Tillåtna typer | Primitiver, string, enum | Alla typer |
| Prestanda | Lite snabbare (inlined) | Normal |

## Konvention — namngivning

Konstanter skrivs ofta med PascalCase i C# (inte SCREAMING_SNAKE_CASE som i Java/C):

```csharp
const int MaxCount = 50;       // C#-stil
const int MAX_COUNT = 50;      // Java-stil — undvik i C#
```

## Vad är `final`?

`final` finns inte i C#. Det är ett nyckelord från Java och finns i många andra språk. I C# ersätts det av:

| Java | C# |
|------|----|
| `final` fält | `readonly` |
| `final` klass (kan inte ärvas) | `sealed class` |
| `final` metod (kan inte overridas) | `sealed override` |

Om du läser Java-kod eller dokumentation och ser `final` — tänk `readonly` för fält, `sealed` för klasser och metoder.

## TL;DR

`const` = känt vid kompilering, kan aldrig ändras.  
`readonly` = sätts i konstruktorn, kan aldrig ändras efter det.  
`final` finns inte i C# — använd `readonly` (fält) eller `sealed` (klass/metod).  
Använd `const` för matematiska konstanter och fasta konfigurationsvärden. Använd `readonly` när värdet beror på körtid.
