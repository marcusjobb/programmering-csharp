---
title: Claude Code
description: "Claude Code är ett CLI-verktyg från Anthropic som kör Claude direkt i din terminal. Det kan läsa, skriva och köra filer i ditt projekt — inte bara svara…"
parent: AI-modeller
nav_order: 30
---
# Claude Code

Claude Code är ett CLI-verktyg från Anthropic som kör Claude direkt i din terminal. Det kan läsa, skriva och köra filer i ditt projekt — inte bara svara på frågor.

## Vad är det?

Vanliga AI-chattar ser inte din kod om du inte klistrar in den. Claude Code ser hela din kodbas, kan redigera filer, köra git-kommandon och förstå projektstrukturen.

```
Du: Read all cs-files i src/ och tell which classes as lacks tester
Claude Code: [reads 23 files] These 4 classes lacks tester: OrderService, ...
```

## Installera

```bash
npm install -g @anthropic-ai/claude-code
```

Kräver Node.js och ett Anthropic-konto med API-nyckel.

## Vad det kan göra

- Läsa och skriva filer i projektet
- Köra kommandon i terminalen (git, dotnet, npm)
- Refaktorera kod över flera filer
- Skriva tester
- Debugga med tillgång till faktisk kod och körning

## Exempel — skapa en klass

```
Du: Create en IRepository<T> med generic implementation i EF Core
Claude Code: [creates IRepository.cs och EfRepository.cs, updates Program.cs]
```

## Jämförelse med ChatGPT/Claude webb

| | Claude Code | Webb-chat |
|--|-------------|-----------|
| Ser din kod | Ja | Nej (du klistrar in) |
| Redigerar filer | Ja | Nej |
| Kör kommandon | Ja | Nej |
| Pris | Per API-token | Prenumeration |

## För studerande

Claude Code är ett kraftfullt verktyg — men kom ihåg: du ansvarar för koden. Förstå vad det genererar innan du accepterar det.
