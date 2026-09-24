---
title: REST
description: "REST (Representational State Transfer) är den arkitekturstil de flesta moderna webb-API:er bygger på. Det är inte ett protokoll eller ett bibliotek — det…"
parent: APIer
nav_order: 1
---
# REST

REST (Representational State Transfer) är den arkitekturstil de flesta moderna webb-API:er bygger på. Det är inte ett protokoll eller ett bibliotek — det är en samling principer för hur ett API bör vara strukturerat, byggt ovanpå vanlig HTTP.

## När du läst detta ska du kunna

- Förklara vad som gör ett API "RESTful"
- Använda rätt HTTP-verb för rätt operation
- Läsa och tolka en REST-URL och dess statuskod

## Allt är en resurs

I REST modellerar du API:et kring **resurser** — substantiv, inte handlingar. En "student", en "produkt", en "bokning". Varje resurs har en egen URL:

```
GET /api/students          → alla studenter
GET /api/students/42       → studenten med id 42
POST /api/students         → skapa en ny student
PUT /api/students/42       → uppdatera studenten med id 42
DELETE /api/students/42    → ta bort studenten med id 42
```

Lägg märke till att URL:en aldrig innehåller ett verb som "hämta" eller "skapa" — det är **HTTP-metoden** (GET, POST, PUT, DELETE) som talar om vilken handling som ska utföras på resursen.

## HTTP-verben och vad de betyder

| Verb | Betydelse | Idempotent? |
|------|-----------|-------------|
| `GET` | Hämta data, ändrar ingenting | Ja |
| `POST` | Skapa något nytt | Nej |
| `PUT` | Ersätt en resurs helt | Ja |
| `PATCH` | Uppdatera delar av en resurs | Nej |
| `DELETE` | Ta bort en resurs | Ja |

**Idempotent** betyder att du kan köra samma anrop flera gånger utan att resultatet blir annorlunda efter första gången. Skickar du samma `PUT`-anrop tre gånger blir slutresultatet detsamma som om du skickat det en gång. Skickar du samma `POST`-anrop tre gånger skapar du tre nya resurser.

## Statuskoder — svaret berättar vad som hände

Ett REST-API svarar med en HTTP-statuskod som talar om resultatet utan att du behöver läsa hela svarskroppen:

| Kod | Betyder |
|-----|---------|
| `200 OK` | Lyckades |
| `201 Created` | Ny resurs skapad (svar på POST) |
| `204 No Content` | Lyckades, inget att returnera (vanligt för DELETE) |
| `400 Bad Request` | Förfrågan var felaktigt formad |
| `401 Unauthorized` | Du måste logga in |
| `404 Not Found` | Resursen finns inte |
| `500 Internal Server Error` | Något gick sönder på servern |

## Ett minimalt exempel i ASP.NET Core

```csharp
[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    [HttpGet("{id}")]
    public ActionResult<Student> Get(int id)
    {
        var student = _repository.Find(id);
        return student is null ? NotFound() : Ok(student);
    }

    [HttpPost]
    public ActionResult<Student> Create(Student student)
    {
        _repository.Add(student);
        return CreatedAtAction(nameof(Get), new { id = student.Id }, student);
    }
}
```

`[HttpGet]`, `[HttpPost]` osv. kopplar metoden till rätt HTTP-verb. `NotFound()`, `Ok()` och `CreatedAtAction()` returnerar rätt statuskod automatiskt.

## Statslöst (stateless)

Varje REST-anrop ska innehålla all information servern behöver för att förstå det — servern sparar inget "minne" av tidigare anrop från samma klient. Inloggningsstatus, om det behövs, skickas med i varje anrop (t.ex. som en token i en header), inte via en session servern håller reda på mellan anropen. Det gör REST-API:er enkla att skala — vilken server som helst i en pool kan svara på nästa anrop, eftersom ingen server "äger" en specifik klients tillstånd.

## TL;DR

REST bygger API:er kring resurser (substantiv) och HTTP-verb (verb) — `GET /students/42` istället för `/getStudent?id=42`. Statuskoder berättar utfallet, och varje anrop är självständigt (statslöst). Se även [GraphQL](graphql.md) och [SOAP](soap.md) för alternativa sätt att strukturera API-kommunikation.
