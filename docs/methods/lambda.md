---
title: Lambda och delegater
description: "Lambda-uttryck, Func, Action och delegater i C# — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Metoder
nav_order: 35
---
# Lambda och delegater

En lambda är en anonym funktion — en metod utan namn som du kan skicka runt som ett värde. Du har sett dem hela tiden: i LINQ, i events, i callbacks. Nu lär du dig hur de faktiskt fungerar.

## När du läst detta ska du kunna

- Skriva lambda-uttryck med `=>` (pil-operatorn)
- Använda `Func<>` och `Action<>` för att lagra och skicka funktioner
- Förstå skillnaden mellan `Func` (returnerar) och `Action` (returnerar inte)
- Skriva statiska lambdas och lambdas med default-parametrar (C# 12)

## Vad är en lambda?

```csharp
// Vanlig metod
int Dubbla(int x) => x * 2;

// Samma sak som lambda — ingen metoddeklaration
var dubbla = (int x) => x * 2;

Console.WriteLine(dubbla(5));   // 10
```

`=>` uttalas "går till" eller "mappar till". Till vänster: parametrar. Till höger: uttrycket/kroppen.

## Func — lambda som returnerar ett värde

`Func<TIn, TOut>` är en inbyggd typ för funktioner med returvärde.

```csharp
Func<int, int>    dubbla   = x => x * 2;
Func<int, bool>   ärPositiv = x => x > 0;
Func<string, int> längd    = s => s.Length;

Console.WriteLine(dubbla(4));        // 8
Console.WriteLine(ärPositiv(-3));    // False
Console.WriteLine(längd("hej"));     // 3
```

Flera parametrar — lägg till fler typargument (sista är alltid returtypen):

```csharp
Func<int, int, int>    addera  = (a, b) => a + b;
Func<string, int, string> upprepa = (s, n) => string.Concat(Enumerable.Repeat(s, n));

Console.WriteLine(addera(3, 4));          // 7
Console.WriteLine(upprepa("hej ", 3));    // hej hej hej
```

## Action — lambda utan returvärde

`Action<T>` är samma sak men returnerar inget (`void`):

```csharp
Action<string> skriv   = s => Console.WriteLine(s);
Action<int>    öka     = x => Console.WriteLine(x + 1);
Action<string, int> upprepa = (s, n) => { for (int i = 0; i < n; i++) Console.WriteLine(s); };

skriv("Hej!");     // Hej!
öka(9);            // 10
```

`Action` utan typargument tar inga parametrar alls:

```csharp
Action hälsa = () => Console.WriteLine("Hej, världen!");
hälsa();   // Hej, världen!
```

## Lambdas i praktiken — skicka funktioner som argument

Det riktiga värdet av lambdas är att skicka dem som argument:

```csharp
static void KörTvåGånger(Action action)
{
    action();
    action();
}

KörTvåGånger(() => Console.WriteLine("Kör!"));
// Kör!
// Kör!
```

```csharp
static List<T> Filtrera<T>(List<T> lista, Func<T, bool> villkor)
    => lista.Where(villkor).ToList();

var tal   = new List<int> { 1, 2, 3, 4, 5, 6 };
var jämna = Filtrera(tal, x => x % 2 == 0);

Console.WriteLine(string.Join(", ", jämna));   // 2, 4, 6
```

## LINQ — du använder redan lambdas

LINQ-metoder tar `Func<>` och `Action<>` som argument:

```csharp
var tal = new List<int> { 1, 2, 3, 4, 5 };

var dubblade  = tal.Select(x => x * 2);        // [2, 4, 6, 8, 10]
var stora     = tal.Where(x => x > 3);          // [4, 5]
var summa     = tal.Aggregate((a, b) => a + b); // 15
```

## Flerradslambda med kropp

Om lambdan behöver mer än ett uttryck används klamrar och explicit `return`:

```csharp
Func<int, string> beskriv = x =>
{
    if (x < 0) return "Negativt";
    if (x == 0) return "Noll";
    return "Positivt";
};

Console.WriteLine(beskriv(-5));   // Negativt
Console.WriteLine(beskriv(0));    // Noll
Console.WriteLine(beskriv(7));    // Positivt
```

## Statisk lambda

Prefixet `static` förhindrar att lambdan råkar fånga (capture) variabler från omgivande scope — nyttigt i prestandakritisk kod:

```csharp
var tal = new List<int> { 3, 1, 4, 1, 5, 9 };

// static = kompilatorn garanterar att ingen capture sker
var sorterade = tal.OrderBy(static x => x);
```

## Default-parametrar i lambdas — C# 12

I C# 12 kan lambdas ha defaultvärden precis som vanliga metoder:

```csharp
var hälsa = (string namn = "världen") => $"Hej, {namn}!";

Console.WriteLine(hälsa());          // Hej, världen!
Console.WriteLine(hälsa("Marcus"));  // Hej, Marcus!
```

```csharp
var addera = (int a, int b = 10) => a + b;

Console.WriteLine(addera(5));      // 15   (b = 10)
Console.WriteLine(addera(5, 3));   // 8    (b = 3)
```

Praktiskt för callbacks där du vill ha ett rimligt default:

```csharp
static void KörMedFördröjning(Action callback, int ms = 100)
{
    Thread.Sleep(ms);
    callback();
}

KörMedFördröjning(() => Console.WriteLine("Klar!"));        // väntar 100 ms
KörMedFördröjning(() => Console.WriteLine("Klar!"), 500);   // väntar 500 ms
```

## TL;DR

| Typ | Syntax | Returnerar |
|-----|--------|-----------|
| `Func<T, TResult>` | `x => x * 2` | Ja |
| `Action<T>` | `x => Console.WriteLine(x)` | Nej |
| `Action` | `() => Console.WriteLine("!")` | Nej |

```csharp
// Func — returnerar
Func<int, bool> ärJämn = x => x % 2 == 0;

// Action — returnerar inte
Action<string> skriv = s => Console.WriteLine(s);

// C# 12 — default-parameter
var hälsa = (string namn = "världen") => $"Hej, {namn}!";
```

Lambdas är kärnan i LINQ, event-hantering och funktionell stil i C#. När du förstår `Func<>` och `Action<>` förstår du hur LINQ-metoderna faktiskt fungerar.
