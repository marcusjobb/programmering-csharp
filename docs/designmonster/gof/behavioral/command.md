---
title: Command
description: "Du vill parametrisera kod med en \"åtgärd att göra senare\" — köa den, logga den, eller kunna ångra den. Ett direkt metodanrop kan inte lagras, köas eller…"
parent: "Beteendemönster (Behavioral)"
nav_order: 20
---

# Command

## Problemet

Du vill parametrisera kod med en "åtgärd att göra senare" — köa den, logga den, eller kunna ångra den. Ett direkt metodanrop kan inte lagras, köas eller ångras i efterhand.

## Lösningen

```csharp
public interface ICommand
{
    void Execute();
    void Undo();
}

// Receiver — objektet som faktiskt utför arbetet
public class Lampa
{
    public void SlåPå()  => Console.WriteLine("Lampan är på");
    public void SlåAv()  => Console.WriteLine("Lampan är av");
}

// ConcreteCommand — kapslar in EN begäran som ett objekt
public class TändLampaCommand : ICommand
{
    private readonly Lampa _lampa;
    public TändLampaCommand(Lampa lampa) => _lampa = lampa;

    public void Execute() => _lampa.SlåPå();
    public void Undo()    => _lampa.SlåAv();
}

// Invoker — vet bara om ICommand, inte om Lampa
public class Fjärrkontroll
{
    private readonly List<ICommand> _historik = new();

    public void TryckPå(ICommand command)
    {
        command.Execute();
        _historik.Add(command);
    }

    public void ÅngraSenaste()
    {
        if (_historik.Count == 0) return;
        var senaste = _historik[^1];
        _historik.RemoveAt(_historik.Count - 1);
        senaste.Undo();
    }
}
```

```csharp
var lampa = new Lampa();
var fjärr = new Fjärrkontroll();

fjärr.TryckPå(new TändLampaCommand(lampa));   // Lampan är på
fjärr.ÅngraSenaste();                          // Lampan är av
```

`Fjärrkontroll` känner aldrig till `Lampa` — bara `ICommand`. Den kan köa kommandon, logga dem, eller ångra dem i tur och ordning, helt oberoende av vad de faktiskt gör.

## Inbyggt i .NET

`Action` och `Func<T>` är lättviktiga versioner av samma idé — ett anrop paketerat som ett värde du kan skicka runt, lagra i en lista och köra senare, utan en fullständig klasshierarki.

## TL;DR

Command gör en begäran till ett objekt istället för ett direkt metodanrop — det gör den möjlig att köa, logga och ångra. `Action`/`Func<T>` är .NETs lättviktiga motsvarighet för enklare fall.
