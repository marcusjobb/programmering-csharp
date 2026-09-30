---
title: Mönstermatchning
description: "Mönstermatchning (pattern matching) i C# — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: If
nav_order: 25
---
# Mönstermatchning

Mönstermatchning låter dig kontrollera typ, struktur och värden hos ett objekt i ett enda uttryck. Det ersätter långa `if/else`-kedjor med kod som läses som naturligt språk.

> Fler exempel i kontexten av arkitektur: [C# 14 och .NET 2026](https://marcusmedina.pro/sv/junior-tips/csharp-14-dotnet-2026/) på marcusmedina.pro

## När du läst detta ska du kunna

- Använda typ-mönster med `is` och `switch`
- Matcha på properties med `{ Prop: värde }`
- Kombinera mönster med `and`, `or`, `not`
- Använda relationsoperatorer (`>`, `<`, `>=`) i mönster
- Matcha listor med list patterns
- Skriva guard-satser med `when`

## Typ-mönster — `is` och switch

`is` kontrollerar om ett objekt är en viss typ och binder det till en variabel i ett steg:

```csharp
object value = 42;

if (value is int number)
    Console.WriteLine($"Heltalet är {number * 2}");   // 84

// Tidigare behövdes två rader
if (value is int)
{
    int number2 = (int)value;   // explicit cast
    Console.WriteLine(number2 * 2);
}
```

I en switch:

```csharp
static string Describe(object obj) => obj switch
{
    int n    => $"Heltal: {n}",
    double d => $"Decimaltal: {d:F2}",
    string s => $"Sträng med {s.Length} tecken",
    null     => "null",
    _        => "Okänd typ"
};

Console.WriteLine(Describe(42));       // Heltal: 42
Console.WriteLine(Describe(3.14));     // Decimaltal: 3.14
Console.WriteLine(Describe("hej"));    // Sträng med 3 tecken
```

## Property-mönster — `{ Prop: värde }`

Matcha på ett objekts egenskaper direkt i mönstret:

```csharp
public record Order(string Customer, decimal Total, bool IsPaid);

static string GetStatus(Order order) => order switch
{
    { IsPaid: true, Total: > 10_000 }  => "Stor betald order",
    { IsPaid: true }                   => "Betald",
    { IsPaid: false, Total: > 5_000 }  => "Stor obetald — kontakta kund",
    { IsPaid: false }                  => "Obetald",
};

var order = new Order("Anna", 15_000, true);
Console.WriteLine(GetStatus(order));   // Stor betald order
```

Kombinera typ och property:

```csharp
// Exakt som i din affärskod
string GetDiscount(object customer) => customer switch
{
    PremiumCustomer { Years: > 5 } => "20%",
    PremiumCustomer                => "10%",
    RegularCustomer                => "5%",
    _                              => "0%"
};
```

Kompilatorn letar uppifrån och väljer det första mönstret som matchar.

## Relationsoperatorer i mönster

```csharp
static string GetGrade(int score) => score switch
{
    >= 90 => "A",
    >= 80 => "B",
    >= 70 => "C",
    >= 60 => "D",
    _     => "F"
};

Console.WriteLine(GetGrade(85));   // B
Console.WriteLine(GetGrade(55));   // F
```

## Logiska mönster — and, or, not

```csharp
static string Classify(int n) => n switch
{
    < 0                  => "Negativt",
    0                    => "Noll",
    > 0 and < 10         => "Litet positivt",
    >= 10 and <= 100     => "Medel",
    _                    => "Stort"
};

Console.WriteLine(Classify(-5));    // Negativt
Console.WriteLine(Classify(7));     // Litet positivt
Console.WriteLine(Classify(50));    // Medel
Console.WriteLine(Classify(200));   // Stort
```

```csharp
// not — negera ett mönster
static bool IsNotNull(object? obj) => obj is not null;

// or — ett av flera mönster
static bool IsWeekend(DayOfWeek day) =>
    day is DayOfWeek.Saturday or DayOfWeek.Sunday;
```

## Positionellt mönster — med records och tuples

Matcha positionen av värden i en record eller tuple:

```csharp
public record Point(int X, int Y);

static string QuadrantOf(Point p) => p switch
{
    (0, 0)              => "Origo",
    ( > 0, > 0)         => "Kvadrant I",
    ( < 0, > 0)         => "Kvadrant II",
    ( < 0, < 0)         => "Kvadrant III",
    ( > 0, < 0)         => "Kvadrant IV",
    _                   => "På en axel"
};

Console.WriteLine(QuadrantOf(new Point(3, 4)));    // Kvadrant I
Console.WriteLine(QuadrantOf(new Point(-1, 2)));   // Kvadrant II
Console.WriteLine(QuadrantOf(new Point(0, 0)));    // Origo
```

## List patterns (C# 11)

Matcha på innehåll och form hos en lista eller array:

```csharp
static string DescribeList(int[] list) => list switch
{
    []              => "Tom lista",
    [var single]    => $"Ett element: {single}",
    [var first, var second] => $"Två element: {first} och {second}",
    [var first, .., var last] => $"Börjar på {first}, slutar på {last}",
};

Console.WriteLine(DescribeList([]));            // Tom lista
Console.WriteLine(DescribeList([42]));          // Ett element: 42
Console.WriteLine(DescribeList([1, 2]));        // Två element: 1 och 2
Console.WriteLine(DescribeList([1, 2, 3, 4])); // Börjar på 1, slutar på 4
```

`..` matchar noll eller fler element i mitten — "resten" av listan.

## Guard-sats — when

`when` lägger till ett extra villkor som inte kan uttryckas i mönstret:

```csharp
static string Classify(string text) => text switch
{
    var s when s.Length == 0    => "Tom",
    var s when s.Length < 5     => "Kort",
    var s when s.Contains(' ')  => "Flerordssträng",
    _                           => "Vanlig sträng"
};

Console.WriteLine(Classify(""));             // Tom
Console.WriteLine(Classify("hej"));          // Kort
Console.WriteLine(Classify("hej världen"));  // Flerordssträng
Console.WriteLine(Classify("hejasvenskafotboll")); // Vanlig sträng
```

## is med mönster i if-satser

Mönstermatchning fungerar även direkt i `if`:

```csharp
object? response = GetApiResponse();

if (response is ErrorResponse { StatusCode: 404 } err)
{
    Console.WriteLine($"Sidan hittades inte: {err.Message}");
}
else if (response is SuccessResponse { Data: var data } when data.Length > 0)
{
    Console.WriteLine($"Fick {data.Length} rader");
}
```

## TL;DR

| Mönster | Syntax | Matchar |
|---------|--------|---------|
| Typ | `obj is string s` | Typ + binder variabel |
| Property | `{ Prop: värde }` | Egenskapsvärde |
| Relations | `>= 90` | Jämförelsevärde |
| Logiskt | `x and y`, `x or y`, `not x` | Kombinationer |
| Positionellt | `(x, y)` | Records/tuples av position |
| List | `[first, .., last]` | Listform och innehåll |
| Guard | `when villkor` | Extra logik som inte ryms i mönstret |

Mönstermatchning ersätter `if/else if`-kedjor och typgjutningar med deklarativ, läsbar kod.
