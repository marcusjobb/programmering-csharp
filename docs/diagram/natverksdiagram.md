---
title: Nätverksdiagram
description: "Ett nätverksdiagram visar hur datorer, servrar och nätverksutrustning är kopplade — och var gränserna går. Här med egna enkla symboler, ett litet företagsnät och en molnmiljö med publikt och privat subnät."
parent: Diagram
nav_order: 90
---
# Nätverksdiagram

Ett nätverksdiagram visar **hur saker är kopplade i nätverket**: vilka datorer och servrar som finns, vilken utrustning som binder ihop dem, och — viktigast — **var gränserna går**. Vad når internet? Vad är skyddat bakom en brandvägg? Det är frågor du måste kunna svara på när du driftsätter din app, oavsett om den hamnar i ett serverrum eller i molnet.

## När du läst detta ska du kunna

- Känna igen och namnge de vanligaste delarna: klient, server, switch, router, brandvägg, internet/moln, lastbalanserare, länk och subnät/zon
- Förklara vad en DMZ är och varför webbservern inte står i samma nät som klienterna
- Läsa och rita en molnmiljö med ett virtuellt nätverk, ett publikt och ett privat subnät
- Översätta de generella begreppen till det du möter i Azure och AWS

## Vad används det till?

- **Planera** ett nät innan något kopplas in eller skapas i molnet
- **Säkerhet** — se direkt vilka delar som exponeras mot internet, och vilka som inte ska vara det
- **Felsöka** — "API:t når inte databasen": ligger de i olika subnät? Finns en brandväggsregel emellan?
- **Dokumentera** så att nästa person (eller du om ett halvår) vet vad som är kopplat till vad

Det finns ingen gemensam standard för nätverkssymboler. Cisco, Microsoft och AWS har var sin ikonuppsättning. Det viktiga är att **vara konsekvent och ha en symbolnyckel** — därför har den här sidan en egen, enkel uppsättning.

## Delarna och vad de heter

Symbolerna som används på den här sidan:

<svg class="dg" viewBox="0 0 720 300" role="img" aria-labelledby="nw1-t" xmlns="http://www.w3.org/2000/svg">
<title id="nw1-t">Symbolnyckel för nätverksdiagram: klient, server, switch, router, brandvägg, internet eller moln, lastbalanserare, länk och subnät eller zon</title>
<defs>
<marker id="nw1-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
</defs>
<rect class="box" x="47" y="40" width="50" height="34" rx="3"/>
<line class="line strong" x1="72" y1="74" x2="72" y2="84"/>
<rect class="ink" x="57" y="84" width="30" height="5"/>
<text x="72" y="128" text-anchor="middle" class="part">Klient</text>
<text x="72" y="148" text-anchor="middle" class="muted">dator, mobil</text>
<rect class="box" x="196" y="32" width="40" height="60" rx="3"/>
<line class="line" x1="202" y1="46" x2="230" y2="46"/>
<line class="line" x1="202" y1="58" x2="230" y2="58"/>
<line class="line" x1="202" y1="70" x2="230" y2="70"/>
<circle class="solid" cx="226" cy="82" r="2.5"/>
<text x="216" y="128" text-anchor="middle" class="part">Server</text>
<text x="216" y="148" text-anchor="middle" class="muted">kör tjänster</text>
<rect class="box" x="325" y="50" width="70" height="30" rx="4"/>
<line class="line strong" x1="340" y1="60" x2="380" y2="60" marker-end="url(#nw1-f)"/>
<line class="line strong" x1="380" y1="70" x2="340" y2="70" marker-end="url(#nw1-f)"/>
<text x="360" y="128" text-anchor="middle" class="part">Switch</text>
<text x="360" y="148" text-anchor="middle" class="muted">kopplar ihop i nätet</text>
<circle class="box" cx="504" cy="65" r="24"/>
<line class="line strong" x1="504" y1="65" x2="504" y2="48" marker-end="url(#nw1-f)"/>
<line class="line strong" x1="504" y1="65" x2="504" y2="82" marker-end="url(#nw1-f)"/>
<line class="line strong" x1="504" y1="65" x2="487" y2="65" marker-end="url(#nw1-f)"/>
<line class="line strong" x1="504" y1="65" x2="521" y2="65" marker-end="url(#nw1-f)"/>
<text x="504" y="128" text-anchor="middle" class="part">Router</text>
<text x="504" y="148" text-anchor="middle" class="muted">kopplar ihop nät</text>
<rect class="q1" x="618" y="40" width="60" height="50"/>
<line class="line" x1="618" y1="57" x2="678" y2="57"/>
<line class="line" x1="618" y1="73" x2="678" y2="73"/>
<line class="line" x1="638" y1="40" x2="638" y2="57"/>
<line class="line" x1="658" y1="40" x2="658" y2="57"/>
<line class="line" x1="628" y1="57" x2="628" y2="73"/>
<line class="line" x1="648" y1="57" x2="648" y2="73"/>
<line class="line" x1="668" y1="57" x2="668" y2="73"/>
<line class="line" x1="638" y1="73" x2="638" y2="90"/>
<line class="line" x1="658" y1="73" x2="658" y2="90"/>
<text x="648" y="128" text-anchor="middle" class="part">Brandvägg</text>
<text x="648" y="148" text-anchor="middle" class="muted">filtrerar trafik</text>
<path class="box" d="M55 230A16 16 0 0 1 60 200A22 22 0 0 1 100 192A18 18 0 0 1 125 210A12 12 0 0 1 125 230Z"/>
<text x="90" y="268" text-anchor="middle" class="part">Internet / moln</text>
<text x="90" y="288" text-anchor="middle" class="muted">nät du inte äger</text>
<rect class="q2" x="240" y="190" width="60" height="40" rx="8"/>
<line class="line strong" x1="250" y1="210" x2="268" y2="210"/>
<line class="line strong" x1="268" y1="210" x2="290" y2="198"/>
<line class="line strong" x1="268" y1="210" x2="290" y2="210"/>
<line class="line strong" x1="268" y1="210" x2="290" y2="222"/>
<text x="270" y="268" text-anchor="middle" class="part">Lastbalanserare</text>
<text x="270" y="288" text-anchor="middle" class="muted">fördelar trafik</text>
<line class="line strong" x1="410" y1="200" x2="490" y2="200"/>
<line class="line dash" x1="410" y1="222" x2="490" y2="222"/>
<text x="450" y="268" text-anchor="middle" class="part">Länk</text>
<text x="450" y="288" text-anchor="middle" class="muted">kabel · trådlöst/VPN</text>
<rect class="line dash" x="580" y="185" width="100" height="50" rx="8"/>
<text x="630" y="215" text-anchor="middle" class="muted">10.0.1.0/24</text>
<text x="630" y="268" text-anchor="middle" class="part">Subnät / zon</text>
<text x="630" y="288" text-anchor="middle" class="muted">t.ex. DMZ</text>
</svg>

| Del | Hur den ritas här | Vad den betyder |
|-----|-------------------|-----------------|
| **Klient** | Skärm på fot | En dator, mobil eller annan enhet som *använder* tjänster |
| **Server** | Hög låda med "hyllor" | En maskin (fysisk eller virtuell) som *erbjuder* tjänster: webb, API, filer, databas |
| **Switch** | Platt låda med pilar åt båda håll | Kopplar ihop enheter **inom samma nät** (samma subnät) |
| **Router** | Cirkel med pilar ut åt alla håll | Kopplar ihop **olika nät** och väljer vägen mellan dem — t.ex. ditt nät och internet |
| **Brandvägg** | Tegelvägg | Släpper igenom eller stoppar trafik enligt regler: "bara port 443 in" |
| **Internet / moln** | Moln | Ett nät du inte äger eller inte behöver rita i detalj |
| **Lastbalanserare** | Låda där en linje delas i flera | Tar emot trafik och fördelar den på flera servrar |
| **Länk** | Linje — heldragen = kabel, streckad = trådlöst eller VPN | En förbindelse mellan två delar |
| **Subnät / zon** | Streckad ruta, gärna med adressområde | En grupp adresser och enheter som hör ihop och har samma regler, t.ex. *DMZ* eller *privat subnät* |

**Adressområdet** skrivs i CIDR-form: `10.0.1.0/24` betyder att de första 24 bitarna är fasta, så nätet har 256 adresser (`10.0.1.0`–`10.0.1.255`). Ju större siffra efter snedstrecket, desto mindre nät: `/16` har 65 536 adresser, `/28` bara 16.

## Exempel — ett litet företagsnät

Ett konsultbolag med några anställda. Internet kommer in via en router och en brandvägg. Bakom brandväggen finns **två zoner**: en **DMZ** (demilitariserad zon) där den publika webbservern står, och det **interna nätet** med de anställdas datorer och filservern.

<svg class="dg" viewBox="0 0 720 460" role="img" aria-labelledby="nw2-t" xmlns="http://www.w3.org/2000/svg">
<title id="nw2-t">Nätverksdiagram för ett litet företag: internet, router och brandvägg, en DMZ med en webbserver och ett internt LAN med switch, tre klienter och en filserver</title>
<defs>
<marker id="nw2-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
</defs>
<path class="box" d="M325 75A16 16 0 0 1 330 45A22 22 0 0 1 370 37A18 18 0 0 1 395 55A12 12 0 0 1 395 75Z"/>
<text x="362" y="64" text-anchor="middle">Internet</text>
<line class="line strong" x1="360" y1="75" x2="360" y2="100"/>
<circle class="box" cx="360" cy="124" r="24"/>
<line class="line strong" x1="360" y1="124" x2="360" y2="107" marker-end="url(#nw2-f)"/>
<line class="line strong" x1="360" y1="124" x2="360" y2="141" marker-end="url(#nw2-f)"/>
<line class="line strong" x1="360" y1="124" x2="343" y2="124" marker-end="url(#nw2-f)"/>
<line class="line strong" x1="360" y1="124" x2="377" y2="124" marker-end="url(#nw2-f)"/>
<text x="394" y="128" class="muted">Router</text>
<line class="line strong" x1="360" y1="148" x2="360" y2="170"/>
<rect class="q1" x="330" y="170" width="60" height="44"/>
<line class="line" x1="330" y1="185" x2="390" y2="185"/>
<line class="line" x1="330" y1="200" x2="390" y2="200"/>
<line class="line" x1="350" y1="170" x2="350" y2="185"/>
<line class="line" x1="370" y1="170" x2="370" y2="185"/>
<line class="line" x1="340" y1="185" x2="340" y2="200"/>
<line class="line" x1="360" y1="185" x2="360" y2="200"/>
<line class="line" x1="380" y1="185" x2="380" y2="200"/>
<line class="line" x1="350" y1="200" x2="350" y2="214"/>
<line class="line" x1="370" y1="200" x2="370" y2="214"/>
<text x="400" y="197" class="muted">Brandvägg</text>
<rect class="line dash" x="20" y="150" width="220" height="120" rx="8"/>
<text x="32" y="172" class="muted">DMZ · 192.168.10.0/24</text>
<line class="line strong" x1="330" y1="200" x2="216" y2="200"/>
<rect class="box" x="180" y="185" width="36" height="60" rx="3"/>
<line class="line" x1="185" y1="198" x2="211" y2="198"/>
<line class="line" x1="185" y1="210" x2="211" y2="210"/>
<line class="line" x1="185" y1="222" x2="211" y2="222"/>
<circle class="solid" cx="207" cy="235" r="2.5"/>
<text x="170" y="214" text-anchor="end">Webbserver</text>
<text x="170" y="232" text-anchor="end" class="muted">publik webbplats</text>
<line class="line strong" x1="360" y1="214" x2="360" y2="310"/>
<rect class="line dash" x="60" y="290" width="600" height="150" rx="8"/>
<text x="72" y="310" class="muted">Internt LAN · 192.168.1.0/24</text>
<rect class="box" x="325" y="310" width="70" height="30" rx="4"/>
<line class="line strong" x1="340" y1="320" x2="380" y2="320" marker-end="url(#nw2-f)"/>
<line class="line strong" x1="380" y1="330" x2="340" y2="330" marker-end="url(#nw2-f)"/>
<text x="405" y="330" class="muted">Switch</text>
<line class="line strong" x1="360" y1="340" x2="140" y2="362"/>
<line class="line strong" x1="360" y1="340" x2="260" y2="362"/>
<line class="line strong" x1="360" y1="340" x2="460" y2="362"/>
<line class="line strong" x1="360" y1="340" x2="580" y2="355"/>
<rect class="box" x="118" y="362" width="44" height="30" rx="3"/>
<line class="line strong" x1="140" y1="392" x2="140" y2="400"/>
<rect class="ink" x="128" y="400" width="24" height="4"/>
<text x="140" y="428" text-anchor="middle" class="muted">Klient</text>
<rect class="box" x="238" y="362" width="44" height="30" rx="3"/>
<line class="line strong" x1="260" y1="392" x2="260" y2="400"/>
<rect class="ink" x="248" y="400" width="24" height="4"/>
<text x="260" y="428" text-anchor="middle" class="muted">Klient</text>
<rect class="box" x="438" y="362" width="44" height="30" rx="3"/>
<line class="line strong" x1="460" y1="392" x2="460" y2="400"/>
<rect class="ink" x="448" y="400" width="24" height="4"/>
<text x="460" y="428" text-anchor="middle" class="muted">Klient</text>
<rect class="box" x="562" y="355" width="36" height="54" rx="3"/>
<line class="line" x1="567" y1="367" x2="593" y2="367"/>
<line class="line" x1="567" y1="379" x2="593" y2="379"/>
<line class="line" x1="567" y1="391" x2="593" y2="391"/>
<circle class="solid" cx="589" cy="401" r="2.5"/>
<text x="580" y="428" text-anchor="middle" class="muted">Filserver</text>
</svg>

Varför två zoner? Webbservern **måste** gå att nå från internet — det är hela poängen. Men om någon tar sig in på den, vill du inte att de står mitt bland de anställdas datorer. Brandväggen har därför olika regler för de två zonerna:

| Från → till | Tillåtet | Exempel på regel |
|-------------|----------|------------------|
| Internet → DMZ | Ja, men bara webbtrafik | Port 443 (HTTPS) till webbservern |
| Internet → internt LAN | Nej | Allt blockeras |
| Internt LAN → internet | Ja | Anställda får surfa |
| DMZ → internt LAN | Nej (eller mycket begränsat) | En hackad webbserver ska inte nå filservern |

I verkligheten är router och brandvägg ofta samma låda. Här är de ritade var för sig för att det ska synas att de gör olika saker: routern hittar vägen, brandväggen bestämmer vad som får passera.

## Exempel — en molnmiljö

Samma idé i molnet. Istället för kablar och lådor skapar du ett **virtuellt nätverk** och delar in det i **subnät**. Webbappen från [arkitektursidan](arkitekturdiagram.md) driftsätts här med två app-servrar bakom en lastbalanserare och en databas som inte kan nås från internet alls.

<svg class="dg" viewBox="0 0 720 500" role="img" aria-labelledby="nw3-t" xmlns="http://www.w3.org/2000/svg">
<title id="nw3-t">Nätverksdiagram för en molnmiljö: internet via en brandväggsregel in till ett virtuellt nätverk med ett publikt subnät med lastbalanserare, ett privat app-subnät med två app-servrar och ett privat data-subnät med en databas</title>
<path class="box" d="M325 75A16 16 0 0 1 330 45A22 22 0 0 1 370 37A18 18 0 0 1 395 55A12 12 0 0 1 395 75Z"/>
<text x="362" y="64" text-anchor="middle">Internet</text>
<rect class="line strong" x="20" y="100" width="680" height="385" rx="12"/>
<text x="36" y="126" class="title">Virtuellt nätverk · 10.0.0.0/16</text>
<line class="line strong" x1="360" y1="75" x2="360" y2="88"/>
<rect class="q1" x="340" y="88" width="40" height="28"/>
<line class="line" x1="340" y1="102" x2="380" y2="102"/>
<line class="line" x1="360" y1="88" x2="360" y2="102"/>
<line class="line" x1="350" y1="102" x2="350" y2="116"/>
<line class="line" x1="370" y1="102" x2="370" y2="116"/>
<text x="392" y="90" class="muted">Regel: bara HTTPS (443) in</text>
<line class="line strong" x1="360" y1="116" x2="360" y2="160"/>
<rect class="line dash" x="40" y="140" width="640" height="90" rx="8"/>
<text x="52" y="162" class="muted">Publikt subnät · 10.0.1.0/24</text>
<rect class="q2" x="330" y="160" width="60" height="40" rx="8"/>
<line class="line strong" x1="340" y1="180" x2="358" y2="180"/>
<line class="line strong" x1="358" y1="180" x2="380" y2="168"/>
<line class="line strong" x1="358" y1="180" x2="380" y2="180"/>
<line class="line strong" x1="358" y1="180" x2="380" y2="192"/>
<text x="400" y="185" class="muted">Lastbalanserare</text>
<rect class="line dash" x="40" y="250" width="640" height="110" rx="8"/>
<text x="52" y="270" class="muted">Privat subnät (app) · 10.0.2.0/24</text>
<line class="line strong" x1="350" y1="200" x2="290" y2="280"/>
<line class="line strong" x1="370" y1="200" x2="430" y2="280"/>
<rect class="box" x="272" y="280" width="36" height="54" rx="3"/>
<line class="line" x1="277" y1="292" x2="303" y2="292"/>
<line class="line" x1="277" y1="304" x2="303" y2="304"/>
<line class="line" x1="277" y1="316" x2="303" y2="316"/>
<circle class="solid" cx="299" cy="326" r="2.5"/>
<text x="318" y="312" class="muted">App-server</text>
<rect class="box" x="412" y="280" width="36" height="54" rx="3"/>
<line class="line" x1="417" y1="292" x2="443" y2="292"/>
<line class="line" x1="417" y1="304" x2="443" y2="304"/>
<line class="line" x1="417" y1="316" x2="443" y2="316"/>
<circle class="solid" cx="439" cy="326" r="2.5"/>
<text x="458" y="312" class="muted">App-server</text>
<rect class="line dash" x="40" y="380" width="640" height="90" rx="8"/>
<text x="52" y="402" class="muted">Privat subnät (data) · 10.0.3.0/24</text>
<line class="line strong" x1="290" y1="334" x2="345" y2="399"/>
<line class="line strong" x1="430" y1="334" x2="375" y2="399"/>
<path class="box" d="M320 405V450A40 7 0 0 0 400 450V405"/>
<ellipse class="box" cx="360" cy="405" rx="40" ry="7"/>
<text x="360" y="438" text-anchor="middle">Databas</text>
<text x="412" y="432" class="muted">nås inte från internet</text>
</svg>

Läs det uppifrån och ner:

1. Trafik från internet släpps in **bara på port 443** (HTTPS).
2. I det **publika subnätet** finns bara lastbalanseraren. Den är det enda som har en publik adress.
3. Lastbalanseraren skickar vidare till app-servrarna i ett **privat subnät**. De har bara interna adresser (`10.0.2.x`) — internet kan inte nå dem direkt.
4. Databasen ligger i ett eget privat subnät. Regeln där är ännu snävare: *bara app-subnätet får prata med databasen, och bara på databasporten*.

Ett **publikt subnät** är alltså ett subnät där resurser *kan* nås från internet, och ett **privat subnät** ett där de inte kan det. Det är samma tanke som DMZ och internt LAN i företagsnätet — bara att du ritar det med kod och klick istället för kablar.

### Samma begrepp hos molnleverantörerna

Diagrammet ovan är medvetet leverantörsneutralt. Så här heter delarna hos de två största:

| Generellt | Azure | AWS |
|-----------|-------|-----|
| Virtuellt nätverk | Virtual Network (VNet) | Virtual Private Cloud (VPC) |
| Subnät | Subnet | Subnet |
| Brandväggsregel på subnät/server | Network Security Group (NSG) | Security Group, Network ACL |
| Lastbalanserare | Load Balancer, Application Gateway | Elastic Load Balancing (ALB/NLB) |
| Väg ut mot internet för privata servrar | NAT Gateway | NAT Gateway |
| Publikt subnät | Ett subnät vars resurser har publik IP eller nås via lastbalanserare | Ett subnät med väg till en Internet Gateway |

Exakt hur "publikt" fungerar skiljer sig mellan leverantörerna, men *diagrammet* ser likadant ut. Rita det generellt först — då förstår du vad du bygger, oavsett vilken portal du klickar i.

## När ska du välja ett nätverksdiagram?

| Välj nätverksdiagram när… | Välj något annat när… |
|---------------------------|-----------------------|
| Det handlar om adresser, subnät, brandväggar och vad som når vad | Du vill visa vilken *mjukvara* som körs var → [driftsättningsdiagram](arkitekturdiagram.md) |
| Du planerar eller felsöker en molnmiljö eller ett kontorsnät | Du vill visa hur systemets delar samarbetar logiskt → [arkitekturdiagram (C4)](arkitekturdiagram.md) |
| Du gör en säkerhetsgenomgång: vad exponeras mot internet? | Du vill visa vilken *data* som flyttas mellan delarna → [dataflödesdiagram](dataflodesdiagram.md) |
| Du dokumenterar infrastruktur för drift | Du vill visa ordningen på anrop i ett flöde → [sekvensdiagram](sekvensdiagram.md) |

## Vanliga misstag

- **Ingen symbolnyckel.** Det finns ingen standard, så läsaren vet inte vad din cirkel betyder. Ha alltid en nyckel, eller använd en etablerad ikonuppsättning konsekvent.
- **Inga zoner.** Ett diagram där allt sitter på samma linje döljer det viktigaste: vad som är skyddat och vad som är exponerat. Rita gränserna.
- **Databasen i det publika subnätet.** Bara det som *måste* nås från internet ska ligga där — oftast bara lastbalanseraren.
- **Blandade detaljnivåer.** Varje patchkabel i ett diagram och "molnet" som en enda ruta i ett annat. Bestäm vad läsaren behöver veta.
- **Inaktuellt diagram.** Ett nätverksdiagram som inte stämmer är farligare än inget, eftersom någon kommer att lita på det. Uppdatera när du ändrar regler eller subnät.

## Övning

Rita en molnmiljö för en skolans bokningsapp med ett virtuellt nätverk `10.1.0.0/16`:

1. Ett publikt subnät med en lastbalanserare.
2. Ett privat subnät för API:t med **en** app-server.
3. Ett privat subnät för databasen.
4. En administratör som ska kunna logga in på app-servern via **VPN** (streckad länk) — men inte direkt från internet.

Skriv ut adressområdet för varje subnät och en mening om vilken trafik som är tillåten in i det. Hur många adresser har ett `/24`-subnät?

## TL;DR

| Begrepp | Vad det är |
|---------|-----------|
| Switch | Kopplar ihop enheter *inom* ett nät |
| Router | Kopplar ihop *olika* nät |
| Brandvägg | Släpper igenom eller stoppar trafik enligt regler |
| Lastbalanserare | Fördelar trafik på flera servrar |
| Subnät / zon | Grupp av adresser med gemensamma regler, t.ex. DMZ |
| Publikt / privat subnät | Kan / kan inte nås från internet |
| Symbolnyckel | Ett måste — det finns ingen gemensam standard |
