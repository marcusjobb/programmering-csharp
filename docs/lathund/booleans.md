---
title: "Lathund: sant eller falskt (bool)"
description: "Typen bool i C#: värden, jämförelser, logiska operatorer, kortslutning och de vanligaste misstagen."
parent: Lathund
nav_order: 24
---
# Lathund: sant eller falskt (bool)

`bool` har bara två värden, `true` och `false`. Den används för villkor i `if`, `while` och liknande.

Läs mer: [Variabler](../variables/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Värden | `true` och `false` (alltid gemener) |
| Standardvärde | `false` |
| Storlek | 1 byte |
| Fullt namn | `System.Boolean` |

```csharp
bool ärSant = true;
bool ärFalskt = false;
bool jämförelse = 5 > 2;      // true. Jämförelser ger alltid en bool
```

## Jämförelser med bool

| Operator | Betydelse | Exempel | Resultat |
|----------|-----------|---------|----------|
| `==` | Lika med | `true == true` | `true` |
| `!=` | Inte lika med | `true != false` | `true` |

## Logiska operatorer

| Operator | Betydelse | Exempel | Resultat |
|----------|-----------|---------|----------|
| `!` | Negation (inte) | `!true` | `false` |
| `&&` | OCH. Båda måste vara `true` | `true && false` | `false` |
| `\|\|` | ELLER. Minst en måste vara `true` | `true \|\| false` | `true` |

`&&` och `||` är kortslutna. Om vänstra sidan redan avgör resultatet körs inte den högra:

```csharp
int antal = 0;
if (antal != 0 && 10 / antal > 2)    // Högra sidan körs inte när antal är 0
    Console.WriteLine("Stort");
```

## Bitvisa operatorer

Bitvisa operatorer arbetar på bitarna i heltal. De används sällan för villkor.

| Operator | Betydelse | Exempel | Resultat |
|----------|-----------|---------|----------|
| `&` | Bitvis OCH | `5 & 3` | `1` |
| `\|` | Bitvis ELLER | `5 \| 3` | `7` |
| `^` | Bitvis XOR (exklusivt ELLER) | `5 ^ 3` | `6` |
| `~` | Bitvis INTE | `~5` | `-6` |

## Vanliga misstag

- **`=` i stället för `==`.** `if (sant = true)` tilldelar och jämför inte. C# ger inget kompileringsfel här. Skriv `if (sant)` eller `if (sant == true)`.
- **`&` och `|` på bool kortsluts inte.** Båda sidor körs, så `if (antal != 0 & 10 / antal > 2)` kastar `DivideByZeroException` när `antal` är `0`. Använd `&&` och `||` för villkor.
- **Negation av ett helt uttryck.** `!(a && b)` är inte samma sak som `!a && !b`. Skriv parenteserna tydligt.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Villkor** | Ett uttryck som blir `true` eller `false` och styr en `if` eller `while` |
| **Logisk operator** | En operator som kombinerar bool-värden, som `&&` och `\|\|` |
| **Kortslutning** | Att den högra sidan hoppas över när resultatet redan är klart |
| **Bitvis operator** | En operator som arbetar på bitarna i ett heltal |
| **Negation** | Att vända ett bool-värde med `!` |
