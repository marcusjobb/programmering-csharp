---
title: Factory och Strategy
description: "Problemet: kod som anropar new ConcreteClass() direkt är hårt kopplad till den exakta typen. Byter du implementation måste du hitta och ändra varje…"
parent: Designmönster
nav_order: 10
---

# Factory och Strategy

## När du läst detta ska du kunna

- Förklara varför Factory-mönstret finns
- Skriva en enkel factory-metod
- Förklara Strategy-mönstret och peka ut det i .NET du redan använt

## Factory — flytta ut `new`

Problemet: kod som anropar `new ConcreteClass()` direkt är hårt kopplad till den exakta typen. Byter du implementation måste du hitta och ändra varje `new`-anrop.

```csharp
public interface INotifier
{
    void Send(string message);
}

public class EmailNotifier : INotifier
{
    public void Send(string message) => Console.WriteLine($"E-post: {message}");
}

public class SmsNotifier : INotifier
{
    public void Send(string message) => Console.WriteLine($"SMS: {message}");
}

public static class NotifierFactory
{
    public static INotifier Create(string kanal) => kanal switch
    {
        "email" => new EmailNotifier(),
        "sms"   => new SmsNotifier(),
        _       => throw new ArgumentException($"Okänd kanal: {kanal}")
    };
}
```

```csharp
INotifier notifier = NotifierFactory.Create("email");
notifier.Send("Din beställning har skickats.");
```

Anroparen bryr sig bara om `INotifier` — vilken konkret klass som faktiskt skapas är factoryns beslut, inte anroparens. Lägger du till en `PushNotifier` senare ändrar du bara factoryn, aldrig koden som använder notifiers.

## Strategy — byt algoritm vid körning

Problemet: du behöver flera sätt att göra samma sak (sortera, validera, beräkna pris), och vill kunna byta metod utan `if`/`switch`-kedjor utspridda i koden.

```csharp
public interface IRabattStrategi
{
    decimal BeräknaRabatt(decimal pris);
}

public class ingenRabatt : IRabattStrategi
{
    public decimal BeräknaRabatt(decimal pris) => 0;
}

public class ProcentRabatt : IRabattStrategi
{
    private readonly decimal _procent;
    public ProcentRabatt(decimal procent) => _procent = procent;
    public decimal BeräknaRabatt(decimal pris) => pris * _procent;
}

public class Order
{
    public decimal Pris { get; set; }
    public IRabattStrategi Rabatt { get; set; } = new ingenRabatt();

    public decimal SlutPris() => Pris - Rabatt.BeräknaRabatt(Pris);
}
```

```csharp
var order = new Order { Pris = 1000, Rabatt = new ProcentRabatt(0.2m) };
Console.WriteLine(order.SlutPris());   // 800
```

Bytet av strategi sker genom att sätta en annan implementation — inte genom att skriva om `Order`.

## Du har redan använt Strategy

Det här mönstret är inbyggt i .NET på flera ställen du redan känner till:

```csharp
List<int> tal = new() { 5, 2, 8, 1 };

tal.Sort((a, b) => b.CompareTo(a));   // Strategy: sortera fallande, via ett Comparison<T>-delegat

var namn = personer.OrderBy(p => p.Ålder);  // Strategy: sorteringsnyckeln är utbytbar
```

`Comparison<T>` som du skickar till `.Sort()`, och nyckelfunktionen du skickar till `.OrderBy()` i [LINQ](../datastrukturer/linq.md), är strategier — utbytbara algoritmer som injiceras istället för att hårdkodas. `IComparer<T>` är samma idé uttryckt som ett interface istället för ett delegat.

## TL;DR

Factory flyttar ansvaret för att skapa objekt bort från koden som använder dem — byt implementation på ett ställe. Strategy gör en algoritm utbytbar vid körning — du har redan använt det varje gång du skickat ett lambda-uttryck till `.Sort()` eller `.OrderBy()`.
