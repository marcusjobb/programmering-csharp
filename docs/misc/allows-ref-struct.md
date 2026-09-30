---
title: allows ref struct
description: "allows ref struct — generiska typer och Span i C# — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Övrigt
nav_order: 20
---
# allows ref struct

> **🥷 Ninjakod-varning**
>
> Det här är avancerad teknik för prestanda-kritisk kod. Du behöver förstå `Span<T>`, `ref struct` och generiska constraints innan detta ger mening. För daglig YH-kod behöver du inte detta — men du kan stöta på det i open source och bibliotekskod.

`allows ref struct` är en anti-constraint som talar om för kompilatorn att en generisk typparameter får vara en `ref struct` — till exempel `Span<T>` eller `ReadOnlySpan<T>`.

## Bakgrund — vad är ref struct?

En `ref struct` är en struct som **alltid lever på stacken** — den får aldrig allokeras på heapen, boxas eller sparas i ett fält. Det gör den extremt snabb men ger strikta begränsningar.

`Span<T>` och `ReadOnlySpan<T>` är de vanligaste ref struct-typerna. De representerar ett sammanhängande minnesblock utan kopiering:

```csharp
// ReadOnlySpan — refererar till befintligt minne, ingen allokering
string text = "hej världen";
ReadOnlySpan<char> slice = text.AsSpan(4, 6);   // "värld" — nollkopiering
```

## Problemet utan allows ref struct

Generiska metoder kan normalt inte ta emot `ref struct`:

```csharp
// Kompileringsfel — T kan inte vara en ref struct
void Process<T>(T value) where T : struct
{
    // ...
}

Process(new Span<int>(new int[5]));   // error
```

Anledningen: kompilatorn garanterar att `T` kan placeras var som helst — i fält, på heapen, i en lista. Men `ref struct` får inte det. Utan extra information kan kompilatorn inte tillåta det.

## Lösningen — allows ref struct

```csharp
// T får nu vara en ref struct
void Process<T>(T value) where T : allows ref struct
{
    // ...
}

Process(new Span<int>(new int[5]));   // OK!
```

`allows ref struct` säger: "den här typparametern *får* vara en ref struct, men behöver inte vara det."

## Praktiskt exempel — nollkopierings-parser

```csharp
// Generisk metod som arbetar med Span<T> utan att kopiera data
int CountOccurrences<T>(ReadOnlySpan<T> source, T target)
    where T : IEquatable<T>, allows ref struct
{
    int count = 0;
    for (int i = 0; i < source.Length; i++)
        if (source[i].Equals(target))
            count++;
    return count;
}
```

```csharp
string text = "banana";
ReadOnlySpan<char> span = text.AsSpan();

Console.WriteLine(CountOccurrences(span, 'a'));   // 3
```

Utan `allows ref struct` skulle `CountOccurrences` inte acceptera en `ReadOnlySpan<char>` — och du hade behövt kopiera strängen till en array.

## Interface och ref struct (C# 13)

`ref struct` kan nu implementera interface, men med begränsningen att de aldrig boxas:

```csharp
interface IBuffer<T>
{
    int Length { get; }
    T this[int index] { get; }
}

ref struct FastBuffer<T> : IBuffer<T>
{
    private readonly Span<T> _data;

    public FastBuffer(Span<T> data) => _data = data;

    public int Length     => _data.Length;
    public T this[int i]  => _data[i];
}
```

```csharp
int[] data = [10, 20, 30, 40, 50];
var buffer = new FastBuffer<int>(data);

Console.WriteLine(buffer.Length);    // 5
Console.WriteLine(buffer[2]);        // 30
```

## När är detta relevant?

- Du skriver ett bibliotek eller en parser som ska hantera stora datamängder utan heap-allokeringar
- Du arbetar med binärprotokoll, textparsning eller nätverksbuffertar
- Du optimerar en "hot path" som kallas miljoner gånger per sekund

För normal applikationskod — API:er, databaser, webbtjänster — behöver du aldrig tänka på detta.

## TL;DR

```csharp
// Utan allows ref struct — T kan inte vara Span<T>
void Old<T>(T value) where T : struct { }

// Med allows ref struct — T kan vara Span<T>, ReadOnlySpan<T> osv.
void New<T>(T value) where T : allows ref struct { }
```

`allows ref struct` öppnar dörren för generisk, nollkopierings-kod med `Span<T>`. Det är ett biblioteksverktyg — inte vardagskod.
