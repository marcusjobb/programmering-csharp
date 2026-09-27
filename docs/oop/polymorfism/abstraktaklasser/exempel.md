---
title: Exempel — webscraper
description: "En abstrakt klass med både färdig kod och abstrakta metoder — och en subklass som fyller i det som saknas."
parent: Abstrakta klasser
nav_order: 20
---
# Exempel — webscraper

`Shape` i [Abstrakta klasser](index.md) var ett minimalt exempel. Här är ett större: en abstrakt bas för att hämta sidor från webben, där den delade logiken (hämta HTML, plocka ut bilder) ligger klar i basklassen, och bara det som är unikt per sida måste skrivas av subklassen.

## Basklassen

```csharp
public abstract class WebScraper
{
    public string Url { get; private set; } = "";
    public HtmlDocument? Document { get; private set; }

    public string Html => Document?.DocumentNode?.OuterHtml ?? "";

    // Färdig kod — samma för alla subklasser
    public virtual async Task LoadAsync(string url)
    {
        Url = url;
        using var client = new HttpClient();
        var html = await client.GetStringAsync(url);

        Document = new HtmlDocument();
        Document.LoadHtml(html);
    }

    // Färdig kod, men markerad virtual — subklasser FÅR skriva om den om de behöver
    public virtual List<string> GetImageUrls()
    {
        var images = Document?.DocumentNode.SelectNodes("//img");
        if (images is null)
            return [];

        return images
            .Select(img => img.GetAttributeValue("src", ""))
            .Where(src => !string.IsNullOrEmpty(src))
            .ToList();
    }

    // Ingen implementation — varje subklass MÅSTE skriva sin egen
    public abstract Task ScrapeAsync();
}
```

`LoadAsync` och `GetImageUrls` är samma oavsett vilken sida du skrapar — de hör hemma i basklassen. `ScrapeAsync` är däremot deklarerad `abstract`: basklassen vet att varje scraper ska kunna "skrapa", men inte vad det innebär för en specifik sida.

## En subklass — hämta blogginlägg

```csharp
public class BlogScraper : WebScraper
{
    public List<string> Titles { get; } = [];

    public override async Task ScrapeAsync()
    {
        await LoadAsync("https://example.com/blog");

        var headings = Document?.DocumentNode.SelectNodes("//h2[@class='post-title']");
        if (headings is null)
            return;

        Titles.AddRange(headings.Select(h => h.InnerText.Trim()));
    }
}
```

```csharp
var scraper = new BlogScraper();
await scraper.ScrapeAsync();

foreach (var title in scraper.Titles)
    Console.WriteLine(title);

Console.WriteLine($"Bilder hittade: {scraper.GetImageUrls().Count}");
```

`BlogScraper` implementerar bara `ScrapeAsync()` — den ärver `LoadAsync` och `GetImageUrls` gratis från `WebScraper`, utan att skriva om dem. Vill en annan subklass, säg `ProductScraper`, hämta bilder på ett annat sätt (till exempel filtrera bort reklambilder), kan den skriva sin egen `override` av `GetImageUrls()` istället — det är precis det `virtual` på den metoden möjliggör.

## Varför `async`/`await` hela vägen igenom

Originalversionen av den här typen av kod blockerar ofta med `.Result` istället för `await`:

```csharp
// Undvik — blockerar tråden i onödan, kan orsaka deadlocks i vissa kontexter
var html = client.GetStringAsync(url).Result;

// Använd — frigör tråden medan den väntar på nätverket
var html = await client.GetStringAsync(url);
```

En nätverksanrop är I/O, precis som en databasfråga (se [async i EF Core](../../../entityframework/linq-queries.md#async-är-standard-inte-ett-tillägg)) — `await` genom hela kedjan, inte `.Result` på en enda rad, är vad som faktiskt ger dig fördelen.

## Obligatorisk dad-joke

Varför var webscrapern så avslappnad inför jobbintervjun?

Den hade redan `abstract`-metoderna klara — bara att fylla i detaljerna.
