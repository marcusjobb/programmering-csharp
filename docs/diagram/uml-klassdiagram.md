---
title: UML-klassdiagram
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Diagram
nav_order: 20
---
# UML-klassdiagram

UML (Unified Modeling Language) är ett gemensamt språk för att rita klasser och relationer — utan att skriva kod. Det används för att planera design och kommunicera med andra utvecklare.

## När du läst detta ska du kunna

- Rita ett UML-klassdiagram för en enkel klass
- Tolka synlighetssymbolerna `+` och `-`
- Rita relationer mellan klasser (association, komposition, arv)
- Förklara multiplicitet (1:1, 1:N, N:M)

## En klass i UML

En klass ritas som en ruta med tre sektioner:

```
┌─────────────────────────┐
│        BankAccount      │  ← klassnamn
├─────────────────────────┤
│ - owner : string        │  ← fält (privata/publika)
│ - balance : double      │
│ - isActive : bool       │
├─────────────────────────┤
│ + BankAccount(owner,    │  ← metoder / konstruktor
│     startBalance)       │
│ + Deposit(amount)       │
│ + Withdraw(amount) bool │
│ + Display()             │
└─────────────────────────┘
```

| Tecken | Betekening |
|--------|-----------|
| `-` | `private` — bara klassen kan nå det |
| `+` | `public` — synligt utifrån |
| `#` | `protected` — synligt i subklasser |

## Från UML till C#

Samma information — olika form:

```csharp
public class BankAccount
{
    private string _owner;
    private double _balance;
    private bool   _isActive;

    public BankAccount(string owner, double startBalance) { ... }
    public void   Deposit(double amount) { ... }
    public bool   Withdraw(double amount) { ... }
    public void   Display() { ... }
}
```

Rita UML-diagrammet INNAN du öppnar VS Code. Det tvingar dig att tänka igenom designen.

## Relationer

### Association — använder

```
┌────────────┐         ┌────────────┐
│   Order    │────────►│  Customer  │
└────────────┘         └────────────┘
```

En `Order` känner till en `Customer`. Pilen pekar mot den klass som används.

### Komposition — äger (stark)

```
┌────────────┐  ◆──── ┌────────────┐
│    Car     │        │   Engine   │
└────────────┘        └────────────┘
```

Motorn existerar bara som del av bilen — om bilen försvinner försvinner motorn. Fylld romb på ägarens sida.

### Aggregation — har (svag)

```
┌────────────┐  ◇──── ┌────────────┐
│  Playlist  │        │    Song    │
└────────────┘        └────────────┘
```

Spellistan innehåller låtar, men låtarna existerar även utan spellistan. Öppen romb.

### Arv — är en

```
┌────────────┐
│   Animal   │
└──────┬─────┘
       △
       │
┌──────┴─────┐
│    Dog     │
└────────────┘
```

`Dog` ärver från `Animal`. Pil med öppen triangel mot basklassen.

## Multiplicitet

Multiplicitet beskriver hur många objekt som kan vara inblandade i en relation:

| Notation | Betydelse |
|----------|-----------|
| `1` | Exakt en |
| `0..1` | Noll eller en |
| `*` | Noll till många |
| `1..*` | En till många (minst en) |

### Exempel — Bibliotek

```
┌────────────┐ 1        * ┌────────────┐ *      1 ┌────────────┐
│   Member   │────────────│    Loan    │──────────│    Book    │
├────────────┤            ├────────────┤          ├────────────┤
│ - id : int │            │ - loanDate │          │ - title    │
│ - name     │            │ - returnDate│          │ - isbn     │
│ + Borrow() │            └────────────┘          │ + GetInfo()│
└────────────┘                                    └────────────┘
```

- En `Member` kan ha noll till många `Loan`
- Ett `Loan` tillhör exakt en `Member` och refererar exakt en `Book`
- En `Book` kan vara inblandad i många `Loan`

## Verktyg

| Verktyg | Typ | Pris |
|---------|-----|------|
| draw.io | Online / offline | Gratis |
| PlantUML | Kod-baserad (text → diagram) | Gratis |
| Mermaid | I Markdown (GitHub, Obsidian) | Gratis |
| Lucidchart | Online | Freemium |
| Visual Studio | Class Designer (inbyggt) | Ingår i VS |

### Mermaid — diagram direkt i Markdown

```
classDiagram
    class BankAccount {
        -string owner
        -double balance
        +Deposit(amount)
        +Withdraw(amount) bool
    }
    class Customer {
        +string name
        +string email
    }
    BankAccount --> Customer
```

Mermaid renderas automatiskt på GitHub och i Obsidian.

## TL;DR

UML-klassdiagram = ritning av klasser. Rita den innan du kodar — inte efter.

| Symbol | Betyder |
|--------|---------|
| `-` | private |
| `+` | public |
| `────►` | association (använder) |
| `──◆──` | komposition (äger, stark) |
| `──◇──` | aggregation (har, svag) |
| `──△──` | arv (är en) |
| `1..*` | multiplicitet |
