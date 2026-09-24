---
title: Statiska klasser och metoder
description: "En statisk klass eller metod tillhör typen — inte ett enskilt objekt. Du behöver inte skapa ett objekt för att använda den."
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
    public static double Square(double number) => number * number;
    public static double AbsoluteValue(double number) => number < 0 ? -number : number;
}

// Anropas via klassnamnet — inget objekt behövs
Console.WriteLine(Matte.Square(5));           // 25
Console.WriteLine(Matte.AbsoluteValue(-7.3));   // 7,3
```

### Output

```
25
7,3
```

## Statisk klass

En klass märkt `static` kan inte instansieras alls — alla medlemmar måste vara statiska.

```csharp
public static class TextTool
{
    public static string Uppercase(string text) => text.ToUpper();
    public static string Lowercase(string text)  => text.ToLower();
    public static bool   IsPalindrome(string text)
    {
        var clean = text.Replace(" ", "").ToLower();
        return clean == new string(clean.Reverse().ToArray());
    }
}

Console.WriteLine(TextTool.Uppercase("hej"));        // HEJ
Console.WriteLine(TextTool.Lowercase("HELLO"));       // hello
Console.WriteLine(TextTool.IsPalindrome("Anna"));   // True
```

### Output

```
HEJ
hello
True
```

## Statisk vs instansmetod

```csharp
public class Counter
{
    private int _count = 0;

    // Instansmetod — beror på objektets tillstånd
    public void Increase()    => _count++;
    public int  Value()  => _count;

    // Statisk metod — tillståndslös, beror bara på argumenten
    public static int Summarise(int a, int b) => a + b;
}

var r = new Counter();
r.Increase();
r.Increase();
Console.WriteLine(r.Value());          // 2
Console.WriteLine(Counter.Summarise(3, 4));  // 7
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
