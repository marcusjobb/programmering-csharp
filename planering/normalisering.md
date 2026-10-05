# Normalisering C#-boken och Java-boken

Underlag: `inventory.md` (körd 2026-10-05 efter pull i båda repona). Siffrorna i C#- och Java-kolumnerna är sidstorlek i rader. "–" betyder att sidan saknas.

**Åtgärdskoder**

| Kod | Betydelse |
|---|---|
| BEH | Behåll som den är |
| +J / +C# | Lägg till i Java / i C#. Skriv ny sida, eller portera från den andra boken |
| DELA | Dela sidan i flera |
| SLÅ | Slå ihop sidor som överlappar |
| FLYTTA | Flytta till annan kategori |
| MOTSV | Motsvarighet i den andra tekniken (EF → JPA, Linq → Streams osv.) |
| ÄNDRA | Skriv om så att det stämmer för språket |

**Språkspecifikt:** Ja = ämnet hör till ett språk eller ramverk och kan inte kopieras rakt av. Delvis = begreppet finns i båda men koden eller detaljerna skiljer sig.

Skriv beslut i sista kolumnen, till exempel `OK`, `Nej` eller `Annat: …`. Du kan också godkänna intervall: "godkänn 7–31".

---

## Grunder

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 1 | Hur plattformen är uppbyggd | .NET-arkitektur (43) | – | Ja (CLR/IL ↔ JVM/bytecode) | +J "Hur Java är uppbyggt": JDK, JRE, JVM, bytecode | |
| 2 | Framework vs Core | 40 | – | Ja (C#) | BEH i C#. Java har ingen tvåspårshistoria, ingen sida behövs | |
| 3 | Varför språket ser ut som det gör | 29 | "Ett kraftfullt programmeringsspråk" (85) | Delvis | Java: bygg ut den befintliga sidan till samma upplägg (vad som togs med, vad som lämnades bort). +J | |
| 4 | Programstruktur | 153 | – | Delvis (namespace ↔ package, Main) | +J | |
| 5 | Språkhistorik | C# 4→15 (138) | – | Ja | +J Java 8→25, med LTS-versionerna markerade | |
| 6 | Om sidan | 3 | – | – | +J, liten sida | |

## Variabler

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 7 | Introduktion till kategorin | index (40) + Lästext (33) | index (123, innehåll) | – | Java: flytta innehållet i index till en egen sida. Index ska vara navigation, som i C# | |
| 8 | Datatyper och Typer | Datatyper (82), Typer (68) | Typer (124) | – | C#: de två sidorna överlappar. Antingen SLÅ, eller tydliggör: Datatyper = vilka finns, Typer = värde mot referens | |
| 9 | Boolean | – (inne i Datatyper) | 142 | – | +C# egen sida | |
| 10 | var | – | 88 | Delvis | +C# egen sida om `var` | |
| 11 | Heltal | Heltal (70) | Integer (118), Long (90), Byte/Short (77) | – | Båda får en översiktssida "Heltal". C# DELA ut `long` och `byte/short` (storlek, overflow, BigInteger). Java: BEH djupsidorna | |
| 12 | Decimaltal | Decimaltal (67) | Decimal (69), Double (89), Float (70), Float Double Decimal (68) | Delvis (decimal ↔ BigDecimal) | Java: Float, Double och samlingssidan överlappar. SLÅ till "Decimaltal" (översikt), "double och float" och "BigDecimal". C# BEH | |
| 13 | Tecken och text | 87 | Char (106) | – | BEH | |
| 14 | Typalias | 123 | – | Ja (C#) | BEH i C#. Java har inget motsvarande | |
| 15 | Konstanter | 99 | – | Delvis (const/readonly ↔ final) | +J `final` | |
| 16 | Enum | 273 | 319 | – | BEH | |
| 17 | Tupler | 116 | – | Ja (Java saknar tupler) | Java: MOTSV, hänvisa till records (se 72) | |
| 18 | Statiska variabler | 122 | – (nämns under Åtkomstmoderator) | – | +J | |
| 19 | Stränghantering (grunderna) | 206 | indexsida (11) | – | +J metoder: substring, split, replace osv. Java saknar grundsidan | |
| 20 | Formatering | Formatering (47) | Stringformat (158), MessageFormat (118), DecimalFormat (180), Choiceformat (2) | Delvis | Java: Choiceformat är bara en stubb, fyll i eller ta bort. C# BEH | |
| 21 | StringBuilder | 112 | 114 | – | BEH | |
| 22 | StringJoiner / string.Join | liten sektion i StringBuilder | 109 | Delvis | BEH | |
| 23 | Regex | 90 | – | – | +J `java.util.regex` | |
| 24 | Raw strings / textblock | 164 | – | Ja (""" i Java) | +J textblock | |
| 25 | Null | Nullable (119) | – | Ja (Optional ↔ nullable) | +J "null och Optional" | |
| 26 | Random | 117 | – | – | +J | |
| 27 | Datum och tid | 179 | – | Ja (DateTime ↔ java.time) | +J | |
| 28 | Guid / UUID | 128 | – | Ja | +J UUID | |
| 29 | Span och Memory | 73 | – | Ja (C#) | BEH i C#, ingen motsvarighet i Java | |
| 30 | Exempel: Arbetad tid, Kladdkaka | – | 106 + 81 | – | Behåll i Java som exempel på variabelhantering. +C# portera båda | |
| 31 | Testa dig själv | 48 | – | – | +J | |

## If

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 32 | if / else | if-else (196) | Else (73), Else if (168) | – | Java: SLÅ de två till en sida "if / else" | |
| 33 | Switch | 165 | – | Delvis (switch-uttryck: C# 8, Java 14) | +J | |
| 34 | Mönstermatchning | 219 | – | Delvis (Java 21) | +J | |
| 35 | Ternary if | 75 | 57 | – | BEH | |
| 36 | Testa dig själv | 48 | – | – | +J | |

## Diagram

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 37 | Flödesschema, Sekvens, Aktivitet, Tillstånd, Användningsfall | 5 sidor (152–217) | – | Nej, språkneutralt | +J. Skriv en gång, byt bara kodsnuttarna | |
| 38 | UML-klassdiagram | 248 | – | Delvis ("Från UML till C#") | +J, ersätt kodexemplen med Java | |
| 39 | ER-diagram | 294 (under Diagram) | – | Nej | +J. OBS: C# har dessutom `sql/erd.md` med samma titel, se 131 | |
| 40 | Arkitektur, Nätverk, Dataflöde | 3 sidor (296–435) | – | Nej | +J | |

## Loopar

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 41 | for, while, do-while | Grunderna (210, en sida) | Loopar i Java (78), For (51), While (86), Do While (69) | – | C#: DELA i for / while / do-while som Java. Behåll jämförelsetabellen i index | |
| 42 | Foreach | 134 | 92 | – | BEH | |
| 43 | Nästlade loopar | 71 | 116 | – | BEH | |
| 44 | Rekursion | 95 | 99 | – | BEH | |
| 45 | Evig loop | – (inne i Grunderna) | 111 | – | +C# egen sida | |
| 46 | Break, continue, namngivna loopar | Break/Continue (98), Namngivna (149) | Loop kontroller (139) | Delvis | Java: DELA i Break/Continue och Namngivna loopar. Return och yield får en kort notis | |
| 47 | Testa dig själv | 55 | – | – | +J | |

## Metoder

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 48 | Om metoder | 118 + Lästext (356) | – | – | +J | |
| 49 | Parametrar | 129 | – | Delvis (default och namngivna argument: bara C#) | +J, utan default och namngivna | |
| 50 | Överlagring | 116 + 192 | – | – | +J | |
| 51 | Värde- och referenstyper | 124 | – | Delvis (Java: allt skickas som värde, behöver förklaras) | +J | |
| 52 | out och ref | 110 + 125 | – | Ja (finns inte i Java) | Java: förklaringssida "Varför finns inte out/ref?". Hur man returnerar flera värden: record | |
| 53 | params | 136 | – | Delvis (varargs) | +J varargs | |
| 54 | Lambda och delegater | 186 | – | Delvis | +J lambda och funktionella gränssnitt | |
| 55 | Extension-metoder, -properties, -indexerare | 177 + 270 + 164 | – | Ja (C#) | BEH i C#, ingen motsvarighet i Java | |
| 56 | Testa dig själv | 51 | – | – | +J | |

## Undantagshantering

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 57 | try, catch, finally | 117 | – | Delvis (Java: checked mot unchecked) | +J | |
| 58 | Egna exceptions | 97 | – | – | +J | |
| 59 | try-with-resources ↔ using | – | – | Ja | Skriv i båda, kopplad till 101 (IDisposable ↔ AutoCloseable) | |

## Datastrukturer

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 60 | Generics | 177 | – | – | +J, före List | |
| 61 | Arrays | 111 | 162 | – | BEH | |
| 62 | Array övningar | 4 övningar | index (138, 10 övningar) + 4 | – | BEH. C#: +C# använd Javas tiolista som mall | |
| 63 | Flerdimensionella arrayer | 2D (88), 3D (52), Jagged (55) | – (nämns i övningar) | Delvis (Java: allt är arrayer av arrayer) | +J en sida | |
| 64 | Listor | List (117) | Arraylists och Listor (274) | Ja (Javas ArrayList = C#s `List<T>`, C#s ArrayList = `List<object>`) | Java: DELA i `List`-gränssnittet och `ArrayList`. C#: notis om gamla ArrayList | |
| 65 | Map / Dictionary | Dictionary (155) | Dictionary (Hashmap) (113), Map (103) | Ja (namn: Map/HashMap ↔ IDictionary/Dictionary) | Java: Map-gränssnittet och HashMap som två tydliga sidor | |
| 66 | Gränssnitt mot konkret typ | 71 | – | – | +J (List mot ArrayList, Map mot HashMap) | |
| 67 | Samlingsuttryck | 105 | – | Ja (List.of, Map.of) | +J | |
| 68 | LINQ ↔ Streams | 245 | – | Ja | MOTSV +J "Streams". Kopplas till 164 (funktionell programmering) | |
| 69 | LinkedList | 133 | – | – | +J | |
| 70 | HashSet | 156 | – (nämns i index) | – | +J | |
| 71 | Stack och Queue | 206 | – | Delvis (Java: Deque) | +J | |
| 72 | Records | OOP (168) | Datastrukturer (130) | – | FLYTTA C# till Datastrukturer | |
| 73 | Struct | OOP (133) | Struct (72) | Ja (finns inte i Java) | Java: ta bort sidan, eller ersätt med "värde mot referens" (se 51). C# BEH | |
| 74 | Sökalgoritmer | 165 | – | – | FLYTTA C# till Algoritmer. +J | |
| 75 | Grafer och BFS | 189 | – | – | FLYTTA C# till Algoritmer. +J | |
| 76 | Testa dig själv | 51 | – | – | +J | |

## Algoritmer

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 77 | Sorteringsalgoritmer | 167 | – | Delvis ("använd ramverket") | +J | |
| 78 | Dijkstra | 102 | – | – | +J | |
| 79 | Jaccard-similaritet | 79 | – | – | +J | |
| 80 | Decision trees | 119 | – | – | +J | |

## OOP

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 81 | OOP, kort historik | 27 | – | – | +J, neutral | |
| 82 | Klasser och objekt | 372 | 141 + index (133) | – | BEH. Java: flytta exemplet i index till egen sida | |
| 83 | Konstruktorer och överlagring | 180 + 95 | – | – | +J | |
| 84 | Properties ↔ getters och setters | 317 | – | Ja | MOTSV +J "Getters, setters och inkapsling" | |
| 85 | Inkapsling | 244 | 119 | – | BEH | |
| 86 | ToString, equals, hashCode | ToString (114) | – | Delvis (equals/hashCode är extra viktiga i Java) | +J | |
| 87 | Arv | 272 | 113 | – | BEH | |
| 88 | Polymorfism: grunderna | Grunderna (70) | index (31) | Delvis (Java: @Override, alla metoder är virtuella) | +J | |
| 89 | Abstrakta klasser | 59 + 96 | 103 + 197 | – | BEH | |
| 90 | Interfaces | 52 + 245 | 99 + 307 | Delvis (Java: default-metoder) | BEH | |
| 91 | Klasskomposition | 119 | 136 | – | BEH | |
| 92 | Komposition över arv | 100 | 211 | – | BEH | |
| 93 | Åtkomstmoderator | Internal, Private, Protected, Public, Static | Private, Protected, Public, Static | Ja (internal ↔ package-private) | Java: +J package-private. Static hör inte hemma här i någon av böckerna, se 94 | |
| 94 | Statiska klasser och metoder | 114 | – (inne i Åtkomstmoderator) | – | FLYTTA Static ur Åtkomstmoderator i båda. +J | |
| 95 | Delegater | 42 + 5 | 13 + 108 + 149 | Ja (C#-begrepp) | Java: ÄNDRA till "Funktionella gränssnitt". C# BEH | |
| 96 | Events / Händelser | 72 + 92 | 102 + 244 | Delvis | BEH. Båda har exemplet Bankkonto | |
| 97 | Partial class | 140 | – | Ja (C#) | BEH i C# | |
| 98 | POCO/DTO ↔ POJO/DTO | 216 | – | Ja | +J. Hänger ihop med 72 | |
| 99 | required, init, file-scoped types | 135 + 118 | – | Ja (C#) | BEH i C# | |
| 100 | Sealed | 81 | – | Delvis (Java 17) | +J | |
| 101 | Destruktor och IDisposable | 139 | – | Ja (↔ AutoCloseable) | MOTSV +J | |
| 102 | Garbage Collector | 99 | – | Delvis | +J | |
| 103 | Egna datatyper (operatorer) | 172 | – | Ja (Java saknar operatoröverlagring) | BEH i C# | |
| 104 | Attribut och Reflection ↔ Annotations | 118 | – | Ja | MOTSV +J | |
| 105 | Slutna hierarkier, Union-typer | 126 + 146 | – | Ja (C# 15, preview) | BEH i C#. Java: sealed interfaces + records som motsvarighet | |
| 106 | Class, struct eller record | 58 | – | Delvis | +J "class, record eller enum" | |
| 107 | Testa dig själv | 68 | – | – | +J | |

## Designmönster

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 108 | Factory och Strategy | 101 | – | – | +J | |
| 109 | Repository och Dependency Inversion | 65 | – | – | +J | |
| 110 | UI-arkitektur (MVC, MVP, MVVM, Komponenter, Flux/Redux, MVU) | index (130) + 7 sidor | – | Delvis (Razor, Blazor, Fluxor) | +J neutral intro, MOTSV för Razor/Blazor (Spring MVC, JavaFX) | |
| 111 | GoF-mönster (23 mönster) | 3 index + 23 sidor | – | Delvis ("Inbyggt i .NET") | +J. Byt "Inbyggt i .NET" mot Java-motsvarigheter | |
| 112 | Antipatterns | 87 | – | – | +J | |

## Filhantering

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 113 | Introduktion | index (20) | index (468, innehåll) | – | Java: dela upp index i egna sidor, se 114–116 | |
| 114 | Binär | 88 | – (inne i index) | – | +J, flytta ur index | |
| 115 | Komprimering (GZip, Base64) | 157 | – (inne i index) | Delvis | +J, flytta ur index | |
| 116 | Textfiler | 59 | 215 | – | BEH | |
| 117 | CSV | 216 | 202 | – | BEH | |
| 118 | JSON | 276 | 356 | – | BEH | |
| 119 | XML | 130 | 149 | – | BEH | |
| 120 | File, Directory, FileInfo, Path, Mappar | 5 sidor | File, Mappar, Path | Ja (Java: File mot NIO `Files`) | Java: +J `Files` (NIO). C# BEH | |
| 121 | ICS-filer (kalender) | 175 | – | – | +J. Verklig data | |
| 122 | Edifact (grundform och XML) | – | 332 + 287 | – | BEH i Java. +C# portera. Verklig data | |
| 123 | Fler exempel på verklig data | – | – | – | NYTT i båda. Förslag, inget beslut: öppna data från SCB (CSV), GTFS-tidtabeller, vCard, GPX | |

## SQL

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 124 | Varför databaser? | 83 | – | – | +J | |
| 125 | SQLite, DB Browser (H2 i Java) | SQLite (110), DB Browser (81) | – | Ja (H2 och SQLite via JDBC) | MOTSV +J, med H2 som inbyggd databas | |
| 126 | SQL, grunder | 119 | – | – | +J | |
| 127 | SQL-kommandon (SELECT till DELETE, COALESCE, Från tabell till klass) | 13 sidor | 13 sidor | Delvis (kod) | BEH. Redan portade | |
| 128 | Databaser, Tabeller, Constraints | 59 + 103 + 102 | 147 + 165 + 99 | – | BEH | |
| 129 | Databastyper | SQLite, MySQL, PostgreSQL (85) | SQL Server, SQLite, MySQL (45) | – | SLÅ till en jämförelse som täcker alla fyra | |
| 130 | Transaktioner och ACID | 98 | – | Delvis (JDBC) | +J | |
| 131 | ER-diagram (SQL) | 176 | – | – | C#: SLÅ ihop med 39. +J | |
| 132 | Normalisering | 174 | – | – | +J | |
| 133 | SQL injection | 76 | – | Delvis (PreparedStatement) | +J | |

## Entity Framework

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 134 | ORM, översikt | 65 | – (stub) | Ja | MOTSV JPA/Hibernate och Spring Data | |
| 135 | Kontext (DbContext) | 3 sidor | – | Ja (↔ EntityManager) | MOTSV | |
| 136 | Entiteter, Relationer, Frågor, Migrationer, Seeding, Prestanda | 6 sidor | – | Ja | MOTSV (Flyway/Liquibase för migrationer) | |
| 137 | Övning, Code-First dagbok | 158 | – | Ja | MOTSV | |

## Testa din kod

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 138 | TDD | 166 | 96 + index (198) | Delvis (xUnit ↔ JUnit, Maven) | BEH. Java: flytta index-innehållet till egen sida | |
| 139 | Röd Grön Blå | – | 79 | – | +C# | |
| 140 | Övningar (Budget, Stringhelper, Fler exempel) | – | 164 + 535 + 242 | Delvis | +C# portera | |
| 141 | Kodgranskning | 87 | – | – | +J | |

## APIer

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 142 | REST | 82 | – | – | +J | |
| 143 | GraphQL och SOAP | 75 + 54 | – | – | +J | |
| 144 | Endpoints och CORS | 45 + 48 | – | Delvis | +J | |
| 145 | MVC och API | 77 | – | Ja | MOTSV | |
| 146 | Microservices | 81 | Microservices (53), Api och Microservices (125) | – | Java: SLÅ de två. C# BEH | |
| 147 | OpenAPI, Swagger, Scalar | 153 + 89 | – | Ja (springdoc) | MOTSV | |
| 148 | FTP och SFTP | – | 71 + 79 + 113 + 129 | – | +C# portera (FluentFTP, SSH.NET). Verklig fildata | |
| 149 | Testa dig själv | 81 | – | – | +J | |

## GUI, ASP.NET Core, Asynkron, AI

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 150 | Windows Forms (+ kontroller, layout, events) | 5 sidor | – (stub) | Ja | MOTSV Swing eller JavaFX | |
| 151 | ASP.NET Core, intro och Hangman | 135 + 210 | – (stub) | Ja | MOTSV Spring Boot | |
| 152 | Cookies, Session, TempData, ViewBag | 7 sidor | – | Delvis (cookies och session är neutrala, TempData/ViewBag är ASP.NET) | Neutral del +J, resten MOTSV | |
| 153 | Dependency Injection | 69 | – | Ja | MOTSV Spring. Se även 109 | |
| 154 | Blazor | 6 sidor | – | Ja | BEH i C#. Java: ingen motsvarighet | |
| 155 | Asynkron, intro och exempel | 106 + 81 | 111 + 126 | Ja (async/await ↔ CompletableFuture) | BEH | |
| 156 | Lock / trådsäkerhet | 151 | – | Ja (synchronized, ReentrantLock) | MOTSV +J | |
| 157 | Threading och TPL | 84 | – | Ja (ExecutorService, virtuella trådar) | MOTSV +J | |
| 158 | Asynkron validering | 197 | – | Ja (C#) | BEH i C# | |
| 159 | AI: Domänkunskap, Modeller, Prompting | ~12 sidor | – (stub) | Nej | +J. Neutralt, kopiera eller dela källa | |
| 160 | AI-API och exempel (kod) | 5 sidor | – | Ja (SDK-kod) | MOTSV (Java SDK) | |

## Verktyg, Övrigt, Ordlista

| Id | Ämne | C# | Java | Språkspecifikt | Förslag | Beslut |
|---|---|---|---|---|---|---|
| 161 | Installation (Rider, VS, VS Code) | 4 | – | Ja | MOTSV (IntelliJ, VS Code, JDK, Maven) | |
| 162 | Git (grunder, konflikter, testa dig själv) | 4 | – | Nej | +J. Det finns också en separat `git-bok`, överväg att länka dit i båda | |
| 163 | GitHub Actions | CI/CD (90) | 79 + 75 + 150 + 151 | Delvis | Java har fler exempel. +C# portera exemplen | |
| 164 | Webbtjänster (Anteckning, Miro, Goblin, Kommunikation) | 4 | – | Nej | +J | |
| 165 | Konsol-I/O | 105 | – | Ja (Console ↔ Scanner) | MOTSV +J | |
| 166 | Funktionell programmering | 113 + Funktionell kodning (170) | 102 | Delvis | BEH. C#: de två sidorna överlappar, överväg SLÅ. Kopplas till 68 | |
| 167 | Planera innan du kodar | 123 | – | Nej | +J | |
| 168 | 10 tips för juniorer | 100 | – | Nej | +J | |
| 169 | C#-specifika (Console.Beep, allows ref struct, inline arrays, generisk matematik, UTF-8 literals) | 5 | – | Ja | BEH i C#, ingen motsvarighet | |
| 170 | Ordlista (Git, Programmering, Programmeringsspråk, Webb, Yrken) | 5 | 5 | – | BEH | |
| 171 | Ordlista (Datatyper, Kontrollstruktur, Samlingar, Strängar, Operatorer, Metodik) | 6 | – | Delvis | +J | |

---

## Parkerat

- **2D-artikel:** `Point`, `Size` och `Rectangle` (System.Drawing ↔ java.awt). Vänta tills det finns en samlad artikel om 2D.

## Saker jag hittade som inte är ämnen

Små fel som dyker upp i underlaget och som är värda att åtgärda separat:

1. **C#, dubblettitel "Git":** `verktyg/installation/Gitinstallation.md` och `verktyg/git/index.md` heter båda "Git". Sidebaren kopplar barn via titel, så Git-grunder, Git-konflikter, GitHub Actions och Testa dig själv hamnar under båda.
2. **C#, dubblettitel "Events":** OOP, Windows Forms och Blazor har varsin sida som heter "Events". Bankkonto-exemplet visas därför också under de två andra.
3. **C#, dubblettitel "ER-diagram":** `diagram/er-diagram.md` (294) och `sql/erd.md` (176). Se 39 och 131.
4. **Java, sökvägen `aualityassurance`:** stavfel i mappnamnet och därmed i URL:en. Byte till `testa-din-kod` ger en ny URL.
5. **Java, `Choiceformat`:** sidan har två rader innehåll.
6. **Java, index med innehåll:** `filhantering/index.md` har 468 rader, `oop/index.md` 133, `variables/index.md` 123 och `aualityassurance/index.md` 198. I C# är index navigation.
