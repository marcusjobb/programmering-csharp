---
title: GitHub Copilot
description: "GitHub Copilot är den mest använda AI-kodningsassistenten bland professionella utvecklare. Den sitter direkt i din IDE och kompletterar kod medan du…"
parent: AI-modeller
nav_order: 45
---
# GitHub Copilot

GitHub Copilot är den mest använda AI-kodningsassistenten bland professionella utvecklare. Den sitter direkt i din IDE och kompletterar kod medan du skriver — utan att du behöver byta fönster.

## Vad är det?

Copilot ser din fil, dina kommentarer och ditt kontext. Baserat på det föreslår den nästa rad, nästa metod, eller hela klasser. Du accepterar med `Tab`, avvisar med `Esc`.

```csharp
// Skapa en metod som beräknar fakulteten av n rekursivt
↓ Copilot suggests:
public int Factorial(int n) => n <= 1 ? 1 : n * Factorial(n - 1);
```

## Komma igång

1. Installera tillägget i din IDE:
   - **Visual Studio** — Extensions → Manage Extensions → sök "GitHub Copilot"
   - **VS Code** — Extensions → sök "GitHub Copilot"
   - **Rider** — Plugins → sök "GitHub Copilot"

2. Logga in med GitHub-konto

3. Börja koda — förslagen dyker upp automatiskt (grått text)

**Prissättning:** Gratis för studerande via GitHub Student Developer Pack. Betalt för övriga (~10 USD/mån).

## Vad Copilot kan

### Kodkomplettering i realtid

Skriver du en metod-signatur föreslår Copilot hela kroppen:

```csharp
public List<string> FilterLongNames(List<string> name, int minLength)
// → Copilot fyller i: return namn.Where(n => n.Length >= minLängd).ToList();
```

### Generera från kommentarer

```csharp
// Validera ett personnummer i format YYYYMMDD-XXXX
// Returnera true om giltigt, annars false
public bool ValidateNationalIdentityNumber(string pnr)
// → Copilot skriver hela metoden
```

### Copilot Chat — fråga om din kod

I VS Code och Visual Studio finns en chattvy:

```
Du:     What do den here method?
        [mark code]

Copilot: Method tar en list of integer och returns...
```

Du kan också:
- "Förklara det här felet"
- "Skriv tester för den här klassen"
- "Refaktorera med LINQ istället"
- "Översätt kommentarerna till svenska"

### Inline chat

Markera kod → `Ctrl+I` → skriv instruktion direkt i filen:

```
/fix it exists ett null-reference-problem here
/doc add till XML-documentation
/tests create unitTests
```

## Copilot i Visual Studio

Visual Studio har extra Copilot-integration:
- **Next Edit Suggestion** — föreslår nästa ändring baserat på vad du precis gjort
- **Commit message** — genererar git-meddelande automatiskt
- **Rename suggestions** — föreslår bättre variabelnamn

## Rätt mindset — du är ansvarig

Copilot genererar kod som *ser* korrekt ut. Det innebär inte att den *är* korrekt.

```csharp
// Copilot kanske genererar:
public void DeleteUser(int id)
{
    _db.Users.Remove(_db.Users.Find(id));
    _db.SaveChanges();
}
// Problem: Find() returnerar null om id inte finns → NullReferenceException
```

Granska alltid:
- Fungerar det vid edge cases? (null, tom lista, noll, negativa tal)
- Är det säkert? (SQL-injection, öppen filhantering)
- Förstår du varje rad?

**Regeln:** Om du inte kan förklara koden är den inte din.

## Copilot vs. Claude Code

| | GitHub Copilot | Claude Code |
|--|----------------|-------------|
| Var | I IDE:n | I terminalen |
| Styrka | Realtids-komplettering | Hela projektet, filer, git |
| Pris | ~10 USD/mån (gratis för studerande) | Per API-token |
| Ser hela projektet | Delvis | Ja |
| Kör kommandon | Nej | Ja |

De kompletterar varandra — Copilot för snabb komplettering, Claude Code för större uppgifter.

## TL;DR

Copilot sitter i din IDE och kodar med dig i realtid. Tab accepterar, Esc avvisar. Bäst på komplettering och att generera från kommentarer. Granska alltid vad den genererar — du är ansvarig för koden.
