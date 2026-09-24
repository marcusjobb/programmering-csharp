---
title: "Lästext — Arv"
description: "Arv (inheritance) är ett av de viktigaste koncepten i objektorienterad programmering. Det låter dig bygga nya klasser som återanvänder kod från befintliga…"
parent: "Objektorienterad programmering (OOP)"
nav_order: 22
---

# Lästext — Arv

Arv (inheritance) är ett av de viktigaste koncepten i objektorienterad programmering. Det låter dig bygga nya klasser som återanvänder kod från befintliga klasser — utan att kopiera den.

## Problemet arv löser

Tänk dig att du bygger `Dog` och `Cat` var för sig:

```csharp
class Dog
{
    private string _name;
    public Dog(string name) { _name = name; }
    public void Present() => Console.WriteLine($"Jag heter {_name}.");
    public void PlaySound()  => Console.WriteLine("Voff!");
}
```

```csharp
class Cat
{
    private string _name;
    public Cat(string name) { _name = name; }
    public void Present() => Console.WriteLine($"Jag heter {_name}.");
    public void PlaySound()  => Console.WriteLine("Mjau!");
}
```

`Present()` är **exakt samma** i båda klasserna — rad för rad. Vill du lägga till en `_age`? Ändra på **två ställen**. Vill du lägga till kaniner? En klass till med samma `Present()`.

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
class Animal
{
    public string Name { get; private set; }

    public Animal(string name)
    {
        Name = name;
    }

    public void Present()
    {
        Console.WriteLine($"Jag heter {Name}.");
    }

    public virtual void PlaySound() { }
}
```

`Present()` skrivs **en gång** i `Animal`. Nyckelordet `virtual` markerar att subklasser får skriva sin egen version av `PlaySound`.

## Subklasserna ärver

En subklass är ett "barn" till basklassen — den ärver allt som inte är `private`.

`Present()` finns i `Animal`. `Dog` och `Cat` får den gratis — ingen kopiering.

## `virtual` och `override`

Regeln kallas "öppen för arv, stängd för ändringar". Du har djur med olika beteenden — samma grund, men de agerar annorlunda. Istället för en massa if-satser i basklassen skapar du subklasser som ärver basklassen och skriver om specifika metoder.

```csharp
class Animal
{
    public virtual void PlaySound() { }   // vet inte — gör ingenting
}

class Dog : Animal
{
    public override void PlaySound() => Console.WriteLine("Voff!");
}

class Cat : Animal
{
    public override void PlaySound() => Console.WriteLine("Mjau!");
}
```

## Konstruktorn i en subklass

En subklass måste sätta i gång basklassens konstruktor med `: base(...)`:

```csharp
class Dog : Animal
{
    public Dog(string name) : base(name) { }

    public override void PlaySound()
    {
        Console.WriteLine("Voff!");
    }
}
```

- `: Animal` — Hund är en Djur
- `: base(name)` — anropar basklassens konstruktor med `name`
- `override` — skriver över basklassens `PlaySound`

```csharp
class Cat : Animal
{
    public Cat(string name) : base(name) { }

    public override void PlaySound()
    {
        Console.WriteLine("Mjau!");
    }
}
```

## `base(...)` — konstruktorkedjan

```csharp
class Animal
{
    public string Name { get; private set; }

    public Animal(string name)
    {
        Name = name;
    }
}

class Dog : Animal
{
    public Dog(string name) : base(name) { }
}
```

`: base(name)` skickar `name` upp till `Animal`. Utan det vet inte `Animal` vad `Name` ska vara.

## Klassdiagram

```
┌──────────────────────────────┐
│            Animal            │  ← baseClass
├──────────────────────────────┤
│ + Name : string               │
├──────────────────────────────┤
│ + Animal(name)                │
│ + Present()                   │
│ + virtual PlaySound()         │
└──────────────────────────────┘

        ▲                 ▲
        │                 │
┌──────────────┐  ┌──────────────┐
│     Dog      │  │     Cat      │  ← subclasses
├──────────────┤  ├──────────────┤
│ override     │  │ override     │
│ PlaySound    │  │ PlaySound    │
└──────────────┘  └──────────────┘
```

Pilen pekar uppåt — subklassen ärver från basklassen.

## Sätt ihop det i Main

```csharp
Dog dog = new Dog("Fido");
Cat cat = new Cat("Luna");

dog.Present();   // ärvd från Djur — "Jag heter Fido."
dog.PlaySound();    // Hunds egen override — "Voff!"

cat.Present();   // ärvd från Djur — "Jag heter Luna."
cat.PlaySound();    // Katts egen override — "Mjau!"
```

## Lägg till ett nytt djur — minimal kod

Det är här arv verkligen lönar sig. För att lägga till en kanin behöver du bara:

```csharp
class Rabbit : Animal
{
    public Rabbit(string name) : base(name) { }

    public override void PlaySound()
    {
        Console.WriteLine("Nöff!");
    }
}
```

`Present()` fungerar direkt — ingen ändring någonstans. Det är poängen med arv.

## `virtual` vs `override` — en sammanfattning

| Nyckelord | Var? | Vad gör det? |
|-----------|------|--------------|
| `virtual` | Basklassen | "Subklasser får skriva sin egen version" |
| `override` | Subklassen | "Jag skriver min egen version" |

Om du glömmer `virtual` i basklassen → `override` fungerar inte.  
Om du glömmer `override` i subklassen → basklassens version körs.

## De tre nyckelorden

```csharp
class Dog : Animal           // arv — Hund är en Djur
{
    public Dog(string name)
        : base(name) { }    // kedja konstruktorer

    public override void PlaySound()  // skriv över virtual-metod
    {
        Console.WriteLine("Voff!");
    }
}
```

Kom ihåg: `: Animal` · `: base(...)` · `override`
