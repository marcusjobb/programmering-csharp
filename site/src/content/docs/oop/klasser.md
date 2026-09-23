---
title: Klasser och Objekt inom programmering
description: "Klasser och Objekt inom programmering i Objektorienterad programmering (OOP) — C#-boken av Marcus Ackre Medina"
layout: default
parent: Objektorienterad programmering (OOP)
nav_order: 10
---
# Klasser och Objekt inom programmering

En artikel som utforskar ämnet Klasser och Objekt inom programmering.

## När du läst detta ska du kunna

- Förstå och förklara vad Klasser och Objekt är och deras relevans inom programmering.
- Diskutera fördelar och begränsningar med Klasser och Objekt.
- Identifiera olika användningsområden där Klasser och Objekt kan tillämpas.
- Förstå och tolka ett kodexempel som använder Klasser och Objekt.
- Sammanfatta viktiga insikter och rekommendationer för vidare läsning.

## Introduktion

Välkommen till denna artikel som kommer att utforska konceptet Klasser och Objekt inom programmering. Klasser och Objekt är grundläggande byggstenar inom objektorienterad programmering (OOP) och spelar en central roll för att skapa modulära och strukturerade program. Genom att förstå och behärska dessa koncept kan du skapa kraftfulla och flexibla program som är lättare att underhålla och återanvända.

## Vad är Klasser och Objekt?

Klasser och Objekt är centrala koncept inom objektorienterad programmering som hjälper oss att organisera och strukturera vår kod på ett mer logiskt sätt.

En **klass** kan betraktas som en mall eller ritning som definierar hur ett objekt av den klassen ska se ut och agera. Klassen innehåller definitioner av attribut (också kallade egenskaper) och metoder som beskriver objektets egenskaper och beteenden.

Ett **objekt** är en specifik förekomst av en klass. Det kan ses som en konkret entitet med egenskaper som är definierade av klassen och som kan utföra de metoder som klassen tillhandahåller.

En analogi som ofta används för att förklara klasser och objekt är att klassen är som en ritning för att skapa ett hus och objektet är själva huset som skapas enligt ritningen. Ritningen definierar husets egenskaper (antalet rum, färg, storlek, etc.) och metoder (öppna dörren, tända lampan, etc.), medan själva huset är den specifika instansen som skapas baserat på ritningen.

### Klassers namn

Klasser kallas för olika namn beroende på hur de används.
Här är den uppdaterade tabellen med basklass, subklass och några namn för olika designmönster:

| Term           | Förklaring                                                                                                                                                     | Andra namn                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Klass          | En klass är som en ritning för att bygga något. Det berättar vilka delar och funktioner som något ska ha när det skapas.                                       |                           |
| Abstrakt klass | En abstrakt klass är som en mall där man bara får en idé om hur något ska se ut och fungera, men inte exakt hur det ska göras.                                 |                           |
| Gränssnitt     | Ett gränssnitt är som en överenskommelse där man bestämmer vilka saker man behöver kunna göra för att passa in i en viss grupp.                                | Interface                 |
| Konkret klass  | En konkret klass är som en färdig produkt som kan användas direkt, precis som en leksak som man kan leka med direkt när man köper den.                         |                           |
| Basklass       | En basklass är som en övergripande klass som innehåller gemensam funktionalitet och egenskaper som är ärvt av flera subklasser.                                | Superklass                |
| Subklass       | En subklass är som en specialiserad klass som ärver funktionalitet och egenskaper från en basklass och kan lägga till eller ändra dem.                         | Underklass                |
| Instans        | En instans är som en specifik sak som man skapar baserat på ritningen eller mallen i en klass.                                                                 | Objekt                    |
| Modell         | En modell är som en beskrivning av hur något ser ut och fungerar, t.ex. hur man ska spara information i en databas.                                            |                           |
| Typ            | En typ är som en kategori som används för att organisera och hantera olika sorters saker, som olika typer av mätningar eller enheter.                          |                           |
| Objekt         | Ett objekt är som en grej som man kan röra vid och använda. Det är det konkreta resultatet av att använda en ritning eller mall.                               |                           |
| Entitet        | En entitet är som en specifik grej som man vill hålla reda på och spara information om, som en person eller en produkt i en databas.                           |                           |
| Helper         | En helper är som en bästa vän som alltid är där för att hjälpa till med små uppgifter och göra saker lite enklare för dig.                                     | Hjälpklass, Verktygsklass |
| Utility        | En utility är som en verktygslåda full med användbara saker som hjälper dig att lösa specifika problem eller göra svåra saker enklare.                         |                           |
| Komponent      | En komponent är som en del av något större, som en pusselbit som passar in i en större bild och har en specifik funktion.                                      |                           |
| Enhetsobjekt   | Ett enhetsobjekt är som en representation av en specifik enhet eller apparat som kan utföra vissa uppgifter eller ha viss funktionalitet.                      |                           |
| Verktyg        | Ett verktyg är som en hjälpande hand som underlättar och effektiviserar olika uppgifter eller processer.                                                       |                           |
| Modul          | En modul är som en självständig del av ett större system, som kan kopplas in och användas för att utföra specifika uppgifter.                                  |                           |
| Singleton      | Singleton är ett designmönster som används för att se till att endast en instans av en klass skapas och att den kan nås globalt.                               |                           |
| Fabrik         | Fabrik är ett designmönster som används för att skapa objekt utan att avslöja den konkreta implementationen och istället använda en gemensam gränssnitt.       | Factory                   |
| Byggare        | Byggare är ett designmönster som används för att skapa objekt stegvis och möjliggör olika sätt att bygga upp komplexa objekt.                                  | Builder                   |
| Strategi       | Strategi är ett designmönster som används för att välja och använda en av flera möjliga algoritmer eller beteenden vid körningstid.                            | Strategy                  |
| Observatör     | Observatör är ett designmönster som används för att etablera en publikera/prenumerera-mekanism där flera objekt kan lyssna på händelser från ett annat objekt. | Observer                  |

Som du ser har klasser många namn, man kan säga att det är en klass för varje tillfälle.
Men inget att oroa sig för, du kommer att lära dig mer om dem allt eftersom du fortsätter att lära dig om programmering.
Ju mer man använder klasser, desto bättre lär man sig namnen.

## Fördelar

Användningen av Klasser och Objekt erbjuder flera fördelar inom programmering:

1. **Modularitet och återanvändbarhet**: Klasser möjliggör modulär kod genom att separera olika delar av programmet i olika klasser. Detta gör det enklare att hantera och underhålla koden samt möjliggör återanvändning av kod genom att skapa nya objekt baserat på en befintlig klass.

2. **Abstraktion och hantering av komplexitet**: Genom att använda klasser kan vi abstrahera bort detaljer och fokusera på de väsentliga egenskaperna och beteendena hos objektet. Detta hjälper till att hantera komplexitet och gör koden mer läsbar och underhållbar.

3. **Kapsling och informationsskydd**: Klasser möjliggör att vi kan begränsa åtkomsten till objektets egenskaper och metoder. Detta främjar informationsskydd och hjälper till att undvika oavsiktliga ändringar av objektets tillstånd.

4. **Hantering av relationer mellan objekt**: Genom att använda klasser och objekt kan vi definiera och hantera relationer mellan olika objekt. Detta möjliggör att vi kan skapa mer realistiska och flexibla modeller av den verkliga världen i våra program.

## Begränsningar

Det finns också vissa begränsningar eller utmaningar med att använda Klasser och Objekt:

1. **Inlärningskurva**: Konceptet med Klasser och Objekt kan vara svårt att förstå i början, särskilt för nybörjare inom programmering. Att förstå sambandet mellan klasser och objekt och att behärska olika OOP-koncept kan ta tid och övning.

2. **Prestandaöverhead**: Objektorienterad kod kan vara lite mer resurskrävande än procedurorienterad kod på grund av det extra lagringsutrymmet som krävs för att hålla reda på objektens tillstånd och beteenden. Detta kan vara en faktor att ta hänsyn till när det krävs maximal prestanda i en applikation.

3. **Designkomplexitet**: Att designa och planera klasser och objekt kan vara en utmaning. Att hitta rätt abstraktionsnivå, definiera korrekta relationer och undvika överkomplicerade hierarkier kan vara svårt och kräver erfarenhet och bra designprinciper.

## Användningsområden

Klasser och Objekt kan tillämpas i en mängd olika scenarier inom programmering. Här är några exempel på användningsområden:

1. **Applikationsutveckling**: Klasser och Objekt används i stor utsträckning vid utveckling av applikationer, oavsett om det är webbapplikationer, mobilappar eller skrivbordsprogram. Genom att strukturera koden med hjälp av klasser och objekt blir programmet mer organiserat och lättare att underhålla.

2. **Spelutveckling**: Inom spelutveckling används Klasser och Objekt för att skapa olika spelobjekt, karaktärer, världar och mycket mer. Genom att använda objektorienterad programmering kan spelutvecklare skapa komplexa och interaktiva spelvärldar.

3. **Simuleringar**: Simuleringsprogram och modelleringsverktyg kan dra nytta av Klasser och Objekt för att representera och simulera olika entiteter och processer. Genom att använda objekt för att modellera olika aspekter av system

et kan simuleringar bli mer realistiska och flexibla.

4. **Databashantering**: Vid databashantering används ofta objektorienterade koncept för att modellera och hantera data. Objekt kan representera tabeller, rader och kolumner i en databas och möjliggöra en mer flexibel och hanterbar databasstruktur.

## Exempelkod

För att illustrera användningen av Klasser och Objekt, låt oss tänka oss att vi bygger ett program för att hantera en biblioteksdatabase. Vi kan använda Klasser och Objekt för att representera olika entiteter i biblioteket, till exempel böcker och medlemmar. Här är ett kodexempel i C#:

```csharp
public class Book
{
    public string Title { get; set; }
    public string Author { get; set; }
    public int Year { get; set; }

    public void DisplayInfo()
    {
        Console.WriteLine($"Title: {Title}");
        Console.WriteLine($"Author: {Author}");
        Console.WriteLine($"Year: {Year}");
    }
}

public class Member
{
    public string Name { get; set; }
    public int Age { get; set; }
    public List<Book> BorrowedBooks { get; set; }

    public void DisplayInfo()
    {
        Console.WriteLine($"Name: {Name}");
        Console.WriteLine($"Age: {Age}");
        Console.WriteLine("Borrowed Books:");
        foreach (var book in BorrowedBooks)
        {
            Console.WriteLine($"- {book.Title}");
        }
    }
}

// Exempel på användning av Klasser och Objekt
var book = new Book
{
    Title = "The Catcher in the Rye",
    Author = "J.D. Salinger",
    Year = 1951
};

var member = new Member
{
    Name = "John Doe",
    Age = 30,
    BorrowedBooks = new List<Book> { book }
};

book.DisplayInfo();
member.DisplayInfo();
```

---

## Skapa objekt — gamla och nya sätt

Det finns flera sätt att skapa ett objekt i C#. Alla fungerar, men nyare versioner av C# har kortare syntax.

```csharp
// Klassiskt (alltid giltigt)
Book b1 = new Book();
b1.Title = "Dune";

// Med var — typen bestäms av höger sida (alltid giltigt)
var b2 = new Book();
b2.Title = "Dune";

// Object initializer — sätt properties direkt vid skapandet (alltid giltigt)
Book b3 = new Book { Title = "Dune", Author = "Herbert", Year = 1965 };

// Target-typed new (C# 9) — typen bestäms av vänster sida
// ✨ Modernast — kortast när typen redan är deklarerad
Book b4 = new() { Title = "Dune", Author = "Herbert", Year = 1965 };
```

> **✨ C# 9 — target-typed `new()`:** När kompilatorn redan vet vilken typ det är (från vänster sida av `=`) kan du skriva `new()` utan att upprepa typnamnet. Samma sak gäller i metodparametrar och returvärden.

### Samlingar — gammal och ny stil

```csharp
// Gammalt
List<Book> books = new List<Book>();

// Med var
var books = new List<Book>();

// Target-typed new (C# 9)
List<Book> books = new();

// Collection expression (C# 12) — ✨ Modernast
List<Book> books = [b1, b2, b3];
```

### Output

```text
Title: The Catcher in the Rye
Author: J.D. Salinger
Year: 1951
Name: John Doe
Age: 30
Borrowed Books:
- The Catcher in the Rye
```

I detta exempel har vi två klasser, `Book` och `Member`, som representerar en bok och en medlem i biblioteket. Vi skapar sedan ett objekt av varje klass och använder deras metoder för att visa informationen om boken och medlemmen.

## Slutsats

Klasser och Objekt är grundläggande koncept inom objektorienterad programmering som hjälper oss att organisera och strukturera vår kod på ett mer logiskt och effektivt sätt. Genom att använda Klasser och Objekt kan vi skapa modulära och återanvändbara program, hantera komplexitet och modellera relationer mellan olika entiteter.

Det är viktigt att förstå både fördelarna och begränsningarna med att använda Klasser och Objekt och att kunna identifiera olika användningsområden där dessa koncept kan tillämpas. Genom att behärska Klasser och Objekt kan du utveckla välstrukturerad och lättunderhållen kod.

För vidare läsning och fördjupning rekommenderas att studera OOP-principer, designmönster och mer avancerade koncept som arv och polymorfism.

## TL;DR

Klasser och Objekt är centrala koncept inom objektorienterad programmering. Klasser fungerar som mallar för att skapa objekt med definierade egenskaper och beteenden. Genom att använda Klasser och Objekt kan vi skapa modulära och återanvändbara program, hantera komplexitet och modellera relationer mellan olika entiteter. Det finns fördelar som modularitet och abstraktion, men också begränsningar som inlärningskurva och designkomplexitet. Klasser och Objekt kan tillämpas inom olika områden som applikationsutveckling, spelutveckling och simuleringar.

## Obligatorisk dad joke

Varför ville objektet inte gå på festen?<br>
För att det inte hade någon klass!
