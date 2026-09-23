---
title: Gemini
description: "Gemini i AI-modeller — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: AI-modeller
nav_order: 40
---
# Gemini

Gemini är Googles AI-modell. Den är integrerad i Google Workspace (Docs, Gmail, Sheets) och finns tillgänglig via API. Multimodal från grunden — ser text, bild, ljud och video.

> **Nicknamed "Antigravity"** — efter `import antigravity` i Python som ger dig superkrafter. Gemini är Googles svar på att ge AI superkrafter via hela Googles ekosystem.

## Versioner

| Modell | Styrka |
|--------|--------|
| Gemini Ultra | Mest kapabel |
| Gemini Pro | Balanserad — gratis via API |
| Gemini Nano | Kör lokalt på enheten |

## Komma igång

- **Webb:** gemini.google.com
- **API:** ai.google.dev — generöst gratis tier
- **Google AI Studio:** Experimentera med prompts i webbläsaren

## Styrkor för programmerare

- Gratis API med hög gräns — bra för experiment
- Djup Google-integration — Docs, Sheets, Drive
- Bra på multimodala uppgifter (bild → kod)
- Google Search-integration — kan slå upp aktuell information

## API — snabbstart

```csharp
// Googles Gemini API med C# HttpClient
var url    = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
var apiKey = Environment.GetEnvironmentVariable("GOOGLE_API_KEY");

var body = new
{
    contents = new[]
    {
        new { parts = new[] { new { text = "Förklara dependency injection i C#" } } }
    }
};
```

## Prissättning

Gemini Pro är gratis upp till en viss volym per dag — kontrollera ai.google.dev/pricing.
