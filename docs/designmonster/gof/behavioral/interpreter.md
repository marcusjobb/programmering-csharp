---
title: Interpreter
description: "Du behöver tolka och utvärdera uttryck i ett litet, avgränsat eget språk — t.ex. matematiska uttryck, sökfilter eller enkla regler. Att skriva om texten…"
parent: "Beteendemönster (Behavioral)"
nav_order: 15
---

# Interpreter

## Problemet

Du behöver tolka och utvärdera uttryck i ett litet, avgränsat eget språk — t.ex. matematiska uttryck, sökfilter eller enkla regler. Att skriva om texten till en `switch`-djungel av strängjämförelser blir snabbt ohanterligt.

## Lösningen

Varje del av grammatiken blir en egen klass som vet hur den tolkar (utvärderar) sig själv:

```csharp
public interface IUttryck
{
    int Utvärdera();
}

public class Tal : IUttryck
{
    private readonly int _värde;
    public Tal(int värde) => _värde = värde;
    public int Utvärdera() => _värde;
}

public class Addition : IUttryck
{
    private readonly IUttryck _vänster, _höger;
    public Addition(IUttryck vänster, IUttryck höger) => (_vänster, _höger) = (vänster, höger);
    public int Utvärdera() => _vänster.Utvärdera() + _höger.Utvärdera();
}

public class Multiplikation : IUttryck
{
    private readonly IUttryck _vänster, _höger;
    public Multiplikation(IUttryck vänster, IUttryck höger) => (_vänster, _höger) = (vänster, höger);
    public int Utvärdera() => _vänster.Utvärdera() * _höger.Utvärdera();
}
```

```csharp
// Representerar: (3 + 4) * 2
IUttryck uttryck = new Multiplikation(
    new Addition(new Tal(3), new Tal(4)),
    new Tal(2)
);

Console.WriteLine(uttryck.Utvärdera());   // 14
```

Varje nod i trädet vet bara hur den tolkar sig själv och sina barn — hela uttrycksträdet utvärderas rekursivt utan en enda central `switch`.

## Var det används i praktiken

Att skriva en fullständig parser för hand (text → trädstruktur) är ett eget stort ämne. I praktisk C#-kod stöter du oftare på färdiga interpreter-liknande verktyg än att bygga egna:

- **Regex** (se [Regex](../../../variabler/regex.md)) — mönstret du skriver tolkas av en inbyggd motor.
- **LINQ:s uttrycksträd** (`Expression<Func<T, bool>>`) — bygger upp en representation av ett C#-uttryck som sedan kan tolkas och översättas, t.ex. till SQL av Entity Framework.

## TL;DR

Interpreter representerar ett litet språks grammatik som ett träd av objekt, där varje nod vet hur den tolkar sig själv — rekursiv utvärdering istället för en central parsning-switch. LINQ:s uttrycksträd och regex-motorer bygger på samma grundidé.
