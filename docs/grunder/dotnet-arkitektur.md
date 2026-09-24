---
title: Hur .NET är uppbyggt
description: "Innan du skriver din första rad kod är det värt att förstå vad som faktiskt händer när koden körs. Det gör flera senare begrepp — varför C# och F# kan…"
parent: Grunder
nav_order: 5
---

# Hur .NET är uppbyggt

Innan du skriver din första rad kod är det värt att förstå vad som faktiskt händer när koden körs. Det gör flera senare begrepp — varför C# och F# kan dela samma projekt, varför "kompilerat" inte betyder samma sak som i C — mycket lättare att förstå.

## Kedjan från kod till körning

```
C#-kod (.cs)
    ↓  kompileras av csc
IL / CIL  (i en .dll eller .exe)
    ↓  läses av CLR
JIT-kompilering
    ↓
Maskinkod
    ↓
Operativsystemet
```

| Steg | Namn | Vad det gör |
|------|------|-------------|
| 1 | **csc** (C# Compiler) | Översätter din `.cs`-kod till IL — inte maskinkod |
| 2 | **IL** / **CIL** (Common Intermediate Language) | Ett mellanspråk, lagrat i `.dll`/`.exe`-filen. Plattforms­oberoende — samma IL kan köras på Windows, Linux eller macOS |
| 3 | **CLR** (Common Language Runtime) | Motorn som kör din `.dll`. Laddar in IL, hanterar minne (garbage collection), typkontroll, säkerhet |
| 4 | **JIT** (Just-In-Time-kompilering) | CLR översätter IL till riktig maskinkod, precis innan den ska köras — inte i förväg |
| 5 | **Maskinkod** | Det operativsystemet faktiskt kör |

## Varför ett mellansteg (IL)?

Det ser ut som ett extra steg för inget — varför inte kompilera direkt till maskinkod, som C gör?

Två skäl:

**Språkoberoende.** C#, F# och VB.NET kompilerar alla till samma IL. Ett F#-bibliotek kan användas rakt av från ett C#-projekt, utan omvägar — CLR bryr sig inte om vilket språk IL:en ursprungligen skrevs i.

**Plattformsoberoende.** Samma `.dll` kan köras på Windows, Linux och macOS, så länge det finns en CLR där. Det är JIT-steget — inte IL:en — som är plattformsspecifikt.

## Se det själv — ILSpy

Vill du se att det här faktiskt stämmer finns [ILSpy](https://github.com/icsharpcode/ILSpy) — gratis och open source. Öppna en kompilerad `.dll` och du kan se både IL:en direkt, och en dekompilerad version tillbaka till C# — eller till och med VB.NET. Samma IL, olika språk ut. Det är ett konkret sätt att se att IL verkligen är det gemensamma mellansteget.

## TL;DR

Din C#-kod blir aldrig maskinkod direkt. Den blir IL, ett språkoberoende mellansteg, som CLR sedan JIT-kompilerar till maskinkod först när programmet faktiskt körs.
