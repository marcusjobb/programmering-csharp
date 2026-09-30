---
title: Raw string literals
description: "Raw string literals — \"\"\"...\"\"\" för multiline och JSON/HTML utan escape-tecken (C# 11) — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Variabler
nav_order: 44
---
# Raw string literals

Tre citattecken (`"""`) öppnar en raw string — en sträng som kan innehålla radbrytningar, citattecken och backslashes utan ett enda escape-tecken. Perfekt för JSON, HTML, SQL och regex som annars kräver en djungel av `\"` och `\\`.

## När du läst detta ska du kunna

- Skriva raw strings med `"""`
- Bädda in JSON, HTML och SQL utan escape-tecken
- Kombinera raw strings med stränginterpolering (`$"""..."""`)
- Kontrollera indragning med stängande `"""`

## Problemet raw strings löser

```csharp
// Gammal stil — svår att läsa
string json = "{\n  \"name\": \"Anna\",\n  \"age\": 30\n}";

// Verbatim string (@"...") — bättre, men citattecken är fortfarande jobbiga
string json = @"{
  ""name"": ""Anna"",
  ""age"": 30
}";
```

```csharp
// Raw string — exakt som du ser det
string json = """
{
  "name": "Anna",
  "age": 30
}
""";
```

## Grundregler

```csharp
// Öppna med """ på en rad, avsluta med """ på en egen rad
string text = """
Hej, världen!
Det här är en raw string.
Inga escape-tecken behövs.
""";
```

Stängande `"""` avgör indragen i outputen — allt till vänster om dem klipps bort:

```csharp
string indragning = """
    Rad 1
    Rad 2
    """;
// Resulterar i "    Rad 1\n    Rad 2\n" — 4 blanksteg kvar
```

```csharp
string ingen = """
    Rad 1
    Rad 2
""";
// Stängande """ vid kolumn 0 → 4 blanksteg i output
```

## JSON utan escape-tecken

```csharp
string json = """
{
  "user": {
    "id": 42,
    "name": "Marcus",
    "roles": ["admin", "teacher"]
  }
}
""";

Console.WriteLine(json);
```

## HTML

```csharp
string html = """
<!DOCTYPE html>
<html lang="sv">
  <head><title>Min sida</title></head>
  <body>
    <h1>Välkommen</h1>
  </body>
</html>
""";
```

## SQL

```csharp
string query = """
    SELECT u.Name, COUNT(o.Id) AS OrderCount
    FROM Users u
    LEFT JOIN Orders o ON o.UserId = u.Id
    WHERE u.IsActive = 1
    GROUP BY u.Name
    ORDER BY OrderCount DESC
    """;
```

## Interpolerade raw strings — $"""..."""

Kombinera med interpolering för dynamiska värden:

```csharp
string name = "Anna";
int    age  = 30;

string json = $"""
{
  "name": "{name}",
  "age": {age}
}
""";
```

Om du behöver en faktisk klammerparentes i outputen — dubbla dem (`{{` → `{`):

```csharp
string template = $"""
Hej {name}!
Klammerexempel: {{literal}}
""";
// → Hej Anna!
//   Klammerexempel: {literal}
```

## Citattecken inuti raw strings

Kan du ha `"""` inuti strängen? Ja — lägg till fler citattecken på öppning och stängning:

```csharp
string med3 = """"
Det här innehåller """ tre citattecken.
"""";
```

Regeln: antalet citattecken i öppnaren bestämmer hur många som krävs för att stänga.

## TL;DR

```csharp
// Raw string — ingen escaping
string json = """
{
  "name": "Marcus",
  "active": true
}
""";

// Interpolerad raw string
string greeting = $"""Hej, {name}!""";

// En rad är också OK
string sql = """SELECT * FROM Users WHERE IsActive = 1""";
```

Raw strings gör JSON, HTML, SQL och regex läsliga. Tre citattecken, och du slipper escaping helt.
