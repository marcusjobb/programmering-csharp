---
title: Dataflödesdiagram
description: "Ett dataflödesdiagram (DFD) visar vilken data som kommer in i ett system, vart den tar vägen, hur den förändras och var den lagras — men inte i vilken ordning. Här i Yourdon/DeMarco-stil med en webbshops orderhantering."
parent: Diagram
nav_order: 100
---
# Dataflödesdiagram

Ett dataflödesdiagram (DFD) visar **vilken data som rör sig genom ett system**: var den kommer ifrån, vilka processer som tar emot och förändrar den, var den lagras och vart den skickas. Det visar däremot **inte i vilken ordning** saker händer, och inte vilka beslut som fattas. Det är den stora skillnaden mot ett [flödesschema](flodesscheman.md).

## När du läst detta ska du kunna

- Känna igen och namnge de fyra delarna: extern entitet, process, datalager och dataflöde
- Rita ett kontextdiagram (nivå 0) och bryta ner det till nivå 1
- Kontrollera att nivåerna är i *balans* — samma flöden in och ut
- Förklara skillnaden mellan ett dataflödesdiagram och ett flödesschema

## Vad används det till?

- **Förstå ett system ur datans perspektiv** — vad kommer in, vad går ut, vad sparas?
- **Kravarbete** — innan du vet hur systemet ska byggas, kan du rita vilken information det måste hantera
- **Säkerhet och GDPR** — var finns personuppgifterna, och vart skickas de? DFD är standardunderlaget i en hotmodellering
- **Hitta luckor** — en process som skickar ut data den aldrig fått in, eller ett datalager ingen läser från

## Delarna och vad de heter

Det finns två vanliga ritsätt. Den här sidan använder **Yourdon/DeMarco** (cirklar för processer). Det andra, **Gane-Sarson**, visas längre ner — delarna är exakt desamma, bara formerna skiljer sig.

<svg class="dg" viewBox="0 0 720 270" role="img" aria-labelledby="df1-t" xmlns="http://www.w3.org/2000/svg">
<title id="df1-t">Dataflödesdiagram med namngivna delar: den externa entiteten Kund, processen 1.0 Registrera order med processnummer, datalagret Ordrar och dataflöden med namn</title>
<defs>
<marker id="df1-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
</defs>
<rect class="box" x="90" y="110" width="110" height="50"/>
<text x="145" y="140" text-anchor="middle" class="title">Kund</text>
<circle class="hl" cx="360" cy="135" r="55"/>
<text x="360" y="118" text-anchor="middle" class="muted">1.0</text>
<text x="360" y="142" text-anchor="middle">Registrera</text>
<text x="360" y="160" text-anchor="middle">order</text>
<line class="line strong" x1="200" y1="128" x2="305" y2="128" marker-end="url(#df1-f)"/>
<text x="252" y="118" text-anchor="middle" class="muted">orderuppgifter</text>
<line class="line strong" x1="307" y1="150" x2="200" y2="150" marker-end="url(#df1-f)"/>
<text x="252" y="172" text-anchor="middle" class="muted">orderbekräftelse</text>
<line class="line strong" x1="500" y1="115" x2="620" y2="115"/>
<line class="line strong" x1="500" y1="155" x2="620" y2="155"/>
<text x="560" y="141" text-anchor="middle">Ordrar</text>
<line class="line strong" x1="415" y1="135" x2="500" y2="135" marker-end="url(#df1-f)"/>
<text x="457" y="126" text-anchor="middle" class="muted">ny order</text>
<line class="leader" x1="145" y1="110" x2="145" y2="48"/><text x="145" y="40" text-anchor="middle" class="part">Extern entitet</text>
<line class="leader" x1="322" y1="95" x2="304" y2="48"/><text x="300" y="40" text-anchor="middle" class="part">Process</text>
<line class="leader" x1="372" y1="113" x2="440" y2="48"/><text x="450" y="40" text-anchor="middle" class="part">Processnummer</text>
<line class="leader" x1="600" y1="115" x2="615" y2="48"/><text x="620" y="40" text-anchor="middle" class="part">Datalager</text>
<line class="leader" x1="457" y1="135" x2="457" y2="236"/><text x="457" y="250" text-anchor="middle" class="part">Dataflöde</text>
<line class="leader" x1="252" y1="176" x2="252" y2="236"/><text x="252" y="250" text-anchor="middle" class="part">Flödets namn</text>
</svg>

| Del | Hur den ritas (Yourdon/DeMarco) | Vad den betyder |
|-----|---------------------------------|-----------------|
| **Extern entitet** | Rektangel | Någon eller något *utanför* systemet som skickar eller tar emot data: en kund, en betaltjänst, ett annat system. Du bestämmer inte över vad de gör |
| **Process** | Cirkel med nummer och ett verb | Något som **tar emot data och gör om den** till annan data: "Registrera order", "Beräkna frakt" |
| **Processnummer** | Siffra överst i cirkeln | Visar var processen hör hemma: `1` på nivå 1, `1.1`, `1.2` när den bryts ner vidare |
| **Datalager** | Två parallella linjer med namn emellan | Data som **sparas** och kan läsas senare: en tabell, en fil, en kö |
| **Dataflöde** | Pil | Data som **flyttas** från en del till en annan |
| **Flödets namn** | Text vid pilen — ett substantiv | *Vilken* data som flyttas: "orderuppgifter", inte "skicka" |

Fyra regler som gör ett DFD korrekt:

1. **Allt dataflöde går genom en process.** Två externa entiteter pratar aldrig direkt med varandra i diagrammet, och data hoppar aldrig direkt från ett datalager till ett annat.
2. **Varje process har både in- och utflöde.** En process som bara tar emot data är ett "svart hål"; en som bara skickar ut är ett "mirakel".
3. **Processer heter verb, flöden och lager heter substantiv.** "Registrera order" och "orderuppgifter", inte "Order" och "registrera".
4. **Inga beslut och ingen ordning.** Pilarna säger *vad* som flyttas, inte *när* eller *om*.

## Nivåer — från kontextdiagram till nivå 1

Ett DFD ritas i nivåer, lite som C4-modellens zoom i [arkitekturdiagram](arkitekturdiagram.md):

- **Kontextdiagram (nivå 0)** — hela systemet som **en enda process**, med alla externa entiteter runt omkring. Inga datalager. Det visar systemets gräns: vad som kommer in och vad som går ut.
- **Nivå 1** — den enda processen bryts upp i de viktigaste delprocesserna, numrerade `1`, `2`, `3`. Nu syns datalagren.
- **Nivå 2 och nedåt** — en process från nivå 1 bryts ner i `1.1`, `1.2`… När processen är så enkel att den går att beskriva i några meningar kan du sluta.

Den viktigaste regeln mellan nivåerna är **balans**: flödena som går in i och ut ur systemet på nivå 0 måste finnas med, med samma namn, på nivå 1. Nya flöden får bara tillkomma *inuti* — mellan processer och datalager.

## Exempel — en webbshops orderhantering

### Kontextdiagram (nivå 0)

Hela orderhanteringen är en process. Runt den finns de fyra som utbyter data med den: kunden, betaltjänsten, lagret och fraktbolaget.

<svg class="dg" viewBox="0 0 720 420" role="img" aria-labelledby="df2-t" xmlns="http://www.w3.org/2000/svg">
<title id="df2-t">Kontextdiagram för en webbshops orderhantering: processen 0 Orderhantering utbyter data med de externa entiteterna Kund, Betaltjänst, Lager och Fraktbolag</title>
<defs>
<marker id="df2-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
</defs>
<circle class="hl" cx="360" cy="210" r="80"/>
<text x="360" y="190" text-anchor="middle" class="muted">0</text>
<text x="360" y="214" text-anchor="middle" class="title">Order-</text>
<text x="360" y="234" text-anchor="middle" class="title">hantering</text>
<rect class="box" x="30" y="185" width="120" height="50"/><text x="90" y="215" text-anchor="middle" class="title">Kund</text>
<rect class="box" x="300" y="20" width="120" height="50"/><text x="360" y="50" text-anchor="middle" class="title">Betaltjänst</text>
<rect class="box" x="570" y="185" width="120" height="50"/><text x="630" y="215" text-anchor="middle" class="title">Lager</text>
<rect class="box" x="300" y="350" width="120" height="50"/><text x="360" y="380" text-anchor="middle" class="title">Fraktbolag</text>
<line class="line strong" x1="150" y1="198" x2="281" y2="198" marker-end="url(#df2-f)"/>
<text x="216" y="188" text-anchor="middle" class="muted">beställning</text>
<line class="line strong" x1="281" y1="222" x2="150" y2="222" marker-end="url(#df2-f)"/>
<text x="216" y="240" text-anchor="middle" class="muted">orderbekräftelse</text>
<line class="line strong" x1="348" y1="131" x2="348" y2="70" marker-end="url(#df2-f)"/>
<text x="340" y="104" text-anchor="end" class="muted">betalningsbegäran</text>
<line class="line strong" x1="372" y1="70" x2="372" y2="131" marker-end="url(#df2-f)"/>
<text x="380" y="104" class="muted">betalstatus</text>
<line class="line strong" x1="439" y1="198" x2="570" y2="198" marker-end="url(#df2-f)"/>
<text x="504" y="188" text-anchor="middle" class="muted">plocklista</text>
<line class="line strong" x1="570" y1="222" x2="439" y2="222" marker-end="url(#df2-f)"/>
<text x="504" y="240" text-anchor="middle" class="muted">lagersaldo</text>
<line class="line strong" x1="348" y1="289" x2="348" y2="350" marker-end="url(#df2-f)"/>
<text x="340" y="324" text-anchor="end" class="muted">fraktbokning</text>
<line class="line strong" x1="372" y1="350" x2="372" y2="289" marker-end="url(#df2-f)"/>
<text x="380" y="324" class="muted">spårningsnummer</text>
</svg>

### Nivå 1

Nu öppnar vi processen. Orderhanteringen består av tre delprocesser som delar på datalagret **D1 Ordrar**. Jämför med kontextdiagrammet: alla åtta flöden till och från de externa entiteterna finns kvar, med samma namn — diagrammen är i balans. Det som är nytt är flödena till och från datalagret.

<svg class="dg" viewBox="0 0 720 480" role="img" aria-labelledby="df3-t" xmlns="http://www.w3.org/2000/svg">
<title id="df3-t">Dataflödesdiagram nivå 1 för orderhantering: processerna 1 Ta emot order, 2 Hantera betalning och 3 Skicka order, datalagret D1 Ordrar och de externa entiteterna Kund, Betaltjänst, Lager och Fraktbolag</title>
<defs>
<marker id="df3-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
</defs>
<rect class="box" x="20" y="40" width="110" height="46"/><text x="75" y="68" text-anchor="middle" class="title">Kund</text>
<rect class="box" x="545" y="40" width="120" height="46"/><text x="605" y="68" text-anchor="middle" class="title">Betaltjänst</text>
<rect class="box" x="20" y="397" width="110" height="46"/><text x="75" y="425" text-anchor="middle" class="title">Lager</text>
<rect class="box" x="545" y="397" width="120" height="46"/><text x="605" y="425" text-anchor="middle" class="title">Fraktbolag</text>
<circle class="hl" cx="300" cy="63" r="48"/>
<text x="300" y="44" text-anchor="middle" class="muted">1</text>
<text x="300" y="68" text-anchor="middle">Ta emot</text>
<text x="300" y="86" text-anchor="middle">order</text>
<circle class="hl" cx="600" cy="232" r="48"/>
<text x="600" y="214" text-anchor="middle" class="muted">2</text>
<text x="600" y="238" text-anchor="middle">Hantera</text>
<text x="600" y="256" text-anchor="middle">betalning</text>
<circle class="hl" cx="325" cy="420" r="48"/>
<text x="325" y="402" text-anchor="middle" class="muted">3</text>
<text x="325" y="426" text-anchor="middle">Skicka</text>
<text x="325" y="444" text-anchor="middle">order</text>
<line class="line strong" x1="250" y1="215" x2="400" y2="215"/>
<line class="line strong" x1="250" y1="250" x2="400" y2="250"/>
<text x="262" y="238" class="muted">D1</text>
<text x="288" y="238">Ordrar</text>
<line class="line strong" x1="130" y1="54" x2="253" y2="54" marker-end="url(#df3-f)"/>
<text x="191" y="46" text-anchor="middle" class="muted">beställning</text>
<line class="line strong" x1="253" y1="74" x2="130" y2="74" marker-end="url(#df3-f)"/>
<text x="191" y="92" text-anchor="middle" class="muted">orderbekräftelse</text>
<line class="line strong" x1="100" y1="397" x2="275" y2="104" marker-end="url(#df3-f)"/>
<text x="170" y="250" text-anchor="end" class="muted">lagersaldo</text>
<line class="line strong" x1="300" y1="111" x2="300" y2="215" marker-end="url(#df3-f)"/>
<text x="308" y="166" class="muted">ny order</text>
<line class="line strong" x1="400" y1="225" x2="552" y2="225" marker-end="url(#df3-f)"/>
<text x="476" y="216" text-anchor="middle" class="muted">order att betala</text>
<line class="line strong" x1="552" y1="240" x2="400" y2="240" marker-end="url(#df3-f)"/>
<text x="476" y="258" text-anchor="middle" class="muted">status: betald</text>
<line class="line strong" x1="590" y1="185" x2="590" y2="86" marker-end="url(#df3-f)"/>
<text x="582" y="140" text-anchor="end" class="muted">betalningsbegäran</text>
<line class="line strong" x1="620" y1="86" x2="620" y2="188" marker-end="url(#df3-f)"/>
<text x="628" y="140" class="muted">betalstatus</text>
<line class="line strong" x1="310" y1="250" x2="310" y2="374" marker-end="url(#df3-f)"/>
<text x="302" y="315" text-anchor="end" class="muted">betald order</text>
<line class="line strong" x1="350" y1="378" x2="350" y2="250" marker-end="url(#df3-f)"/>
<text x="358" y="315" class="muted">skickad</text>
<line class="line strong" x1="277" y1="420" x2="130" y2="420" marker-end="url(#df3-f)"/>
<text x="203" y="411" text-anchor="middle" class="muted">plocklista</text>
<line class="line strong" x1="372" y1="410" x2="545" y2="410" marker-end="url(#df3-f)"/>
<text x="458" y="400" text-anchor="middle" class="muted">fraktbokning</text>
<line class="line strong" x1="545" y1="432" x2="372" y2="432" marker-end="url(#df3-f)"/>
<text x="458" y="452" text-anchor="middle" class="muted">spårningsnummer</text>
</svg>

Så här läser du det:

| Process | Tar emot | Skickar ut |
|---------|----------|------------|
| **1 Ta emot order** | beställning (Kund), lagersaldo (Lager) | orderbekräftelse (Kund), ny order (D1) |
| **2 Hantera betalning** | order att betala (D1), betalstatus (Betaltjänst) | betalningsbegäran (Betaltjänst), status: betald (D1) |
| **3 Skicka order** | betald order (D1), spårningsnummer (Fraktbolag) | plocklista (Lager), fraktbokning (Fraktbolag), skickad (D1) |

Lägg märke till vad diagrammet *inte* säger: det står inte att betalningen sker före leveransen, eller vad som händer om betalningen nekas. Det är inte en brist — det är inte DFD:ts jobb. Vill du visa det ritar du ett [aktivitetsdiagram](aktivitetsdiagram.md) eller ett [sekvensdiagram](sekvensdiagram.md).

### Från DFD till kod

Ett DFD är inte en ritning av klasser, men det mappar ofta naturligt: varje **process** blir en service med metoder, varje **datalager** en tabell (eller ett repository), och varje **flöde** en typ — en `record` eller DTO. Flödesnamnen i diagrammet är bra kandidater till typnamn:

```csharp
// Dataflöden → typer
public record Beställning(int KundId, List<BeställdVara> Varor);
public record Orderbekräftelse(int OrderId, decimal Total);
public record Betalningsbegäran(int OrderId, decimal Belopp);

// Process 1 "Ta emot order": tar emot beställning, skickar ut orderbekräftelse och ny order
public class OrderMottagning
{
    private readonly IOrderRepository _ordrar;   // D1 Ordrar
    private readonly ILagerKlient _lager;        // extern entitet: Lager

    public OrderMottagning(IOrderRepository ordrar, ILagerKlient lager)
    {
        _ordrar = ordrar;
        _lager = lager;
    }

    public async Task<Orderbekräftelse> TaEmotAsync(Beställning beställning)
    {
        var saldo = await _lager.HämtaSaldoAsync(beställning.Varor);   // ← lagersaldo
        var order = Order.Skapa(beställning, saldo);
        await _ordrar.SparaAsync(order);                                 // → ny order (D1)
        return new Orderbekräftelse(order.Id, order.Total);              // → orderbekräftelse
    }
}
```

## Gane-Sarson — det andra ritsättet

Gane-Sarson används mycket i systemutveckling och i verktyg för hotmodellering. Delarna och reglerna är desamma; bara formerna skiljer sig. Välj ett ritsätt och håll dig till det i hela dokumentationen.

<svg class="dg" viewBox="0 0 720 220" role="img" aria-labelledby="df4-t" xmlns="http://www.w3.org/2000/svg">
<title id="df4-t">Jämförelse av symboler i Yourdon/DeMarco och Gane-Sarson: extern entitet som rektangel, process som cirkel respektive rundad rektangel med nummer, och datalager som två linjer respektive öppen rektangel med id</title>
<text x="280" y="24" text-anchor="middle" class="muted">Extern entitet</text>
<text x="450" y="24" text-anchor="middle" class="muted">Process</text>
<text x="620" y="24" text-anchor="middle" class="muted">Datalager</text>
<text x="20" y="75" class="title">Yourdon/DeMarco</text>
<rect class="box" x="230" y="48" width="100" height="44"/><text x="280" y="75" text-anchor="middle">Kund</text>
<circle class="hl" cx="450" cy="70" r="36"/><text x="450" y="75" text-anchor="middle">Beräkna</text>
<line class="line strong" x1="565" y1="52" x2="675" y2="52"/>
<line class="line strong" x1="565" y1="88" x2="675" y2="88"/>
<text x="620" y="75" text-anchor="middle">Ordrar</text>
<text x="20" y="175" class="title">Gane-Sarson</text>
<rect class="ink" x="236" y="154" width="100" height="44"/>
<rect class="box" x="230" y="148" width="100" height="44"/><text x="280" y="175" text-anchor="middle">Kund</text>
<rect class="hl" x="400" y="138" width="100" height="64" rx="10"/>
<line class="line" x1="400" y1="160" x2="500" y2="160"/>
<text x="450" y="154" text-anchor="middle" class="muted">1.0</text>
<text x="450" y="186" text-anchor="middle">Beräkna</text>
<path class="line strong" d="M675 152H565V188H675"/>
<line class="line strong" x1="595" y1="152" x2="595" y2="188"/>
<text x="580" y="175" text-anchor="middle" class="muted">D1</text>
<text x="635" y="175" text-anchor="middle">Ordrar</text>
</svg>

| Del | Yourdon/DeMarco | Gane-Sarson |
|-----|-----------------|-------------|
| Extern entitet | Rektangel | Rektangel (ofta med skugga) |
| Process | Cirkel | Rundad rektangel med nummer i ett fält överst |
| Datalager | Två parallella linjer | Rektangel öppen åt ena hållet, med id (`D1`) i ett eget fält |
| Dataflöde | Pil med namn | Pil med namn |

## DFD eller flödesschema?

De ser lika ut på håll — rutor och pilar — men de svarar på helt olika frågor.

| | Dataflödesdiagram | [Flödesschema](flodesscheman.md) |
|--|-------------------|---------------|
| **Pilen betyder** | *Data* flyttas hit | *Sedan* händer det här |
| **Visar** | Vilken information som finns och var den tar vägen | I vilken ordning stegen sker |
| **Beslut (om/annars)** | Finns inte | Central del (romben) |
| **Loopar** | Finns inte | Ja |
| **Start och slut** | Finns inte — data flödar hela tiden | Ja, varje flöde börjar och slutar |
| **Datalager** | Ja | Nej |
| **Typisk fråga** | "Var hamnar kundens personnummer?" | "Vad händer om betalningen nekas?" |

Ett enkelt test: kan du läsa pilen som "och *sedan*…"? Då är det ett flödesschema. Kan du läsa den som "skickar *orderuppgifter* till…"? Då är det ett DFD.

## När ska du välja ett dataflödesdiagram?

| Välj DFD när… | Välj något annat när… |
|---------------|-----------------------|
| Du vill veta vilken data systemet tar emot, lagrar och skickar | Ordningen och besluten är det viktiga → [flödesschema](flodesscheman.md) eller [aktivitetsdiagram](aktivitetsdiagram.md) |
| Du kartlägger personuppgifter eller gör en hotmodellering | Du vill visa hur data är *strukturerad* i tabeller → [ER-diagram](er-diagram.md) |
| Du är tidigt i kravarbetet och inte vet hur det ska byggas | Du vill visa vilka delar (API, databas) systemet består av → [arkitekturdiagram](arkitekturdiagram.md) |
| Du vill förklara ett system för någon som inte programmerar | Du vill visa exakt vilka metodanrop som görs → [sekvensdiagram](sekvensdiagram.md) |

## Vanliga misstag

- **Ordning och beslut i diagrammet.** En romb eller en pil som betyder "sedan" hör hemma i ett flödesschema. I ett DFD flyttar pilarna bara data.
- **Entitet direkt till entitet.** Om kunden skickar något direkt till fraktbolaget är det utanför ditt system — rita inte den pilen.
- **Svarta hål och mirakel.** En process med bara inflöde, eller bara utflöde, är nästan alltid ett tecken på att något saknas.
- **Obalans mellan nivåer.** Ett flöde som finns på nivå 1 men inte i kontextdiagrammet (eller tvärtom) betyder att något av diagrammen är fel.
- **Onamngivna pilar.** "Data" är inget namn. Skriv vilken data: "betalningsbegäran", "plocklista".
- **Datalager i kontextdiagrammet.** På nivå 0 är systemet en svart låda; dess datalager syns först på nivå 1.

## Övning

Rita ett DFD för ett biblioteks utlåning:

1. Börja med ett **kontextdiagram** med den externa entiteten *Låntagare* (som skickar *lånebegäran* och får *kvitto*) och *Påminnelsetjänst* (som får *försenade lån*).
2. Bryt ner det till **nivå 1** med processerna *1 Registrera lån*, *2 Registrera återlämning* och *3 Hitta försenade lån*, och datalagren *D1 Lån* och *D2 Exemplar*.
3. Kontrollera balansen: finns alla flöden från kontextdiagrammet med på nivå 1, med samma namn?

## TL;DR

| Begrepp | Vad det är |
|---------|-----------|
| Extern entitet | Någon utanför systemet som skickar eller tar emot data |
| Process | Gör om data till annan data — verb, numrerad |
| Datalager | Där data sparas — substantiv |
| Dataflöde | Pil med namnet på datan som flyttas |
| Kontextdiagram (nivå 0) | Hela systemet som en process, inga datalager |
| Balans | Samma flöden in och ut på varje nivå |
| Skillnad mot flödesschema | DFD visar *data*, inte ordning eller beslut |
