---
title: Diagram
description: "Bra programmerare planerar innan de kodar. Diagram hjälper dig att tänka igenom ett problem, kommunicera lösningar till andra och dokumentera hur ett system är uppbyggt."
parent: C# bok
nav_order: 40
has_children: true
---
# Diagram

Bra programmerare planerar innan de kodar. Diagram hjälper dig att tänka igenom ett problem, kommunicera lösningar till andra och dokumentera hur ett system är uppbyggt.

Ett diagram är inte ett konstverk — det är ett verktyg för att **tänka** och **prata**. Ett suddigt diagram på en whiteboard som får teamet att förstå varandra är värt mer än ett perfekt diagram som ingen tittar på.

## Vilket diagram ska jag välja?

Börja med frågan: **vad vill jag visa?** Nästan alla diagram i programmering svarar på en av fyra frågor.

<svg class="dg" viewBox="0 0 720 400" role="img" aria-labelledby="dgi-t" xmlns="http://www.w3.org/2000/svg">
<title id="dgi-t">Beslutsträd för att välja diagram: logik och flöde, samarbete över tid, struktur, eller system och data, med föreslagna diagramtyper under varje gren</title>
<defs>
<marker id="dgi-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" orient="auto"><path d="M0 0L10 5L0 10z" class="ink"/></marker>
</defs>
<rect class="hl" x="235" y="15" width="250" height="44" rx="22"/><text x="360" y="43" text-anchor="middle" class="title">Vad vill jag visa?</text>
<path class="line" d="M360 59V80H90V105" marker-end="url(#dgi-f)"/>
<path class="line" d="M360 80H270V105" marker-end="url(#dgi-f)"/>
<path class="line" d="M360 80H450V105" marker-end="url(#dgi-f)"/>
<path class="line" d="M360 80H630V105" marker-end="url(#dgi-f)"/>
<rect class="q2" x="10" y="105" width="160" height="62" rx="6"/><text x="90" y="131" text-anchor="middle" class="title">Logik och steg</text><text x="90" y="152" text-anchor="middle" class="muted">steg och beslut</text>
<rect class="q4" x="190" y="105" width="160" height="62" rx="6"/><text x="270" y="131" text-anchor="middle" class="title">Samarbete</text><text x="270" y="152" text-anchor="middle" class="muted">vem anropar vem?</text>
<rect class="q3" x="370" y="105" width="160" height="62" rx="6"/><text x="450" y="131" text-anchor="middle" class="title">Struktur</text><text x="450" y="152" text-anchor="middle" class="muted">vad finns?</text>
<rect class="q1" x="550" y="105" width="160" height="62" rx="6"/><text x="630" y="131" text-anchor="middle" class="title">System och data</text><text x="630" y="152" text-anchor="middle" class="muted">var körs det?</text>
<rect class="box" x="10" y="190" width="160" height="34" rx="4"/><text x="90" y="212" text-anchor="middle">Flödesschema</text>
<rect class="box" x="10" y="232" width="160" height="34" rx="4"/><text x="90" y="254" text-anchor="middle">Aktivitetsdiagram</text>
<rect class="box" x="10" y="274" width="160" height="34" rx="4"/><text x="90" y="296" text-anchor="middle">Tillståndsdiagram</text>
<rect class="box" x="190" y="190" width="160" height="34" rx="4"/><text x="270" y="212" text-anchor="middle">Sekvensdiagram</text>
<rect class="box" x="190" y="232" width="160" height="34" rx="4"/><text x="270" y="254" text-anchor="middle">Use case-diagram</text>
<rect class="box" x="370" y="190" width="160" height="34" rx="4"/><text x="450" y="212" text-anchor="middle">Klassdiagram</text>
<rect class="box" x="370" y="232" width="160" height="34" rx="4"/><text x="450" y="254" text-anchor="middle">ER-diagram</text>
<rect class="box" x="370" y="274" width="160" height="34" rx="4"/><text x="450" y="296" text-anchor="middle">Paketdiagram</text>
<rect class="box" x="550" y="190" width="160" height="34" rx="4"/><text x="630" y="212" text-anchor="middle">Arkitektur (C4)</text>
<rect class="box" x="550" y="232" width="160" height="34" rx="4"/><text x="630" y="254" text-anchor="middle">Nätverksdiagram</text>
<rect class="box" x="550" y="274" width="160" height="34" rx="4"/><text x="630" y="296" text-anchor="middle">Dataflödesdiagram</text>
<rect class="box" x="550" y="316" width="160" height="34" rx="4"/><text x="630" y="338" text-anchor="middle">Driftsättning</text>
<text x="360" y="385" text-anchor="middle" class="muted">Ritar du för en kund eller ett team snarare än för kod? Se projektmetodik-boken.</text>
</svg>

| Jag vill visa… | Välj | Typ |
|----------------|------|-----|
| Stegen och besluten i en algoritm | [Flödesschema](flodesscheman.md) | — |
| Ett arbetsflöde med flera ansvariga eller parallella steg | [Aktivitetsdiagram](aktivitetsdiagram.md) | UML, beteende |
| Vilka lägen ett objekt kan vara i och vad som byter läge | [Tillståndsdiagram](tillstandsdiagram.md) | UML, beteende |
| Vem som anropar vem, i vilken ordning | [Sekvensdiagram](sekvensdiagram.md) | UML, interaktion |
| Vad användare ska kunna göra med systemet | [Use case-diagram](use-case-diagram.md) | UML, beteende |
| Klasser, fält, metoder och relationer | [UML-klassdiagram](uml-klassdiagram.md) | UML, struktur |
| Tabeller och relationer i en databas | [ER-diagram](er-diagram.md) | Datamodell |
| Hur systemet är uppdelat i delar — från helhet till komponent | [Arkitekturdiagram](arkitekturdiagram.md) | C4, block, komponent, paket, driftsättning |
| Servrar, nät, brandväggar och moln | [Nätverksdiagram](natverksdiagram.md) | Infrastruktur |
| Vart data tar vägen genom systemet | [Dataflödesdiagram](dataflodesdiagram.md) | DFD |

## UML — en familj, inte ett diagram

Många av diagrammen här är **UML** (Unified Modeling Language), en standard med 14 diagramtyper. Ingen ritar alla. De delas in i två grupper:

| Strukturdiagram — *hur det ser ut* | Beteendediagram — *hur det beter sig* |
|------------------------------------|---------------------------------------|
| Klassdiagram, paketdiagram, komponentdiagram, driftsättningsdiagram, objektdiagram | Aktivitetsdiagram, tillståndsdiagram, use case-diagram, sekvensdiagram (och övriga interaktionsdiagram) |

I praktiken räcker klass-, sekvens-, aktivitets-, tillstånds- och use case-diagram långt.

## Tre tumregler

1. **Ett diagram — en fråga.** Försöker du visa allt i samma bild visar du ingenting.
2. **Rita för läsaren.** En utvecklare behöver metodnamn; en kund behöver inte det.
3. **Skissa först, snygga till sen.** Papper och penna är det snabbaste diagramverktyget som finns.

## Sidor i detta avsnitt

| Sida | Innehåll |
|------|----------|
| [Flödesscheman](flodesscheman.md) | Rita logiken innan du kodar — beslut, loopar, pseudokod |
| [UML-klassdiagram](uml-klassdiagram.md) | Visualisera klasser, fält, metoder och relationer |
| [Sekvensdiagram](sekvensdiagram.md) | Anrop och svar mellan objekt, i tidsordning |
| [Aktivitetsdiagram](aktivitetsdiagram.md) | Arbetsflöden med simbanor och parallella steg |
| [Tillståndsdiagram](tillstandsdiagram.md) | Lägen och övergångar — t.ex. en orders livscykel |
| [Use case-diagram](use-case-diagram.md) | Aktörer och vad de vill göra med systemet |
| [ER-diagram](er-diagram.md) | Databasens entiteter, nycklar och kardinalitet |
| [Arkitekturdiagram](arkitekturdiagram.md) | Block, C4, komponenter, paket och driftsättning |
| [Nätverksdiagram](natverksdiagram.md) | Klienter, servrar, nätverk och moln |
| [Dataflödesdiagram](dataflodesdiagram.md) | Hur data flödar mellan processer och lager |
