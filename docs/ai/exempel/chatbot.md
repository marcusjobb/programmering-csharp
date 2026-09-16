---
title: Chatbot
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: AI-exempel
nav_order: 10
---
# Chatbot — konversation med minne

En chatbot skickar hela konversationshistoriken med varje anrop. Det gör att AI:t "minns" vad som sagts tidigare i samma session.

## Hur det fungerar

```
Användare:  "Hej, jag heter Anna"
AI:         "Hej Anna! Vad kan jag hjälpa dig med?"
Användare:  "Vad heter jag?"
AI:         "Du heter Anna."   ← AI:t minns — för att vi skickade historiken
```

Utan historiken: AI:t vet inte vad du hette.

## Fullständigt exempel

```csharp
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;

class Chatbot
{
    record Meddelande(string Role, string Content);

    private readonly HttpClient       _http;
    private readonly string           _apiKey;
    private readonly List<Meddelande> _historik = new();
    private readonly string           _systemPrompt;

    private const string ApiUrl = "https://api.anthropic.com/v1/messages";
    private const string Modell = "claude-haiku-4-5-20251001";  // snabb och billig

    public Chatbot(string apiKey, string systemPrompt = "Du är en hjälpsam assistent.")
    {
        _apiKey       = apiKey;
        _systemPrompt = systemPrompt;
        _http         = new HttpClient();
    }

    public async Task<string> SkickaAsync(string användarens)
    {
        _historik.Add(new Meddelande("user", användarens));

        var request = new
        {
            model      = Modell,
            max_tokens = 1024,
            system     = _systemPrompt,
            messages   = _historik.Select(m => new { role = m.Role, content = m.Content })
        };

        using var req = new HttpRequestMessage(HttpMethod.Post, ApiUrl);
        req.Headers.Add("x-api-key",         _apiKey);
        req.Headers.Add("anthropic-version", "2023-06-01");
        req.Content = JsonContent.Create(request);

        var response = await _http.SendAsync(req);
        response.EnsureSuccessStatusCode();

        var json  = await response.Content.ReadAsStringAsync();
        var doc   = JsonDocument.Parse(json);
        var svar  = doc.RootElement
                       .GetProperty("content")[0]
                       .GetProperty("text")
                       .GetString() ?? "";

        _historik.Add(new Meddelande("assistant", svar));
        return svar;
    }
}

// Program.cs
var apiKey = Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")
    ?? throw new InvalidOperationException("ANTHROPIC_API_KEY saknas");

var bot = new Chatbot(apiKey, "Du är en vänlig C#-tutor. Svara alltid på svenska.");

Console.WriteLine("Chatbot startad. Skriv 'sluta' för att avsluta.\n");

while (true)
{
    Console.Write("Du: ");
    var input = Console.ReadLine() ?? "";

    if (input.ToLower() == "sluta") break;

    Console.Write("AI: ");
    var svar = await bot.SkickaAsync(input);
    Console.WriteLine(svar);
    Console.WriteLine();
}
```

## Exempel på körning

```
Chatbot startad. Skriv 'sluta' för att avsluta.

Du: Hej, jag heter Anna och lär mig C#
AI: Hej Anna! Kul att du lär dig C#. Vad vill du veta?

Du: Vad heter jag?
AI: Du heter Anna!

Du: Förklara vad en lista är
AI: En lista (List<T>) är en dynamisk samling...

Du: sluta
```

## Viktiga detaljer

- `_historik` byggs upp för varje meddelande
- Hela historiken skickas med varje API-anrop — kostar tokens
- Rensa historiken (eller börja nytt objekt) för en ny konversation
- Claude Haiku är bra för chatbotar — snabb och billig

## Tokenhantering

Om konversationen blir lång, börjar det kosta. Enkel strategi — behåll bara de senaste N meddelandena:

```csharp
const int MaxHistorik = 20;
if (_historik.Count > MaxHistorik)
    _historik.RemoveRange(0, _historik.Count - MaxHistorik);
```
