---
title: Microservices
description: "Istället för en stor applikation som gör allt, delar en microservice-arkitektur upp systemet i flera små, oberoende tjänster som pratar med varandra via API:er."
parent: APIer
nav_order: 7
---

# Microservices

Allt du byggt hittills i den här boken är en **monolit** — en enda applikation som innehåller all logik: användarhantering, beställningar, betalningar, allt i samma kodbas, samma process, samma deploy. Det fungerar bra länge, men blir svårare att hantera ju större systemet växer.

**Microservices** är motsatsen: systemet delas upp i flera små, oberoende tjänster — varje med sitt eget ansvar, sin egen databas, och sin egen livscykel. De pratar med varandra via API:er, oftast [REST](rest.md) eller meddelandeköer.

## Monolit vs microservices

```
Monolit:                          Microservices:

┌─────────────────────┐          ┌──────────┐  ┌──────────┐
│                      │          │ Användare│  │Beställning│
│   En applikation     │          │  -tjänst │  │ -tjänst   │
│   Allt i samma       │          └────┬─────┘  └────┬─────┘
│   process/databas    │               │  REST-API   │
│                      │          ┌────┴─────┐  ┌────┴─────┐
└─────────────────────┘          │Egen databas│  │Egen databas│
                                   └──────────┘  └──────────┘
```

| | Monolit | Microservices |
|---|---|---|
| Deploy | En enhet, allt eller inget | Varje tjänst separat |
| Skalning | Skala hela applikationen | Skala bara den tjänst som behöver det |
| Teamstorlek | Fungerar bra för ett team | Passar flera team som äger olika tjänster |
| Komplexitet | Enkel att förstå och köra lokalt | Nätverksanrop, fler rörliga delar, svårare felsökning |
| Databas | En delad databas | Varje tjänst äger sin egen data |

## Ett konkret exempel

Tänk dig en webbshop uppdelad i tre tjänster:

```csharp
// UserService — ansvarar bara för användare och inloggning
[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    [HttpGet("{id}")]
    public IActionResult GetUser(int id) { /* ... */ }
}
```

```csharp
// OrderService — ansvarar bara för beställningar
[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
    private readonly HttpClient _userServiceClient;

    [HttpPost]
    public async Task<IActionResult> CreateOrder(OrderRequest request)
    {
        // Frågar UserService via HTTP — inte en delad databas
        var user = await _userServiceClient.GetFromJsonAsync<UserDto>(
            $"http://userservice/api/users/{request.UserId}");

        if (user is null)
            return BadRequest("Okänd användare");

        // ... skapa beställningen ...
        return Ok();
    }
}
```

`OrderService` känner inte till hur `UserService` lagrar sina användare internt — den frågar bara via ett HTTP-anrop, precis som den skulle fråga någon annans publika API. Det är samma [Dependency Inversion](../designmonster/repository-dependency-inversion.md)-tänk som inom en enda applikation, bara flyttat till nätverksnivå: bero på ett kontrakt (API:et), inte på implementationen bakom det.

## Varför inte bara börja med microservices?

Det låter mer skalbart, men priset betalas direkt: nätverksanrop kan misslyckas på sätt ett vanligt metodanrop aldrig gör (tidsgränser, tillfälligt nedkopplad tjänst), det är svårare att testa hela flödet lokalt, och att hålla flera databaser konsekventa med varandra är ett helt eget problem (se [ACID och transaktioner](../sql/transaktioner.md) för vad du normalt får gratis i en delad databas, och som microservices måste lösa manuellt).

Tumregeln de flesta erfarna utvecklare landar på: **börja med en monolit.** Dela upp den i microservices först när du faktiskt känner smärtan av att den är en enda enhet — olika delar som behöver skalas olika mycket, olika team som krockar i samma kodbas. Att dela upp för tidigt kostar komplexitet du inte har nytta av än.

## Obligatorisk dad-joke

Varför gick microservicen i terapi ensam, utan de andra tjänsterna?

Den ville inte dela databas med sina problem.
