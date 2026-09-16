---
title: "Inkapsling (kurs)"
parent: "Objektorienterad programmering (OOP)"
nav_order: 18
---

# Inkapsling

Inkapsling handlar om att skydda ett objekts data så att bara klassen själv kan bestämma vad som händer med den. Det är en av grundpelarna i objektorienterad programmering.

## Vad händer utan inkapsling?

Tänk dig ett bankkonto utan lås på dörren:

```csharp
// Utan inkapsling — alla kan göra vad de vill
class BankAccount
{
    public double saldo = 1000;   // publikt fält — farligt!
}

// Vem som helst kan sätta saldot till vad som helst
BankAccount konto = new BankAccount();
konto.saldo = -99999;             // ingen koll, ingen validering
```

Ingen kontroll. Inga spärrar. Vad som helst kan hända med dina data. Det kallas ett **publikt fält** — och det är i princip alltid fel.

## Lösningen: stäng dörren med `private`

```csharp
class BankAccount
{
    private double saldo;   // privat — ingen utifrån kan röra det
}
```

Fältet `saldo` existerar fortfarande — men nu är det inlåst. Ingen kod utanför klassen kan läsa eller skriva direkt till det. Klassen själv bestämmer vad som får hända med sin data.

## `private` och `public` — vad är vad?

| Nyckelord | Vem ser det? | Används till |
|-----------|-------------|--------------|
| `private` | Bara klassen själv | Fält, intern logik |
| `public`  | Alla utifrån | Konstruktorer, metoder, properties |

```csharp
class BankAccount
{
    private double saldo;           // bara klassen får röra det
    public string Ägare { get; private set; }   // alla kan läsa, bara klassen skriver
}
```

Enkelt: **privat = inuti, publik = utifrån.**

## Property med `private set` — det kontrollerade fönstret

En property är det rekommenderade sättet att exponera data på ett kontrollerat sätt.

**Gammal stil** (ser du i äldre kodbaser):
```csharp
private double _saldo;

public double Saldo
{
    get { return _saldo; }
    private set { _saldo = value; }
}
```

**Modern stil (C# 3+):**
```csharp
// Kortare, men gör exakt samma sak
public double Saldo { get; private set; }
```

Utifrån kan du läsa `konto.Saldo`. Du kan **inte** skriva `konto.Saldo = 999`.

## Konstruktor som ingångsport

```csharp
class BankAccount
{
    public double Saldo { get; private set; }

    public BankAccount(double startSaldo)
    {
        Saldo = startSaldo;
    }
}
```

Konstruktorn är den enda ingångsporten när objektet skapas. Inga genvägar. Inga bakdörrar. Klassen bestämmer själv hur den får skapas.

## Metoder med validering

```csharp
public void SättIn(double belopp)
{
    if (belopp > 0)
        Saldo += belopp;
}

public bool TaUt(double belopp)
{
    if (belopp > 0 && belopp <= Saldo)
    {
        Saldo -= belopp;
        return true;
    }
    return false;
}
```

Metoderna kontrollerar att värdet är rimligt. Ogiltiga operationer avvisas — saldot kan aldrig hamna i ett ogiltigt tillstånd.

## Varför `private set` och inte bara `set`?

```csharp
// Med public set — vem som helst kan skriva
public double Saldo { get; set; }
konto.Saldo = 1000000;   // inga hinder alls

// Med private set — bara klassen skriver
public double Saldo { get; private set; }
konto.Saldo = 1000000;   // kompileringsfel — stoppas direkt
```

`private set` ger dig det bästa av två världar: alla kan **läsa**, bara klassen kan **ändra**.

## Hela BankAccount — alla delar på plats

```csharp
class BankAccount
{
    public double Saldo { get; private set; }

    public BankAccount(double startSaldo)
    {
        Saldo = startSaldo;
    }

    public void SättIn(double belopp)
    {
        if (belopp > 0)
            Saldo += belopp;
    }

    public bool TaUt(double belopp)
    {
        if (belopp > 0 && belopp <= Saldo)
        {
            Saldo -= belopp;
            return true;
        }
        return false;
    }
}
```

## Skapa ett objekt och använd det

```csharp
BankAccount konto = new BankAccount(1000);

Console.WriteLine($"Saldo: {konto.Saldo} kr");   // 1000

konto.SättIn(500);
Console.WriteLine($"Saldo: {konto.Saldo} kr");   // 1500

bool lyckades = konto.TaUt(200);
Console.WriteLine($"Uttag lyckades: {lyckades}");
Console.WriteLine($"Saldo: {konto.Saldo} kr");   // 1300

bool misslyckades = konto.TaUt(9999);
Console.WriteLine($"Uttag lyckades: {misslyckades}");  // False
```

Allt sker via metoderna. Saldot kan aldrig hamna i ett ogiltigt tillstånd.

## Ditt jobb som klassdesigner

Ställ dig alltid dessa frågor:

- Behöver kod utanför klassen **läsa** det här? → `public get`
- Behöver kod utanför klassen **ändra** det här? → `public set` (sällan rätt!)
- Är det intern logik som ingen annan ska röra? → `private`

Det är inte bara teknik. Det är design.
