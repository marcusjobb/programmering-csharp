---
title: Chain of Responsibility
description: "Flera objekt kan hantera en begäran, men avsändaren vet inte i förväg vilket. En lång if/else if-kedja fungerar, men blir stel — att lägga till en ny…"
parent: "Beteendemönster (Behavioral)"
nav_order: 10
---

# Chain of Responsibility

## Problemet

Flera objekt kan hantera en begäran, men avsändaren vet inte i förväg vilket. En lång `if`/`else if`-kedja fungerar, men blir stel — att lägga till en ny hanterare betyder att ändra kedjan på ett ställe.

## Lösningen

```csharp
public interface IHandler
{
    IHandler SetNext(IHandler handler);
    void Handle(int nivå);
}

public abstract class BaseHandler : IHandler
{
    private IHandler? _next;

    public IHandler SetNext(IHandler handler)
    {
        _next = handler;
        return handler;   // Möjliggör kedjning: a.SetNext(b).SetNext(c)
    }

    public virtual void Handle(int nivå) => _next?.Handle(nivå);
}

public class SupportHandler : BaseHandler
{
    public override void Handle(int nivå)
    {
        if (nivå <= 1) Console.WriteLine("Support löser ärendet");
        else base.Handle(nivå);   // Kan inte hantera — skicka vidare
    }
}

public class ManagerHandler : BaseHandler
{
    public override void Handle(int nivå)
    {
        if (nivå <= 3) Console.WriteLine("Chef löser ärendet");
        else base.Handle(nivå);
    }
}
```

```csharp
var support = new SupportHandler();
var chef = new ManagerHandler();
support.SetNext(chef);

support.Handle(1);   // Support löser ärendet
support.Handle(3);   // Chef löser ärendet
```

Varje hanterare avgör själv: hantera det, eller skicka vidare till nästa länk i kedjan. Avsändaren skickar bara till den första länken och bryr sig inte om vem som faktiskt hanterar begäran.

## Släktskap med LinkedList

Strukturen — varje länk känner bara till nästa — påminner om en [länkad lista](../../../datastrukturer/linkedlist.md). Skillnaden är att varje länk här också innehåller logik för *om* den ska hantera begäran eller skicka den vidare.

## TL;DR

Chain of Responsibility skickar en begäran genom en kedja av hanterare där var och en avgör själv om den hanterar den eller skickar den vidare — nya hanterare läggs till utan att ändra befintliga.
