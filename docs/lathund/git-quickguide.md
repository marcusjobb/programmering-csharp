---
title: "Lathund: Git"
description: "Git: att skapa och klona ett repository, arbeta med grenar, skicka upp ändringar, ångra och hantera fjärrrepositoryn."
parent: Lathund
nav_order: 971
---
# Lathund: Git

Git är ett versionshanteringssystem. Det håller koll på ändringar i dina filer, så att du kan se historiken, arbeta i grenar och gå tillbaka. Du använder det i kommandotolken eller i en terminal.

Läs mer: [Verktyg](../tools/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Typ | Distribuerat versionshanteringssystem |
| Standardgren | `main` (äldre repon kan ha `master`) |
| Tre nivåer | Arbetsområde, staging-området (index), commit |
| Fjärr | Oftast `origin`, till exempel GitHub |

Ändringarnas väg: du ändrar filer i arbetsområdet, lägger dem i staging med `git add`, och sparar dem som en commit med `git commit`.

## Operationer

### Skapa och klona

| Kommando | Betydelse |
|----------|-----------|
| `git init` | Skapar ett nytt, tomt repository i aktuell mapp |
| `git clone <url>` | Kopierar ett befintligt repository, inklusive historik |
| `git remote add origin <url>` | Kopplar ditt lokala repository till ett repository på GitHub |

```bash
git init
git remote add origin https://github.com/ditt-namn/mitt-projekt.git
```

### Spara ändringar

| Kommando | Betydelse |
|----------|-----------|
| `git status` | Visar vilka filer som ändrats, är staged eller är nya |
| `git add <fil>` | Lägger en fil i staging-området |
| `git add .` | Lägger alla ändringar i aktuell mapp i staging-området |
| `git commit -m "Meddelande"` | Sparar staged ändringar som en commit |

```bash
git add Program.cs
git commit -m "feat: lägg till inloggning"
```

### Grenar

| Kommando | Betydelse |
|----------|-----------|
| `git branch` | Visar lokala grenar. Den aktiva markeras med `*` |
| `git branch <namn>` | Skapar en ny gren |
| `git checkout <gren>` | Byter till en befintlig gren |
| `git checkout -b <namn>` | Skapar en ny gren och byter till den |
| `git merge <gren>` | Sammanfogar den angivna grenen med den aktiva |
| `git branch -d <gren>` | Tar bort en gren som är sammanfogad (säker borttagning) |
| `git branch -D <gren>` | Tar bort en gren oavsett status (kan förlora arbete) |

<details markdown="1">
<summary>Alternativ: git switch</summary>

Nyare Git har `git switch` för att byta gren och `git switch -c <namn>` för att skapa och byta. Båda sätten fungerar. `git checkout` används fortfarande mycket.

```bash
git switch -c feature/inloggning
```

</details>

### Skicka upp och hämta

| Kommando | Betydelse |
|----------|-----------|
| `git push -u origin <gren>` | Skickar grenen till fjärrrepositoryn och kopplar den. Behövs första gången |
| `git push` | Skickar dina commits till fjärrrepositoryn |
| `git pull` | Hämtar ändringar från fjärrrepositoryn och sammanfogar dem med din gren |
| `git fetch` | Hämtar ändringar utan att sammanfoga dem |

Grupparbete: gör `git pull` innan du börjar, och innan du pushar om någon annan har pushat. Om det finns konflikter måste du lösa dem och committa igen.

### Historik och diff

| Kommando | Betydelse |
|----------|-----------|
| `git log` | Visar commit-historiken |
| `git log --oneline` | Visar en rad per commit |
| `git diff` | Visar ändringar i arbetsområdet som inte är staged |
| `git diff --staged` | Visar ändringar som ligger i staging-området |
| `git diff <commit1> <commit2>` | Visar skillnader mellan två commits |

### Ångra

| Kommando | Betydelse |
|----------|-----------|
| `git restore --staged <fil>` | Tar bort filen från staging-området. Ändringarna ligger kvar |
| `git restore <fil>` | Kastar bort ändringarna i en fil och återställer senaste commit |
| `git reset --hard HEAD` | Kastar alla ändringar i arbetsområdet och staging-området |
| `git revert <commit>` | Skapar en ny commit som ångrar en tidigare commit |

<details markdown="1">
<summary>Äldre kommandon: git reset och git checkout -- fil</summary>

`git reset <fil>` tar bort filen från staging-området, precis som `git restore --staged <fil>`. `git checkout -- <fil>` kastar ändringar i en fil, precis som `git restore <fil>`. Du ser båda i äldre material.

</details>

## Jämförelser

| Jämför | Skillnad |
|--------|----------|
| `git fetch` vs `git pull` | `fetch` hämtar bara. `pull` hämtar och sammanfogar direkt |
| `git reset` vs `git revert` | `reset` flyttar grenen bakåt och kan radera historik. `revert` lägger till en ny commit som ångrar. Använd `revert` på delad historik |
| `git merge` vs `git rebase` | `merge` lägger till en sammanfogningscommit. `rebase` skriver om din gren ovanpå en annan. Rebase skriver om historik, använd den inte på grenar andra har hämtat |
| `git add` vs `git commit` | `add` väljer vad som ska ingå. `commit` sparar det som väljs |

## Vanliga misstag

- **Glömt `git add`.** Din ändring finns, men commiten innehåller den inte. Kontrollera med `git status`.
- **Commit utan tydligt meddelande.** Skriv vad ändringen gör, till exempel `fix: rätta felaktig summa`.
- **Stora commits.** Gör många små commits. Då är det lättare att hitta fel och att ångra.
- **`git push --force` på en delad gren.** Det skriver över andras arbete. Använd det bara när du vet vad du gör.
- **Ingen `.gitignore`.** Bygg- och miljöfiler (`bin/`, `obj/`, `.env`) hör inte hemma i repositoryt.
- **Arbete som inte pushats.** Om datorn går sönder finns din commit bara lokalt. Pusha innan du slutar för dagen.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Repository** (repo) | Mappen och hela historiken som Git håller koll på |
| **Commit** | En sparad ögonblicksbild av ändringar, med ett meddelande |
| **Staging-området** | Ändringar som är förberedda för nästa commit |
| **Gren** (branch) | En parallell linje av commits. Används för att arbeta isolerat |
| **HEAD** | Pekaren till den commit du arbetar på just nu |
| **Remote** | Ett repository på en annan plats, till exempel GitHub. Standardnamnet är `origin` |
| **Konflikt** | Git kan inte avgöra vilken ändring som ska gälla, och du måste välja |
