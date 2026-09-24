---
title: Metodöverlagring
description: "Metodöverlagring innebär att du har flera metoder med samma namn men olika parametrar. C# väljer rätt version baserat på argumenten du skickar."
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Metoder
nav_order: 60
---
# Metodöverlagring (Method Overloading)

Metodöverlagring innebär att du har flera metoder med samma namn men olika parametrar. C# väljer rätt version baserat på argumenten du skickar.

## När du läst detta ska du kunna

- Skriva flera versioner av en metod med samma namn
- Förklara vad som skiljer signaturer åt
- Se när metodöverlagring är ett bättre val än default-parametrar

## Grundexempel

```csharp
void Print(string message)
{
    Console.WriteLine(message);
}

void Print(string message, int times)
{
    for (int i = 0; i < times; i++)
        Console.WriteLine(message);
}

void Print(string message, ConsoleColor color)
{
    Console.ForegroundColor = color;
    Console.WriteLine(message);
    Console.ResetColor();
}

Print("Hej");                          // version 1
Print("Hej", 3);                       // version 2
Print("Hej", ConsoleColor.Green);      // version 3
```

### Output

```
Hej
Hej
Hej
Hej
Hej (green)
```

## Signaturen avgör vilken som väljs

Signaturen = metodnamn + parametertyper. Returtypen räknas **inte**.

```csharp
int Add(int a, int b)      => a + b;
double Add(double a, double b) => a + b;
int Add(int a, int b, int c) => a + b + c;

Add(1, 2);        // → int-versionen
Add(1.5, 2.5);    // → double-versionen
Add(1, 2, 3);     // → tre-parametrar-versionen
```

## Vanligt mönster — förenklade versioner

Bygg en "riktig" version och låt de enklare anropa den:

```csharp
void SendEmail(string to, string subject, string body, bool html)
{
    // faktisk implementering
}

void SendEmail(string to, string subject, string body)
    => SendEmail(to, subject, body, html: false);

void SendEmail(string to, string subject)
    => SendEmail(to, subject, body: "");
```

Logiken lever på ett ställe. De kortare versionerna är bara bekväma ingångar.

## .NET använder detta överallt

`Console.WriteLine` har 18 överlagrade versioner — en för varje typ:

```csharp
Console.WriteLine(42);        // WriteLine(int)
Console.WriteLine(3.14);      // WriteLine(double)
Console.WriteLine(true);      // WriteLine(bool)
Console.WriteLine("text");    // WriteLine(string)
```

## Överlagring vs default-värden

Båda löser liknande problem, men:

| | Metodöverlagring | Default-värden |
|--|-----------------|----------------|
| Olika typer | Ja | Nej |
| Helt olika logik | Ja | Svårt |
| Mindre kod | Nej | Ja |
| Tydlig avsikt | Bra för vitt skilda cases | Bra för "nästan samma" |

## Regler

- Signaturer måste skilja sig i antal *eller* typ på parametrar
- Returtypen ensam gör dem **inte** olika — kompileringsfel
- Ordningen av olika typer räknas: `M(int, string)` ≠ `M(string, int)`

```csharp
// Kompileringsfel — returtyp skiljer inte signaturer
int  Compute(int x) => x * 2;
void Compute(int x) { }       // ERROR
```

## TL;DR

Samma metodnamn, olika parametrar. C# väljer version baserat på argumenten. Logiken för "det grundliga" bör ligga i en version — övriga anropar den.
