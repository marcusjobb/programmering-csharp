---
title: Destruktor och Finalizer
description: "En destruktor (eller finalizer) är kod som körs när ett objekt förstörs. I C# hanteras minnet automatiskt av Garbage Collector — destruktorn är sällan…"
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
public class Resource
{
    public Resource()
    {
        Console.WriteLine("Resurs skapades");
    }

    // Destruktor — körs av GC när objektet städas bort
    ~Resource()
    {
        Console.WriteLine("Resurs förstördes");
    }
}

{
    var r = new Resource();   // Resurs skapades
    // r går ur scope här
}
// "Resurs förstördes" skrivs ut... men när? GC bestämmer.
```

### Output (ungefärlig)

```
Resource created
Resource destroyed
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
public class FilePrinter : IDisposable
{
    private StreamWriter _writer;
    private bool _disposed = false;

    public FilePrinter(string path)
    {
        _writer = new StreamWriter(path);
    }

    public void Write(string text) => _writer.WriteLine(text);

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
using (var file = new FilePrinter("log.txt"))
{
    file.Write("Hej från fil!");
}
// Dispose() har körts — filen är stängd
```

## Kortare using-syntax (C# 8) ✨

```csharp
// ✨ C# 8 — ingen explicit block behövs
using var file = new FilePrinter("log.txt");
file.Write("Hej från fil!");
// Dispose() körs automatiskt när variabeln lämnar scope
```

## Kombination: IDisposable + finalizer

Standardmönstret (Dispose pattern) kombinerar båda för att hantera både kontrollerad (`Dispose`) och okontrollerad (GC) frigöring.

```csharp
public class HandledResource : IDisposable
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

    ~HandledResource() => Dispose(false);  // Säkerhetsnät om Dispose glömdes
}
```

## TL;DR

- Destruktor (`~Class()`) körs av GC — du vet inte när
- Sällsynt i C# eftersom GC hanterar minnet automatiskt
- För ohanterade resurser: implementera `IDisposable` och använd `using`
- `using var` (C# 8) är kortast och anropar `Dispose()` automatiskt

Se även: [Garbage Collector](garbage-collector.md)
