---
title: "Lathund: Markdown"
description: "Markdown i lathundsform för README-filer och dokumentation i C#-projekt: rubriker, listor, länkar, tabeller och kodblock."
parent: Lathund
nav_order: 974
---
# Lathund: Markdown

Markdown är ett enkelt märkspråk för formaterad text. Du skriver vanlig text med några tecken, och den visas som rubriker, listor och kod. Det används i README-filer på GitHub, i dokumentation och i kursmaterial.

Läs mer: [Verktyg](../tools/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Filändelse | `.md` |
| Används i | README-filer, GitHub-issues och pull requests, dokumentation |
| Förhandsvisning | VS Code: `Ctrl+Shift+V`. Visual Studio och Rider har egen förhandsvisning |
| Stycke | En tom rad mellan två stycken |

## Text och rubriker

| Syntax | Resultat | Användning |
|--------|----------|------------|
| `# Rubrik` | Rubrik nivå 1 | Projektets namn, en gång per fil |
| `## Rubrik` | Rubrik nivå 2 | Huvudavsnitt |
| `### Rubrik` | Rubrik nivå 3 | Underavsnitt |
| `**fet text**` | **fet text** | Viktiga ord |
| `*kursiv text*` | *kursiv text* | Betoning |
| `~~genomstruken~~` | ~~genomstruken~~ | Sådant som inte längre gäller |
| `` `kod` `` | `kod` | Klassnamn, metoder, kommandon i löpande text |

## Listor

Oordnad lista börjar med `-`. Indrag med två mellanslag ger en underpunkt.

```markdown
- Polymorfism
- Arv
  - Basklass
  - Härledd klass
```

Ordnad lista använder siffror. Markdown numrerar om automatiskt, så `1.` på alla rader fungerar också.

```markdown
1. Skapa projektet
2. Skriv koden
3. Kör testerna
```

Checklista:

```markdown
- [x] Klart
- [ ] Inte klart
```

## Länkar och bilder

| Syntax | Betydelse |
|--------|-----------|
| `[text](https://docs.microsoft.com)` | Länk till en webbsida |
| `[text](docs/guide.md)` | Länk till en fil i repositoryt |
| `[text](#rubrik)` | Länk till en rubrik på samma sida |
| `![alt-text](bilder/diagram.png)` | Bild. Alt-texten beskriver bilden |

## Kodblock

Ett kodblock börjar och slutar med tre backticks. Skriv språket direkt efter den första raden så får koden färg.

````markdown
```csharp
Console.WriteLine("Hej världen!");
```
````

Vanliga språk: `csharp`, `bash`, `json`, `xml`, `sql`. Använd `text` eller ingen språkangivelse för utdata.

## Tabeller

```markdown
| Kommando | Betydelse |
|----------|-----------|
| `git status` | Visar ändrade filer |
| `git add .` | Lägger till alla ändringar |
```

Kolonnerna behöver inte vara jämna, men raden med `---` måste finnas. Ett `|` inuti en tabell skrivs som `\|`.

## Citat och övrigt

| Syntax | Resultat |
|--------|----------|
| `> Text` | Citatblock, används för viktiga anmärkningar |
| `---` på egen rad | Horisontell linje |

## Jämförelser

| Jämför | Skillnad |
|--------|----------|
| `*kursiv*` vs `**fet**` | En stjärna ger kursiv, två ger fet |
| Indrag med mellanslag vs tabb | Två eller fyra mellanslag fungerar i listor. Tabb kan ge fel nivå |
| `` `kod` `` vs kodblock | Enradig kod i löpande text, flera rader i ett kodblock |

## Vanliga misstag

- **Ingen tom rad före en lista, tabell eller kodblock.** Då ser texten ut som vanligt stycke.
- **Glömda avslutande backticks.** Resten av dokumentet blir kod. Kontrollera förhandsvisningen.
- **Rubriker utan `#`-mellanslag.** Skriv `# Rubrik`, inte `#Rubrik`.
- **Bilder med relativa sökvägar som inte finns.** Kontrollera att filen ligger där länken pekar.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Markdown** | Ett enkelt märkspråk för formaterad text |
| **Förhandsvisning** | Visning av hur dokumentet ser ut när det renderas |
| **Kodblock** | Text som visas oformaterad, med bevarade mellanslag |
| **Inline-kod** | Kod inom en textrad, markerad med enkla backticks |
| **README** | Filen som presenterar ett projekt, och oftast den första en besökare läser |
