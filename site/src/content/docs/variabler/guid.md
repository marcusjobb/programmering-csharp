---
title: Guid
description: "Guid i Variabler — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Variabler
nav_order: 64
---
# Guid

En Guid (Globally Unique Identifier) är ett 128-bitars tal som genereras så att sannolikheten för en kollision är astronomiskt liten. I praktiken: du kan generera ett Guid var som helst i världen och det kommer aldrig att krocka med ett annat.

```
3f2504e0-4f89-11d3-9a0c-0305e82c3301
```

Det ser konstigt ut, men det är exakt vad det är — ett unikt id.

## När du läst detta ska du kunna

- Generera ett nytt Guid med `Guid.NewGuid()`
- Formatera och parsa Guid
- Veta när Guid är rätt val för ett ID
- Känna till `Guid.Empty`

## Skapa ett Guid

```csharp
Guid id = Guid.NewGuid();
Console.WriteLine(id);  // T.ex. 3f2504e0-4f89-11d3-9a0c-0305e82c3301
```

Varje anrop till `NewGuid()` ger ett unikt värde. Kör du det en miljon gånger får du en miljon olika Guids.

## Guid som typ

`Guid` är en struct i .NET — en värdetyp, precis som `int` och `DateTime`.

```csharp
Guid id = Guid.NewGuid();
Guid id = Guid.NewGuid();

Console.WriteLine(id == id);  // False — alltid unika
```

## Formatera

`ToString()` med olika formatspecificerare:

```csharp
Guid id = Guid.NewGuid();

Console.WriteLine(id.ToString());      // 3f2504e0-4f89-11d3-9a0c-0305e82c3301
Console.WriteLine(id.ToString("N"));   // 3f2504e04f8911d39a0c0305e82c3301  (utan bindestreck)
Console.WriteLine(id.ToString("B"));   // {3f2504e0-4f89-11d3-9a0c-0305e82c3301}  (med klamrar)
Console.WriteLine(id.ToString("D"));   // 3f2504e0-4f89-11d3-9a0c-0305e82c3301  (standard)
```

Standardformatet (`"D"` eller utan argument) är det du ser nästan överallt — med bindestreck, utan klamrar.

## Parsa ett Guid

```csharp
string text = "3f2504e0-4f89-11d3-9a0c-0305e82c3301";

Guid id = Guid.Parse(text);
Console.WriteLine(id);  // 3f2504e0-4f89-11d3-9a0c-0305e82c3301

// Säker parsing
if (Guid.TryParse("inte-ett-guid", out Guid result))
    Console.WriteLine(result);
else
    Console.WriteLine("Ogiltigt Guid");
```

## Guid.Empty

`Guid.Empty` är ett Guid med alla nollor — ofta använt som "inget id satt ännu".

```csharp
Guid id = Guid.Empty;
Console.WriteLine(id);                  // 00000000-0000-0000-0000-000000000000
Console.WriteLine(id == Guid.Empty);    // True
```

Kontrollera om ett Guid är tomt:

```csharp
Guid customerId = Guid.Empty;

if (customerId == Guid.Empty)
    Console.WriteLine("Ingen kund tilldelad ännu");
```

## Praktiskt exempel

```csharp
class Order
{
    public Guid Id { get; } = Guid.NewGuid();
    public string Product { get; set; }
    public decimal Price { get; set; }
}

var order1 = new Order { Product = "Kaffe", Price = 49.90m };
var order2 = new Order { Product = "Te", Price = 39.90m };

Console.WriteLine($"Order {order1.Id}: {order1.Product}");
Console.WriteLine($"Order {order2.Id}: {order2.Product}");
```

### Output

```
Order 7c9e6679-7425-40de-944b-e07fc1f90ae7: Coffee
Order 0c08add9-7a9e-4b30-9e1d-3c7cc2c5c6a7: Te
```

## När ska du använda Guid?

| Situation | Lämpligt ID |
|-----------|-------------|
| Databas utan distribuerat system | Auto-increment (`int`) — enkelt och kompakt |
| Distribuerat system / flera databaser | `Guid` — genereras lokalt, garanterat unikt |
| URL som inte ska gissas | `Guid` — svårt att gissa |
| Temporära filer | `Guid` — enkelt unikt filnamn |

```csharp
// Unikt filnamn
string fileName = $"export_{Guid.NewGuid()}.csv";
Console.WriteLine(fileName);  // export_7c9e6679-7425-40de-944b-e07fc1f90ae7.csv
```

## TL;DR

`Guid.NewGuid()` genererar ett globalt unikt ID. Använd det när du behöver unika identifierare utan en central räknare — databaser i distribuerade system, temporära filer, eller resurser som skapas lokalt. `Guid.Empty` är noll-värdet för Guid, motsvarigheten till `null` för referenstyper.
