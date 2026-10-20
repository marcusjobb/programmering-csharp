---
title: Chatbot
description: "En chatbot skickar hela konversationshistoriken med varje anrop. Det gör att AI:t \"minns\" vad som sagts tidigare i samma session."
parent: AI-exempel
nav_order: 10
---
# Chatbot — konversation med minne

En chatbot skickar hela konversationshistoriken med varje anrop. Det gör att AI:t "minns" vad som sagts tidigare i samma session.

## Hur det fungerar

```
User:  "Hej, jag heter Anna"
AI:         "Hej Anna! Vad kan jag hjälpa dig med?"
User:  "Vad heter jag?"
AI:         "Du heter Anna."   ← AI:t remembers — for to vi sent history
```

Utan historiken: AI:t vet inte vad du hette.

## Fullständigt exempel

```csharp
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;

class Chatbot
{
    record Message(string Role, string Content);

    private readonly HttpClient       _http;
    private readonly string           _apiKey;
    private readonly List<Message> _history = new();
    private readonly string           _systemPrompt;

    private const string ApiUrl = "https://api.anthropic.com/v1/messages";
    private const string Model = "claude-haiku-4-5-20251001";  // snabb och billig

    public Chatbot(string apiKey, string systemPrompt = "Du är en hjälpsam assistent.")
    {
        _apiKey       = apiKey;
        _systemPrompt = systemPrompt;
        _http         = new HttpClient();
    }

    public async Task<string> SkickaAsync(string user)
    {
        _history.Add(new Message("user", user));

        var request = new
        {
            model      = Model,
            max_tokens = 1024,
            system     = _systemPrompt,
            messages   = _history.Select(m => new { role = m.Role, content = m.Content })
        };

        using var req = new HttpRequestMessage(HttpMethod.Post, ApiUrl);
        req.Headers.Add("x-api-key",         _apiKey);
        req.Headers.Add("anthropic-version", "2023-06-01");
        req.Content = JsonContent.Create(request);

        var response = await _http.SendAsync(req);
        response.EnsureSuccessStatusCode();

        var json  = await response.Content.ReadAsStringAsync();
        var doc   = JsonDocument.Parse(json);
        var answer  = doc.RootElement
                       .GetProperty("content")[0]
                       .GetProperty("text")
                       .GetString() ?? "";

        _history.Add(new Message("assistant", answer));
        return answer;
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
    var answer = await bot.SkickaAsync(input);
    Console.WriteLine(answer);
    Console.WriteLine();
}
```

## Exempel på körning

```
Chatbot started. Write 'sluta' for to exit.

Du: Hej, jag isCalled Anna och teaches mig C#
AI: Hej Anna! Fun to du teaches dig C#. Vad vill du veta?

Du: What isCalled jag?
AI: Du isCalled Anna!

Du: Explain what en list is
AI: En list (List<T>) is en dynamic collection...

Du: stop
```

## Viktiga detaljer

- `_history` byggs upp för varje meddelande
- Hela historiken skickas med varje API-anrop — kostar tokens
- Rensa historiken (eller börja nytt objekt) för en ny konversation
- Claude Haiku är bra för chatbotar — snabb och billig

## Tokenhantering

Om konversationen blir lång, börjar det kosta. Enkel strategi — behåll bara de senaste N meddelandena:

```csharp
const int MaxHistory = 20;
if (_history.Count > MaxHistory)
    _history.RemoveRange(0, _history.Count - MaxHistory);
```
