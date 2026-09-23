---
title: Metoder
description: "Metoder i Metoder — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Metoder
nav_order: 10
---
# Metoder — grunderna

En metod är ett namngivet block av kod. Du anropar den när du vill köra koden, och du kan anropa den hur många gånger du vill.

## När du läst detta ska du kunna

- Skriva en metod med och utan returvärde
- Anropa en metod
- Förstå skillnaden mellan `void` och ett returvärde
- Skriva expression-bodied metoder

## Syntax

```csharp
åtkomstmodifierare returtyp Namn(parametrar)
{
    // kropp
}
```

## void — ingen returvärde

```csharp
void PrintWelcome()
{
    Console.WriteLine("Välkommen!");
}

PrintWelcome(); // anrop
```

### Output

```
Välkommen!
```

## Returvärde

Deklarera returtypen och avsluta med `return`:

```csharp
int Add(int a, int b)
{
    return a + b;
}

int result = Add(3, 4);
Console.WriteLine(result);
```

### Output

```
7
```

## Expression-bodied metoder (=>)

En kortare syntax för enkla metoder:

```csharp
int Multiply(int a, int b) => a * b;

void Print(string message) => Console.WriteLine(message);
```

Fungerar för alla returtyper, även `void`.

## Lokala variabler

Variabler i en metod existerar bara inuti den:

```csharp
void ShowDouble(int number)
{
    int doubled = number * 2;   // lokal variabel
    Console.WriteLine(doubled);
}

ShowDouble(5);
// doubled är inte tillgänglig här
```

### Output

```
10
```

## Metoder anropar metoder

```csharp
string Greet(string name) => $"Hej, {name}!";

void PrintGreeting(string name)
{
    string message = Greet(name);
    Console.WriteLine(message);
}

PrintGreeting("Maria");
```

### Output

```
Hej, Maria!
```

## TL;DR

| | Syntax |
|--|--------|
| Ingen retur | `void Namn() { }` |
| Med retur | `int Namn() { return x; }` |
| Kort form | `int Namn() => x;` |
| Anrop | `Namn();` eller `var r = Namn();` |
