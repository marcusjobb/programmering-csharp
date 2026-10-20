# Masterindex: kapitel och sidor i samma ordning

**Status: UTKAST för Marcus granskning (F1-00).** Uppdaterat 2026-10-21 till engelska sluggar (se regel 1). Båda böckerna är omdöpta till engelska namn (C# commit a66634d, Java 5121f00), men inga sidor har flyttats mellan kapitel ännu. När du godkänner indexet börjar F1-01.

Det här är den gemensamma strukturen för C#-boken, Java-boken och Python-boken: samma kapitel, samma sidor, samma ordning, samma mappnamn och filnamn. Indexet visar bara *vilka sidor som finns*, ingen text flyttas mellan böckerna (backlog, regel 3). Underlag: `normalisering.md` (n-id) och en genomgång av `docs/` i båda böckerna 2026-10-15.

## Så läser du tabellerna

- **Slug** är sidans filnamn utan `.md`, relativt kapitelmappen. `polymorphism/basics` betyder `oop/polymorphism/basics.md`. Rader som slutar på `/index` är undermappens egen sida.
- **Nr** är sidans `nav_order` bland syskon, i steg om 10. Det ger unika nummer och utrymme att lägga in sidor senare.
- **C# / Java:** `✔` = sidan finns redan på rätt sökväg. `↪ sökväg` = sidan finns men ligger på annan sökväg (flyttas eller döps om i kapitelpunkten i fas 1, flera sökvägar = sidorna slås ihop). `–` = sidan saknas i den boken.
- **Python:** `–` överallt tills Python-boken startar (F5).
- **Språkspecifik:** `Ja` = ämnet hör till ett språk eller ramverk. `Delvis` = begreppet finns i båda men koden skiljer sig. `Nej` = språkneutralt.
- **Paritet** fylls i vid F3B-00 (vilken bok som har den bästa versionen).
- **Åtgärd** hänvisar till `normalisering.md` (n-id) och till backlogpunkter (F2-xx).

## Regler jag har utgått från

1. **Sluggar:** engelska ord, gemener, kebab-case, ASCII, inga versaler eller understreck. Det gäller mappar, filer och bilder (beslutat 2026-10-20). Sidtitlarna i menyn är svenska (frontmatter `title`). Exempel: `variables/arrays.md`, inte `variabler/arrayer.md`. Se F0-03.
2. **Samma slug och samma titel** på sidor som finns i båda böckerna (D4). Där ämnet har olika namn i språken (MOTSV, till exempel LINQ och Streams) delar sidorna **slug** men får olika **titel**.
3. **Ordning:** där sidan redan finns i C# behålls C#-ordningen, utom där ordningen uppenbart är en slump (Filhantering är i praktiken alfabetisk idag). Java-sidor som C# saknar placeras där de hör hemma ämnesmässigt. Alla avvikelser listas under *Beslut kvar* nedan.
4. **Neutrala mappnamn** för kapitel som annars heter efter ett ramverk (D1): `entityframework` → `orm`, `aspnetcore` → `web`, `gui/windows-forms` → `gui/desktop`. Kapiteltiteln får vara språkspecifik.
5. **Kapitelordningen** (nav_order) är redan identisk i båda böckerna och ändras inte. Verktyg ligger på 970.
6. **Inga stubbar** (D2): en sida som saknas finns bara som `–` här.

## Grunder (`basics/`, nav_order 15)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Hur plattformen är uppbyggd | `platform` | ↪ `basics/dotnet-architecture.md` | – | – | Ja | | n1: Java skriver JDK/JRE/JVM/bytecode |
| 20 | .NET Framework vs .NET (Core) | `framework-vs-core` | ✔ | – | – | Ja | | n2: bara C#, ingen Java-sida behövs |
| 30 | Varför språket ser ut som det gör | `language-origin` | ↪ `basics/csharp-origin.md` | ↪ `basics/java-origin.md` | – | Delvis | | n3: Java-sidan byggs ut till samma upplägg |
| 40 | Programstruktur | `program-structure` | ✔ | – | – | Delvis | | n4 |
| 50 | Språkhistorik | `language-history` | ✔ | – | – | Ja | | n5: Java 8→25 med LTS markerade |

## Variabler (`variables/`, nav_order 20)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Introduktion till variabler | `introduction` | ↪ `variables/variables-reading.md` | – | – | Nej | | n7: Java har innehållet i index, flyttas hit (F2-01) |
| 20 | Datatyper | `data-types` | ✔ | – | – | Nej | | n8: Datatyper = vilka finns. Java saknar |
| 30 | Typer | `types` | ✔ | ✔ | – | Nej | | n8: Typer = värde mot referens |
| 40 | Boolean | `boolean` | – | ✔ | – | Nej | | n9: +C# |
| 50 | var | `var` | – | ✔ | – | Delvis | | n10: +C# |
| 60 | Heltal | `integers` | ✔ | – | – | Nej | | n11: översikt, +J |
| 70 | Integer (int) | `integer` | – | ✔ | – | Nej | | n11: C# saknar, DELA ur Heltal |
| 80 | Long | `long` | – | ✔ | – | Nej | | n11: C# DELA ur Heltal |
| 90 | Byte och Short | `byte-short` | – | ✔ | – | Nej | | n11: C# DELA ur Heltal |
| 100 | Decimaltal | `decimals` | ✔ | – | – | Delvis | | n12: översikt, +J |
| 110 | double och float | `double-float` | – | ↪ `variables/double.md` + `variables/float.md` + `variables/float-double-decimal.md` | – | Nej | | n12: Java SLÅ tre sidor till en (F2-03) |
| 120 | decimal och BigDecimal | `decimal` | – | ✔ | – | Delvis | | n12: C# har det inne i Decimaltal |
| 130 | Tecken och text | `characters-and-text` | ✔ | ↪ `variables/char.md` | – | Nej | | n13 |
| 140 | Typalias | `type-aliases` | ✔ | – | – | Ja | | n14: bara C# |
| 150 | Konstanter | `constants` | ✔ | – | – | Delvis | | n15: +J final |
| 160 | Enum | `enum` | ✔ | ✔ | – | Nej | | n16 |
| 170 | Tupler | `tuples` | ✔ | – | – | Ja | | n17: Java MOTSV, hänvisa till records |
| 180 | Statiska variabler | `static-variables` | ✔ | – | – | Nej | | n18: +J |
| 190 | Stränghantering | `string-handling` | ↪ `variables/string-handling.md` | ↪ `variables/strings/index.md` | – | Nej | | n19: Java saknar grundsidan, +J metoder |
| 200 | Formatering och utskrift | `formatting` | ↪ `variables/formatting-and-output.md` | – | – | Delvis | | n20 |
| 210 | String.format | `string-format` | – | ↪ `variables/strings/string-format.md` | – | Ja | | n20: Java MOTSV, under Formatering |
| 220 | MessageFormat | `message-format` | – | ↪ `variables/strings/message-format.md` | – | Ja | | n20 |
| 230 | DecimalFormat | `decimal-format` | – | ↪ `variables/strings/decimal-format.md` | – | Ja | | n20 |
| 240 | StringBuilder | `stringbuilder` | ✔ | ↪ `variables/strings/string-builder.md` | – | Nej | | n21 |
| 250 | StringJoiner / string.Join | `string-joiner` | – | ↪ `variables/strings/string-joiner.md` | – | Delvis | | n22: C# har en sektion i StringBuilder |
| 260 | Regex | `regex` | ✔ | – | – | Nej | | n23: +J |
| 270 | Raw strings och textblock | `raw-strings` | ✔ | – | – | Ja | | n24: +J textblock |
| 280 | Null och nullable | `nullable` | ✔ | – | – | Ja | | n25: Java 'null och Optional' |
| 290 | Random | `random` | ✔ | – | – | Nej | | n26: +J |
| 300 | Datum och tid | `date-and-time` | ✔ | – | – | Ja | | n27: java.time |
| 310 | Guid och UUID | `guid` | ✔ | – | – | Ja | | n28: +J UUID |
| 320 | Span och Memory | `span-memory` | ✔ | – | – | Ja | | n29: bara C# |
| 330 | Exempel: Arbetad tid | `example-time-report` | – | ↪ `variables/examples/time-report.md` | – | Nej | | n30: +C# |
| 340 | Exempel: Kladdkaka | `example-chocolate-cake` | – | ↪ `variables/examples/chocolate-cake.md` | – | Nej | | n30: +C# |
| 350 | Testa dig själv | `test-yourself` | ✔ | – | – | Nej | | n31: +J |

## If (`conditionals/`, nav_order 30)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | if / else | `if-else` | ✔ | ↪ `conditionals/else.md` + `conditionals/else-if.md` | – | Nej | | n32: Java SLÅ else + else if (F2-02) |
| 20 | Switch | `switch` | ✔ | – | – | Delvis | | n33: +J |
| 30 | Mönstermatchning | `pattern-matching` | ✔ | – | – | Delvis | | n34: Java 21 |
| 40 | Ternary if | `ternary-if` | ✔ | ✔ | – | Nej | | n35 |
| 50 | Testa dig själv | `test-yourself` | ✔ | – | – | Nej | | n36: +J |

## Diagram (`diagrams/`, nav_order 40)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Flödesscheman | `flowcharts` | ✔ | – | – | Nej | | n37 |
| 20 | UML-klassdiagram | `uml-class-diagram` | ✔ | – | – | Delvis | | n38 |
| 30 | Sekvensdiagram | `sequence-diagram` | ✔ | – | – | Nej | | n37 |
| 40 | Aktivitetsdiagram | `activity-diagram` | ✔ | – | – | Nej | | n37 |
| 50 | Tillståndsdiagram | `state-diagram` | ✔ | – | – | Nej | | n37 |
| 60 | Användningsfallsdiagram | `use-case-diagram` | ✔ | – | – | Nej | | n37 |
| 70 | ER-diagram | `er-diagram` | ↪ `diagrams/er-diagram.md` + `sql/erd.md` | – | – | Nej | | n39 + n131: slås ihop, hemvist här (F2-16). SQL-kapitlet länkar hit |
| 80 | Arkitekturdiagram | `architecture-diagram` | ✔ | – | – | Nej | | n40 |
| 90 | Nätverksdiagram | `network-diagram` | ✔ | – | – | Nej | | n40 |
| 100 | Dataflödesdiagram | `data-flow-diagram` | ✔ | – | – | Nej | | n40 |

## Loopar (`loops/`, nav_order 50)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Introduktion till loopar | `introduction` | – | ↪ `loops/about-loops.md` | – | Nej | | n41: C# har det i index och jämförelsetabellen |
| 20 | for | `for` | ↪ `loops/basics.md` | ✔ | – | Nej | | n41: C# DELA Grunderna i tre (F2-12) |
| 30 | while | `while` | – | ✔ | – | Nej | | n41: C# DELA |
| 40 | do-while | `do-while` | – | ✔ | – | Nej | | n41: C# DELA |
| 50 | Foreach | `foreach` | ✔ | ✔ | – | Nej | | n42 |
| 60 | Nästlade loopar | `nested-loops` | ✔ | ✔ | – | Nej | | n43 |
| 70 | Rekursion | `recursion` | ✔ | ✔ | – | Nej | | n44 |
| 80 | Evig loop | `eternal-loop` | – | ✔ | – | Nej | | n45: +C# |
| 90 | Break och continue | `break-continue` | ✔ | ↪ `loops/loop-control.md` | – | Delvis | | n46: Java DELA loopcontrol i två (F2-04) |
| 100 | Namngivna loopar | `named-loops` | ↪ `loops/labeled-break.md` | – | – | Delvis | | n46 |
| 110 | Testa dig själv | `test-yourself` | ✔ | – | – | Nej | | n47: +J |

## Metoder (`methods/`, nav_order 60)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Om metoder | `about-methods` | ↪ `methods/methods.md` + `methods/methods-reading.md` | – | – | Nej | | n48: +J. C# har två sidor (om + lästext), se paritet |
| 20 | Parametrar | `parameters` | ✔ | – | – | Delvis | | n49: Java utan default/namngivna |
| 30 | Värde- och referenstyper | `value-and-reference-types` | ✔ | – | – | Delvis | | n51: Java skickar allt som värde |
| 40 | Överlagring | `overloading` | ↪ `methods/method-overloading.md` + `methods/overloading-reading.md` | – | – | Nej | | n50: C# har två sidor, se paritet |
| 50 | out | `out` | ✔ | – | – | Ja | | n52: Java skriver 'Varför finns inte out/ref?' under denna slug, returnera flera värden med record |
| 60 | ref | `ref` | ✔ | – | – | Ja | | n52: bara C# |
| 70 | params | `params` | ✔ | – | – | Delvis | | n53: Java varargs |
| 80 | Lambda och delegater | `lambda` | ✔ | – | – | Delvis | | n54: Java lambda och funktionella gränssnitt (titeln får skilja) |
| 90 | Extension-metoder | `extension-methods` | ✔ | – | – | Ja | | n55: bara C# |
| 100 | Extension-properties | `extension-properties` | ✔ | – | – | Ja | | n55: bara C# |
| 110 | Extension-indexerare | `extension-indexers` | ✔ | – | – | Ja | | n55: bara C# |
| 120 | Testa dig själv | `test-yourself` | ✔ | – | – | Nej | | n56: +J |

## Undantagshantering (`exceptions/`, nav_order 62)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | try, catch och finally | `try-catch-finally` | ↪ `exceptions/basics.md` | – | – | Delvis | | n57: Java checked mot unchecked |
| 20 | Egna exceptions | `custom-exceptions` | ✔ | – | – | Nej | | n58 |
| 30 | Resurshantering (using / try-with-resources) | `resource-handling` | – | – | – | Ja | | n59: ny i båda, kopplas till n101 |

## Datastrukturer (`data-structures/`, nav_order 70)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Generics | `generics` | ✔ | – | – | Nej | | n60: +J, före List |
| 20 | Arrays | `arrays` | ✔ | ✔ | – | Nej | | n61 |
| 30 | Array övningar | `array-exercises/index` | ✔ | ✔ | – | Nej | | n62: undermapp. C# +C# använd Javas tiolista som mall |
| 10 | &nbsp;&nbsp;Plocka ut en del av en array | `array-exercises/array-copy` | ✔ | ✔ | – | Nej | | n62 |
| 20 | &nbsp;&nbsp;Summera element i en array | `array-exercises/exercise-1` | ✔ | ✔ | – | Nej | | n62 |
| 30 | &nbsp;&nbsp;Hitta det största elementet i en array | `array-exercises/exercise-2` | ✔ | ✔ | – | Nej | | n62 |
| 40 | &nbsp;&nbsp;Invertera en array | `array-exercises/exercise-3` | ✔ | ✔ | – | Nej | | n62 |
| 40 | Tvådimensionella arrayer | `two-dimensional-arrays` | ✔ | – | – | Delvis | | n63: Java +J, kanske en gemensam sida (paritetsbeslut) |
| 50 | Tredimensionella arrayer | `three-dimensional-arrays` | ✔ | – | – | Delvis | | n63 |
| 60 | Jagged arrays | `jagged-arrays` | ✔ | – | – | Delvis | | n63 |
| 70 | List | `list` | ✔ | ↪ `data-structures/arraylist-and-list.md` | – | Ja | | n64: Java DELA i List-gränssnittet och ArrayList (F2-05) |
| 80 | ArrayList | `arraylist` | – | – | – | Ja | | n64: Java DELA ut. C# notis om gamla ArrayList |
| 90 | Dictionary / HashMap | `dictionary` | ✔ | ✔ | – | Ja | | n65 |
| 100 | Map | `map` | – | ✔ | – | Ja | | n65: Javas Map-gränssnitt. C# har IDictionary i interface-vs-konkret-typ |
| 110 | Gränssnitt mot konkret typ | `interface-vs-concrete-type` | ✔ | – | – | Nej | | n66: +J |
| 120 | Samlingsuttryck | `collection-expressions` | ✔ | – | – | Ja | | n67: Java List.of, Map.of |
| 130 | LINQ och Streams | `linq-streams` | ↪ `data-structures/linq.md` | – | – | Ja | | n68: MOTSV. Titeln får skilja (LINQ / Streams) |
| 140 | LinkedList | `linked-list` | ✔ | – | – | Nej | | n69: +J |
| 150 | HashSet | `hash-set` | ✔ | – | – | Nej | | n70: +J |
| 160 | Stack och Queue | `stack-queue` | ✔ | – | – | Delvis | | n71: Java Deque |
| 170 | Records | `records` | ↪ `oop/records.md` | ✔ | – | Nej | | n72: C# FLYTTA från OOP hit (F2-15) |
| 180 | Testa dig själv | `test-yourself` | ✔ | – | – | Nej | | n76: +J |

## Algoritmer (`algorithms/`, nav_order 75)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Sorteringsalgoritmer | `sorting-algorithms` | ✔ | – | – | Delvis | | n77: +J |
| 20 | Sökalgoritmer | `search-algorithms` | ↪ `data-structures/search-algorithms.md` | – | – | Nej | | n74: C# FLYTTA från Datastrukturer. +J |
| 30 | Grafer och BFS | `graphs` | ↪ `data-structures/graphs.md` | – | – | Nej | | n75: C# FLYTTA från Datastrukturer. +J |
| 40 | Dijkstras algoritm | `dijkstra` | ✔ | – | – | Nej | | n78: +J |
| 50 | Jaccard-similaritet | `jaccard-similarity` | ✔ | – | – | Nej | | n79: +J |
| 60 | Decision trees | `decision-trees` | ✔ | – | – | Nej | | n80: +J |

## Objektorienterad programmering (OOP) (`oop/`, nav_order 80)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | OOP, en kort historik | `history` | ✔ | – | – | Nej | | n81: +J, neutral |
| 20 | Klasser och objekt | `classes` | ✔ | ✔ | – | Nej | | n82: Java flyttar exemplet ur index |
| 30 | Konstruktorer | `constructors` | ↪ `oop/constructor.md` | – | – | Nej | | n83: +J |
| 40 | Konstruktoröverlagring | `constructor-overloading` | ✔ | – | – | Nej | | n83: +J |
| 50 | Properties och getters/setters | `properties` | ✔ | – | – | Ja | | n84: MOTSV. Titeln får skilja |
| 60 | Inkapsling | `encapsulation` | ✔ | ✔ | – | Nej | | n85 |
| 70 | ToString, equals, hashCode | `to-string` | ✔ | – | – | Delvis | | n86: +J |
| 80 | Arv | `inheritance` | ✔ | ✔ | – | Nej | | n87 |
| 90 | Polymorfism | `polymorphism/index` | ✔ | ✔ | – | Nej | | n88: undermapp |
| 10 | &nbsp;&nbsp;Polymorfism: grunderna | `polymorphism/basics` | ✔ | – | – | Delvis | | n88: Java har innehållet i index, flyttas hit |
| 20 | &nbsp;&nbsp;Abstrakta klasser | `polymorphism/abstract-classes/index` | ✔ | ✔ | – | Nej | | n89: undermapp, nytt mappnamn |
| 10 | &nbsp;&nbsp;&nbsp;&nbsp;Exempel | `polymorphism/abstract-classes/examples` | ✔ | ✔ | – | Nej | | n89 |
| 30 | &nbsp;&nbsp;Interfaces | `polymorphism/interfaces/index` | ✔ | ✔ | – | Delvis | | n90: undermapp |
| 10 | &nbsp;&nbsp;&nbsp;&nbsp;Plugins | `polymorphism/interfaces/plugins` | ✔ | ✔ | – | Nej | | n90 |
| 100 | Klasskomposition | `class-composition` | ✔ | ✔ | – | Nej | | n91 |
| 110 | Komposition över arv | `composition-over-inheritance` | ↪ `oop/composition-before-inheritance.md` | ↪ `oop/composition-before-inheritance.md` | – | Nej | | n92: nytt filnamn i båda |
| 120 | Åtkomstmoderator | `access-modifiers/index` | ✔ | ✔ | – | Ja | | n93: undermapp |
| 10 | &nbsp;&nbsp;Internal / package-private | `access-modifiers/package-level` | ↪ `oop/access-modifiers/internal.md` | – | – | Ja | | n93: titeln får skilja (Internal / Package-private) |
| 20 | &nbsp;&nbsp;Private | `access-modifiers/private` | ✔ | ✔ | – | Nej | | n93 |
| 30 | &nbsp;&nbsp;Protected | `access-modifiers/protected` | ✔ | ✔ | – | Nej | | n93 |
| 40 | &nbsp;&nbsp;Public | `access-modifiers/public` | ✔ | ✔ | – | Nej | | n93 |
| 130 | Statiska klasser och metoder | `static-classes-and-methods` | ↪ `oop/static-class.md` | ↪ `oop/access-modifiers/static.md` | – | Nej | | n94: FLYTTA ur Åtkomstmoderator i båda (C# static.md: slås ihop med denna, se F1-10) |
| 140 | Delegater / Funktionella gränssnitt | `delegates/index` | ✔ | ✔ | – | Ja | | n95: undermapp. Java ÄNDRA till Funktionella gränssnitt |
| 10 | &nbsp;&nbsp;Exempel | `delegates/examples` | ✔ | ✔ | – | Ja | | n95 |
| 20 | &nbsp;&nbsp;Övning: Textbehandling | `delegates/exercise-text-processing` | – | ↪ `oop/delegates/exercise-text.md` | – | Ja | | n95: +C# (paritet) |
| 150 | Events / Händelser | `events/index` | ✔ | ✔ | – | Delvis | | n96: undermapp |
| 10 | &nbsp;&nbsp;Exempel: Bankkonto | `events/examples` | ✔ | ✔ | – | Delvis | | n96 |
| 160 | Partial class | `partial-class` | ✔ | – | – | Ja | | n97: bara C# |
| 170 | POCO/POJO och DTO | `poco-dto` | ✔ | – | – | Ja | | n98: +J. Titeln får skilja |
| 180 | required och init | `required` | ✔ | – | – | Ja | | n99: bara C# |
| 190 | File-scoped types | `file-scoped-types` | ✔ | – | – | Ja | | n99: bara C# |
| 200 | Sealed | `sealed` | ✔ | – | – | Delvis | | n100: Java 17 |
| 210 | Destruktor och IDisposable | `destructor` | ✔ | – | – | Ja | | n101: MOTSV AutoCloseable. Titeln får skilja |
| 220 | Garbage Collector | `garbage-collector` | ✔ | – | – | Delvis | | n102: +J |
| 230 | Egna datatyper (operatorer) | `custom-types` | ✔ | – | – | Ja | | n103: bara C# |
| 240 | Attribut och Reflection / Annotations | `attributes-reflection` | ✔ | – | – | Ja | | n104: MOTSV. Titeln får skilja |
| 250 | Slutna hierarkier | `closed-hierarchies` | ✔ | – | – | Ja | | n105: bara C#. Java: sealed + records som motsvarighet |
| 260 | Union-typer | `union-types` | ✔ | – | – | Ja | | n105: C# 15 preview |
| 270 | Struct | `struct` | ✔ | ↪ `data-structures/struct.md` | – | Ja | | n73: Java ska tas bort eller ersättas (D6 ändrad: behåll, bestäm i F2-08). Flyttar från Datastrukturer till OOP |
| 280 | Class, struct eller record | `records-structs-classes` | ✔ | – | – | Delvis | | n106: Java 'class, record eller enum' |
| 290 | Testa dig själv | `test-yourself` | ✔ | – | – | Nej | | n107: +J |

## Designmönster (`design-patterns/`, nav_order 85)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Factory och Strategy | `factory-strategy` | ✔ | – | – | Nej | | n108: +J |
| 20 | Repository och Dependency Inversion | `repository-dependency-inversion` | ✔ | – | – | Nej | | n109: +J |
| 30 | UI-arkitektur | `ui-architecture/index` | ✔ | – | – | Delvis | | n110: undermapp, 7 sidor + index. Senare (D5) |
| 10 | &nbsp;&nbsp;MVC | `ui-architecture/mvc` | ✔ | – | – | Nej | | n110 |
| 20 | &nbsp;&nbsp;Webb-MVC och Razor Pages | `ui-architecture/web-mvc` | ✔ | – | – | Ja | | n110: MOTSV Spring MVC |
| 30 | &nbsp;&nbsp;MVP | `ui-architecture/mvp` | ✔ | – | – | Nej | | n110 |
| 40 | &nbsp;&nbsp;MVVM | `ui-architecture/mvvm` | ✔ | – | – | Nej | | n110 |
| 50 | &nbsp;&nbsp;Komponentarkitektur | `ui-architecture/components` | ✔ | – | – | Delvis | | n110 |
| 60 | &nbsp;&nbsp;Flux och Redux | `ui-architecture/flux-redux` | ✔ | – | – | Nej | | n110 |
| 70 | &nbsp;&nbsp;MVU | `ui-architecture/mvu` | ✔ | – | – | Nej | | n110 |
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
| 50 | Antipatterns | `anti-patterns` | ✔ | – | – | Nej | | n112: +J |

## Filhantering (`file-handling/`, nav_order 90)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Textfiler | `text-files` | ↪ `file-handling/text.md` | ↪ `file-handling/text.md` | – | Nej | | n116. Ny ordning föreslås: vanliga format först |
| 20 | CSV | `csv` | ✔ | ✔ | – | Nej | | n117 |
| 30 | JSON | `json` | ✔ | ✔ | – | Nej | | n118 |
| 40 | XML | `xml` | ✔ | ✔ | – | Nej | | n119 |
| 50 | Binära filer | `binary` | ✔ | – | – | Nej | | n114: Java har det i index, flyttas hit |
| 60 | Komprimering (GZip, Base64) | `compression` | ✔ | – | – | Delvis | | n115: Java har det i index, flyttas hit |
| 70 | File-klassen | `file-class` | ✔ | ✔ | – | Ja | | n120 |
| 80 | Directory-klassen | `directory-class` | ✔ | – | – | Ja | | n120 |
| 90 | FileInfo | `file-info` | ✔ | – | – | Ja | | n120 |
| 100 | Mappar | `folders` | ✔ | ✔ | – | Ja | | n120 |
| 110 | Path-klassen | `path-class` | ✔ | ✔ | – | Ja | | n120 |
| 120 | Files (NIO) | `files-nio` | – | – | – | Ja | | n120: Java-sida. C# saknar motsvarighet, behövs inte |
| 130 | ICS-filer (kalender) | `ics` | ✔ | – | – | Nej | | n121: +J. Verklig data |
| 140 | Edifact, grundform | `edifact-default` | – | ✔ | – | Nej | | n122: +C#. Verklig data |
| 150 | Edifact med XML | `edifact-xml` | – | ✔ | – | Nej | | n122: +C# |

## SQL (`sql/`, nav_order 100)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Varför databaser? | `why-databases` | ✔ | – | – | Nej | | n124: +J |
| 20 | SQL, grunder | `sql-intro` | ✔ | – | – | Nej | | n126: +J |
| 30 | Databastyper | `database-types` | ✔ | ↪ `sql/servers.md` | – | Nej | | n129: SLÅ till en jämförelse som täcker alla fyra (F2-07) |
| 40 | SQLite (H2 i Java) | `sqlite` | ✔ | – | – | Ja | | n125: Java H2 och SQLite via JDBC |
| 50 | DB Browser | `sqlite-browser` | ✔ | – | – | Ja | | n125 |
| 60 | Din första databas | `first-database` | ✔ | ✔ | – | Nej | | n128 |
| 70 | Databaser | `database` | ✔ | ✔ | – | Nej | | n128 |
| 80 | Tabeller | `tables` | ✔ | ✔ | – | Nej | | n128 |
| 90 | Constraints | `constraints` | ✔ | ✔ | – | Nej | | n128 |
| 100 | SQL-kommandon | `commands/index` | ✔ | ✔ | – | Nej | | n127: undermapp |
| 10 | &nbsp;&nbsp;Övningsdata | `commands/exercise-data` | ✔ | ✔ | – | Nej | | n127 |
| 20 | &nbsp;&nbsp;SELECT | `commands/select` | ✔ | ✔ | – | Nej | | n127 |
| 30 | &nbsp;&nbsp;WHERE | `commands/where` | ✔ | ✔ | – | Nej | | n127 |
| 40 | &nbsp;&nbsp;ORDER BY | `commands/order-by` | ✔ | ✔ | – | Nej | | n127 |
| 50 | &nbsp;&nbsp;Aggregatfunktioner | `commands/aggregates` | ✔ | ✔ | – | Nej | | n127 |
| 60 | &nbsp;&nbsp;GROUP BY | `commands/group-by` | ✔ | ✔ | – | Nej | | n127 |
| 70 | &nbsp;&nbsp;JOIN | `commands/join` | ✔ | ✔ | – | Nej | | n127 |
| 80 | &nbsp;&nbsp;Subquery | `commands/subquery` | ✔ | ✔ | – | Nej | | n127 |
| 90 | &nbsp;&nbsp;COALESCE | `commands/coalesce` | ✔ | ✔ | – | Nej | | n127 |
| 100 | &nbsp;&nbsp;INSERT | `commands/insert` | ✔ | ✔ | – | Nej | | n127 |
| 110 | &nbsp;&nbsp;UPDATE | `commands/update` | ✔ | ✔ | – | Nej | | n127 |
| 120 | &nbsp;&nbsp;DELETE | `commands/delete` | ✔ | ✔ | – | Nej | | n127 |
| 130 | &nbsp;&nbsp;Från tabell till klass | `commands/tables-and-classes` | ✔ | ✔ | – | Delvis | | n127 |
| 140 | &nbsp;&nbsp;SQL som kod | `commands/sql-as-code` | ↪ `sql/commands/sql-as-csharp.md` | ↪ `sql/commands/sql-as-java.md` | – | Ja | | n127: nytt neutralt filnamn, titeln får skilja |
| 110 | Rita databasen med dbdiagram.io | `dbdiagram` | ✔ | ✔ | – | Nej | | n128 |
| 120 | Normalisering | `normalization` | ✔ | – | – | Nej | | n132: +J |
| 130 | Transaktioner och ACID | `transactions` | ✔ | – | – | Delvis | | n130: +J (JDBC) |
| 140 | SQL injection | `sql-injection` | ✔ | – | – | Delvis | | n133: +J (PreparedStatement) |
| 150 | SQLite i kod | `sqlite-in-code` | ↪ `sql/sqlite-in-csharp.md` | – | – | Ja | | n125: neutralt filnamn, MOTSV H2/JDBC |
| 160 | SQLite-handler | `sqlite-handler` | ✔ | – | – | Ja | | n125: MOTSV |
| 170 | SQL från kod: en rymdmanga | `sql-from-code-space-manga` | ↪ `sql/sql-from-csharp-space-manga.md` | – | – | Ja | | neutralt filnamn. MOTSV |
| 180 | Lastmanifestet | `load-manifest` | ↪ `sql/sqlite-load-manifest.md` | – | – | Ja | | neutralt filnamn. MOTSV |
| 190 | CRUD-kodexempel | `crud-code-examples` | ✔ | – | – | Ja | | MOTSV |
| 200 | Databasbibliotek (NuGet / Maven) | `database-libraries` | ↪ `sql/nuget-packages.md` | – | – | Ja | | MOTSV: NuGet ↔ Maven. Titeln får skilja |
| 210 | appsettings och connection strings | `configuration` | ↪ `sql/appsettings.md` | – | – | Ja | | MOTSV: neutralt filnamn |
| 220 | Docker-kommandon | `docker-commands` | ✔ | – | – | Nej | | +J |
| 230 | MySQL med Docker | `mysql-docker` | ✔ | – | – | Nej | | +J |
| 240 | Ordförklaringar | `terminology` | ✔ | – | – | Nej | | +J |
| 250 | Dataformat: JSON, XML, CSV, BSON | `format-comparison` | ✔ | – | – | Nej | | +J |

## ORM (Entity Framework / JPA) (`orm/`, nav_order 110)

n134: kapitelindex = ORM-översikt. Java är en stub idag. Titeln skiljer, mappen heter orm (D1)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Kontext (DbContext / EntityManager) | `context/index` | ✔ | – | – | Ja | | n135: undermapp. Titeln skiljer |
| 10 | &nbsp;&nbsp;DbContext-livscykeln | `context/lifecycle` | ✔ | – | – | Ja | | n135 |
| 20 | &nbsp;&nbsp;Konfigurera DbContext | `context/configuration` | ✔ | – | – | Ja | | n135 |
| 20 | Entiteter | `entities` | ✔ | – | – | Ja | | n136 |
| 30 | Relationer | `relationships` | ✔ | – | – | Ja | | n136 |
| 40 | Frågor mot ORM | `queries` | ↪ `orm/linq-queries.md` | – | – | Ja | | n136: neutralt filnamn |
| 50 | Migrationer | `migrations` | ✔ | – | – | Ja | | n136: Java Flyway/Liquibase |
| 60 | Seeding | `seeding` | ✔ | – | – | Ja | | n136 |
| 70 | Prestanda | `performance` | ✔ | – | – | Ja | | n136 |
| 80 | Övning: Code-First dagbok | `exercise-code-first` | ↪ `orm/examples.md` | – | – | Ja | | n137 |

## Testa din kod (`testing/`, nav_order 115)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | TDD | `tdd` | ✔ | ✔ | – | Delvis | | n138: Java flyttar index-innehåll |
| 20 | Röd, Grön, Blå | `red-green-blue` | – | ✔ | – | Nej | | n139: +C#. Nytt filnamn |
| 30 | Budgetexempel | `budget-example` | – | ✔ | – | Delvis | | n140: +C# |
| 40 | Stringhelper | `string-helper` | – | ✔ | – | Delvis | | n140: +C# |
| 50 | Fler exempel | `more-examples` | – | ✔ | – | Delvis | | n140: +C#. Nytt filnamn |
| 60 | Kodgranskning | `code-review` | ✔ | – | – | Nej | | n141: +J. Nytt filnamn |

## APIer (`api/`, nav_order 120)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | REST | `rest` | ✔ | – | – | Nej | | n142: +J |
| 20 | GraphQL | `graphql` | ✔ | – | – | Nej | | n143: +J |
| 30 | SOAP | `soap` | ✔ | – | – | Nej | | n143: +J |
| 40 | Endpoints | `endpoints` | ✔ | – | – | Delvis | | n144: +J |
| 50 | CORS | `cors` | ✔ | – | – | Delvis | | n144: +J |
| 60 | MVC och API | `mvc-and-api` | ↪ `api/api-mvc.md` | – | – | Ja | | n145: MOTSV |
| 70 | Microservices | `microservices` | ✔ | ↪ `api/microservices.md` + `api/api-and-microservices.md` | – | Nej | | n146: Java SLÅ två sidor (F2-06) |
| 80 | OpenAPI och Scalar | `scalar` | ✔ | – | – | Ja | | n147: MOTSV springdoc |
| 90 | Swagger | `swagger` | ✔ | – | – | Ja | | n147 |
| 100 | FTP och SFTP | `ftp/index` | – | ✔ | – | Nej | | n148: +C#, undermapp |
| 10 | &nbsp;&nbsp;FTP, grunder | `ftp/ftp-basics` | – | ↪ `api/ftp/ftp-file-handling.md` | – | Nej | | n148: nytt filnamn |
| 20 | &nbsp;&nbsp;FTP i kod | `ftp/ftp-in-code` | – | ↪ `api/ftp/ftp-file-handling-java.md` | – | Ja | | n148: nytt neutralt filnamn, titeln skiljer. +C# (FluentFTP) |
| 30 | &nbsp;&nbsp;SFTP i kod | `ftp/sftp-in-code` | – | ↪ `api/ftp/sftp-file-handling-java.md` | – | Ja | | n148: +C# (SSH.NET) |
| 110 | Testa dig själv | `test-yourself` | ✔ | – | – | Nej | | n149: +J |

## Grafiska gränssnitt (GUI) (`gui/`, nav_order 125)

Mappen skrivbordsprogram är nytt namn (D1). Java är en stub

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Skrivbordsprogram (Windows Forms / JavaFX) | `desktop/index` | ✔ | – | – | Ja | | n150: undermapp. Java Swing eller JavaFX. Senare (D5) |
| 10 | &nbsp;&nbsp;Kontroller | `desktop/controls` | ✔ | – | – | Ja | | n150 |
| 20 | &nbsp;&nbsp;Layout | `desktop/layout` | ✔ | – | – | Ja | | n150 |
| 30 | &nbsp;&nbsp;Events i Windows Forms | `desktop/events` | ✔ | – | – | Ja | | n150 |
| 40 | &nbsp;&nbsp;OOP i Windows Forms | `desktop/oop-in-gui` | ↪ `gui/desktop/oop-in-winforms.md` | – | – | Ja | | n150: neutralt filnamn |

## Webb (ASP.NET Core / Spring Boot) (`web/`, nav_order 130)

Mappen webb är nytt namn (D1). Java är en stub

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Webbapp, intro och Hangman | `hangman-web-app` | ↪ `web/core-app.md` | – | – | Ja | | n151: MOTSV Spring Boot. Senare (D5) |
| 20 | Dependency Injection | `dependency-injection` | ✔ | – | – | Ja | | n153: MOTSV Spring. Se n109 |
| 30 | Cookies | `cookies/index` | ✔ | – | – | Delvis | | n152: undermapp |
| 10 | &nbsp;&nbsp;Skapa | `cookies/create` | ✔ | – | – | Delvis | | n152 |
| 20 | &nbsp;&nbsp;Radera | `cookies/delete` | ✔ | – | – | Delvis | | n152 |
| 30 | &nbsp;&nbsp;Olika typer av cookies | `cookies/cookie-types` | ✔ | – | – | Nej | | n152: neutralt, +J |
| 40 | &nbsp;&nbsp;Session | `cookies/session` | ✔ | – | – | Delvis | | n152: neutralt, +J |
| 50 | &nbsp;&nbsp;TempData | `cookies/temp-data` | ✔ | – | – | Ja | | n152: bara ASP.NET |
| 60 | &nbsp;&nbsp;ViewBag | `cookies/view-bag` | ✔ | – | – | Ja | | n152: bara ASP.NET |
| 40 | Blazor | `blazor/index` | ✔ | – | – | Ja | | n154: bara C# |
| 10 | &nbsp;&nbsp;Databindning | `blazor/data-binding` | ✔ | – | – | Ja | | n154 |
| 20 | &nbsp;&nbsp;Events i Blazor | `blazor/events` | ✔ | – | – | Ja | | n154 |
| 30 | &nbsp;&nbsp;Villkor och listor | `blazor/conditions-and-lists` | ✔ | – | – | Ja | | n154 |
| 40 | &nbsp;&nbsp;Komponenter | `blazor/components` | ✔ | – | – | Ja | | n154 |
| 50 | &nbsp;&nbsp;Hosting-modeller | `blazor/hosting-models` | ✔ | – | – | Ja | | n154 |

## Asynkron (`async/`, nav_order 140)

n155: intro finns i båda kapitelindexen

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Exempel | `examples` | ✔ | ✔ | – | Ja | | n155 |
| 20 | Lock och trådsäkerhet | `lock` | ✔ | – | – | Ja | | n156: MOTSV synchronized, ReentrantLock |
| 30 | Threading och TPL | `threading` | ↪ `async/threading-tpl.md` | – | – | Ja | | n157: neutralt filnamn. MOTSV ExecutorService, virtuella trådar |
| 40 | Asynkron validering | `validation` | ✔ | – | – | Ja | | n158: bara C# |

## AI (`ai/`, nav_order 150)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Domänkunskap och AI | `domain-knowledge` | ↪ `ai/domain-knowledge.md` | – | – | Nej | | n159: +J, kopiera eller dela källa |
| 20 | AI-modeller | `models/index` | ✔ | – | – | Nej | | n159: undermapp |
| 10 | &nbsp;&nbsp;Claude | `models/claude` | ✔ | – | – | Nej | | n159 |
| 20 | &nbsp;&nbsp;ChatGPT | `models/chatgpt` | ✔ | – | – | Nej | | n159 |
| 30 | &nbsp;&nbsp;Claude Code | `models/claude-code` | ✔ | – | – | Nej | | n159 |
| 40 | &nbsp;&nbsp;Gemini | `models/gemini` | ✔ | – | – | Nej | | n159 |
| 50 | &nbsp;&nbsp;GitHub Copilot | `models/copilot` | ✔ | – | – | Nej | | n159 |
| 60 | &nbsp;&nbsp;Codex och kodnings-AI | `models/codex` | ✔ | – | – | Nej | | n159 |
| 30 | Prompting | `prompting/index` | ✔ | – | – | Nej | | n159: undermapp |
| 10 | &nbsp;&nbsp;Promptens grunder | `prompting/basics` | ✔ | – | – | Nej | | n159 |
| 20 | &nbsp;&nbsp;Promptingtekniker | `prompting/techniques` | ✔ | – | – | Nej | | n159 |
| 40 | AI-API | `ai-api/index` | ✔ | – | – | Ja | | n160: undermapp. MOTSV Java SDK |
| 10 | &nbsp;&nbsp;Anthropic API (Claude) | `ai-api/anthropic` | ✔ | – | – | Ja | | n160 |
| 20 | &nbsp;&nbsp;OpenAI API (ChatGPT) | `ai-api/openai` | ✔ | – | – | Ja | | n160 |
| 50 | AI-exempel | `examples/index` | ✔ | – | – | Ja | | n160: undermapp |
| 10 | &nbsp;&nbsp;Chatbot | `examples/chatbot` | ✔ | – | – | Ja | | n160 |
| 20 | &nbsp;&nbsp;AI-coder | `examples/coder` | ✔ | – | – | Ja | | n160 |
| 30 | &nbsp;&nbsp;Decision helper | `examples/decision` | ✔ | – | – | Ja | | n160 |

## Verktyg (`tools/`, nav_order 970)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Installation | `installation/index` | ✔ | – | – | Ja | | n161: undermapp |
| 10 | &nbsp;&nbsp;Installera Git | `installation/git` | ✔ | – | – | Nej | | n161 |
| 20 | &nbsp;&nbsp;Rider | `installation/rider` | ✔ | – | – | Ja | | n161: Java IntelliJ |
| 30 | &nbsp;&nbsp;Visual Studio | `installation/visual-studio` | ✔ | – | – | Ja | | n161 |
| 40 | &nbsp;&nbsp;VS Code | `installation/vscode` | ✔ | – | – | Delvis | | n161: +J |
| 50 | &nbsp;&nbsp;IntelliJ | `installation/intellij` | – | – | – | Ja | | n161: Java-sida, saknar C#-motsvarighet i listan |
| 60 | &nbsp;&nbsp;JDK och Maven | `installation/jdk-and-maven` | – | – | – | Ja | | n161: Java-sida |
| 20 | Git | `git/index` | ✔ | – | – | Nej | | n162: undermapp. Länka till git-bok |
| 10 | &nbsp;&nbsp;Git, grunder | `git/git-basics` | ✔ | – | – | Nej | | n162: +J |
| 20 | &nbsp;&nbsp;Git, konflikter | `git/git-conflicts` | ✔ | – | – | Nej | | n162: +J |
| 30 | &nbsp;&nbsp;GitHub Actions | `git/github-actions` | ✔ | ↪ `github/index.md` | – | Delvis | | n163: Java flyttar hit från github/ |
| 40 | &nbsp;&nbsp;GitHub Actions, exempel | `git/github-actions-example/index` | – | ↪ `github/code/index.md` | – | Delvis | | n163: +C# portera exemplen |
| 10 | &nbsp;&nbsp;&nbsp;&nbsp;Contribution Statistics | `git/github-actions-example/commits` | – | ↪ `github/code/commits.md` | – | Delvis | | n163 |
| 20 | &nbsp;&nbsp;&nbsp;&nbsp;Commit historik | `git/github-actions-example/history` | – | ↪ `github/code/history.md` | – | Delvis | | n163 |
| 50 | &nbsp;&nbsp;Testa dig själv (Git) | `git/test-yourself` | ✔ | – | – | Nej | | n162: +J |
| 30 | Webbtjänster | `web-services/index` | ✔ | – | – | Nej | | n164: undermapp, nytt filnamn-stavning (webbtjanster) |
| 10 | &nbsp;&nbsp;Anteckningsverktyg | `web-services/notes` | ✔ | – | – | Nej | | n164 |
| 20 | &nbsp;&nbsp;Miro | `web-services/miro` | ✔ | – | – | Nej | | n164 |
| 30 | &nbsp;&nbsp;Goblin Tools | `web-services/goblin-tools` | ✔ | – | – | Nej | | n164 |
| 40 | &nbsp;&nbsp;Kommunikation | `web-services/communication` | ✔ | – | – | Nej | | n164 |
| 40 | Testa dig själv (Verktyg) | `test-yourself` | ✔ | – | – | Nej | | n164 |

## Övrigt (`misc/`, nav_order 980)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Konsol-I/O | `console-io` | ↪ `misc/console.md` | – | – | Ja | | n165: MOTSV Scanner |
| 20 | Planera innan du kodar | `planning` | ✔ | – | – | Nej | | n167: +J |
| 30 | 10 tips för juniorer | `junior-tips` | ✔ | – | – | Nej | | n168: +J |
| 40 | Funktionell programmering | `functional-programming` | ✔ | ✔ | – | Delvis | | n166: båda finns. Kopplas till n68 |
| 50 | Funktionell kodning | `functional-coding` | ↪ `misc/oneliner.md` | – | – | Delvis | | n166: överväg SLÅ med föregående (F2-17) |
| 60 | Console.Beep | `console-sound` | ✔ | – | – | Ja | | n169: bara C# |
| 70 | allows ref struct | `allows-ref-struct` | ✔ | – | – | Ja | | n169: bara C# |
| 80 | Inline arrays | `inline-arrays` | ✔ | – | – | Ja | | n169: bara C# |
| 90 | Generisk matematik | `generic-math` | ✔ | – | – | Ja | | n169: bara C# |
| 100 | UTF-8 string literals | `utf8-strings` | ✔ | – | – | Ja | | n169: bara C# |

## Ordlista (`glossary/`, nav_order 985)

| Nr | Sidtitel | Slug | C# | Java | Python | Språkspecifik | Paritet | Åtgärd |
|---|---|---|---|---|---|---|---|---|
| – | Kapitelindex | `index` | ✔ | ✔ | – | Nej | | Kapitelindex är navigation (n7, n113) |
| 10 | Git | `git` | ✔ | ✔ | – | Nej | | n170 |
| 20 | Programmering | `programming` | ✔ | ✔ | – | Nej | | n170 |
| 30 | Programmeringsspråk | `programming-languages` | ✔ | ✔ | – | Nej | | n170 |
| 40 | Datatyper | `data-types` | ✔ | – | – | Delvis | | n171: +J |
| 50 | Kontrollstruktur | `control-structures` | ✔ | – | – | Delvis | | n171: +J |
| 60 | Samlingar | `collections` | ✔ | – | – | Delvis | | n171: +J |
| 70 | Strängar | `strings` | ✔ | – | – | Delvis | | n171: +J |
| 80 | Operatorer | `operators` | ✔ | – | – | Delvis | | n171: +J |
| 90 | Metodik | `methodology` | ✔ | – | – | Delvis | | n171: +J |
| 100 | Webb | `web` | ✔ | ✔ | – | Nej | | n170 |
| 110 | Yrken | `professions` | ✔ | ✔ | – | Nej | | n170 |

## Rotsidor (utanför kapitlen)

| Sidtitel | Slug | C# | Java | Python | Åtgärd |
|---|---|---|---|---|---|
| Startsida | `index` | ✔ | ✔ | – | Bokens förstasida. Listar kapitlen i samma ordning |
| Om sidan | `about` | ✔ | – | – | n6: +J, liten sida |
| Andra e-böcker av Marcus | `other-books` | ✔ | ✔ | – |  |
| Licens | `license` | ✔ | ✔ | – |  |

## Tas bort eller slås ihop

| Sida | Bok | Vad händer |
|---|---|---|
| `oop/access-modifiers/static.md` (Static) | C# | Slås ihop med `oop/static-class.md` till `static-classes-and-methods` (n94, F1-10). Static hör inte hemma under Åtkomstmoderator |
| `variables/strings/choice-format.md` | Java | Tas bort, platshållare på en rad (n20, F2-08, D6) |
| `sql/erd.md` | C# | Slås ihop med `diagrams/er-diagram.md` (n39 och n131, F2-16). SQL-kapitlet länkar till Diagram |
| `loops/loop-control.md`, `variables/double.md` m.fl. | Java | Delas eller slås ihop enligt raderna ovan (F2-03, F2-04) |

## Beslut kvar (Marcus)

Det här är det jag vill att du tittar på. Allt annat följer av tidigare beslut.

1. **Filhantering, ordning.** C#-ordningen är alfabetisk (Binär, CSV, Directory, FileInfo, File...). Jag föreslår: Textfiler, CSV, JSON, XML, Binära filer, Komprimering, fil-API:erna (File, Directory, FileInfo, Mappar, Path), Files (NIO), ICS, Edifact. Det är en pedagogisk ändring i C#-boken.
2. **Struct** flyttar från Datastrukturer (Java) till OOP, som C# redan har det (n73). Java-sidan behålls tills F2-08 (D6 ändrad).
3. **Records** flyttar från OOP till Datastrukturer i C# (n72, som i Java).
4. **Sökalgoritmer och Grafer** flyttar från Datastrukturer till Algoritmer i C# (n74, n75).
5. **ER-diagram** får en enda sida, i Diagram (n39 och n131). SQL-kapitlet länkar dit.
6. **Variabler, ordning.** Java har en sida per typ, C# har samlingssidor. Jag har lagt både Heltal (översikt) och Integer, Long, Byte/Short (djup) i listan, och på samma sätt Decimaltal, double/float och decimal/BigDecimal. C# får alltså fler sidor (F2-13) och Java färre (F2-03).
7. **Flerdimensionella arrayer.** C# har tre sidor (2D, 3D, jagged). n63 föreslog en sida i Java. Jag har behållit tre rader. Vill du ha en gemensam sida i Java är det ett paritetsbeslut i fas 3.
8. **GUI-mappen** `desktop` och **kapitlen** `orm` och `web` är nya namn (D1). **Gjort 2026-10-20:** C#-URL:erna har bytt namn (`/gui/windows-forms/` → `/gui/desktop/`, `/entityframework/` → `/orm/`, `/aspnetcore/` → `/web/`) och C# har en `site/redirects.json`.
9. **Engelska namn (beslutat 2026-10-20).** `Omsidan` → `about`, alla filnamn med versaler eller svenska ord är översatta, i båda böckerna och även bildfilerna. Alla gamla URL:er redirectar.
10. **D4** (samma titel på gemensamma sidor): gäller som regel 2 ovan, tills du säger annat.

## Sammanfattning

| | Antal sidor i masterindexet |
|---|---|
| Finns i båda böckerna | 80 |
| Finns bara i C# | 239 |
| Finns bara i Java | 32 |
| Saknas i båda (nya) | 5 |

*(Räknat på sidor utom kapitelindex och rotsidor.)*
