---
title: Slutna hierarkier
description: "Slutna hierarkier och slutna enums i OOP — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Objektorienterad programmering (OOP)
nav_order: 68
---
# Slutna hierarkier

En sluten hierarki (`closed`) talar om för kompilatorn att inga fler underklasser kan läggas till utanför denna assembly. Kompilatorn kan då kontrollera att en `switch` täcker alla möjliga typer — precis som med en union-typ eller en `closed enum`.

## När du läst detta ska du kunna

- Märka en klasshierarki som `closed`
- Märka en enum som `closed`
- Skriva switch-uttryck utan `default`-fall när hierarkin är sluten
- Förklara skillnaden mot `sealed`

## closed class-hierarki

```csharp
public closed abstract class Notification
{
    public record Email(string To, string Subject) : Notification;
    public record Push(string DeviceId, string Title) : Notification;
    public record Sms(string PhoneNumber, string Text) : Notification;
}
```

`closed` innebär att `Notification` bara kan ha dessa tre underklasser. Kod utanför assemblyn kan inte lägga till fler.

### Exhaustive switch

```csharp
void Send(Notification notification)
{
    switch (notification)
    {
        case Notification.Email(var to, var subject):
            Console.WriteLine($"E-post till {to}: {subject}");
            break;
        case Notification.Push(var device, var title):
            Console.WriteLine($"Push till {device}: {title}");
            break;
        case Notification.Sms(var phone, var text):
            Console.WriteLine($"SMS till {phone}: {text}");
            break;
        // Inget default behövs — kompilatorn vet att dessa tre täcker allt
    }
}
```

Lägger du till `Webhook` i hierarkin utan att uppdatera switchen → kompileringsfel.

## closed enum

```csharp
public closed enum Status
{
    Active,
    Inactive,
    Pending,
    Archived
}
```

En vanlig enum kräver ett `default`-fall i switch eftersom någon kan casta ett godtyckligt heltal till enum-typen. En `closed enum` garanterar att inga okända värden förekommer, så `default` är onödigt:

```csharp
// Med vanlig enum — default krävs
string Label(Status s) => s switch
{
    Status.Active   => "Aktiv",
    Status.Inactive => "Inaktiv",
    Status.Pending  => "Väntande",
    Status.Archived => "Arkiverad",
    _               => throw new ArgumentOutOfRangeException()
};

// Med closed enum — ingen default, kompilatorn kontrollerar täckningen
string Label(Status s) => s switch
{
    Status.Active   => "Aktiv",
    Status.Inactive => "Inaktiv",
    Status.Pending  => "Väntande",
    Status.Archived => "Arkiverad"
};
```

## Skillnad mot sealed

| | `sealed` | `closed` |
|--|----------|----------|
| Påverkar | En enskild klass — inga underklasser | Hela hierarkin — kompilatorn vet alla subtyper |
| switch exhaustiveness | Nej | Ja |
| Kan användas på | Klasser | Klasser och enums |

`sealed` stoppar arv från en specifik klass. `closed` ger kompilatorn information om den *fulla* mängden möjliga subtyper.

## Kombinera med union-typer

`closed` hierarkier och union-typer löser liknande problem. Union-typer är kompaktare för enkel data:

```csharp
// Union-typ — kompakt
public union Color { case Red(); case Green(); case Blue(); }

// Closed hierarki — mer flexibel, kan ha metoder och state
public closed abstract class Color
{
    public abstract string HexCode { get; }
    public record Red() : Color    { public override string HexCode => "#FF0000"; }
    public record Green() : Color  { public override string HexCode => "#00FF00"; }
    public record Blue() : Color   { public override string HexCode => "#0000FF"; }
}
```

## TL;DR

```csharp
public closed enum Direction { North, South, East, West }

string Arrow(Direction d) => d switch
{
    Direction.North => "↑",
    Direction.South => "↓",
    Direction.East  => "→",
    Direction.West  => "←"
    // Inget default — kompilatorn garanterar att alla fall täcks
};
```

Använd `closed` när du vill att kompilatorn ska hjälpa dig att inte missa ett fall i en switch.
