---
title: "GitHub Actions — CI/CD"
description: "Kör dina tester automatiskt varje gång du pushar kod — innan en bugg ens hinner nå huvudgrenen."
parent: Git
nav_order: 30
---

# GitHub Actions — automatiska tester vid varje push

Du har lärt dig att skriva och köra tester lokalt (se [Testa din kod](../../testa-din-kod/index.md)). Problemet: ett test som bara körs när *du* kommer ihåg att köra det är ett test som förr eller senare glöms bort — särskilt precis innan en deadline. **CI** (Continuous Integration) löser det genom att köra testerna automatiskt, åt dig, varje gång du pushar kod till GitHub.

## Vad är en workflow?

En **workflow** är en fil som beskriver vad GitHub ska göra automatiskt, och när. Den ligger i en specifik mapp i ditt repo:

```
mittprojekt/
└── .github/
    └── workflows/
        └── test.yml
```

GitHub letar automatiskt efter `.yml`-filer i `.github/workflows/` och kör dem enligt de villkor du anger — inget extra att installera, det är inbyggt i varje GitHub-repo.

## En enkel test-workflow

```yaml
name: Kör tester

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checka ut koden
        uses: actions/checkout@v4

      - name: Installera .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '8.0.x'

      - name: Återställ paket
        run: dotnet restore

      - name: Bygg
        run: dotnet build --no-restore

      - name: Kör tester
        run: dotnet test --no-build
```

Läs det som en receptlista, uppifrån och ner:

- **`on:`** — när ska workflown köras? Här: vid varje pull request mot `main`, och vid varje push till `main`.
- **`runs-on:`** — vilken typ av maskin ska köra det? En färsk virtuell Ubuntu-maskin, varje gång.
- **`steps:`** — de faktiska kommandona, i ordning. Samma kommandon du redan kör lokalt (`dotnet build`, `dotnet test`) — bara att GitHub kör dem åt dig.

## Vad du faktiskt ser hända

Pusha en commit eller öppna en pull request, och GitHub kör hela workflown i bakgrunden. Resultatet syns direkt i GitHub:

- ✅ Grön bock — alla steg lyckades, testerna är gröna
- ❌ Rött kryss — något steg misslyckades (ofta: ett test failade)

Klickar du på resultatet ser du exakt vilket steg som gick fel och den fullständiga loggen — samma information du hade fått lokalt, bara körd på GitHubs servrar istället för din egen dator.

## Varför en PR-gate spelar roll

Kombinerar du workflown med en branch protection-regel ("kräv gröna checks innan merge till `main`") blir det omöjligt att av misstag merga in kod som inte kompilerar eller vars tester failar. Det är skillnaden mellan "vi hoppas att alla kört testerna innan de pushade" och "det är fysiskt omöjligt att komma runt testerna" — en regel istället för en förhoppning.

## Utöka workflown

Samma mönster går att bygga vidare på för mer än bara tester:

```yaml
      - name: Kodtäckning
        run: dotnet test --collect:"XPlat Code Coverage"

      - name: Publicera artefakt
        if: github.ref == 'refs/heads/main'
        run: dotnet publish -c Release -o ./publish
```

`if: github.ref == 'refs/heads/main'` gör att det sista steget bara körs på `main`, inte på varje pull request — publicering hör till efter merge, inte till varje förslag på en ändring.

## Obligatorisk dad-joke

Varför litade teamet på sin CI-pipeline?

Den glömde aldrig köra testerna, till skillnad från alla i teamet.
