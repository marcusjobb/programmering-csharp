---
title: Flödesscheman
description: "Flödesscheman i Diagram — C#-boken av Marcus Ackre Medina"
layout: default
parent: Diagram
nav_order: 10
---
# Flödesscheman och pseudokod

En bra programmerare skriver inte direkt kod. De **tänker igenom problemet först**.

```
Problem → Plan → Code
```

Det är mycket lättare att rätta till en plan på papper än att rätta till kod som inte fungerar.

## När du läst detta ska du kunna

- Rita ett enkelt flödesschema med rätt symboler
- Skriva pseudokod för ett program
- Översätta pseudokod till C#

## Fyra grundformer

| Symbol | Form | Användning |
|--------|------|-----------|
| Oval | Start / Slut | Var programmet börjar och slutar |
| Rektangel | Handling | Beräkna, skriva ut, spara ett värde |
| Romb | Beslut | En fråga med ja/nej — leder till olika vägar |
| Pil | Flöde | Visar i vilken riktning programmet går |

## Exempel — Ska jag ta med paraply?

```
         ┌─────────────┐
         │    START    │
         └──────┬──────┘
                │
         ┌──────▼──────┐
         │ Regnar det? │
         └──┬───────┬──┘
           Ja      Nej
            │       │
    ┌───────▼───┐ ┌─▼──────────────┐
    │ Ta paraply│ │ Lämna paraply  │
    └───────┬───┘ └─┬──────────────┘
            │       │
         ┌──▼───────▼──┐
         │    Gå ut    │
         └──────┬──────┘
                │
         ┌──────▼──────┐
         │     SLUT    │
         └─────────────┘
```

## Pseudokod — logiken med ord

Pseudokod är ett mellansteg — varken kod eller vanlig text. Skriv logiken på svenska (eller engelska), utan att bry dig om syntax.

```
START
  Om det regnar
    Ta med paraply
  Annars
    Lämna paraplyet hemma
  Slut om
  Gå ut
SLUT
```

Ingen kompilator kan läsa det — men du kan resonera om det utan att fastna i detaljer.

## Från pseudokod till C#

Strukturen är densamma — ord för ord:

```csharp
bool isRaining = true;

if (isRaining)
{
    Console.WriteLine("Ta med paraply!");
}
else
{
    Console.WriteLine("Lämna paraplyt hemma.");
}

Console.WriteLine("Gå ut.");
```

### Output

```
Ta med umbrella!
Go ut.
```

## Loopar i flödesscheman

En loop är en pil som **går tillbaka** — slingan upprepas tills villkoret är falskt.

```
    ┌─────────────┐
    │    START    │
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │  i = 1      │
    └──────┬──────┘
           │  ◄────────────────────────┐
    ┌──────▼──────┐                    │
    │  i <= 5?    │──No──► END       │
    └──────┬──────┘                    │
          Ja                           │
    ┌──────▼──────┐                    │
    │ Write ut i  │                    │
    └──────┬──────┘                    │
    ┌──────▼──────┐                    │
    │   i = i + 1 │────────────────────┘
    └─────────────┘
```

Pseudokod:

```
i = 1
So long i <= 5
  Write ut i
  i = i + 1
End so long
```

C#:

```csharp
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine(i);
}
```

## Övning

Rita ett flödesschema för ett program som avgör om man får köra bil:
- Personen måste vara minst 18 år
- Personen måste ha körkort

Rita på papper, skriv pseudokoden, och jämför med en klasskamrat.

## TL;DR

| Begrepp | Vad det är |
|---------|-----------|
| Flödesschema | Visuell karta — oval, rektangel, romb, pil |
| Pseudokod | Logiken på svenska, utan syntax |
| Varför | Det är lättare att rätta en plan än att rätta kod |
