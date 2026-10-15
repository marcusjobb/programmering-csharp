# Masterindex: kapitel och sidor i samma ordning

**Status: UTKAST för Marcus granskning (F1-00).** Inget i böckerna är ändrat. När du godkänner indexet börjar F1-01.

Det här är den gemensamma strukturen för C#-boken, Java-boken och Python-boken: samma kapitel, samma sidor, samma ordning, samma mappnamn och filnamn. Indexet visar bara *vilka sidor som finns*, ingen text flyttas mellan böckerna (backlog, regel 3). Underlag: `normalisering.md` (n-id) och en genomgång av `docs/` i båda böckerna 2026-10-15.

## Så läser du tabellerna

- **Slug** är sidans filnamn utan `.md`, relativt kapitelmappen. `polymorfism/grunderna` betyder `oop/polymorfism/grunderna.md`. Rader som slutar på `/index` är undermappens egen sida.
- **Nr** är sidans `nav_order` bland syskon, i steg om 10. Det ger unika nummer och utrymme att lägga in sidor senare.
- **C# / Java:** `✔` = sidan finns redan på rätt sökväg. `↪ sökväg` = sidan finns men ligger på annan sökväg (flyttas eller döps om i kapitelpunkten i fas 1, flera sökvägar = sidorna slås ihop). `–` = sidan saknas i den boken.
- **Python:** `–` överallt tills Python-boken startar (F5).
- **Språkspecifik:** `Ja` = ämnet hör till ett språk eller ramverk. `Delvis` = begreppet finns i båda men koden skiljer sig. `Nej` = språkneutralt.
- **Paritet** fylls i vid F3B-00 (vilken bok som har den bästa versionen).
- **Åtgärd** hänvisar till `normalisering.md` (n-id) och till backlogpunkter (F2-xx).

## Regler jag har utgått från

1. **Sluggar:** gemener, kebab-case, ASCII (å/ä → a, ö → o), inga versaler eller understreck. Det gäller mappar och filer. Se F0-03.
2. **Samma slug och samma titel** på sidor som finns i båda böckerna (D4). Där ämnet har olika namn i språken (MOTSV, till exempel LINQ och Streams) delar sidorna **slug** men får olika **titel**.
3. **Ordning:** där sidan redan finns i C# behålls C#-ordningen, utom där ordningen uppenbart är en slump (Filhantering är i praktiken alfabetisk idag). Java-sidor som C# saknar placeras där de hör hemma ämnesmässigt. Alla avvikelser listas under *Beslut kvar* nedan.
4. **Neutrala mappnamn** för kapitel som annars heter efter ett ramverk (D1): `entityframework` → `orm`, `aspnetcore` → `webb`, `gui/windows-forms` → `gui/skrivbordsprogram`. Kapiteltiteln får vara språkspecifik.
5. **Kapitelordningen** (nav_order) är redan identisk i båda böckerna och ändras inte. Verktyg ligger på 970.
6. **Inga stubbar** (D2): en sida som saknas finns bara som `–` här.

## Grunder (`grunder/`, nav_order 15)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ↪ `java/index.md` | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Hur plattformen är uppbyggd | `plattform` | ↪ `grunder/dotnet-arkitektur.md` | – | – | Ja | | n1: Java skriver JDK/JRE/JVM/bytecode |
| 20 | .NET Framework vs .NET (Core) | `framework-vs-core` | ✔ | – | – | Ja | | n2: bara C#, ingen Java-sida behövs |
| 30 | Varför språket ser ut som det gör | `sprakets-ursprung` | ↪ `grunder/csharp-ursprung.md` | ↪ `java/Java.md` | – | Delvis | | n3: Java-sidan byggs ut till samma upplägg |
| 40 | Programstruktur | `programstruktur` | ✔ | – | – | Delvis | | n4 |
| 50 | Språkhistorik | `sprakhistorik` | ✔ | – | – | Ja | | n5: Java 8→25 med LTS markerade |

## Variabler (`variabler/`, nav_order 20)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ↪ `variables/index.md` | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Introduktion till variabler | `introduktion` | ↪ `variabler/variabler-kurs.md` | – | – | Nej | | n7: Java har innehållet i index, flyttas hit (F2-01) |
| 20 | Datatyper | `datatyper` | ✔ | – | – | Nej | | n8: Datatyper = vilka finns. Java saknar |
| 30 | Typer | `typer` | ✔ | ↪ `variables/types.md` | – | Nej | | n8: Typer = värde mot referens |
| 40 | Boolean | `boolean` | – | ↪ `variables/boolean.md` | – | Nej | | n9: +C# |
| 50 | var | `var` | – | ↪ `variables/var.md` | – | Delvis | | n10: +C# |
| 60 | Heltal | `heltal` | ✔ | – | – | Nej | | n11: översikt, +J |
| 70 | Integer (int) | `integer` | – | ↪ `variables/integer.md` | – | Nej | | n11: C# saknar, DELA ur Heltal |
| 80 | Long | `long` | – | ↪ `variables/long.md` | – | Nej | | n11: C# DELA ur Heltal |
| 90 | Byte och Short | `byte-short` | – | ↪ `variables/byteshort.md` | – | Nej | | n11: C# DELA ur Heltal |
| 100 | Decimaltal | `decimaltal` | ✔ | – | – | Delvis | | n12: översikt, +J |
| 110 | double och float | `double-float` | – | ↪ `variables/double.md` + `variables/float.md` + `variables/floatdoubledecimal.md` | – | Nej | | n12: Java SLÅ tre sidor till en (F2-03) |
| 120 | decimal och BigDecimal | `decimal` | – | ↪ `variables/decimal.md` | – | Delvis | | n12: C# har det inne i Decimaltal |
| 130 | Tecken och text | `tecken-och-text` | ✔ | ↪ `variables/char.md` | – | Nej | | n13 |
| 140 | Typalias | `typalias` | ✔ | – | – | Ja | | n14: bara C# |
| 150 | Konstanter | `konstanter` | ✔ | – | – | Delvis | | n15: +J final |
| 160 | Enum | `enum` | ✔ | ↪ `variables/enum.md` | – | Nej | | n16 |
| 170 | Tupler | `tupler` | ✔ | – | – | Ja | | n17: Java MOTSV, hänvisa till records |
| 180 | Statiska variabler | `statiska-variabler` | ✔ | – | – | Nej | | n18: +J |
| 190 | Stränghantering | `stranghantering` | ↪ `variabler/stränghantering.md` | ↪ `variables/strings/index.md` | – | Nej | | n19: Java saknar grundsidan, +J metoder |
| 200 | Formatering och utskrift | `formatering` | ↪ `variabler/formatering-och-utskrift.md` | – | – | Delvis | | n20 |
| 210 | String.format | `stringformat` | – | ↪ `variables/strings/stringformat.md` | – | Ja | | n20: Java MOTSV, under Formatering |
| 220 | MessageFormat | `messageformat` | – | ↪ `variables/strings/messageformat.md` | – | Ja | | n20 |
| 230 | DecimalFormat | `decimalformat` | – | ↪ `variables/strings/decimalformat.md` | – | Ja | | n20 |
| 240 | StringBuilder | `stringbuilder` | ✔ | ↪ `variables/strings/stringbuilder.md` | – | Nej | | n21 |
| 250 | StringJoiner / string.Join | `stringjoiner` | – | ↪ `variables/strings/stringjoiner.md` | – | Delvis | | n22: C# har en sektion i StringBuilder |
| 260 | Regex | `regex` | ✔ | – | – | Nej | | n23: +J |
| 270 | Raw strings och textblock | `raw-strings` | ✔ | – | – | Ja | | n24: +J textblock |
| 280 | Null och nullable | `nullable` | ✔ | – | – | Ja | | n25: Java 'null och Optional' |
| 290 | Random | `random` | ✔ | – | – | Nej | | n26: +J |
| 300 | Datum och tid | `datum-och-tid` | ✔ | – | – | Ja | | n27: java.time |
| 310 | Guid och UUID | `guid` | ✔ | – | – | Ja | | n28: +J UUID |
| 320 | Span och Memory | `span-memory` | ✔ | – | – | Ja | | n29: bara C# |
| 330 | Exempel: Arbetad tid | `exempel-arbetad-tid` | – | ↪ `variables/examples/timereport.md` | – | Nej | | n30: +C# |
| 340 | Exempel: Kladdkaka | `exempel-kladdkaka` | – | ↪ `variables/examples/kladdkaka.md` | – | Nej | | n30: +C# |
| 350 | Testa dig själv | `testa-dig-sjalv` | ✔ | – | – | Nej | | n31: +J |

## If (`if/`, nav_order 30)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | if / else | `if-else` | ✔ | ↪ `if/else.md` + `if/elseif.md` | – | Nej | | n32: Java SLÅ else + else if (F2-02) |
| 20 | Switch | `switch` | ✔ | – | – | Delvis | | n33: +J |
| 30 | Mönstermatchning | `monstermatchning` | ↪ `if/pattern-matching.md` | – | – | Delvis | | n34: Java 21 |
| 40 | Ternary if | `ternary-if` | ↪ `if/ternaryif.md` | ↪ `if/ternaryif.md` | – | Nej | | n35 |
| 50 | Testa dig själv | `testa-dig-sjalv` | ✔ | – | – | Nej | | n36: +J |

## Diagram (`diagram/`, nav_order 40)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Flödesscheman | `flodesscheman` | ✔ | – | – | Nej | | n37 |
| 20 | UML-klassdiagram | `uml-klassdiagram` | ✔ | – | – | Delvis | | n38 |
| 30 | Sekvensdiagram | `sekvensdiagram` | ✔ | – | – | Nej | | n37 |
| 40 | Aktivitetsdiagram | `aktivitetsdiagram` | ✔ | – | – | Nej | | n37 |
| 50 | Tillståndsdiagram | `tillstandsdiagram` | ✔ | – | – | Nej | | n37 |
| 60 | Användningsfallsdiagram | `use-case-diagram` | ✔ | – | – | Nej | | n37 |
| 70 | ER-diagram | `er-diagram` | ↪ `diagram/er-diagram.md` + `sql/erd.md` | – | – | Nej | | n39 + n131: slås ihop, hemvist här (F2-16). SQL-kapitlet länkar hit |
| 80 | Arkitekturdiagram | `arkitekturdiagram` | ✔ | – | – | Nej | | n40 |
| 90 | Nätverksdiagram | `natverksdiagram` | ✔ | – | – | Nej | | n40 |
| 100 | Dataflödesdiagram | `dataflodesdiagram` | ✔ | – | – | Nej | | n40 |

## Loopar (`loopar/`, nav_order 50)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ↪ `loop/index.md` | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Introduktion till loopar | `introduktion` | – | ↪ `loop/omloopar.md` | – | Nej | | n41: C# har det i index och jämförelsetabellen |
| 20 | for | `for` | ↪ `loopar/grunder.md` | ↪ `loop/for.md` | – | Nej | | n41: C# DELA Grunderna i tre (F2-12) |
| 30 | while | `while` | – | ↪ `loop/while.md` | – | Nej | | n41: C# DELA |
| 40 | do-while | `do-while` | – | ↪ `loop/dowhile.md` | – | Nej | | n41: C# DELA |
| 50 | Foreach | `foreach` | ↪ `loopar/Foreach.md` | ↪ `loop/foreach.md` | – | Nej | | n42 |
| 60 | Nästlade loopar | `nastlade-loopar` | ✔ | ↪ `loop/nestedloop.md` | – | Nej | | n43 |
| 70 | Rekursion | `rekursion` | ✔ | ↪ `loop/recursion.md` | – | Nej | | n44 |
| 80 | Evig loop | `evig-loop` | – | ↪ `loop/eternalloop.md` | – | Nej | | n45: +C# |
| 90 | Break och continue | `break-continue` | ✔ | ↪ `loop/loopcontrol.md` | – | Delvis | | n46: Java DELA loopcontrol i två (F2-04) |
| 100 | Namngivna loopar | `namngivna-loopar` | ↪ `loopar/labeled-break.md` | – | – | Delvis | | n46 |
| 110 | Testa dig själv | `testa-dig-sjalv` | ✔ | – | – | Nej | | n47: +J |

## Metoder (`metoder/`, nav_order 60)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Om metoder | `om-metoder` | ↪ `metoder/metoder.md` + `metoder/metoder-kurs.md` | – | – | Nej | | n48: +J. C# har två sidor (om + lästext), se paritet |
| 20 | Parametrar | `parametrar` | ✔ | – | – | Delvis | | n49: Java utan default/namngivna |
| 30 | Värde- och referenstyper | `varde-och-referenstyper` | ✔ | – | – | Delvis | | n51: Java skickar allt som värde |
| 40 | Överlagring | `overlagring` | ↪ `metoder/metodoverlagring.md` + `metoder/overlagring-kurs.md` | – | – | Nej | | n50: C# har två sidor, se paritet |
| 50 | out | `out` | ✔ | – | – | Ja | | n52: Java skriver 'Varför finns inte out/ref?' under denna slug, returnera flera värden med record |
| 60 | ref | `ref` | ✔ | – | – | Ja | | n52: bara C# |
| 70 | params | `params` | ✔ | – | – | Delvis | | n53: Java varargs |
| 80 | Lambda och delegater | `lambda` | ✔ | – | – | Delvis | | n54: Java lambda och funktionella gränssnitt (titeln får skilja) |
| 90 | Extension-metoder | `extension-metoder` | ✔ | – | – | Ja | | n55: bara C# |
| 100 | Extension-properties | `extension-properties` | ✔ | – | – | Ja | | n55: bara C# |
| 110 | Extension-indexerare | `extension-indexerare` | ↪ `metoder/extension-indexers.md` | – | – | Ja | | n55: bara C# |
| 120 | Testa dig själv | `testa-dig-sjalv` | ✔ | – | – | Nej | | n56: +J |

## Undantagshantering (`undantagshantering/`, nav_order 62)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | try, catch och finally | `try-catch-finally` | ↪ `undantagshantering/grunderna.md` | – | – | Delvis | | n57: Java checked mot unchecked |
| 20 | Egna exceptions | `egna-exceptions` | ✔ | – | – | Nej | | n58 |
| 30 | Resurshantering (using / try-with-resources) | `resurshantering` | – | – | – | Ja | | n59: ny i båda, kopplas till n101 |

## Datastrukturer (`datastrukturer/`, nav_order 70)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ↪ `datastructures/index.md` | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Generics | `generics` | ✔ | – | – | Nej | | n60: +J, före List |
| 20 | Arrays | `arrays` | ✔ | ↪ `datastructures/arrays.md` | – | Nej | | n61 |
| 30 | Array övningar | `array-ovningar/index` | ↪ `datastrukturer/arrayexercises/index.md` | ↪ `datastructures/arrayexercises/index.md` | – | Nej | | n62: undermapp. C# +C# använd Javas tiolista som mall |
| 10 | &nbsp;&nbsp;Plocka ut en del av en array | `array-ovningar/arraycopy` | ↪ `datastrukturer/arrayexercises/arrayCopy.md` | ↪ `datastructures/arrayexercises/arraycopy.md` | – | Nej | | n62 |
| 20 | &nbsp;&nbsp;Summera element i en array | `array-ovningar/ovning1` | ↪ `datastrukturer/arrayexercises/ovning1.md` | ↪ `datastructures/arrayexercises/ovning1.md` | – | Nej | | n62 |
| 30 | &nbsp;&nbsp;Hitta det största elementet i en array | `array-ovningar/ovning2` | ↪ `datastrukturer/arrayexercises/ovning2.md` | ↪ `datastructures/arrayexercises/ovning2.md` | – | Nej | | n62 |
| 40 | &nbsp;&nbsp;Invertera en array | `array-ovningar/ovning3` | ↪ `datastrukturer/arrayexercises/ovning3.md` | ↪ `datastructures/arrayexercises/ovning3.md` | – | Nej | | n62 |
| 40 | Tvådimensionella arrayer | `tvadimensionella-arrayer` | ✔ | – | – | Delvis | | n63: Java +J, kanske en gemensam sida (paritetsbeslut) |
| 50 | Tredimensionella arrayer | `tredimensionella-arrayer` | ✔ | – | – | Delvis | | n63 |
| 60 | Jagged arrays | `jagged-arrays` | ✔ | – | – | Delvis | | n63 |
| 70 | List | `list` | ✔ | ↪ `datastructures/arraylistlist.md` | – | Ja | | n64: Java DELA i List-gränssnittet och ArrayList (F2-05) |
| 80 | ArrayList | `arraylist` | – | – | – | Ja | | n64: Java DELA ut. C# notis om gamla ArrayList |
| 90 | Dictionary / HashMap | `dictionary` | ✔ | ↪ `datastructures/dictionary.md` | – | Ja | | n65 |
| 100 | Map | `map` | – | ↪ `datastructures/map.md` | – | Ja | | n65: Javas Map-gränssnitt. C# har IDictionary i interface-vs-konkret-typ |
| 110 | Gränssnitt mot konkret typ | `interface-vs-konkret-typ` | ✔ | – | – | Nej | | n66: +J |
| 120 | Samlingsuttryck | `collection-expressions` | ✔ | – | – | Ja | | n67: Java List.of, Map.of |
| 130 | LINQ och Streams | `linq-streams` | ↪ `datastrukturer/linq.md` | – | – | Ja | | n68: MOTSV. Titeln får skilja (LINQ / Streams) |
| 140 | LinkedList | `linkedlist` | ✔ | – | – | Nej | | n69: +J |
| 150 | HashSet | `hashset` | ✔ | – | – | Nej | | n70: +J |
| 160 | Stack och Queue | `stack-queue` | ✔ | – | – | Delvis | | n71: Java Deque |
| 170 | Records | `records` | ↪ `oop/records.md` | ↪ `datastructures/record.md` | – | Nej | | n72: C# FLYTTA från OOP hit (F2-15) |
| 180 | Testa dig själv | `testa-dig-sjalv` | ✔ | – | – | Nej | | n76: +J |

## Algoritmer (`algoritmer/`, nav_order 75)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Sorteringsalgoritmer | `sorteringsalgoritmer` | ✔ | – | – | Delvis | | n77: +J |
| 20 | Sökalgoritmer | `sokalgoritmer` | ↪ `datastrukturer/sokalgoritmer.md` | – | – | Nej | | n74: C# FLYTTA från Datastrukturer. +J |
| 30 | Grafer och BFS | `grafer` | ↪ `datastrukturer/grafer.md` | – | – | Nej | | n75: C# FLYTTA från Datastrukturer. +J |
| 40 | Dijkstras algoritm | `dijkstra` | ✔ | – | – | Nej | | n78: +J |
| 50 | Jaccard-similaritet | `jaccard-similaritet` | ✔ | – | – | Nej | | n79: +J |
| 60 | Decision trees | `decision-trees` | ✔ | – | – | Nej | | n80: +J |

## Objektorienterad programmering (OOP) (`oop/`, nav_order 80)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | OOP, en kort historik | `historik` | ✔ | – | – | Nej | | n81: +J, neutral |
| 20 | Klasser och objekt | `klasser` | ✔ | ✔ | – | Nej | | n82: Java flyttar exemplet ur index |
| 30 | Konstruktorer | `konstruktorer` | ↪ `oop/konstruktor.md` | – | – | Nej | | n83: +J |
| 40 | Konstruktoröverlagring | `konstruktoroverlagring` | ↪ `oop/overlagring.md` | – | – | Nej | | n83: +J |
| 50 | Properties och getters/setters | `properties` | ✔ | – | – | Ja | | n84: MOTSV. Titeln får skilja |
| 60 | Inkapsling | `inkapsling` | ✔ | ✔ | – | Nej | | n85 |
| 70 | ToString, equals, hashCode | `tostring` | ✔ | – | – | Delvis | | n86: +J |
| 80 | Arv | `arv` | ✔ | ✔ | – | Nej | | n87 |
| 90 | Polymorfism | `polymorfism/index` | ✔ | ✔ | – | Nej | | n88: undermapp |
| 10 | &nbsp;&nbsp;Polymorfism: grunderna | `polymorfism/grunderna` | ✔ | – | – | Delvis | | n88: Java har innehållet i index, flyttas hit |
| 20 | &nbsp;&nbsp;Abstrakta klasser | `polymorfism/abstrakta-klasser/index` | ↪ `oop/polymorfism/abstraktaklasser/index.md` | ↪ `oop/polymorfism/abstraktaklasser/index.md` | – | Nej | | n89: undermapp, nytt mappnamn |
| 10 | &nbsp;&nbsp;&nbsp;&nbsp;Exempel | `polymorfism/abstrakta-klasser/exempel` | ↪ `oop/polymorfism/abstraktaklasser/exempel.md` | ↪ `oop/polymorfism/abstraktaklasser/exempel.md` | – | Nej | | n89 |
| 30 | &nbsp;&nbsp;Interfaces | `polymorfism/interfaces/index` | ✔ | ✔ | – | Delvis | | n90: undermapp |
| 10 | &nbsp;&nbsp;&nbsp;&nbsp;Plugins | `polymorfism/interfaces/plugins` | ✔ | ✔ | – | Nej | | n90 |
| 100 | Klasskomposition | `klasskomposition` | ✔ | ✔ | – | Nej | | n91 |
| 110 | Komposition över arv | `komposition-over-arv` | ↪ `oop/compbeforeinherit.md` | ↪ `oop/compbeforeinherit.md` | – | Nej | | n92: nytt filnamn i båda |
| 120 | Åtkomstmoderator | `atkomstmoderator/index` | ✔ | ✔ | – | Ja | | n93: undermapp |
| 10 | &nbsp;&nbsp;Internal / package-private | `atkomstmoderator/paketniva` | ↪ `oop/atkomstmoderator/internal.md` | – | – | Ja | | n93: titeln får skilja (Internal / Package-private) |
| 20 | &nbsp;&nbsp;Private | `atkomstmoderator/private` | ✔ | ✔ | – | Nej | | n93 |
| 30 | &nbsp;&nbsp;Protected | `atkomstmoderator/protected` | ✔ | ✔ | – | Nej | | n93 |
| 40 | &nbsp;&nbsp;Public | `atkomstmoderator/public` | ✔ | ✔ | – | Nej | | n93 |
| 130 | Statiska klasser och metoder | `statiska-klasser-och-metoder` | ↪ `oop/static-klass.md` | ↪ `oop/atkomstmoderator/static.md` | – | Nej | | n94: FLYTTA ur Åtkomstmoderator i båda (C# static.md: slås ihop med denna, se F1-10) |
| 140 | Delegater / Funktionella gränssnitt | `delegater/index` | ✔ | ✔ | – | Ja | | n95: undermapp. Java ÄNDRA till Funktionella gränssnitt |
| 10 | &nbsp;&nbsp;Exempel | `delegater/exempel` | ✔ | ✔ | – | Ja | | n95 |
| 20 | &nbsp;&nbsp;Övning: Textbehandling | `delegater/ovning-textbehandling` | – | ↪ `oop/delegater/exercisetext.md` | – | Ja | | n95: +C# (paritet) |
| 150 | Events / Händelser | `events/index` | ✔ | ✔ | – | Delvis | | n96: undermapp |
| 10 | &nbsp;&nbsp;Exempel: Bankkonto | `events/exempel` | ✔ | ✔ | – | Delvis | | n96 |
| 160 | Partial class | `partial-klass` | ✔ | – | – | Ja | | n97: bara C# |
| 170 | POCO/POJO och DTO | `poco-dto` | ✔ | – | – | Ja | | n98: +J. Titeln får skilja |
| 180 | required och init | `required` | ✔ | – | – | Ja | | n99: bara C# |
| 190 | File-scoped types | `file-scoped-types` | ✔ | – | – | Ja | | n99: bara C# |
| 200 | Sealed | `sealed` | ✔ | – | – | Delvis | | n100: Java 17 |
| 210 | Destruktor och IDisposable | `destruktor` | ✔ | – | – | Ja | | n101: MOTSV AutoCloseable. Titeln får skilja |
| 220 | Garbage Collector | `garbage-collector` | ✔ | – | – | Delvis | | n102: +J |
| 230 | Egna datatyper (operatorer) | `egna-datatyper` | ✔ | – | – | Ja | | n103: bara C# |
| 240 | Attribut och Reflection / Annotations | `attribut-reflection` | ✔ | – | – | Ja | | n104: MOTSV. Titeln får skilja |
| 250 | Slutna hierarkier | `closed-hierarchies` | ✔ | – | – | Ja | | n105: bara C#. Java: sealed + records som motsvarighet |
| 260 | Union-typer | `union-types` | ✔ | – | – | Ja | | n105: C# 15 preview |
| 270 | Struct | `struct` | ✔ | ↪ `datastructures/struct.md` | – | Ja | | n73: Java ska tas bort eller ersättas (D6 ändrad: behåll, bestäm i F2-08). Flyttar från Datastrukturer till OOP |
| 280 | Class, struct eller record | `records-structs-classes` | ✔ | – | – | Delvis | | n106: Java 'class, record eller enum' |
| 290 | Testa dig själv | `testa-dig-sjalv` | ✔ | – | – | Nej | | n107: +J |

## Designmönster (`designmonster/`, nav_order 85)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Factory och Strategy | `factory-strategy` | ✔ | – | – | Nej | | n108: +J |
| 20 | Repository och Dependency Inversion | `repository-dependency-inversion` | ✔ | – | – | Nej | | n109: +J |
| 30 | UI-arkitektur | `ui-arkitektur/index` | ✔ | – | – | Delvis | | n110: undermapp, 7 sidor + index. Senare (D5) |
| 10 | &nbsp;&nbsp;MVC | `ui-arkitektur/mvc` | ✔ | – | – | Nej | | n110 |
| 20 | &nbsp;&nbsp;Webb-MVC och Razor Pages | `ui-arkitektur/webb-mvc` | ✔ | – | – | Ja | | n110: MOTSV Spring MVC |
| 30 | &nbsp;&nbsp;MVP | `ui-arkitektur/mvp` | ✔ | – | – | Nej | | n110 |
| 40 | &nbsp;&nbsp;MVVM | `ui-arkitektur/mvvm` | ✔ | – | – | Nej | | n110 |
| 50 | &nbsp;&nbsp;Komponentarkitektur | `ui-arkitektur/komponenter` | ✔ | – | – | Delvis | | n110 |
| 60 | &nbsp;&nbsp;Flux och Redux | `ui-arkitektur/flux-redux` | ✔ | – | – | Nej | | n110 |
| 70 | &nbsp;&nbsp;MVU | `ui-arkitektur/mvu` | ✔ | – | – | Nej | | n110 |
| 40 | GoF-mönster | `gof/index` | ✔ | – | – | Delvis | | n111: undermapp med 3 grupper och 23 mönster. Senare (D5) |
| 10 | &nbsp;&nbsp;Skapande mönster | `gof/creational/index` | ✔ | – | – | Nej | | n111 |
| 10 | &nbsp;&nbsp;&nbsp;&nbsp;Abstract Factory | `gof/creational/abstract-factory` | ✔ | – | – | Nej | | n111 |
| 20 | &nbsp;&nbsp;&nbsp;&nbsp;Builder | `gof/creational/builder` | ✔ | – | – | Nej | | n111 |
| 30 | &nbsp;&nbsp;&nbsp;&nbsp;Factory Method | `gof/creational/factory-method` | ✔ | – | – | Nej | | n111 |
| 40 | &nbsp;&nbsp;&nbsp;&nbsp;Prototype | `gof/creational/prototype` | ✔ | – | – | Nej | | n111 |
| 50 | &nbsp;&nbsp;&nbsp;&nbsp;Singleton | `gof/creational/singleton` | ✔ | – | – | Nej | | n111 |
| 20 | &nbsp;&nbsp;Strukturella mönster | `gof/structural/index` | ✔ | – | – | Nej | | n111 |
| 10 | &nbsp;&nbsp;&nbsp;&nbsp;Adapter | `gof/structural/adapter` | ✔ | – | – | Nej | | n111 |
| 20 | &nbsp;&nbsp;&nbsp;&nbsp;Bridge | `gof/structural/bridge` | ✔ | – | – | Nej | | n111 |
| 30 | &nbsp;&nbsp;&nbsp;&nbsp;Composite | `gof/structural/composite` | ✔ | – | – | Nej | | n111 |
| 40 | &nbsp;&nbsp;&nbsp;&nbsp;Decorator | `gof/structural/decorator` | ✔ | – | – | Nej | | n111 |
| 50 | &nbsp;&nbsp;&nbsp;&nbsp;Facade | `gof/structural/facade` | ✔ | – | – | Nej | | n111 |
| 60 | &nbsp;&nbsp;&nbsp;&nbsp;Flyweight | `gof/structural/flyweight` | ✔ | – | – | Nej | | n111 |
| 70 | &nbsp;&nbsp;&nbsp;&nbsp;Proxy | `gof/structural/proxy` | ✔ | – | – | Nej | | n111 |
| 30 | &nbsp;&nbsp;Beteendemönster | `gof/behavioral/index` | ✔ | – | – | Nej | | n111 |
| 10 | &nbsp;&nbsp;&nbsp;&nbsp;Chain of Responsibility | `gof/behavioral/chain-of-responsibility` | ✔ | – | – | Nej | | n111 |
| 20 | &nbsp;&nbsp;&nbsp;&nbsp;Command | `gof/behavioral/command` | ✔ | – | – | Nej | | n111 |
| 30 | &nbsp;&nbsp;&nbsp;&nbsp;Interpreter | `gof/behavioral/interpreter` | ✔ | – | – | Nej | | n111 |
| 40 | &nbsp;&nbsp;&nbsp;&nbsp;Iterator | `gof/behavioral/iterator` | ✔ | – | – | Nej | | n111 |
| 50 | &nbsp;&nbsp;&nbsp;&nbsp;Mediator | `gof/behavioral/mediator` | ✔ | – | – | Nej | | n111 |
| 60 | &nbsp;&nbsp;&nbsp;&nbsp;Memento | `gof/behavioral/memento` | ✔ | – | – | Nej | | n111 |
| 70 | &nbsp;&nbsp;&nbsp;&nbsp;Observer | `gof/behavioral/observer` | ✔ | – | – | Nej | | n111 |
| 80 | &nbsp;&nbsp;&nbsp;&nbsp;State | `gof/behavioral/state` | ✔ | – | – | Nej | | n111 |
| 90 | &nbsp;&nbsp;&nbsp;&nbsp;Strategy | `gof/behavioral/strategy` | ✔ | – | – | Nej | | n111 |
| 100 | &nbsp;&nbsp;&nbsp;&nbsp;Template Method | `gof/behavioral/template-method` | ✔ | – | – | Nej | | n111 |
| 110 | &nbsp;&nbsp;&nbsp;&nbsp;Visitor | `gof/behavioral/visitor` | ✔ | – | – | Nej | | n111 |
| 50 | Antipatterns | `antipatterns` | ✔ | – | – | Nej | | n112: +J |

## Filhantering (`filhantering/`, nav_order 90)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Textfiler | `textfiler` | ↪ `filhantering/Text.md` | ↪ `filhantering/text.md` | – | Nej | | n116. Ny ordning föreslås: vanliga format först |
| 20 | CSV | `csv` | ↪ `filhantering/CSV.md` | ✔ | – | Nej | | n117 |
| 30 | JSON | `json` | ↪ `filhantering/Json.md` | ✔ | – | Nej | | n118 |
| 40 | XML | `xml` | ↪ `filhantering/XML.md` | ✔ | – | Nej | | n119 |
| 50 | Binära filer | `binar` | ↪ `filhantering/Binar.md` | – | – | Nej | | n114: Java har det i index, flyttas hit |
| 60 | Komprimering (GZip, Base64) | `komprimering` | ✔ | – | – | Delvis | | n115: Java har det i index, flyttas hit |
| 70 | File-klassen | `fileklassen` | ↪ `filhantering/Fileklassen.md` | ✔ | – | Ja | | n120 |
| 80 | Directory-klassen | `directoryklassen` | ↪ `filhantering/Directoryklassen.md` | – | – | Ja | | n120 |
| 90 | FileInfo | `fileinfo` | ↪ `filhantering/FileInfo.md` | – | – | Ja | | n120 |
| 100 | Mappar | `mappar` | ↪ `filhantering/Mappar.md` | ✔ | – | Ja | | n120 |
| 110 | Path-klassen | `pathklassen` | ↪ `filhantering/Pathklassen.md` | ✔ | – | Ja | | n120 |
| 120 | Files (NIO) | `files-nio` | – | – | – | Ja | | n120: Java-sida. C# saknar motsvarighet, behövs inte |
| 130 | ICS-filer (kalender) | `ics` | ✔ | – | – | Nej | | n121: +J. Verklig data |
| 140 | Edifact, grundform | `edifact-grundform` | – | ↪ `filhantering/edifactdefault.md` | – | Nej | | n122: +C#. Verklig data |
| 150 | Edifact med XML | `edifact-xml` | – | ↪ `filhantering/edifactxml.md` | – | Nej | | n122: +C# |

## SQL (`sql/`, nav_order 100)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Varför databaser? | `varfor-databaser` | ✔ | – | – | Nej | | n124: +J |
| 20 | SQL, grunder | `sql-intro` | ✔ | – | – | Nej | | n126: +J |
| 30 | Databastyper | `databastyper` | ✔ | ↪ `sql/servers.md` | – | Nej | | n129: SLÅ till en jämförelse som täcker alla fyra (F2-07) |
| 40 | SQLite (H2 i Java) | `sqlite` | ✔ | – | – | Ja | | n125: Java H2 och SQLite via JDBC |
| 50 | DB Browser | `sqlite-browser` | ✔ | – | – | Ja | | n125 |
| 60 | Din första databas | `forsta-databasen` | ✔ | ✔ | – | Nej | | n128 |
| 70 | Databaser | `databas` | ↪ `sql/Databas.md` | ✔ | – | Nej | | n128 |
| 80 | Tabeller | `tabeller` | ↪ `sql/Tabeller.md` | ✔ | – | Nej | | n128 |
| 90 | Constraints | `constraints` | ↪ `sql/Constraints.md` | ✔ | – | Nej | | n128 |
| 100 | SQL-kommandon | `kommandon/index` | ✔ | ✔ | – | Nej | | n127: undermapp |
| 10 | &nbsp;&nbsp;Övningsdata | `kommandon/ovningsdata` | ✔ | ✔ | – | Nej | | n127 |
| 20 | &nbsp;&nbsp;SELECT | `kommandon/select` | ✔ | ✔ | – | Nej | | n127 |
| 30 | &nbsp;&nbsp;WHERE | `kommandon/where` | ✔ | ✔ | – | Nej | | n127 |
| 40 | &nbsp;&nbsp;ORDER BY | `kommandon/order-by` | ✔ | ✔ | – | Nej | | n127 |
| 50 | &nbsp;&nbsp;Aggregatfunktioner | `kommandon/aggregat` | ✔ | ✔ | – | Nej | | n127 |
| 60 | &nbsp;&nbsp;GROUP BY | `kommandon/group-by` | ✔ | ✔ | – | Nej | | n127 |
| 70 | &nbsp;&nbsp;JOIN | `kommandon/join` | ✔ | ✔ | – | Nej | | n127 |
| 80 | &nbsp;&nbsp;Subquery | `kommandon/subquery` | ✔ | ✔ | – | Nej | | n127 |
| 90 | &nbsp;&nbsp;COALESCE | `kommandon/coalesce` | ✔ | ✔ | – | Nej | | n127 |
| 100 | &nbsp;&nbsp;INSERT | `kommandon/insert` | ✔ | ✔ | – | Nej | | n127 |
| 110 | &nbsp;&nbsp;UPDATE | `kommandon/update` | ✔ | ✔ | – | Nej | | n127 |
| 120 | &nbsp;&nbsp;DELETE | `kommandon/delete` | ✔ | ✔ | – | Nej | | n127 |
| 130 | &nbsp;&nbsp;Från tabell till klass | `kommandon/tabeller-och-klasser` | ✔ | ✔ | – | Delvis | | n127 |
| 140 | &nbsp;&nbsp;SQL som kod | `kommandon/sql-som-kod` | ↪ `sql/kommandon/sql-som-csharp.md` | ↪ `sql/kommandon/sql-som-java.md` | – | Ja | | n127: nytt neutralt filnamn, titeln får skilja |
| 110 | Rita databasen med dbdiagram.io | `dbdiagram` | ✔ | ✔ | – | Nej | | n128 |
| 120 | Normalisering | `normalisering` | ✔ | – | – | Nej | | n132: +J |
| 130 | Transaktioner och ACID | `transaktioner` | ✔ | – | – | Delvis | | n130: +J (JDBC) |
| 140 | SQL injection | `sql-injection` | ✔ | – | – | Delvis | | n133: +J (PreparedStatement) |
| 150 | SQLite i kod | `sqlite-i-kod` | ↪ `sql/sqlite-i-csharp.md` | – | – | Ja | | n125: neutralt filnamn, MOTSV H2/JDBC |
| 160 | SQLite-handler | `sqlite-handler` | ✔ | – | – | Ja | | n125: MOTSV |
| 170 | SQL från kod: en rymdmanga | `sql-fran-kod-rymdmanga` | ↪ `sql/sql-fran-csharp-rymdmanga.md` | – | – | Ja | | neutralt filnamn. MOTSV |
| 180 | Lastmanifestet | `lastmanifestet` | ↪ `sql/sqlite-lastmanifestet.md` | – | – | Ja | | neutralt filnamn. MOTSV |
| 190 | CRUD-kodexempel | `crud-kodexempel` | ✔ | – | – | Ja | | MOTSV |
| 200 | Databasbibliotek (NuGet / Maven) | `databasbibliotek` | ↪ `sql/nuget-paket.md` | – | – | Ja | | MOTSV: NuGet ↔ Maven. Titeln får skilja |
| 210 | appsettings och connection strings | `konfiguration` | ↪ `sql/appsettings.md` | – | – | Ja | | MOTSV: neutralt filnamn |
| 220 | Docker-kommandon | `docker-kommandon` | ✔ | – | – | Nej | | +J |
| 230 | MySQL med Docker | `mysql-docker` | ✔ | – | – | Nej | | +J |
| 240 | Ordförklaringar | `ordforklaringar` | ✔ | – | – | Nej | | +J |
| 250 | Dataformat: JSON, XML, CSV, BSON | `format-jamforelse` | ✔ | – | – | Nej | | +J |

## ORM (Entity Framework / JPA) (`orm/`, nav_order 110)

n134: kapitelindex = ORM-översikt. Java är en stub idag. Titeln skiljer, mappen heter orm (D1)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ↪ `entityframework/index.md` | ↪ `entityframework/index.md` | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Kontext (DbContext / EntityManager) | `kontext/index` | ↪ `entityframework/kontext/index.md` | – | – | Ja | | n135: undermapp. Titeln skiljer |
| 10 | &nbsp;&nbsp;DbContext-livscykeln | `kontext/livscykel` | ↪ `entityframework/kontext/livscykel.md` | – | – | Ja | | n135 |
| 20 | &nbsp;&nbsp;Konfigurera DbContext | `kontext/konfiguration` | ↪ `entityframework/kontext/konfiguration.md` | – | – | Ja | | n135 |
| 20 | Entiteter | `entiteter` | ↪ `entityframework/entiteter.md` | – | – | Ja | | n136 |
| 30 | Relationer | `relationer` | ↪ `entityframework/relationer.md` | – | – | Ja | | n136 |
| 40 | Frågor mot ORM | `fragor` | ↪ `entityframework/linq-queries.md` | – | – | Ja | | n136: neutralt filnamn |
| 50 | Migrationer | `migrationer` | ↪ `entityframework/migrationer.md` | – | – | Ja | | n136: Java Flyway/Liquibase |
| 60 | Seeding | `seeding` | ↪ `entityframework/seeding.md` | – | – | Ja | | n136 |
| 70 | Prestanda | `prestanda` | ↪ `entityframework/performance.md` | – | – | Ja | | n136 |
| 80 | Övning: Code-First dagbok | `ovning-code-first` | ↪ `entityframework/exempel.md` | – | – | Ja | | n137 |

## Testa din kod (`testa-din-kod/`, nav_order 115)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | TDD | `tdd` | ✔ | ✔ | – | Delvis | | n138: Java flyttar index-innehåll |
| 20 | Röd, Grön, Blå | `rod-gron-bla` | – | ↪ `testa-din-kod/redgreenblue.md` | – | Nej | | n139: +C#. Nytt filnamn |
| 30 | Budgetexempel | `budgetexempel` | – | ✔ | – | Delvis | | n140: +C# |
| 40 | Stringhelper | `stringhelper` | – | ✔ | – | Delvis | | n140: +C# |
| 50 | Fler exempel | `fler-exempel` | – | ↪ `testa-din-kod/moreexemples.md` | – | Delvis | | n140: +C#. Nytt filnamn |
| 60 | Kodgranskning | `kodgranskning` | ↪ `testa-din-kod/kodrecension.md` | – | – | Nej | | n141: +J. Nytt filnamn |

## APIer (`api/`, nav_order 120)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | REST | `rest` | ✔ | – | – | Nej | | n142: +J |
| 20 | GraphQL | `graphql` | ✔ | – | – | Nej | | n143: +J |
| 30 | SOAP | `soap` | ✔ | – | – | Nej | | n143: +J |
| 40 | Endpoints | `endpoints` | ✔ | – | – | Delvis | | n144: +J |
| 50 | CORS | `cors` | ✔ | – | – | Delvis | | n144: +J |
| 60 | MVC och API | `mvc-och-api` | ↪ `api/apimvc.md` | – | – | Ja | | n145: MOTSV |
| 70 | Microservices | `microservices` | ✔ | ↪ `api/microservices.md` + `api/apimicroservices.md` | – | Nej | | n146: Java SLÅ två sidor (F2-06) |
| 80 | OpenAPI och Scalar | `scalar` | ✔ | – | – | Ja | | n147: MOTSV springdoc |
| 90 | Swagger | `swagger` | ✔ | – | – | Ja | | n147 |
| 100 | FTP och SFTP | `ftp/index` | – | ✔ | – | Nej | | n148: +C#, undermapp |
| 10 | &nbsp;&nbsp;FTP, grunder | `ftp/ftp-grunder` | – | ↪ `api/ftp/ftpfilhantering.md` | – | Nej | | n148: nytt filnamn |
| 20 | &nbsp;&nbsp;FTP i kod | `ftp/ftp-i-kod` | – | ↪ `api/ftp/ftpfilhanteringjava.md` | – | Ja | | n148: nytt neutralt filnamn, titeln skiljer. +C# (FluentFTP) |
| 30 | &nbsp;&nbsp;SFTP i kod | `ftp/sftp-i-kod` | – | ↪ `api/ftp/sffilhanteringjava.md` | – | Ja | | n148: +C# (SSH.NET) |
| 110 | Testa dig själv | `testa-dig-sjalv` | ✔ | – | – | Nej | | n149: +J |

## Grafiska gränssnitt (GUI) (`gui/`, nav_order 125)

Mappen skrivbordsprogram är nytt namn (D1). Java är en stub

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Skrivbordsprogram (Windows Forms / JavaFX) | `skrivbordsprogram/index` | ↪ `gui/windows-forms/index.md` | – | – | Ja | | n150: undermapp. Java Swing eller JavaFX. Senare (D5) |
| 10 | &nbsp;&nbsp;Kontroller | `skrivbordsprogram/kontroller` | ↪ `gui/windows-forms/kontroller.md` | – | – | Ja | | n150 |
| 20 | &nbsp;&nbsp;Layout | `skrivbordsprogram/layout` | ↪ `gui/windows-forms/layout.md` | – | – | Ja | | n150 |
| 30 | &nbsp;&nbsp;Events i Windows Forms | `skrivbordsprogram/events` | ↪ `gui/windows-forms/events.md` | – | – | Ja | | n150 |
| 40 | &nbsp;&nbsp;OOP i Windows Forms | `skrivbordsprogram/oop-i-gui` | ↪ `gui/windows-forms/oop-i-winforms.md` | – | – | Ja | | n150: neutralt filnamn |

## Webb (ASP.NET Core / Spring Boot) (`webb/`, nav_order 130)

Mappen webb är nytt namn (D1). Java är en stub

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ↪ `aspnetcore/index.md` | ↪ `aspnetcore/index.md` | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Webbapp, intro och Hangman | `webbapp-hangman` | ↪ `aspnetcore/coreapp.md` | – | – | Ja | | n151: MOTSV Spring Boot. Senare (D5) |
| 20 | Dependency Injection | `dependency-injection` | ↪ `aspnetcore/dependency-injection.md` | – | – | Ja | | n153: MOTSV Spring. Se n109 |
| 30 | Cookies | `cookies/index` | ↪ `aspnetcore/cookies/index.md` | – | – | Delvis | | n152: undermapp |
| 10 | &nbsp;&nbsp;Skapa | `cookies/skapa` | ↪ `aspnetcore/cookies/skapa.md` | – | – | Delvis | | n152 |
| 20 | &nbsp;&nbsp;Radera | `cookies/radera` | ↪ `aspnetcore/cookies/radera.md` | – | – | Delvis | | n152 |
| 30 | &nbsp;&nbsp;Olika typer av cookies | `cookies/cookietypes` | ↪ `aspnetcore/cookies/cookietypes.md` | – | – | Nej | | n152: neutralt, +J |
| 40 | &nbsp;&nbsp;Session | `cookies/session` | ↪ `aspnetcore/cookies/session.md` | – | – | Delvis | | n152: neutralt, +J |
| 50 | &nbsp;&nbsp;TempData | `cookies/tempdata` | ↪ `aspnetcore/cookies/tempdata.md` | – | – | Ja | | n152: bara ASP.NET |
| 60 | &nbsp;&nbsp;ViewBag | `cookies/viewbag` | ↪ `aspnetcore/cookies/viewbag.md` | – | – | Ja | | n152: bara ASP.NET |
| 40 | Blazor | `blazor/index` | ↪ `aspnetcore/blazor/index.md` | – | – | Ja | | n154: bara C# |
| 10 | &nbsp;&nbsp;Databindning | `blazor/databindning` | ↪ `aspnetcore/blazor/databindning.md` | – | – | Ja | | n154 |
| 20 | &nbsp;&nbsp;Events i Blazor | `blazor/events` | ↪ `aspnetcore/blazor/events.md` | – | – | Ja | | n154 |
| 30 | &nbsp;&nbsp;Villkor och listor | `blazor/villkor-och-listor` | ↪ `aspnetcore/blazor/villkor-och-listor.md` | – | – | Ja | | n154 |
| 40 | &nbsp;&nbsp;Komponenter | `blazor/komponenter` | ↪ `aspnetcore/blazor/komponenter.md` | – | – | Ja | | n154 |
| 50 | &nbsp;&nbsp;Hosting-modeller | `blazor/hosting-modeller` | ↪ `aspnetcore/blazor/hosting-modeller.md` | – | – | Ja | | n154 |

## Asynkron (`asynkron/`, nav_order 140)

n155: intro finns i båda kapitelindexen

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Exempel | `exempel` | ✔ | ✔ | – | Ja | | n155 |
| 20 | Lock och trådsäkerhet | `lock` | ✔ | – | – | Ja | | n156: MOTSV synchronized, ReentrantLock |
| 30 | Threading och TPL | `threading` | ↪ `asynkron/threading-tpl.md` | – | – | Ja | | n157: neutralt filnamn. MOTSV ExecutorService, virtuella trådar |
| 40 | Asynkron validering | `validering` | ✔ | – | – | Ja | | n158: bara C# |

## AI (`ai/`, nav_order 150)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Domänkunskap och AI | `domankunskap` | ↪ `ai/domänkunskap.md` | – | – | Nej | | n159: +J, kopiera eller dela källa |
| 20 | AI-modeller | `modeller/index` | ✔ | – | – | Nej | | n159: undermapp |
| 10 | &nbsp;&nbsp;Claude | `modeller/claude` | ✔ | – | – | Nej | | n159 |
| 20 | &nbsp;&nbsp;ChatGPT | `modeller/chatgpt` | ✔ | – | – | Nej | | n159 |
| 30 | &nbsp;&nbsp;Claude Code | `modeller/claude-code` | ✔ | – | – | Nej | | n159 |
| 40 | &nbsp;&nbsp;Gemini | `modeller/gemini` | ✔ | – | – | Nej | | n159 |
| 50 | &nbsp;&nbsp;GitHub Copilot | `modeller/copilot` | ✔ | – | – | Nej | | n159 |
| 60 | &nbsp;&nbsp;Codex och kodnings-AI | `modeller/codex` | ✔ | – | – | Nej | | n159 |
| 30 | Prompting | `prompting/index` | ✔ | – | – | Nej | | n159: undermapp |
| 10 | &nbsp;&nbsp;Promptens grunder | `prompting/grunderna` | ✔ | – | – | Nej | | n159 |
| 20 | &nbsp;&nbsp;Promptingtekniker | `prompting/tekniker` | ✔ | – | – | Nej | | n159 |
| 40 | AI-API | `ai-api/index` | ✔ | – | – | Ja | | n160: undermapp. MOTSV Java SDK |
| 10 | &nbsp;&nbsp;Anthropic API (Claude) | `ai-api/anthropic` | ✔ | – | – | Ja | | n160 |
| 20 | &nbsp;&nbsp;OpenAI API (ChatGPT) | `ai-api/openai` | ✔ | – | – | Ja | | n160 |
| 50 | AI-exempel | `exempel/index` | ✔ | – | – | Ja | | n160: undermapp |
| 10 | &nbsp;&nbsp;Chatbot | `exempel/chatbot` | ✔ | – | – | Ja | | n160 |
| 20 | &nbsp;&nbsp;AI-coder | `exempel/coder` | ✔ | – | – | Ja | | n160 |
| 30 | &nbsp;&nbsp;Decision helper | `exempel/decision` | ✔ | – | – | Ja | | n160 |

## Verktyg (`verktyg/`, nav_order 970)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Installation | `installation/index` | ✔ | – | – | Ja | | n161: undermapp |
| 10 | &nbsp;&nbsp;Installera Git | `installation/installera-git` | ↪ `verktyg/installation/Gitinstallation.md` | – | – | Nej | | n161 |
| 20 | &nbsp;&nbsp;Rider | `installation/rider` | ↪ `verktyg/installation/Riderinstallation.md` | – | – | Ja | | n161: Java IntelliJ |
| 30 | &nbsp;&nbsp;Visual Studio | `installation/visual-studio` | ↪ `verktyg/installation/VisualStudioinstallation.md` | – | – | Ja | | n161 |
| 40 | &nbsp;&nbsp;VS Code | `installation/vs-code` | ↪ `verktyg/installation/VSCodeinstallation.md` | – | – | Delvis | | n161: +J |
| 50 | &nbsp;&nbsp;IntelliJ | `installation/intellij` | – | – | – | Ja | | n161: Java-sida, saknar C#-motsvarighet i listan |
| 60 | &nbsp;&nbsp;JDK och Maven | `installation/jdk-och-maven` | – | – | – | Ja | | n161: Java-sida |
| 20 | Git | `git/index` | ✔ | – | – | Nej | | n162: undermapp. Länka till git-bok |
| 10 | &nbsp;&nbsp;Git, grunder | `git/git-grunder` | ✔ | – | – | Nej | | n162: +J |
| 20 | &nbsp;&nbsp;Git, konflikter | `git/git-konflikter` | ✔ | – | – | Nej | | n162: +J |
| 30 | &nbsp;&nbsp;GitHub Actions | `git/github-actions` | ✔ | ↪ `github/index.md` | – | Delvis | | n163: Java flyttar hit från github/ |
| 40 | &nbsp;&nbsp;GitHub Actions, exempel | `git/github-actions-exempel/index` | – | ↪ `github/code/index.md` | – | Delvis | | n163: +C# portera exemplen |
| 10 | &nbsp;&nbsp;&nbsp;&nbsp;Contribution Statistics | `git/github-actions-exempel/commits` | – | ↪ `github/code/commits.md` | – | Delvis | | n163 |
| 20 | &nbsp;&nbsp;&nbsp;&nbsp;Commit historik | `git/github-actions-exempel/history` | – | ↪ `github/code/history.md` | – | Delvis | | n163 |
| 50 | &nbsp;&nbsp;Testa dig själv (Git) | `git/testa-dig-sjalv` | ✔ | – | – | Nej | | n162: +J |
| 30 | Webbtjänster | `webbtjanster/index` | ↪ `verktyg/webbjanster/index.md` | – | – | Nej | | n164: undermapp, nytt filnamn-stavning (webbtjanster) |
| 10 | &nbsp;&nbsp;Anteckningsverktyg | `webbtjanster/anteckning` | ↪ `verktyg/webbjanster/anteckning.md` | – | – | Nej | | n164 |
| 20 | &nbsp;&nbsp;Miro | `webbtjanster/miro` | ↪ `verktyg/webbjanster/miro.md` | – | – | Nej | | n164 |
| 30 | &nbsp;&nbsp;Goblin Tools | `webbtjanster/goblin-tools` | ↪ `verktyg/webbjanster/goblin-tools.md` | – | – | Nej | | n164 |
| 40 | &nbsp;&nbsp;Kommunikation | `webbtjanster/kommunikation` | ↪ `verktyg/webbjanster/kommunikation.md` | – | – | Nej | | n164 |
| 40 | Testa dig själv (Verktyg) | `testa-dig-sjalv` | ✔ | – | – | Nej | | n164 |

## Övrigt (`misc/`, nav_order 980)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Konsol-I/O | `konsol-io` | ↪ `misc/konsol.md` | – | – | Ja | | n165: MOTSV Scanner |
| 20 | Planera innan du kodar | `planering` | ✔ | – | – | Nej | | n167: +J |
| 30 | 10 tips för juniorer | `junior-tips` | ✔ | – | – | Nej | | n168: +J |
| 40 | Funktionell programmering | `funktionell-programmering` | ✔ | ↪ `misc/funcprog.md` | – | Delvis | | n166: båda finns. Kopplas till n68 |
| 50 | Funktionell kodning | `funktionell-kodning` | ↪ `misc/oneliner.md` | – | – | Delvis | | n166: överväg SLÅ med föregående (F2-17) |
| 60 | Console.Beep | `konsol-ljud` | ✔ | – | – | Ja | | n169: bara C# |
| 70 | allows ref struct | `allows-ref-struct` | ✔ | – | – | Ja | | n169: bara C# |
| 80 | Inline arrays | `inline-arrays` | ✔ | – | – | Ja | | n169: bara C# |
| 90 | Generisk matematik | `generisk-matematik` | ✔ | – | – | Ja | | n169: bara C# |
| 100 | UTF-8 string literals | `utf8-strings` | ✔ | – | – | Ja | | n169: bara C# |

## Ordlista (`ordlista/`, nav_order 985)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Git | `git` | ↪ `ordlista/Git.md` | ✔ | – | Nej | | n170 |
| 20 | Programmering | `programmering` | ↪ `ordlista/Programmering.md` | ✔ | – | Nej | | n170 |
| 30 | Programmeringsspråk | `programmeringssprak` | ✔ | ✔ | – | Nej | | n170 |
| 40 | Datatyper | `datatyper` | ↪ `ordlista/Datatyper.md` | – | – | Delvis | | n171: +J |
| 50 | Kontrollstruktur | `kontrollstruktur` | ↪ `ordlista/Kontrollstruktur.md` | – | – | Delvis | | n171: +J |
| 60 | Samlingar | `samlingar` | ↪ `ordlista/Samlingar.md` | – | – | Delvis | | n171: +J |
| 70 | Strängar | `strangar` | ↪ `ordlista/Strangar.md` | – | – | Delvis | | n171: +J |
| 80 | Operatorer | `operatorer` | ↪ `ordlista/Operatorer.md` | – | – | Delvis | | n171: +J |
| 90 | Metodik | `metodik` | ↪ `ordlista/Metodik.md` | – | – | Delvis | | n171: +J |
| 100 | Webb | `webb` | ↪ `ordlista/Webb.md` | ✔ | – | Nej | | n170 |
| 110 | Yrken | `yrken` | ↪ `ordlista/Yrken.md` | ✔ | – | Nej | | n170 |

## Rotsidor (utanför kapitlen)

| Sidtitel | Slug | C# | Java | Python | Åtgärd |
|---|---|---|---|---|---|
| Startsida | `index` | ✔ | ✔ | – | Bokens förstasida. Listar kapitlen i samma ordning |
| Om sidan | `om-sidan` | ↪ `Omsidan.md` | – | – | n6: +J, liten sida. Nytt filnamn |
| Andra e-böcker av Marcus | `andra-ebocker` | ✔ | ✔ | – |  |
| Licens | `licens` | ✔ | ✔ | – |  |

## Tas bort eller slås ihop

| Sida | Bok | Vad händer |
|---|---|---|
| `oop/atkomstmoderator/static.md` (Static) | C# | Slås ihop med `oop/static-klass.md` till `statiska-klasser-och-metoder` (n94, F1-10). Static hör inte hemma under Åtkomstmoderator |
| `variables/strings/choiceformat.md` | Java | Tas bort, platshållare på en rad (n20, F2-08, D6) |
| `sql/erd.md` | C# | Slås ihop med `diagram/er-diagram.md` (n39 och n131, F2-16). SQL-kapitlet länkar till Diagram |
| `loop/loopcontrol.md`, `variables/double.md` m.fl. | Java | Delas eller slås ihop enligt raderna ovan (F2-03, F2-04) |

## Beslut kvar (Marcus)

Det här är det jag vill att du tittar på. Allt annat följer av tidigare beslut.

1. **Filhantering, ordning.** C#-ordningen är alfabetisk (Binär, CSV, Directory, FileInfo, File...). Jag föreslår: Textfiler, CSV, JSON, XML, Binära filer, Komprimering, fil-API:erna (File, Directory, FileInfo, Mappar, Path), Files (NIO), ICS, Edifact. Det är en pedagogisk ändring i C#-boken.
2. **Struct** flyttar från Datastrukturer (Java) till OOP, som C# redan har det (n73). Java-sidan behålls tills F2-08 (D6 ändrad).
3. **Records** flyttar från OOP till Datastrukturer i C# (n72, som i Java).
4. **Sökalgoritmer och Grafer** flyttar från Datastrukturer till Algoritmer i C# (n74, n75).
5. **ER-diagram** får en enda sida, i Diagram (n39 och n131). SQL-kapitlet länkar dit.
6. **Variabler, ordning.** Java har en sida per typ, C# har samlingssidor. Jag har lagt både Heltal (översikt) och Integer, Long, Byte/Short (djup) i listan, och på samma sätt Decimaltal, double/float och decimal/BigDecimal. C# får alltså fler sidor (F2-13) och Java färre (F2-03).
7. **Flerdimensionella arrayer.** C# har tre sidor (2D, 3D, jagged). n63 föreslog en sida i Java. Jag har behållit tre rader. Vill du ha en gemensam sida i Java är det ett paritetsbeslut i fas 3.
8. **GUI-mappen** `skrivbordsprogram` och **kapitlen** `orm` och `webb` är nya namn (D1). C#-URL:erna ändras (`/gui/windows-forms/`, `/entityframework/`, `/aspnetcore/`), och C# behöver då en `redirects.json` (F0-03).
9. **`omsidan` → `om-sidan`** och 32 filnamn med versaler (C#) skiftar till gemener. Alla får redirects.
10. **D4** (samma titel på gemensamma sidor): gäller som regel 2 ovan, tills du säger annat.

## Sammanfattning

| | Antal sidor i masterindexet |
|---|---|
| Finns i båda böckerna | 80 |
| Finns bara i C# | 239 |
| Finns bara i Java | 32 |
| Saknas i båda (nya) | 5 |

*(Räknat på sidor utom kapitelindex och rotsidor.)*
