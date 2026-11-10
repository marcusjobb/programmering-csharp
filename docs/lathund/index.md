---
title: Lathund
description: "Snabbreferenser för C#: datatyper, kontrollflöde, samlingar, databaser, verktyg och webb. Kort och strukturerat, med länkar till kapitlen för den grundliga genomgången."
parent: C# bok
nav_order: 990
has_children: true
---
# Lathund

Snabbreferenser för det du behöver när du skriver kod. Sidorna är ordnade efter bokens kapitel, så den som följer boken hittar rätt direkt. Vill du förstå något grundligt, gå till kapitlet som sidan länkar till.

## Datatyper

Grunderna för variabler och värden.

| Sida | Vad den täcker |
|------|----------------|
| [Variabler](variables.md) | Deklaration, initialisering, modifierare och vanliga operationer för variabler i C#. |
| [Heltal (int)](integers.md) | Heltal i C# i lathundsform: intervall, omvandling från och till text, aritmetik, jämförelser och de vanligaste misstagen. |
| [Decimaltal (double, float, decimal)](decimals.md) | Decimaltalen double, float och decimal i C#: omfång, suffix, omvandling, avrundning och de vanligaste misstagen. |
| [Sant eller falskt (bool)](booleans.md) | Typen bool i C#: värden, jämförelser, logiska operatorer, kortslutning och de vanligaste misstagen. |
| [Strängar (string)](strings.md) | Strängar i C# i lathundsform: sammanfogning, längd, sökning, utskärning, ersättning och delning, samt de vanligaste misstagen. |
| [Datatyper](datatypes.md) | Vanliga datatyper i C# i lathundsform: tal, text, bool, nullbara typer och samlingar, med omfång och exempel. |

## Kontrollflöde

Villkor och loopar, från enklast till mest omfattande.

| Sida | Vad den täcker |
|------|----------------|
| [If-satsen](if.md) | if, else och else if i C# i lathundsform: syntax, jämförelser, exempel och de vanligaste misstagen. |
| [Switch](switch.md) | switch-sats och switch-uttryck i C# i lathundsform: case, break, default, when, jämförelser och vanliga misstag. |
| [While](while.md) | while-loopen i C# i lathundsform: villkor, break, continue, nästlade loopar och vanliga misstag. |
| [Do-while](do-while.md) | do-while-loopen i C# i lathundsform: efterkontroll, jämförelse med while, break, continue och vanliga misstag. |
| [For](for.md) | for-loopen i C# i lathundsform: initiering, villkor, steg, nästlade loopar, break, continue och vanliga misstag. |

## Samlingar

Arrayer, listor och andra samlingar.

| Sida | Vad den täcker |
|------|----------------|
| [Arrayer](arrays.md) | Arrayer i C#: skapa, läsa och ändra element, de vanligaste metoderna i Array-klassen och skillnader mot Java. |
| [Lista (List<T>)](list.md) | List<T> i C#: lägga till, ta bort, söka och sortera i en lista som växer och krymper, samt varför ArrayList undviks i nya program. |
| [Länkad lista (LinkedList<T>)](linked-list.md) | LinkedList<T> i C#: en dubbelt länkad lista där du lägger till och tar bort i början och slutet, och varför den inte har index. |
| [Dictionary (Dictionary<TKey, TValue>)](dictionary.md) | Dictionary<TKey, TValue> i C#: nyckel-värde-par, skillnaden mellan Add och indexern, säker läsning med TryGetValue och jämförelse med Java HashMap. |
| [Hashset (HashSet<T>)](hashset.md) | HashSet<T> i C#: en samling unika värden, snabb kontroll om ett värde finns, och mängdoperationer som ändrar mängden på plats. |
| [Stack (Stack<T>)](stack.md) | Stack<T> i C#: LIFO-ordning med Push, Pop och Peek, säker användning med TryPop och TryPeek, och jämförelse med Java. |
| [Kö (Queue<T>)](queue.md) | Queue<T> i C#: FIFO-ordning med Enqueue, Dequeue och Peek, säker användning med TryDequeue, och jämförelse med Java. |

## Databaser

ORM, ADO.NET och dokumentdatabaser.

| Sida | Vad den täcker |
|------|----------------|
| [Entity Framework Core](ef-core.md) | Entity Framework Core i lathundsform: installation per databas, connection string, CRUD, transaktioner, migrationer, relationer med Fluent API och seeding. |
| [ADO.NET med SQLite](ado-sqlite.md) | ADO.NET med SQLite i lathundsform: connection, command, parametrar, CRUD, transaktioner och seeding utan ORM. |
| [MongoDB](mongodb.md) | MongoDB i C# i lathundsform: Docker, Atlas, Compass, connection string i JSON, CRUD, transaktioner med replica set och seeding. |

## Verktyg och arbetssätt

Git, kommandotolken, markdown och Scrum.

| Sida | Vad den täcker |
|------|----------------|
| [Git](git-quickguide.md) | Git i lathundsform: att skapa och klona ett repository, arbeta med grenar, skicka upp ändringar, ångra och hantera fjärrrepositoryn. |
| [Git Flow](git-flow.md) | Git Flow i lathundsform: branchstrukturen main, develop och feature-grenar, pull requests, hotfix och de vanligaste kommandona. |
| [Kommandotolken](command-line.md) | Kommandotolken (cmd) i Windows i lathundsform: navigering, filhantering, filsökning, systeminformation, nätverk och användarkonton. |
| [Markdown](markdown.md) | Markdown i lathundsform för README-filer och dokumentation i C#-projekt: rubriker, listor, länkar, tabeller och kodblock. |
| [Scrum](scrum.md) | Scrum i lathundsform: roller, artefakter, events, estimering och user stories med tabeller. |

## Webb och API

ASP.NET Core, Blazor och API-dokumentation.

| Sida | Vad den täcker |
|------|----------------|
| [ASP.NET Core Web API](aspnet.md) | ASP.NET Core Web API i lathundsform: skapa solution och projekt, projektreferenser, controllers, Program.cs, Entity Framework-migrationer och tester. |
| [Blazor](blazor.md) | Blazor i lathundsform: skapa en Blazor Web App med interaktiv server, komponenter, parametrar, dependency injection, formulär och tester med bUnit. |
| [Swagger och Scalar](swagger-scalar.md) | Dokumentation och testning av ett ASP.NET Core-API med Swagger UI eller Scalar: paket, Program.cs, endpoint-attribut, typade svar och JWT. |

## Connection strings i JSON

Databaslathundarna läser connection strings från `appsettings.json`. Lösenord hör inte hemma i filen. De ligger i user secrets eller i miljövariabler:

```json
{
  "ConnectionStrings": {
    "Sqlite": "Data Source=webshop.db",
    "SqlServer": "Server=localhost,1433;Database=Webshop;User Id=sa;Password=<lösenord>;TrustServerCertificate=True"
  }
}
```

Två understreck i en miljövariabel motsvarar ett nivåsteg i JSON: `ConnectionStrings__SqlServer`.
