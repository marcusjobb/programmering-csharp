---
title: Extension-properties
description: "Extension-properties och det nya extension-blocket — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Metoder
nav_order: 72
---
# Extension-properties

Det var länge omöjligt att lägga till properties på typer du inte äger. Med det nya `extension`-blocket kan du nu göra det — och samla metoder, properties och indexerare i ett och samma block.

## När du läst detta ska du kunna

- Skriva extension-properties med `extension`-blocket
- Blanda metoder och properties i samma block
- Skriva statiska extension-members
- Förklara varför det nya sättet är bättre än det gamla

## Det gamla sättet vs det nya

Det gamla sättet (statisk klass med `this`) funkar fortfarande, men kan bara lägga till metoder — inte properties:

```csharp
// Gammalt sätt — bara metoder
public static class StringExtensions
{
    public static bool IsEmail(this string s)
        => s.Contains('@') && s.Contains('.');
}
```

Det nya `extension`-blocket kan lägga till metoder, properties och indexerare i ett sammanhållet block:

```csharp
// Nytt sätt — metoder, properties och indexerare tillsammans
public static class StringExtensions
{
    extension (string s)
    {
        // Property — omöjligt med gamla sättet
        public bool IsEmail => s.Contains('@') && s.Contains('.');

        // Property med beräkning
        public string Reversed => new(s.Reverse().ToArray());

        // Metod — fungerar precis som förut
        public string Repeat(int times) => string.Concat(Enumerable.Repeat(s, times));
    }
}
```

## Extension-properties

```csharp
public static class StringExtensions
{
    extension (string s)
    {
        public bool IsEmpty      => s.Length == 0;
        public bool IsNotEmpty   => s.Length > 0;
        public int  WordCount    => s.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;
        public string FirstWord  => s.Split(' ')[0];
        public string TitleCase  => System.Globalization.CultureInfo.CurrentCulture
                                       .TextInfo.ToTitleCase(s.ToLower());
    }
}
```

```csharp
string text = "hej världen det här är kul";

Console.WriteLine(text.IsEmpty);      // False
Console.WriteLine(text.WordCount);    // 5
Console.WriteLine(text.FirstWord);    // hej
Console.WriteLine(text.TitleCase);    // Hej Världen Det Här Är Kul
Console.WriteLine("".IsEmpty);        // True
```

## En property som refererar en annan extension-property

Extension-properties i samma block kan referera varandra precis som vanliga properties:

```csharp
public static class DateTimeExtensions
{
    extension (DateTime dt)
    {
        public bool IsWeekend => dt.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday;
        public bool IsWorkday => !dt.IsWeekend;   // refererar IsWeekend direkt

        public string FriendlyName => dt switch
        {
            { DayOfWeek: DayOfWeek.Monday } => "Måndag",
            { DayOfWeek: DayOfWeek.Friday } => "Fredag 🎉",
            _ => dt.DayOfWeek.ToString()
        };
    }
}
```

```csharp
var today = DateTime.Today;
Console.WriteLine(today.IsWeekend);      // True/False
Console.WriteLine(today.IsWorkday);      // motsatsen
Console.WriteLine(today.FriendlyName);   // t.ex. "Fredag 🎉"
```

`IsWorkday` läser `IsWeekend` utan att behöva gå via `dt.IsWeekend` — blocket ser sina egna members direkt.

> Se även: [C# 14: Extension properties](https://marcusmedina.pro/sv/junior-tips/csharp14-extension-properties/) på marcusmedina.pro

## Blanda metoder och properties

Det riktiga värdet av `extension`-blocket är att du kan samla allt som hör ihop:

```csharp
public static class ListExtensions
{
    extension<T> (List<T> list)
    {
        // Properties
        public bool IsEmpty    => list.Count == 0;
        public T    First      => list[0];
        public T    Last       => list[^1];
        public T    Middle     => list[list.Count / 2];

        // Metoder
        public void Shuffle()
        {
            var rng = Random.Shared;
            for (int i = list.Count - 1; i > 0; i--)
            {
                int j = rng.Next(i + 1);
                (list[i], list[j]) = (list[j], list[i]);
            }
        }

        public List<T> Duplicated() => [..list, ..list];
    }
}
```

```csharp
var numbers = new List<int> { 1, 2, 3, 4, 5 };

Console.WriteLine(numbers.IsEmpty);     // False
Console.WriteLine(numbers.First);       // 1
Console.WriteLine(numbers.Last);        // 5
Console.WriteLine(numbers.Middle);      // 3

var doubled = numbers.Duplicated();     // [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
```

## Statiska extension-members

`extension`-blocket kan också lägga till statiska members — något det gamla sättet inte stöder alls:

```csharp
public static class DateTimeExtensions
{
    extension (DateTime dt)
    {
        // Instans-property
        public bool IsWeekend => dt.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday;
        public bool IsToday   => dt.Date == DateTime.Today;

        // Instans-metod
        public string ToSwedish() => dt.ToString("d MMMM yyyy", new System.Globalization.CultureInfo("sv-SE"));
    }

    extension (DateTime)
    {
        // Statisk property på typen
        public static DateTime Tomorrow => DateTime.Today.AddDays(1);
        public static DateTime Yesterday => DateTime.Today.AddDays(-1);

        // Statisk metod
        public static DateTime NextWeekday(DayOfWeek day)
        {
            var date = DateTime.Today.AddDays(1);
            while (date.DayOfWeek != day)
                date = date.AddDays(1);
            return date;
        }
    }
}
```

```csharp
var today = DateTime.Today;
Console.WriteLine(today.IsWeekend);                              // beror på dagen
Console.WriteLine(today.ToSwedish());                            // t.ex. "30 september 2026"

Console.WriteLine(DateTime.Tomorrow);                            // morgondagens datum
Console.WriteLine(DateTime.NextWeekday(DayOfWeek.Monday));       // nästa måndag
```

## Praktiskt exempel — domänutökning

```csharp
public class Order
{
    public int    Id       { get; init; }
    public string Customer { get; init; }
    public decimal Total   { get; init; }
    public bool   IsPaid   { get; init; }
}

public static class OrderExtensions
{
    extension (Order order)
    {
        public bool   IsLarge     => order.Total > 10_000;
        public bool   IsUnpaid    => !order.IsPaid;
        public string Summary     => $"#{order.Id} — {order.Customer} — {order.Total:C}";
        public decimal WithVat    => order.Total * 1.25m;
    }

    extension (IEnumerable<Order> orders)
    {
        public decimal TotalRevenue => orders.Sum(o => o.Total);
        public int     UnpaidCount  => orders.Count(o => o.IsUnpaid);
    }
}
```

```csharp
var orders = new List<Order>
{
    new() { Id = 1, Customer = "Anna",  Total = 15_000, IsPaid = true  },
    new() { Id = 2, Customer = "Björn", Total = 3_500,  IsPaid = false },
    new() { Id = 3, Customer = "Clara", Total = 8_200,  IsPaid = false },
};

foreach (var order in orders)
    Console.WriteLine($"{order.Summary} | Stor: {order.IsLarge} | inkl. moms: {order.WithVat:C}");

Console.WriteLine($"Total omsättning: {orders.TotalRevenue:C}");
Console.WriteLine($"Obetald: {orders.UnpaidCount}");
```

### Output

```
#1 — Anna — 15 000,00 kr | Stor: True  | inkl. moms: 18 750,00 kr
#2 — Björn — 3 500,00 kr | Stor: False | inkl. moms: 4 375,00 kr
#3 — Clara — 8 200,00 kr | Stor: False | inkl. moms: 10 250,00 kr
Total omsättning: 26 700,00 kr
Obetald: 2
```

## TL;DR

```csharp
public static class MyExtensions
{
    // Instans-members
    extension (string s)
    {
        public bool IsEmail   => s.Contains('@');   // property
        public string Upper() => s.ToUpper();       // metod
    }

    // Statiska members
    extension (string)
    {
        public static string Empty => "";           // statisk property
    }
}

// Används precis som inbyggda members
"test@mail.com".IsEmail   // True
"hello".Upper()           // HELLO
string.Empty              // "" (men den finns ju redan...)
```

Extension-properties fyller det sista hålet — nu kan du utöka vilken typ som helst med methods, properties och indexerare utan arv och utan att äga typen.
