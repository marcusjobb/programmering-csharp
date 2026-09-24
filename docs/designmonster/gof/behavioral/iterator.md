---
title: Iterator
description: "Du vill gå igenom elementen i en samling en i taget, utan att den kod som gör det behöver veta om samlingen är en array, en länkad lista eller ett träd…"
parent: "Beteendemönster (Behavioral)"
nav_order: 30
---

# Iterator

## Problemet

Du vill gå igenom elementen i en samling en i taget, utan att den kod som gör det behöver veta om samlingen är en array, en länkad lista eller ett träd bakom kulisserna.

## Lösningen — konceptet

```csharp
public interface IBokIterator
{
    bool HasNext();
    string Next();
}

public class BokLista
{
    private readonly List<string> _böcker = new();
    public void LäggTill(string bok) => _böcker.Add(bok);

    public IBokIterator SkapaIterator() => new BokIterator(_böcker);

    private class BokIterator : IBokIterator
    {
        private readonly List<string> _böcker;
        private int _position = 0;

        public BokIterator(List<string> böcker) => _böcker = böcker;

        public bool HasNext() => _position < _böcker.Count;
        public string Next() => _böcker[_position++];
    }
}
```

```csharp
var lista = new BokLista();
lista.LäggTill("Sagan om ringen");
lista.LäggTill("Dune");

var iterator = lista.SkapaIterator();
while (iterator.HasNext())
    Console.WriteLine(iterator.Next());
```

Iteratorn håller reda på var i traverseringen du befinner dig — som ett bokmärke — utan att avslöja hur `BokLista` faktiskt lagrar sina böcker internt.

## Du har redan använt Iterator — det heter foreach

Det här mönstret är så grundläggande i .NET att det är inbyggt i språket självt:

```csharp
foreach (var bok in böcker)
    Console.WriteLine(bok);
```

`foreach` fungerar på precis det här mönstret: vilken typ som helst som implementerar `IEnumerable`/`IEnumerable<T>` (vilket kräver en `GetEnumerator()`-metod som returnerar något som implementerar `IEnumerator`/`IEnumerator<T>`, med `MoveNext()` och `Current` — samma idé som `HasNext()`/`Next()` ovan) kan användas med `foreach`. `List<T>`, `Dictionary<K,V>`, arrayer — alla implementerar Iterator-mönstret under huven.

## TL;DR

Iterator ger ett standardiserat sätt att gå igenom en samlings element utan att avslöja dess interna struktur. Du har använt det här mönstret varje gång du skrivit `foreach` — `IEnumerable`/`IEnumerator` *är* Iterator-mönstret, inbyggt i språket.
