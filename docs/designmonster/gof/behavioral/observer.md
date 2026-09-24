---
title: Observer
description: "Flera delar av ditt program behöver veta när något ändras (en ny highscore sätts, ett lager tar slut) — utan att det objekt som ändras behöver känna till…"
parent: "Beteendemönster (Behavioral)"
nav_order: 50
---

# Observer

## Problemet

Flera delar av ditt program behöver veta när något ändras (en ny highscore sätts, ett lager tar slut) — utan att det objekt som ändras behöver känna till exakt vilka som lyssnar.

## Lösningen — konceptet

```csharp
public interface IObserver
{
    void Update(int nyPoäng);
}

public class ScoreBoard
{
    private readonly List<IObserver> _observers = new();
    private int _högstaPoäng;

    public void Prenumerera(IObserver observer) => _observers.Add(observer);

    public void RegistreraPoäng(int poäng)
    {
        if (poäng > _högstaPoäng)
        {
            _högstaPoäng = poäng;
            foreach (var observer in _observers)
                observer.Update(poäng);   // Notifiera ALLA prenumeranter
        }
    }
}

public class UISkärm : IObserver
{
    public void Update(int nyPoäng) => Console.WriteLine($"Ny highscore visas: {nyPoäng}");
}
```

```csharp
var scoreBoard = new ScoreBoard();
scoreBoard.Prenumerera(new UISkärm());

scoreBoard.RegistreraPoäng(100);   // Ny highscore visas: 100
```

## Du har redan använt Observer — det heter event

Det här mönstret är så centralt i C# att det finns ett dedikerat nyckelord för det:

```csharp
public class ScoreBoard
{
    public event Action<int>? NyHighscore;   // Prenumeranter kopplar in sig med +=

    public void RegistreraPoäng(int poäng) => NyHighscore?.Invoke(poäng);
}
```

```csharp
var scoreBoard = new ScoreBoard();
scoreBoard.NyHighscore += poäng => Console.WriteLine($"Ny highscore: {poäng}");

scoreBoard.RegistreraPoäng(100);   // Ny highscore: 100
```

`event` är Observer-mönstret inbyggt i språket — `+=` prenumererar, `Invoke` (eller det implicita anropet) notifierar alla prenumeranter. Varje knapp-klick (`Button.Click`) du någonsin hanterat i .NET är exakt det här mönstret.

## TL;DR

Observer skapar ett en-till-många-beroende: när ett objekt ändras notifieras alla som prenumererar, utan att objektet behöver känna till exakt vilka de är. C#s `event`-nyckelord *är* Observer-mönstret, inbyggt i språket.
