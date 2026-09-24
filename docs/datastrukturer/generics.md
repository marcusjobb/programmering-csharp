---
title: Generics
description: "Du har redan använt generics — varje gång du skrivit List<string> eller Dictionary<string, int> har det <T>-liknande innehållet varit generics i…"
parent: Datastrukturer
nav_order: 5
---

# Generics

Du har redan använt generics — varje gång du skrivit `List<string>` eller `Dictionary<string, int>` har det `<T>`-liknande innehållet varit generics i praktiken. Den här sidan förklarar vad som faktiskt händer.

## När du läst detta ska du kunna

- Förklara vad `<T>` betyder och varför det finns
- Skriva en egen generisk klass och en egen generisk metod
- Använda `where T : ...` för att begränsa vilka typer som får användas

## Problemet generics löser

Utan generics skulle du antingen skriva en separat klass per typ...

```csharp
public class IntBox
{
    public int Value;
}

public class StringBox
{
    public string Value;
}
// ... en klass per typ du någonsin kommer behöva
```

...eller använda `object` och tappa typsäkerheten:

```csharp
public class Box
{
    public object Value;
}

var box = new Box { Value = 5 };
string text = (string)box.Value;  // Kraschar vid körning — fel typ, ingen varning vid kompilering
```

Generics ger dig det bästa av båda: **en** klass, som fungerar för **valfri typ**, med **full typsäkerhet** kvar vid kompilering.

## En egen generisk klass

```csharp
public class Box<T>
{
    public T Value { get; set; }

    public Box(T value)
    {
        Value = value;
    }
}

var intBox    = new Box<int>(5);
var stringBox = new Box<string>("hej");

// intBox.Value = "text";  // Kompileringsfel — Box<int> accepterar bara int
// stringBox.Value=5; // Kompileringsfel — Box<string> accepterar bara text
```

`T` är en platshållare för en typ som bestäms först när klassen används. Namnet `T` är konvention (Type), inte ett krav — men du kommer se `T` överallt i .NET-kod.

## En egen generisk metod

Generics fungerar lika bra på enskilda metoder, utan att hela klassen behöver vara generisk:

```csharp
public T Först<T>(List<T> lista)
{
    return lista[0];
}

var tal  = Först(new List<int> { 1, 2, 3 });        // T blir int
var ord  = Först(new List<string> { "a", "b" });    // T blir string
```

Kompilatorn räknar oftast ut `T` själv utifrån argumentet — du behöver sällan skriva `Först<int>(...)` explicit.

## Begränsa T med `where`

Ibland behöver din generiska kod göra mer än bara lagra värdet — t.ex. jämföra det. Då måste du tala om vilka typer som är tillåtna:

```csharp
// Enbart klasser kommer att kunna användas i  denna generiska klass
public class Repository<T> where T : class
{
    private List<T> _items = new();

    public void Add(T item) => _items.Add(item);
}

public T StörstaVärde<T>(List<T> lista) where T : IComparable<T>
{
    var störst = lista[0];
    foreach (var item in lista)
        if (item.CompareTo(störst) > 0)
            störst = item;
    return störst;
}
```

| Constraint | Betyder |
|---|---|
| `where T : class` | T måste vara en referenstyp |
| `where T : struct` | T måste vara en värdetyp |
| `where T : IComparable<T>` | T måste implementera det interfacet |
| `where T : new()` | T måste ha en parameterlös konstruktor |
| `where T : BaseClass` | T måste ärva från `BaseClass` |

## Flera typparametrar

`Dictionary<TKey, TValue>` är samma idé, bara med två platshållare istället för en:

```csharp
public class Par<TFörsta, TAndra>
{
    public TFörsta Första { get; set; }
    public TAndra Andra { get; set; }
}

var par = new Par<string, int> { Första = "ålder", Andra = 30 };
```

## Generics du redan känner igen

Nu när du vet vad `<T>` betyder, gå gärna tillbaka och läs [List](list.md) och [Dictionary](dictionary.md) igen — `List<T>` och `Dictionary<TKey, TValue>` är exakt det här mönstret, byggt in i .NET.

## Generics är inte lösningen på allt

Så fort du lärt dig `<T>` är det lätt att vilja använda det överallt — men `T` vet i grunden ingenting om vilken typ den faktiskt blir. Det begränsar vad du kan göra med den, och det syns direkt om du försöker räkna:

```csharp
public T Add<T>(T first, T second)
{
    return first + second;   // Kompileringsfel!
}
```

Det här kompilerar inte. Kompilatorn vet bara att `T` är "någon typ" — den vet inte att `+` ens är definierad för den, för det är den inte för alla typer (vad skulle `+` betyda för en `Person`?). Generics ger dig typsäkerhet, inte matematik gratis.

**Den riktiga lösningen**, om du faktiskt vill skriva en generisk `Add` som fungerar med tal, är generic math (C# 11) via `INumber<T>`:

```csharp
public T Add<T>(T first, T second) where T : System.Numerics.INumber<T>
{
    return first + second;   // OK — INumber<T> garanterar att + finns
}
```

Se [Språkhistorik — C# 11](../grunder/sprakhistorik.md) för bakgrunden. Poängen: om du behöver operatorer, sätt en constraint som garanterar dem — gissa inte att `T` stödjer det du vill göra.

## Vanliga mönster

| Mönster | Användning |
|---|---|
| Generisk container | `Box<T>`, `List<T>` — lagra ett värde av valfri typ typsäkert |
| Generisk repository | `Repository<T> where T : class` — samma CRUD-logik för olika entitetstyper |
| Generisk metod med constraint | `where T : IComparable<T>` — jämför utan att veta exakt typ i förväg |
| Generic math | `where T : INumber<T>` — aritmetik som fungerar för alla numeriska typer |

## Vanliga antipatterns

- **Golden Hammer.** Att göra allting generiskt "för säkerhets skull", även klasser som bara någonsin kommer användas med en typ. Om `Box<T>` i praktiken alltid kallas med `Box<Kund>`, är `T` bara komplexitet utan vinst — skriv en vanlig `KundBox` istället.
- **Generics utan constraints som gissar för mycket.** Ett `T` utan `where`-begränsning kan bara göra det varenda typ kan göra — tilldelas, jämföras med `==` för referenser, skickas runt. Så fort koden behöver mer (aritmetik, jämförelse, en specifik metod) måste en constraint till, annars kompilerar det inte som ovan.
- **För många typparametrar.** `Converter<TInput, TOutput, TContext, TResult>` är i praktiken oläsbart. Fler än två typparametrar är ofta ett tecken på att klassen försöker göra för mycket.
- **Generisk kod som döljer en enklare lösning.** Ibland är ett interface (`IComparable`, `IShape`) rätt verktyg istället för generics — polymorfism och generics löser besläktade men olika problem. Se [Interfaces](../oop/polymorfism/interfaces/index.md) och [Polymorfism](../oop/polymorfism/grunderna.md).

## TL;DR

`<T>` är en platshållare för en typ som bestäms när klassen eller metoden används. Det ger dig en enda implementation som fungerar typsäkert för vilken typ som helst — istället för en klass per typ, eller att tappa typsäkerheten med `object`.

Hela klasser kan vara generiska och då använda typen `T` 

```csharp
class customer<T>
{

}
```

och metoder i sig kan också vara generiska

```csharp
public T DoSomething<T>(T inparam)
{

}
```
