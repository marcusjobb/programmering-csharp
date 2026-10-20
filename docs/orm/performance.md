---
title: Prestanda
description: "Change tracking, N+1, och hur en oskyldig loop kan bli hundra databasanrop utan att en enda rad kod ser fel ut."
parent: Entity Framework
nav_order: 45
---
# Prestanda

EF Core gör det lätt att skriva kod som ser helt oskyldig ut och genererar hundra databasanrop i bakgrunden. Ingen av teknikerna här är avancerad — det är mest att veta vilken av två nästan identiska rader kod som kostar dig 100x prestandan. Mät alltid innan du optimerar; en gissning om var flaskhalsen sitter är ofta fel gissning.

## När du läst detta ska du kunna

- Förklara varför N+1 uppstår och lösa det med `Include`
- Välja mellan `AsNoTracking`, projektion och full entitet beroende på syfte
- Undvika att en `Include`-kedja exploderar i antal rader
- Hitta flaskhalsen innan du optimerar den

## N+1 — det vanligaste problemet i hela EF Core

```csharp
var teachers = db.Teachers.ToList();              // 1 query
foreach (var teacher in teachers)
{
    var students = teacher.Students.ToList();      // 1 query PER lärare
}
// 100 lärare → 101 databasanrop för något som borde vara ett
```

Det här uppstår oftast via **lazy loading** — navigation properties markerade `virtual` som laddar sig själva första gången de accessas. Det ser bekvämt ut i koden och är exakt varför det är en fälla: varje access i en loop blir ett nytt anrop, tyst.

```csharp
var teachers = db.Teachers
    .Include(t => t.Students)
    .ToList();
// 1 query, oavsett hur många lärare det finns
```

`Include` laddar relationen i samma anrop som huvudfrågan. Det är eager loading, och det ska vara ditt förstahandsval. Behöver du data villkorat — "ladda studenterna bara om användaren klickar på detaljvyn" — använd explicit loading istället för lazy loading:

```csharp
var teacher = db.Teachers.Find(1);

if (showStudents)
{
    db.Entry(teacher).Collection(t => t.Students).Load();   // en medveten, synlig extra query
}
```

Skillnaden mot lazy loading är att den extra queryn syns i koden, på en rad du valt att skriva — inte gömd bakom en property-access i en loop.

## AsNoTracking för läsning

Change trackern kostar minne och CPU för varje rad den håller koll på — och den behöver bara hålla koll på rader du tänker ändra.

```csharp
var report = db.Students
    .AsNoTracking()
    .ToList();
```

Använd den för rapporter, GET-endpoints och statistik — allt där du bara läser. Hoppa över den när du faktiskt ska anropa `SaveChanges()` på resultatet; utan tracking vet EF Core inte vad som ändrats.

## Projicera bara det du behöver

```csharp
var full = db.Students.ToList();                                   // hela entiteten, alla kolumner

var projected = db.Students
    .Select(s => new { s.Name, s.Email })
    .ToList();                                                      // bara två kolumner över nätet
```

Ju bredare en tabell är, desto mer skiljer de två åt. Behöver anroparen bara namn och e-post, skicka inte hela raden.

## Filtrera innan du inkluderar

```csharp
// Laddar ALLA lärare med ALLA studenter, filtrerar sen i C#
var teachers = db.Teachers
    .Include(t => t.Students)
    .Where(t => t.City == "Stockholm")
    .ToList();

// Filtrerar i databasen innan relationen laddas
var teachers = db.Teachers
    .Where(t => t.City == "Stockholm")
    .Include(t => t.Students)
    .ToList();
```

Ordningen spelar ingen roll för SQL-motorn i det här fallet — men vanan att filtrera tidigt hindrar dig från att av misstag inkludera en relation *innan* du inser att du bara behövde en bråkdel av raderna.

## Split queries — när Include exploderar

```csharp
var students = db.Students
    .Include(s => s.Courses)
    .Include(s => s.Projects)
    .Include(s => s.Enrollments)
    .ToList();
```

Tre `Include` på samma nivå ger EF Core en enda SQL-join, och en join mellan tabeller med 10 rader var kan ge 10 × 10 × 10 = 1000 rader tillbaka — en cartesian explosion, för data du bad om en gång men får multiplicerad. `AsSplitQuery()` löser det genom att köra en separat query per `Include` istället för en gigantisk join:

```csharp
var students = db.Students
    .Include(s => s.Courses)
    .Include(s => s.Projects)
    .Include(s => s.Enrollments)
    .AsSplitQuery()
    .ToList();
```

Priset: flera queries är inte längre atomiska mot varandra. Ändras data mellan dem, kan du i teorin se en inkonsekvent snapshot. För read-heavy rapporter är det sällan ett problem — för data som ändras ofta under hög belastning, tänk igenom det.

## Paginering

```csharp
var page = db.Students
    .OrderBy(s => s.Name)          // sortera INNAN Skip/Take, annars är sidan odefinierad
    .Skip((pageNumber - 1) * pageSize)
    .Take(pageSize)
    .ToList();
```

En sida utan `OrderBy` kan i teorin returnera olika ordning mellan anrop — databasen garanterar ingen stabil ordning utan en explicit sortering.

## Compiled queries för högfrekventa anrop

```csharp
private static readonly Func<SchoolContext, int, Student?> GetStudentById =
    EF.CompileQuery((SchoolContext db, int id) =>
        db.Students.Include(s => s.Courses).FirstOrDefault(s => s.Id == id));

var student = GetStudentById(db, 1);
```

EF Core cachar normalt redan frågeplaner, men för en query som körs tusentals gånger per sekund sparar en förkompilerad version den sista biten omkostnad. Investera bara i det när profileringen faktiskt pekar hit — det är en mikrooptimering, inte ett förstahandsval.

## Batch- och bulkoperationer

```csharp
// Ett SaveChanges per rad — N databas-roundtrips
foreach (var student in students)
{
    db.Students.Add(student);
    db.SaveChanges();
}

// Ett SaveChanges för hela batchen — 1 roundtrip
db.Students.AddRange(students);
db.SaveChanges();
```

För verkligt stora volymer (tiotusentals rader) är även `AddRange` + `SaveChanges` fortfarande begränsat av att EF Core bygger individuella INSERT-satser. Paketet `EFCore.BulkExtensions` (`dotnet add package EFCore.BulkExtensions`) ger `BulkInsert`/`BulkUpdate`/`BulkDelete` som går direkt mot databasens bulk-API:er — betydligt snabbare vid den skalan, men ett tillägg du tar in när volymen faktiskt kräver det.

## Async — se även LINQ-frågor

[LINQ-frågor mot EF Core](linq-queries.md#async-är-standard-inte-ett-tillägg) går igenom async/await som standardval. Värt att upprepa specifikt här: i ASP.NET Core blockerar ett synkront databasanrop tråden som annars kunde hantera ett annat request. Det är inte bara "lite snabbare" — det är skillnaden mellan en app som skalar och en som kör slut på trådar under belastning.

## Anslutningspooling

```csharp
builder.Services.AddDbContext<SchoolContext>(options =>
    options.UseSqlServer(connectionString));
```

Connection pooling är på som standard — anslutningar återanvänds automatiskt istället för att öppnas och stängas per request. Under ovanligt hög samtidighet kan default-gränsen (100 anslutningar) bli en flaskhals; höj den i anslutningssträngen (`Max Pool Size=200`) om profileringen visar att det är just det som stryper dig.

## Cachning för läsintensiv data

```csharp
public async Task<List<Student>> GetActiveStudentsAsync()
{
    const string cacheKey = "active_students";

    if (!_cache.TryGetValue(cacheKey, out List<Student>? students))
    {
        students = await _db.Students
            .Where(s => s.IsActive)
            .AsNoTracking()
            .ToListAsync();

        _cache.Set(cacheKey, students, TimeSpan.FromMinutes(10));
    }

    return students!;
}
```

Bra för data som läses ofta men ändras sällan. Sätt en rimlig TTL — cachad data som aldrig blir gammal är bara en bugg som väntar på att upptäckas.

## Rå SQL för komplex aggregering

```csharp
var stats = db.Database.SqlQueryRaw<StudentStats>(@"
    SELECT s.City, COUNT(*) AS StudentCount, AVG(s.Age) AS AverageAge
    FROM Students s
    GROUP BY s.City
    HAVING COUNT(*) > 10
").ToList();
```

Vissa aggregeringar är genuint tydligare och snabbare i handskriven SQL än i LINQ. Det är inte ett misslyckande att gå dit — EF Core är ett verktyg för de 90 % av frågorna som är rakt fram, inte ett religiöst åtagande.

## Index

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Student>().HasIndex(s => s.Email).IsUnique();

    modelBuilder.Entity<Student>().HasIndex(s => new { s.City, s.Age });   // sammansatt index

    modelBuilder.Entity<Student>()
        .HasIndex(s => s.Name)
        .HasFilter("[IsActive] = 1");                                     // filtrerat index
}
```

Indexera kolumner som förekommer i `WHERE`, `ORDER BY` eller `JOIN` — inte varje kolumn i tabellen. Ett index som aldrig används kostar skrivprestanda utan att ge någon läsvinst tillbaka.

## Databasvyer för återanvänd komplex logik

```csharp
migrationBuilder.Sql(@"
    CREATE VIEW vw_ActiveStudents AS
    SELECT s.Id, s.Name, s.Email, COUNT(e.CourseId) AS CourseCount
    FROM Students s
    LEFT JOIN Enrollments e ON s.Id = e.StudentId
    WHERE s.IsActive = 1
    GROUP BY s.Id, s.Name, s.Email
");

[Keyless]
public class ActiveStudentView
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int CourseCount { get; set; }
}

modelBuilder.Entity<ActiveStudentView>().ToView("vw_ActiveStudents");

var active = db.Set<ActiveStudentView>().ToList();
```

En vy är rätt val när flera delar av appen behöver samma komplexa join/aggregering — logiken hamnar på ett ställe (databasen), inte upprepad i flera LINQ-frågor.

## Hitta flaskhalsen

```csharp
optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);
```

visar varje SQL-sats EF Core genererar — ofta räcker det för att se ett N+1-problem direkt i konsolen. Vill du märka en specifik fråga i loggarna när flera liknande queries körs samtidigt:

```csharp
var students = db.Students
    .TagWith("GetActiveStudents from StudentService")
    .Where(s => s.IsActive)
    .ToList();
```

och för att mäta exakt en körning:

```csharp
var sw = Stopwatch.StartNew();
var students = await db.Students.ToListAsync();
sw.Stop();
Console.WriteLine($"Query tog: {sw.ElapsedMilliseconds}ms");
```

För systematisk mätning över tid, ta in `BenchmarkDotNet` snarare än att lita på enstaka `Stopwatch`-körningar — en enskild mätning säger inte mycket om variansen mellan körningar.

## Vanliga fallgropar

**Lazy loading som standard** — bekvämt att skriva, men varje access blir ett dolt databasanrop. Föredra `Include` eller explicit loading.

**Tracking på queries du bara läser** — `AsNoTracking()` är gratis prestanda när du redan vet att du inte ska spara ändringar.

**`SaveChanges()` inuti en loop** — samla ändringarna med `AddRange`/`RemoveRange` och spara en gång.

**Ingen paginering på potentiellt stora dataset** — "det är bara några hundra rader idag" håller inte i produktion om ett år.

## Obligatorisk dad-joke

Varför gick EF Core till gymmet?

Den ville bygga bättre index.
