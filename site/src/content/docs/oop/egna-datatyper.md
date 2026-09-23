---
title: Egna datatyper
description: "Egna datatyper i Objektorienterad programmering (OOP) — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Objektorienterad programmering (OOP)
nav_order: 65
---
# Egna datatyper

Ibland räcker inte `int`, `double` och `string`. Du kanske vill ha en typ som representerar ett belopp, en temperatur eller en enhet — och som *beter sig* som en inbyggd typ. Det är möjligt genom operator-överlagring och konverteringsoperatorer.

## När du läst detta ska du kunna

- Skapa en struct som fungerar som en inbyggd typ
- Definiera implicita konverteringar (`int` → din typ och tillbaka)
- Överlagra operatorer som `++`, `+`, `>` och `==`
- Förklara skillnaden mellan `implicit` och `explicit` konvertering

---

> **🥷 Ninjakod-varning**
>
> Det här är mäktig teknik — och med makt följer ansvar. Operator-överlagring kan göra koden intuitiv *eller* obegriplig beroende på hur den används.
>
> **Använd när:** typen representerar ett domänkoncept med tydlig matematik (pengar, längd, temperatur, enheter).  
> **Undvik när:** det bara ser coolt ut. En klass med `+`-operator som gör något oväntat är en buggfälla.

---

## Grundexemplet — Enhet

```csharp
struct Unit
{
    private readonly int _value;

    private Unit(int value) => _value = value;

    // int → Enhet automatiskt
    public static implicit operator Unit(int value) => new(value);

    // Enhet → int automatiskt
    public static implicit operator int(Unit e) => e._value;

    // ++ och --
    public static Unit operator ++(Unit e) => e._value + 1;
    public static Unit operator --(Enhet e) => e._value - 1;

    public override string ToString() => $"{_value} enheter";
}
```

### Användning

```csharp
Unit thing = 5;           // implicit int → Enhet
thing++;                   // operator++
Console.WriteLine(thing);  // 6 enheter

Unit a = 3;
Unit b = 4;
Console.WriteLine(a + b);  // 7 enheter  (via implicit int-konvertering)
```

### Output

```
6 units
7 units
```

---

## Praktiskt exempel — Valuta

En `Kronor`-typ med aritmetik och jämförelse:

```csharp
record struct Kronor(decimal Amount)
{
    public static implicit operator Kronor(decimal value) => new(value);
    public static implicit operator decimal(Kronor k) => k.Amount;

    public static Kronor operator +(Kronor a, Kronor b) => a.Amount + b.Amount;
    public static Kronor operator -(Kronor a, Kronor b) => a.Amount - b.Amount;
    public static Kronor operator *(Kronor k, decimal factor) => k.Amount * factor;

    public static bool operator >(Kronor a, Kronor b)  => a.Amount > b.Amount;
    public static bool operator <(Kronor a, Kronor b)  => a.Amount < b.Amount;
    public static bool operator >=(Kronor a, Kronor b) => a.Amount >= b.Amount;
    public static bool operator <=(Kronor a, Kronor b) => a.Amount <= b.Amount;

    public override string ToString() => $"{Amount:C}";
}
```

> `record struct` ger `==` och `!=` gratis — bra för värdetyper.

### Användning

```csharp
Kronor price  = 199.90m;
Kronor tax    = price * 0.25m;
Kronor total  = price + tax;

Console.WriteLine($"Pris:  {price}");
Console.WriteLine($"Moms:  {tax}");
Console.WriteLine($"Total: {total}");

if (total > 300m)
    Console.WriteLine("Fri frakt!");
```

### Output

```
Price:  199,90 kr
Moms:  49,98 kr
Total: 249,88 kr
```

---

## implicit vs explicit

| | `implicit` | `explicit` |
|--|------------|------------|
| Konvertering sker | Automatiskt | Kräver cast: `(Type)value` |
| Säkert när | Ingen information förloras | Precision eller värde kan förloras |
| Exempel | `int` → `double` | `double` → `int` (trunkerar) |

```csharp
struct Celsius
{
    public double Degrees { get; }
    public Celsius(double d) => Degrees = d;

    // implicit: double → Celsius tappar ingenting
    public static implicit operator Celsius(double d) => new(d);

    // explicit: Celsius → Fahrenheit är en annan skala — var tydlig
    public static explicit operator Fahrenheit(Celsius c) =>
        new(c.Degrees * 9.0 / 5.0 + 32.0);

    public override string ToString() => $"{Degrees:F1} °C";
}
```

```csharp
Celsius boiling = 100.0;                          // implicit
var fahrenheit   = (Fahrenheit)boiling;           // explicit cast
Console.WriteLine($"{boiling} = {fahrenheit}");   // 100.0 °C = 212.0 °F
```

---

## Vilka operatorer kan överlagras?

| Kategori | Operatorer |
|----------|-----------|
| Aritmetik | `+` `-` `*` `/` `%` |
| Prefix/postfix | `++` `--` |
| Jämförelse | `==` `!=` `<` `>` `<=` `>=` (alltid parvis) |
| Unärt | `+` `-` `!` `~` |
| Logik | `true` `false` (ger `&&` och `||` på köpet) |

> Jämförelseoperatorer **måste** definieras parvis: `>` kräver `<`, `==` kräver `!=`.

---

## TL;DR

Skapa en `struct` (eller `record struct` för värdesemantik) med:

1. **Implicit konvertering** — så typen fungerar naturligt med inbyggda typer
2. **Operator-överlagring** — för aritmetik och jämförelse
3. **`ToString()`** — för läsbar utskrift

Använd det för tydliga domänkoncept. Undvik det för att vara smart.
