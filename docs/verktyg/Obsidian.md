---
title: Obsidian
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Verktyg
nav_order: 30
---
# Obsidian

Obsidian är ett anteckningsprogram baserat på Markdown-filer. Det fungerar som en personlig kunskapsbas — du skriver i vanliga `.md`-filer som lagras lokalt på din dator.

## Varför Obsidian för en programmerare?

- **Lokala filer** — du äger datan, inget moln krävs
- **Markdown** — samma format som du skriver dokumentation i
- **Länkning** — koppla ihop anteckningar med `[[sidnamn]]`
- **Git-vänligt** — versionshanteras precis som kod
- **Snabb sökning** — full-text sökning i hela valvet

## Installera

Ladda ner på [obsidian.md](https://obsidian.md) — finns för Windows, Mac och Linux.

## Grundbegrepp

| Term | Förklaring |
|------|-----------|
| **Vault** | En mapp med alla dina anteckningar — ett projekt |
| **Note** | En Markdown-fil |
| **Link** | `[[Notsnamn]]` — länk till en annan anteckning |
| **Tag** | `#tagg` i texten — för att kategorisera |
| **Graph view** | Visualiserar alla kopplingar mellan anteckningar |

## Skapa ett vault för kursen

1. Öppna Obsidian → **Open folder as vault**
2. Välj eller skapa en mapp, t.ex. `C:\anteckningar\csharp-kurs`
3. Skapa noter per ämne: `Variabler.md`, `OOP.md`, `LINQ.md`
4. Länka ihop dem: skriv `[[OOP]]` i en annan note för att skapa en länk

## Nyttiga kortkommandon

| Kortkommando | Vad det gör |
|---|---|
| `Ctrl+N` | Ny anteckning |
| `Ctrl+P` | Command palette (hitta allt) |
| `Ctrl+E` | Växla läs/redigera-läge |
| `Ctrl+Shift+F` | Sök i hela valvet |
| `Ctrl+G` | Öppna graph view |
| `[[` | Börja länka till en annan note |

## Tips för programmering

```markdown
# LINQ — mina anteckningar

Används för att arbeta med samlingar.

## Where — filtrera

\`\`\`csharp
var jämna = tal.Where(t => t % 2 == 0).ToList();
\`\`\`

Se även: [[Datastrukturer]], [[Lambdas]]
```

Lägg in kodblock direkt i anteckningarna — Obsidian highlightar C#.

## Plugins att kolla på

- **Calendar** — se anteckningar per dag
- **Dataview** — fråga dina anteckningar som en databas
- **Git** — automatisk commit av ditt vault

## TL;DR

Obsidian = Markdown-filer + kopplingar + lokal lagring. Perfekt för att bygga upp en personlig kunskapsbas under utbildningen. Inga konton, inga prenumerationer — bara filer du äger.
