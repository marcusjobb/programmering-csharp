---
title: AI-coder
description: "AI-coder i AI-exempel — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: AI-exempel
nav_order: 20
---
# AI-coder — generera C#-kod från beskrivning

En enkel applikation som tar en uppgiftsbeskrivning på svenska och returnerar C#-kod. Systemprompten styr att AI:t alltid svarar med kod i rätt format.

## Idén

```
Beskrivning: "Skapa en klass Person med namn och ålder, plus en ToString-override"
↓
AI genererar C#-kod
↓
Koden visas i konsolen (eller sparas till fil)
```

## Fullständigt exempel

```csharp
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;

class KodGenerator
{
    private readonly HttpClient _http;
    private readonly string     _apiKey;

    private const string ApiUrl       = "https://api.anthropic.com/v1/messages";
    private const string Modell       = "claude-sonnet-4-6";
    private const string SystemPrompt = """
        Du är en C#-kodgenerator. Dina regler:
        1. Svara ALLTID med fullständig, körbar C#-kod
        2. Koden ska följa Clean Code-principerna
        3. Skriv kommentarer på svenska
        4. Inkludera using-direktiv och namespace
        5. Inga förklaringar utanför koden — bara koden och korta kommentarer i den
        6. Använd C# 12-syntax när det passar (primary constructors, collection expressions)
        """;

    public KodGenerator(string apiKey)
    {
        _apiKey = apiKey;
        _http   = new HttpClient();
    }

    public async Task<string> GenereraAsync(string beskrivning)
    {
        var request = new
        {
            model      = Modell,
            max_tokens = 2048,
            system     = SystemPrompt,
            messages   = new[]
            {
                new { role = "user", content = $"Generera C#-kod för: {beskrivning}" }
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

    public async Task GenereraOchSparaTillFilAsync(string beskrivning, string filsökväg)
    {
        var kod = await GenereraAsync(beskrivning);
        await File.WriteAllTextAsync(filsökväg, kod);
        Console.WriteLine($"Kod sparad till {filsökväg}");
    }
}

// Program.cs
var apiKey = Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")
    ?? throw new InvalidOperationException("ANTHROPIC_API_KEY saknas");

var generator = new KodGenerator(apiKey);

Console.WriteLine("Beskriv vad du vill ha för C#-kod:");
Console.Write("> ");
var beskrivning = Console.ReadLine() ?? "";

Console.WriteLine("\nGenererar kod...\n");
var kod = await generator.GenereraAsync(beskrivning);
Console.WriteLine(kod);

Console.WriteLine("\nVill du spara till fil? (j/n):");
if (Console.ReadLine()?.ToLower() == "j")
{
    Console.Write("Filnamn (utan .cs): ");
    var filnamn = Console.ReadLine() ?? "GeneradKod";
    await File.WriteAllTextAsync($"{filnamn}.cs", kod);
    Console.WriteLine($"Sparad som {filnamn}.cs");
}
```

## Exempel på körning

```
Beskriv vad du vill ha för C#-kod:
> En klass BankKonto med saldo, insättning och uttag med validering

Genererar kod...

namespace Bank;

// Representerar ett enkelt bankkonto med saldo-hantering
public class BankKonto(string kontoNummer, decimal startSaldo = 0)
{
    public string  KontoNummer { get; } = kontoNummer;
    public decimal Saldo       { get; private set; } = startSaldo;

    // Sätter in pengar — kräver positivt belopp
    public void Sätt in(decimal belopp)
    {
        if (belopp <= 0) throw new ArgumentException("Belopp måste vara positivt");
        Saldo += belopp;
    }

    // Tar ut pengar — kontrollerar täckning
    public void TaUt(decimal belopp)
    {
        if (belopp <= 0)     throw new ArgumentException("Belopp måste vara positivt");
        if (belopp > Saldo)  throw new InvalidOperationException("Otillräckligt saldo");
        Saldo -= belopp;
    }

    public override string ToString() => $"Konto {KontoNummer}: {Saldo:C}";
}
```

## Förbättringar att bygga vidare på

- Extrahera kod-blocket ur markdown-svar (AI wrapplar ofta i ` ```csharp `)
- Lägg till konversationshistorik för följdfrågor
- Spara till rätt filsökväg baserat på klassnamn
- Validera att genererad kod kompilerar (`dotnet build`)
