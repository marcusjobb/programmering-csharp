---
title: Statiska klasser och metoder
description: "Statiska klasser och metoder i Objektorienterad programmering (OOP) — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Objektorienterad programmering (OOP)
nav_order: 35
---
# Statiska klasser och metoder

En statisk klass eller metod tillhör **typen** — inte ett enskilt objekt. Du behöver inte skapa ett objekt för att använda den.

## När du läst detta ska du kunna

- Förklara skillnaden mellan instansmetod och statisk metod
- Skriva och anropa statiska metoder
- Skapa en statisk klass
- Förklara när statiska klasser passar (och när de inte gör det)

## Statisk metod

Lägg till `static` på en metod för att göra den tillgänglig direkt via klassnamnet.

```csharp
public class Matte
{
    public static double Kvadrat(double tal) => tal * tal;
    public static double Absolutvärde(double tal) => tal < 0 ? -tal : tal;
}

// Anropas via klassnamnet — inget objekt behövs
Console.WriteLine(Matte.Kvadrat(5));           // 25
Console.WriteLine(Matte.Absolutvärde(-7.3));   // 7,3
```

### Output

```
25
7,3
```

## Statisk klass

En klass märkt `static` kan inte instansieras alls — alla medlemmar måste vara statiska.

```csharp
public static class Textverktyg
{
    public static string Versaler(string text) => text.ToUpper();
    public static string Gemener(string text)  => text.ToLower();
    public static bool   ÄrPalindrom(string text)
    {
        var ren = text.Replace(" ", "").ToLower();
        return ren == new string(ren.Reverse().ToArray());
    }
}

Console.WriteLine(Textverktyg.Versaler("hej"));        // HEJ
Console.WriteLine(Textverktyg.Gemener("HELLO"));       // hello
Console.WriteLine(Textverktyg.ÄrPalindrom("Anna"));   // True
```

### Output

```
HEJ
hello
True
```

## Statisk vs instansmetod

```csharp
public class Räknare
{
    private int _antal = 0;

    // Instansmetod — beror på objektets tillstånd
    public void Öka()    => _antal++;
    public int  Värde()  => _antal;

    // Statisk metod — tillståndslös, beror bara på argumenten
    public static int Summera(int a, int b) => a + b;
}

var r = new Räknare();
r.Öka();
r.Öka();
Console.WriteLine(r.Värde());          // 2
Console.WriteLine(Räknare.Summera(3, 4));  // 7
```

## När är statisk ett bra val?

Statiska klasser och metoder passar när:
- Metoden är **tillståndslös** — resultatet beror bara på argumenten
- Det handlar om **hjälpfunktioner** som `Math`, `Convert`, `File`
- Du vill ha en **fabriksmetod** som skapar objekt

Undvik statiska metoder när:
- Du behöver testa dem i isolering (de är svåra att mocka)
- Metoden beror på tillstånd som bör kapslas in i ett objekt
- Du riskerar globalt delat tillstånd (race conditions i flertrådade program)

## Inbyggda statiska klasser i .NET

| Klass | Exempel |
|-------|---------|
| `Math` | `Math.Sqrt(16)`, `Math.Max(3, 7)` |
| `Console` | `Console.WriteLine(...)` |
| `File` | `File.ReadAllText("fil.txt")` |
| `Path` | `Path.Combine("mapp", "fil.txt")` |
| `Convert` | `Convert.ToInt32("42")` |
| `Enumerable` (LINQ) | `Enumerable.Range(1, 10)` |

## TL;DR

- `static` på en metod = anropas via klassnamn, inget objekt behövs
- `static` på en klass = kan aldrig instansieras, alla metoder måste vara statiska
- Passar för tillståndslösa hjälpmetoder
- Undvik statiskt tillstånd (statiska fält som ändras) — det orsakar svårbuggar
