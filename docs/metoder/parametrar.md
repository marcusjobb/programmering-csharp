---
title: Parametrar
description: "En parameter är ett värde som skickas in till en metod. Det är metodens ingång — data den behöver för att göra sitt jobb."
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Metoder
nav_order: 20
---
# Parametrar

En parameter är ett värde som skickas in till en metod. Det är metodens ingång — data den behöver för att göra sitt jobb.

## När du läst detta ska du kunna

- Förklara skillnaden mellan parameter och argument
- Skriva metoder med en eller flera parametrar
- Använda default-värden
- Anropa metoder med namngivna argument

## Parameter vs argument

Dessa ord förväxlas ofta — de är nära besläktade men inte samma sak:

| Begrepp | Förklaring | Exempel |
|---------|-----------|---------|
| **Parameter** | Variabeln i metodens definition | `void Greet(string name)` → `name` är parameter |
| **Argument** | Värdet som skickas in vid anrop | `Greet("Anna")` → `"Anna"` är argument |

```csharp
//            ↓ parameter
void Greet(string name)
{
    Console.WriteLine($"Hej, {name}!");
}

//        ↓ argument
Greet("Anna");
```

## Flera parametrar

```csharp
void Introduce(string name, int age)
{
    Console.WriteLine($"{name} är {age} år.");
}

Introduce("Björn", 28);
```

### Output

```
Björn is 28 year.
```

Ordningen på argumenten vid anrop måste matcha ordningen på parametrarna.

## Default-värden

En parameter kan ha ett standardvärde som används om argumentet utelämnas:

```csharp
void PrintDivider(char symbol = '-', int length = 20)
{
    Console.WriteLine(new string(symbol, length));
}

PrintDivider();          // - - - - - - - - - - - - - - - - - - - -
PrintDivider('=');       // ====================
PrintDivider('*', 10);   // **********
```

### Output

```
--------------------
====================
**********
```

Parametrar med default-värden måste stå sist.

## Namngivna argument

Du kan skicka argument i valfri ordning om du namnger dem:

```csharp
void CreateUser(string name, int age, string role = "user")
{
    Console.WriteLine($"{name}, {age} år, roll: {role}");
}

CreateUser(age: 30, name: "Clara", role: "admin");
```

### Output

```
Clara, 30 year, role: admin
```

Namngivna argument är extra tydliga när metoden har många parametrar av samma typ.

## Värde kopieras — originalet påverkas inte

C# skickar som standard en *kopia* av värdet. Originalet ändras inte:

```csharp
void Double(int number)
{
    number *= 2;   // påverkar bara den lokala kopian
    Console.WriteLine($"Inuti: {number}");
}

int value = 5;
Double(value);
Console.WriteLine($"Utanför: {value}");
```

### Output

```
Inside: 10
Outside: 5
```

Vill du påverka originalet? Använd `ref` eller `out` — se respektive sida.

## TL;DR

| | Syntax |
|--|--------|
| En parameter | `void M(int x)` |
| Flera | `void M(int x, string y)` |
| Default | `void M(int x = 0)` |
| Namngivet anrop | `M(x: 5)` |
