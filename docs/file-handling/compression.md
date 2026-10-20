---
title: Komprimering
description: "Komprimering av data i C# — GZip, Deflate och Zstandard — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Filhantering
nav_order: 115
---
# Komprimering

`System.IO.Compression` innehåller klasser för att komprimera och dekomprimera data. Du kan använda det för att spara diskutrymme, snabba upp nätverksöverföring eller hantera komprimerade filer som `.gz` och `.zst`.

## När du läst detta ska du kunna

- Komprimera och dekomprimera med GZip
- Använda Zstandard (zstd) för snabbare komprimering
- Omsluta befintlig data med `ReadOnlyMemoryStream` utan kopiering
- Välja rätt komprimeringsformat för situationen

## GZip — standardvalet

GZip är välkänt och stöds överallt. Använd `GZipStream` för att komprimera till en fil eller ett minne:

```csharp
using System.IO.Compression;

// Komprimera en sträng till en byte-array
byte[] Compress(string text)
{
    var input = Encoding.UTF8.GetBytes(text);

    using var output = new MemoryStream();
    using (var gzip = new GZipStream(output, CompressionMode.Compress))
        gzip.Write(input);

    return output.ToArray();
}

// Dekomprimera tillbaka till sträng
string Decompress(byte[] compressed)
{
    using var input  = new MemoryStream(compressed);
    using var gzip   = new GZipStream(input, CompressionMode.Decompress);
    using var reader = new StreamReader(gzip, Encoding.UTF8);

    return reader.ReadToEnd();
}
```

```csharp
var original    = "Hej, det här är en lång text som komprimeras!";
var compressed  = Compress(original);
var restored    = Decompress(compressed);

Console.WriteLine($"Original:     {original.Length} tecken");
Console.WriteLine($"Komprimerad:  {compressed.Length} bytes");
Console.WriteLine($"Återställd:   {restored}");
```

## Zstandard (zstd) — snabbare och effektivare

Zstandard är ett modernare format som komprimerar snabbare än GZip och ofta ger bättre kompressionsnivå. Det används bland annat av Facebook och i Linux-kerneln.

`ZstdStream` finns i `System.IO.Compression` och fungerar på samma sätt som `GZipStream`:

```csharp
using System.IO.Compression;

byte[] CompressZstd(byte[] data)
{
    using var output = new MemoryStream();
    using (var zstd = new ZstdStream(output, CompressionMode.Compress))
        zstd.Write(data);

    return output.ToArray();
}

byte[] DecompressZstd(byte[] compressed)
{
    using var input  = new MemoryStream(compressed);
    using var zstd   = new ZstdStream(input, CompressionMode.Decompress);
    using var result = new MemoryStream();

    zstd.CopyTo(result);
    return result.ToArray();
}
```

## ReadOnlyMemoryStream — nollkopiering

Ofta har du data i minnet som en `byte[]` eller `ReadOnlyMemory<byte>` och vill läsa den som en `Stream` — till exempel för att skicka den till en komprimeringsström. `MemoryStream` kopierar datan. `ReadOnlyMemoryStream` gör det inte:

```csharp
byte[] data = GetDataFromSomewhere();

// Gamla sättet — kopierar datan
using var old = new MemoryStream(data);

// Nya sättet — ingen kopiering
using var efficient = new ReadOnlyMemoryStream(data);

using var zstd   = new ZstdStream(efficient, CompressionMode.Compress);
using var output = new MemoryStream();
zstd.CopyTo(output);
```

`ReadOnlyMemoryStream` är snabbare och förbrukar mindre minne när du arbetar med stora datamängder.

## Komprimera en fil

```csharp
void CompressFile(string inputPath, string outputPath)
{
    using var input  = File.OpenRead(inputPath);
    using var output = File.Create(outputPath);
    using var gzip   = new GZipStream(output, CompressionLevel.SmallestSize);

    input.CopyTo(gzip);
}

void DecompressFile(string inputPath, string outputPath)
{
    using var input  = File.OpenRead(inputPath);
    using var gzip   = new GZipStream(input, CompressionMode.Decompress);
    using var output = File.Create(outputPath);

    gzip.CopyTo(output);
}
```

```csharp
CompressFile("rapport.txt", "rapport.txt.gz");
DecompressFile("rapport.txt.gz", "rapport-restored.txt");
```

## CompressionLevel

```csharp
// Välj nivå baserat på prioritet
CompressionLevel.Fastest         // Snabb, sämre kompression
CompressionLevel.Optimal         // Balans
CompressionLevel.SmallestSize    // Långsam, bästa kompression
CompressionLevel.NoCompression   // Ingen komprimering — bara overhead
```

## Jämförelse — format

| Format | Hastighet | Kompression | Användning |
|--------|-----------|-------------|------------|
| GZip | Medel | Bra | Webb, filer — universellt stöd |
| Deflate | Snabb | OK | Inbäddad i GZip och ZIP |
| Zstandard | Snabb | Mycket bra | Loggfiler, nätverk, stora datamängder |

## TL;DR

```csharp
// GZip — standardvalet, fungerar överallt
using var gzip = new GZipStream(output, CompressionMode.Compress);

// Zstandard — snabbare och effektivare
using var zstd = new ZstdStream(output, CompressionMode.Compress);

// Läs befintlig byte[] som stream utan kopiering
using var stream = new ReadOnlyMemoryStream(data);
```
