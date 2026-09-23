---
title: OpenAI API (ChatGPT)
description: "OpenAI API (ChatGPT) i AI-API — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: AI-API
nav_order: 20
---
# OpenAI API — anropa GPT från C#

OpenAIs Chat Completions API är det vanligaste AI-API:et. Det används av ChatGPT, GitHub Copilot och tusentals applikationer.

## Förutsättningar

1. API-nyckel från platform.openai.com
2. Nyckeln i miljövariabel: `OPENAI_API_KEY`

## Grundläggande anrop

```csharp
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;

public class OpenAiKlient
{
    private readonly HttpClient _http;
    private readonly string     _apiKey;
    private const    string     ApiUrl  = "https://api.openai.com/v1/chat/completions";
    private const    string     Modell  = "gpt-4o";

    public OpenAiKlient(string apiKey)
    {
        _apiKey = apiKey;
        _http   = new HttpClient();
        _http.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
    }

    public async Task<string> FrågaAsync(string fråga, string systemPrompt = "")
    {
        var meddelanden = new List<object>();

        if (!string.IsNullOrEmpty(systemPrompt))
            meddelanden.Add(new { role = "system", content = systemPrompt });

        meddelanden.Add(new { role = "user", content = fråga });

        var request = new
        {
            model       = Modell,
            max_tokens  = 1024,
            messages    = meddelanden
        };

        var response = await _http.PostAsJsonAsync(ApiUrl, request);
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        var doc  = JsonDocument.Parse(json);

        return doc.RootElement
                  .GetProperty("choices")[0]
                  .GetProperty("message")
                  .GetProperty("content")
                  .GetString() ?? "";
    }
}
```

## Använda klienten

```csharp
var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY")
    ?? throw new InvalidOperationException("OPENAI_API_KEY saknas");

var gpt = new OpenAiKlient(apiKey);

string svar = await gpt.FrågaAsync(
    fråga:        "Förklara skillnaden mellan value types och reference types i C#",
    systemPrompt: "Du är en C#-lärare. Svara kortfattat på svenska."
);

Console.WriteLine(svar);
```

## Skillnader mot Anthropic API

| | OpenAI | Anthropic |
|--|--------|-----------|
| System prompt | Eget `role: "system"`-meddelande | Separat `system`-fält |
| Svar | `choices[0].message.content` | `content[0].text` |
| Auth | `Authorization: Bearer KEY` | `x-api-key: KEY` |
| Version-header | Ej nödvändig | `anthropic-version` krävs |

Logiken är densamma — bara strukturen på JSON skiljer.

## NuGet — officiell klient

OpenAI har ett officiellt NuGet-paket som förenklar anrop:

```bash
dotnet add package OpenAI
```

```csharp
using OpenAI;
using OpenAI.Chat;

var client = new ChatClient("gpt-4o", apiKey);
var svar   = await client.CompleteChatAsync("Förklara async/await");

Console.WriteLine(svar.Value.Content[0].Text);
```

Eget `HttpClient`-anrop är bra för att förstå protokollet — i produktion är paketet bekvämare.
