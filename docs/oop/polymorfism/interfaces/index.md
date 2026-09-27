---
title: Interfaces
description: "Ett interface är ett kontrakt: en lista av medlemmar en klass lovar att implementera, utan att säga något om hur."
parent: Polymorfism
nav_order: 20
has_children: True
---
# Interfaces

Ett interface definierar en uppsättning metoder, properties och events som en klass lovar att implementera — utan att själv innehålla någon implementation. Det är därför man kallar ett interface ett **kontrakt**: det säger vad en klass måste kunna göra, aldrig hur den gör det.

## När du läst detta ska du kunna

- Deklarera ett interface och implementera det i en klass
- Förklara varför interfaces inte kan innehålla fält
- Förklara vad som händer om en klass glömmer implementera en medlem

## Exempel — IAnimal

```csharp
interface IAnimal
{
    string Name { get; set; }
    void Eat();
    void Sleep();
}
```

`IAnimal` har en property och två metoder — men ingen kropp, ingen logik. Ett interface kan ha properties men aldrig fält; det är fortfarande bara ett kontrakt, inte en plats att lagra data i.

Konventionen är att namnet börjar på `I`. En andra, valfri konvention är att avsluta på `-able` när interfacet beskriver en förmåga — `IComparable`, `IDisposable`. Den passar inte alltid (`IAnimalable` låter inte bättre än `IAnimal`), men den är värd att känna igen när du ser den i andra bibliotek.

## En klass som implementerar kontraktet

```csharp
class Cat : IAnimal
{
    public string Name { get; set; } = "";

    public void Eat() => Console.WriteLine($"{Name} äter.");
    public void Sleep() => Console.WriteLine($"{Name} sover.");
}
```

`Cat` lovar — genom `: IAnimal` — att den har allt `IAnimal` kräver. Om `Cat` skulle glömma en av metoderna, eller ge den en annan signatur än kontraktet anger, kompilerar koden inte. Kompilatorn håller dig till löftet, du behöver inte komma ihåg det själv.

```csharp
IAnimal cat = new Cat { Name = "Måns" };
cat.Eat();    // Måns äter.
cat.Sleep();  // Måns sover.
```

Variabeln är deklarerad som `IAnimal`, inte `Cat` — och det räcker för att anropa allt interfacet lovar. Det är samma polymorfism-princip som i [Grunderna — virtual och override](../grunderna.md), bara med ett kontrakt istället för en basklass som gemensam nämnare.

## Obligatorisk dad-joke

Varför signerade katten kontraktet utan att läsa det?

Den visste redan att den skulle göra exakt vad den ville ändå.
