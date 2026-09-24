---
title: Varför C# ser ut som det gör
description: "C# är inte det första objektorienterade, C-liknande språket. Det designades 2000 av ett team lett av Anders Hejlsberg, som tidigare låg bakom Turbo Pascal…"
parent: Grunder
nav_order: 7
---

# Varför C# ser ut som det gör

C# är inte det första objektorienterade, C-liknande språket. Det designades 2000 av ett team lett av **Anders Hejlsberg**, som tidigare låg bakom Turbo Pascal och Delphi. Det märks — C# är i hög grad ett språk byggt med facit i hand från språk som redan fanns.

Samma person ligger förresten bakom **TypeScript** (sedan 2012) — samma grundidé återanvänd på ett annat problem: lägg statisk typning ovanpå ett språk/en runtime som saknar det. C# gjorde det ovanpå .NET, TypeScript gör det ovanpå JavaScript.

## Vad som togs med, och varifrån

| Från | Vad C# tog med sig |
|------|---------------------|
| **C / C++** | Grundsyntax — måsvingar, semikolon, typade variabler, känns igen direkt |
| **Java** | Hanterad körning (CLR ≈ JVM), garbage collection, enkel arv av klasser, interfaces |
| **Delphi / Object Pascal** | Properties (`get`/`set`) som förstklassigt språkkoncept, inte bara konventionsnamngivna metoder |

## Vad som medvetet lämnades bort

Design är lika mycket vad man **inte** gör som vad man gör. Ett par exempel där C# tog en annan väg än Java:

- **Checked exceptions.** Java tvingar dig deklarera (`throws IOException`) eller hantera varje exception en metod kan kasta. C# valde att inte göra det — Anders Hejlsberg har själv sagt att det i praktiken bara ledde till att utvecklare fångade och ignorerade undantag för att tysta kompilatorn, snarare än att faktiskt hantera dem.
- **Properties utan boilerplate.** I Java skriver du `getName()`/`setName()` för hand. C# gjorde `{ get; set; }` till språksyntax från början — samma idé, mindre skrivande.
- **Värdetyper (`struct`) som förstklassiga.** C++ hade den distinktionen, Java saknade den länge (autoboxing löste det delvis långt senare). C# hade `struct` vs `class` — värde- vs referenssemantik — inbyggt från start.

## Ett språk som fortsätter lära sig

Det här mönstret har fortsatt långt efter 2000. Många funktioner i C#-historiken — pattern matching, records, nullable reference types — är svar på problem andra språk (Scala, F#, Kotlin) redan löst, anpassade till C#:s syntax. Se [Språkhistorik](sprakhistorik) för en version-för-version-lista.

## TL;DR

C# är inget urspråk — det är ett medvetet destillat: C/C++:s syntax, Javas hanterade körningsmodell, Delphis properties, och en löpande ström av lärdomar från andra språk som fortsätter än idag.
