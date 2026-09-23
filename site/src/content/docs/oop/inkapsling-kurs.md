---
title: "Lästext — Inkapsling"
description: "Lästext — Inkapsling i Objektorienterad programmering (OOP) — C#-boken av Marcus Ackre Medina"
parent: "Objektorienterad programmering (OOP)"
nav_order: 18
---

# Lästext — Inkapsling

Inkapsling handlar om att skydda ett objekts data så att bara klassen själv kan bestämma vad som händer med den. Det är en av grundpelarna i objektorienterad programmering.

## Vad händer utan inkapsling?

Tänk dig ett bankkonto utan lås på dörren:

```csharp
// Utan inkapsling — alla kan göra vad de vill
class BankAccount
{
    public double balance = 1000;   // publikt fält — farligt!
}

// Vem som helst kan sätta saldot till vad som helst
BankAccount account = new BankAccount();
account.balance = -99999;             // ingen koll, ingen validering
```

Ingen kontroll. Inga spärrar. Vad som helst kan hända med dina data. Det kallas ett **publikt fält** — och det är i princip alltid fel.

## Lösningen: stäng dörren med `private`

```csharp
class BankAccount
{
    private double balance;   // privat — ingen utifrån kan röra det
}
```

Fältet `balance` existerar fortfarande — men nu är det inlåst. Ingen kod utanför klassen kan läsa eller skriva direkt till det. Klassen själv bestämmer vad som får hända med sin data.

## `private` och `public` — vad är vad?

| Nyckelord | Vem ser det? | Används till |
|-----------|-------------|--------------|
| `private` | Bara klassen själv | Fält, intern logik |
| `public`  | Alla utifrån | Konstruktorer, metoder, properties |

```csharp
class BankAccount
{
    private double balance;           // bara klassen får röra det
    public string Owner { get; private set; }   // alla kan läsa, bara klassen skriver
}
```

Enkelt: **privat = inuti, publik = utifrån.**

## Property med `private set` — det kontrollerade fönstret

En property är det rekommenderade sättet att exponera data på ett kontrollerat sätt.

**Gammal stil** (ser du i äldre kodbaser):
```csharp
private double _balance;

public double Balance
{
    get { return _balance; }
    private set { _balance = value; }
}
```

**Modern stil (C# 3+):**
```csharp
// Kortare, men gör exakt samma sak
public double Balance { get; private set; }
```

Utifrån kan du läsa `account.Balance`. Du kan **inte** skriva `account.Balance = 999`.

## Konstruktor som ingångsport

```csharp
class BankAccount
{
    public double Balance { get; private set; }

    public BankAccount(double startBalance)
    {
        Balance = startBalance;
    }
}
```

Konstruktorn är den enda ingångsporten när objektet skapas. Inga genvägar. Inga bakdörrar. Klassen bestämmer själv hur den får skapas.

## Metoder med validering

```csharp
public void Deposit(double amount)
{
    if (amount > 0)
        Balance += amount;
}

public bool Withdraw(double amount)
{
    if (amount > 0 && amount <= Balance)
    {
        Balance -= amount;
        return true;
    }
    return false;
}
```

Metoderna kontrollerar att värdet är rimligt. Ogiltiga operationer avvisas — saldot kan aldrig hamna i ett ogiltigt tillstånd.

## Varför `private set` och inte bara `set`?

```csharp
// Med public set — vem som helst kan skriva
public double Balance { get; set; }
account.Balance = 1000000;   // inga hinder alls

// Med private set — bara klassen skriver
public double Balance { get; private set; }
account.Balance = 1000000;   // kompileringsfel — stoppas direkt
```

`private set` ger dig det bästa av två världar: alla kan **läsa**, bara klassen kan **ändra**.

## Hela BankAccount — alla delar på plats

```csharp
class BankAccount
{
    public double Balance { get; private set; }

    public BankAccount(double startBalance)
    {
        Balance = startBalance;
    }

    public void Deposit(double amount)
    {
        if (amount > 0)
            Balance += amount;
    }

    public bool Withdraw(double amount)
    {
        if (amount > 0 && amount <= Balance)
        {
            Balance -= amount;
            return true;
        }
        return false;
    }
}
```

## Skapa ett objekt och använd det

```csharp
BankAccount account = new BankAccount(1000);

Console.WriteLine($"Saldo: {account.Balance} kr");   // 1000

account.Deposit(500);
Console.WriteLine($"Saldo: {account.Balance} kr");   // 1500

bool succeeded = account.Withdraw(200);
Console.WriteLine($"Uttag lyckades: {succeeded}");
Console.WriteLine($"Saldo: {account.Balance} kr");   // 1300

bool failed = account.Withdraw(9999);
Console.WriteLine($"Uttag lyckades: {failed}");  // False
```

Allt sker via metoderna. Saldot kan aldrig hamna i ett ogiltigt tillstånd.

## Ditt jobb som klassdesigner

Ställ dig alltid dessa frågor:

- Behöver kod utanför klassen **läsa** det här? → `public get`
- Behöver kod utanför klassen **ändra** det här? → `public set` (sällan rätt!)
- Är det intern logik som ingen annan ska röra? → `private`

Det är inte bara teknik. Det är design.
