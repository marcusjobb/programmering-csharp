---
title: Testa dig själv
parent: APIer
nav_order: 99
---

# Testa dig själv — APIer

1. Vad är skillnaden mellan OpenAPI-specen och Scalar UI?

<details>
<summary>Visa svar</summary>

OpenAPI-specen är en JSON- eller YAML-fil som beskriver API:et maskinläsbart (`/openapi/v1.json`). Scalar UI är en webbsida som läser den filen och renderar den som en interaktiv dokumentationssida för människor. Specen är rådata — Scalar är visualiseringen.

</details>

2. Varför ska man använda `.Produces<Produkt>(200)` istället för bara `.Produces(200)`?

<details>
<summary>Visa svar</summary>

`.Produces<T>(200)` berättar för Scalar vilket schema response-objektet har — alla fält, typer och struktur visas i dokumentationen. `.Produces(200)` säger bara att statuskoden 200 kan komma, utan information om vad som returneras. Den generiska varianten ger konsumenten av API:et full information.

</details>

3. Du vill att Scalar bara visas när appen körs lokalt, inte i produktion. Hur gör du det?

<details>
<summary>Visa svar</summary>

```csharp
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
```

I produktion med miljövariabeln `ASPNETCORE_ENVIRONMENT=Production` är `IsDevelopment()` false och Scalar-sidan exponeras inte.

</details>

4. Vad är skillnaden mellan Swashbuckle och Scalar — och när väljer du vilket?

<details>
<summary>Visa svar</summary>

Swashbuckle (Swagger UI) var standardverktyget i .NET 8 och äldre och är fortfarande vanligt i befintliga projekt. Scalar är Microsofts rekommendation från .NET 9 — enklare setup, modernare utseende och aktivt underhållet.

Tumregel: Scalar för ny kod, Swashbuckle för att förstå och underhålla äldre projekt.

</details>

5. Du har en endpoint `GET /api/order/{id}` som kan returnera 200, 404 och 401. Hur dokumenterar du alla tre statuskoderna?

<details>
<summary>Visa svar</summary>

```csharp
app.MapGet("/api/order/{id}", (int id) => ...)
    .WithTags("Order")
    .WithSummary("Hämta en order på ID")
    .Produces<Order>(200)
    .Produces(404)
    .Produces(401);
```

200 dokumenteras med schema (vi vet vad som returneras), 404 och 401 utan schema (bara statuskod).

</details>

6. Var hittar du OpenAPI-specen som JSON, och vad kan du göra med den?

<details>
<summary>Visa svar</summary>

Med Scalar: `/openapi/v1.json`  
Med Swashbuckle: `/swagger/v1/swagger.json`

Du kan:
- Importera i **Postman** för att testa alla endpoints direkt
- Generera klientkod med **Kiota** eller **NSwag**
- Validera mot API-kontraktet i en CI/CD-pipeline
- Dela med frontend-teamet som underlag för integration

</details>
