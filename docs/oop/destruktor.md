---
title: Destruktor och Finalizer
description: "Destruktor och Finalizer i Objektorienterad programmering (OOP) — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Objektorienterad programmering (OOP)
nav_order: 60
---
# Destruktor och Finalizer

En destruktor (eller finalizer) är kod som körs **när ett objekt förstörs**. I C# hanteras minnet automatiskt av Garbage Collector — destruktorn är sällan nödvändig.

## När du läst detta ska du kunna

- Förklara vad en destruktor är och när den körs
- Skriva en destruktor i C#
- Förstå varför destruktorer är sällsynta i C#
- Använda `IDisposable` och `using` som ett bättre alternativ

## Destruktor — syntax

En destruktor har klassens namn med ett `~` framför. Den tar inga parametrar och har inget returvärde.

```csharp
public class Resurs
{
    public Resurs()
    {
        Console.WriteLine("Resurs skapades");
    }

    // Destruktor — körs av GC när objektet städas bort
    ~Resurs()
    {
        Console.WriteLine("Resurs förstördes");
    }
}

{
    var r = new Resurs();   // Resurs skapades
    // r går ur scope här
}
// "Resurs förstördes" skrivs ut... men när? GC bestämmer.
```

### Output (ungefärlig)

```
Resurs skapades
Resurs förstördes
```

## Varför är destruktorer sällsynta i C#?

Destruktorn omvandlas av kompilatorn till en **finalizer** och körs av Garbage Collector (GC). Problemet:

- Du vet **inte när** GC kör den — det kan dröja länge
- Finalizerkön är trög och fördröjer GC:n
- Objekt med finalizer lever ett extra GC-varv längre
- Det är svårt att skriva korrekt kod i en finalizer

> För hanterade resurser (vanliga C#-objekt) behöver du aldrig en destruktor — GC tar hand om allt.

## IDisposable — rätt väg för ohanterade resurser

Om din klass håller en **ohanterad resurs** (filhandle, databaskoppling, nätverksanslutning) använder du `IDisposable` istället.

```csharp
public class FilSkrivare : IDisposable
{
    private StreamWriter _writer;
    private bool _disposed = false;

    public FilSkrivare(string sökväg)
    {
        _writer = new StreamWriter(sökväg);
    }

    public void Skriv(string text) => _writer.WriteLine(text);

    public void Dispose()
    {
        if (!_disposed)
        {
            _writer?.Dispose();
            _disposed = true;
        }
    }
}

// using-blocket anropar Dispose() automatiskt när blocket är klart
using (var fil = new FilSkrivare("log.txt"))
{
    fil.Skriv("Hej från fil!");
}
// Dispose() har körts — filen är stängd
```

## Kortare using-syntax (C# 8) ✨

```csharp
// ✨ C# 8 — ingen explicit block behövs
using var fil = new FilSkrivare("log.txt");
fil.Skriv("Hej från fil!");
// Dispose() körs automatiskt när variabeln lämnar scope
```

## Kombination: IDisposable + finalizer

Standardmönstret (Dispose pattern) kombinerar båda för att hantera både kontrollerad (`Dispose`) och okontrollerad (GC) frigöring.

```csharp
public class HanterdResurs : IDisposable
{
    private bool _disposed = false;

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                // Frigör hanterade resurser
            }
            // Frigör ohanterade resurser (om du har dem)
            _disposed = true;
        }
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);  // Säger åt GC att skippa finalizern
    }

    ~HanterdResurs() => Dispose(false);  // Säkerhetsnät om Dispose glömdes
}
```

## TL;DR

- Destruktor (`~Klass()`) körs av GC — du vet inte när
- Sällsynt i C# eftersom GC hanterar minnet automatiskt
- För ohanterade resurser: implementera `IDisposable` och använd `using`
- `using var` (C# 8) är kortast och anropar `Dispose()` automatiskt

Se även: [Garbage Collector](garbage-collector.md)
