---
title: Inline arrays
description: "Inline arrays — stackbaserade fixed-size buffertar utan unsafe (C# 12, ninja) — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Övrigt
nav_order: 35
---
# Inline arrays

> 🥷 **Ninjastoff** — används i prestandakritisk systemkod. Normalt inte nödvändigt i applikationskod.

En inline array är en fast-storleks buffer som lever på stacken — ingen heap-allokering, ingen GC-press, ingen `unsafe`. Precis som `Span<T>` men som en struct du kan definiera själv.

## När du läst detta ska du kunna

- Definiera en inline array med `[InlineArray]`
- Indexera och iterera den utan allokering
- Förklara varför det är snabbare än en vanlig array
- Förstå att den här funktionen nästan aldrig behövs i applikationskod

## Varför finns inline arrays?

En vanlig `int[]` allokeras på heapen. Det innebär ett GC-objekt, ett inheap-index och overhead vid skapandet. För kod som anropas miljontals gånger per sekund (parsers, nätverk, spel) är det för dyrt.

Inline arrays bor på stacken precis som en `int`-variabel — zero allocation.

## Definiera en inline array

```csharp
[System.Runtime.CompilerServices.InlineArray(8)]
public struct Buffer8
{
    private int _element;   // en enda privat fält — storleken sätts av attributet
}
```

Attributet `[InlineArray(8)]` berättar för kompilatorn att `Buffer8` innehåller 8 `int`-värden. Du skriver bara ett fält — kompilatorn sköter resten.

## Använda en inline array

```csharp
var buffer = new Buffer8();

// Indexera som en vanlig array
for (int i = 0; i < 8; i++)
    buffer[i] = i * i;

// Läs värden
for (int i = 0; i < 8; i++)
    Console.Write($"{buffer[i]} ");
// 0 1 4 9 16 25 36 49

// Iterera med foreach
foreach (int val in buffer)
    Console.Write($"{val} ");
```

## Konvertera till Span

```csharp
var buffer = new Buffer8();
Span<int> span = buffer;   // zero-copy — pekar direkt på bufferten

span.Fill(42);
Console.WriteLine(buffer[0]);   // 42
```

`Span<int>` och `ReadOnlySpan<int>` fungerar direkt mot bufferten utan kopiering.

## Jämförelse med alternativen

```csharp
// Heap-array — allokering + GC-press
int[] heap = new int[8];          // objekt på heapen

// stackalloc — ingen allokering men kräver Span, kan inte returneras
Span<int> stack = stackalloc int[8];

// Inline array — ingen allokering, kan vara struct-fält, kan returneras via ref
var inline = new Buffer8();       // lever i den omgivande structen/stacken
```

Inline arrays kan vara fält i en annan struct — det kan inte `stackalloc`.

## Praktiskt exempel — ringbuffer

```csharp
[System.Runtime.CompilerServices.InlineArray(16)]
public struct RingBuffer16
{
    private byte _element;
}

public struct FastParser
{
    private RingBuffer16 _window;   // 16 bytes inbakade i structen — noll allokering
    private int _head;

    public void Push(byte value)
    {
        _window[_head % 16] = value;
        _head++;
    }

    public byte Peek(int offset) => _window[(_head - 1 - offset) % 16];
}
```

## Begränsningar

- Storleken måste vara känd vid kompilering (en konstant)
- Alla element har samma typ
- `unsafe` behövs inte — det är en av poängerna
- Fungerar bara i `struct`-context (inte i klasser på heapen)

## TL;DR

```csharp
[System.Runtime.CompilerServices.InlineArray(4)]
public struct Vector4
{
    private float _element;
}

var v = new Vector4();
v[0] = 1.0f;
v[1] = 0.0f;
v[2] = 0.0f;
v[3] = 1.0f;

ReadOnlySpan<float> span = v;   // zero-copy
```

Inline arrays är en nischad prestandafunktion för systemkod, parsers och spelmotorer. I vanlig applikationskod är en `List<T>` eller en vanlig array rätt val.
