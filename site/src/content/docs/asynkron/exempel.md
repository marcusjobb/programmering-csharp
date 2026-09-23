---
title: Exempel
description: "Exempel i Asynkron — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Asynkron
nav_order: 10
---
## Exempel - Sökning av filer

Yay! Nu ska vi ta en titt på ett exempel där vi ska skapa en metod som söker igenom alla filer i en mapp och returnerar en lista med filer som innehåller en specifik text. Vi kommer använda oss av asynkrona metoder för att kunna köra flera metoder samtidigt och därigenom effektivisera vår sökning. Hur najs låter inte det?

```csharp
static class Program
{
    static void Main()
    {
        var dir = new DirReader();
        var profile = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var source = Path.Combine(profile, "source");
        var result = dir.SearchFilesAsync(source, "*.cs", "asynkron").Result;
        Console.WriteLine(string.Join(Environment.NewLine, result));
    }
}

class DirReader
{
    public async Task<List<string>> SearchFilesAsync(string path, string searchPattern, string searchText)
    {
        var files = Directory.GetFiles(path, searchPattern, SearchOption.AllDirectories);
        var tasks = new List<Task<string>>();
        foreach (var file in files)
        {
            tasks.Add(SearchFileAsync(file, searchText));
        }
        var results = await Task.WhenAll(tasks);
        return results.Where(x => x != null).ToList();
    }
    public async Task<string?> SearchFileAsync(string path, string searchText)
    {
        var file = File.ReadAllLines(path).ToList();
        var idx = file.FindIndex(r => r.Contains(searchText));
        return idx >= 0 ? $"{path} - {idx}" : null;
    }
}
```

## Förklaring

1. Vi börjar med att skapa en metod som heter `SearchFilesAsync`.
2. Metoden tar emot en sökväg, sökmönster och söktext.
3. Vi använder `Directory.GetFiles` för att hämta en lista med alla filer i den angivna sökvägen.
4. Därefter skapar vi en lista med tasks som kommer att köra metoden `SearchFileAsync`.
5. Vi loopar igenom varje fil och lägger till en task för varje fil i vår lista.
6. Genom att använda `Task.WhenAll` väntar vi på att alla tasks ska bli klara.
7. Vi returnerar en lista med resultatet från varje task som inte är null.
8. Därefter skapar vi en metod som heter `SearchFileAsync`.
9. Metoden tar emot en sökväg och en söktext.
10. Vi använder `File.ReadAllLines` för att läsa innehållet i filen och sparar det i en lista.
11. Vi skapar en variabel som håller koll på vilken rad vi är på i filen.
12. Sedan loopar vi igenom varje rad i filen.
13. Om raden innehåller den sökta texten så returnerar vi sökvägen till filen och vilken rad det var.
14. Vi läser in nästa rad från filen.
15. Vi ökar radnumret med 1.
16. Om vi inte hittar någon rad som innehåller den sökta texten så returnerar vi null.
17. Slutligen har vi vår `Main`-metod där vi skapar en instans av `DirReader` och definierar sökvägen till vår mapp.
18. Vi kör metoden `SearchFiles

Async` och sparar resultatet i en variabel.
19. Till sist skriver vi ut alla resultat i konsolen.

Wow! Nu kan vi söka igenom filer asynkront och få en lista med de filer som innehåller vår sökta text. Det är riktigt coolt att kunna köra flera metoder samtidigt och på så sätt förbättra vår effektivitet. Keep up the good work!

## Slutsats

Att kunna utföra asynkrona operationer är en kraftfull teknik som gör att våra applikationer kan vara mer responsiva och effektiva. Genom att använda asynkrona metoder kan vi undvika att blockera huvudtråden och istället köra flera operationer samtidigt. Detta är särskilt användbart vid uppgifter som tar tid, som att söka igenom filer eller kommunicera med externa system. Genom att utnyttja asynkron programmering kan vi skapa mer responsiva och skalbara applikationer. Keep coding with joy!

## Termtabell

- **Asynkrona metoder**: Metoder som inte blockerar tråden och tillåter parallell exekvering av flera metoder samtidigt.
- **Responsivitet**: Förmågan hos en applikation att snabbt svara på användarinteraktioner och andra händelser.
- **Parallellism**: Exekvering av flera operationer samtidigt för att utnyttja flera processorkärnor och förbättra prestanda.
- **Skalbarhet**: Förmågan hos en applikation att hantera en ökad arbetsbelastning och trafik utan att försämra prestanda och responsivitet.

## Obligatorisk Dad-joke

Varför kallas asynkrona metoder för "coola"?

För att de jobbar i sin egen "takt"!
