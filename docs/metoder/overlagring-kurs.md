---
title: "Överlagring (kurs)"
description: "Det här är en fördjupning av arv-konceptet med fokus på metodöverlagring, konstruktoröverlagring, base.Method() och ToString()."
parent: "Metoder"
nav_order: 25
---

# Överlagring och arv — tips och tricks

Det här är en fördjupning av arv-konceptet med fokus på metodöverlagring, konstruktoröverlagring, `base.Method()` och `ToString()`.

## Metodöverlagring — samma namn, olika parametrar

En metod kan ha samma namn men ta emot olika saker. C# väljer rätt version baserat på vad du skickar in:

```csharp
class Greeting
{
    public string Greet(string name)
    {
        return $"Hej, {name}!";
    }

    public string Greet(string name, string title)
    {
        return $"God dag, {title} {name}!";
    }

    public string Greet()
    {
        return "Hej på dig!";
    }
}
```

```csharp
Greeting g = new Greeting();
Console.WriteLine(g.Greet("Alex"));
Console.WriteLine(g.Greet("Medina", "doktor"));
Console.WriteLine(g.Greet());
```

Output:
```
Hej, Alex!
God day, doctor Medina!
Hej on dig!
```

Samma metodnamn. Tre varianter. C# väljer rätt automatiskt. Det kallas **överlagring** — overloading.

## Konstruktoröverlagring — samma sak, för konstruktorer

En klass kan ha **flera konstruktorer** med olika parametrar:

```csharp
class Car
{
    public string Brand { get; private set; }
    public int Doors { get; private set; }

    public Car(string brand, int doors)   // full konstruktor
    {
        Brand = brand;
        Doors = doors;
    }

    public Car(string brand)               // förenklad — 4 dörrar som standard
        : this(brand, 4) { }
}
```

`this(brand, 4)` anropar den **fulla konstruktorn i samma klass**. Du slipper skriva samma initiering på två ställen.

## `this(...)` vs `base(...)`

| | `this(...)` | `base(...)` |
|---|---|---|
| **Anropar** | Konstruktor i **samma klass** | Konstruktor i **basklassen** |
| **Används för** | Konstruktoröverlagring | Arv |

```csharp
class Car
{
    public Car(string brand, int doors) { ... }
    public Car(string brand) : this(brand, 4) { }  // this — annan konstruktor i mig
}

class ElectricCar : Car
{
    public ElectricCar(string brand) : base(brand, 4) { }  // base — basklassens konstruktor
}
```

`this` = annan konstruktor i mig själv  
`base` = konstruktorn hos min förälder

## `base.MethodName()` — bygg vidare istället för att ersätta

Ibland vill du inte **ersätta** basklassens implementation — du vill **utöka** den:

```csharp
class Animal
{
    public string Name { get; private set; }

    public Animal(string name) { Name = name; }

    public virtual void Present()
    {
        Console.WriteLine($"Jag heter {Name}.");
    }
}

class Dog : Animal
{
    public Dog(string name) : base(name) { }

    public override void Present()
    {
        base.Present();                         // kör Djurs version först
        Console.WriteLine("Och jag är en hund!");  // lägg till mer
    }
}
```

Output: `Jag isCalled Fido.` → `Och jag is en dog!`

Utan `base.Present()` måste du skriva om hela presentationen i varje subklass. Med den håller du logiken på ett ställe och lägger bara till det som är specifikt. Ändrar du basklassen? Alla subklasser uppdateras automatiskt.

## Overloading vs override — olika saker

| | Overloading | Override |
|---|---|---|
| **Vad?** | Samma namn, olika parametrar | Samma signatur, ny implementation |
| **Var?** | Samma klass | Subklass |
| **Nyckelord** | Inget extra | `virtual` + `override` |

Overloading = "metoden kan ta emot olika saker"  
Override = "subklassen gör det annorlunda"

## `ToString()` — den dolda metoden

Alla klasser i C# ärver från `object` — och `object` har en metod `ToString()`. Som standard skriver den ut klassens namn (t.ex. `CLO26.Dog`), men du kan skriva om den:

```csharp
class Dog : Animal
{
    public Dog(string name) : base(name) { }

    public override string ToString()
    {
        return $"Hund({Name})";
    }
}
```

```csharp
Dog h = new Dog("Fido");
Console.WriteLine(h);               // anropar ToString() automatiskt
Console.WriteLine($"Djuret: {h}");  // string interpolation gör samma sak
```

Output: `Dog(Fido)`

`Console.WriteLine(object)` anropar `ToString()` automatiskt. `$"...{object}..."` gör samma sak. Det gör `ToString()` väldigt användbart vid debugging och utskrift:

```csharp
List<Animal> animal = new List<Animal> { new Dog("Fido"), new Cat("Luna") };

foreach (var d in animal)
{
    Console.WriteLine(d);  // ToString() på varje objekt
}
```

Output:
```
Dog(Fido)
Cat(Luna)
```

## Tre saker att ta med sig

```csharp
// 1. base.Metod() — bygg vidare på basklassens implementation
public override void Present()
{
    base.Present();
    Console.WriteLine("Extra info här.");
}

// 2. Overloading — samma namn, olika parametrar
public void Log(string text) { ... }
public void Log(string text, int level) { ... }

// 3. ToString() override — objekt som skriver ut sig själva
public override string ToString() => $"Hund({Name})";
```
