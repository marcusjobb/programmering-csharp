---
title: State
description: "Ett objekts beteende beror på dess tillstånd (ett trafikljus beter sig olika i rött, gult, grönt) — utan mönstret blir koden en enda stor switch på ett…"
parent: "Beteendemönster (Behavioral)"
nav_order: 60
---

# State

## Problemet

Ett objekts beteende beror på dess tillstånd (ett trafikljus beter sig olika i rött, gult, grönt) — utan mönstret blir koden en enda stor `switch` på ett tillstånds-fält, upprepad i varje metod som bryr sig om tillståndet.

## Lösningen

```csharp
public interface ITrafikljusState
{
    void Byt(Trafikljus ljus);
    string Färg { get; }
}

public class RödState : ITrafikljusState
{
    public string Färg => "Röd";
    public void Byt(Trafikljus ljus) => ljus.SättState(new GrönState());
}

public class GrönState : ITrafikljusState
{
    public string Färg => "Grön";
    public void Byt(Trafikljus ljus) => ljus.SättState(new GulState());
}

public class GulState : ITrafikljusState
{
    public string Färg => "Gul";
    public void Byt(Trafikljus ljus) => ljus.SättState(new RödState());
}

// Context — delegerar till sitt aktuella tillstånd, vet inget om övergångslogiken själv
public class Trafikljus
{
    private ITrafikljusState _state = new RödState();

    public void SättState(ITrafikljusState state) => _state = state;
    public void NästaLjus() => _state.Byt(this);
    public string AktuellFärg => _state.Färg;
}
```

```csharp
var ljus = new Trafikljus();
Console.WriteLine(ljus.AktuellFärg);   // Röd

ljus.NästaLjus();
Console.WriteLine(ljus.AktuellFärg);   // Grön
```

Varje tillstånd vet själv vilket tillstånd som kommer härnäst — `Trafikljus` behöver aldrig en `switch` som räknar upp alla övergångar.

## TL;DR

State flyttar tillståndsberoende beteende till egna klasser — en per tillstånd — istället för en stor `switch` upprepad överallt objektet används. Övergångarna blir en del av varje tillstånds egen kod.
