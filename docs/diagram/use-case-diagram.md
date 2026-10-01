---
title: Användningsfallsdiagram
description: "Ett användningsfallsdiagram (use case-diagram) visar vem som använder systemet och vad de ska kunna göra med det — inte hur det fungerar inuti."
parent: Diagram
nav_order: 60
---
# Användningsfallsdiagram (use case)

Ett användningsfallsdiagram visar **vem som använder systemet och vad de ska kunna göra med det**. Det säger ingenting om klasser, databaser eller knappar — bara *vilka* som är inblandade och *vilka mål* de har. Därför är det ofta det första diagrammet man ritar i ett projekt: innan någon vet hur systemet ska byggas, går det att enas om vad det ska kunna.

## När du läst detta ska du kunna

- Känna igen och namnge delarna i ett användningsfallsdiagram
- Skilja på `«include»` och `«extend»`
- Rita ett diagram med flera aktörer, varav ett externt system
- Översätta användningsfall till user stories — och vidare till kod

## Vad används det till?

- **Avgränsa systemet** — vad ingår, och vad gör någon annan (ett betalsystem, en annan avdelning)?
- **Hitta alla användare** — det är lätt att glömma administratören eller ett system som anropar ditt API
- **Prata med beställaren** — diagrammet är så enkelt att en kund kan rätta det på ett möte
- **Planera arbetet** — varje användningsfall blir en eller flera user stories i backloggen

## Delarna och vad de heter

<svg class="dg" viewBox="0 0 720 430" role="img" aria-labelledby="uc1-t" xmlns="http://www.w3.org/2000/svg">
<title id="uc1-t">Användningsfallsdiagram med namngivna delar: aktör, systemgräns, användningsfall, inkludering, utökning, association och generalisering mellan aktörer</title>
<defs>
<marker id="uc1-o" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10" class="line strong"/></marker>
<marker id="uc1-g" viewBox="0 0 12 12" refX="12" refY="6" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0L12 6L0 12z" class="box"/></marker>
</defs>
<rect class="line" x="170" y="30" width="350" height="310"/>
<text x="345" y="52" text-anchor="middle" class="title">Bibliotekssystem</text>
<circle class="box" cx="80" cy="80" r="12"/>
<line class="line strong" x1="80" y1="92" x2="80" y2="130"/>
<line class="line strong" x1="58" y1="105" x2="102" y2="105"/>
<path class="line strong" d="M62 160L80 130L98 160"/>
<text x="80" y="180" text-anchor="middle">Låntagare</text>
<circle class="box" cx="80" cy="260" r="12"/>
<line class="line strong" x1="80" y1="272" x2="80" y2="310"/>
<line class="line strong" x1="58" y1="285" x2="102" y2="285"/>
<path class="line strong" d="M62 340L80 310L98 340"/>
<text x="80" y="360" text-anchor="middle">Bibliotekarie</text>
<line class="line strong" x1="80" y1="246" x2="80" y2="188" marker-end="url(#uc1-g)"/>
<ellipse class="box" cx="265" cy="100" rx="70" ry="25"/><text x="265" y="105" text-anchor="middle">Låna bok</text>
<ellipse class="box" cx="450" cy="100" rx="58" ry="24"/><text x="450" y="105" text-anchor="middle">Logga in</text>
<ellipse class="box" cx="265" cy="215" rx="72" ry="24"/><text x="265" y="220" text-anchor="middle">Reservera bok</text>
<ellipse class="box" cx="270" cy="295" rx="78" ry="24"/><text x="270" y="300" text-anchor="middle">Registrera bok</text>
<line class="line strong" x1="105" y1="105" x2="195" y2="100"/>
<line class="line strong" x1="105" y1="290" x2="192" y2="295"/>
<line class="line dash" x1="335" y1="100" x2="392" y2="100" marker-end="url(#uc1-o)"/>
<text x="363" y="90" text-anchor="middle" class="muted">«include»</text>
<line class="line dash" x1="265" y1="191" x2="265" y2="125" marker-end="url(#uc1-o)"/>
<text x="273" y="163" class="muted">«extend»</text>
<path class="leader" d="M80 66V14H540"/><text x="546" y="18" class="part">Aktör</text>
<line class="leader" x1="520" y1="45" x2="540" y2="45"/><text x="546" y="49" class="part">Systemgräns</text>
<path class="leader" d="M363 76V66H540"/><text x="546" y="70" class="part">Inkludering</text>
<line class="leader" x1="508" y1="100" x2="540" y2="100"/><text x="546" y="104" class="part">Användningsfall</text>
<line class="leader" x1="330" y1="159" x2="540" y2="159"/><text x="546" y="163" class="part">Utökning</text>
<path class="leader" d="M150 293V385H540"/><text x="546" y="389" class="part">Association</text>
<path class="leader" d="M80 215H25V410H540"/><text x="546" y="414" class="part">Generalisering</text>
</svg>

| Del | Hur den ritas | Vad den betyder |
|-----|---------------|-----------------|
| **Aktör** (actor) | Streckgubbe med namn under | En *roll* som använder systemet — en person eller ett annat system. Inte en specifik person: "Låntagare", inte "Kalle" |
| **Användningsfall** (use case) | Ellips med ett verb + objekt | Något en aktör vill uppnå med systemet: "Låna bok". Ett *mål*, inte en knapp |
| **Systemgräns** (system boundary) | Ram med systemets namn | Allt innanför bygger vi. Allt utanför — aktörerna — finns redan |
| **Association** | Heldragen linje utan pil | Aktören deltar i användningsfallet |
| **Inkludering** `«include»` | Streckad pil *till* det som alltid ingår | Användningsfallet gör *alltid* det andra som en del av sig: att låna en bok kräver alltid inloggning |
| **Utökning** `«extend»` | Streckad pil *från* tillägget *till* basfallet | Tillägget sker *ibland*, under ett villkor: är boken utlånad kan låntagaren reservera den |
| **Generalisering** | Heldragen linje med ihålig triangel mot den allmänna | Den speciella aktören kan allt som den allmänna kan, och mer. En bibliotekarie kan låna böcker som alla andra |

Pilarna för `«include»` och `«extend»` pekar åt *olika håll* — det är det som oftast blir fel. Ett sätt att komma ihåg det: pilen pekar alltid **från den som vet om den andra**. "Låna bok" vet att den behöver inloggning → pilen går från Låna bok till Logga in. "Låna bok" vet *inte* om reservationer — det är reservationen som vet när den ska kliva in → pilen går från Reservera bok till Låna bok.

## Exempel — ett bibliotekssystem

En låntagare kan söka, låna och lämna tillbaka böcker. Att låna kräver inloggning. Lämnas boken tillbaka för sent tillkommer en förseningsavgift, som betalas via ett **externt betalsystem** — det ligger utanför systemgränsen och är därför en aktör, trots att det inte är en människa. Bibliotekarien kan allt en låntagare kan, och registrerar dessutom nya böcker.

<svg class="dg" viewBox="0 0 720 420" role="img" aria-labelledby="uc2-t" xmlns="http://www.w3.org/2000/svg">
<title id="uc2-t">Användningsfallsdiagram för ett bibliotekssystem med aktörerna Låntagare, Bibliotekarie och det externa Betalsystemet, där Låna bok inkluderar Logga in och Betala avgift utökar Lämna tillbaka bok</title>
<defs>
<marker id="uc2-o" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10" class="line strong"/></marker>
<marker id="uc2-g" viewBox="0 0 12 12" refX="12" refY="6" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0L12 6L0 12z" class="box"/></marker>
</defs>
<rect class="line" x="150" y="20" width="410" height="355"/>
<text x="355" y="42" text-anchor="middle" class="title">Bibliotekssystem</text>
<circle class="box" cx="70" cy="110" r="12"/>
<line class="line strong" x1="70" y1="122" x2="70" y2="160"/>
<line class="line strong" x1="48" y1="135" x2="92" y2="135"/>
<path class="line strong" d="M52 190L70 160L88 190"/>
<text x="70" y="210" text-anchor="middle">Låntagare</text>
<circle class="box" cx="70" cy="300" r="12"/>
<line class="line strong" x1="70" y1="312" x2="70" y2="350"/>
<line class="line strong" x1="48" y1="325" x2="92" y2="325"/>
<path class="line strong" d="M52 380L70 350L88 380"/>
<text x="70" y="400" text-anchor="middle">Bibliotekarie</text>
<line class="line strong" x1="70" y1="286" x2="70" y2="218" marker-end="url(#uc2-g)"/>
<circle class="box" cx="640" cy="270" r="12"/>
<line class="line strong" x1="640" y1="282" x2="640" y2="320"/>
<line class="line strong" x1="618" y1="295" x2="662" y2="295"/>
<path class="line strong" d="M622 350L640 320L658 350"/>
<text x="640" y="370" text-anchor="middle">Betalsystem</text>
<text x="640" y="388" text-anchor="middle" class="muted">(externt)</text>
<ellipse class="box" cx="255" cy="80" rx="82" ry="24"/><text x="255" y="85" text-anchor="middle">Söka bok</text>
<ellipse class="box" cx="255" cy="155" rx="82" ry="24"/><text x="255" y="160" text-anchor="middle">Låna bok</text>
<ellipse class="box" cx="255" cy="230" rx="82" ry="24"/><text x="255" y="235" text-anchor="middle">Lämna tillbaka bok</text>
<ellipse class="box" cx="255" cy="330" rx="82" ry="24"/><text x="255" y="335" text-anchor="middle">Registrera ny bok</text>
<ellipse class="hl" cx="460" cy="155" rx="60" ry="24"/><text x="460" y="160" text-anchor="middle">Logga in</text>
<ellipse class="hl" cx="460" cy="300" rx="80" ry="24"/><text x="460" y="305" text-anchor="middle">Betala avgift</text>
<line class="line strong" x1="92" y1="135" x2="173" y2="80"/>
<line class="line strong" x1="92" y1="135" x2="173" y2="155"/>
<line class="line strong" x1="92" y1="135" x2="173" y2="230"/>
<line class="line strong" x1="92" y1="325" x2="173" y2="330"/>
<line class="line strong" x1="540" y1="300" x2="618" y2="300"/>
<line class="line dash" x1="337" y1="155" x2="400" y2="155" marker-end="url(#uc2-o)"/>
<text x="368" y="145" text-anchor="middle" class="muted">«include»</text>
<line class="line dash" x1="405" y1="283" x2="320" y2="244" marker-end="url(#uc2-o)"/>
<text x="372" y="257" class="muted">«extend»</text>
</svg>

Diagrammet säger *vad* systemet ska kunna — inte i vilken ordning, och inte hur. Hur "Låna bok" går till steg för steg ritar du som ett [aktivitetsdiagram](aktivitetsdiagram.md) eller ett [sekvensdiagram](sekvensdiagram.md).

### Från användningsfall till user stories

Ett användningsfall och en **user story** beskriver samma sak från två håll. Användningsfallsdiagrammet ger *överblicken* — alla mål på en sida. User storyn är *en* av ellipserna, formulerad så att den går att planera och testa:

| Användningsfall | User story |
|-----------------|-----------|
| Låntagare — Låna bok | *Som låntagare vill jag låna en bok, så att jag kan läsa den hemma.* |
| Låntagare — Reservera bok («extend») | *Som låntagare vill jag reservera en utlånad bok, så att jag får den när den kommer tillbaka.* |
| Bibliotekarie — Registrera ny bok | *Som bibliotekarie vill jag registrera nya böcker, så att låntagarna kan hitta dem.* |

Aktören blir "Som …", användningsfallet blir "vill jag …", och nyttan — "så att …" — är det du själv lägger till. Mer om user stories och MVP finns i projektmetodik-boken, på sidan *User story och MVP* under Begrepp.

Och vidare till kod: ofta blir varje användningsfall en metod i ett service-lager — `LoanService.LendBook(...)`, `LoanService.ReturnBook(...)` — och `«include»` blir ett anrop som alltid görs först, till exempel att kontrollera att användaren är inloggad.

## När ska du välja ett användningsfallsdiagram?

| Välj användningsfallsdiagram när… | Välj något annat när… |
|-----------------------------------|-----------------------|
| Projektet är nytt och ni ska enas om vad som ska byggas | Du ska visa *hur* ett användningsfall går till steg för steg → [aktivitetsdiagram](aktivitetsdiagram.md) |
| Det finns flera olika användare eller externa system | Du ska visa vilka anrop som görs mellan objekten → [sekvensdiagram](sekvensdiagram.md) |
| Du vill visa var systemets gräns går | Du ska visa vilka klasser som behövs → [klassdiagram](uml-klassdiagram.md) |
| Du pratar med en beställare som inte kodar | Du ska visa hur systemets delar och tjänster hänger ihop tekniskt → [arkitekturdiagram](arkitekturdiagram.md) |

## Vanliga misstag

- **Användningsfall som är knappar eller steg.** "Klicka på Låna" eller "Validera ISBN" är inga mål. Fråga: *skulle aktören vara nöjd om bara detta hände?*
- **Pilar mellan användningsfallen som visar ordning.** Ett användningsfallsdiagram har inget flöde. "Först sök, sedan låna" hör hemma i ett aktivitetsdiagram.
- **`«include»` och `«extend»` åt fel håll.** Include pekar mot det som alltid ingår. Extend pekar mot basfallet som utökas.
- **För mycket `«include»` och `«extend»`.** De är kryddor. Ett diagram med bara aktörer, ellipser och linjer är oftast tydligast.
- **Glömt de icke-mänskliga aktörerna.** Ett betalsystem, en schemalagd körning eller ett annat API är också aktörer om de använder — eller används av — systemet.

## Övning

Rita ett användningsfallsdiagram för en bokningsapp till ett gym. Aktörer: `Medlem`, `Instruktör` och det externa systemet `Betaltjänst`. Medlemmar ska kunna boka pass, avboka pass och köpa medlemskap. Instruktörer ska kunna skapa pass och se deltagarlistor. Använd minst ett `«include»` (vad krävs alltid?) och ett `«extend»` (vad händer bara ibland — till exempel att ställa sig i kö när passet är fullt?). Skriv sedan tre av användningsfallen som user stories.

## TL;DR

| Begrepp | Vad det är |
|---------|-----------|
| Användningsfallsdiagram | Vem använder systemet, och vad vill de uppnå? |
| Aktör | En roll utanför systemet — person eller system |
| Ellips | Ett mål: verb + objekt |
| `«include»` | Ingår *alltid* — pilen pekar mot det som ingår |
| `«extend»` | Händer *ibland* — pilen pekar mot basfallet |
| User story | Ett användningsfall formulerat för backloggen: "Som … vill jag … så att …" |
