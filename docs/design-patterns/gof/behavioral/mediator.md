---
title: Mediator
description: "Många objekt som pratar direkt med varandra (varje deltagare i en chatt känner till alla andra deltagare) skapar ett nät av beroenden — lägg till en ny…"
parent: "Beteendemönster (Behavioral)"
nav_order: 40
---

# Mediator

## Problemet

Många objekt som pratar direkt med varandra (varje deltagare i en chatt känner till alla andra deltagare) skapar ett nät av beroenden — lägg till en ny deltagare, och du måste koppla ihop den med alla befintliga.

## Lösningen

```csharp
public interface IChatMediator
{
    void SkickaMeddelande(string meddelande, Användare avsändare);
}

public class ChatRum : IChatMediator
{
    private readonly List<Användare> _deltagare = new();

    public void LäggTill(Användare användare) => _deltagare.Add(användare);

    public void SkickaMeddelande(string meddelande, Användare avsändare)
    {
        foreach (var deltagare in _deltagare)
            if (deltagare != avsändare)
                deltagare.TaEmot(meddelande, avsändare.Namn);
    }
}

public class Användare
{
    public string Namn { get; }
    private readonly IChatMediator _chatt;

    public Användare(string namn, IChatMediator chatt) => (Namn, _chatt) = (namn, chatt);

    public void Skicka(string meddelande) => _chatt.SkickaMeddelande(meddelande, this);
    public void TaEmot(string meddelande, string frånNamn) =>
        Console.WriteLine($"{Namn} tog emot från {frånNamn}: {meddelande}");
}
```

```csharp
var rum = new ChatRum();
var anna = new Användare("Anna", rum);
var björn = new Användare("Björn", rum);
rum.LäggTill(anna);
rum.LäggTill(björn);

anna.Skicka("Hej allihopa!");   // Björn tog emot från Anna: Hej allihopa!
```

`Användare` känner bara till `IChatMediator` — aldrig till andra `Användare`-instanser direkt. Lägg till en tredje deltagare, och ingen befintlig `Användare`-kod behöver ändras.

## TL;DR

Mediator centraliserar kommunikationen mellan flera objekt till ett enda objekt, så att deltagarna aldrig behöver känna till (eller bero direkt på) varandra.
