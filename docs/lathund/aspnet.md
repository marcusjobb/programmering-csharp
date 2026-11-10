---
title: "Lathund: ASP.NET Core Web API"
description: "ASP.NET Core Web API i lathundsform: skapa solution och projekt, projektreferenser, controllers, Program.cs, Entity Framework-migrationer och tester."
parent: Lathund
nav_order: 131
---
# Lathund: ASP.NET Core Web API

ASP.NET Core är ramverket för att bygga webbservrar och REST-API:er i C#. Ett API tar emot HTTP-anrop (GET, POST, PUT, DELETE), kör din kod och returnerar data, oftast som JSON.

Läs mer: [Webb](../web/index.md). Dokumentation och testning av API:et finns på [Swagger och Scalar](swagger-scalar.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Ramverk | ASP.NET Core, .NET 10 |
| Projektmall | `webapi` |
| Standardport | Slumpad vid skapande. Finns i `Properties/launchSettings.json` |
| Dokumentation | Inbyggd OpenAPI på `/openapi/v1.json` i Development. Swagger UI och Scalar måste läggas till |
| Startfil | `Program.cs` |

## Skapa solution och projekt

```bash
dotnet new sln -n MyProject
dotnet new webapi -n MyProject.Api --use-controllers
dotnet new classlib -n MyProject.Core
dotnet new xunit -n MyProject.Tests

dotnet sln add MyProject.Api
dotnet sln add MyProject.Core
dotnet sln add MyProject.Tests
```

`--use-controllers` ger klassbaserade controllers i stället för minimal API. Utan flaggan skriver mallen all kod i `Program.cs`.

| Projekt | Innehåll |
|---------|----------|
| `MyProject.Api` | Controllers, `Program.cs`, anslutningssträng |
| `MyProject.Core` | Entiteter, tjänster, `DbContext` |
| `MyProject.Tests` | Tester av tjänster och controllers |

## Projektreferenser

```bash
dotnet add MyProject.Api reference MyProject.Core
dotnet add MyProject.Tests reference MyProject.Api MyProject.Core
```

Referenser går från det som använder till det som används. API:et beror på Core, aldrig tvärtom.

## Paket

```bash
dotnet add MyProject.Core package Microsoft.EntityFrameworkCore.Sqlite
dotnet add MyProject.Api package Microsoft.EntityFrameworkCore.Design
dotnet add MyProject.Tests/MyProject.Tests.csproj package NSubstitute
dotnet add MyProject.Tests package xunit
```

`Design` behövs av verktyget `dotnet ef`, inte av själva körningen.

## Program.cs

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Anslutningssträngen läses från appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

// Tjänsten registreras som scoped: en ny instans per HTTP-anrop
builder.Services.AddScoped<ITeamService, TeamService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
```

```json
{
  "ConnectionStrings": {
    "Default": "Data Source=app.db"
  }
}
```

## Controller

Filen ligger i `MyProject.Api/Controllers/TeamsController.cs`.

```csharp
using Microsoft.AspNetCore.Mvc;
using MyProject.Core.Entities;
using MyProject.Core.Services;

namespace MyProject.Api.Controllers;

[ApiController]
[Route("api/[controller]")]   // Adressen blir api/teams
public class TeamsController(ITeamService teamService) : ControllerBase
{
    // GET api/teams
    [HttpGet]
    public async Task<ActionResult<List<Team>>> GetAll()
    {
        return Ok(await teamService.GetAllAsync());
    }

    // GET api/teams/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Team>> GetById(int id)
    {
        var team = await teamService.GetByIdAsync(id);
        return team is null ? NotFound() : Ok(team);
    }

    // POST api/teams
    [HttpPost]
    public async Task<ActionResult<Team>> Create([FromBody] Team team)
    {
        var skapad = await teamService.CreateAsync(team);
        return CreatedAtAction(nameof(GetById), new { id = skapad.Id }, skapad);
    }
}
```

## Operationer

| Vad | Kommando |
|-----|----------|
| Kör API:et | `dotnet run --project MyProject.Api` |
| Kör tester | `dotnet test` |
| Skapa första migrationen | `dotnet ef migrations add InitialCreate --project MyProject.Core --startup-project MyProject.Api` |
| Uppdatera databasen | `dotnet ef database update --project MyProject.Core --startup-project MyProject.Api` |
| Installera EF-verktyget | `dotnet tool install --global dotnet-ef` |

`--project` anger där `DbContext` och migrationerna ligger. `--startup-project` anger det projekt som startas. Utan dem försöker verktyget hitta `DbContext` i fel projekt.

## Jämförelser

| Jämför | Controller | Minimal API |
|--------|------------|-------------|
| Struktur | En klass per resurs i `Controllers/` | Endpoints i `Program.cs` eller i grupper |
| Attribut | `[HttpGet]`, `[Route]` | `app.MapGet(...)` |
| Passar | Större API:er med många resurser | Små API:er och snabba prototyper |

<details markdown="1">
<summary>Alternativ: minimal API</summary>

Utan `--use-controllers` får du minimal API. Endpoints skrivs direkt i `Program.cs`:

```csharp
app.MapGet("/api/teams/{id:int}", async (int id, ITeamService service) =>
{
    var team = await service.GetByIdAsync(id);
    return team is null ? Results.NotFound() : Results.Ok(team);
});
```

</details>

## Vanliga misstag

- **Ingen `[ApiController]`.** Då valideras inte modellen automatiskt, och `[FromBody]` och statuskoder fungerar inte som väntat.
- **Tjänsten inte registrerad.** Felet syns först när controllern anropas: `Unable to resolve service for type ...`. Lägg till den med `AddScoped` i `Program.cs`.
- **`dotnet ef` i fel mapp.** Kör kommandot i solution-mappen med `--project` och `--startup-project`.
- **Swagger syns inte.** Den finns inte i standardmallen. Se [Swagger och Scalar](swagger-scalar.md).
- **Hårdkodad anslutningssträng i kod.** Lägg den i `appsettings.json` eller user secrets.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Controller** | Klass som tar emot HTTP-anrop och returnerar svar |
| **Endpoint** | Kombinationen av HTTP-metod och adress, till exempel `GET api/teams` |
| **REST** | Ett arkitekturmönster där resurser nås via adresser och HTTP-metoder |
| **Dependency Injection** | Ramverket skickar in tjänster till klassens konstruktor |
| **Scoped** | Livslängd för en tjänst: en instans per HTTP-anrop |
| **Migration** | Ett versionerat steg som ändrar databasens struktur |
| **ActionResult** | Svarstypen för en controller-metod, med statuskod och data |
