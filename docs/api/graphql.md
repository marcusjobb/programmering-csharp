---
title: GraphQL
description: "GraphQL är ett frågespråk för API:er, utvecklat av Facebook 2012 och öppen källkod sedan 2015. Till skillnad från REST, som sprider ut resurser på många…"
parent: APIer
nav_order: 2
---
# GraphQL

GraphQL är ett frågespråk för API:er, utvecklat av Facebook 2012 och öppen källkod sedan 2015. Till skillnad från [REST](rest.md), som sprider ut resurser på många URL:er, har GraphQL **en enda endpoint** — och det är klienten, inte servern, som bestämmer exakt vilka fält den vill ha tillbaka.

## När du läst detta ska du kunna

- Förklara skillnaden mellan REST och GraphQL
- Läsa en GraphQL-fråga och förstå vad den returnerar
- Känna till GraphQL injection som säkerhetsrisk

## Problemet GraphQL löser

Med REST är svarets form bestämd av servern. Vill du bara ha en students namn får du ofta hela objektet ändå — **over-fetching**. Behöver du en students namn och alla dennes kurser, kanske det krävs flera anrop till olika endpoints — **under-fetching**.

```
GET /api/students/42          → hela studentobjektet, även fält du inte behöver
GET /api/students/42/courses  → ett till anrop för att få kurserna
```

## Med GraphQL frågar du efter exakt det du vill ha

Klienten skickar en fråga som beskriver precis vilka fält som önskas, i ett enda anrop:

```graphql
query {
  student(id: 42) {
    name
    courses {
      title
    }
  }
}
```

Svaret matchar frågans form exakt:

```json
{
  "data": {
    "student": {
      "name": "Kim Andersson",
      "courses": [
        { "title": "Programmering C#" },
        { "title": "Databaser" }
      ]
    }
  }
}
```

Inga extra fält, inget extra anrop. Allt sker mot **en** endpoint (vanligtvis `/graphql`), oavsett vad frågan handlar om.

## GraphQL injection — samma familj av problem som SQL injection

Precis som [SQL injection](../sql/sql-injection.md) uppstår när användarinput klistras rakt in i en SQL-fråga, kan en GraphQL-resolver bli sårbar om den skickar frågeargument rakt vidare till en databas utan att validera eller parametrisera dem. En resolver som bygger en SQL-sträng av ett GraphQL-argument har exakt samma sårbarhet som vilken annan strängkonkatenerad SQL-fråga som helst — GraphQL i sig skyddar inte mot det.

GraphQL har också sina egna, unika risker:

- **Överdrivet djupa eller breda frågor** — eftersom klienten själv formar frågan kan en illvillig eller ogenomtänkt fråga be om enormt mycket nästlad data (`student { courses { students { courses { ... } } } }`) och överbelasta servern. Åtgärdas med gränser på frågedjup och kostnadsanalys av inkommande frågor.
- **Introspection i produktion** — GraphQL kan per default svara på frågor om sitt eget schema (vilka fält, typer och kopplingar som finns). Praktiskt under utveckling, men bör ofta stängas av i produktion så att API:ets hela struktur inte exponeras för vem som helst.

Grundregeln är densamma som för SQL: **lita aldrig på indata, oavsett vilket lager av arkitekturen den kommer in i.**

## REST eller GraphQL — när väljer man vad?

| Situation | Välj |
|-----------|------|
| Enkelt API, förutsägbara resurser | REST |
| Klienter med väldigt olika databehov (webb, mobil, olika vyer) | GraphQL |
| Behöver caching på HTTP-nivå (CDN, webbläsare) | REST — GraphQL:s enda POST-endpoint gör detta svårare |
| Mycket nästlad, relaterad data i en enda vy | GraphQL |

## TL;DR

GraphQL — utvecklat av Facebook — ger klienten kontroll över exakt vilka fält den vill ha, via en enda endpoint, istället för REST:s många fasta resurs-URL:er. Det löser over-/under-fetching, men introducerar egna säkerhetsfrågor: resolvers som skickar argument rakt till databasen är lika sårbara för injection som handskriven SQL, och obegränsat djupa frågor kan överbelasta servern.
