---
title: Formatering och utskrift
layout: default
parent: Variabler
nav_order: 41
---
# Formatering och utskrift

Att skriva ut text är sällan bara "skriv ut den här strängen" — du vill ofta styra hur den ser ut: en ny rad här, ett citattecken där, eller ett tal som ska visas som pengar istället för en lång decimal. C# har inbyggt stöd för båda delarna.

## När du läst detta ska du kunna

- Använda de vanligaste escape-tecknen i strängar
- Formatera tal som valuta, procent och med ett bestämt antal decimaler

## Escape-tecken

Ett backslash-tecken (`\`) i en sträng markerar att nästa tecken ska tolkas specialt istället för att skrivas ut bokstavligt. `\n` betyder inte "ett n" — det betyder "ny rad". Samma idé gäller `\t` (tabulator), `\"` (ett citattecken, trots att citattecken normalt avslutar strängen) och `\\` (ett bokstavligt backslash, eftersom backslash annars alltid tolkas som en specialkod).

```csharp
Console.WriteLine("Hej\nVärlden!");                              // ny rad mellan orden
Console.WriteLine("Mitt namn är Marcus men vissa kallar mig \"Mackan\".");  // citattecken i texten
Console.WriteLine("Sökväg: C:\\Users\\Marcus");                   // bokstavligt backslash
```

Alternativet till escape-tecken för citattecken och backslash är en **rå sträng** (`@"..."` eller `"""..."""` i nyare C#) där inga specialtecken tolkas alls — bra när texten innehåller många backslash, till exempel filsökvägar.

## Formatera tal vid utskrift

Ett `double` som `1234.5` visas som just `1234.5` som standard — men om du vill visa det som `1 234,50 kr` eller `15,8 %` behöver du en formatkod. Formatkoden skrivs efter ett kolon inuti en interpolerad sträng:

```csharp
double pris = 1234.5;
double andel = 0.1575;

Console.WriteLine($"Pris: {pris:N2} kr");   // Pris: 1 234,50 kr — tusentalsavskiljare, 2 decimaler
Console.WriteLine($"Andel: {andel:P1}");    // Andel: 15,8 %     — som procent, 1 decimal
Console.WriteLine($"Pris: {pris:C}");       // Pris: 1 234,50 kr — valutaformat enligt datorns språkinställning
```

`N2` betyder "numeriskt format, 2 decimaler" — siffran styr antalet decimaler, så `N0` ger inga decimaler alls och `N4` ger fyra. `P1` gör samma sak för procent, och multiplicerar dessutom värdet med 100 automatiskt (`0.1575` blir `15,8 %`, inte `0,16 %`). `C` läser av datorns regioninställningar och väljer valutasymbol och separatorer därefter — kör samma kod på en amerikansk dator och du får dollartecken istället för kronor.

## TL;DR

| Kod | Betyder | Exempel |
|-----|---------|---------|
| `\n` | Ny rad | `"Hej\nVärlden"` |
| `\t` | Tabulator | `"Kol1\tKol2"` |
| `\"` | Citattecken i strängen | `"Han sa \"hej\""` |
| `\\` | Bokstavligt backslash | `"C:\\Temp"` |
| `:N2` | Tal med tusentalsavskiljare, 2 decimaler | `1234.5` → `1 234,50` |
| `:P1` | Procent, 1 decimal (×100 automatiskt) | `0.1575` → `15,8 %` |
| `:C` | Valutaformat enligt systemets språkinställning | `1234.5` → `1 234,50 kr` |
