---
title: Kodgranskning
description: "Tester fångar buggar. Kodgranskningar fångar problemen innan de ens blir buggar. När kollegor läser din kod innan den går ut blir resultatet bättre kod…"
parent: Testa din kod
nav_order: 20
---

# Kodgranskning i praktiken

Tester fångar buggar. Kodgranskningar fångar problemen innan de ens blir buggar. När kollegor läser din kod innan den går ut blir resultatet bättre kod, bredare kunskapsspridning och färre produktionshaverier.

## TL;DR

- En kodgranskning är en konversation, inte en dom.
- Små pull requests granskas snabbare och bättre.
- Checklista: logik, felhantering, säkerhet, prestanda, namn, tester.

---

## Förbered pull requesten

1. **Håll den fokuserad.** En funktion eller en buggfix. En massiv "allt på en gång"-PR gör alla trötta och missar detaljer.
2. **Beskriv varför.** Två meningar om vad som ändrats och varför hjälper varje granskare att förstå syftet.
3. **Länka kontext.** Issue-id, API-kontrakt, designbeslut — allt som förklarar varför du valde den lösningen.
4. **Kommentera dina egna oklara val.** "Jag testade X men valde Y på grund av Z" sparar tid och visar att du tänkt igenom alternativen.
5. **Kör tester lokalt.** Skicka aldrig upp en PR som kraschar vid uppstart.

---

## Checklista för granskaren

| Område            | Fråga                                                               |
|-------------------|---------------------------------------------------------------------|
| Logik             | Gör koden exakt det som beskrivningen säger?                        |
| Felhantering      | Vad händer vid null, tom lista, timeout?                            |
| Säkerhet          | Finns inputvalidering, rätt auth/claims?                            |
| Prestanda         | Är LINQ eller loopar rimliga för mängden data?                      |
| Namn och struktur | Är variabelnamn tydliga? Är metoderna lagom korta?                  |
| Testbarhet        | Finns tester? Om nej: varför?                                       |
| Dokumentation     | Behöver README eller API-kommentarer uppdateras?                    |

Lägg gärna in checklistan i ett PR-template så att alla i teamet följer samma vana.

---

## Tips för granskaren

- **Läs beskrivningen först.** Hoppa inte direkt in i diffen — förstår du syftet går granskningen snabbare.
- **Fokusera på risk.** Mer tid på säkerhet, databaslogik och parallellism, mindre på blanksteg.
- **Var tydlig med tonen.** "Kan vi byta ut `DateTime.Now` mot `DateTime.UtcNow`?" fungerar bättre än "Det här är fel".
- **Testa lokalt när det behövs.** Speciellt vid UI-ändringar eller komplex affärslogik.
- **Godkänn inte allt på en gång.** Markera "approved pending minor changes" när bara småsaker återstår.

---

## Tips för den som får feedback

- Feedback på koden är inte feedback på dig som person.
- Fråga när du inte förstår — "vad menar du med det?" är bättre än att gissa och implementera fel.
- Besvara varje kommentar, även om svaret bara är "fixat". Då vet granskaren att du sett den.
- Reagera snabbt. Behöver du mer tid, skriv det.

---

## Verktyg som hjälper

- **PR-templates på GitHub** — checklista och sammanfattning återanvänds automatiskt på varje ny PR.
- **GitHub Suggested Changes** — låt granskaren klistra in en kodrättning direkt utan att du behöver tolka texten.
- **`dotnet format` och Roslyn analyzers** — automatisera stilfrågor så att granskningen kan fokusera på logiken.
- **Pair review** — ibland är 10 minuter i Teams snabbare än en lång kommentarstråd.

---

## När hoppar du över granskning?

- Pipeline-skript och konfiguration som redan testas automatiskt i CI.
- Ren dokumentation som inte påverkar körbar kod.
- Prototyper och spikes som kastas direkt efteråt — men skriv ett "ingen granskning, slängs sen" i PRn ändå.

---

## Övningar

1. Skapa ett PR-template för ett C#-projekt med checklistan från den här sidan.
2. Granska följande kod och lista minst tre förbättringsförslag:
   ```csharp
   public string GetUserData(int id)
   {
       var db = new DatabaseConnection();
       var result = db.Query("SELECT * FROM users WHERE id = " + id);
       return result.ToString();
   }
   ```
3. Skriv kommentarer (som GitHub-kommentarer) till koden ovan — formulera dem som konversation, inte dom.
