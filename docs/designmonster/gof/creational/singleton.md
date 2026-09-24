---
title: Singleton
description: "Ibland vill du garantera att exakt en instans av en klass finns i hela applikationen — t.ex. en loggningsklass, en konfigurationshanterare."
parent: "Skapande mönster (Creational)"
nav_order: 50
---

# Singleton

## Problemet

Ibland vill du garantera att exakt **en** instans av en klass finns i hela applikationen — t.ex. en loggningsklass, en konfigurationshanterare.

## Lösningen

```csharp
public class Logger
{
    private static Logger? _instance;
    private static readonly object _lock = new();

    private Logger() { }   // Privat konstruktor — ingen utanför kan skapa fler

    public static Logger Instance
    {
        get
        {
            lock (_lock)
            {
                _instance ??= new Logger();
                return _instance;
            }
        }
    }

    public void Log(string message) => Console.WriteLine($"Log: {message}");
}
```

```csharp
Logger.Instance.Log("Applikationen startade.");
```

Den privata konstruktorn stoppar `new Logger()` utanför klassen. `lock` skyddar mot att två trådar skapar varsin instans samtidigt vid första anropet — se [Threading](../../../asynkron/threading-tpl.md).

## Varför inte bara en `static class`?

En rimlig fråga — skillnaden:

| | `static class` | Singleton |
|---|---|---|
| Kan implementera interface | Nej | Ja — viktigt för DI och testning |
| Kan ärvas/bytas ut i test | Nej | Ja, via interfacet |
| Kontrollerad skapandetidpunkt | Nej — initieras vid första användning automatiskt | Ja, explicit i `Instance` |

## Varning — Singleton är kontroversiellt

Singleton är det mest kritiserade GoF-mönstret, och med rätta: det introducerar **globalt, delat tillstånd** — vilket gör kod svårare att enhetstesta (du kan inte lätt byta ut singletonen mot en testdubblett) och gör dolda beroenden mellan orelaterade delar av koden. I modern ASP.NET Core-kod löses "en instans för hela appen"-behovet oftast bättre med `AddSingleton` i [Dependency Injection](../../../aspnetcore/dependency-injection.md) — samma livslängdsgaranti, men via ett interface som går att byta ut vid test, istället för hårdkodad global åtkomst.

## TL;DR

Singleton garanterar exakt en instans via en privat konstruktor och en statisk åtkomstpunkt. Föredra `AddSingleton` i en DI-container framför att skriva mönstret för hand när du kan — samma effekt, mindre globalt tillstånd att felsöka.
