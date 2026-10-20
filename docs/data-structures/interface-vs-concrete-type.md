---
title: "IList och IDictionary — gränssnitt vs konkret typ"
description: "List<T> och Dictionary<TKey, TValue> är konkreta klasser. IList<T> och IDictionary<TKey, TValue> är kontrakten bakom dem — och valet mellan dem spelar roll i signaturer."
parent: Datastrukturer
nav_order: 27
---
# IList och IDictionary — gränssnitt vs konkret typ

[List\<T\>](list.md) och [Dictionary](dictionary.md) är konkreta klasser — färdiga implementationer du instansierar med `new`. Bakom båda ligger ett **interface**: `IList<T>` respektive `IDictionary<TKey, TValue>`, som beskriver *vad* en samling av den typen kan göra, utan att låsa fast *hur*.

## Vad interfacet lovar

```csharp
public interface IList<T> : ICollection<T>
{
    T this[int index] { get; set; }
    void Insert(int index, T item);
    void RemoveAt(int index);
    int IndexOf(T item);
}
```

`List<T>` implementerar `IList<T>` — men det gör i princip inget annat i .NET som är byggt för listor. Poängen med interfacet är inte att det finns tio olika implementationer att välja mellan i vardagen. Poängen är **vad du väljer att exponera i din egen kod**.

## Varför skriva IList<T> i en metodsignatur?

```csharp
// Konkret typ — anroparen MÅSTE skicka exakt en List<string>
public void SkrivUt(List<string> namn) { ... }

// Interface — anroparen kan skicka VILKEN samling som helst som implementerar IList<T>
public void SkrivUt(IList<string> namn) { ... }
```

Med `IList<string>` som parametertyp kan du skicka in en `List<string>`, en array (`string[]` implementerar `IList<T>`), eller en egen klass som implementerar interfacet — utan att `SkrivUt` bryr sig. Metoden lovar bara att den behöver indexering och `Insert`/`RemoveAt`, inget mer. Det gör koden mer återanvändbar och lättare att testa: i ett test kan du skicka in en enklare eller mockad implementation istället för en riktig `List<T>`.

Tumregeln: **acceptera det bredaste interfacet du faktiskt behöver, returnera den konkreta typen om du kan.** Behöver metoden bara läsa igenom samlingen, räcker `IEnumerable<T>` — ännu bredare än `IList<T>`. Behöver den indexering och modifiering, är `IList<T>` rätt nivå.

## Samma idé för Dictionary

```csharp
public interface IDictionary<TKey, TValue> : ICollection<KeyValuePair<TKey, TValue>>
{
    TValue this[TKey key] { get; set; }
    bool TryGetValue(TKey key, out TValue value);
    bool ContainsKey(TKey key);
    void Add(TKey key, TValue value);
}
```

```csharp
// Metoden lovar bara att den slår upp värden via nyckel — inget mer
public void SkrivUtSaldo(IDictionary<string, decimal> saldo)
{
    if (saldo.TryGetValue("Anna", out var belopp))
        Console.WriteLine($"Anna har {belopp:C}");
}
```

`Dictionary<TKey, TValue>` implementerar `IDictionary<TKey, TValue>` precis som `List<T>` implementerar `IList<T>`. Samma resonemang gäller: en parameter typad som `IDictionary<string, decimal>` accepterar `Dictionary<string, decimal>` och andra typer som lovar samma kontrakt, till exempel `SortedDictionary<TKey, TValue>` om du någon gång behöver nycklarna i sorterad ordning.

## Konkret typ eller interface — snabbguide

| Situation | Använd |
|---|---|
| Lokal variabel du bara ska använda själv | Konkret typ (`List<T>`, `Dictionary<TKey, TValue>`) — enklast, inget att vinna på abstraktion |
| Metodparameter — du bara läser | `IEnumerable<T>` — bredast möjliga löfte |
| Metodparameter — du behöver indexering/modifiering | `IList<T>` / `IDictionary<TKey, TValue>` |
| Returtyp | Så konkret som du kan — anroparen förlorar aldrig på att få mer än de bad om |

Att typa en returtyp som ett interface när metoden alltid faktiskt returnerar en `List<T>` ger ingen fördel — det bara döljer information (`.Sort()`, `.Capacity` osv. blir oåtkomliga) utan att lösa något verkligt problem. Abstraktionen tjänar ett syfte vid parametrar, inte reflexmässigt överallt.

## Obligatorisk dad-joke

Varför litade `IList<T>` på alla sina implementationer?

Den brydde sig aldrig om vem som höll löftet, bara att det hölls.
