---
title: Objektorienterad programmering (OOP)
description: "Kod organiserad som objekt med data och beteende, istället för lösa variabler och funktioner som råkar hänga ihop."
parent: C# bok
nav_order: 80
has_children: True
---
# Objektorienterad programmering (OOP)

Ett program utan struktur är en hög lösa variabler och funktioner som *råkar* höra ihop, bara därför att de ligger nära varandra i filen. Objektorienterad programmering ger dig ett annat sätt att organisera det: bunta ihop data och de metoder som hör till den datan i en enda enhet — en klass — och låt klassen själv bestämma vad som får hända med sitt innehåll.

Det löser ett konkret problem, inte ett abstrakt ett. [Klasser och objekt](classes.md) bygger ett `BankAccount` steg för steg för att visa exakt varför: utan struktur blandas kontonas data ihop så snart du har fler än ett par konton. Med en klass äger varje konto sin egen data, och vet själv hur den får ändras.

## Grunderna — bygg din första klass

- [Klasskomposition](class-composition.md) — en klass byggd av andra klassers objekt, innan vi går in på arv
- [Struct](struct/) — värdetyper, och varför `int` egentligen är en liten struct
- [Konstruktorer](constructor.md) och [Konstruktoröverlagring](constructor-overloading.md) — hur ett objekt startar i ett giltigt tillstånd
- [Properties](properties/) — kontrollerade fönster in till ett objekts data
- [Klasser och objekt](classes.md) — allt ovan satt ihop i ett komplett exempel
- [Åtkomstmoderator](access-modifiers/index.md) — `private`, `public`, `protected`, `internal`

## Skydda och visa data

- [Inkapsling](encapsulation.md) — varför data är privat och beteende är publikt
- [ToString-override](to-string.md) — hur ett objekt beskriver sig själv som text

## Bygga vidare på klasser

- [Arv](inheritance.md) — återanvänd kod genom en basklass, utan att kopiera den
- [Komposition över arv](composition-before-inheritance.md) — när "har en" är ett bättre val än "är en"
- [Polymorfism](polymorphism/index.md), [Interfaces](polymorphism/interfaces/index.md), [Abstrakta klasser](polymorphism/abstract-classes/index.md) — olika objekt, samma gränssnitt
- [Delegater](delegates/index.md) och [Events](events/index/) — metoder som data
- [Sealed](sealed/) — stänga en klasshierarki medvetet
- [Static-klasser och metoder](static-class.md) — när något tillhör typen, inte ett objekt
- [Partial class](partial-class.md) — dela en klassdefinition över flera filer

## Data, värden och när du väljer vad

- [Records](records/) — värdelikhet och oföränderlighet, gratis
- [Class, struct eller record — vilken?](records-structs-classes/) — beslutstabellen som samlar alla fyra
- [POCO och DTO](poco-dto/) — enkla dataklasser i praktiken, t.ex. i EF Core och API:er
- [Egna datatyper](custom-types.md) — operator-överlagring, när din typ ska bete sig som en inbyggd

## Under huven

- [Garbage Collector](garbage-collector/) — hur .NET faktiskt frigör minne
- [Destruktor och Finalizer](destructor.md) — och varför du sällan behöver skriva en
- [Attribut och Reflection](attributes-reflection.md) — mekaniken bakom `[Required]`, EF Core och System.Text.Json
- [OOP — en kort historik](history.md) — Simula, Smalltalk, C++, Java — vägen hit

## Testa dig själv

- [Testa dig själv](test-yourself.md) — kontrollera att det satt sig innan du går vidare
