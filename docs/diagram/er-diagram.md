---
title: ER-diagram
description: "Ett ER-diagram är en ritning av databasen — vilka entiteter (tabeller) som finns, vilka attribut de har och hur de hänger ihop. Här med kråkfotsnotation och motsvarande EF Core-klasser."
parent: Diagram
nav_order: 70
---
# ER-diagram

Ett ER-diagram (Entity-Relationship) är en **ritning av databasen**. Det visar vilka *entiteter* som ska lagras, vilka *attribut* de har, och hur de hänger ihop — och framför allt **hur många** som hör ihop med hur många. Den vanligaste notationen är *kråkfot* (crow's foot), uppkallad efter symbolen för "många" som ser ut som en fågelfot.

## När du läst detta ska du kunna

- Känna igen och namnge delarna i ett ER-diagram: entitet, attribut, PK, FK, relation och kardinalitet
- Läsa och rita de fyra kråkfotssymbolerna: exakt ett, noll eller ett, ett eller många, noll eller många
- Avgöra på vilken sida av en relation den främmande nyckeln hamnar
- Översätta ett ER-diagram till entitetsklasser i C# med EF Core

## Vad används det till?

- **Designa databasen** innan du skriver en enda `CREATE TABLE` eller entitetsklass
- **Hitta fel tidigt** — ska en order verkligen kunna sakna kund? Det syns direkt i kardinaliteten
- **Prata med andra** — kunden, läraren eller teamet kan granska datamodellen utan att läsa kod
- **Dokumentera** en befintlig databas, så att nästa person förstår hur tabellerna hänger ihop

ER-diagrammet beskriver **data**, inte beteende. Det finns inga metoder här — bara vad som ska sparas och hur det kopplas ihop. Mer om databasen i sig hittar du i [SQL-sektionen](../sql/index.md) och på sidan om [ER-diagram i SQL](../sql/erd.md).

## Delarna och vad de heter

<svg class="dg" viewBox="0 0 720 290" role="img" aria-labelledby="er1-t" xmlns="http://www.w3.org/2000/svg">
<title id="er1-t">ER-diagram med namngivna delar: entiteterna Kund och Order, attribut, primärnyckel, främmande nyckel, relationen lägger och kardinalitetssymbolerna exakt ett och noll eller många</title>
<rect class="hl" x="20" y="40" width="180" height="36"/><text x="110" y="64" text-anchor="middle" class="title">Kund</text>
<rect class="box" x="20" y="76" width="180" height="100"/>
<text x="32" y="100" class="muted">PK</text><text x="64" y="100">KundId</text>
<line class="line" x1="20" y1="110" x2="200" y2="110"/>
<text x="64" y="134">Namn</text>
<text x="64" y="160">Epost</text>
<rect class="hl" x="330" y="40" width="180" height="36"/><text x="420" y="64" text-anchor="middle" class="title">Order</text>
<rect class="box" x="330" y="76" width="180" height="100"/>
<text x="342" y="100" class="muted">PK</text><text x="374" y="100">OrderId</text>
<line class="line" x1="330" y1="110" x2="510" y2="110"/>
<text x="342" y="134" class="muted">FK</text><text x="374" y="134">KundId</text>
<text x="374" y="160">Datum</text>
<line class="line strong" x1="200" y1="120" x2="330" y2="120"/>
<line class="line strong" x1="212" y1="111" x2="212" y2="129"/>
<line class="line strong" x1="220" y1="111" x2="220" y2="129"/>
<circle class="box" cx="300" cy="120" r="6"/>
<line class="line strong" x1="312" y1="120" x2="330" y2="110"/>
<line class="line strong" x1="312" y1="120" x2="330" y2="130"/>
<text x="265" y="148" text-anchor="middle" class="muted">lägger</text>
<line class="leader" x1="265" y1="116" x2="265" y2="30"/><text x="265" y="22" text-anchor="middle" class="part">Relation</text>
<line class="leader" x1="512" y1="58" x2="542" y2="58"/><text x="548" y="62" class="part">Entitet</text>
<line class="leader" x1="512" y1="96" x2="542" y2="100"/><text x="548" y="104" class="part">Primärnyckel (PK)</text>
<line class="leader" x1="512" y1="130" x2="542" y2="134"/><text x="548" y="138" class="part">Främmande nyckel (FK)</text>
<line class="leader" x1="512" y1="156" x2="542" y2="168"/><text x="548" y="172" class="part">Attribut</text>
<line class="leader" x1="216" y1="131" x2="216" y2="216"/><text x="216" y="230" text-anchor="middle" class="part">Kardinalitet: exakt ett</text>
<line class="leader" x1="318" y1="128" x2="318" y2="256"/><text x="318" y="270" text-anchor="middle" class="part">Kardinalitet: noll eller många</text>
</svg>

| Del | Hur den ritas | Vad den betyder |
|-----|---------------|-----------------|
| **Entitet** | Ruta med namnet i en rubrikrad | En sak vi vill spara data om — blir en **tabell** i databasen och en **klass** i C# |
| **Attribut** | En rad i rutan, ofta med datatyp | En egenskap hos entiteten — blir en **kolumn** och en **property** |
| **Primärnyckel (PK)** | Märkt `PK`, överst och ofta avskild med en linje | Det som gör varje rad unik, t.ex. `KundId` |
| **Främmande nyckel (FK)** | Märkt `FK` | En kolumn som pekar på en annan entitets PK — det är så relationen lagras |
| **Relation** | Linje mellan två entiteter, gärna med ett verb | Att entiteterna hör ihop: "en kund *lägger* ordrar" |
| **Kardinalitet** | Symboler i linjens ändar (se nedan) | *Hur många* på den ena sidan som hör ihop med *en* på den andra |

Läs relationen åt båda håll, och läs alltid symbolen **vid den bortre entiteten**: "En kund lägger *noll eller många* ordrar" (symbolen vid Order). "En order läggs av *exakt en* kund" (symbolen vid Kund).

### De fyra kråkfotssymbolerna

Varje ände består av två tecken. Det **inre** tecknet (närmast entiteten) är *max*, det **yttre** är *min*. En ring betyder noll, ett streck betyder ett och kråkfoten betyder många.

<svg class="dg" viewBox="0 0 720 320" role="img" aria-labelledby="er2-t" xmlns="http://www.w3.org/2000/svg">
<title id="er2-t">De fyra kardinalitetssymbolerna i kråkfotsnotation: exakt ett, noll eller ett, ett eller många och noll eller många, med minimum som yttre och maximum som inre symbol</title>
<text x="40" y="30" class="muted">Inre symbol (närmast entiteten) = max · yttre symbol = min</text>
<line class="line strong" x1="60" y1="70" x2="240" y2="70"/>
<line class="line strong" x1="222" y1="61" x2="222" y2="79"/>
<line class="line strong" x1="230" y1="61" x2="230" y2="79"/>
<rect class="box" x="240" y="52" width="80" height="36"/><text x="280" y="75" text-anchor="middle">Entitet</text>
<text x="350" y="68" class="title">Exakt ett</text>
<text x="350" y="86" class="muted">min 1, max 1 · en order har exakt en kund</text>
<line class="line strong" x1="60" y1="130" x2="240" y2="130"/>
<circle class="box" cx="206" cy="130" r="6"/>
<line class="line strong" x1="226" y1="121" x2="226" y2="139"/>
<rect class="box" x="240" y="112" width="80" height="36"/><text x="280" y="135" text-anchor="middle">Entitet</text>
<text x="350" y="128" class="title">Noll eller ett</text>
<text x="350" y="146" class="muted">min 0, max 1 · en kund har kanske ett kundkort</text>
<line class="line strong" x1="60" y1="190" x2="240" y2="190"/>
<line class="line strong" x1="212" y1="181" x2="212" y2="199"/>
<line class="line strong" x1="222" y1="190" x2="240" y2="180"/>
<line class="line strong" x1="222" y1="190" x2="240" y2="200"/>
<rect class="box" x="240" y="172" width="80" height="36"/><text x="280" y="195" text-anchor="middle">Entitet</text>
<text x="350" y="188" class="title">Ett eller många</text>
<text x="350" y="206" class="muted">min 1, max många · en order har minst en orderrad</text>
<line class="line strong" x1="60" y1="250" x2="240" y2="250"/>
<circle class="box" cx="206" cy="250" r="6"/>
<line class="line strong" x1="222" y1="250" x2="240" y2="240"/>
<line class="line strong" x1="222" y1="250" x2="240" y2="260"/>
<rect class="box" x="240" y="232" width="80" height="36"/><text x="280" y="255" text-anchor="middle">Entitet</text>
<text x="350" y="248" class="title">Noll eller många</text>
<text x="350" y="266" class="muted">min 0, max många · en kund kan sakna ordrar</text>
<line class="leader" x1="204" y1="258" x2="192" y2="288"/><text x="196" y="302" text-anchor="end" class="part">Minimum</text>
<line class="leader" x1="236" y1="259" x2="248" y2="288"/><text x="244" y="302" class="part">Maximum</text>
</svg>

| Symbol | Utläses | Min | Max | Typiskt i C# |
|--------|---------|-----|-----|--------------|
| Två streck | Exakt ett | 1 | 1 | `Kund Kund` (krävs) |
| Ring + streck | Noll eller ett | 0 | 1 | `Kundkort? Kundkort` (nullable) |
| Streck + kråkfot | Ett eller många | 1 | många | `List<OrderRad>` — "minst en" kontrolleras i koden |
| Ring + kråkfot | Noll eller många | 0 | många | `List<Order>` (får vara tom) |

**Var hamnar FK?** Alltid på **många-sidan**. En kund har många ordrar, så det är `Order` som får kolumnen `KundId` — inte tvärtom. En kund kan ju inte ha en kolumn per order.

## Exempel — webbshop: Kund, Order, OrderRad och Produkt

En kund lägger ordrar. En order består av en eller flera orderrader, och varje orderrad gäller en produkt. `OrderRad` är **kopplingsentiteten** som löser många-till-många mellan `Order` och `Produkt` — och den bär egen data: antal och styckpris vid köptillfället.

<svg class="dg" viewBox="0 0 720 470" role="img" aria-labelledby="er3-t" xmlns="http://www.w3.org/2000/svg">
<title id="er3-t">ER-diagram för en webbshop: Kund lägger noll eller många Order, Order innehåller en eller många OrderRad, Produkt finns på noll eller många OrderRad</title>
<rect class="hl" x="40" y="20" width="220" height="36"/><text x="150" y="44" text-anchor="middle" class="title">Kund</text>
<rect class="box" x="40" y="56" width="220" height="126"/>
<text x="52" y="80" class="muted">PK</text><text x="84" y="80">KundId</text><text x="248" y="80" text-anchor="end" class="muted">int</text>
<line class="line" x1="40" y1="90" x2="260" y2="90"/>
<text x="84" y="114">Namn</text><text x="248" y="114" text-anchor="end" class="muted">text</text>
<text x="84" y="140">Epost</text><text x="248" y="140" text-anchor="end" class="muted">text</text>
<text x="84" y="166">Telefon</text><text x="248" y="166" text-anchor="end" class="muted">text, null</text>
<rect class="hl" x="440" y="20" width="220" height="36"/><text x="550" y="44" text-anchor="middle" class="title">Order</text>
<rect class="box" x="440" y="56" width="220" height="126"/>
<text x="452" y="80" class="muted">PK</text><text x="484" y="80">OrderId</text><text x="648" y="80" text-anchor="end" class="muted">int</text>
<line class="line" x1="440" y1="90" x2="660" y2="90"/>
<text x="452" y="114" class="muted">FK</text><text x="484" y="114">KundId</text><text x="648" y="114" text-anchor="end" class="muted">int</text>
<text x="484" y="140">Datum</text><text x="648" y="140" text-anchor="end" class="muted">datum</text>
<text x="484" y="166">Status</text><text x="648" y="166" text-anchor="end" class="muted">text</text>
<rect class="hl" x="40" y="260" width="220" height="36"/><text x="150" y="284" text-anchor="middle" class="title">Produkt</text>
<rect class="box" x="40" y="296" width="220" height="152"/>
<text x="52" y="320" class="muted">PK</text><text x="84" y="320">ProduktId</text><text x="248" y="320" text-anchor="end" class="muted">int</text>
<line class="line" x1="40" y1="330" x2="260" y2="330"/>
<text x="84" y="354">Namn</text><text x="248" y="354" text-anchor="end" class="muted">text</text>
<text x="84" y="380">Pris</text><text x="248" y="380" text-anchor="end" class="muted">decimal</text>
<text x="84" y="406">Lagersaldo</text><text x="248" y="406" text-anchor="end" class="muted">int</text>
<rect class="hl" x="440" y="260" width="220" height="36"/><text x="550" y="284" text-anchor="middle" class="title">OrderRad</text>
<rect class="box" x="440" y="296" width="220" height="152"/>
<text x="452" y="320" class="muted">PK</text><text x="484" y="320">OrderRadId</text><text x="648" y="320" text-anchor="end" class="muted">int</text>
<line class="line" x1="440" y1="330" x2="660" y2="330"/>
<text x="452" y="354" class="muted">FK</text><text x="484" y="354">OrderId</text><text x="648" y="354" text-anchor="end" class="muted">int</text>
<text x="452" y="380" class="muted">FK</text><text x="484" y="380">ProduktId</text><text x="648" y="380" text-anchor="end" class="muted">int</text>
<text x="484" y="406">Antal</text><text x="648" y="406" text-anchor="end" class="muted">int</text>
<text x="484" y="432">Styckpris</text><text x="648" y="432" text-anchor="end" class="muted">decimal</text>
<line class="line strong" x1="260" y1="120" x2="440" y2="120"/>
<line class="line strong" x1="272" y1="111" x2="272" y2="129"/>
<line class="line strong" x1="280" y1="111" x2="280" y2="129"/>
<circle class="box" cx="406" cy="120" r="6"/>
<line class="line strong" x1="422" y1="120" x2="440" y2="110"/>
<line class="line strong" x1="422" y1="120" x2="440" y2="130"/>
<text x="350" y="110" text-anchor="middle" class="muted">lägger</text>
<line class="line strong" x1="550" y1="182" x2="550" y2="260"/>
<line class="line strong" x1="541" y1="194" x2="559" y2="194"/>
<line class="line strong" x1="541" y1="202" x2="559" y2="202"/>
<line class="line strong" x1="541" y1="232" x2="559" y2="232"/>
<line class="line strong" x1="550" y1="242" x2="540" y2="260"/>
<line class="line strong" x1="550" y1="242" x2="560" y2="260"/>
<text x="568" y="222" class="muted">innehåller</text>
<line class="line strong" x1="260" y1="372" x2="440" y2="372"/>
<line class="line strong" x1="272" y1="363" x2="272" y2="381"/>
<line class="line strong" x1="280" y1="363" x2="280" y2="381"/>
<circle class="box" cx="406" cy="372" r="6"/>
<line class="line strong" x1="422" y1="372" x2="440" y2="362"/>
<line class="line strong" x1="422" y1="372" x2="440" y2="382"/>
<text x="350" y="362" text-anchor="middle" class="muted">finns på</text>
</svg>

Läs det högt, så märker du om något är fel:

- En kund lägger **noll eller många** ordrar. En order läggs av **exakt en** kund.
- En order innehåller **en eller många** orderrader. En orderrad hör till **exakt en** order.
- En produkt finns på **noll eller många** orderrader. En orderrad gäller **exakt en** produkt.

`Styckpris` ligger på `OrderRad` och inte bara på `Produkt` — annars skulle gamla ordrar plötsligt ändra pris när du höjer priset på produkten.

### Samma modell som EF Core-entiteter

Varje entitet blir en klass, varje attribut en property, och varje relation blir en **FK-property plus en navigation property**. Många-sidan får en lista. (Läs mer i [Entity Framework](../entityframework/index.md), särskilt [Entiteter](../entityframework/entiteter.md) och [Relationer](../entityframework/relationer.md).)

```csharp
public class Kund
{
    public int KundId { get; set; }                     // PK — EF hittar "<Klass>Id" själv
    public string Namn { get; set; } = "";
    public string Epost { get; set; } = "";
    public string? Telefon { get; set; }                // nullable = får saknas

    public List<Order> Ordrar { get; set; } = new();    // noll eller många
}

public class Order
{
    public int OrderId { get; set; }                    // PK
    public DateTime Datum { get; set; }
    public string Status { get; set; } = "Ny";

    public int KundId { get; set; }                     // FK → Kund
    public Kund Kund { get; set; } = null!;             // exakt en

    public List<OrderRad> Rader { get; set; } = new();  // en eller många (kontrolleras i koden)
}

public class OrderRad
{
    public int OrderRadId { get; set; }                 // PK
    public int Antal { get; set; }
    [Precision(10, 2)]
    public decimal Styckpris { get; set; }

    public int OrderId { get; set; }                    // FK → Order
    public Order Order { get; set; } = null!;

    public int ProduktId { get; set; }                  // FK → Produkt
    public Produkt Produkt { get; set; } = null!;
}

public class Produkt
{
    public int ProduktId { get; set; }                  // PK
    public string Namn { get; set; } = "";
    [Precision(10, 2)]
    public decimal Pris { get; set; }
    public int Lagersaldo { get; set; }

    public List<OrderRad> OrderRader { get; set; } = new();  // noll eller många
}

public class ShopContext : DbContext
{
    public DbSet<Kund> Kunder => Set<Kund>();
    public DbSet<Order> Ordrar => Set<Order>();
    public DbSet<OrderRad> OrderRader => Set<OrderRad>();
    public DbSet<Produkt> Produkter => Set<Produkt>();
}
```

Lägg märke till skillnaden mellan "noll" och "ett" som *minimum*:

- **Exakt ett** (`int KundId`, inte `int?`) → kolumnen blir `NOT NULL` i databasen. En order *kan inte* sparas utan kund.
- **Noll eller ett** skulle bli `int? KundId` → kolumnen tillåter `NULL`.
- **Ett eller många** kan databasen inte tvinga fram — det finns ingen constraint för "minst en rad i en annan tabell". Det kontrollerar du i koden innan du sparar, t.ex. `if (order.Rader.Count == 0) throw ...`.

## ER-diagram eller UML-klassdiagram?

De ser lika ut — rutor med namn och fält, linjer emellan — men de svarar på olika frågor.

| | ER-diagram | [UML-klassdiagram](uml-klassdiagram.md) |
|--|------------|------------------|
| **Beskriver** | Hur data **lagras** | Hur koden är **uppbyggd** |
| **Innehåll** | Attribut, PK, FK | Fält, properties **och metoder**, synlighet (`+`/`-`) |
| **Relationer** | Bara kopplingar och kardinalitet | Association, arv, komposition, implementation av interface |
| **Kardinalitet** | Kråkfot i linjens ände | Siffror: `1`, `0..1`, `1..*`, `*` |
| **Främmande nycklar** | Ritas ut (`FK KundId`) | Syns inte — objekt pekar direkt på varandra |
| **Arv** | Finns inte (tabeller ärver inte) | Central del |

Tumregel: rita **ER-diagram när du designar databasen**, och **klassdiagram när du designar koden**. Med EF Core ligger de nära varandra, men klassdiagrammet har metoder och arv som databasen aldrig ser, och ER-diagrammet har FK-kolumner som du i koden mest använder via navigation properties.

## När ska du välja ett ER-diagram?

| Välj ER-diagram när… | Välj något annat när… |
|----------------------|-----------------------|
| Du ska skapa eller ändra tabeller | Du vill visa klasser med metoder och arv → [klassdiagram](uml-klassdiagram.md) |
| Du vill diskutera kardinalitet: "kan en order sakna kund?" | Du vill visa hur data rör sig mellan processer → [dataflödesdiagram](dataflodesdiagram.md) |
| Du ska skriva EF Core-entiteter eller migrationer | Du vill visa i vilken ordning saker anropas → [sekvensdiagram](sekvensdiagram.md) |
| Du dokumenterar en befintlig databas | Du vill visa hela systemets delar (API, databas, klient) → [arkitekturdiagram](arkitekturdiagram.md) |

## Vanliga misstag

- **FK på fel sida.** Den främmande nyckeln ligger på *många*-sidan. `Kund` ska inte ha `OrderId`.
- **Många-till-många utan kopplingsentitet.** En relationsdatabas kan inte lagra N:M direkt. Rita ut `OrderRad` (eller motsvarande) — det är ändå där intressant data som antal och pris ofta bor.
- **Symbolen läses vid fel entitet.** "En kund lägger många ordrar" läses vid `Order`-änden. Säg meningen högt åt båda håll.
- **Glömt minimum.** Att bara rita kråkfot ("många") säger inget om noll är tillåtet. Bestäm om det ska vara ring eller streck — det avgör `NOT NULL`.
- **Metoder i ER-diagrammet.** `BeräknaTotal()` hör hemma i klassdiagrammet, inte här.

## Övning

Rita ett ER-diagram för ett bibliotek med entiteterna `Låntagare`, `Lån`, `Exemplar` och `Bok`:

1. En låntagare kan ha noll eller många lån. Ett lån tillhör exakt en låntagare.
2. Ett lån gäller exakt ett exemplar. Ett exemplar kan ha lånats noll eller många gånger.
3. En bok har ett eller många exemplar. Ett exemplar är av exakt en bok.

Markera PK och FK i varje entitet. Skriv sedan entitetsklasserna i C# och fundera: vilken av relationerna kan databasen *inte* tvinga fram, och var i koden skulle du kontrollera den?

## TL;DR

| Begrepp | Vad det är |
|---------|-----------|
| Entitet | Ruta = tabell = klass |
| Attribut | Rad i rutan = kolumn = property |
| PK / FK | Unik nyckel / pekare till en annan entitets PK (ligger på många-sidan) |
| Kråkfot | "Många" — inre symbolen är max, yttre är min |
| Ring / streck | Noll / ett |
| Skillnad mot klassdiagram | ER = hur data lagras; klassdiagram = hur koden är byggd |
