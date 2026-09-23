---
title: Claude
description: "Claude i AI-modeller — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: AI-modeller
nav_order: 10
---
# Claude

Claude är Anthropics AI-assistent. Den är känd för lång kontext, noggrant resonemang och att följa instruktioner väl. Som programmeringsassistent förklarar den sin kod och erkänner när den är osäker.

## Versioner

| Modell | Styrka | Användning |
|--------|--------|-----------|
| Claude Opus | Mest kapabel, djupare resonemang | Komplexa arkitekturbeslut |
| Claude Sonnet | Balans mellan kapabilitet och hastighet | Vardaglig kodning |
| Claude Haiku | Snabb och billig | Enkel textbearbetning, hög volym |

## Komma igång

- **Webb:** claude.ai — kräver konto, gratisversion finns
- **API:** api.anthropic.com — betalt, per token
- **Claude Code:** CLI-verktyg som körs direkt i terminalen

## Styrkor för programmerare

- Förklarar kod på begäran — inte bara svar utan resonemang
- Lång kontextfönster — kan hålla hela kodbasen i minnet
- Säkerhetsinriktat — vägrar skriva skadlig kod
- Bra på svenska — fungerar på ditt modersmål

## API — snabbstart

```csharp
// Se AI-API → Anthropic för fullständigt exempel
var client = new AnthropicClient(apiKey);
var svar = await client.FrågaAsync("Förklara async/await i C#");
```

## Prissättning (ungefärlig)

Kontrollera aktuella priser på anthropic.com/pricing — modellpriser ändras.

API debiteras per token (ungefär 750 ord = 1000 tokens).
