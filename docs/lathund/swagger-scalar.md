---
title: "Lathund: Swagger och Scalar"
description: "Dokumentation och testning av ett ASP.NET Core-API med Swagger UI eller Scalar: paket, Program.cs, endpoint-attribut, typade svar och JWT."
parent: Lathund
nav_order: 121
---
# Lathund: Swagger och Scalar

Swagger UI och Scalar visar en webbsida där du kan se alla endpoints i ett API och testa dem direkt i webbläsaren. Båda läser en OpenAPI-beskrivning av API:et. Den skapas automatiskt av ASP.NET Core.

Läs mer: [API](../api/index.md).

## Snabbfakta

| Verktyg | Paket | Adress | Kommentar |
|---------|-------|--------|-----------|
| OpenAPI (inbyggd) | Ingen, ingår i ASP.NET Core 9 och senare | `/openapi/v1.json` | Själva beskrivningen, i JSON |
| Scalar | `Scalar.AspNetCore` | `/scalar/v1` | Modern gränssnitt, använder den inbyggda OpenAPI-beskrivningen |
| Swagger UI | `Swashbuckle.AspNetCore` | `/swagger` | Klassiskt gränssnitt, paketet är ett tredjepartspaket |

Den inbyggda OpenAPI-beskrivningen finns redan i projektmallen för ASP.NET Core. Du behöver bara ett gränssnitt ovanpå den.

## Installation

```bash
dotnet add package Scalar.AspNetCore
```

<details markdown="1">
<summary>Alternativ: Swagger UI</summary>

```bash
dotnet add package Swashbuckle.AspNetCore
```

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ...

app.UseSwagger();
app.UseSwaggerUI();
```

Swagger UI visas på `/swagger`. Den klassiska beskrivningen hämtas från `/swagger/v1/swagger.json`.

</details>

## Program.cs

```csharp
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Beskrivningen av API:et, syns i gränssnittet
builder.Services.AddOpenApi("v1", options =>
{
    options.AddDocumentTransformer((document, context, ct) =>
    {
        document.Info.Title = "Mitt API";
        document.Info.Version = "v1";
        document.Info.Description = "Beskrivning av API:et";
        return Task.CompletedTask;
    });
});

var app = builder.Build();

// Visas bara i utvecklingsmiljön
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.MapControllers();
app.Run();
```

## Dokumentera endpoints

Minimal API:

```csharp
var items = app.MapGroup("/api/items")
    .WithTags("Items");              // Grupp i gränssnittet

items.MapGet("/{id:int}", (int id) => ...)
    .WithName("GetItem")             // Unikt operationsnamn
    .WithSummary("Hämtar en artikel") // Kort text i listan
    .WithDescription("Returnerar en artikel med angivet id.");
```

Controller: lägg till XML-kommentarer på metoden. Aktivera dem i `.csproj` med `<GenerateDocumentationFile>true</GenerateDocumentationFile>`.

```csharp
/// <summary>Hämtar ett team</summary>
/// <param name="id">Teamets id</param>
[HttpGet("{id}")]
[ProducesResponseType<Team>(StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
public async Task<ActionResult<Team>> GetById(int id) => ...;
```

## Svar och typer

Typade resultat låter dokumentationen visa rätt svarstyp automatiskt:

```csharp
app.MapGet("/api/items/{id:int}",
    async Task<Results<Ok<Item>, NotFound>> (int id, IItemRepository repo) =>
{
    var item = await repo.GetByIdAsync(id);
    return item is null
        ? TypedResults.NotFound()
        : TypedResults.Ok(item);
});
```

## Vanliga adresser

| Adress | Visar |
|--------|-------|
| `/openapi/v1.json` | OpenAPI-beskrivningen, till exempel för import i Postman |
| `/scalar/v1` | Scalar |
| `/swagger` | Swagger UI, om Swashbuckle är installerat |

## Operationer

| Vad | Kod |
|-----|-----|
| Dölj en endpoint | `.ExcludeFromDescription()` |
| Kräv inloggning | `.RequireAuthorization()`. Låset visas i gränssnittet |
| Läs en header | `[FromHeader(Name = "X-Api-Key")] string apiKey` |
| Läs query-parametrar | `(string? sok, int sida = 1)` ger `?sok=...&sida=2` |

## JWT i Scalar och Swagger

Med Scalar: det finns ett fält för **Bearer token** i gränssnittet. Klistra in token från inloggningen, och alla anrop skickas med den.

Med Swagger UI krävs en säkerhetsdefinition i `AddSwaggerGen`:

```csharp
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Description = "Ange JWT-token"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});
```

## Jämförelser

| Jämför | Skillnad |
|--------|----------|
| Scalar vs Swagger UI | Scalar är modernare och använder den inbyggda beskrivningen. Swagger UI är äldre och kräver ett paket |
| `AddOpenApi` vs `AddSwaggerGen` | `AddOpenApi` skapar beskrivningen inbyggt. `AddSwaggerGen` är Swashbuckles variant |

## Vanliga misstag

- **Sidan hittas inte.** Kontrollera att `MapOpenApi()` och `MapScalarApiReference()` anropas i utvecklingsmiljön, och att adressen är `/scalar/v1`.
- **Endpoints saknas i listan.** Kontrollera att controllern har `[ApiController]` och `[Route]`, eller att `MapGet` anropas.
- **Gränssnittet är tomt.** Kontrollera att dokumentet heter `v1` i både `AddOpenApi` och `MapScalarApiReference`.
- **Dokumentationen i produktion.** Visa den bara i utvecklingsmiljön. Den visar hela API:et för vem som helst.
- **Två paket för samma sak.** Installera bara ett gränssnitt, Scalar eller Swagger UI.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **OpenAPI** | Standard för att beskriva ett HTTP-API i en maskinläsbar fil |
| **Swagger** | Äldre namn på OpenAPI-verktygen, och namnet på Swagger UI |
| **Scalar** | Ett modernt gränssnitt för att läsa och testa ett OpenAPI-API |
| **Endpoint** | En adress och en HTTP-metod, till exempel `GET /api/items` |
| **Schema** | Beskrivning av formen på ett JSON-objekt |
| **Bearer token** | En inloggningstoken som skickas i headern `Authorization` |
