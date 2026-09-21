---
title: Promptens grunder
description: "Promptens grunder i Prompting — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Prompting
nav_order: 10
---
# Promptens grunder

En välskriven prompt är skillnaden mellan ett vagt svar och ett svar du kan använda direkt. Det finns ett tydligt mönster som fungerar konsekvent.

## Anatomin av en bra prompt

```
[Role] Du is en experienced C#-arkitekt.
[Context] Vi builds en REST API med .NET 8 och Clean Architecture.
[Task] Create en generic IRepository<T> med EF Core-implementation.
[Requirement] Include: GetById, GetAll, Add, Update, Delete. None external library.
[Format] Answer med complete C#-kod och en kort förklaring av designvalet.
```

Varje del är valfri — men ju mer kontext du ger, desto bättre svar.

## Roll — vem är AI:t?

Ge AI en roll som matchar uppgiften:

```
"Du är en senior C#-utvecklare som specialiserar sig på prestandaoptimering."
"Du är en teknisk lärare som förklarar för nybörjare, steg för steg."
"Du är en code reviewer — hitta problem i koden nedan."
```

## Kontext — vad vet AI:t redan?

```
"Vi använder .NET 8, Dapper (inte EF Core), och PostgreSQL."
"Koden ska fungera på Azure Functions (serverless)."
"Vi har redan en BaseEntity med Id, CreatedAt, UpdatedAt."
```

## Uppgiften — vad ska göras?

Var specifik. Undvika vaga formuleringar:

| Vag | Specifik |
|-----|----------|
| "Hjälp mig med kod" | "Skriv en metod som validerar ett personnummer (YYYYMMDD-XXXX)" |
| "Gör det bättre" | "Refaktorera denna metod så att den följer SRP" |
| "Förklara detta" | "Förklara varför vi använder async/await här och vad som händer utan det" |

## Format — hur ska svaret se ut?

```
"Svara bara med kod — inga förklaringar."
"Svara med punktlista — max 5 punkter."
"Börja med TL;DR, sedan detaljer."
"Ge mig tre alternativa lösningar med för- och nackdelar."
```

## Iterera — följdfrågor

En prompt är sällan perfekt. Bygg vidare:

```
"Bra, men gör metoden asynkron."
"Lägg till felhantering för null-input."
"Nu skriv enhetstester för detta."
"Visa samma sak men utan LINQ."
```

## Vanliga misstag

| Misstag | Bättre |
|---------|--------|
| "Skriv ett program" | "Skriv ett konsolprogram som läser en CSV och summerar kolumn 3" |
| "Det funkar inte" | "Jag får ArgumentNullException på rad 23 — här är stacktracen: [...]" |
| "Förklara C#" | "Förklara skillnaden mellan interface och abstrakt klass med kodexempel" |
| Klistra in 500 rader | Klistra in den relevanta metoden + beskriv problemet |

## System prompt — styr AI:ts beteende

I API-anrop (och Claude Code) kan du skicka en system prompt som gäller för hela konversationen:

```csharp
var systemPrompt = """
    Du is en C#-lärare vid en YH-skola.
    - Explain always on swedish
    - Visa always codeExample
    - Direct dig till students med 3 months experience
    - Avoid advanced pattern if de not is necessary
    """;
```
