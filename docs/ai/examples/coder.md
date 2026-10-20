---
title: AI-coder
description: "En enkel applikation som tar en uppgiftsbeskrivning på svenska och returnerar C#-kod. Systemprompten styr att AI:t alltid svarar med kod i rätt format."
parent: AI-exempel
nav_order: 20
---
# AI-coder — generera C#-kod från beskrivning

En enkel applikation som tar en uppgiftsbeskrivning på svenska och returnerar C#-kod. Systemprompten styr att AI:t alltid svarar med kod i rätt format.

## Idén

```
Description: "Skapa en klass Person med namn och ålder, plus en ToString-override"
↓
AI generates C#-kod
↓
Code shown i console (or saved till file)
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
    private const string Model       = "claude-sonnet-4-6";
    private const string SystemPrompt = """
        Du is en C#-kodgenerator. Dina regler:
        1. Answer ALWAYS med complete, runnable C#-kod
        2. Code should follow Clean Code-principles
        3. Write comments on swedish
        4. Include using-directive och namespace
        5. None explanations outside code — bara code och short comments i den
        6. Use C# 12-syntax när det passar (primary constructors, collection expressions)
        """;

    public KodGenerator(string apiKey)
    {
        _apiKey = apiKey;
        _http   = new HttpClient();
    }

    public async Task<string> GenereraAsync(string description)
    {
        var request = new
        {
            model      = Model,
            max_tokens = 2048,
            system     = SystemPrompt,
            messages   = new[]
            {
                new { role = "user", content = $"Generera C#-kod för: {description}" }
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

    public async Task GenereraOchSparaTillFilAsync(string description, string filePath)
    {
        var code = await GenereraAsync(description);
        await File.WriteAllTextAsync(filePath, code);
        Console.WriteLine($"Kod sparad till {filePath}");
    }
}

// Program.cs
var apiKey = Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")
    ?? throw new InvalidOperationException("ANTHROPIC_API_KEY saknas");

var generator = new KodGenerator(apiKey);

Console.WriteLine("Beskriv vad du vill ha för C#-kod:");
Console.Write("> ");
var description = Console.ReadLine() ?? "";

Console.WriteLine("\nGenererar kod...\n");
var code = await generator.GenereraAsync(description);
Console.WriteLine(code);

Console.WriteLine("\nVill du spara till fil? (j/n):");
if (Console.ReadLine()?.ToLower() == "j")
{
    Console.Write("Filnamn (utan .cs): ");
    var fileName = Console.ReadLine() ?? "GeneradKod";
    await File.WriteAllTextAsync($"{fileName}.cs", code);
    Console.WriteLine($"Sparad som {fileName}.cs");
}
```

## Exempel på körning

```
Describe what du wants ha for C#-kod:
> En class BankAccount med balance, deposit och withdrawal med validation

Generates code...

namespace Bank;

// Representerar ett enkelt bankkonto med saldo-hantering
public class BankAccount(string accountNumber, decimal startBalance = 0)
{
    public string  AccountNumber { get; } = accountNumber;
    public decimal Balance       { get; private set; } = startBalance;

    // Sätter in pengar — kräver positivt belopp
    public void Way in(decimal amount)
    {
        if (amount <= 0) throw new ArgumentException("Belopp måste vara positivt");
        Balance += amount;
    }

    // Tar ut pengar — kontrollerar täckning
    public void Withdraw(decimal amount)
    {
        if (amount <= 0)     throw new ArgumentException("Belopp måste vara positivt");
        if (amount > Balance)  throw new InvalidOperationException("Otillräckligt saldo");
        Balance -= amount;
    }

    public override string ToString() => $"Konto {AccountNumber}: {Balance:C}";
}
```

## Förbättringar att bygga vidare på

- Extrahera kod-blocket ur markdown-svar (AI wrapplar ofta i ` ```csharp `)
- Lägg till konversationshistorik för följdfrågor
- Spara till rätt filsökväg baserat på klassnamn
- Validera att genererad kod kompilerar (`dotnet build`)
