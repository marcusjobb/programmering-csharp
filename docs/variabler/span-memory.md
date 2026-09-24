---
title: "Span<T> och Memory<T>"
description: "Det här är en avancerad, prestandafokuserad sida — du behöver den inte för att skriva vanlig applikationskod, men den förklarar varför viss modern…"
parent: Variabler
nav_order: 66
---

# Span&lt;T&gt; och Memory&lt;T&gt;

Det här är en avancerad, prestandafokuserad sida — du behöver den inte för att skriva vanlig applikationskod, men den förklarar varför viss modern .NET-kod ser annorlunda ut, och varför den är snabbare.

## Problemet — onödiga kopior

```csharp
string rad = "2026-09-24,Anna,30";
string[] delar = rad.Split(',');       // Allokerar en ny array
string datum = delar[0];               // Allokerar en ny sträng
string namn = rad.Substring(11, 4);    // Allokerar ännu en ny sträng
```

Varje `.Split()` och `.Substring()` kopierar data till en ny plats i minnet. För ett enstaka anrop spelar det ingen roll. Kör du det miljontals gånger i en het loop (parsing av loggfiler, nätverkspaket, stora datamängder) blir alla dessa kopior en mätbar prestandakostnad — och belastning på garbage collectorn, se [Garbage Collector](../oop/garbage-collector.md).

## Span&lt;T&gt; — en vy in i befintligt minne

`Span<T>` är inte en kopia — det är en **referens** in i ett existerande minnesområde (en array, en sträng, ett stackallokerat block), med start och längd. Att skapa en span kostar i princip ingenting.

```csharp
string rad = "2026-09-24,Anna,30";
ReadOnlySpan<char> radSpan = rad.AsSpan();

ReadOnlySpan<char> datum = radSpan.Slice(0, 10);   // Ingen kopia — bara start+längd in i samma minne

Console.WriteLine(datum.ToString());   // 2026-09-24
```

`Slice` kostar inte en ny allokering — den pekar bara in i den redan existerande strängen. Jämfört med `Substring`, som alltid skapar en helt ny sträng, är det här "gratis" i minnestermer.

## Ett konkret exempel — parsa utan att kopiera

```csharp
ReadOnlySpan<char> rad = "2026-09-24,Anna,30".AsSpan();

int kommaIndex = rad.IndexOf(',');
ReadOnlySpan<char> datum = rad.Slice(0, kommaIndex);
ReadOnlySpan<char> resten = rad.Slice(kommaIndex + 1);

Console.WriteLine(datum.ToString());    // 2026-09-24
Console.WriteLine(resten.ToString());   // Anna,30
```

Ingen `Split`, ingen array av delsträngar — bara vyer in i den ursprungliga strängen, ända tills du faktiskt behöver en riktig `string` (t.ex. för att spara i en databas eller skicka i ett API-svar).

## Memory&lt;T&gt; — samma idé, men kan lagras

`Span<T>` har en viktig begränsning: den kan bara leva på stacken, inte lagras i ett fält eller skickas till en `async`-metod (kompilatorn stoppar dig — `ref struct`, se [Struct](../oop/struct.md)). `Memory<T>` löser det — samma grundidé, en vy istället för en kopia, men den får sparas i klasser och skickas genom `async`/`await`.

```csharp
public class Buffer
{
    private Memory<byte> _data;   // OK — Memory<T> kan vara ett fält, Span<T> kan inte

    public async Task LäsAsync(Stream stream)
    {
        await stream.ReadAsync(_data);   // OK i async-metod
    }
}
```

## När spelar det här roll?

| Situation | Behöver du bry dig? |
|---|---|
| Vanlig CRUD-applikation, webbformulär, affärslogik | Nej — `string`/`Substring`/`Split` räcker gott |
| Parsing av stora textfiler eller loggar | Ja — `Span<T>` kan ge mätbar skillnad |
| Nätverksprotokoll, seriell I/O, high-throughput-API:er | Ja — det är exakt vad de inbyggda .NET-API:erna (t.ex. `System.IO.Pipelines`) bygger på |
| Du skriver ett bibliotek andra ska använda i hög skala | Ja — värt att överväga i den publika ytan |

## TL;DR

`Span<T>` är en vy in i befintligt minne istället för en kopia — `Slice` kostar i princip ingenting, till skillnad från `Substring`. `Memory<T>` är samma idé men får lagras i fält och användas i `async`-kod. Relevant för prestandakritisk parsing och I/O — inte något vanlig applikationskod behöver ta till som standard.
