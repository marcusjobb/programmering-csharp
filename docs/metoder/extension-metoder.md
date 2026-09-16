---
title: Extension-metoder
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Metoder
nav_order: 70
---
# Extension-metoder

Extension-metoder låter dig lägga till metoder på en befintlig typ — utan att ändra typen och utan arv. Det ser ut som om metoden hör till typen, men den definieras separat.

## När du läst detta ska du kunna

- Skriva en extension-metod
- Aktivera den med rätt `using`
- Förklara varför `this` är det magiska nyckelordet

## Syntax

```csharp
// Statisk klass med statisk metod
// Det första argumentet har nyckelordet this
public static class StringExtensions
{
    public static bool IsEmail(this string value)
        => value.Contains('@') && value.Contains('.');
}
```

### Användning

```csharp
string email = "anna@example.com";
Console.WriteLine(email.IsEmail());  // True
Console.WriteLine("inte-epost".IsEmail());  // False
```

Det ser ut som en vanlig instansmetod — men den är faktiskt en statisk metod i en separat klass.

## Regler

- Klassen måste vara `static`
- Metoden måste vara `static`
- Första parametern: `this TypDuUtökar namn`
- Klassen måste vara i ett tillgängligt namespace (`using`)

## Utöka inbyggda typer

Du kan lägga till metoder på typer du inte äger — `string`, `int`, `List<T>`:

```csharp
public static class IntExtensions
{
    public static bool IsEven(this int n) => n % 2 == 0;
    public static bool IsOdd(this int n)  => n % 2 != 0;

    public static string Repeat(this string s, int times)
        => string.Concat(Enumerable.Repeat(s, times));
}
```

```csharp
Console.WriteLine(4.IsEven());          // True
Console.WriteLine(7.IsOdd());           // True
Console.WriteLine("ha".Repeat(3));      // hahaha
```

## Extension-metoder på List\<T\>

```csharp
public static class ListExtensions
{
    public static void PrintAll<T>(this IEnumerable<T> items, string label = "")
    {
        if (label != "") Console.WriteLine($"{label}:");
        foreach (var item in items)
            Console.WriteLine($"  {item}");
    }

    public static T RandomItem<T>(this IList<T> items)
    {
        var rng = Random.Shared;
        return items[rng.Next(items.Count)];
    }
}
```

```csharp
var names = new List<string> { "Anna", "Björn", "Clara" };
names.PrintAll("Deltagare");

Console.WriteLine($"Slumpmässig: {names.RandomItem()}");
```

### Output

```
Deltagare:
  Anna
  Björn
  Clara
Slumpmässig: Björn
```

## LINQ är extension-metoder

Hela LINQ-biblioteket är byggt på extension-metoder på `IEnumerable<T>`:

```csharp
// Where, Select, OrderBy är alla extension-metoder
var sorted = names.Where(n => n.Length > 3)
                  .OrderBy(n => n)
                  .ToList();
```

## Namespace och using

Extension-metoderna aktiveras när du lägger till rätt `using`:

```csharp
using MyApp.Extensions;   // aktiverar alla extension-metoder i det namespacet

// Nu fungerar:
"test".IsEmail();
```

Utan `using` ser typen inte metoderna.

## Begränsningar

- Kan inte komma åt privata fält — bara publika/interna members
- Instansmetoder på typen prioriteras — din extension döljs om typen själv har en metod med samma namn och signatur
- Kan inte lägga till properties, bara metoder

## TL;DR

```csharp
// 1. Statisk klass
public static class Extensions
{
    // 2. Statisk metod med this på första parametern
    public static bool StartsWithVowel(this string s)
        => "aeiouåäö".Contains(char.ToLower(s[0]));
}

// 3. Används som vanlig metod
"Anna".StartsWithVowel(); // True
"Björn".StartsWithVowel(); // False
```

Extension-metoder är kärnan i LINQ och en av C#:s kraftfullaste konventioner.
