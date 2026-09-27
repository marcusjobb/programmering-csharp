---
title: LINQ-frågor mot EF Core
description: "Samma LINQ du redan känner från listor och arrayer — men EF Core översätter den till SQL istället för att köra den i minnet."
parent: Entity Framework
nav_order: 35
---
# LINQ-frågor mot EF Core

Grunderna i LINQ — `Where`, `Select`, `OrderBy`, `GroupBy` — är redan gånger genomgångna i [Datastrukturer → LINQ](../datastrukturer/linq.md). Det som är annorlunda när du kör LINQ mot en `DbContext` är att uttrycket inte körs i minnet mot en lista — EF Core översätter det till SQL och skickar det till databasen. Det ger dig samma syntax men helt andra spelregler.

## När du läst detta ska du kunna

- Skriva EF-frågor asynkront som standard
- Välja rätt metod för att hämta en eller flera poster
- Förstå varför en fråga inte körs förrän du materialiserar den
- Känna igen uttryck som inte går att översätta till SQL
- Ta dig ur LINQ med rå SQL när du faktiskt behöver det

## Async är standard, inte ett tillägg

```csharp
var students = await db.Students.ToListAsync();
var student = await db.Students.FindAsync(1);
var count = await db.Students.CountAsync(s => s.Age > 25);
```

Varje databasanrop är I/O — appen kan göra annat medan den väntar på svar. Skriv `await ...Async()` som förstahandsval; den synkrona varianten (`ToList()`, `Find()`) finns kvar men blockerar tråden i onödan.

## Hämta en post

```csharp
var student = await db.Students.FindAsync(1);              // snabbast via primärnyckel

var student = await db.Students
    .FirstOrDefaultAsync(s => s.Email == "ada@example.com"); // null om ingen finns

var student = await db.Students
    .SingleOrDefaultAsync(s => s.Email == "ada@example.com"); // kastar om FLER än en matchar
```

`Find` går bara på primärnyckeln men är snabbast om EF redan har posten i sin change tracker. `FirstOrDefault` är rätt val för "hämta en post som matchar ett villkor". `Single` signalerar "det här villkoret ska matcha exakt en rad" — använd den när en dubblett faktiskt är ett buggtecken, inte bara när du råkar tro att det finns bara en.

## Filtrera, sortera, paginera

```csharp
var page = await db.Students
    .Where(s => s.City == "Stockholm")
    .OrderBy(s => s.Name)
    .Skip((pageNumber - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();
```

Hela kedjan bygger ihop *ett* SQL-anrop — `Skip`/`Take` blir `OFFSET`/`FETCH` i databasen, inte en manuell loop i C#.

## Projicera bara det du behöver

```csharp
var names = await db.Students
    .Select(s => s.Name)
    .ToListAsync();

var summary = await db.Students
    .Select(s => new StudentSummaryDto
    {
        Name = s.Name,
        CourseCount = s.Courses.Count
    })
    .ToListAsync();
```

`Select` mot en DTO betyder att databasen bara skickar de kolumner du faktiskt bad om — inte hela raden för att du sedan plockar ut ett fält i C#.

## Aggregering och kontroller

```csharp
var count = await db.Students.CountAsync(s => s.Age > 25);
var avgAge = await db.Students.AverageAsync(s => s.Age);
bool hasOldStudents = await db.Students.AnyAsync(s => s.Age > 30);
bool allAdults = await db.Students.AllAsync(s => s.Age >= 18);
```

`Any`/`All` översätts till `EXISTS`-frågor i SQL — snabbare än att hämta hela listan och kolla i C#.

## Gruppering

```csharp
var byCity = await db.Students
    .GroupBy(s => s.City)
    .Select(g => new { City = g.Key, Count = g.Count(), AverageAge = g.Average(s => s.Age) })
    .ToListAsync();
```

## Relationer: navigera hellre än att joina manuellt

```csharp
// Manuell join — fungerar, men EF Core gör det bättre via navigation properties
var studentCourses = await db.Students
    .Join(db.Enrollments, s => s.Id, e => e.StudentId, (s, e) => new { s.Name, e.CourseId })
    .ToListAsync();

// Samma resultat, mer läsbart
var students = await db.Students
    .Include(s => s.Enrollments)
        .ThenInclude(e => e.Course)
    .ToListAsync();
```

Har du redan navigation properties modellerade (se [Relationer](relationer.md)), är `Include` nästan alltid tydligare än ett handskrivet `Join`. Hur du väljer *vad* du ska inkludera utan att hämta för mycket data är ett prestandaspörsmål i sig — se [Prestanda](performance.md#filtrera-innan-du-inkluderar).

## Strängmatchning och listor

```csharp
var students = await db.Students
    .Where(s => s.Name.Contains("son"))
    .ToListAsync();

var cityList = new[] { "Stockholm", "Göteborg", "Malmö" };
var students = await db.Students
    .Where(s => cityList.Contains(s.City))
    .ToListAsync();
```

`Contains` på en C#-array översätts till SQL:ens `IN (...)` — praktiskt för "matchar någon av dessa värden"-filter.

## Query syntax vs method syntax

```csharp
// Method syntax — det du ser i praktiken i EF Core-kod
var students = await db.Students.Where(s => s.Age > 20).OrderBy(s => s.Name).ToListAsync();

// Query syntax — samma resultat, SQL-liknande läsordning
var students = await (from s in db.Students
                       where s.Age > 20
                       orderby s.Name
                       select s).ToListAsync();
```

Båda ger identisk SQL. Method syntax dominerar i EF Core-kod du kommer möta, men query syntax kan vara lättare att läsa för frågor med flera joins.

## Rå SQL — när LINQ inte räcker

```csharp
var minAge = 25;
var students = await db.Students
    .FromSqlInterpolated($"SELECT * FROM Students WHERE Age > {minAge}")
    .ToListAsync();
```

`FromSqlInterpolated` parametriserar värdet åt dig — skriv aldrig `FromSqlRaw` med manuellt sammansatta strängar, det är samma SQL-injection-risk som att bygga SQL för hand utanför EF Core. Kombinera gärna med vidare LINQ:

```csharp
var students = await db.Students
    .FromSqlInterpolated($"SELECT * FROM Students WHERE City = {city}")
    .Where(s => s.Age > 20)
    .OrderBy(s => s.Name)
    .ToListAsync();
```

## Vanliga fallgropar

**Glömma materialisera queryn.** `db.Students.Where(...)` bygger bara ihop ett uttryck — inget SQL skickas förrän du anropar `ToListAsync()`, `FirstOrDefaultAsync()`, eller liknande. Loggar du eller mäter tid på queryn *innan* den materialiserats mäter du fel sak.

**Lokala metoder i ett LINQ-uttryck.** `.Where(s => MyCustomMethod(s.Name))` kraschar eller faller tillbaka på att hämta hela tabellen — EF Core kan bara översätta uttryck den känner igen till SQL, inte godtycklig C#-kod. Håll dig till metoder EF Core faktiskt stödjer (`Contains`, `StartsWith`, jämförelser, aritmetik).

## Debugga en fråga

```csharp
var query = db.Students.Where(s => s.Age > 20);
Console.WriteLine(query.ToQueryString());   // visar exakt SQL utan att köra frågan
```

Praktiskt när en fråga är långsam och du behöver se vad EF Core faktiskt skickar till databasen, utan att slå på loggning för hela appen.

## Obligatorisk dad-joke

Varför är LINQ så bra på dejting?

Den hittar alltid en matchande `Where`.
