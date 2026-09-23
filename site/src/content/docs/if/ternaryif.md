---
title: Ternary if
description: "Ternary if i If — C#-boken av Marcus Ackre Medina"
layout: default
parent: If
nav_order: 30
---
# Ternary if

Ibland är ett villkor så enkelt att en hel `if/else`-sats känns som overkill. Ternary-operatorn låter dig skriva det på en rad.

```csharp
condition ? value_if_true : value_if_false
```

## När du läst detta ska du kunna

- Använda ternary-operatorn för enkel tilldelning
- Avgöra när ternary är lämplig och när `if/else` är bättre

## Grundexempel

```csharp
int age = 20;
string message = age >= 18 ? "Myndig" : "Inte myndig";
Console.WriteLine(message);  // Myndig
```

Utan ternary:

```csharp
string message;
if (age >= 18)
    message = "Myndig";
else
    message = "Inte myndig";
```

Samma resultat, men ternary sparar fyra rader.

## Fler exempel

```csharp
bool hasDriversLicence = true;
string status = hasDriversLicence ? "Får köra" : "Får inte köra";
Console.WriteLine(status);
```

```csharp
int score = 72;
string grade = score >= 70 ? "G" : "IG";
Console.WriteLine(grade);  // G
```

## I interpolerade strängar

Ternary fungerar bra inuti `$"..."`:

```csharp
int count = 1;
Console.WriteLine($"Du har {count} {(count == 1 ? "message" : "messages")}");
// Du har 1 meddelande
```

## När du INTE ska använda ternary

Ternary är tydlig när logiken är enkel. Nästlad ternary är alltid fel val — använd `if/else` eller switch istället.

```csharp
// Dåligt — omöjligt att läsa
string result = x > 10 ? "stort" : x > 5 ? "medel" : "litet";

// Bra — tydligt
string result;
if (x > 10)      result = "stort";
else if (x > 5)  result = "medel";
else             result = "litet";
```

## TL;DR

`condition ? true : false` — ternary-operatorn. Bra för enkel tilldelning på en rad. Dålig för komplex logik. Nästla aldrig.
