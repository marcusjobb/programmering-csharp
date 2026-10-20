---
title: Decimaltal
description: "float, double och decimal lagrar alla tal med decimaler — men på olika sätt, och skillnaden avgör om du väljer rätt för pengar, fysik eller grafik."
parent: Variabler
nav_order: 13
---
# Decimaltal

C# har tre typer för tal med decimaler, och de skiljer sig i **hur** de lagrar värdet — inte bara i storlek.

| Typ | Storlek | Precision | Används för |
|---|---|---|---|
| `float` | 4 byte | ~6–9 signifikanta siffror | Grafik, spelfysik, där hastighet väger tyngre än exakthet |
| `double` | 8 byte | ~15–17 signifikanta siffror | Standardvalet — matematik, vetenskapliga beräkningar, koordinater |
| `decimal` | 16 byte | 28–29 signifikanta siffror, exakt i bas 10 | Pengar, skatter, allt där varje öre måste stämma |

```csharp
float lite  = 3.14f;       // f-suffix krävs — annars tolkas talet som double
double mer  = 3.14159265358979;
decimal pris = 199.90m;    // m-suffix krävs — annars tolkas talet som double
```

## Varför finns det tre — räcker inte en?

`float` och `double` lagrar tal enligt en internationell standard (IEEE 754) byggd för **snabbhet**, inte exakthet — det är samma avvägning processorer gör i nästan alla programmeringsspråk. Det gör dem perfekta för fysikberäkningar i ett spel, där en mikroskopisk avrundning aldrig syns på skärmen, men olämpliga för pengar.

```csharp
double a = 0.1;
double b = 0.2;
Console.WriteLine(a + b == 0.3);   // False!
Console.WriteLine(a + b);           // 0.30000000000000004
```

`0.1` går inte att representera exakt i binärt, precis som `1/3` inte går att skriva exakt som ett decimaltal (`0.333...`). Skillnaden är osynlig för blotta ögat men förstör en likhetsjämförelse — och om det talet är ett saldo, förstör den bokföringen.

`decimal` löser det genom att lagra tal i bas 10 istället för binärt, till priset av mer minne och långsammare beräkningar:

```csharp
decimal c = 0.1m;
decimal d = 0.2m;
Console.WriteLine(c + d == 0.3m);   // True
```

## Tumregeln

**Pengar → alltid `decimal`.** Allt annat med decimaler → `double`, om du inte har en specifik anledning (minneskritisk grafik, en fysikmotor) att välja `float`.

```csharp
decimal totalpris = 0m;
totalpris += 199.90m;
totalpris += 49.90m;
Console.WriteLine(totalpris);   // 249.80 — exakt, ingen avrundningsdrift
```

## Jämföra decimaltal säkert

Eftersom `double`/`float` kan ha mikroskopiska avrundningsfel, jämför du dem sällan med `==` rakt av. Kolla istället om skillnaden är mindre än en liten tolerans:

```csharp
double x = 0.1 + 0.2;
double y = 0.3;

bool likaNog = Math.Abs(x - y) < 0.0001;
Console.WriteLine(likaNog);   // True
```

`decimal` har inte samma problem — se exemplet ovan — men `double`/`float` behöver den här typen av tolerans-jämförelse så fort resultatet kommer från en beräkning, inte en bokstavlig konstant.

## Obligatorisk dad-joke

Varför litade ingen på `double` när det gällde pengar?

Den kunde aldrig lova att 0.1 + 0.2 faktiskt blev exakt 0.3.
