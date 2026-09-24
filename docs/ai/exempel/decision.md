---
title: Decision helper
description: "En applikation som samlar in flera inputs från användaren, ber AI analysera dem och presenterar en strukturerad rekommendation. Visar hur du kan styra…"
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
AI analyses all inputs
↓
Structured answer: Assessment, risks, recommendation, next step
```

## Fullständigt exempel

```csharp
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

// Modell för det strukturerade svaret
record DecisionAssessment(
    string Assessment,
    string[] Risks,
    string[] Advantages,
    string Recommendation,
    string[] NextStep
);

class BeslutsHelper
{
    private readonly HttpClient _http;
    private readonly string     _apiKey;

    private const string ApiUrl       = "https://api.anthropic.com/v1/messages";
    private const string Model       = "claude-sonnet-4-6";
    private const string SystemPrompt = """
        Du is en experienced IT-architect och decisionAdviser.
        Analyse de given factors och answer ALWAYS med JSON i exact this format:
        {
          "Bedömning": "Positiv" | "Neutral" | "Negativ",
          "Risker": ["risk 1", "risk 2"],
          "Fördelar": ["fördel 1", "fördel 2"],
          "Rekommendation": "En mening med din rekommendation",
          "NästaSteg": ["steg 1", "steg 2", "steg 3"]
        }
        Answer BARA med JSON — none explanations outside.
        """;

    public BeslutsHelper(string apiKey)
    {
        _apiKey = apiKey;
        _http   = new HttpClient();
    }

    public async Task<DecisionAssessment?> AnalyseraAsync(string decisionQuestion, List<string> factors)
    {
        var factorText = string.Join("\n", factors.Select((f, i) => $"- Faktor {i + 1}: {f}"));

        var prompt = $"""
            DecisionQuestion: {decisionQuestion}

            Factors to consider:
            {factorText}

            Analyse och ge din recommendation as JSON.
            """;

        var request = new
        {
            model      = Model,
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

        return JsonSerializer.Deserialize<DecisionAssessment>(
            text,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );
    }
}

// Program.cs
var apiKey = Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")
    ?? throw new InvalidOperationException("ANTHROPIC_API_KEY saknas");

var helper = new BeslutsHelper(apiKey);
var factors = new List<string>();

Console.WriteLine("=== Decision Helper ===\n");
Console.Write("Vad ska beslutet handla om? ");
var question = Console.ReadLine() ?? "";

Console.WriteLine("\nAnge faktorer (tom rad = klar):");
while (true)
{
    Console.Write($"Faktor {factors.Count + 1}: ");
    var factor = Console.ReadLine() ?? "";
    if (string.IsNullOrWhiteSpace(factor)) break;
    factors.Add(factor);
}

if (factors.Count == 0)
{
    Console.WriteLine("Inga faktorer angivna.");
    return;
}

Console.WriteLine("\nAnalyserar...\n");
var assessment = await helper.AnalyseraAsync(question, factors);

if (assessment is null)
{
    Console.WriteLine("Kunde inte tolka svaret.");
    return;
}

// Presentera resultatet
var colour = assessment.Assessment switch
{
    "Positiv" => ConsoleColor.Green,
    "Negativ" => ConsoleColor.Red,
    _         => ConsoleColor.Yellow
};

Console.ForegroundColor = colour;
Console.WriteLine($"BEDÖMNING: {assessment.Assessment}");
Console.ResetColor();

Console.WriteLine($"\nREKOMMENDATION:\n  {assessment.Recommendation}");

Console.WriteLine("\nRISKER:");
foreach (var r in assessment.Risks) Console.WriteLine($"  ⚠ {r}");

Console.WriteLine("\nFÖRDELAR:");
foreach (var f in assessment.Advantages) Console.WriteLine($"  ✓ {f}");

Console.WriteLine("\nNÄSTA STEG:");
for (int i = 0; i < assessment.NextStep.Length; i++)
    Console.WriteLine($"  {i + 1}. {assessment.NextStep[i]}");
```

## Exempel på körning

```
=== Decision Helper ===

What should decision shop if? Swap database from MSSQL till PostgreSQL
Factor 1: Team has 5 year MSSQL-experience, zero PostgreSQL
Factor 2: 10 000 transactions per day
Factor 3: Budget for 2 months migration
Factor 4: PostgreSQL is gratis, MSSQL costs 50 000 kr/year
Factor 5:

Analyses...

ASSESSMENT: Neutral

RECOMMENDATION:
  Byte is possible men requires precise planning — costSaving motivates it on aim.

RISKS:
  ⚠ KnowledgeGap can leda till longer outages at problem
  ⚠ 2 months is tight for complete migration och testing

ADVANTAGES:
  ✓ CostSaving on 50 000 kr/year
  ✓ PostgreSQL is well documented med large community

NEXT STEP:
  1. Perform pilot-migration of ett non-critical system
  2. Book PostgreSQL-education for team
  3. Ta forward rollback-plan before productionMigration
```

## Designprinciper i exemplet

- **System prompt styr formatet** — AI returnerar alltid valid JSON
- **Record för deserialisering** — starkt typat svar
- **ConsoleColor för feedback** — visuell indikation på bedömning
- **Felhantering** — null-check på deserialiserat svar
