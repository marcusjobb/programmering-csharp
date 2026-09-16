---
title: AI-API
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: AI
nav_order: 30
has_children: true
---
# AI-API

Du kan anropa AI-modeller direkt från din C#-applikation via HTTP. Det är samma mönster som alla andra REST-API:er — en POST-förfrågan med JSON-body, ett JSON-svar tillbaka.

## Vad du behöver

1. En API-nyckel från respektive leverantör
2. `HttpClient` i C# (inbyggt, inget NuGet behövs)
3. En klass för att deserialisera svaret

## Leverantörer i detta avsnitt

| Leverantör | Modell | Dokumentation |
|------------|--------|---------------|
| Anthropic | Claude | `api.anthropic.com` |
| OpenAI | GPT-4, GPT-4o | `api.openai.com` |

## Säkerhet — aldrig hårdkoda API-nycklar

```csharp
// Fel — nyckeln syns i koden och i git-historiken
string apiKey = "sk-ant-api03-...";

// Rätt — läs från miljövariabel
string apiKey = Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")
    ?? throw new InvalidOperationException("ANTHROPIC_API_KEY saknas");
```

Lägg nyckeln i en miljövariabel eller använd `dotnet user-secrets` under utveckling.
