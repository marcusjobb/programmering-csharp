---
title: Tillståndsdiagram
description: "Ett tillståndsdiagram visar vilka lägen en sak kan vara i, och vad som får den att byta läge. Perfekt för ordrar, ärenden, spelfigurer och allt annat som har en livscykel."
parent: Diagram
nav_order: 50
---
# Tillståndsdiagram

Ett tillståndsdiagram (state machine) visar **vilka lägen en sak kan vara i, och vad som får den att byta läge**. En order kan vara skapad, betald eller skickad. En dörr kan vara öppen, stängd eller låst. Diagrammet svarar på två frågor: *vilka tillstånd finns?* och *vilka övergångar är tillåtna?* — och lika viktigt: vilka är **inte** tillåtna.

## När du läst detta ska du kunna

- Känna igen och namnge delarna i ett tillståndsdiagram
- Läsa och skriva en övergång på formen `händelse [villkor] / handling`
- Rita livscykeln för ett objekt, med självövergång och sluttillstånd
- Implementera ett tillståndsdiagram i C# med `enum` och ett switch-uttryck

## Vad används det till?

- **Beskriva en livscykel** — en order, ett supportärende, en ansökan, ett konto
- **Hitta förbjudna övergångar** — kan en order som redan är skickad avbrytas? Diagrammet tvingar fram svaret
- **Styra beteende i spel och gränssnitt** — en spelfigur som står, går, hoppar; en knapp som är aktiv eller inaktiv
- **Planera koden** — ett tillståndsdiagram blir nästan rad för rad en `enum` och en `switch`

## Delarna och vad de heter

Exemplet är en kaffeautomat. Den står `Redo` tills någon stoppar i tillräckligt med pengar. Då brygger den — först maler den, sedan värmer den — och går tillbaka till `Redo`.

<svg class="dg" viewBox="0 0 720 330" role="img" aria-labelledby="st1-t" xmlns="http://www.w3.org/2000/svg">
<title id="st1-t">Tillståndsdiagram för en kaffeautomat med namngivna delar: initialtillstånd, tillstånd, självövergång, övergång med händelse, villkor och effekt, sammansatt tillstånd med deltillstånd, samt sluttillstånd</title>
<defs>
<marker id="st1-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
</defs>
<text x="12" y="30" class="part">Initialtillstånd</text>
<line class="leader" x1="40" y1="71" x2="40" y2="36"/>
<circle class="solid" cx="40" cy="80" r="9"/>
<line class="line strong" x1="49" y1="80" x2="80" y2="80" marker-end="url(#st1-f)"/>
<rect class="box" x="80" y="60" width="120" height="40" rx="14"/><text x="140" y="85" text-anchor="middle">Redo</text>
<path class="line strong" d="M160 60C160 20 195 20 195 60" marker-end="url(#st1-f)"/>
<text x="205" y="35">mynt [belopp &lt; 20]</text>
<line class="line strong" x1="200" y1="80" x2="318" y2="80" marker-end="url(#st1-f)"/>
<text x="259" y="72" text-anchor="middle" class="muted">stäng av</text>
<circle class="box" cx="330" cy="80" r="12"/>
<circle class="solid" cx="330" cy="80" r="7"/>
<line class="line strong" x1="140" y1="100" x2="140" y2="200" marker-end="url(#st1-f)"/>
<text x="150" y="130">mynt</text>
<text x="150" y="150">[belopp ≥ 20]</text>
<text x="150" y="170">/ starta</text>
<line class="line strong" x1="95" y1="200" x2="95" y2="100" marker-end="url(#st1-f)"/>
<text x="88" y="150" text-anchor="end">klar / pip</text>
<rect class="box" x="40" y="200" width="360" height="110" rx="14"/>
<text x="56" y="222" class="title">Brygger</text>
<circle class="solid" cx="60" cy="260" r="6"/>
<line class="line strong" x1="66" y1="260" x2="90" y2="260" marker-end="url(#st1-f)"/>
<rect class="hl" x="90" y="240" width="100" height="40" rx="12"/><text x="140" y="265" text-anchor="middle">Maler</text>
<line class="line strong" x1="190" y1="260" x2="280" y2="260" marker-end="url(#st1-f)"/>
<text x="235" y="252" text-anchor="middle" class="muted">malt</text>
<rect class="hl" x="280" y="240" width="100" height="40" rx="12"/><text x="330" y="265" text-anchor="middle">Värmer</text>
<path class="leader" d="M178 30V12H470"/><text x="476" y="16" class="part">Självövergång</text>
<line class="leader" x1="342" y1="80" x2="470" y2="80"/><text x="476" y="84" class="part">Sluttillstånd</text>
<line class="leader" x1="200" y1="98" x2="470" y2="100"/><text x="476" y="104" class="part">Tillstånd</text>
<line class="leader" x1="190" y1="126" x2="470" y2="126"/><text x="476" y="130" class="part">Händelse (trigger)</text>
<line class="leader" x1="252" y1="146" x2="470" y2="146"/><text x="476" y="150" class="part">Villkor [guard]</text>
<line class="leader" x1="212" y1="166" x2="470" y2="166"/><text x="476" y="170" class="part">Effekt (/ handling)</text>
<line class="leader" x1="140" y1="186" x2="470" y2="186"/><text x="476" y="190" class="part">Övergång</text>
<line class="leader" x1="400" y1="225" x2="470" y2="225"/><text x="476" y="229" class="part">Sammansatt tillstånd</text>
<line class="leader" x1="380" y1="270" x2="470" y2="270"/><text x="476" y="274" class="part">Deltillstånd</text>
</svg>

| Del | Hur den ritas | Vad den betyder |
|-----|---------------|-----------------|
| **Initialtillstånd** (initial state) | Fylld prick med en pil | Var objektet börjar. Det är inget riktigt tillstånd — bara en pekare till det första |
| **Tillstånd** (state) | Ruta med rundade hörn | Ett läge objektet kan befinna sig i en stund. Namnge med ett adjektiv eller particip: `Redo`, `Betald`, `Låst` |
| **Övergång** (transition) | Pil från ett tillstånd till ett annat | Objektet byter läge. Allt som inte har en pil är *förbjudet* |
| **Händelse** (event, trigger) | Första ordet vid pilen | Det som sätter igång övergången: ett knapptryck, ett metodanrop, att tiden går ut |
| **Villkor** (guard) | `[hakparenteser]` efter händelsen | Övergången sker bara om villkoret är sant just då |
| **Effekt** (effect, action) | `/ handling` sist på raden | Något som utförs *under* övergången: skicka kvitto, starta en timer |
| **Självövergång** (self-transition) | Pil som går ut och in i samma tillstånd | Händelsen hanteras, effekten utförs — men tillståndet blir detsamma |
| **Sammansatt tillstånd** (composite state) | Stor rundad ruta med egna tillstånd inuti | Ett tillstånd som har deltillstånd. Medan automaten `Brygger` är den antingen i `Maler` eller i `Värmer` |
| **Sluttillstånd** (final state) | Prick med ring runt ("tjuröga") | Livscykeln är slut. Inga pilar går därifrån |

Hela raden vid en pil läses alltså **`händelse [villkor] / handling`** — och alla tre delar är frivilliga. `mynt [belopp ≥ 20] / starta` betyder: *när* ett mynt stoppas i, *om* beloppet då är minst 20 kronor, *gör* "starta" och byt till `Brygger`. Saknas händelsen (som vid `malt`) sker övergången automatiskt när tillståndet är klart.

> **Inte samma rutor:** Ett tillståndsdiagram och ett [aktivitetsdiagram](aktivitetsdiagram.md) har liknande rundade rutor, men betyder olika saker. I ett aktivitetsdiagram är rutan något som **görs** ("Ta betalt"). I ett tillståndsdiagram är rutan något som objektet **är** ("Betald") — och det står kvar där tills en händelse kommer.

## Exempel — en beställning

En beställning skapas, betalas, skickas och levereras. Den kan avbrytas så länge den inte har skickats — avbryts den efter betalning ska pengarna tillbaka. Medan paketet är på väg kommer det spårningsuppdateringar, men beställningen stannar i `Skickad`.

<svg class="dg" viewBox="0 0 720 470" role="img" aria-labelledby="st2-t" xmlns="http://www.w3.org/2000/svg">
<title id="st2-t">Tillståndsdiagram för en beställning: Skapad, Betald, Skickad och Levererad i en kedja, med Avbruten som nås från Skapad och Betald, och en självövergång på Skickad</title>
<defs>
<marker id="st2-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
</defs>
<circle class="solid" cx="150" cy="25" r="9"/>
<line class="line strong" x1="150" y1="34" x2="150" y2="60" marker-end="url(#st2-f)"/>
<rect class="box" x="80" y="60" width="140" height="40" rx="14"/><text x="150" y="85" text-anchor="middle">Skapad</text>
<line class="line strong" x1="150" y1="100" x2="150" y2="160" marker-end="url(#st2-f)"/>
<text x="160" y="135">betala [kortet godkänt] / skicka kvitto</text>
<rect class="box" x="80" y="160" width="140" height="40" rx="14"/><text x="150" y="185" text-anchor="middle">Betald</text>
<line class="line strong" x1="150" y1="200" x2="150" y2="260" marker-end="url(#st2-f)"/>
<text x="160" y="235">skicka / mejla spårningslänk</text>
<rect class="box" x="80" y="260" width="140" height="40" rx="14"/><text x="150" y="285" text-anchor="middle">Skickad</text>
<path class="line strong" d="M220 270C265 270 265 290 220 290" marker-end="url(#st2-f)"/>
<text x="262" y="285" class="muted">ny position / uppdatera spårning</text>
<line class="line strong" x1="150" y1="300" x2="150" y2="360" marker-end="url(#st2-f)"/>
<text x="160" y="335">kunden kvitterar</text>
<rect class="hl" x="80" y="360" width="140" height="40" rx="14"/><text x="150" y="385" text-anchor="middle">Levererad</text>
<line class="line strong" x1="150" y1="400" x2="150" y2="428" marker-end="url(#st2-f)"/>
<circle class="box" cx="150" cy="440" r="12"/>
<circle class="solid" cx="150" cy="440" r="7"/>
<path class="line strong" d="M220 80H550V160" marker-end="url(#st2-f)"/>
<text x="385" y="72" text-anchor="middle">avbryt</text>
<line class="line strong" x1="220" y1="180" x2="480" y2="180" marker-end="url(#st2-f)"/>
<text x="350" y="172" text-anchor="middle">avbryt / återbetala</text>
<rect class="q1" x="480" y="160" width="140" height="40" rx="14"/><text x="550" y="185" text-anchor="middle">Avbruten</text>
<line class="line strong" x1="550" y1="200" x2="550" y2="248" marker-end="url(#st2-f)"/>
<circle class="box" cx="550" cy="260" r="12"/>
<circle class="solid" cx="550" cy="260" r="7"/>
</svg>

Det intressanta är lika mycket det som *saknas*: det finns ingen pil från `Skickad` till `Avbruten`. En skickad beställning kan alltså inte avbrytas — då får kunden göra en retur istället. Och det finns ingen pil *ut* från `Levererad` eller `Avbruten`: där är livscykeln slut.

Samma diagram i C#. Tillstånden blir en [`enum`](../variabler/enum.md), händelserna en annan, och övergångarna ett [switch-uttryck](../if/switch.md) på paret `(tillstånd, händelse)`:

```csharp
public enum OrderState { Created, Paid, Shipped, Delivered, Cancelled }
public enum OrderEvent { Pay, Ship, UpdatePosition, Confirm, Cancel }

public class Order
{
    public OrderState State { get; private set; } = OrderState.Created; // initialtillstånd

    public void Handle(OrderEvent ev, bool cardApproved = false)
    {
        OrderState next = (State, ev) switch
        {
            (OrderState.Created, OrderEvent.Pay) when cardApproved => OrderState.Paid,   // betala [kortet godkänt]
            (OrderState.Created, OrderEvent.Pay)                   => OrderState.Created, // kortet nekat: stå kvar
            (OrderState.Paid,    OrderEvent.Ship)                  => OrderState.Shipped,
            (OrderState.Shipped, OrderEvent.UpdatePosition)        => OrderState.Shipped, // självövergång
            (OrderState.Shipped, OrderEvent.Confirm)               => OrderState.Delivered,
            (OrderState.Created, OrderEvent.Cancel)                => OrderState.Cancelled,
            (OrderState.Paid,    OrderEvent.Cancel)                => OrderState.Cancelled,
            _ => throw new InvalidOperationException($"{ev} är inte tillåtet när ordern är {State}.")
        };

        RunEffect(State, next, ev);   // effekten: "/ handling" vid pilen
        State = next;
    }

    private void RunEffect(OrderState from, OrderState to, OrderEvent ev)
    {
        switch (from, to)
        {
            case (OrderState.Created, OrderState.Paid):      SendReceipt(); break;    // / skicka kvitto
            case (OrderState.Paid, OrderState.Shipped):      SendTrackingLink(); break;
            case (OrderState.Shipped, OrderState.Shipped):   UpdateTracking(); break;
            case (OrderState.Paid, OrderState.Cancelled):    Refund(); break;         // / återbetala
        }
    }

    private void SendReceipt() { /* ... */ }
    private void SendTrackingLink() { /* ... */ }
    private void UpdateTracking() { /* ... */ }
    private void Refund() { /* ... */ }
}
```

Varje pil i diagrammet blir *en rad* i switch-uttrycket. `when cardApproved` är villkoret — och raden under bestämmer vad som händer när villkoret *inte* är sant: ordern står kvar i `Created`. Och den sista raden, `_ => throw`, är alla pilar som **inte** finns — försöker någon avbryta en skickad order får de ett tydligt fel istället för en trasig order.

> **Nästa steg:** Växer tillståndsmaskinen, så att varje tillstånd får mycket eget beteende, är designmönstret [State](../designmonster/gof/behavioral/state.md) nästa steg: en klass per tillstånd istället för en stor switch.

## När ska du välja ett tillståndsdiagram?

| Välj tillståndsdiagram när… | Välj något annat när… |
|-----------------------------|-----------------------|
| Ett objekt har en livscykel med tydliga lägen | Du beskriver ett arbetsflöde med flera roller → [aktivitetsdiagram](aktivitetsdiagram.md) |
| Samma händelse ska ge olika resultat beroende på läge | Det viktiga är ordningen på anropen mellan objekt → [sekvensdiagram](sekvensdiagram.md) |
| Du behöver bestämma vilka övergångar som är förbjudna | Du vill visa vilka klasser som finns och hur de hänger ihop → [klassdiagram](uml-klassdiagram.md) |
| Du har en `enum Status` och många `if (status == ...)` | Det är en algoritm som räknar ut något i steg → [flödesschema](flodesscheman.md) |

## Vanliga misstag

- **Handlingar som tillstånd.** "Skicka paket" är något som *görs* — det hör hemma på en pil eller i ett aktivitetsdiagram. Tillståndet heter `Skickad`.
- **Glömt initialtillstånd.** Utan den fyllda pricken vet ingen var objektet börjar.
- **Pilar utan händelse.** Om det inte står vad som orsakar övergången går den inte att koda.
- **Villkor som överlappar.** `[belopp ≥ 20]` på en pil och `[belopp > 10]` på en annan, från samma tillstånd och för samma händelse — båda kan vara sanna samtidigt.
- **Bara den lyckliga vägen.** Fråga för varje tillstånd: *vad händer om användaren avbryter här? Om betalningen misslyckas?*

## Övning

Rita ett tillståndsdiagram för ett supportärende: `Ny`, `Tilldelad`, `Pågår`, `Väntar på kund`, `Löst` och `Stängd`. Bestäm själv vilka händelser som flyttar ärendet, och använd minst ett villkor (t.ex. `stäng [kunden har svarat]`) och en självövergång (t.ex. `ny kommentar / meddela handläggare`). Implementera sedan övergångarna i C# med en `enum` och ett switch-uttryck.

## TL;DR

| Begrepp | Vad det är |
|---------|-----------|
| Tillståndsdiagram | Vilka lägen något kan vara i, och vad som byter läge |
| Rundad ruta | Ett tillstånd — något objektet *är* |
| Pil | En tillåten övergång. Ingen pil = förbjudet |
| `händelse [villkor] / handling` | Vad som triggar, när det är tillåtet, vad som görs |
| I C# | `enum` för tillstånden + switch-uttryck på `(tillstånd, händelse)` |
