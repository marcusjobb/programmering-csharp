---
title: Anthropic API (Claude)
description: "Anthropics Messages API låter dig integrera Claude i din applikation. Anropet är ett vanligt HTTP POST med JSON."
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: AI-API
nav_order: 10
---
# Anthropic API — anropa Claude från C#

Anthropics Messages API låter dig integrera Claude i din applikation. Anropet är ett vanligt HTTP POST med JSON.

## Förutsättningar

1. API-nyckel från console.anthropic.com
2. Nyckeln i en miljövariabel: `ANTHROPIC_API_KEY`

## Grundläggande anrop

```csharp
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;

public class ClaudeKlient
{
    private readonly HttpClient  _http;
    private readonly string      _apiKey;
    private const    string      ApiUrl  = "https://api.anthropic.com/v1/messages";
    private const    string      Model  = "claude-opus-4-5";

    public ClaudeKlient(string apiKey)
    {
        _apiKey = apiKey;
        _http   = new HttpClient();
    }

    public async Task<string> FrågaAsync(string question, string systemPrompt = "")
    {
        var request = new
        {
            model      = Model,
            max_tokens = 1024,
            system     = systemPrompt,
            messages   = new[]
            {
                new { role = "user", content = question }
            }
        };

        using var req = new HttpRequestMessage(HttpMethod.Post, ApiUrl);
        req.Headers.Add("x-api-key",         _apiKey);
        req.Headers.Add("anthropic-version", "2023-06-01");
        req.Content = JsonContent.Create(request);

        var response = await _http.SendAsync(req);
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        var doc  = JsonDocument.Parse(json);

        return doc.RootElement
                  .GetProperty("content")[0]
                  .GetProperty("text")
                  .GetString() ?? "";
    }
}
```

## Använda klienten

```csharp
var apiKey = Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")
    ?? throw new InvalidOperationException("ANTHROPIC_API_KEY saknas");

var claude = new ClaudeKlient(apiKey);

string answer = await claude.FrågaAsync(
    question:        "Vad är skillnaden mellan List<T> och IEnumerable<T>?",
    systemPrompt: "Du är en C#-lärare. Förklara kortfattat med kodexempel."
);

Console.WriteLine(answer);
```

## Request-strukturen

```json
{
  "model": "claude-opus-4-5",
  "max_tokens": 1024,
  "system": "Du är en hjälpsam assistent.",
  "messages": [
    { "role": "user",      "content": "Hej!" },
    { "role": "assistant", "content": "Hej! Hur kan jag hjälpa dig?" },
    { "role": "user",      "content": "Förklara async/await" }
  ]
}
```

`messages`-arrayen är hela konversationshistoriken. Skicka den med varje anrop för att bibehålla kontext (se Chatbot-exemplet).

## Response-strukturen

```json
{
  "id": "msg_01...",
  "type": "message",
  "role": "assistant",
  "content": [
    { "type": "text", "text": "Svaret från Claude..." }
  ],
  "model": "claude-opus-4-5",
  "usage": {
    "input_tokens":  25,
    "output_tokens": 187
  }
}
```

## Felhantering

```csharp
try
{
    var answer = await claude.FrågaAsync(question);
    Console.WriteLine(answer);
}
catch (HttpRequestException ex) when (ex.StatusCode == System.Net.HttpStatusCode.Unauthorized)
{
    Console.WriteLine("Ogiltig API-nyckel.");
}
catch (HttpRequestException ex) when (ex.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
{
    Console.WriteLine("Rate limit nått — försök igen om en stund.");
}
```

## Aktuella modell-ID:n

Kontrollera aktuella modellnamn på docs.anthropic.com/en/docs/models — de uppdateras regelbundet.
