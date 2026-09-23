---
title: Claude Code
description: "Claude Code i AI-modeller — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: AI-modeller
nav_order: 30
---
# Claude Code

Claude Code är ett CLI-verktyg från Anthropic som kör Claude direkt i din terminal. Det kan läsa, skriva och köra filer i ditt projekt — inte bara svara på frågor.

## Vad är det?

Vanliga AI-chattar ser inte din kod om du inte klistrar in den. Claude Code ser hela din kodbas, kan redigera filer, köra git-kommandon och förstå projektstrukturen.

```
Du: Läs alla cs-filer i src/ och berätta vilka klasser som saknar tester
Claude Code: [läser 23 filer] Dessa 4 klasser saknar tester: OrderService, ...
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
Du: Skapa en IRepository<T> med generisk implementation i EF Core
Claude Code: [skapar IRepository.cs och EfRepository.cs, uppdaterar Program.cs]
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
