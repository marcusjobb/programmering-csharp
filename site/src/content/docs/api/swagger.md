---
title: Swagger och Swashbuckle
description: "Swagger och Swashbuckle i APIer — C#-boken av Marcus Ackre Medina"
parent: APIer
nav_order: 20
---

# Swagger och Swashbuckle

Innan Scalar fanns **Swagger UI** via paketet **Swashbuckle.AspNetCore**. Det är fortfarande vanligt i äldre .NET-projekt och tutorials — och du kommer stöta på det i arbetslivet. Det är värt att förstå hur det fungerar.

## Varför Swashbuckle fortfarande är relevant

- Standardverktyg i .NET 8 och tidigare
- Mängder av tutorials och StackOverflow-svar refererar till det
- Finns i befintliga projekt du kommer ta över
- Fungerar fortfarande — det är inte trasigt, bara inte längre förstahandsvalet

## Setup

```bash
dotnet add package Swashbuckle.AspNetCore
```

```csharp
// Program.cs
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();       // genererar /swagger/v1/swagger.json
app.UseSwaggerUI();     // öppnar UI på /swagger
```

Starta appen och öppna `http://localhost:5000/swagger`.

## URL-struktur

| Vad | URL |
|-----|-----|
| Swagger UI | `/swagger` |
| OpenAPI-spec (JSON) | `/swagger/v1/swagger.json` |

## Dokumentera endpoints med Swashbuckle

I minimal API-stil fungerar samma `.WithSummary()`, `.WithTags()` och `.Produces<T>()` som med Scalar — Swashbuckle läser dem på samma sätt:

```csharp
app.MapGet("/api/produkter/{id}", (int id) =>
{
    var p = products.FirstOrDefault(p => p.Id == id);
    return p is null ? Results.NotFound() : Results.Ok(p);
})
.WithTags("Produkter")
.WithSummary("Hämta en produkt på ID")
.Produces<Product>(200)
.Produces(404);
```

I controller-stil används XML-kommentarer:

```csharp
/// <summary>
/// Hämtar en produkt på ID.
/// </summary>
/// <param name="id">Produktens ID</param>
/// <returns>Produkten, eller 404 om den inte finns</returns>
[HttpGet("{id}")]
[ProducesResponseType(typeof(Product), 200)]
[ProducesResponseType(404)]
public IActionResult Get(int id) { ... }
```

För att XML-kommentarerna ska synas i Swagger UI behöver du aktivera XML-dokumentation i `.csproj` och konfigurera Swashbuckle att läsa den.

## Swagger UI vs Scalar

| | Swagger UI (Swashbuckle) | Scalar |
|--|--|--|
| .NET 9 | Inte inbyggt | Microsofts rekommendation |
| Utseende | Klassiskt | Modernt, dark mode |
| Setup | Tre NuGet-rader + konfiguration | Ett NuGet, tre rader |
| Legacy-projekt | Vanligt | Sällsynt |

**Tumregel:** Scalar för ny kod, Swashbuckle för att förstå och underhålla befintliga projekt.

## Importera spec i Postman

Båda verktygen genererar en OpenAPI JSON-fil som du kan importera i Postman:

1. Öppna Postman → **Import**
2. Klistra in URL:en till JSON-filen: `http://localhost:5000/swagger/v1/swagger.json`
3. Postman skapar en komplett collection med alla endpoints

Det är ett snabbt sätt att börja testa ett API du inte byggt själv.
