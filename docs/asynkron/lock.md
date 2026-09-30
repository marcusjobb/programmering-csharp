---
title: Lock
description: "System.Threading.Lock — den nya lås-typen i C# — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Asynkron
nav_order: 15
---
# Lock

När flera trådar delar på data måste du skydda åtkomsten med ett lås. C# 13 introducerade `System.Threading.Lock` — en dedikerad lås-typ som ersätter det gamla mönstret med `lock(object)`.

## När du läst detta ska du kunna

- Förklara varför lås behövs vid flertrådad kod
- Använda `Lock` med `lock`-satsen
- Använda `Lock.EnterScope()` för mer kontroll
- Förklara skillnaden mot det gamla `lock(object)`-mönstret

## Problemet — race condition

Utan lås kan två trådar skriva till samma variabel samtidigt och ge fel resultat:

```csharp
int counter = 0;

// Två trådar ökar räknaren 1000 gånger var
var t1 = Task.Run(() => { for (int i = 0; i < 1000; i++) counter++; });
var t2 = Task.Run(() => { for (int i = 0; i < 1000; i++) counter++; });

await Task.WhenAll(t1, t2);

Console.WriteLine(counter);  // Borde vara 2000, men är ofta t.ex. 1847
```

`counter++` är inte atomär — läs, addera, skriv. Trådarna stör varandra.

## Gamla sättet — lock(object)

```csharp
private readonly object _lock = new object();

void IncrementSafely()
{
    lock (_lock)
    {
        counter++;
    }
}
```

Det fungerar, men `object` ger ingen typinformation — kompilatorn vet inte att det är ett lås.

## Nya sättet — System.Threading.Lock

```csharp
private readonly Lock _lock = new Lock();

void IncrementSafely()
{
    lock (_lock)   // fungerar precis som förut — men typen är Lock, inte object
    {
        counter++;
    }
}
```

`lock`-satsen känner igen `Lock`-typen och använder en mer effektiv implementation under huven.

## Praktiskt exempel

```csharp
public class SafeCounter
{
    private readonly Lock _lock = new Lock();
    private int _count;

    public void Increment()
    {
        lock (_lock)
            _count++;
    }

    public int Count => _count;
}
```

```csharp
var counter = new SafeCounter();

var tasks = Enumerable.Range(0, 10)
    .Select(_ => Task.Run(() =>
    {
        for (int i = 0; i < 1000; i++)
            counter.Increment();
    }));

await Task.WhenAll(tasks);

Console.WriteLine(counter.Count);   // alltid 10000
```

## EnterScope — explicit kontroll

`Lock.EnterScope()` ger ett `IDisposable`-scope som du använder med `using`. Det låter dig kontrollera exakt när låset tas och släpps:

```csharp
private readonly Lock _lock = new Lock();

void UpdateData(List<int> data, int value)
{
    using (_lock.EnterScope())
    {
        data.Add(value);
        data.Sort();
    }
    // Låset är släppt här — utanför using-blocket
}
```

`EnterScope()` är semantiskt identisk med `lock (_lock) { }` men ibland mer läsbar när låsblocket är långt.

## Skillnad mot object

| | `lock(object)` | `lock(Lock)` |
|--|----------------|-------------|
| Typinfo för kompilatorn | Nej | Ja |
| Prestanda | Bra | Bättre (optimerad implementering) |
| `EnterScope()` | Nej | Ja |
| Bakåtkompatibel syntax | ✓ | ✓ |

## Vad ett lås inte löser

- **Deadlock**: om tråd A håller lås 1 och väntar på lås 2, medan tråd B håller lås 2 och väntar på lås 1 — båda väntar för alltid
- **Starvation**: en tråd kan aldrig få låset om andra alltid hinner först
- **Onödig serialisering**: för stora lås-block tar bort fördelen med parallellism

Håll lås-block så korta som möjligt.

## TL;DR

```csharp
// Deklarera
private readonly Lock _lock = new Lock();

// Använd — precis som lock(object) men med bättre typ
lock (_lock)
{
    // skyddad kod här
}

// Alternativt med using
using (_lock.EnterScope())
{
    // skyddad kod här
}
```

`Lock` ersätter `new object()` som låstoken. Syntaxen är identisk — bytet är en enradsändring.
