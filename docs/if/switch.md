---
title: Switch
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: If
nav_order: 35
---
# Switch

`switch` jämför ett värde mot flera möjliga fall. Det är ett renare alternativ till långa kedjor av `if / else if` när du testar samma variabel mot fasta värden.

## När du läst detta ska du kunna

- Skriva en `switch`-sats med `case` och `default`
- Använda `switch expression` (C# 8) för kortare syntax
- Välja mellan `switch` och `if/else`

## Switch-sats — klassisk syntax

```csharp
int dag = 3;

switch (dag)
{
    case 1:
        Console.WriteLine("Måndag");
        break;
    case 2:
        Console.WriteLine("Tisdag");
        break;
    case 3:
        Console.WriteLine("Onsdag");
        break;
    default:
        Console.WriteLine("Okänd dag");
        break;
}
```

### Output

```
Onsdag
```

- `case` matchar ett specifikt värde
- `break` avslutar det aktuella fallet — utan det faller koden igenom till nästa case
- `default` körs om inget case matchade (som `else`)

## Flera case — samma kod

Du kan stapla case-etiketter om de ska göra samma sak.

```csharp
int dag = 6;

switch (dag)
{
    case 6:
    case 7:
        Console.WriteLine("Helg");
        break;
    default:
        Console.WriteLine("Vardag");
        break;
}
```

### Output

```
Helg
```

## Switch expression — C# 8 ✨

Switch expression är en kortare variant som returnerar ett värde direkt. Används ofta med tilldelning.

```csharp
// Gammalt sätt
string dagnamn;
switch (dag)
{
    case 1: dagnamn = "Måndag"; break;
    case 2: dagnamn = "Tisdag"; break;
    default: dagnamn = "Okänd"; break;
}

// ✨ C# 8 — switch expression
string dagnamn = dag switch
{
    1 => "Måndag",
    2 => "Tisdag",
    3 => "Onsdag",
    4 => "Torsdag",
    5 => "Fredag",
    _ => "Helg eller okänd"
};

Console.WriteLine(dagnamn);
```

### Output

```
Onsdag
```

`_` är discard-mönstret — matchar allt (som `default`).

## Switch med string

`switch` fungerar på strängar, heltal, char, enum och mer.

```csharp
string färg = "röd";

string hex = färg switch
{
    "röd"  => "#FF0000",
    "grön" => "#00FF00",
    "blå"  => "#0000FF",
    _      => "#000000"
};

Console.WriteLine(hex);
```

### Output

```
#FF0000
```

## Switch vs if/else — när väljer du vad?

| Situation | Använd |
|-----------|--------|
| Samma variabel mot fasta värden | `switch` |
| Komplexa villkor (`&&`, `||`, ranges) | `if/else` |
| Tilldela ett värde beroende på ett uttryck | Switch expression |
| Bara 2–3 fall | `if/else` är ofta enklare |

> **✨ C# 8 — switch expression:** Kortare och mer läsbar än klassisk switch. Returnerar ett värde direkt — perfekt för tilldelning och returvärden.

## TL;DR

`switch` matchar ett värde mot flera `case`. Switch expression (C# 8) är en kortare variant som returnerar ett värde. Bättre än långa `if/else if`-kedjor när du testar en och samma variabel.
