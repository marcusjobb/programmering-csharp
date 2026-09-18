---
title: Stränghantering
description: "Stränghantering i Variabler — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
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
string hälsning  = "Hej världen";
string namn      = "Marcus";

// Konkatenering
string meddelande = hälsning + ", " + namn + "!";
Console.WriteLine(meddelande);

// Interpolation — föredras i modern C#
string modern = $"{hälsning}, {namn}!";
Console.WriteLine(modern);
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
string mening = "katten satt på mattan";

// Ersätt
string ny = mening.Replace("katten", "hunden");
Console.WriteLine(ny);    // hunden satt på mattan

// Dela upp
string csv  = "Anna,Björn,Clara";
string[] delar = csv.Split(',');

foreach (var del in delar)
    Console.WriteLine(del);
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

## TL;DR

Strängar är immutabla — metoder returnerar alltid en ny sträng. Använd interpolation `$""` istället för `+` för läsbara strängar. Använd `StringBuilder` om du sätter ihop många strängar i en loop.
