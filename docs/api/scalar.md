---
title: Scalar och OpenAPI
description: "Scalar och OpenAPI i APIer — C#-boken av Marcus Ackre Medina"
parent: APIer
nav_order: 10
---

# Scalar och OpenAPI

Du bygger ett API. Någon annan ska använda det — kanske en kollega, kanske en frontend-utvecklare, kanske du själv om tre månader.

```http
GET /api/produkter/42
```

Vad returnerar den? Vad händer om 42 inte finns? Vilka statuskoder kan komma? Utan dokumentation: en lång Slack-tråd. Med OpenAPI: en interaktiv webbsida som svarar på allt.

## Vad är OpenAPI?

OpenAPI är ett öppet format för att beskriva REST API:er. Det är en JSON- eller YAML-fil som specificerar exakt vilka endpoints som finns, vad de tar emot och returnerar, och vilka HTTP-statuskoder som kan komma.

```json
{
  "paths": {
    "/api/produkter/{id}": {
      "get": {
        "summary": "Hämta en produkt på ID",
        "responses": { "200": {...}, "404": {...} }
      }
    }
  }
}
```

Verktyg som **Scalar** renderar den filen som en interaktiv dokumentationssida.

## Swagger UI vs Scalar

| | Swagger UI (Swashbuckle) | Scalar |
|--|--|--|
| Status | Äldre, underhålls sämre | Aktivt underhållet |
| .NET 9 | Inte inbyggt | Microsofts rekommendation |
| Utseende | Klassiskt | Modernt, dark mode |
| Setup | Eget NuGet + konfiguration | Ett NuGet, tre rader |
| Finns i äldre projekt | Vanligt | Sällsynt |

Lär dig båda — Scalar för ny kod, Swagger UI för att förstå äldre projekt.

## Setup — tre rader

```bash
dotnet add package Scalar.AspNetCore
```

```csharp
// Program.cs
builder.Services.AddOpenApi();       // inbyggt i .NET 9 — ingen extra NuGet

var app = builder.Build();

app.MapOpenApi();                    // /openapi/v1.json
app.MapScalarApiReference();         // /scalar/v1
```

Starta appen och öppna `http://localhost:5000/scalar/v1`. Det är allt.

## Dokumentera dina endpoints

Utan dokumentation visar Scalar bara URL:en:

```csharp
app.MapGet("/api/produkter/{id}", (int id) => ...);
```

Med dokumentation visar Scalar allt — beskrivning, parametrar, response-schema:

```csharp
app.MapGet("/api/produkter/{id}", (int id) =>
{
    var p = produkter.FirstOrDefault(p => p.Id == id);
    return p is null ? Results.NotFound() : Results.Ok(p);
})
.WithName("HamtaProdukt")
.WithTags("Produkter")                // grupperingslabel i UI
.WithSummary("Hämta en produkt")      // kort beskrivning
.Produces<Produkt>(200)               // visar response-schemat
.Produces(404);                       // dokumenterar felfall
```

### Vad de olika metoderna gör

| Metod | Vad Scalar visar |
|-------|-----------------|
| `.WithTags("X")` | Grupperar endpoints under rubriken X |
| `.WithSummary("...")` | Kort beskrivning bredvid endpoint-namnet |
| `.WithDescription("...")` | Längre förklaring i expanderat läge |
| `.Produces<T>(200)` | Response-schema med alla fält och typer |
| `.Produces(404)` | Dokumenterar felkod utan schema |
| `.WithName("X")` | Unikt namn — används vid länkning och kodgenerering |

## Komplett exempel

```csharp
var produkter = new List<Produkt>
{
    new(1, "Laptop", 12999),
    new(2, "Mus", 299)
};

app.MapGet("/api/produkter", () => Results.Ok(produkter))
    .WithTags("Produkter")
    .WithSummary("Hämta alla produkter")
    .Produces<List<Produkt>>(200);

app.MapGet("/api/produkter/{id}", (int id) =>
{
    var p = produkter.FirstOrDefault(p => p.Id == id);
    return p is null ? Results.NotFound() : Results.Ok(p);
})
.WithTags("Produkter")
.WithSummary("Hämta en produkt på ID")
.Produces<Produkt>(200)
.Produces(404);

record Produkt(int Id, string Namn, decimal Pris);
```

## Development eller alltid?

Internt API som bara ni använder — visa bara i Development:

```csharp
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
```

Publikt API där konsumenter ska kunna läsa dokumentationen — visa alltid (men skydda med autentisering vid behov):

```csharp
app.MapOpenApi();
app.MapScalarApiReference();
```

## URL-översikt

| Vad | URL |
|-----|-----|
| Scalar UI | `/scalar/v1` |
| OpenAPI-spec (JSON) | `/openapi/v1.json` |
| Swagger UI (om Swashbuckle) | `/swagger` |
| OpenAPI-spec (Swashbuckle) | `/swagger/v1/swagger.json` |

OpenAPI JSON-filen kan du importera i **Postman** för att testa alla endpoints direkt, eller använda för att generera klientkod med verktyg som Kiota eller NSwag.

## Swashbuckle — i äldre projekt

Du kommer stöta på **Swashbuckle** i äldre kodbasers och tutorials — det var standardverktyget i .NET 8 och tidigare. Se [Swagger och Swashbuckle](swagger) för hur det fungerar.
