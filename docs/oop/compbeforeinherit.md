---
title: "Komposition över arv"
description: "Arv modellerar \"är en\". Komposition modellerar \"har en\". När du blandar ihop beteenden som inte hänger ihop hierarkiskt, är komposition ofta den enklare vägen."
parent: "Objektorienterad programmering (OOP)"
nav_order: 50
---

# Komposition över arv

I [Arv](arv.md) byggde vi `Enemy` och `Hero` som ärver från `Character`. Det fungerar bra så länge alla karaktärer bara skiljer sig åt i **en** dimension — hur de låter, till exempel. Problemet uppstår när de skiljer sig åt i **flera** dimensioner samtidigt.

## Var arv börjar krångla

Säg att spelet växer. Nu behöver karaktärer flyga *eller* inte, simma *eller* inte, ha vapen *eller* inte — i alla kombinationer.

```csharp
class FlyingSwimmingArmedCharacter : Character { }
class FlyingArmedCharacter : Character { }
class SwimmingArmedCharacter : Character { }
class FlyingCharacter : Character { }
// ... och så vidare, för varje kombination
```

Det här kallas en **kombinatorisk explosion** — en klass per kombination av egenskaper. Fyra oberoende egenskaper ger upp till sexton klasser. Lägg till en femte och det dubblas igen. Arv är fel verktyg när egenskaperna inte bildar en naturlig hierarki, utan bara kan kombineras fritt.

## Lösningen: bygg av delar istället för att ärva ner

Komposition modellerar **"har en"** istället för **"är en"**: en `Character` *har* en förmåga att flyga, snarare än att *vara* en `FlyingCharacter`.

```csharp
interface IMovable
{
    void Move();
}

class Flying : IMovable
{
    public void Move() => Console.WriteLine("Flyger genom luften.");
}

class Swimming : IMovable
{
    public void Move() => Console.WriteLine("Simmar genom vattnet.");
}

class Character
{
    private readonly IMovable _movement;

    public Character(IMovable movement)
    {
        _movement = movement;
    }

    public void Move() => _movement.Move();
}
```

```csharp
var eagle = new Character(new Flying());
var shark = new Character(new Swimming());

eagle.Move();   // Flyger genom luften.
shark.Move();   // Simmar genom vattnet.
```

Ingen klasshierarki att bygga ut. Ny rörelsetyp? Skriv en klass till som implementerar `IMovable` — inga befintliga klasser rörs.

## Flera oberoende egenskaper samtidigt

Samma idé skalar till flera egenskaper genom att sätta ihop flera komponenter, en per ansvarsområde:

```csharp
class Character
{
    private readonly IMovable _movement;
    private readonly IAttacker? _weapon;   // null = obeväpnad

    public Character(IMovable movement, IAttacker? weapon = null)
    {
        _movement = movement;
        _weapon = weapon;
    }

    public void Move() => _movement.Move();
    public void Attack() => _weapon?.Attack();
}
```

Flygande och beväpnad, simmande och obeväpnad, eller någon annan kombination — samma `Character`-klass, olika komponenter skickade in. Ingen ny klass krävs för varje kombination, till skillnad från arvsversionen.

## Så väljer du

| Fråga | Svar pekar mot |
|---|---|
| Är det en tydlig "är en"-relation? (`Dog` är ett `Animal`) | Arv |
| Skiljer sig objekten i flera oberoende dimensioner? | Komposition |
| Behöver beteendet bytas ut vid körning? | Komposition (byt ut komponenten) |
| Är hierarkin högst ett eller två steg djup och stabil? | Arv är okej |

De utesluter inte varandra. `Character` kan fortfarande ärva grundläggande properties som `Name` och `Health` (se [Arv](arv.md)) samtidigt som den bygger ihop sitt beteende av utbytbara komponenter. Många robusta designer använder båda — en tunn, stabil arvshierarki för det som verkligen är en "är en"-relation, och komposition för allt som varierar fritt.

## Obligatorisk dad-joke

Varför gick spelkaraktären till IKEA istället för till familjeträdet?

Den ville byggas av delar den kunde byta ut senare.
