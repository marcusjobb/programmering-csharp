# Backlog: C#-boken, Java-boken (och sen Python-boken) med samma struktur

Underlag: `normalisering.md` (id-nummer som "n17" hänvisar dit). Strukturkarta tagen 2026-10-15 från `programmering-csharp/docs` och `programmering-java/docs`.

## Arbetsregler

1. **En punkt i taget, i ordning.** Nästa punkt påbörjas först när den förra är klar, incheckad och bockad här.
2. **Ordningen före innehållet.** Först ska kapitel och sidor ligga i samma ordning i båda böckerna (fas 1). Innehåll kommer sist (fas 3 och framåt).
   **Målet är att böckerna är lika bra**, inte bara lika långa: ett bra exempel, en bra övning eller en bra förklaring i den ena ska finnas i den andra, åt båda håll (fas 3B).
3. **Ingen import mellan böckerna än.** Fas 1 flyttar, döper om och numrerar om sidor som redan finns. Inga texter kopieras från den ena boken till den andra.
4. **Klart betyder** för varje punkt: `npm run check:links` och bygget går igenom i båda repona, och en commit per bok med en tydlig beskrivning. Bocka sedan punkten här.
5. **Varje flytt eller namnbyte ändrar en URL.** Notera det i commit-meddelandet, och lägg en redirect i `redirects.json` (D3 beslutat: ja).
6. **Python-boken senare:** masterindexet (F1-00) får en Pythonkolumn från början, så att Python bara ansluter till en färdig struktur.

## Beslut som behövs (Marcus)

Rekommendationen är redan inräknad i punkterna nedan, men de är inte bekräftade. Punkter som beror på ett obekräftat beslut är märkta 🔶. D1–D3 är beslutade 2026-10-15.

| Id | Fråga | Rekommendation |
|---|---|---|
| D1 | ✅ **Beslutat: ja, mapparna döps likadant om möjligt.** Samma mappnamn (slug) i alla böcker, även för språkspecifika kapitel (`entityframework`, `aspnetcore`) | Neutrala namn: `orm` och `webb`. Titeln får vara språkspecifik ("Entity Framework" / "JPA och Spring Data"). En Java-mapp som heter `entityframework` är fel redan idag |
| D2 | ✅ **Beslutat: nej, inga stubbar.** Saknade sidor finns bara i masterindexet | Bara i masterindexet, tills sidan faktiskt är skriven. Stubbar gör boken sämre för läsaren (jämför Choiceformat på två rader). Sidomenyn blir ändå likadan när fas 3 är klar |
| D3 | ✅ **Beslutat: ja.** Redirects när Javabokens URL:er byter namn (`java`→`grunder`, `loop`→`loopar` m.fl.) | Ja, om boken redan har läsare. Astro stöder `redirects` i `astro.config.mjs` |
| D4 | Samma sidtitel och mappnamn på alla gemensamma sidor, med språkspecifik skillnad i beskrivningen? | Ja. Det är det som gör att man kan länka direkt mellan böckerna |
| D5 | Ramverkskapitlen (GUI, ASP.NET/Spring, ORM) i fas 4: nu eller senare? | Senare. De är stora och ska inte hålla upp språkets kärna |
| D6 | n73 (Struct i Java), n20 (Choiceformat), n123 (fler verkliga data) | Ändrad rekommendation efter att sidorna lästs: n73 behåll och bestäm i fas 2 (egen sida eller ihopslagen med n106), n20 ta bort (platshållare på en rad), n123 parkera. Väntar på bekräftelse |
| D7 | Hur porteras en sida eller ett exempel i fas 3 (först när fas 1–2 är klara)? | Skriv varje sida för språket med den andra bokens sida som mall, inte som kopia. Beslutas först när vi kommer dit |

---

## Fas 0: Förberedelser (ingen strukturändring)

- [x] **F0-01** Dubblettitlar i C#. *Klar 2026-10-15, ej incheckad.* Sidomenyn kopplar barn via titel, så bara titlar som har barn gav fel träd. Ändrat: `verktyg/installation/Gitinstallation.md` → "Installera Git", `gui/windows-forms/events.md` → "Events i Windows Forms", `aspnetcore/blazor/events.md` → "Events i Blazor". Verifierat: `check:links` 0 trasiga, bygge 350 sidor, Bankkonto-exemplet och Git-barnen ligger nu bara under rätt sida. **ER-diagram-dubbletten rörs inte här**: ingen av sidorna har barn, så det är ingen menybugg, och den löses i F2-16. Exempel, Testa dig själv och Datatyper är bladsidor och harmlösa. *(Källa 3 i "Saker jag hittade" var alltså överdriven.)*
- [x] **F0-02** Java: `aualityassurance` → `testa-din-kod`. *Klar 2026-10-15, incheckad i programmering-java.* Inga andra sidor länkade dit. Gamla sex URL:er redirectar. Redirects ligger i `programmering-java/site/redirects.json` (läses av `astro.config.mjs`) och **ska fyllas på vid varje namnbyte i fas 1** (nyckel = gammal sökväg utan base, värde = ny fullständig sökväg med base). Verifierat: `check:links` 0 trasiga, bygge 143 sidor, redirect-HTML finns på de gamla adresserna.
- [x] **F0-03** Jämför sidomenyerna. *Klar 2026-10-15, ingen ändring behövdes.* `Sidebar.astro`, `SubpageTree.astro` och `[...slug].astro` är identiska i logiken (bara rotnamnet "C# bok" mot "Java" och kommentarer skiljer). Båda sorterar på `nav_order` (99 om den saknas) och kopplar via `parent`-titel. Två följder för fas 1:
  - **Unika `nav_order` bland syskon.** Vid lika nummer styr filsystemets ordning, så masterindexet ger varje syskon ett eget nummer (steg om 10).
  - **Sluggregel (gäller från F1-00).** Mapp- och filnamn är `kebab-case`, gemener, ASCII (å/ä → a, ö → o), utan blanksteg och understreck. 32 C#-filer bryter mot det idag (`Binar.md`, `CSV.md`, `Foreach.md`, `stränghantering.md`, `arrayCopy.md`, hela `ordlista/` m.fl.) och en i Java (`java/Java.md`). De döps om i respektive kapitelpunkt i fas 1, med redirect i `redirects.json`. Se till att C# också får en `redirects.json` (görs första gången en C#-sida byter URL).

## Fas 1: Struktur och ordning (bara index, ingen import)

Målet är att kapitel och sidor ligger i samma ordning, med samma mappnamn, filnamn och titlar, i båda böckerna. En punkt per kapitel, i bokens ordning.

- [ ] **F1-00** **Masterindexet.** Skapa `planering/struktur.md`: en tabell per kapitel med alla sidor i beslutad ordning, med kolumnerna *Sidtitel, Slug, C#, Java, Python, Språkspecifik, Paritet* (finns / saknas / stub / "–"). *Paritet* är tom i fas 1 och fylls i vid F3B-00. Ta här beslut om vilket kapitel varje sida hör hemma i (n72, n74, n75, n94 och Java-sidan `github/`). Alla senare punkter bygger på detta, så Marcus godkänner indexet innan F1-01. 🔶 D4
- [ ] **F1-01** Kapitelnivån. Samma mappnamn och `nav_order` för kapitlen i båda böckerna. Skillnader idag: `java/`→`grunder/`, `variables/`→`variabler/`, `loop/`→`loopar/`, `datastructures/`→`datastrukturer/`, `entityframework/` och `aspnetcore/`→ neutrala namn (D1 beslutat). Bokens förstasida (`index.md`) listar kapitlen i samma ordning.

Kapitelordningen (redan lika i båda böckerna) är: Grunder 15, Variabler 20, If 30, Diagram 40, Loopar 50, Metoder 60, Undantagshantering 62, Datastrukturer 70, Algoritmer 75, OOP 80, Designmönster 85, Filhantering 90, SQL 100, ORM 110, Testa din kod 115, APIer 120, GUI 125, Webb 130, Asynkron 140, AI 150, Verktyg 970, Övrigt 980, Ordlista 985, Andra e-böcker 990, Licens 999.

Per kapitel gäller samma sak: sidorna som redan finns får samma ordning, filnamn och titel enligt masterindexet i båda böckerna. Saknade sidor lämnas som "saknas" i masterindexet, och inga stubbar skapas (D2).

- [ ] **F1-02** Grunder (n1–6; Java har bara en sida, `Java.md`, som får bli n3)
- [ ] **F1-03** Variabler (n7–31; störst skillnad: Java har en sida per typ, C# har samlingssidor)
- [ ] **F1-04** If (n32–36) och Diagram (n37–40). ER-diagrammets hemvist beslutas i F1-00 (n39 mot n131)
- [ ] **F1-05** Loopar (n41–47)
- [ ] **F1-06** Metoder (n48–56)
- [ ] **F1-07** Undantagshantering (n57–59)
- [ ] **F1-08** Datastrukturer (n60–76). Här flyttar Records (n72) in och Sökalgoritmer/Grafer (n74, n75) ut till Algoritmer
- [ ] **F1-09** Algoritmer (n77–80)
- [ ] **F1-10** OOP (n81–107). Det största kapitlet, så dela i två commits: sidor på nivå 1, sedan underkapitlen (Åtkomstmoderator, Polymorfism, Delegater, Events). Static flyttas ut ur Åtkomstmoderator (n94)
- [ ] **F1-11** Designmönster (n108–112)
- [ ] **F1-12** Filhantering (n113–123)
- [ ] **F1-13** SQL (n124–133). Java har `sql/kommandon` redan likt C#. Resten ordnas efter masterindexet, och ER-diagram-dubbletten löses
- [ ] **F1-14** ORM (n134–137)
- [ ] **F1-15** Testa din kod (n138–141)
- [ ] **F1-16** APIer (n142–149)
- [ ] **F1-17** GUI (n150)
- [ ] **F1-18** Webb: ASP.NET Core / Spring (n151–154)
- [ ] **F1-19** Asynkron (n155–158)
- [ ] **F1-20** AI (n159–160)
- [ ] **F1-21** Verktyg: Installation, Git, GitHub Actions, Webbtjänster, Testa dig själv (n161–164). Javas `github/` flyttas in under Verktyg
- [ ] **F1-22** Övrigt (n165–169)
- [ ] **F1-23** Ordlista (n170–171) samt rotsidorna Om sidan, Andra e-böcker och Licens
- [ ] **F1-24** **Slutkontroll av fas 1.** Ett skript jämför mappar, slugs, titlar och `nav_order` i båda böckerna mot masterindexet och listar alla avvikelser. Skriptet dokumenteras och kan återanvändas för Python-boken

## Fas 2: Städa sidstruktur i varje bok (SLÅ, DELA, FLYTTA)

Fortfarande ingen import. Det här är jobb inom en enda bok, så att sidlistan i båda blir densamma. En punkt per åtgärd.

**Java**
- [ ] **F2-01** Index som bara ska vara navigation: flytta innehållet till egna sidor. `variables/index` (n7), `oop/index` (n82), `filhantering/index` med 468 rader (n113–115) och `aualityassurance/index` (n138). *Dela upp i fyra delpunkter, en per index.*
- [ ] **F2-02** Slå ihop Else och Else if till "if / else" (n32)
- [ ] **F2-03** Decimaltal: slå ihop Float, Double, Float Double Decimal till "Decimaltal", "double och float", "BigDecimal" (n12)
- [ ] **F2-04** Dela Loop kontroller i Break/Continue och Namngivna loopar (n46)
- [ ] **F2-05** Dela Arraylists och Listor i `List` och `ArrayList` (n64). Gör Map och HashMap till två tydliga sidor (n65)
- [ ] **F2-06** Slå ihop Microservices och Api och Microservices (n146)
- [ ] **F2-07** Databastyper: en jämförelse som täcker alla fyra (n129; gäller båda böckerna, görs i Java först och speglas i C# i F2-14) 🔶
- [ ] **F2-08** Ta bort Choiceformat (n20, platshållare) och bestäm Structs framtid (n73: behåll som egen sida eller slå ihop med "class, record eller enum", n106) 🔶 D6
- [ ] **F2-09** Flytta Static ur Åtkomstmoderator till egen sida (n94)
- [ ] **F2-10** Flytta Delegater till "Funktionella gränssnitt" (n95, bara titel och placering. Texten skrivs om i fas 3)
- [ ] **F2-11** Kör slutkontrollen från F1-24 igen för Java, efter F2-01–F2-10

**C#**
- [ ] **F2-12** Dela Loopar-grunderna i for, while och do-while (n41)
- [ ] **F2-13** Dela Heltal: `long` och `byte/short` ut till egna sidor (n11)
- [ ] **F2-14** Slå ihop eller tydliggör Datatyper och Typer (n8). Spegla databastyper (F2-07)
- [ ] **F2-15** Flytta Records (n72), Sökalgoritmer och Grafer (n74, n75) enligt masterindexet. Static (n94)
- [ ] **F2-16** Slå ihop ER-diagram (n39 och n131) om F1-00 beslutade det
- [ ] **F2-17** Överväg att slå ihop Funktionell programmering och Funktionell kodning (n166)
- [ ] **F2-18** Egen sida för Boolean (n9), `var` (n10) och Evig loop (n45). Egna sidor, men bara strukturen: texten skrivs i fas 3

## Fas 3: Innehåll, så att böckerna blir lika bra

Nu börjar innehållet. **Här tas beslutet om hur portering sker** (D7): hänvisa, skriv nytt eller kopiera och anpassa. Varje sida eller exempel är en egen punkt och skrivs med lärarens ton och kodstandard. Jag skapar punkterna per kapitel när fas 2 är klar, eftersom masterindexet då visar exakt vad som saknas.

### 3A: Saknade sidor

Sidor som bara finns i en bok. Underlaget finns i `normalisering.md` (alla +J och +C#-rader).

Ordning: Grunder → Variabler → If → Loopar → Metoder → Undantag → Datastrukturer → Algoritmer → OOP → Designmönster → Filhantering → SQL → Testa din kod → APIer → Verktyg → Övrigt → Ordlista.

Rader som bara finns i Java och ska skrivas i C#: n9, n10, n45, n122, n139, n140, n148, n163.

### 3B: Paritet på sidor som finns i båda

Sidor som redan finns i båda, men där den ena är bättre. Det gäller åt båda håll, och Java har äldre sidor som ofta är tunnare. Radantal räcker inte som mått (n82: 372 mot 141 rader), så varje sida bedöms mot en kort checklista.

- [ ] **F3B-00** **Paritetsmätning.** Skriv checklistan (mål med sidan, TL;DR, kodexempel som körs, övning med förväntad utdata, "Testa dig själv", vanliga fel, länkar vidare). Gå igenom alla sidor som finns i båda böckerna och fyll i kolumnen *Paritet* i `struktur.md`: **lika**, **C# bättre**, **Java bättre**, eller **olika men bra**. Det här är ett eget arbete, ungefär 100 sidor, och görs kapitelvis. Marcus avgör oklara fall.
- [ ] **F3B-01 och framåt** En punkt per kapitel eller sida där paritet saknas. Börja med de som är störst: klasser och objekt (n82), arv (n87), interfaces (n90), arrays och listor (n61–64), JSON/XML/CSV (n116–119), TDD (n138). Java-sidor som är bättre portas till C# (Edifact n122, FTP n148, Budgetexempel och övningar n140, GitHub Actions n163).

## Fas 4: Ramverksmotsvarigheter (MOTSV) 🔶 D5

GUI (Swing eller JavaFX), Spring Boot, JPA/Hibernate, Flyway, springdoc, Java SDK för AI. Det här är stora, självständiga projekt. Varje ramverk är en egen punkt, och de påbörjas först när fas 3 är klar. *Källa: n134–137, n147, n150–154, n160.*

## Fas 5: Python-boken

- [ ] **F5-01** Skapa Python-bokens repo med samma byggkedja (Astro, plugins, `nion-book.css`).
- [ ] **F5-02** Lägg masterindexet som startpunkt. Samma kapitel, samma slugs. Pythonkolumnen i `struktur.md` fylls i.
- [ ] **F5-03** Avgör vad som saknar motsvarighet i Python (t.ex. struct, delegater, Windows Forms).
- [ ] **F5-04** Samma arbetsordning som Java: struktur först (fas 1), innehåll sist.

## Parkerat

- **2D-artikel** (`Point`, `Size`, `Rectangle`): vänta tills det finns en samlad 2D-artikel. *(n: Parkerat)*
- **n123, fler exempel på verklig data** (SCB, GTFS, vCard, GPX): 🔶 D6, rekommenderas parkerat.
- **n110, n111 (UI-arkitektur, GoF)**: 23 sidor Java. Tas när fas 3 är klar. 🔶 D5
