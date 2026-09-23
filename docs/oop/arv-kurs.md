---
title: "Arv (kurs)"
description: "Arv (kurs) i Objektorienterad programmering (OOP) — C#-boken av Marcus Ackre Medina"
parent: "Objektorienterad programmering (OOP)"
nav_order: 22
---

# Arv

Arv (inheritance) är ett av de viktigaste koncepten i objektorienterad programmering. Det låter dig bygga nya klasser som återanvänder kod från befintliga klasser — utan att kopiera den.

## Problemet arv löser

Tänk dig att du bygger `Hund` och `Katt` var för sig:

```csharp
class Hund
{
    private string _namn;
    public Hund(string namn) { _namn = namn; }
    public void Presentera() => Console.WriteLine($"Jag heter {_namn}.");
    public void LåtaLjud()  => Console.WriteLine("Voff!");
}
```

```csharp
class Katt
{
    private string _namn;
    public Katt(string namn) { _namn = namn; }
    public void Presentera() => Console.WriteLine($"Jag heter {_namn}.");
    public void LåtaLjud()  => Console.WriteLine("Mjau!");
}
```

`Presentera()` är **exakt samma** i båda klasserna — rad för rad. Vill du lägga till en `_ålder`? Ändra på **två ställen**. Vill du lägga till kaniner? En klass till med samma `Presentera()`.

Det här kallas ett **DRY-brott** — Don't Repeat Yourself. Arv är lösningen.

## Lösningen: en basklass

Flytta det som är gemensamt till en **basklass**. En basklass är en vanlig klass, men den använder speciella åtkomstmodifierare:

| Nyckelord | Tillgänglig för |
|-----------|----------------|
| `private` | Bara basklassen själv |
| `protected` | Basklassen och alla subklasser |
| `public` | Alla |

## Basklassen

```csharp
class Djur
{
    public string Namn { get; private set; }

    public Djur(string namn)
    {
        Namn = namn;
    }

    public void Presentera()
    {
        Console.WriteLine($"Jag heter {Namn}.");
    }

    public virtual void LåtaLjud() { }
}
```

`Presentera()` skrivs **en gång** i `Djur`. Nyckelordet `virtual` markerar att subklasser får skriva sin egen version av `LåtaLjud`.

## Subklasserna ärver

En subklass är ett "barn" till basklassen — den ärver allt som inte är `private`.

`Presentera()` finns i `Djur`. `Hund` och `Katt` får den gratis — ingen kopiering.

## `virtual` och `override`

Regeln kallas "öppen för arv, stängd för ändringar". Du har djur med olika beteenden — samma grund, men de agerar annorlunda. Istället för en massa if-satser i basklassen skapar du subklasser som ärver basklassen och skriver om specifika metoder.

```csharp
class Djur
{
    public virtual void LåtaLjud() { }   // vet inte — gör ingenting
}

class Hund : Djur
{
    public override void LåtaLjud() => Console.WriteLine("Voff!");
}

class Katt : Djur
{
    public override void LåtaLjud() => Console.WriteLine("Mjau!");
}
```

## Konstruktorn i en subklass

En subklass måste sätta i gång basklassens konstruktor med `: base(...)`:

```csharp
class Hund : Djur
{
    public Hund(string namn) : base(namn) { }

    public override void LåtaLjud()
    {
        Console.WriteLine("Voff!");
    }
}
```

- `: Djur` — Hund är en Djur
- `: base(namn)` — anropar basklassens konstruktor med `namn`
- `override` — skriver över basklassens `LåtaLjud`

```csharp
class Katt : Djur
{
    public Katt(string namn) : base(namn) { }

    public override void LåtaLjud()
    {
        Console.WriteLine("Mjau!");
    }
}
```

## `base(...)` — konstruktorkedjan

```csharp
class Djur
{
    public string Namn { get; private set; }

    public Djur(string namn)
    {
        Namn = namn;
    }
}

class Hund : Djur
{
    public Hund(string namn) : base(namn) { }
}
```

`: base(namn)` skickar `namn` upp till `Djur`. Utan det vet inte `Djur` vad `Namn` ska vara.

## Klassdiagram

```
┌──────────────────────────────┐
│           Djur               │  ← basklass
├──────────────────────────────┤
│ + Namn : string              │
├──────────────────────────────┤
│ + Djur(namn)                 │
│ + Presentera()               │
│ + virtual LåtaLjud()         │
└──────────────────────────────┘
         ▲           ▲
         │           │
┌────────────┐  ┌────────────┐
│    Hund    │  │    Katt    │  ← subklasser
├────────────┤  ├────────────┤
│ override   │  │ override   │
│ LåtaLjud   │  │ LåtaLjud   │
└────────────┘  └────────────┘
```

Pilen pekar uppåt — subklassen ärver från basklassen.

## Sätt ihop det i Main

```csharp
Hund hund = new Hund("Fido");
Katt katt = new Katt("Luna");

hund.Presentera();   // ärvd från Djur — "Jag heter Fido."
hund.LåtaLjud();    // Hunds egen override — "Voff!"

katt.Presentera();   // ärvd från Djur — "Jag heter Luna."
katt.LåtaLjud();    // Katts egen override — "Mjau!"
```

## Lägg till ett nytt djur — minimal kod

Det är här arv verkligen lönar sig. För att lägga till en kanin behöver du bara:

```csharp
class Kanin : Djur
{
    public Kanin(string namn) : base(namn) { }

    public override void LåtaLjud()
    {
        Console.WriteLine("Nöff!");
    }
}
```

`Presentera()` fungerar direkt — ingen ändring någonstans. Det är poängen med arv.

## `virtual` vs `override` — en sammanfattning

| Nyckelord | Var? | Vad gör det? |
|-----------|------|--------------|
| `virtual` | Basklassen | "Subklasser får skriva sin egen version" |
| `override` | Subklassen | "Jag skriver min egen version" |

Om du glömmer `virtual` i basklassen → `override` fungerar inte.  
Om du glömmer `override` i subklassen → basklassens version körs.

## De tre nyckelorden

```csharp
class Hund : Djur           // arv — Hund är en Djur
{
    public Hund(string namn)
        : base(namn) { }    // kedja konstruktorer

    public override void LåtaLjud()  // skriv över virtual-metod
    {
        Console.WriteLine("Voff!");
    }
}
```

Kom ihåg: `: Djur` · `: base(...)` · `override`
