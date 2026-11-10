---
title: "Lathund: heltal (int)"
description: "Heltal i C# i lathundsform: intervall, omvandling från och till text, aritmetik, jämförelser och de vanligaste misstagen."
parent: Lathund
nav_order: 21
---
# Lathund: heltal (int)

`int` är ett 32-bitars heltal med tecken. Det är den vanligaste typen för antal, index och räknare.

Läs mer: [Variabler](../variables/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Storlek | 32 bitar (4 byte) |
| Lägsta värde | `int.MinValue` = -2 147 483 648 |
| Högsta värde | `int.MaxValue` = 2 147 483 647 |
| Standardvärde | 0 |

```csharp
int antal = 42;
Console.WriteLine(int.MaxValue); // 2147483647
```

## Omvandling

```csharp
// Text till heltal
int tal = int.Parse("42");               // kastar FormatException om texten är ogiltig

// Säkrare: returnerar false i stället för att kasta undantag
if (int.TryParse("42", out int resultat))
{
    Console.WriteLine(resultat);         // 42
}

// Heltal till text
string text = 42.ToString();             // "42"
```

| Metod | Vid ogiltig text | Användning |
|-------|------------------|------------|
| `int.Parse` | Kastar `FormatException` | När du vet att texten är giltig |
| `int.TryParse` | Returnerar `false` | När texten kommer från användaren |

## Aritmetik

| Operator | Betydelse | Exempel | Resultat |
|----------|-----------|---------|----------|
| `+` | Addition | `5 + 2` | `7` |
| `-` | Subtraktion | `5 - 2` | `3` |
| `*` | Multiplikation | `5 * 2` | `10` |
| `/` | Heltalsdivision | `5 / 2` | `2` |
| `%` | Rest vid division | `5 % 2` | `1` |

Division mellan två `int` ger alltid ett `int`. Decimalerna kastas bort, inte avrundas.

```csharp
double resultat = 5 / 2;        // 2, inte 2,5. Division sker innan tilldelningen
double riktigt = 5 / 2.0;       // 2,5. Ett av talen är double
```

## Jämförelser

| Operator | Betydelse | Exempel | Resultat |
|----------|-----------|---------|----------|
| `==` | Lika med | `5 == 2` | `false` |
| `!=` | Inte lika med | `5 != 2` | `true` |
| `>` | Större än | `5 > 2` | `true` |
| `<` | Mindre än | `5 < 2` | `false` |
| `>=` | Större än eller lika med | `5 >= 2` | `true` |
| `<=` | Mindre än eller lika med | `5 <= 2` | `false` |

Jämförelser returnerar `bool` och används i `if`, `while` och liknande.

## Vanliga misstag

- **Division med noll** kastar `DivideByZeroException`. Kontrollera nämnaren först.
- **Heltalsdivision** ger oväntade resultat när du väntar dig decimaler. Använd `double` om du behöver dem.
- **Överflöde** sker tyst. `int.MaxValue + 1` blir `int.MinValue`. Använd `checked` om du vill få ett undantag i stället.
- **`int.Parse` på användarinmatning** kastar undantag vid fel. Använd `TryParse`.

```csharp
int max = int.MaxValue;
int overflow = max + 1;              // -2147483648, inget undantag

checked
{
    int fel = max + 1;               // OverflowException
}
```

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Heltalsdivision** | Division där resultatet kortas av till ett heltal |
| **Modulus** | Resten vid heltalsdivision. Skrivs `%` |
| **Överflöde** (overflow) | Ett värde som blir för stort för typen och går runt |
| **Parse** | Tolka en text och göra om den till ett värde |
