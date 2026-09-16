---
title: Decision helper
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: AI-exempel
nav_order: 30
---
# Decision helper — AI som beslutsrådgivare

En applikation som samlar in flera inputs från användaren, ber AI analysera dem och presenterar en strukturerad rekommendation. Visar hur du kan styra AI:t att returnera strukturerade data.

## Idén

```
Input 1: "Vi överväger att byta databas från MSSQL till PostgreSQL"
Input 2: "Teamet har 5 år MSSQL-erfarenhet, 0 år PostgreSQL"
Input 3: "Systemet hanterar 10 000 transaktioner/dag"
Input 4: "Budget: begränsad — 2 månader för migrering"
↓
AI analyserar alla inputs
↓
Strukturerat svar: Bedömning, risker, rekommendation, nästa steg
```

## Fullständigt exempel

```csharp
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

// Modell för det strukturerade svaret
record Beslutsbedömning(
    string Bedömning,
    string[] Risker,
    string[] Fördelar,
    string Rekommendation,
    string[] NästaSteg
);

class BeslutsHelper
{
    private readonly HttpClient _http;
    private readonly string     _apiKey;

    private const string ApiUrl       = "https://api.anthropic.com/v1/messages";
    private const string Modell       = "claude-sonnet-4-6";
    private const string SystemPrompt = """
        Du är en erfaren IT-arkitekt och beslutsrådgivare.
        Analysera de givna faktorerna och svara ALLTID med JSON i exakt detta format:
        {
          "Bedömning": "Positiv" | "Neutral" | "Negativ",
          "Risker": ["risk 1", "risk 2"],
          "Fördelar": ["fördel 1", "fördel 2"],
          "Rekommendation": "En mening med din rekommendation",
          "NästaSteg": ["steg 1", "steg 2", "steg 3"]
        }
        Svara BARA med JSON — inga förklaringar utanför.
        """;

    public BeslutsHelper(string apiKey)
    {
        _apiKey = apiKey;
        _http   = new HttpClient();
    }

    public async Task<Beslutsbedömning?> AnalyseraAsync(string beslutsfraga, List<string> faktorer)
    {
        var faktorText = string.Join("\n", faktorer.Select((f, i) => $"- Faktor {i + 1}: {f}"));

        var prompt = $"""
            Beslutsfraga: {beslutsfraga}

            Faktorer att beakta:
            {faktorText}

            Analysera och ge din rekommendation som JSON.
            """;

        var request = new
        {
            model      = Modell,
            max_tokens = 1024,
            system     = SystemPrompt,
            messages   = new[] { new { role = "user", content = prompt } }
        };

        using var req = new HttpRequestMessage(HttpMethod.Post, ApiUrl);
        req.Headers.Add("x-api-key",         _apiKey);
        req.Headers.Add("anthropic-version", "2023-06-01");
        req.Content = JsonContent.Create(request);

        var response = await _http.SendAsync(req);
        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadAsStringAsync();
        var doc          = JsonDocument.Parse(responseJson);
        var text         = doc.RootElement
                              .GetProperty("content")[0]
                              .GetProperty("text")
                              .GetString() ?? "{}";

        return JsonSerializer.Deserialize<Beslutsbedömning>(
            text,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );
    }
}

// Program.cs
var apiKey = Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")
    ?? throw new InvalidOperationException("ANTHROPIC_API_KEY saknas");

var helper = new BeslutsHelper(apiKey);
var faktorer = new List<string>();

Console.WriteLine("=== Decision Helper ===\n");
Console.Write("Vad ska beslutet handla om? ");
var fråga = Console.ReadLine() ?? "";

Console.WriteLine("\nAnge faktorer (tom rad = klar):");
while (true)
{
    Console.Write($"Faktor {faktorer.Count + 1}: ");
    var faktor = Console.ReadLine() ?? "";
    if (string.IsNullOrWhiteSpace(faktor)) break;
    faktorer.Add(faktor);
}

if (faktorer.Count == 0)
{
    Console.WriteLine("Inga faktorer angivna.");
    return;
}

Console.WriteLine("\nAnalyserar...\n");
var bedömning = await helper.AnalyseraAsync(fråga, faktorer);

if (bedömning is null)
{
    Console.WriteLine("Kunde inte tolka svaret.");
    return;
}

// Presentera resultatet
var färg = bedömning.Bedömning switch
{
    "Positiv" => ConsoleColor.Green,
    "Negativ" => ConsoleColor.Red,
    _         => ConsoleColor.Yellow
};

Console.ForegroundColor = färg;
Console.WriteLine($"BEDÖMNING: {bedömning.Bedömning}");
Console.ResetColor();

Console.WriteLine($"\nREKOMMENDATION:\n  {bedömning.Rekommendation}");

Console.WriteLine("\nRISKER:");
foreach (var r in bedömning.Risker) Console.WriteLine($"  ⚠ {r}");

Console.WriteLine("\nFÖRDELAR:");
foreach (var f in bedömning.Fördelar) Console.WriteLine($"  ✓ {f}");

Console.WriteLine("\nNÄSTA STEG:");
for (int i = 0; i < bedömning.NästaSteg.Length; i++)
    Console.WriteLine($"  {i + 1}. {bedömning.NästaSteg[i]}");
```

## Exempel på körning

```
=== Decision Helper ===

Vad ska beslutet handla om? Byta databas från MSSQL till PostgreSQL
Faktor 1: Teamet har 5 år MSSQL-erfarenhet, noll PostgreSQL
Faktor 2: 10 000 transaktioner per dag
Faktor 3: Budget för 2 månaders migration
Faktor 4: PostgreSQL är gratis, MSSQL kostar 50 000 kr/år
Faktor 5:

Analyserar...

BEDÖMNING: Neutral

REKOMMENDATION:
  Byte är möjligt men kräver noggrann planering — kostnadsbesparingen motiverar det på sikt.

RISKER:
  ⚠ Kunskapsgap kan leda till längre driftstörningar vid problem
  ⚠ 2 månader är tight för fullständig migrering och testning

FÖRDELAR:
  ✓ Kostnadsbesparing på 50 000 kr/år
  ✓ PostgreSQL är väl dokumenterat med stor community

NÄSTA STEG:
  1. Genomför pilot-migrering av ett icke-kritiskt system
  2. Boka PostgreSQL-utbildning för teamet
  3. Ta fram rollback-plan innan produktionsmigration
```

## Designprinciper i exemplet

- **System prompt styr formatet** — AI returnerar alltid valid JSON
- **Record för deserialisering** — starkt typat svar
- **ConsoleColor för feedback** — visuell indikation på bedömning
- **Felhantering** — null-check på deserialiserat svar
