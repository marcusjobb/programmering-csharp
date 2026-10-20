---
title: Stränghantering
description: "Strängar i C# är objekt av typen string (alias för System.String). De är immutabla — du kan inte ändra en sträng, bara skapa en ny. Klassen har dock…"
parent: Variabler
nav_order: 40
---
# Stränghantering

Strängar i C# är objekt av typen `string` (alias för `System.String`). De är **immutabla** — du kan inte ändra en sträng, bara skapa en ny. Klassen har dock massor av inbyggda metoder för att arbeta med text.

## När du läst detta ska du kunna

- Använda vanliga strängmetoder: `Length`, `ToUpper`, `ToLower`, `Trim`, `Replace`, `Contains`, `StartsWith`, `Split`, `Substring`
- Konkatenera strängar med `+`, `$""` och `string.Concat`
- Använda `string.IsNullOrEmpty` och `string.IsNullOrWhiteSpace`
- Förstå vad immutabilitet betyder i praktiken

## Skapa strängar

```csharp
string greeting  = "Hej världen";
string name      = "Marcus";

// Konkatenering
string message = greeting + ", " + name + "!";
Console.WriteLine(message);

// Interpolation — föredras i modern C#
string interpolated = $"{greeting}, {name}!";
Console.WriteLine(interpolated);
```

### Output

```
Hej världen, Marcus!
Hej världen, Marcus!
```

## Vanliga strängmetoder

```csharp
string text = "  Hej Världen  ";

Console.WriteLine(text.Length);            // 15
Console.WriteLine(text.Trim());            // "Hej Världen"
Console.WriteLine(text.ToUpper());         // "  HEJ VÄRLDEN  "
Console.WriteLine(text.ToLower());         // "  hej världen  "
Console.WriteLine(text.Trim().Length);     // 11
```

### Output

```
15
Hej Världen
  HEJ VÄRLDEN  
  hej världen  
11
```

## Söka i strängar

```csharp
string text = "C# är ett roligt språk";

Console.WriteLine(text.Contains("roligt"));       // True
Console.WriteLine(text.StartsWith("C#"));         // True
Console.WriteLine(text.EndsWith("Java"));         // False
Console.WriteLine(text.IndexOf("ett"));           // 6
```

## Ersätta och dela

```csharp
string sentence = "katten satt på mattan";

// Ersätt
string replaced = sentence.Replace("katten", "hunden");
Console.WriteLine(replaced);    // hunden satt på mattan

// Dela upp
string csv  = "Anna,Björn,Clara";
string[] parts = csv.Split(',');

foreach (var part in parts)
    Console.WriteLine(part);
```

### Output

```
hunden satt på mattan
Anna
Björn
Clara
```

## Plocka ut delar

```csharp
string text = "Hej världen";

// Substring(startIndex)
Console.WriteLine(text.Substring(4));       // världen

// Substring(startIndex, length)
Console.WriteLine(text.Substring(4, 3));    // vär

// Range-syntax (C# 8) — samma sak
Console.WriteLine(text[4..]);              // världen
Console.WriteLine(text[4..7]);             // vär
```

## Kontrollera tomma strängar

```csharp
string a = "";
string b = "   ";
string c = null;

Console.WriteLine(string.IsNullOrEmpty(a));          // True
Console.WriteLine(string.IsNullOrEmpty(b));          // False — innehåller mellanslag
Console.WriteLine(string.IsNullOrWhiteSpace(b));     // True — bara whitespace
Console.WriteLine(string.IsNullOrEmpty(c));          // True
```

## StringBuilder — för många sammanslagningar

`string` är immutabel, så varje `+` skapar ett nytt objekt. Vid hundratals sammanslagningar i en loop är `StringBuilder` mer effektivt:

```csharp
var sb = new System.Text.StringBuilder();

for (int i = 1; i <= 5; i++)
{
    sb.Append($"Rad {i}\n");
}

Console.Write(sb.ToString());
```

### Output

```
Rad 1
Rad 2
Rad 3
Rad 4
Rad 5
```

## Vanliga metoder — snabbreferens

| Metod | Vad den gör |
|-------|-------------|
| `.Length` | Antal tecken |
| `.Trim()` / `.TrimStart()` / `.TrimEnd()` | Ta bort whitespace |
| `.ToUpper()` / `.ToLower()` | Ändra skiftläge |
| `.Contains(s)` | Finns delsträngen? |
| `.StartsWith(s)` / `.EndsWith(s)` | Börjar/slutar med? |
| `.IndexOf(s)` | Positionen för första förekomsten (−1 om inte hittad) |
| `.Replace(old, new)` | Ersätt alla förekomster |
| `.Split(char)` | Dela upp till array |
| `.Substring(start)` | Del från position |
| `string.IsNullOrEmpty(s)` | Null eller tom? |
| `string.IsNullOrWhiteSpace(s)` | Null, tom eller bara mellanslag? |

## Escape-sekvenser

Escape-sekvenser skrivs med `\` inuti en sträng och representerar specialtecken:

| Sekvens | Tecken | Användning |
|---------|--------|-----------|
| `\n` | Radbrytning | Ny rad |
| `\t` | Tabb | Indragning |
| `\r` | Vagnretur | Windows radslut (ofta `\r\n`) |
| `\\` | Backslash | Filsökvägar |
| `\"` | Citattecken | Inuti en `""`-sträng |
| `\0` | Null-tecken | Strängavslutning i C/C++ |
| `\e` | ESC (ASCII 27) | ANSI-terminalkoder |

### \e — ESC-tecknet och ANSI-färger

`\e` är ett ESC-tecken som används för att styra terminalen — till exempel för att färga text. Utan `\e` behövde man skriva `\x1b` eller `\u001b`:

```csharp
// Färgad terminalutskrift med \e
Console.WriteLine("\e[32mGrön text\e[0m");       // grön
Console.WriteLine("\e[31mRöd text\e[0m");         // röd
Console.WriteLine("\e[1mFet text\e[0m");          // fet
Console.WriteLine("\e[33m\e[1mGul och fet\e[0m"); // kombinerat
```

ANSI-koder har formen `\e[<kod>m`. `\e[0m` återställer till standardfärg.

```csharp
// Hjälpmetod för färgade meddelanden
static string Green(string text) => $"\e[32m{text}\e[0m";
static string Red(string text)   => $"\e[31m{text}\e[0m";
static string Bold(string text)  => $"\e[1m{text}\e[0m";

Console.WriteLine(Green("✓ Testet passerade"));
Console.WriteLine(Red("✗ Testet misslyckades"));
Console.WriteLine(Bold("Viktig information"));
```

> ANSI-koder fungerar i moderna terminaler (Windows Terminal, VS Code, macOS Terminal). Den gamla cmd.exe i Windows kan bete sig annorlunda.

## TL;DR

Strängar är immutabla — metoder returnerar alltid en ny sträng. Använd interpolation `$""` istället för `+` för läsbara strängar. Använd `StringBuilder` om du sätter ihop många strängar i en loop.
