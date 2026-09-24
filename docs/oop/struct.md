---
title: Struct
description: "Du har redan sett struct nämnd i förbifarten — int, double och bool är alla structs under huven. Det här är sidan som förklarar vad det faktiskt betyder…"
parent: Objektorienterad programmering (OOP)
nav_order: 11
---

# Struct

Du har redan sett `struct` nämnd i förbifarten — `int`, `double` och `bool` är alla structs under huven. Det här är sidan som förklarar vad det faktiskt betyder, och när du bör skriva en egen.

## När du läst detta ska du kunna

- Skriva en egen `struct`
- Förklara varför en struct skickas som kopia, inte referens
- Avgöra om `struct` eller `class` är rätt val för en given typ
- Känna till begränsningarna — vad en struct inte kan göra

## Grundsyntax

```csharp
struct Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }
}
```

Ser nästan identisk ut med en klass — skillnaden ligger inte i syntaxen, utan i hur den beter sig i minnet.

## Den avgörande skillnaden — värde, inte referens

En `struct` är en **värdetyp**. Se [Värde- och referenstyper](../metoder/varde-och-referenstyper.md) för hela bakgrunden, men kärnan är:

```csharp
struct Point { public int X; public int Y; }
class  PointClass { public int X; public int Y; }

// struct — kopieras
Point p1 = new Point { X = 1, Y = 1 };
Point p2 = p1;         // p2 är en HELT NY kopia
p2.X = 99;
Console.WriteLine(p1.X);   // 1 — p1 opåverkad

// class — delar referens
PointClass c1 = new PointClass { X = 1, Y = 1 };
PointClass c2 = c1;    // c2 pekar på SAMMA objekt som c1
c2.X = 99;
Console.WriteLine(c1.X);   // 99 — c1 ändrades också!
```

Tilldelning (`=`), metodargument och returvärden kopierar hela structen varje gång. För en liten struct (ett par `int`) är det billigt. För en stor struct med många fält kan det bli en riktig prestandakostnad — kopian tar plats och tid, till skillnad från en referens som alltid är lika stor oavsett hur stort objektet är.

## Vad en struct inte kan göra

Structs är medvetet begränsade jämfört med klasser:

| Begränsning | Detalj |
|---|---|
| **Ingen arv** | En struct kan inte ärva från en annan struct eller class (bara implicit från `System.ValueType`) |
| **Kan inte ärvas från** | Andra typer kan inte ärva en struct — `sealed` i praktiken, alltid |
| **Kan implementera interfaces** | Det är tillåtet — en struct kan implementera `IComparable<T>` osv, bara inte ärva klasser |
| **Kan inte vara `null`** | En struct har alltid ett värde — vill du tillåta "inget värde", använd `Point?` (nullable), se [Nullable typer](../variabler/nullable.md) |

## Default-konstruktorn

En struct har alltid en implicit parameterlös konstruktor som nollställer alla fält — den går inte att ta bort:

```csharp
struct Point { public int X; public int Y; }

Point origin = new Point();   // X=0, Y=0 automatiskt
Point also   = default;       // Exakt samma sak
```

Det är därför `int x = default;` ger `0` — `int` är en struct, och `default` kör den implicita nollställningskonstruktorn.

## Boxing — när en struct blir en referens ändå

Skickar du en struct dit en `object` förväntas, "boxas" den — en kopia läggs på heapen och hanteras som en referenstyp därifrån:

```csharp
Point p = new Point(1, 2);
object boxed = p;              // Boxing — kopia hamnar på heapen

Point unboxed = (Point)boxed;  // Unboxing — kopieras tillbaka
```

Boxing kostar prestanda (en heap-allokering du annars hade sluppit) och är en vanlig, osynlig källa till onödig belastning i kod som blandar structs med `object`, `ArrayList` eller icke-generiska API:er. Det är en av anledningarna till att generics (se [Generics](../datastrukturer/generics.md)) är att föredra — `List<Point>` boxar aldrig, `ArrayList` med `Point`-objekt gör det för varje element.

## readonly struct

Vill du garantera att en struct aldrig muteras efter skapandet — vilket ofta är en bra idé, se resonemanget om oföränderlighet i [Records](records.md) — markera hela structen `readonly`:

```csharp
readonly struct Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y) => (X, Y) = (x, y);
}
```

Kompilatorn garanterar då att inget fält kan ändras efter konstruktion — bryter du mot det är det ett kompileringsfel, inte ett buggigt beteende du upptäcker senare.

## När struct, när class?

| Använd `struct` när | Använd `class` när |
|---|---|
| Typen är liten (tumregel: några få fält) | Typen har många fält eller är stor |
| Typen representerar ett enkelt värde (koordinat, pengar, färg) | Typen representerar en identitet eller har beteende |
| Du vill undvika onödiga heap-allokeringar i tajta loopar | Objektet ska delas och muteras av flera delar av koden |
| Jämförelse ska vara på innehåll, inte identitet | Du behöver arv |

I praktiken: `class` är standardvalet. Ta till `struct` när du medvetet vill ha värdesemantik för en liten, väldefinierad datatyp — inte som standard "för att det är snabbare". Fel använd kan en stor struct som kopieras runt i onödan vara **långsammare** än motsvarande class.

## record struct

Vill du ha en struct med samma bekvämligheter som [records](records.md) — automatisk `Equals`, `ToString()`, `with`-uttryck — men med värdesemantik, finns `record struct` (C# 10):

```csharp
public record struct Point(int X, int Y);

var a = new Point(1, 2);
var b = new Point(1, 2);
Console.WriteLine(a == b);   // True — värdelikhet, precis som record

var c = a with { X = 99 };   // Ny kopia, a är opåverkad
```

## TL;DR

En `struct` är en värdetyp — den kopieras vid tilldelning och metodanrop, kan inte vara `null` och kan inte ärvas. Använd den för små, enkla värden där kopiering är billig och identitet inte spelar någon roll. Standardvalet är fortfarande `class` — välj `struct` medvetet, inte per reflex.
