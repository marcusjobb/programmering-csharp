---
title: Objektorienterad programmering (OOP)
description: "Kod organiserad som objekt med data och beteende, istället för lösa variabler och funktioner som råkar hänga ihop."
parent: C# bok
nav_order: 80
has_children: True
---
# Objektorienterad programmering (OOP)

Ett program utan struktur är en hög lösa variabler och funktioner som *råkar* höra ihop, bara därför att de ligger nära varandra i filen. Objektorienterad programmering ger dig ett annat sätt att organisera det: bunta ihop data och de metoder som hör till den datan i en enda enhet — en klass — och låt klassen själv bestämma vad som får hända med sitt innehåll.

Det löser ett konkret problem, inte ett abstrakt ett. [Klasser och objekt](klasser.md) bygger ett `BankAccount` steg för steg för att visa exakt varför: utan struktur blandas kontonas data ihop så snart du har fler än ett par konton. Med en klass äger varje konto sin egen data, och vet själv hur den får ändras.

## Grunderna — bygg din första klass

- [Klasskomposition](klasskomposition.md) — en klass byggd av andra klassers objekt, innan vi går in på arv
- [Struct](struct.md) — värdetyper, och varför `int` egentligen är en liten struct
- [Konstruktorer](konstruktor.md) och [Konstruktoröverlagring](overlagring.md) — hur ett objekt startar i ett giltigt tillstånd
- [Properties](properties.md) — kontrollerade fönster in till ett objekts data
- [Klasser och objekt](klasser.md) — allt ovan satt ihop i ett komplett exempel
- [Åtkomstmoderator](atkomstmoderator/index.md) — `private`, `public`, `protected`, `internal`

## Skydda och visa data

- [Inkapsling](inkapsling.md) — varför data är privat och beteende är publikt
- [ToString-override](tostring.md) — hur ett objekt beskriver sig själv som text

## Bygga vidare på klasser

- [Arv](arv.md) — återanvänd kod genom en basklass, utan att kopiera den
- [Komposition över arv](compbeforeinherit.md) — när "har en" är ett bättre val än "är en"
- [Polymorfism](polymorfism/index.md), [Interfaces](polymorfism/interfaces/index.md), [Abstrakta klasser](polymorfism/abstraktaklasser/index.md) — olika objekt, samma gränssnitt
- [Delegater](delegater/index.md) och [Events](events/index.md) — metoder som data
- [Sealed](sealed.md) — stänga en klasshierarki medvetet
- [Static-klasser och metoder](static-klass.md) — när något tillhör typen, inte ett objekt
- [Partial class](partial-klass.md) — dela en klassdefinition över flera filer

## Data, värden och när du väljer vad

- [Records](records.md) — värdelikhet och oföränderlighet, gratis
- [Class, struct eller record — vilken?](records-structs-classes.md) — beslutstabellen som samlar alla fyra
- [POCO och DTO](poco-dto.md) — enkla dataklasser i praktiken, t.ex. i EF Core och API:er
- [Egna datatyper](egna-datatyper.md) — operator-överlagring, när din typ ska bete sig som en inbyggd

## Under huven

- [Garbage Collector](garbage-collector.md) — hur .NET faktiskt frigör minne
- [Destruktor och Finalizer](destruktor.md) — och varför du sällan behöver skriva en
- [Attribut och Reflection](attribut-reflection.md) — mekaniken bakom `[Required]`, EF Core och System.Text.Json
- [OOP — en kort historik](historik.md) — Simula, Smalltalk, C++, Java — vägen hit

## Testa dig själv

- [Testa dig själv](testa-dig-sjalv.md) — kontrollera att det satt sig innan du går vidare
