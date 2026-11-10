---
title: "Lathund: kommandotolken"
description: "Kommandotolken (cmd) i Windows i lathundsform: navigering, filhantering, filsökning, systeminformation, nätverk och användarkonton."
parent: Lathund
nav_order: 973
---
# Lathund: kommandotolken

Kommandotolken (cmd) är ett textbaserat gränssnitt i Windows. Du skriver ett kommando och trycker Enter. Den används för att navigera i mappar, hantera filer och felsöka, och den finns i alla Windows-versioner.

Läs mer: [Verktyg](../tools/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Starta | Windowstangenten, skriv `cmd`, tryck Enter |
| Aktuell mapp | Visas före markören, till exempel `C:\Users\anna>` |
| Hjälp | `help` visar alla kommandon. `help <kommando>` eller `<kommando> /?` visar hjälp för ett kommando |
| Mellanslag i namn | Sätt citattecken runt sökvägen: `cd "Mina dokument"` |

## Navigering

| Kommando | Betydelse | Exempel |
|----------|-----------|---------|
| `cd <mapp>` | Byter till en mapp | `cd MinaDokument` |
| `cd ..` | Går upp en mapp | `cd ..` |
| `cd \` | Går till rotmappen på aktuell enhet | `cd \` |
| `C:` | Byter enhet | `D:` |
| `dir` | Listar filer och mappar i aktuell mapp | `dir` |
| `cls` | Rensar skärmen | `cls` |

## Filhantering

| Kommando | Betydelse | Exempel |
|----------|-----------|---------|
| `mkdir <namn>` | Skapar en mapp | `mkdir nyKatalog` |
| `copy <från> <till>` | Kopierar en fil | `copy fil1.txt fil2.txt` |
| `move <från> <till>` | Flyttar eller byter namn på en fil | `move fil.txt nyPlats\` |
| `ren <gammalt> <nytt>` | Byter namn på en fil | `ren gammaltNamn.txt nyttNamn.txt` |
| `del <fil>` | Raderar en fil. Raderingen är permanent | `del onodigFil.txt` |
| `rmdir <mapp>` | Raderar en tom mapp | `rmdir gammalKatalog` |
| `rmdir /s <mapp>` | Raderar en mapp med allt innehåll. Permanent | `rmdir /s gammalMapp` |
| `start .` | Öppnar aktuell mapp i Utforskaren | `start .` |
| `start <fil>` | Öppnar en fil i standardprogrammet | `start fil.txt` |

## Filsökning

| Kommando | Betydelse | Exempel |
|----------|-----------|---------|
| `dir /s <namn>` | Söker i aktuell mapp och alla undermappar | `dir /s fil.txt` |
| `dir /w` | Visar filer i flera kolumner | `dir /w *.md` |
| `dir /ah` | Visar dolda filer | `dir /ah` |
| `where <program>` | Visar sökvägen till ett program eller en fil i PATH | `where notepad.exe` |

## Systeminformation och processer

| Kommando | Betydelse |
|----------|-----------|
| `systeminfo` | Visar detaljerad systeminformation |
| `tasklist` | Listar körande processer |
| `taskkill /PID <id>` | Avslutar en process med angivet PID |

## Nätverk

| Kommando | Betydelse | Exempel |
|----------|-----------|---------|
| `ipconfig` | Visar nätverkskonfiguration, till exempel IP-adress | `ipconfig` |
| `ping <adress>` | Skickar testpaket till en adress och visar svarstider | `ping www.google.com` |
| `netstat` | Visar öppna anslutningar och portar | `netstat -an` |

## Användarkonton

| Kommando | Betydelse | Exempel |
|----------|-----------|---------|
| `whoami` | Visar inloggat användarnamn | `whoami` |
| `net user` | Listar användarkonton | `net user` |
| `net user <namn>` | Visar information om ett konto | `net user anna` |

## Jämförelser

| Jämför | Skillnad |
|--------|----------|
| `cd` vs `start .` | `cd` byter mapp i terminalen. `start .` öppnar mappen i Utforskaren |
| `del` vs `rmdir /s` | `del` raderar filer. `rmdir /s` raderar en mapp med allt i den |
| `dir` vs `dir /s` | `dir` visar bara aktuell mapp. `dir /s` söker även i undermapparna |

## Vanliga misstag

- **`del` och `rmdir /s` raderar utan papperskorg.** Det finns ingen ångra. Kontrollera vad som ska raderas med `dir` först.
- **Mellanslag i namn.** `cd Mina dokument` misslyckas. Skriv `cd "Mina dokument"`.
- **Fel mapp.** Kontrollera prompten före markören innan du kör filkommandon.
- **Kommandot finns inte.** Då är det ofta stavfel, eller programmet är inte installerat. Kontrollera med `where`.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Prompt** | Texten som visar var du är, och där du skriver kommandon |
| **Sökväg** (path) | Adressen till en fil eller mapp, till exempel `C:\Users\anna\dokument` |
| **Rotmapp** | Mappen högst upp på en enhet, till exempel `C:\` |
| **PATH** | Lista över mappar som Windows söker i när du skriver ett programnamn |
| **PID** | Processens nummer, används för att identifiera en körande process |
| **Switch** | Flagga som ändrar hur ett kommando fungerar, skrivs med `/`, till exempel `/s` |
