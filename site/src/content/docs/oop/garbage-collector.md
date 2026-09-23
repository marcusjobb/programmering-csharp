---
title: Garbage Collector
description: "Garbage Collector i Objektorienterad programmering (OOP) — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Objektorienterad programmering (OOP)
nav_order: 62
---
# Garbage Collector (GC)

Garbage Collector är .NETs automatiska minneshanterar. Den spårar vilka objekt som används och frigör minnet för dem som inte längre nås.

## När du läst detta ska du kunna

- Förklara vad Garbage Collector är och vad den gör
- Beskriva skillnaden mellan heap och stack
- Förklara vad "rotreferens" innebär
- Förstå varför du nästan aldrig behöver tänka på minne i C#

## Stack och heap

C# använder två minnesutrymmen:

| | Stack | Heap |
|-|-------|------|
| **Vad lagras** | Värdetyper (int, double, bool, struct), lokala variabler | Objekt (klasser), strängar, arrayer |
| **Livstid** | Bestäms av scope — frigörs automatiskt när metoden returnerar | Bestäms av GC |
| **Hastighet** | Snabb — LIFO-stack | Lite långsammare |

```csharp
void Method()
{
    int x = 42;          // på stacken — frigörs när Metod() returnerar
    var car = new Car(); // "bil"-referensen på stacken, Bil-objektet på heapen
}
// bil-objektet på heapen lever kvar tills GC städar
```

## Hur GC vet vad den kan ta bort

GC letar efter **rötter** — aktiva variabler, statiska fält och anrop på call-stacken. Allt som kan nås från en rot är "levande". Allt som inte kan nås är skräp och kan tas bort.

```csharp
var a = new Car("Volvo");   // a pekar på ett Bil-objekt
var b = a;                   // b pekar på samma objekt
a = null;                    // a pekar inte längre dit
                             // men b gör det — objektet lever kvar
b = null;                    // nu pekar ingen dit — kan städas av GC
```

## Generationer

.NETs GC delar in heapen i tre generationer för att jobba effektivt:

| Generation | Innehåller | Städas |
|------------|-----------|--------|
| **Gen 0** | Nyskapade objekt | Ofta — snabbt |
| **Gen 1** | Objekt som överlevde Gen 0 | Ibland |
| **Gen 2** | Långlivade objekt | Sällan — långsamt |

Kortlivade objekt (t.ex. temporära variabler i loopar) städas snabbt från Gen 0. Det gör att GC inte behöver gå igenom hela heapen varje gång.

## Du behöver sällan tänka på GC

I de allra flesta C#-program behöver du inte tänka på minne alls. GC sköter det.

**Undantag** — när du håller **ohanterade resurser** (filer, databasanslutningar, nätverksanslutningar) behöver du hjälpa till med `IDisposable`:

```csharp
using var file = File.OpenRead("data.txt");  // stängs automatiskt
```

Se [Destruktor och Finalizer](destruktor.md) för detaljer.

## Manuellt anropa GC (gör inte detta i produktion)

Du kan be GC att köra, men det är nästan aldrig rätt väg:

```csharp
GC.Collect();           // trigga GC — undvik i riktig kod
GC.WaitForPendingFinalizers();  // vänta på finalizerkön
```

Manuella GC-anrop kan faktiskt göra saker **långsammare** eftersom du avbryter GC:ns optimerade schema.

## Minnesläckor i C#

Trots GC kan du orsaka minnesläckor i C# — vanligast när:

- Du prenumererar på events men aldrig avprenumererar (`+=` utan `-=`)
- Du håller statiska listor som fortsätter växa
- Du lägger till objekt i cacher utan att ta bort dem

```csharp
// Klassisk event-läcka
knapp.Click += HandleClick;   // prenumeration
// Om du aldrig skriver: knapp.Click -= HanteraKlick;
// ... lever objektet kvar så länge knappen finns
```

## TL;DR

- GC frigör minne automatiskt — du behöver nästan aldrig tänka på det
- Objekt på heapen lever tills inget refererar till dem
- Tre generationer (0, 1, 2) gör GC effektiv för kortlivade objekt
- Ohanterade resurser (filer, anslutningar) hanteras med `IDisposable` + `using`
- Undvik `GC.Collect()` — lita på GC:ns eget schema
