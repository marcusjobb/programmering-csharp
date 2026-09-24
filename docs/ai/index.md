---
title: AI
description: "AI-verktyg har förändrat hur vi skriver kod. Som programmerare möter du AI i tre roller: som assistent (hjälper dig koda), som API (du anropar ett AI i…"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: C# bok
nav_order: 150
has_children: true
---
# AI — Artificiell intelligens för utvecklare

AI-verktyg har förändrat hur vi skriver kod. Som programmerare möter du AI i tre roller: som **assistent** (hjälper dig koda), som **API** (du anropar ett AI i din applikation), och som **plattform** (du bygger AI-drivna tjänster).

## Vad finns i detta avsnitt?

| Sektion | Innehåll |
|---------|----------|
| [AI-modeller](modeller/) | Översikt av Claude, ChatGPT, Gemini, Codex — vad de är och skiljer sig åt |
| [Prompting](prompting/) | Hur du kommunicerar effektivt med AI |
| [AI-API](ai-api/) | Anropa AI:er programmatiskt från C# |
| [Exempel](exempel/) | Chatbot, kodgenerator, beslutshjälpare |

## Varför är detta relevant för en C#-utvecklare?

- AI-API:er anropas med `HttpClient` — samma mönster som alla REST-API:er
- Svar är JSON — du deserialiserar precis som vanligt
- Promptdesign är en professionell skill i moderna utvecklingsteam
- Många företag bygger AI-drivna funktioner i sina applikationer just nu

## Den viktigaste principen

AI genererar kod som ser korrekt ut men kan vara fel. Din uppgift som utvecklare är att:
1. Förstå koden som genereras
2. Verifiera att den gör vad den ska
3. Kunna förklara varje rad

AI är ett verktyg — du är fortfarande den som ansvarar för koden.
