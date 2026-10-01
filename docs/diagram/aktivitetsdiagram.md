---
title: Aktivitetsdiagram
description: "Ett aktivitetsdiagram visar hur ett arbetsflöde går steg för steg — med beslut, parallella spår och vem som gör vad. Det är UML:s storebror till flödesschemat."
parent: Diagram
nav_order: 40
---
# Aktivitetsdiagram

Ett aktivitetsdiagram visar **hur ett arbetsflöde går, steg för steg**. Det liknar ett flödesschema, men kan två saker till: visa att flera saker händer **samtidigt** (förgrening och synkronisering), och visa **vem som gör vad** (simbanor). Därför passar det lika bra för en affärsprocess med flera inblandade som för en metod med parallella anrop.

## När du läst detta ska du kunna

- Känna igen och namnge delarna i ett aktivitetsdiagram
- Förklara skillnaden mellan ett aktivitetsdiagram och ett vanligt flödesschema
- Rita ett flöde med beslut, simbanor och parallella spår
- Översätta förgrening och synkronisering till `Task.WhenAll` i C#

## Vad används det till?

- **Beskriva en process** där flera roller eller system är inblandade — en order, en ansökan, en returhantering
- **Visa vad som kan ske parallellt** — betalning och plockning behöver inte vänta på varandra
- **Planera logiken** i en metod eller ett API-flöde innan du kodar
- **Prata med verksamheten** — en kund eller produktägare kan läsa ett aktivitetsdiagram utan att kunna programmera

### Skillnaden mot ett flödesschema

Ett [flödesschema](flodesscheman.md) och ett aktivitetsdiagram ser nästan likadana ut: rutor, pilar och romber. Skillnaden är vad de *kan uttrycka*:

| | Flödesschema | Aktivitetsdiagram (UML) |
|-|--------------|-------------------------|
| **Standard** | Löst definierat, många varianter | Del av UML, med bestämda symboler |
| **Start och slut** | Rundad ruta med "Start"/"Slut" | Fylld prick (start) och "tjuröga" (slut) |
| **Parallellitet** | Kan inte visas — ett steg i taget | Förgrening och synkronisering (tjocka staplar) |
| **Vem gör vad** | Syns inte | Simbanor delar upp flödet per roll eller system |
| **In- och utdata** | Egen symbol (parallellogram) | Används sällan — fokus ligger på handlingarna |
| **Passar för** | En algoritm, en enskild metod | En process med flera aktörer eller parallella spår |

Tumregel: är det *en* sak som tänker igenom ett problem i tur och ordning — rita ett flödesschema. Är det *flera* som samarbetar, eller saker som sker samtidigt — rita ett aktivitetsdiagram.

## Delarna och vad de heter

<svg class="dg" viewBox="0 0 720 520" role="img" aria-labelledby="ac1-t" xmlns="http://www.w3.org/2000/svg">
<title id="ac1-t">Aktivitetsdiagram med namngivna delar: simbana, startnod, aktivitet, beslutsnod, villkor, sammanslagningsnod, förgrening, synkronisering, kontrollflöde och slutnod</title>
<defs>
<marker id="ac1-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
</defs>
<rect class="line" x="10" y="10" width="400" height="490"/>
<line class="line" x1="10" y1="40" x2="410" y2="40"/>
<text x="210" y="31" text-anchor="middle" class="title">System</text>
<circle class="solid" cx="200" cy="70" r="10"/>
<line class="line strong" x1="200" y1="80" x2="200" y2="100" marker-end="url(#ac1-f)"/>
<rect class="box" x="130" y="100" width="140" height="36" rx="18"/><text x="200" y="123" text-anchor="middle">Ta emot order</text>
<line class="line strong" x1="200" y1="136" x2="200" y2="162" marker-end="url(#ac1-f)"/>
<path class="box" d="M200 162L220 180L200 198L180 180Z"/>
<path class="line strong" d="M180 180H90V220" marker-end="url(#ac1-f)"/>
<path class="line strong" d="M220 180H310V220" marker-end="url(#ac1-f)"/>
<text x="82" y="205" text-anchor="end" class="muted">[i lager]</text>
<text x="318" y="205" class="muted">[slut]</text>
<rect class="box" x="30" y="220" width="120" height="36" rx="18"/><text x="90" y="243" text-anchor="middle">Reservera</text>
<rect class="box" x="250" y="220" width="120" height="36" rx="18"/><text x="310" y="243" text-anchor="middle">Beställ hem</text>
<path class="line strong" d="M90 256V300H180" marker-end="url(#ac1-f)"/>
<path class="line strong" d="M310 256V300H220" marker-end="url(#ac1-f)"/>
<path class="box" d="M200 282L220 300L200 318L180 300Z"/>
<line class="line strong" x1="200" y1="318" x2="200" y2="340" marker-end="url(#ac1-f)"/>
<rect class="solid" x="110" y="340" width="180" height="6"/>
<line class="line strong" x1="140" y1="346" x2="140" y2="370" marker-end="url(#ac1-f)"/>
<line class="line strong" x1="260" y1="346" x2="260" y2="370" marker-end="url(#ac1-f)"/>
<rect class="hl" x="85" y="370" width="110" height="36" rx="18"/><text x="140" y="393" text-anchor="middle">Ta betalt</text>
<rect class="hl" x="205" y="370" width="110" height="36" rx="18"/><text x="260" y="393" text-anchor="middle">Plocka varor</text>
<line class="line strong" x1="140" y1="406" x2="140" y2="430" marker-end="url(#ac1-f)"/>
<line class="line strong" x1="260" y1="406" x2="260" y2="430" marker-end="url(#ac1-f)"/>
<rect class="solid" x="110" y="430" width="180" height="6"/>
<line class="line strong" x1="200" y1="436" x2="200" y2="458" marker-end="url(#ac1-f)"/>
<circle class="box" cx="200" cy="470" r="12"/>
<circle class="solid" cx="200" cy="470" r="7"/>
<line class="leader" x1="330" y1="25" x2="470" y2="25"/><text x="476" y="29" class="part">Simbana (partition)</text>
<line class="leader" x1="212" y1="70" x2="470" y2="70"/><text x="476" y="74" class="part">Startnod</text>
<line class="leader" x1="270" y1="118" x2="470" y2="110"/><text x="476" y="114" class="part">Aktivitet (handling)</text>
<line class="leader" x1="210" y1="171" x2="470" y2="150"/><text x="476" y="154" class="part">Beslutsnod</text>
<line class="leader" x1="360" y1="200" x2="470" y2="190"/><text x="476" y="194" class="part">Villkor [guard]</text>
<line class="leader" x1="210" y1="309" x2="470" y2="310"/><text x="476" y="314" class="part">Sammanslagning (merge)</text>
<line class="leader" x1="290" y1="343" x2="470" y2="350"/><text x="476" y="354" class="part">Förgrening (fork)</text>
<line class="leader" x1="290" y1="433" x2="470" y2="425"/><text x="476" y="429" class="part">Synkronisering (join)</text>
<line class="leader" x1="200" y1="447" x2="470" y2="447"/><text x="476" y="451" class="part">Kontrollflöde</text>
<line class="leader" x1="212" y1="470" x2="470" y2="470"/><text x="476" y="474" class="part">Slutnod</text>
</svg>

| Del | Hur den ritas | Vad den betyder |
|-----|---------------|-----------------|
| **Startnod** (initial node) | Fylld prick | Här börjar flödet. Ett diagram har oftast exakt en |
| **Aktivitet / handling** (action) | Ruta med mycket rundade hörn | Ett steg som utförs — skriv det som ett verb: "Ta emot order" |
| **Kontrollflöde** (control flow) | Pil | Ordningen: när ett steg är klart går flödet vidare längs pilen |
| **Beslutsnod** (decision) | Romb med en pil in och flera ut | Här väljs *en* av vägarna, beroende på villkoren |
| **Villkor** (guard) | Text inom `[hakparenteser]` vid en pil | Måste vara sant för att flödet ska ta just den vägen. Villkoren ska täcka alla fall och inte överlappa |
| **Sammanslagningsnod** (merge) | Romb med flera pilar in och en ut | Vägarna från ett beslut möts igen. Inget väntar — den som kommer först går vidare |
| **Förgrening** (fork) | Tjock stapel med en pil in och flera ut | Flödet delar sig i spår som körs *samtidigt* |
| **Synkronisering** (join) | Tjock stapel med flera pilar in och en ut | Väntar tills *alla* inkommande spår är klara, sedan går flödet vidare |
| **Simbana** (swimlane, partition) | Fält med rubrik, som en bana i en simbassäng | Visar *vem* som utför stegen i fältet — en roll, en avdelning eller ett system |
| **Slutnod** (activity final) | Prick med en ring runt ("tjuröga") | Här tar hela aktiviteten slut |

Lägg särskilt märke till skillnaden mellan romben och stapeln. **Romben** betyder "antingen eller" — bara en väg tas. **Stapeln** betyder "både och" — alla vägar tas, samtidigt.

## Exempel — en order i en webbshop

En kund lägger en order. Systemet kontrollerar lagret. Finns varorna inte får kunden besked och flödet slutar där. Finns de, delar sig flödet: systemet **tar betalt** samtidigt som lagret **plockar varorna**. När båda är klara skickas en bekräftelse till kunden. De tre simbanorna visar direkt vem som ansvarar för vilket steg.

<svg class="dg" viewBox="0 0 720 500" role="img" aria-labelledby="ac2-t" xmlns="http://www.w3.org/2000/svg">
<title id="ac2-t">Aktivitetsdiagram för en webbshopsorder med simbanorna Kund, System och Lager, där betalning och plockning sker parallellt mellan en förgrening och en synkronisering</title>
<defs>
<marker id="ac2-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
</defs>
<rect class="line" x="10" y="10" width="690" height="480"/>
<line class="line" x1="10" y1="40" x2="700" y2="40"/>
<line class="line" x1="240" y1="10" x2="240" y2="490"/>
<line class="line" x1="470" y1="10" x2="470" y2="490"/>
<text x="125" y="31" text-anchor="middle" class="title">Kund</text>
<text x="355" y="31" text-anchor="middle" class="title">System</text>
<text x="585" y="31" text-anchor="middle" class="title">Lager</text>
<circle class="solid" cx="125" cy="65" r="10"/>
<line class="line strong" x1="125" y1="75" x2="125" y2="92" marker-end="url(#ac2-f)"/>
<rect class="box" x="50" y="92" width="150" height="36" rx="18"/><text x="125" y="115" text-anchor="middle">Lägg order</text>
<line class="line strong" x1="200" y1="110" x2="275" y2="110" marker-end="url(#ac2-f)"/>
<rect class="box" x="275" y="92" width="160" height="36" rx="18"/><text x="355" y="115" text-anchor="middle">Kontrollera lager</text>
<line class="line strong" x1="355" y1="128" x2="355" y2="152" marker-end="url(#ac2-f)"/>
<path class="box" d="M355 152L375 170L355 188L335 170Z"/>
<line class="line strong" x1="335" y1="170" x2="200" y2="170" marker-end="url(#ac2-f)"/>
<text x="268" y="163" text-anchor="middle" class="muted">[slut]</text>
<rect class="box" x="50" y="152" width="150" height="36" rx="18"/><text x="125" y="175" text-anchor="middle">Får besked: slut</text>
<line class="line strong" x1="125" y1="188" x2="125" y2="208" marker-end="url(#ac2-f)"/>
<circle class="box" cx="125" cy="220" r="12"/>
<circle class="solid" cx="125" cy="220" r="7"/>
<line class="line strong" x1="355" y1="188" x2="355" y2="260" marker-end="url(#ac2-f)"/>
<text x="363" y="230" class="muted">[i lager]</text>
<rect class="solid" x="300" y="260" width="340" height="6"/>
<line class="line strong" x1="355" y1="266" x2="355" y2="292" marker-end="url(#ac2-f)"/>
<line class="line strong" x1="585" y1="266" x2="585" y2="292" marker-end="url(#ac2-f)"/>
<rect class="hl" x="280" y="292" width="150" height="36" rx="18"/><text x="355" y="315" text-anchor="middle">Ta betalt</text>
<rect class="hl" x="510" y="292" width="150" height="36" rx="18"/><text x="585" y="315" text-anchor="middle">Plocka varor</text>
<line class="line strong" x1="355" y1="328" x2="355" y2="360" marker-end="url(#ac2-f)"/>
<line class="line strong" x1="585" y1="328" x2="585" y2="360" marker-end="url(#ac2-f)"/>
<rect class="solid" x="300" y="360" width="340" height="6"/>
<line class="line strong" x1="355" y1="366" x2="355" y2="392" marker-end="url(#ac2-f)"/>
<rect class="box" x="270" y="392" width="170" height="36" rx="18"/><text x="355" y="415" text-anchor="middle">Skicka bekräftelse</text>
<line class="line strong" x1="270" y1="410" x2="200" y2="410" marker-end="url(#ac2-f)"/>
<rect class="box" x="50" y="392" width="150" height="36" rx="18"/><text x="125" y="415" text-anchor="middle">Får bekräftelse</text>
<line class="line strong" x1="125" y1="428" x2="125" y2="458" marker-end="url(#ac2-f)"/>
<circle class="box" cx="125" cy="470" r="12"/>
<circle class="solid" cx="125" cy="470" r="7"/>
</svg>

Lägg märke till att en pil gärna får korsa en simbana — det är just där ansvaret lämnas över ("Lägg order" hos kunden → "Kontrollera lager" i systemet). Och diagrammet har två slutnoder: ett flöde kan sluta på flera ställen.

### Från förgrening till `Task.WhenAll`

Förgreningen och synkroniseringen har en direkt motsvarighet i C#. Starta båda uppgifterna *utan* att vänta på dem (förgreningen), och vänta sedan in båda med `Task.WhenAll` (synkroniseringen):

```csharp
public class OrderService
{
    private readonly IStock _stock;
    private readonly IPayment _payment;
    private readonly IWarehouse _warehouse;
    private readonly IMailer _mailer;

    public OrderService(IStock stock, IPayment payment, IWarehouse warehouse, IMailer mailer)
    {
        _stock = stock;
        _payment = payment;
        _warehouse = warehouse;
        _mailer = mailer;
    }

    public async Task<bool> HandleOrderAsync(Order order)
    {
        if (!await _stock.IsInStockAsync(order))          // beslutsnod
        {
            await _mailer.SendOutOfStockAsync(order);     // [slut] → Får besked: slut
            return false;                                 // slutnod
        }

        Task payment = _payment.ChargeAsync(order);       // förgrening: starta båda...
        Task picking = _warehouse.PickAsync(order);       // ...utan att vänta

        await Task.WhenAll(payment, picking);             // synkronisering: vänta på alla

        await _mailer.SendConfirmationAsync(order);       // Skicka bekräftelse
        return true;
    }
}
```

Hade du skrivit `await _payment.ChargeAsync(order);` följt av `await _warehouse.PickAsync(order);` hade koden blivit ett *flödesschema* — ett steg i taget. Med `Task.WhenAll` blir den aktivitetsdiagrammet. Mer om `Task.WhenAll` finns i [Trådar och TPL](../asynkron/threading-tpl.md).

## När ska du välja ett aktivitetsdiagram?

| Välj aktivitetsdiagram när… | Välj något annat när… |
|-----------------------------|-----------------------|
| Flera roller eller system delar på arbetet | Det är en enkel algoritm i en metod → [flödesschema](flodesscheman.md) |
| Något sker parallellt och ska vänta in varandra | Det viktiga är *ordningen på anropen* mellan objekt → [sekvensdiagram](sekvensdiagram.md) |
| Du beskriver en process för någon som inte kodar | Det är *ett* objekt som byter läge → [tillståndsdiagram](tillstandsdiagram.md) |
| Du vill visa var ansvaret lämnas över | Du vill visa *vad* systemet ska kunna, inte hur → [användningsfallsdiagram](use-case-diagram.md) |

## Vanliga misstag

- **Romb istället för stapel.** En beslutsnod väljer *en* väg. Vill du att två saker händer samtidigt behövs en förgrening (stapel).
- **Förgrening utan synkronisering.** Om spåren aldrig möts i en join är det oklart när nästa steg får börja.
- **Villkor som inte täcker alla fall.** `[belopp > 100]` och `[belopp < 100]` — vad händer när beloppet är exakt 100?
- **Substantiv i rutorna.** "Betalning" säger inte vad som *görs*. Skriv "Ta betalt".
- **Allt i ett diagram.** Ett aktivitetsdiagram per process. Blir det större än en skärm — dela upp det.

## Övning

Rita ett aktivitetsdiagram för en returhantering i webbshoppen med simbanorna `Kund`, `Kundtjänst` och `Lager`. Kunden anmäler en retur, kundtjänst godkänner eller nekar (`[godkänd]` / `[nekad]`). Vid godkänd retur ska lagret **ta emot varan** samtidigt som kundtjänst **betalar tillbaka pengarna** — använd en förgrening och en synkronisering. Skriv sedan metoden i C# med `Task.WhenAll`.

## TL;DR

| Begrepp | Vad det är |
|---------|-----------|
| Aktivitetsdiagram | Ett arbetsflöde steg för steg — med beslut, parallella spår och ansvar |
| Romb | Beslut eller sammanslagning: *en* väg i taget |
| Tjock stapel | Förgrening eller synkronisering: *alla* vägar, samtidigt |
| Simbana | Visar vem som gör vad |
| `Task.WhenAll` | C#:s sätt att skriva en join |
