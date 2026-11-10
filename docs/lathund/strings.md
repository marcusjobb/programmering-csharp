---
title: "Lathund: strängar (string)"
description: "Strängar i C#: sammanfogning, längd, sökning, utskärning, ersättning och delning, samt de vanligaste misstagen."
parent: Lathund
nav_order: 25
---
# Lathund: strängar (string)

`string` är en följd av tecken, till exempel namn, meddelanden och rader i en fil. Strängar är oföränderliga: metoderna ändrar inte originalet utan returnerar en ny sträng.

Läs mer: [Variabler](../variables/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Fullt namn | `System.String` |
| Oföränderlig | Ja. En ändring skapar en ny sträng |
| Tom sträng | `""` |
| Standardvärde | `null` |
| Antal tecken | `.Length` |

```csharp
string namn = "Emma";
Console.WriteLine(namn.Length);    // 4
```

## Grundläggande operationer

| Operation | Beskrivning | Exempel | Resultat |
|-----------|-------------|---------|----------|
| `string.Concat(a, b)` | Sammanfogar strängar | `string.Concat("Hej", " ", "världen!")` | `Hej världen!` |
| `+` | Sammanfogar strängar | `"Hej " + "världen!"` | `Hej världen!` |
| `$"..."` | Interpolerad sträng, sätter in värden | `$"Hej {namn}!"` | `Hej Emma!` |
| `.Length` | Antal tecken | `"C# är kul".Length` | `9` |
| `.Trim()` | Tar bort mellanslag i början och slutet | `"   Text   ".Trim()` | `Text` |
| `.ToUpper()` | Gör om till versaler | `"hej".ToUpper()` | `HEJ` |
| `.ToLower()` | Gör om till gemener | `"HELLO".ToLower()` | `hello` |
| `string.IsNullOrEmpty(s)` | Sant om `s` är `null` eller `""` | `string.IsNullOrEmpty("Hej")` | `false` |

```csharp
string hälsning = $"Hej {namn}!";     // "Hej Emma!"
```

## Sökning och utskärning

| Metod | Beskrivning | Exempel | Resultat |
|-------|-------------|---------|----------|
| `.Contains("kul")` | Innehåller delsträngen | `"C# är kul".Contains("kul")` | `true` |
| `.Contains("Kul")` | Samma, men med stor bokstav | `"C# är kul".Contains("Kul")` | `false` |
| `.IndexOf("är")` | Index för första förekomsten, `-1` om den saknas | `"C# är kul".IndexOf("är")` | `3` |
| `.Substring(3, 2)` | Tar ut 2 tecken från index 3 | `"C# är kul".Substring(3, 2)` | `är` |
| `.Substring(6, 3)` | Tar ut 3 tecken från index 6 | `"C# är kul".Substring(6, 3)` | `kul` |

Indexen börjar på `0`. Tecknet `C` har index 0, `#` har index 1, och så vidare.

Vill du söka utan att skilja på stora och små bokstäver:

```csharp
bool hittad = "C# är kul".Contains("Kul", StringComparison.OrdinalIgnoreCase);   // true
int index = "C# är kul".IndexOf("Kul", StringComparison.OrdinalIgnoreCase);      // 6
```

## Ersättning och delning

| Metod | Beskrivning | Exempel | Resultat |
|-------|-------------|---------|----------|
| `.Replace("Emma", "vän")` | Ersätter alla förekomster | `"Hej Emma".Replace("Emma", "vän")` | `Hej vän` |
| `.Split(',')` | Delar strängen vid tecknet | `"äpple,banan,päron".Split(',')` | `["äpple", "banan", "päron"]` |

Mellanslag efter kommatecknen följer med in i delarna:

```csharp
string rad = "äpple, banan, päron";

string[] frukter = rad.Split(',');
// ["äpple", " banan", " päron"]

string[] städade = rad.Split(',', StringSplitOptions.TrimEntries);
// ["äpple", "banan", "päron"]
```

`StringSplitOptions.RemoveEmptyEntries` tar bort tomma delar, som i `"äpple,,päron"`. Det tar inte bort mellanslag. Använd `TrimEntries` för det.

## Vanliga misstag

- **Anta att strängen ändras.** `namn.ToUpper();` gör ingenting, eftersom resultatet kastas. Skriv `namn = namn.ToUpper();`.
- **Fallkänslig sökning.** `Contains`, `IndexOf` och `Replace` skiljer på stora och små bokstäver. `"kul"` och `"Kul"` är olika för dem.
- **`null` och metoder.** `namn.Length` med `namn` satt till `null` kastar `NullReferenceException`. Kontrollera först med `string.IsNullOrEmpty(namn)`.
- **Utanför strängen.** `Substring` kastar `ArgumentOutOfRangeException` om index eller längd ligger utanför strängen.
- **Mellanslag i delarna.** `Split(',')` lämnar mellanslag kvar. Använd `StringSplitOptions.TrimEntries`.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Oföränderlig** | Ett värde som inte kan ändras efter att det skapats |
| **Delsträng** | En del av en större sträng |
| **Index** | Platsen för ett tecken, där den första platsen är `0` |
| **Fallkänslig** | Att stora och små bokstäver ger olika resultat |
| **Sammanfogning** | Att slå ihop strängar till en ny sträng (konkatenering) |
| **Interpolation** | Att sätta in värden i en sträng med `$"..."` |
