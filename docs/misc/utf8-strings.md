---
title: UTF-8 string literals
description: "UTF-8 string literals — u8-suffix för zero-allocation byte-strängar (C# 11, ninja) — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Övrigt
nav_order: 38
---
# UTF-8 string literals

> 🥷 **Ninjastoff** — används vid lågnivåprogrammering, nätverk och prestandakritisk nätverkskommunikation. Sällan nödvändigt i vanlig applikationskod.

Suffixet `u8` på en sträng ger dig en `ReadOnlySpan<byte>` med UTF-8-kodad data — direkt inbakad i assemblyt, noll allocation, noll konvertering vid körning.

## Problemet — strängar är UTF-16 i .NET

.NET lagrar alla strängar (`string`) som UTF-16. HTTP, JSON och de flesta protokoll pratar UTF-8. Varje konvertering kostar tid och heap-utrymme.

```csharp
// Gammal lösning — allokerar en byte-array vid körning
byte[] header = System.Text.Encoding.UTF8.GetBytes("Content-Type: application/json");
```

## u8-suffix — inbakat i assemblyt

```csharp
// Ny lösning — noll runtime-allokering, data är i assemblyt
ReadOnlySpan<byte> header = "Content-Type: application/json"u8;
```

Kompilatorn konverterar strängen till UTF-8 bytes vid kompilering och bäddar in dem i assemblyt. Vid körning peker `span` direkt mot dem — inget new, inget malloc.

## Grundläggande användning

```csharp
ReadOnlySpan<byte> hello  = "Hello, world!"u8;
ReadOnlySpan<byte> crlf   = "\r\n"u8;
ReadOnlySpan<byte> json   = """{"ok":true}"""u8;   // raw string + u8

Console.WriteLine(hello.Length);   // 13 (bytes, inte tecken — samma här)

// Jämföra bytes
bool match = hello.SequenceEqual("Hello, world!"u8);
Console.WriteLine(match);   // True
```

## Nätverkskod — zero-copy HTTP-headers

```csharp
static readonly ReadOnlyMemory<byte> OkResponse =
    "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n"u8.ToArray();

// Kan skickas direkt till Socket.SendAsync utan konvertering
await socket.SendAsync(OkResponse, SocketFlags.None);
```

`u8`-literaler kan konverteras till `ReadOnlyMemory<byte>` för situationer där du behöver spara dem längre.

## Raw string + u8

```csharp
// Kombinera raw strings med u8 för JSON-templates
ReadOnlySpan<byte> template = """
{
  "status": "ok",
  "version": "1.0"
}
"""u8;
```

## Jämförelse med alternativ

| Metod | Allocation | Konvertering | Kan lagras statiskt |
|-------|------------|-------------|---------------------|
| `Encoding.UTF8.GetBytes(s)` | Ja (varje gång) | Ja (runtime) | Nej |
| `static readonly byte[]` | En gång vid start | Ja (startup) | Ja |
| `"..."u8` + `.ToArray()` | En gång (startup via static) | Nej | Ja |
| `"..."u8` direkt | Noll | Noll | Nej (stack only) |

## Begränsningar

- Bara konstanta strängar — ingen interpolering (`$"hej {name}"u8` fungerar inte)
- `ReadOnlySpan<byte>` lever bara på stacken — kan inte lagras i fält
- Konvertera till `ReadOnlyMemory<byte>` om du behöver lagra den längre

## TL;DR

```csharp
// Konstant UTF-8 data — noll allokering, noll konvertering
ReadOnlySpan<byte> ping = "PING"u8;
ReadOnlySpan<byte> json = """{"ok":true}"""u8;

// Spara i statiskt fält om du behöver den längre
static readonly ReadOnlyMemory<byte> Header =
    "Content-Type: application/json\r\n"u8.ToArray();
```

`u8` är för kod som hanterar rå bytes — parsers, protokoll, binärt I/O. I vanlig applikationskod är `string` rätt val.
