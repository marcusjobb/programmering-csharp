---
title: Datastrukturer
description: "Olika sätt att lagra en samling av data — och varför valet mellan dem sällan handlar om vad som fungerar, utan om vad som fungerar bäst för just det du gör."
parent: C# bok
nav_order: 70
has_children: True
---
# Datastrukturer

En datastruktur är ett organiserat sätt att lagra flera värden tillsammans. Nästan alla program behöver hantera mer än ett värde av samma sort — en lista med studenter, ett register över priser, en kö av jobb att bearbeta — och vilken struktur du väljer avgör hur enkelt och snabbt det går att söka, sortera, lägga till och ta bort.

## Grunderna — sekventiell lagring

- [Arrays](arrays/) — fast storlek, indexering, den enklaste formen
- [List\<T\>](list/) — samma idé som en array, men den kan växa och krympa
- [Tvådimensionella arrayer](tvadimensionella-arrayer/), [Tredimensionella arrayer](tredimensionella-arrayer/), [Jagged arrays](jagged-arrays/) — när en enda rad av värden inte räcker
- [Array övningar](arrayexercises/index/) — träna på det du just läst

## Uppslagning — hämta via nyckel, inte position

- [Dictionary](dictionary/) — nyckel-värde-par, som en telefonbok i kod
- [HashSet](hashset/) — bara unika värden, ingen given ordning
- [IList och IDictionary](interface-vs-konkret-typ/) — gränssnitten bakom List och Dictionary, och varför de spelar roll i metodsignaturer

## Kö-strukturer — ordningen bestämmer vad du får ut

- [Stack och Queue](stack-queue/) — LIFO och FIFO, senast in/först in

## Länkade strukturer

- [LinkedList](linkedlist/) — noder som pekar på varandra, istället för sammanhängande minne

## Fråga och bearbeta samlingar

- [LINQ](linq/) — filtrera, transformera och aggregera utan handskrivna loopar
- [Sökalgoritmer](sokalgoritmer/) — linjär sökning, binärsökning och skillnaden i hastighet

## Skriv din egen, återanvändbara struktur

- [Generics](generics/) — samma kod, vilken typ som helst — det som gör `List<T>` möjlig i första taget

## Testa dig själv

- [Testa dig själv](testa-dig-sjalv/) — kontrollera att det satt sig innan du går vidare
