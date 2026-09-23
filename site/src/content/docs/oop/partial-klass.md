---
title: Partial class
description: "Partial class i Objektorienterad programmering (OOP) — C#-boken av Marcus Ackre Medina"
layout: default
parent: Objektorienterad programmering (OOP)
nav_order: 36
---
# Partial class

Med `partial` kan du dela upp definitionen av en klass i **flera filer**. Kompilatorn sätter ihop dem till en klass när koden byggs.

## När du läst detta ska du kunna

- Förklara vad `partial class` är
- Skriva en klass som är delad i två filer
- Nämna när partial class används i praktiken

## Grundexempel

```csharp
// Fil: Person.cs
public partial class Person
{
    public string Name  { get; set; }
    public int    Age { get; set; }
}
```

```csharp
// Fil: Person.Metoder.cs
public partial class Person
{
    public void Present()
    {
        Console.WriteLine($"{Name}, {Age} år");
    }

    public bool IsAdult() => Age >= 18;
}
```

```csharp
// Program.cs — klassen beter sig som en enda klass
var p = new Person { Name = "Anna", Age = 25 };
p.Present();                          // Anna, 25 år
Console.WriteLine(p.IsAdult());          // True
```

### Output

```
Anna, 25 year
True
```

## Varför dela upp en klass?

Praktiska skäl att använda `partial`:

1. **Kod-generatorer**: Windows Forms och WPF genererar `Form1.Designer.cs` automatiskt. Din kod hamnar i `Form1.cs`. Separationen skyddar genereringen från dina ändringar.

2. **Stor klass under refaktorering**: Under ett refaktoreringsarbete kan du tillfälligt dela upp en stor klass i logiska delar utan att bryta API:et.

3. **Teamarbete**: Olika team-medlemmar kan arbeta i separata filer på samma klass med färre merge-konflikter.

## Vad partial INTE löser

- En partial class är fortfarande **en klass** — den kan fortfarande bryta mot SRP
- Det är inte ett substitut för att bryta ut logik i egna klasser
- Undvik att använda partial för att dölja att en klass har blivit för stor — dela upp till separata klasser istället

## Partial method

Inom en partial class kan du deklarera en **partial metod** — en signatur i en fil och implementationen (valfri) i en annan.

```csharp
// Del 1
public partial class Logger
{
    partial void OnLoggad(string message);  // bara deklaration

    public void Log(string message)
    {
        Console.WriteLine($"[LOG] {message}");
        OnLoggad(message);  // anropas om implementerad, annars ignoreras
    }
}

// Del 2 (valfri implementation)
public partial class Logger
{
    partial void OnLoggad(string message)
    {
        // Extra åtgärd om man vill — annars raderas anropet av kompilatorn
        System.Diagnostics.Debug.WriteLine($"DEBUG: {message}");
    }
}
```

## TL;DR

- `partial class` delar upp en klass i flera filer
- Kompilatorn slår ihop filerna till en klass
- Vanligast i kod-genererade klasser (Windows Forms, WPF, EF-scaffolding)
- Inte ett designmönster för att hantera stora klasser — det är ett verktyg för specifika situationer
