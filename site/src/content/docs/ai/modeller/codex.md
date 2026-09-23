---
title: Codex och kodnings-AI
description: "Codex och kodnings-AI i AI-modeller — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: AI-modeller
nav_order: 50
---
# Codex och kodnings-AI

OpenAI Codex var den första specialiserade kodnings-AI:n — tränad specifikt på kod. Den drev GitHub Copilot och inspirerade en generation av AI-kodningsverktyg. Numera är kodförmågan inbyggd i GPT-4.

## Vad är Codex?

Codex var en variant av GPT tränad på GitHub-kod. Den var exceptionellt bra på:
- Omvandla naturligt språk till kod
- Komplettera kod-snippets
- Förklara befintlig kod
- Generera tester

**Status 2024:** Codex API är nedlagt — GPT-4o och GPT-4 har samma förmåga inbyggt.

## Kodnings-AI-verktyg 2024

| Verktyg | Baserat på | Integreras i |
|---------|-----------|-------------|
| GitHub Copilot | GPT-4, Claude | VS Code, Visual Studio, JetBrains |
| Cursor | GPT-4, Claude | Egen IDE (fork av VS Code) |
| JetBrains AI | Multiple | Rider, IntelliJ |
| Tabnine | Egna modeller | VS Code, Visual Studio |
| Codeium | Egna modeller | VS Code — gratis |

## GitHub Copilot — den vanligaste

GitHub Copilot är det mest använda AI-kodningsverktyget för professionella utvecklare.

**Vad det gör:**
- Kompletterar kod i realtid medan du skriver
- Genererar hela metoder från kommentarer
- Chat i IDE:n — ställ frågor om din kod
- Förklarar kod, skriver tester

**Komma igång:**
1. Installera GitHub Copilot-tillägget i VS Code
2. Logga in med GitHub-konto (30 dagar gratis, sedan betalt)
3. Börja koda — förslagen dyker upp automatiskt

## Koda med AI-assistans — rätt mindset

```csharp
// Du skriver en kommentar:
// Skapa en metod som validerar ett e-postformat

// Copilot föreslår:
public bool ÄrGiltigEmail(string email)
{
    return Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
}
```

Granska alltid förslaget: stämmer regex:en? Fungerar den för edge cases? Du är ansvarig för koden — inte Copilot.
