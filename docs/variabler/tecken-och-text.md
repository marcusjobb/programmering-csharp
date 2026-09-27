---
title: Tecken och text
description: "char lagrar exakt ett tecken. string lagrar en sekvens av dem — och är, till skillnad från alla andra grundtyper i detta kapitel, en referenstyp."
parent: Variabler
nav_order: 14
---
# Tecken och text

## char — exakt ett tecken

`char` lagrar ett enda Unicode-tecken, i enkla citattecken:

```csharp
char bokstav = 'A';
char siffra = '7';
char tecken = '!';
char emoji = '😀';   // Unicode täcker mer än bara det latinska alfabetet
```

`char` är en värdetyp precis som `int` eller `bool` — 2 byte, alltid exakt ett tecken. Blandar du ihop enkla citattecken (`'A'`, för `char`) och dubbla citattecken (`"A"`, för `string` med ett tecken i sig) får du ett kompileringsfel, inte ett körfel — kompilatorn ser skillnaden direkt.

```csharp
char ok = 'A';        // char — enkla citattecken
string också_ok = "A"; // string med ett tecken — dubbla citattecken
// char fel = "A";     // Kompileringsfel — "A" är en string, inte en char
```

### Räkna med tecken

Ett `char` är internt ett tal — dess Unicode-kodpunkt. Det gör att du kan jämföra och räkna med tecken:

```csharp
char c = 'A';
Console.WriteLine((int)c);        // 65 — 'A':s plats i Unicode-tabellen

char nästa = (char)(c + 1);
Console.WriteLine(nästa);         // 'B'

bool ärSiffra = char.IsDigit('7'); // True
bool ärBokstav = char.IsLetter('A'); // True
```

## string — en sekvens av tecken

`string` är, till skillnad från alla typer hittills i detta kapitel, en **referenstyp** — den lagras på heapen, inte på stacken (se [Garbage Collector](../oop/garbage-collector.md) för skillnaden). I praktiken märker du sällan av det: du använder `string` precis som en värdetyp, med ett undantag.

```csharp
string namn = "Ada Lovelace";
int längd = namn.Length;              // 12
string versaler = namn.ToUpper();     // "ADA LOVELACE"
bool innehåller = namn.Contains("Ada"); // True
char förstaBokstaven = namn[0];        // 'A' — indexering ger dig ett char
```

### Strängar är oföränderliga (immutable)

Varje metod som "ändrar" en sträng skapar egentligen en **helt ny** sträng — originalet rörs aldrig:

```csharp
string original = "hej";
string versal = original.ToUpper();

Console.WriteLine(original);   // "hej" — orörd
Console.WriteLine(versal);     // "HEJ" — en ny sträng
```

Det är samma idé som [immutability hos records](../oop/records.md) — bara att `string` haft den egenskapen i C# sedan språket föddes. Bygger du en sträng i en loop med `+=` skapas en ny sträng för *varje* varv, vilket blir kostsamt vid många iterationer — se [StringBuilder](stringbuilder.md) för lösningen.

### Jämföra strängar

```csharp
string a = "Anna";
string b = "anna";

Console.WriteLine(a == b);                                    // False — skiftlägeskänsligt som standard
Console.WriteLine(a.Equals(b, StringComparison.OrdinalIgnoreCase)); // True
```

`==` på strängar jämför innehållet (till skillnad från `==` på vanliga referenstyper, som jämför identitet) — men skiftlägeskänsligt. Vill du bortse från stora/små bokstäver, ange det explicit med `StringComparison`.

## char eller string?

| Situation | Typ |
|---|---|
| Exakt ett tecken, du vill räkna eller jämföra tecken-för-tecken | `char` |
| Text av valfri längd — namn, meningar, hela dokument | `string` |
| Ett tecken som råkar representera text ("A" som svar i ett quiz) | Ofta `string` ändå — enklare att jobba med i UI och jämförelser |

## Obligatorisk dad-joke

Varför var `char` så avslappnad på fest?

Den behövde bara hålla reda på en sak i taget.
