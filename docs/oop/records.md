---
title: Records
description: "Records kom med C# 9 (2020) — se Språkhistorik — som ett svar på ett återkommande behov: enkla dataklasser som jämförs på innehåll, inte på identitet, och…"
parent: Objektorienterad programmering (OOP)
nav_order: 38
---

# Records

Records kom med C# 9 (2020) — se [Språkhistorik](../grunder/sprakhistorik.md) — som ett svar på ett återkommande behov: enkla dataklasser som jämförs på *innehåll*, inte på *identitet*, och som helst inte borde kunna ändras efter att de skapats.

## När du läst detta ska du kunna

- Skriva en record med positionssyntax
- Förklara skillnaden mellan värdelikhet (record) och referenslikhet (class)
- Använda `with`-uttryck för att skapa en modifierad kopia

## Grundsyntax

```csharp
public record Person(string Namn, int Ålder);

var anna  = new Person("Anna", 30);
var kopia = new Person("Anna", 30);

Console.WriteLine(anna == kopia);        // True
Console.WriteLine(anna.Equals(kopia));   // True
```

En rad — och du får en klass med properties, konstruktor, `Equals`, `GetHashCode` och en läsbar `ToString()` helt gratis.

## Varför spelar det här roll?

Det här är inte bara bekvämlighet — det löser ett verkligt problem: **kan du lita på att datan inte tystnat ändrats på vägen genom din kod?**

Tänk dig en banktransaktion som skickas genom flera lager — valideras, loggas, skickas vidare till ett betalningssystem. Med en vanlig muterbar klass kan *vilken metod som helst* längs vägen ändra ett fält, av misstag eller avsikt, utan att det syns någonstans. Ett `Belopp` som plötsligt är fel efter tre metodanrop är notoriskt svårt att felsöka — du vet inte *var* det ändrades.

Med en `record` är det garanterat omöjligt. `Belopp` kan bara sättas när transaktionen skapas. Behöver en senare del av flödet en "ändrad" version — t.ex. en avgift dragen — måste den skapa en **ny** transaktion med `with`, aldrig mutera originalet. Det ger dig ett spårbart flöde: varje steg som faktiskt ändrar något gör det explicit, synligt, och lämnar originalet orört.

Det är därför records är särskilt värdefulla inom bank, ekonomi och andra domäner där du måste kunna bevisa att data inte manipulerats mellan två punkter i systemet — oföränderlighet är inte bara en språkfunktion där, det är ett krav.

## Jämför med en vanlig klass

```csharp
public class PersonKlass
{
    public string Namn { get; } // observera att set inte finns
    public int Ålder { get; } // alla records är omutbara (oföränderliga)

    public PersonKlass(string namn, int ålder)
    {
        Namn = namn;
        Ålder = ålder;
    }
}

var a = new PersonKlass("Anna", 30);
var b = new PersonKlass("Anna", 30);

Console.WriteLine(a == b);   // False — olika objekt i minnet, trots samma innehåll
```

Det här är kärnskillnaden:

| | `class` | `record` |
|---|---|---|
| `==` jämför | **Referens** — är det samma objekt i minnet? | **Värde** — har alla properties samma innehåll? |
| `ToString()` | Standard: bara typnamnet | Automatiskt läsbar: `Person { Namn = Anna, Ålder = 30 }` |
| Mutabilitet | Du väljer | Tänkt att vara immutable (se nedan) |

## Immutability och `with`

Properties skapade av positionssyntax (`Person(string Namn, int Ålder)`) blir `init`-only — de kan sättas vid skapandet, men inte ändras efteråt. Vill du ha ett "ändrat" objekt skapar du en kopia med `with`:

```csharp
var anna    = new Person("Anna", 30);
var annaFyller = anna with { Ålder = 31 };

Console.WriteLine(anna.Ålder);         // 30 — oförändrad
Console.WriteLine(annaFyller.Ålder);   // 31 — ny instans
```

`with` kopierar alla properties och skriver bara över de du anger. Originalet rörs aldrig.

## Record vs POCO/DTO

Records passar naturligt för samma roll som ofta fylldes av enkla POCO-klasser — se [POCO och DTO](poco-dto.md). Skillnaden är att en record ger dig värdelikhet och immutability utan att du behöver skriva `Equals`/`GetHashCode` för hand, vilket gör den till ett naturligt förstahandsval för data som representerar "ett värde vid en viss tidpunkt" — t.ex. en DTO som skickas mellan lager i en applikation.

## Record struct

Precis som `class`/`struct` finns som par, finns `record`/`record struct` (C# 10) — samma värdelikhet och `with`-stöd, men med värdesemantik (kopieras vid tilldelning) istället för referenssemantik.

```csharp
public record struct Punkt(int X, int Y);
```

## TL;DR

En `record` ger dig värdelikhet (`==` jämför innehåll, inte identitet), automatisk `ToString()`, och `init`-only properties du modifierar via kopior med `with`. Använd den för data som ska jämföras på innehåll och helst inte muteras — vanliga `class` fortfarande för objekt med beteende och muterbart tillstånd.
