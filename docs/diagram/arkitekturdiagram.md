---
title: Arkitekturdiagram
description: "Diagram som visar hur ett system är uppbyggt: blockdiagram, C4-modellens fyra zoomnivåer, UML-komponentdiagram, paketdiagram och driftsättningsdiagram — och när du väljer vilket."
parent: Diagram
nav_order: 80
---
# Arkitekturdiagram

Ett arkitekturdiagram visar **vilka delar ett system består av och hur de hänger ihop** — klient, API, databas, externa tjänster. Det finns flera sorter, från en snabb skiss med rutor och pilar till UML-diagram med strikta regler. Den här sidan samlar de vanligaste och fokuserar på **C4-modellen**, som är det mest användbara sättet att rita arkitektur i en .NET-lösning idag.

## När du läst detta ska du kunna

- Namnge delarna i ett C4-diagram: person, mjukvarusystem, container, komponent och relation
- Förklara C4-modellens fyra nivåer som en zoom från systemkontext ner till kod
- Känna igen ett blockdiagram, ett UML-komponentdiagram, ett paketdiagram och ett driftsättningsdiagram
- Välja rätt diagram beroende på vem som ska läsa det och vad de vill veta

## Vad används det till?

- **Få överblick** — vilka delar finns, och vilka pratar med varandra?
- **Introducera nya i teamet** — en bild säger mer än tio README-stycken
- **Fatta beslut** — ska e-posten skickas från API:t eller från en egen tjänst? Rita båda och jämför
- **Planera drift** — vad körs var, och vilka portar måste vara öppna?
- **Dokumentera** inför kodgranskning, examensarbete eller överlämning till kund

## Delarna och vad de heter

Här är en *bokningsapp* ritad som ett C4-diagram på nivå 2 (container). Kunden bokar tider i en webbklient, som anropar ett ASP.NET Core-API. API:t sparar i en databas och skickar bekräftelser via en extern e-posttjänst.

<svg class="dg" viewBox="0 0 720 520" role="img" aria-labelledby="ar1-t" xmlns="http://www.w3.org/2000/svg">
<title id="ar1-t">C4-containerdiagram för en bokningsapp med namngivna delar: person, relation med beskrivning och teknik, mjukvarusystem som streckad gräns, containrar för webbklient, API och databas, samt ett externt system för e-post</title>
<defs>
<marker id="ar1-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
</defs>
<circle class="hl" cx="145" cy="30" r="14"/>
<rect class="hl" x="85" y="46" width="120" height="50" rx="16"/>
<text x="145" y="68" text-anchor="middle" class="title">Kund</text>
<text x="145" y="86" text-anchor="middle" class="muted">[Person]</text>
<line class="line strong" x1="145" y1="96" x2="145" y2="178" marker-end="url(#ar1-f)"/>
<text x="155" y="128">Bokar tid</text>
<text x="155" y="146" class="muted">[HTTPS]</text>
<rect class="line dash" x="30" y="158" width="230" height="344" rx="6"/>
<rect class="hl" x="50" y="178" width="190" height="60" rx="4"/>
<text x="145" y="202" text-anchor="middle" class="title">Webbklient</text>
<text x="145" y="222" text-anchor="middle" class="muted">[Container: Blazor]</text>
<line class="line strong" x1="145" y1="238" x2="145" y2="298" marker-end="url(#ar1-f)"/>
<text x="155" y="264">Anropar API</text>
<text x="155" y="282" class="muted">[JSON/HTTPS]</text>
<rect class="hl" x="50" y="298" width="190" height="60" rx="4"/>
<text x="145" y="322" text-anchor="middle" class="title">Boknings-API</text>
<text x="145" y="342" text-anchor="middle" class="muted">[Container: ASP.NET Core]</text>
<line class="line strong" x1="145" y1="358" x2="145" y2="410" marker-end="url(#ar1-f)"/>
<text x="155" y="380">Lagrar data</text>
<text x="155" y="398" class="muted">[EF Core]</text>
<path class="hl" d="M50 420V464A95 10 0 0 0 240 464V420"/>
<ellipse class="hl" cx="145" cy="420" rx="95" ry="10"/>
<text x="145" y="448" text-anchor="middle" class="title">Databas</text>
<text x="145" y="466" text-anchor="middle" class="muted">[Container: SQL Server]</text>
<text x="42" y="492" class="muted">Bokningssystem [Mjukvarusystem]</text>
<rect class="box" x="380" y="298" width="150" height="60" rx="4"/>
<text x="455" y="322" text-anchor="middle" class="title">E-posttjänst</text>
<text x="455" y="342" text-anchor="middle" class="muted">[Externt system]</text>
<line class="line strong" x1="240" y1="328" x2="380" y2="328" marker-end="url(#ar1-f)"/>
<text x="320" y="320" text-anchor="middle" class="muted">Skickar mejl</text>
<text x="320" y="346" text-anchor="middle" class="muted">[SMTP]</text>
<line class="leader" x1="207" y1="70" x2="560" y2="70"/><text x="566" y="74" class="part">Person</text>
<line class="leader" x1="232" y1="124" x2="560" y2="124"/><text x="566" y="128" class="part">Relation</text>
<line class="leader" x1="206" y1="146" x2="560" y2="148"/><text x="566" y="152" class="part">Teknik [ ]</text>
<line class="leader" x1="262" y1="190" x2="560" y2="186"/><text x="566" y="190" class="part">Mjukvarusystem</text>
<line class="leader" x1="242" y1="230" x2="560" y2="226"/><text x="566" y="230" class="part">Container</text>
<line class="leader" x1="532" y1="328" x2="560" y2="328"/><text x="566" y="332" class="part">Externt system</text>
</svg>

| Del | Hur den ritas | Vad den betyder |
|-----|---------------|-----------------|
| **Person** | Gubbe eller rundad ruta, märkt `[Person]` | En människa som använder systemet — kund, admin, personal |
| **Mjukvarusystem** | Ruta (nivå 1) eller streckad gräns runt containrar (nivå 2) | Det system du bygger, sett som en helhet med ett namn |
| **Externt system** | Grå ruta utanför gränsen | Ett system någon annan äger: e-post, betalning, BankID |
| **Container** | Ruta inne i systemgränsen, märkt `[Container: teknik]` | Något som **körs eller lagrar data** separat: en webbapp, ett API, en databas, en kö. *Inte* en Docker-container (även om det ofta blir en) |
| **Komponent** | Ruta inne i en container (nivå 3) | En grupp kod med ett tydligt ansvar: en controller, en service, ett repository |
| **Relation** | Pil med en **beskrivning** ("Bokar tid") | Vem som använder eller anropar vem, och varför |
| **Teknik** | Text i `[hakparenteser]` på ruta eller pil | Vilken teknik som används: `[HTTPS]`, `[EF Core]`, `[SMTP]` |

Två regler gör C4-diagram läsbara: **varje pil har en beskrivning**, och **varje ruta säger vad den är** (`[Person]`, `[Container: …]`). En pil utan text tvingar läsaren att gissa.

## C4-modellen — fyra zoomnivåer

C4 (av Simon Brown) står för **Context, Containers, Components, Code**. Tänk på det som en karttjänst: först ser du hela landet, sedan zoomar du in på en stad, en gata och till sist ett hus. Varje nivå zoomar in på *en* ruta från nivån ovanför.

<svg class="dg" viewBox="0 0 720 300" role="img" aria-labelledby="ar2-t" xmlns="http://www.w3.org/2000/svg">
<title id="ar2-t">C4-modellens fyra nivåer som en zoom: systemkontext, container, komponent och kod, där en markerad ruta på varje nivå förstoras på nästa</title>
<text x="90" y="24" text-anchor="middle" class="title">Nivå 1</text><text x="90" y="44" text-anchor="middle" class="muted">Systemkontext</text>
<text x="270" y="24" text-anchor="middle" class="title">Nivå 2</text><text x="270" y="44" text-anchor="middle" class="muted">Container</text>
<text x="450" y="24" text-anchor="middle" class="title">Nivå 3</text><text x="450" y="44" text-anchor="middle" class="muted">Komponent</text>
<text x="630" y="24" text-anchor="middle" class="title">Nivå 4</text><text x="630" y="44" text-anchor="middle" class="muted">Kod</text>
<rect class="line" x="10" y="60" width="160" height="200" rx="6"/>
<rect class="line" x="190" y="60" width="160" height="200" rx="6"/>
<rect class="line" x="370" y="60" width="160" height="200" rx="6"/>
<rect class="line" x="550" y="60" width="160" height="200" rx="6"/>
<circle class="box" cx="50" cy="88" r="9"/>
<rect class="box" x="32" y="99" width="36" height="22" rx="8"/>
<rect class="hl" x="70" y="140" width="86" height="44" rx="4"/><text x="113" y="167" text-anchor="middle">System</text>
<rect class="box" x="24" y="208" width="80" height="34" rx="4"/><text x="64" y="230" text-anchor="middle" class="muted">Externt</text>
<line class="line" x1="50" y1="121" x2="90" y2="140"/>
<line class="line" x1="100" y1="184" x2="80" y2="208"/>
<line class="line dash" x1="156" y1="140" x2="190" y2="60"/>
<line class="line dash" x1="156" y1="184" x2="190" y2="260"/>
<rect class="line dash" x="200" y="72" width="140" height="176" rx="4"/>
<rect class="box" x="215" y="84" width="110" height="34" rx="4"/><text x="270" y="106" text-anchor="middle">Webb</text>
<rect class="hl" x="215" y="134" width="110" height="34" rx="4"/><text x="270" y="156" text-anchor="middle">API</text>
<path class="box" d="M215 190V226A55 7 0 0 0 325 226V190"/>
<ellipse class="box" cx="270" cy="190" rx="55" ry="7"/>
<text x="270" y="216" text-anchor="middle" class="muted">Databas</text>
<line class="line" x1="270" y1="118" x2="270" y2="134"/>
<line class="line" x1="270" y1="168" x2="270" y2="183"/>
<line class="line dash" x1="325" y1="134" x2="370" y2="60"/>
<line class="line dash" x1="325" y1="168" x2="370" y2="260"/>
<rect class="box" x="385" y="80" width="130" height="36" rx="4"/><text x="450" y="103" text-anchor="middle">Controller</text>
<rect class="hl" x="385" y="140" width="130" height="36" rx="4"/><text x="450" y="163" text-anchor="middle">Service</text>
<rect class="box" x="385" y="200" width="130" height="36" rx="4"/><text x="450" y="223" text-anchor="middle">Repository</text>
<line class="line" x1="450" y1="116" x2="450" y2="140"/>
<line class="line" x1="450" y1="176" x2="450" y2="200"/>
<line class="line dash" x1="515" y1="140" x2="550" y2="60"/>
<line class="line dash" x1="515" y1="176" x2="550" y2="260"/>
<rect class="box" x="560" y="78" width="140" height="164"/>
<text x="630" y="100" text-anchor="middle" class="title">BokningService</text>
<line class="line" x1="560" y1="110" x2="700" y2="110"/>
<text x="572" y="132" class="muted">- repo</text>
<line class="line" x1="560" y1="144" x2="700" y2="144"/>
<text x="572" y="166" class="muted">+ Boka()</text>
<text x="572" y="188" class="muted">+ Avboka()</text>
<text x="572" y="210" class="muted">+ HämtaLediga()</text>
<text x="90" y="284" text-anchor="middle" class="muted">Vem använder systemet?</text>
<text x="270" y="284" text-anchor="middle" class="muted">Vilka delar körs?</text>
<text x="450" y="284" text-anchor="middle" class="muted">Vad finns i en del?</text>
<text x="630" y="284" text-anchor="middle" class="muted">Hur ser koden ut?</text>
</svg>

| Nivå | Visar | Frågan den svarar på | Vem läser den |
|------|-------|----------------------|---------------|
| **1 Systemkontext** | Systemet som *en* ruta, plus personer och externa system runt omkring | Vad är det här, vem använder det, vad är det beroende av? | Alla — även kund och beställare |
| **2 Container** | Det som körs separat: webbklient, API, databas | Vilka delar driftsätts, och hur pratar de? | Utvecklare, drift, arkitekt |
| **3 Komponent** | Innehållet i *en* container | Hur är API:t uppdelat i ansvarsområden? | Utvecklarna i teamet |
| **4 Kod** | Klasser och interface i *en* komponent | Hur är just den här delen implementerad? | Den som ska ändra koden |

Nivå 1 och 2 är de du nästan alltid ritar. Nivå 3 ritar du för de containrar som är stora eller svåra. Nivå 4 ritar du sällan för hand — det är i praktiken ett [klassdiagram](uml-klassdiagram.md), och koden själv (eller verktyget som genererar diagrammet ur den) är ofta bättre.

## Exempel — bokningsappens API på nivå 3

Vi zoomar in på containern *Boknings-API*. Inuti finns komponenterna som tar emot anropet, utför logiken, sparar och skickar e-post. Rutorna utanför den streckade gränsen är andra containrar och system — de är med för att visa vart pilarna går.

<svg class="dg" viewBox="0 0 720 570" role="img" aria-labelledby="ar3-t" xmlns="http://www.w3.org/2000/svg">
<title id="ar3-t">C4-komponentdiagram för Boknings-API: BokningController anropar BokningService, som sparar via BokningRepository till databasen och skickar bekräftelse via EpostKlient till en extern e-posttjänst</title>
<defs>
<marker id="ar3-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
</defs>
<rect class="box" x="240" y="20" width="200" height="56" rx="4"/>
<text x="340" y="44" text-anchor="middle" class="title">Webbklient</text>
<text x="340" y="64" text-anchor="middle" class="muted">[Container: Blazor]</text>
<line class="line strong" x1="340" y1="76" x2="340" y2="140" marker-end="url(#ar3-f)"/>
<text x="350" y="102">Gör bokning</text>
<text x="350" y="120" class="muted">[JSON/HTTPS]</text>
<rect class="line dash" x="30" y="128" width="630" height="312" rx="6"/>
<text x="42" y="150" class="muted">Boknings-API</text>
<text x="42" y="166" class="muted">[Container: ASP.NET Core]</text>
<rect class="hl" x="240" y="140" width="200" height="56" rx="4"/>
<text x="340" y="164" text-anchor="middle" class="title">BokningController</text>
<text x="340" y="184" text-anchor="middle" class="muted">[Komponent: Controller]</text>
<line class="line strong" x1="340" y1="196" x2="340" y2="240" marker-end="url(#ar3-f)"/>
<text x="350" y="222" class="muted">anropar</text>
<rect class="hl" x="240" y="240" width="200" height="56" rx="4"/>
<text x="340" y="264" text-anchor="middle" class="title">BokningService</text>
<text x="340" y="284" text-anchor="middle" class="muted">[Komponent: Service]</text>
<line class="line strong" x1="290" y1="296" x2="180" y2="350" marker-end="url(#ar3-f)"/>
<text x="210" y="318" text-anchor="end" class="muted">sparar bokning</text>
<line class="line strong" x1="390" y1="296" x2="500" y2="350" marker-end="url(#ar3-f)"/>
<text x="470" y="318" class="muted">skickar bekräftelse</text>
<rect class="hl" x="60" y="350" width="200" height="56" rx="4"/>
<text x="160" y="374" text-anchor="middle" class="title">BokningRepository</text>
<text x="160" y="394" text-anchor="middle" class="muted">[Komponent: EF Core]</text>
<rect class="hl" x="420" y="350" width="200" height="56" rx="4"/>
<text x="520" y="374" text-anchor="middle" class="title">EpostKlient</text>
<text x="520" y="394" text-anchor="middle" class="muted">[Komponent: SMTP-klient]</text>
<line class="line strong" x1="160" y1="406" x2="160" y2="490" marker-end="url(#ar3-f)"/>
<text x="170" y="458">Läser/skriver</text>
<text x="170" y="476" class="muted">[EF Core, SQL]</text>
<path class="box" d="M70 500V544A90 10 0 0 0 250 544V500"/>
<ellipse class="box" cx="160" cy="500" rx="90" ry="10"/>
<text x="160" y="528" text-anchor="middle" class="title">Databas</text>
<text x="160" y="546" text-anchor="middle" class="muted">[Container: SQL Server]</text>
<line class="line strong" x1="520" y1="406" x2="520" y2="490" marker-end="url(#ar3-f)"/>
<text x="530" y="458">Skickar mejl</text>
<text x="530" y="476" class="muted">[SMTP]</text>
<rect class="box" x="420" y="490" width="200" height="56" rx="4"/>
<text x="520" y="514" text-anchor="middle" class="title">E-posttjänst</text>
<text x="520" y="534" text-anchor="middle" class="muted">[Externt system]</text>
</svg>

Varje komponent blir i praktiken en klass (eller en liten grupp klasser) med ett interface, och pilarna blir beroenden som du kopplar ihop med [dependency injection](../aspnetcore/dependency-injection.md):

```csharp
// Program.cs — varje rad registrerar en komponent från diagrammet
builder.Services.AddDbContext<BokningContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("Bokning")));

builder.Services.AddScoped<IBokningRepository, BokningRepository>(); // sparar bokning
builder.Services.AddScoped<IEpostKlient, SmtpEpostKlient>();         // skickar bekräftelse
builder.Services.AddScoped<BokningService>();
builder.Services.AddControllers();
```

```csharp
public class BokningService
{
    private readonly IBokningRepository _repo;
    private readonly IEpostKlient _epost;

    // Pilarna i diagrammet = det som skickas in i konstruktorn
    public BokningService(IBokningRepository repo, IEpostKlient epost)
    {
        _repo = repo;
        _epost = epost;
    }

    public async Task<Bokning> BokaAsync(BokningRequest request)
    {
        var bokning = new Bokning(request.KundEpost, request.Tid);
        await _repo.SparaAsync(bokning);                                // → BokningRepository
        await _epost.SkickaAsync(bokning.KundEpost, "Din bokning är klar"); // → EpostKlient
        return bokning;
    }
}
```

Lägg märke till att pilarna går **från** den som använder **till** den som används. `BokningService` känner till `IBokningRepository` — inte tvärtom. Läs mer om varför det är bra i [Repository och dependency inversion](../designmonster/repository-dependency-inversion.md).

## Andra diagram för systemets uppbyggnad

### Blockdiagram

Det enklaste: rutor och pilar, inga regler. Perfekt på whiteboarden eller i en första diskussion, men eftersom det saknar regler betyder en pil olika saker för olika personer. Så fort skissen ska sparas — gör den till ett C4-diagram genom att lägga till beskrivning och teknik.

<svg class="dg" viewBox="0 0 720 220" role="img" aria-labelledby="ar4-t" xmlns="http://www.w3.org/2000/svg">
<title id="ar4-t">Blockdiagram för bokningsappen: Användare, Bokningsapp, Databas och E-post som rutor med pilar emellan, utan beskrivningar</title>
<defs>
<marker id="ar4-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
</defs>
<rect class="box" x="20" y="40" width="150" height="56" rx="4"/><text x="95" y="73" text-anchor="middle">Användare</text>
<rect class="hl" x="260" y="40" width="180" height="56" rx="4"/><text x="350" y="73" text-anchor="middle" class="title">Bokningsapp</text>
<rect class="box" x="530" y="40" width="150" height="56" rx="4"/><text x="605" y="73" text-anchor="middle">Databas</text>
<rect class="box" x="260" y="150" width="180" height="50" rx="4"/><text x="350" y="180" text-anchor="middle">E-post</text>
<line class="line strong" x1="170" y1="68" x2="260" y2="68" marker-end="url(#ar4-f)"/>
<line class="line strong" x1="440" y1="68" x2="530" y2="68" marker-end="url(#ar4-f)"/>
<line class="line strong" x1="350" y1="96" x2="350" y2="150" marker-end="url(#ar4-f)"/>
</svg>

### UML-komponentdiagram

UML:s variant av C4 nivå 2–3. Det som är speciellt är **gränssnitten**: en komponent *tillhandahåller* ett gränssnitt (en "boll", lollipop) och en annan *kräver* det (en "sockel" som griper om bollen). Det visar exakt vilket kontrakt delarna pratar genom — i C# motsvarar det ett `interface`.

<svg class="dg" viewBox="0 0 720 250" role="img" aria-labelledby="ar5-t" xmlns="http://www.w3.org/2000/svg">
<title id="ar5-t">UML-komponentdiagram: Webbklient kräver gränssnittet IBokningar som Boknings-API tillhandahåller, och Boknings-API kräver IEpost som E-posttjänst tillhandahåller, ritat med boll och sockel</title>
<rect class="box" x="20" y="60" width="150" height="70"/>
<text x="95" y="84" text-anchor="middle" class="muted">«component»</text>
<text x="95" y="110" text-anchor="middle" class="title">Webbklient</text>
<rect class="box" x="148" y="66" width="14" height="18"/><rect class="box" x="144" y="70" width="8" height="4"/><rect class="box" x="144" y="77" width="8" height="4"/>
<rect class="box" x="290" y="60" width="170" height="70"/>
<text x="375" y="84" text-anchor="middle" class="muted">«component»</text>
<text x="375" y="110" text-anchor="middle" class="title">Boknings-API</text>
<rect class="box" x="438" y="66" width="14" height="18"/><rect class="box" x="434" y="70" width="8" height="4"/><rect class="box" x="434" y="77" width="8" height="4"/>
<rect class="box" x="540" y="60" width="160" height="70"/>
<text x="620" y="84" text-anchor="middle" class="muted">«component»</text>
<text x="620" y="110" text-anchor="middle" class="title">E-posttjänst</text>
<rect class="box" x="678" y="66" width="14" height="18"/><rect class="box" x="674" y="70" width="8" height="4"/><rect class="box" x="674" y="77" width="8" height="4"/>
<line class="line strong" x1="290" y1="95" x2="250" y2="95"/>
<circle class="box" cx="240" cy="95" r="10"/>
<line class="line strong" x1="170" y1="95" x2="225" y2="95"/>
<path class="line strong" d="M240 80A15 15 0 0 0 240 110"/>
<text x="240" y="70" text-anchor="middle" class="muted">IBokningar</text>
<line class="line strong" x1="540" y1="95" x2="510" y2="95"/>
<circle class="box" cx="500" cy="95" r="10"/>
<line class="line strong" x1="460" y1="95" x2="485" y2="95"/>
<path class="line strong" d="M500 80A15 15 0 0 0 500 110"/>
<text x="500" y="70" text-anchor="middle" class="muted">IEpost</text>
<line class="leader" x1="229" y1="106" x2="150" y2="176"/><text x="130" y="190" text-anchor="middle" class="part">Krävt gränssnitt (sockel)</text>
<line class="leader" x1="242" y1="106" x2="290" y2="216"/><text x="310" y="230" text-anchor="middle" class="part">Tillhandahållet gränssnitt (boll)</text>
<line class="leader" x1="430" y1="130" x2="500" y2="180"/><text x="505" y="190" class="part">Komponent</text>
</svg>

I C# blir det: `Boknings-API` *tillhandahåller* `IBokningar` (klassen implementerar interfacet), och `Webbklient` *kräver* det (tar emot interfacet i konstruktorn). Så länge kontraktet är detsamma kan du byta ut vad som finns bakom bollen.

### Paketdiagram — projekt och namespaces i en .NET-lösning

Ett paketdiagram visar hur koden är **organiserad**: vilka projekt eller namespaces som finns och vilka som beror på vilka. Paketet ritas som en mapp med flik. Den streckade pilen betyder "använder" — i .NET blir det en *projektreferens*.

<svg class="dg" viewBox="0 0 720 270" role="img" aria-labelledby="ar6-t" xmlns="http://www.w3.org/2000/svg">
<title id="ar6-t">Paketdiagram för en .NET-lösning: Bokning.Api beror på Bokning.Infrastructure och Bokning.Core, Bokning.Infrastructure beror på Bokning.Core, och Bokning.Tests beror på Bokning.Core</title>
<defs>
<marker id="ar6-o" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10" class="line strong"/></marker>
</defs>
<rect class="box" x="170" y="20" width="70" height="18"/>
<rect class="box" x="170" y="38" width="200" height="70"/>
<text x="270" y="66" text-anchor="middle" class="title">Bokning.Api</text>
<text x="270" y="88" text-anchor="middle" class="muted">Controllers, Program.cs</text>
<rect class="box" x="400" y="20" width="70" height="18"/>
<rect class="box" x="400" y="38" width="160" height="70"/>
<text x="480" y="66" text-anchor="middle" class="title">Bokning.Tests</text>
<text x="480" y="88" text-anchor="middle" class="muted">xUnit-tester</text>
<rect class="box" x="20" y="160" width="70" height="18"/>
<rect class="box" x="20" y="178" width="220" height="70"/>
<text x="130" y="206" text-anchor="middle" class="title">Bokning.Infrastructure</text>
<text x="130" y="228" text-anchor="middle" class="muted">DbContext, repositories</text>
<rect class="hl" x="300" y="160" width="70" height="18"/>
<rect class="hl" x="300" y="178" width="200" height="70"/>
<text x="400" y="206" text-anchor="middle" class="title">Bokning.Core</text>
<text x="400" y="228" text-anchor="middle" class="muted">Bokning, IBokningRepository</text>
<line class="line strong dash" x1="220" y1="108" x2="150" y2="178" marker-end="url(#ar6-o)"/>
<line class="line strong dash" x1="320" y1="108" x2="395" y2="178" marker-end="url(#ar6-o)"/>
<line class="line strong dash" x1="480" y1="108" x2="450" y2="178" marker-end="url(#ar6-o)"/>
<line class="line strong dash" x1="240" y1="213" x2="300" y2="213" marker-end="url(#ar6-o)"/>
<line class="leader" x1="470" y1="28" x2="578" y2="34"/><text x="584" y="38" class="part">Flik</text>
<line class="leader" x1="562" y1="70" x2="578" y2="70"/><text x="584" y="74" class="part">Paket (projekt)</text>
<line class="leader" x1="465" y1="143" x2="578" y2="143"/><text x="584" y="147" class="part">Beroende</text>
<line class="leader" x1="502" y1="226" x2="578" y2="226"/><text x="584" y="230" class="part">Innehåll</text>
</svg>

Diagrammet motsvarar en lösning som ser ut så här:

```text
Bokning.sln
├── Bokning.Api/              → refererar Bokning.Core och Bokning.Infrastructure
├── Bokning.Core/             → refererar ingenting (domänen står för sig själv)
├── Bokning.Infrastructure/   → refererar Bokning.Core
└── Bokning.Tests/            → refererar Bokning.Core
```

```bash
dotnet add Bokning.Api reference Bokning.Core Bokning.Infrastructure
dotnet add Bokning.Infrastructure reference Bokning.Core
dotnet add Bokning.Tests reference Bokning.Core
```

Det viktiga paketdiagrammet visar: **alla pilar pekar in mot `Core`**, ingen pil går ut från den. Då kan du testa domänlogiken utan databas, och byta databas utan att röra domänen. Ser du en pil från `Core` till `Infrastructure` har något gått snett.

### Driftsättningsdiagram (deployment)

Ett driftsättningsdiagram visar **var** saker körs: vilka maskiner (noder) som finns, vad som är installerat på dem (artefakter) och hur de är förbundna. Det är diagrammet drift och moln-folk vill ha.

<svg class="dg" viewBox="0 0 720 330" role="img" aria-labelledby="ar7-t" xmlns="http://www.w3.org/2000/svg">
<title id="ar7-t">Driftsättningsdiagram: noden Kundens dator med webbläsare, noden Webbserver med en .NET-runtime som kör artefakten Bokning.Api.dll, och noden Databasserver med SQL Server, förbundna via HTTPS och TCP 1433</title>
<polygon class="box" points="20,60 32,48 182,48 170,60"/>
<polygon class="box" points="170,60 182,48 182,158 170,170"/>
<rect class="box" x="20" y="60" width="150" height="110"/>
<text x="95" y="84" text-anchor="middle" class="title">Kundens dator</text>
<text x="95" y="102" text-anchor="middle" class="muted">«device»</text>
<rect class="box" x="35" y="115" width="120" height="40" rx="4"/>
<text x="95" y="140" text-anchor="middle">Webbläsare</text>
<polygon class="box" points="240,60 252,48 452,48 440,60"/>
<polygon class="box" points="440,60 452,48 452,258 440,270"/>
<rect class="box" x="240" y="60" width="200" height="210"/>
<text x="340" y="84" text-anchor="middle" class="title">Webbserver</text>
<text x="340" y="102" text-anchor="middle" class="muted">«node» Linux-VM</text>
<rect class="box" x="255" y="115" width="170" height="140" rx="4"/>
<text x="340" y="135" text-anchor="middle" class="muted">«executionEnvironment»</text>
<text x="340" y="155" text-anchor="middle">.NET-runtime</text>
<rect class="hl" x="270" y="170" width="140" height="70"/>
<path class="box" d="M392 176H400L404 180V190H392Z"/>
<text x="340" y="192" text-anchor="middle" class="muted">«artifact»</text>
<text x="340" y="216" text-anchor="middle">Bokning.Api.dll</text>
<polygon class="box" points="510,60 522,48 702,48 690,60"/>
<polygon class="box" points="690,60 702,48 702,158 690,170"/>
<rect class="box" x="510" y="60" width="180" height="110"/>
<text x="600" y="84" text-anchor="middle" class="title">Databasserver</text>
<text x="600" y="102" text-anchor="middle" class="muted">«node»</text>
<rect class="box" x="525" y="115" width="150" height="40" rx="4"/>
<text x="600" y="140" text-anchor="middle">SQL Server</text>
<line class="line strong" x1="182" y1="120" x2="240" y2="120"/>
<text x="211" y="112" text-anchor="middle" class="muted">HTTPS</text>
<line class="line strong" x1="452" y1="130" x2="510" y2="130"/>
<text x="481" y="122" text-anchor="middle" class="muted">TCP 1433</text>
<line class="leader" x1="60" y1="170" x2="60" y2="296"/><text x="60" y="310" text-anchor="middle" class="part">Nod</text>
<line class="leader" x1="270" y1="255" x2="220" y2="296"/><text x="200" y="310" text-anchor="middle" class="part">Exekveringsmiljö</text>
<line class="leader" x1="360" y1="240" x2="370" y2="296"/><text x="380" y="310" text-anchor="middle" class="part">Artefakt</text>
<line class="leader" x1="481" y1="132" x2="520" y2="296"/><text x="540" y="310" text-anchor="middle" class="part">Kommunikationsväg</text>
</svg>

| Del | Hur den ritas | Vad den betyder |
|-----|---------------|-----------------|
| **Nod** | 3D-låda | Något som kan köra kod: en fysisk maskin, en VM, en mobil (`«device»`) |
| **Exekveringsmiljö** | Låda inuti en nod | Mjukvara som kör din kod: .NET-runtime, en webbläsare, en container-runtime |
| **Artefakt** | Rektangel med `«artifact»` och dokumentikon | En fil som driftsätts: `Bokning.Api.dll`, en Docker-image, en `.zip` |
| **Kommunikationsväg** | Linje mellan noder, med protokoll eller port | Hur noderna pratar: `HTTPS`, `TCP 1433` |

Hur noderna kopplas ihop i nätverket — brandväggar, subnät, lastbalanserare — ritar du hellre i ett [nätverksdiagram](natverksdiagram.md).

## När ska du välja vilket?

| Du vill visa… | Välj | För vem |
|---------------|------|---------|
| En snabb idé på whiteboarden | **Blockdiagram** | Dig själv och teamet, just nu |
| Vad systemet är och vem som använder det | **C4 nivå 1** — systemkontext | Kund, beställare, nya i teamet |
| Vilka delar som körs och hur de pratar | **C4 nivå 2** — container | Utvecklare, drift |
| Hur en del är uppbyggd inuti | **C4 nivå 3** — komponent | Utvecklarna |
| Exakt vilka kontrakt (interface) delar pratar genom | **UML-komponentdiagram** | Utvecklare, arkitekt |
| Hur lösningen är uppdelad i projekt och vilka referenser som är tillåtna | **Paketdiagram** | Utvecklarna |
| Vad som körs på vilken maskin | **Driftsättningsdiagram** | Drift, moln, DevOps |

Och när arkitekturdiagram inte är rätt verktyg:

| Välj arkitekturdiagram när… | Välj något annat när… |
|-----------------------------|-----------------------|
| Du vill visa vilka *delar* som finns | Du vill visa i vilken *ordning* delarna pratar → [sekvensdiagram](sekvensdiagram.md) |
| Du beskriver hela systemet eller en container | Du beskriver klasser och metoder i detalj → [klassdiagram](uml-klassdiagram.md) |
| Du vill visa vilka system som utbyter data | Du vill visa *vilken* data som flödar och vart den lagras → [dataflödesdiagram](dataflodesdiagram.md) |
| Du visar vad som körs var | Du visar IP-adresser, subnät och brandväggar → [nätverksdiagram](natverksdiagram.md) |

## Vanliga misstag

- **Pilar utan text.** "API → Databas" kan betyda läser, skriver, synkar eller övervakar. Skriv vad som händer och med vilken teknik.
- **Blandade nivåer.** En ruta för "Webbklient" bredvid en ruta för "BokningService" — en container och en komponent i samma bild. Håll dig till en nivå per diagram.
- **Allt i ett diagram.** Ett diagram med 30 rutor blir en tapet ingen läser. Zooma istället: nivå 1, sedan nivå 2, sedan nivå 3 för det som är svårt.
- **"Container" = Docker.** I C4 betyder container *något som körs eller lagrar data separat*. En databas är en container även om den inte körs i Docker.
- **Ingen förklaring av symbolerna.** Lägg till en liten teckenförklaring om du använder färger eller former som inte är självklara.

## Övning

Rita bokningsappen på **nivå 1 (systemkontext)**: en ruta för *Bokningssystem*, personerna *Kund* och *Personal*, och de externa systemen *E-posttjänst* och *Betaltjänst*. Skriv en beskrivning på varje pil.

Rita sedan ett **paketdiagram** för ett av dina egna projekt. Pekar alla pilar åt rätt håll — in mot domänen? Finns det någon referens du skulle vilja ta bort?

## TL;DR

| Begrepp | Vad det är |
|---------|-----------|
| Blockdiagram | Rutor och pilar utan regler — bra skiss, dålig dokumentation |
| C4 | Fyra zoomnivåer: systemkontext → container → komponent → kod |
| Container (C4) | Något som körs eller lagrar data separat — webbapp, API, databas |
| Relation (C4) | Pil med beskrivning och `[teknik]` |
| UML-komponentdiagram | Komponenter och gränssnitt (boll = tillhandahåller, sockel = kräver) |
| Paketdiagram | Projekt/namespaces och deras beroenden |
| Driftsättningsdiagram | Noder, exekveringsmiljöer och artefakter — vad körs var |
