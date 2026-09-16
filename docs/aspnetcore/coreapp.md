---
title: Asp.Net Core Hangman
layout: default
author: Campus Mölndal
author_github: CampusMolndalEducation
author_url: "https://github.com/CampusMolndalEducation"
school: Campus Mölndal
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: ASP.net Core
nav_order: 10
---
# Asp.Net Core Hangman

Nu ska vi bygga en enkel Hangman-spel med ASP.NET Core och JSON-lagring.

I denna artikel kommer vi att utforska hur du kan skapa en liten Hangman-spelapplikation utan grafik med hjälp av ASP.NET Core. Spelet kommer att använda en ordlista med 100 ord som sparas i en JSON-fil. Låt oss komma igång!

## Förberedelser

Innan vi börjar, se till att du har ASP.NET Core SDK installerat på din dator och att du är bekant med C#-programmering och grundläggande koncept inom ASP.NET Core.

## Steg 1: Skapa ett ASP.NET Core-projekt

Börja med att skapa ett nytt ASP.NET Core-projekt i Visual Studio eller valfri textredigerare. Du kan använda följande kommando i kommandotolken:

```bash
dotnet new web -n HangmanGame
```

Detta skapar ett nytt ASP.NET Core-webbprojekt med namnet "HangmanGame".

## Steg 2: Skapa en ordlista i JSON-format

Skapa en ny mapp i ditt projekt med namnet "Data" och skapa en fil med namnet "wordlist.json" inuti den. Öppna filen och lägg till följande JSON-struktur:

```json
{
  "Words": [
    "jedi",
    "sith",
    "lightsaber",
    "droid",
    "force",
    "galaxy",
    "empire",
    "rebellion",
    "yoda",
    "vader",
    "wookiee",
    "starfighter",
    "darksaber",
    "xwing",
    "deathstar",
    "mandalorian",
    "padawan",
    "stormtrooper",
    "endor",
    "coruscant"
    ]
}
```

Vi använder lite ord från Star Wars världen. Du kan lägga till fler ord om du vill.

## Steg 3: Skapa en modell för Hangman-spelet

Skapa en modellklass för Hangman-spelet genom att lägga till en ny C#-fil med namnet "Hangman.cs" i projektmappen "Models". Definiera modellklassen med följande egenskaper:

```csharp
public class Hangman
{
    public string SecretWord { get; set; }
    public string GuessedWord { get; set; }
    public int RemainingAttempts { get; set; }
    public List<char> IncorrectGuesses { get; set; }
    public List<char> CorrectGuesses { get; set; }
}
```

Egenskapen "SecretWord" kommer att lagra det slumpmässigt valda ordet från ordlistan. "GuessedWord" kommer att hålla reda på spelarens gissade ord med asterisker för oavslöjade bokstäver. "RemainingAttempts" kommer att hålla koll på återstående försök, och "IncorrectGuesses" och "CorrectGuesses" kommer att hålla spår på felaktiga och korrekta gissningar.

## Steg 4: Skapa en kontroller för Hangman-spelet

Skapa en kontrollerklass för Hangman-spelet genom att lägga till en ny C#-fil med namnet "HangmanController.cs" i projektmappen "Controllers". Definiera kontrollerklassen med följande kod:

```csharp
using System.IO;
using System.Text.Json;
using HangmanGame.Models;
using Microsoft.AspNetCore.Mvc;

namespace HangmanGame.Controllers
{
    public class HangmanController : Controller
    {
        private readonly Hangman _hangman;

        public HangmanController()
        {
            // Läs in ordlistan från

JSON-filen vid kontrollerns konstruktion
            string json = System.IO.File.ReadAllText("Data/wordlist.json");
            var wordList = JsonSerializer.Deserialize<WordList>(json);

            // Slumpmässigt välj ett ord från ordlistan
            var random = new Random();
            var secretWord = wordList.Words[random.Next(0, wordList.Words.Count)];

            // Skapa en ny instans av Hangman-spelet
            _hangman = new Hangman
            {
                SecretWord = secretWord,
                GuessedWord = new string('*', secretWord.Length),
                RemainingAttempts = 6,
                IncorrectGuesses = new List<char>(),
                CorrectGuesses = new List<char>()
            };
        }

        public IActionResult Index()
        {
            return View(_hangman);
        }

        [HttpPost]
        public IActionResult Guess(char letter)
        {
            if (_hangman.SecretWord.Contains(letter))
            {
                // Bokstaven finns i det hemliga ordet
                _hangman.CorrectGuesses.Add(letter);
                UpdateGuessedWord(letter);
            }
            else
            {
                // Bokstaven finns inte i det hemliga ordet
                _hangman.IncorrectGuesses.Add(letter);
                _hangman.RemainingAttempts--;
            }

            return RedirectToAction("Index");
        }

        private void UpdateGuessedWord(char letter)
        {
            var sb = new StringBuilder(_hangman.GuessedWord);

            for (int i = 0; i < _hangman.SecretWord.Length; i++)
            {
                if (_hangman.SecretWord[i] == letter)
                {
                    sb[i] = letter;
                }
            }

            _hangman.GuessedWord = sb.ToString();
        }
    }
}
```

Kontrollerklassen använder konstruktorn för att läsa in ordlistan från JSON-filen, slumpmässigt välja ett ord och skapa en ny instans av Hangman-spelet. Index-metoden skickar Hangman-objektet till vyn för att visa det aktuella spelet. Gissningsmetoden (Guess) hanterar användarens gissning och uppdaterar spelstatusen.

## Steg 5: Skapa vyer för Hangman-spelet

Skapa en vy för Hangman-spelet genom att lägga till en ny Razor-vy med namnet "Index.cshtml" i projektmappen "Views/Hangman". Här är koden för vyn:

```html
@model HangmanGame.Models.Hangman

<h2>Hangman Game</h2>

<p>Guess the word: @Model.GuessedWord</p>

<p>Incorrect guesses: @string.Join(", ", Model.IncorrectGuesses)</p>

<p>Remaining attempts: @Model.RemainingAttempts</p>

<form asp-controller="Hangman" asp-action="Guess" method="post">
    <input type="text" name="letter" maxlength="1" required />
    <button type="submit">Guess</button>
</form>
```

Vyn använder Hangman-modellen för att visa det hemliga ordet med asterisker för oavslöjade bokstäver, felaktiga gissningar, återstående försök och ett formulär för att skicka in en gissning.

## Steg 6: Konfigurera routing och starta applikationen

Konfigurera routingen genom att lägga till följande kod i filen "Startup.cs" i metoden "Configure" under "

ConfigureServices":

```csharp
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Hangman}/{action=Index}/{id?}");
});
```

Detta kommer att konfigurera standardrouting för att använda HangmanController och Index-åtgärden som standard.

Slutligen, starta applikationen genom att köra följande kommando i kommandotolken:

```bash
dotnet run
```

Öppna din webbläsare och navigera till URL:en "https://localhost:5001" för att spela Hangman-spelet!

## Avslutande ord

Grattis! Du har nu skapat en enkel Hangman-spelapplikation med ASP.NET Core som använder en JSON-fil för att lagra en ordlista med 100 ord. Genom att följa stegen i denna guide har du lärt dig att skapa modeller, kontroller och vyer för att bygga webbapplikationer i ASP.NET Core.

Du kan bygga vidare på detta projekt genom att lägga till grafiskt gränssnitt, implementera fler funktioner som poängberäkning och highscore-listor, eller utforska andra spännande funktioner inom ASP.NET Core.

Tack för att du läste denna artikel och för att du valde att följa med på denna guide. Jag hoppas att du har haft kul och att du har lärt dig något nytt. Om du har några frågor eller behöver ytterligare hjälp är jag här för att assistera. Ha det bra och lycka till med dina ASP.NET Core-projekt!
