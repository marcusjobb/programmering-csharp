---
title: Regex
description: "Regex (regular expressions, reguljära uttryck) är ett mini-språk för att beskriva textmönster — \"en sträng som börjar med tre siffror, följt av ett…"
parent: Variabler
nav_order: 43
---

# Regex

Regex (regular expressions, reguljära uttryck) är ett mini-språk för att beskriva textmönster — "en sträng som börjar med tre siffror, följt av ett bindestreck" istället för att skriva det logiken för hand med `Substring` och `if`-satser.

## När du läst detta ska du kunna

- Testa om en sträng matchar ett mönster med `Regex.IsMatch`
- Plocka ut delar av en matchning med grupper
- Ersätta text som matchar ett mönster

## Grunderna

```csharp
using System.Text.RegularExpressions;

bool ärPostnummer = Regex.IsMatch("412 63", @"^\d{3}\s?\d{2}$");
Console.WriteLine(ärPostnummer);   // True
```

Använd alltid `@"..."` (verbatim string) för regex-mönster — annars måste du dubbel-escapea varje bakåtstreck (`\\d` istället för `\d`).

| Symbol | Betyder |
|---|---|
| `\d` | En siffra |
| `\w` | En bokstav, siffra eller understreck |
| `\s` | Whitespace (mellanslag, tab) |
| `.` | Vilket tecken som helst |
| `^` / `$` | Start / slut på strängen |
| `*` / `+` | Noll eller fler / en eller fler av föregående |
| `{3}` | Exakt 3 av föregående |
| `?` | Noll eller en av föregående (gör föregående valfritt) |

## Plocka ut delar — grupper

```csharp
var match = Regex.Match("2026-09-24", @"^(\d{4})-(\d{2})-(\d{2})$");

if (match.Success)
{
    Console.WriteLine(match.Groups[1].Value);  // 2026
    Console.WriteLine(match.Groups[2].Value);  // 09
    Console.WriteLine(match.Groups[3].Value);  // 24
}
```

Namngivna grupper gör koden mycket läsbarare än att räkna parenteser:

```csharp
var match = Regex.Match("2026-09-24", @"^(?<år>\d{4})-(?<månad>\d{2})-(?<dag>\d{2})$");

Console.WriteLine(match.Groups["år"].Value);      // 2026
Console.WriteLine(match.Groups["månad"].Value);   // 09
```

## Hitta alla matchningar

```csharp
var text = "Kontakta oss på info@example.com eller support@example.com";
var epostadresser = Regex.Matches(text, @"[\w.+-]+@[\w-]+\.[\w.-]+");

foreach (Match m in epostadresser)
    Console.WriteLine(m.Value);
// info@example.com
// support@example.com
```

## Ersätta text

```csharp
string maskerat = Regex.Replace("Mitt telefonnummer är 070-1234567", @"\d", "*");
Console.WriteLine(maskerat);   // Mitt telefonnummer är ***-*******
```

## Prestanda — GeneratedRegex (C# 11+)

`Regex.IsMatch(text, mönster)` tolkar mönstret vid varje anrop om du inte cachar det. För regex som körs ofta, markera metoden med `[GeneratedRegex(...)]` — kompilatorn genererar optimerad matchningskod vid kompilering istället för att tolka mönstret vid körning:

```csharp
public partial class Validering
{
    [GeneratedRegex(@"^\d{3}\s?\d{2}$")]
    private static partial Regex PostnummerRegex();
}

bool ärGiltigt = Validering.PostnummerRegex().IsMatch("412 63");
```

## TL;DR

`Regex.IsMatch` testar om text matchar ett mönster, `Regex.Match`/`Matches` plockar ut matchningar (namngivna grupper är läsbarast), `Regex.Replace` byter ut matchande text. Använd `@"..."` för mönstret, och `[GeneratedRegex]` när samma mönster körs ofta.
