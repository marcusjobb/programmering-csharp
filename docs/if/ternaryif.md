---
title: Ternary if
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: If
nav_order: 30
---
# Ternary if

Ibland är ett villkor så enkelt att en hel `if/else`-sats känns som overkill. Ternary-operatorn låter dig skriva det på en rad.

```csharp
villkor ? värde_om_sant : värde_om_falskt
```

## När du läst detta ska du kunna

- Använda ternary-operatorn för enkel tilldelning
- Avgöra när ternary är lämplig och när `if/else` är bättre

## Grundexempel

```csharp
int ålder = 20;
string besked = ålder >= 18 ? "Myndig" : "Inte myndig";
Console.WriteLine(besked);  // Myndig
```

Utan ternary:

```csharp
string besked;
if (ålder >= 18)
    besked = "Myndig";
else
    besked = "Inte myndig";
```

Samma resultat, men ternary sparar fyra rader.

## Fler exempel

```csharp
bool harKörkort = true;
string status = harKörkort ? "Får köra" : "Får inte köra";
Console.WriteLine(status);
```

```csharp
int poäng = 72;
string betyg = poäng >= 70 ? "G" : "IG";
Console.WriteLine(betyg);  // G
```

## I interpolerade strängar

Ternary fungerar bra inuti `$"..."`:

```csharp
int antal = 1;
Console.WriteLine($"Du har {antal} {(antal == 1 ? "meddelande" : "meddelanden")}");
// Du har 1 meddelande
```

## När du INTE ska använda ternary

Ternary är tydlig när logiken är enkel. Nästlad ternary är alltid fel val — använd `if/else` eller switch istället.

```csharp
// Dåligt — omöjligt att läsa
string resultat = x > 10 ? "stort" : x > 5 ? "medel" : "litet";

// Bra — tydligt
string resultat;
if (x > 10)      resultat = "stort";
else if (x > 5)  resultat = "medel";
else             resultat = "litet";
```

## TL;DR

`villkor ? sant : falskt` — ternary-operatorn. Bra för enkel tilldelning på en rad. Dålig för komplex logik. Nästla aldrig.
