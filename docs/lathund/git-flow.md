---
title: "Lathund: Git Flow"
description: "Git Flow i lathundsform: branchstrukturen main, develop och feature-grenar, pull requests, hotfix och de vanligaste kommandona."
parent: Lathund
nav_order: 972
---
# Lathund: Git Flow

Git Flow är en branchstrategi för team. Stabil kod ligger i `main`, pågående arbete i `develop`, och varje ny funktion i en egen gren. Du ändrar aldrig `main` eller `develop` direkt, utan går via pull requests.

Läs mer: [Verktyg](../tools/index.md).

## Snabbfakta

| Gren | Syfte | Får pushas direkt? | Hur ändras den |
|------|-------|--------------------|----------------|
| `main` | Produktionskod, alltid körbar och deploybar | Nej | Pull request från `develop` eller `hotfix/*` |
| `develop` | Integration av nästa release, alltid testbar | Nej | Pull request från `feature/*` |
| `feature/*` | En ny funktion, en user story | Ja, det är din gren | Commits, sedan pull request till `develop` |
| `bugfix/*` | Fix av en bugg i `develop` | Ja, det är din gren | Pull request till `develop` |
| `hotfix/*` | Akut fix i produktion | Ja, det är din gren | Pull request till `main` och till `develop` |

## Namngivning

| Prefix | Användning | Exempel |
|--------|------------|---------|
| `feature/` | Ny funktion | `feature/user-login` |
| `bugfix/` | Buggfix | `bugfix/fel-i-summering` |
| `hotfix/` | Kritisk fix till `main` | `hotfix/inloggning-sårbarhet` |
| `refactor/` | Kodförbättring utan ny funktion | `refactor/extrahera-tokenservice` |
| `test/` | Ändringar i tester | `test/login-integration` |
| `docs/` | Dokumentation | `docs/readme-installation` |

Namnet ska säga vad grenen gör. `feature/stuff` och `my-branch` säger ingenting.

## Operationer

### Starta en feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/user-login
```

Gör alltid `git pull` på `develop` innan du skapar grenen. Annars börjar du från en gammal version.

### Committa och pusha

```bash
git add .
git commit -m "feat: lägg till inloggningsendpoint"
git push -u origin feature/user-login
```

Pusha alltid till din feature-gren, aldrig till `develop`. `-u` behövs bara första gången.

### Uppdatera din gren från develop

```bash
git fetch origin develop
git merge origin/develop
```

Lös eventuella konflikter lokalt, kör testerna, och pusha sedan. Då syns konflikter innan pull requesten.

### Skapa pull request

1. Gå till repositoryt på GitHub, välj **Pull requests** och **New pull request**.
2. Välj **base** `develop` och **compare** din feature-gren.
3. Skriv en beskrivning och välj reviewers.
4. Vänta på att CI blir grön och på godkännande.
5. Välj **Merge pull request**.

### Efter merge

```bash
git checkout develop
git pull origin develop
git branch -d feature/user-login
git push origin --delete feature/user-login
```

Aktivera *Automatically delete head branches* under repositoryts Settings, så raderas grenen automatiskt efter merge.

### Release till main

```bash
git checkout main
git pull origin main
git tag -a v1.1.0 -m "Release 1.1.0"
git push origin v1.1.0
```

Gör först en pull request från `develop` till `main`. Taggen sätts efter merge.

| Ändring | Taggnamn |
|---------|----------|
| Stor ändring som bryter kompatibilitet | `v2.0.0` |
| Ny funktion | `v1.1.0` |
| Buggfix | `v1.1.1` |

### Hotfix

```bash
git checkout main
git pull origin main
git checkout -b hotfix/inloggning-sårbarhet
# ... fixa och committa ...
git push -u origin hotfix/inloggning-sårbarhet
```

Gör två pull requests: en till `main` och en till `develop`. Då finns fixen kvar när `develop` nästa gång mergas till `main`.

## Jämförelser

| Jämför | Skillnad |
|--------|----------|
| `feature/*` vs `develop` | Feature-grenen är din arbetsyta. `develop` är gemensam och ska alltid vara testbar |
| `merge` vs `rebase` | `merge` bevarar historiken. `rebase` skriver om din gren ovanpå `develop`. Rebase bara på grenar som ingen annan använder |
| Hotfix vs feature | Hotfix startar från `main` och mergas till både `main` och `develop` |

## Vanliga misstag

- **Push direkt till `main` eller `develop`.** Det kringgår review och CI. Skydda grenarna i GitHub, så att direkta pushar blockeras.
- **Commit på fel gren.** Om du inte har pushat: `git reset --soft HEAD~1`, sedan `git checkout -b feature/ny-gren` och committa igen.
- **Långlivade feature-grenar.** Om grenen lever i flera veckor blir konflikterna stora. Dela upp arbetet och mergea ofta.
- **`git push --force` på `main` eller `develop`.** Det raderar andras arbete. Om grenen är skyddad går det inte.
- **Merge utan att testa.** Kör testerna lokalt, både före och efter merge.
- **Glömt att pusha.** Commits som bara finns på din dator syns inte för teamet.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Branchstrategi** | Regler för hur grenar skapas, används och mergas |
| **Pull request** (PR) | En begäran om att mergea en gren, med granskning och CI |
| **Review** | Någon annan granskar koden innan merge |
| **CI** | Automatisk byggning och testning när du pushar eller öppnar en PR |
| **Branch protection** | Regler på GitHub som förhindrar direkta pushar och kräver godkännande |
| **Hotfix** | Akut fix som går direkt till produktion |
| **Tag** | Ett namn på en specifik commit, till exempel en release |
