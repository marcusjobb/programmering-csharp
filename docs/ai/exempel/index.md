---
title: AI-exempel
description: "AI-exempel i AI — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: AI
nav_order: 40
has_children: true
---
# AI-exempel

Tre konkreta applikationer som visar hur du integrerar AI i C#-program. Alla bygger på samma mönster — `HttpClient` + JSON — men löser olika problem.

## Vad ingår

| Exempel | Vad det gör |
|---------|-------------|
| [Chatbot](chatbot/) | En konversationslopp i konsolen — skickar historik med varje anrop |
| [Coder](coder/) | Skickar in en uppgiftsbeskrivning, får tillbaka C#-kod |
| [Decision helper](decision/) | Tar emot flera inputs, ber AI analysera och presenterar rekommendation |

## Mönstret som upprepas

```csharp
// 1. Bygg request-objektet med systemPrompt + användarens meddelande
// 2. Serialisera till JSON
// 3. POST till AI-API:et med ApiKey i headern
// 4. Deserialisera svaret
// 5. Visa texten för användaren
```

Alla tre exempel följer detta mönster — lär dig ett, förstår du alla.
