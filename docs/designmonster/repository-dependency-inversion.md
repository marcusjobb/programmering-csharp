---
title: Repository och Dependency Inversion
description: "Problemet: kod som pratar direkt med Entity Framework (eller SQL, eller en fil) blandar affärslogik med detaljer om var datan råkar ligga. Byter du…"
parent: Designmönster
nav_order: 20
---

# Repository och Dependency Inversion

## När du läst detta ska du kunna

- Förklara vad Repository-mönstret gömmer undan
- Förklara Dependency Inversion-principen — och skillnaden mot dependency injection

## Repository — göm undan datakällan

Problemet: kod som pratar direkt med [Entity Framework](../entityframework/index.md) (eller SQL, eller en fil) blandar affärslogik med detaljer om *var* datan råkar ligga. Byter du datakälla, eller vill testa utan en riktig databas, sitter du fast.

```csharp
public interface IKundRepository
{
    Kund? HämtaMedId(int id);
    void Lägg Till(Kund kund);
}

public class EfKundRepository : IKundRepository
{
    private readonly AppDbContext _context;
    public EfKundRepository(AppDbContext context) => _context = context;

    public Kund? HämtaMedId(int id) => _context.Kunder.Find(id);
    public void LäggTill(Kund kund) => _context.Kunder.Add(kund);
}
```

Resten av applikationen pratar bara med `IKundRepository`. Vid test kan du ge den en `FakeKundRepository` som håller sina kunder i en vanlig `List<T>` — ingen databas krävs.

## Dependency Inversion — principen bakom

Det här är "D" i SOLID, och det är en **princip**, inte kod: *högnivåkod ska bero på abstraktioner (interfaces), inte på konkreta lågnivådetaljer.*

```csharp
// Fel väg — OrderService beror direkt på en konkret EF-klass
public class OrderService
{
    private readonly EfKundRepository _repo = new();
}

// Rätt väg — OrderService beror på ett interface
public class OrderService
{
    private readonly IKundRepository _repo;
    public OrderService(IKundRepository repo) => _repo = repo;
}
```

Skillnaden är subtil men avgörande: `OrderService` vet fortfarande inte, och bryr sig inte om, huruvida kunderna kommer från EF, en fil eller ett minneslager. Beroendet pekar mot abstraktionen — därav namnet, principen "vänder om" det naturliga beroendet mot en konkret implementation.

## Dependency Inversion vs Dependency Injection — inte samma sak

De här två termerna blandas ofta ihop, men de svarar på olika frågor:

| | Vad det är | Frågan den svarar på |
|---|---|---|
| **Dependency Inversion** | En designprincip | *Vem ska en klass bero på — konkreta klasser eller interfaces?* |
| **Dependency Injection** | En teknik | *Hur får klassen tag i den instans den behöver?* |

`OrderService`-exemplet ovan följer Dependency Inversion — konstruktorn tar ett interface. Men *någon* måste fortfarande skapa och skicka in den konkreta instansen (`new EfKundRepository(...)` eller `new OrderService(new EfKundRepository(...))`). Det steget — att koppla ihop interfacet med en konkret implementation, ofta automatiskt via en container — är Dependency Injection. Se [Dependency Injection i ASP.NET Core](../aspnetcore/dependency-injection.md) för hur det görs i praktiken.

## TL;DR

Repository gömmer datakällan bakom ett interface, så affärslogik slipper bry sig om EF, SQL eller filer. Dependency Inversion är principen att bero på interfaces istället för konkreta klasser — Dependency Injection är den separata tekniken som faktiskt förser klassen med en instans att använda.
