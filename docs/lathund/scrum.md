---
title: "Lathund: Scrum"
description: "Scrum i lathundsform: roller, artefakter, events, estimering och user stories med tabeller."
parent: Lathund
nav_order: 975
---
# Lathund: Scrum

Scrum är ett ramverk för agil utveckling. Arbetet delas upp i korta perioder, sprintar på en till fyra veckor, och i slutet av varje sprint finns en fungerande del av produkten. Ramverket beskriver roller, artefakter och events, men inte exakt hur man skriver kod.

Läs mer: [Verktyg](../tools/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Tidsram | Sprint, en till fyra veckor. Samma längd varje gång |
| Resultat | En increment: fungerande, testad och deploybar del av produkten |
| Källa | [Scrum Guide](https://scrumguides.org) |
| Ansvar | Teamet äger arbetet. Ingen enskild person äger det |

## Roller

| Roll | Ansvar |
|------|--------|
| **Product Owner** | Prioriterar Product Backlog och ser till att teamet bygger rätt sak |
| **Scrum Master** | Ser till att Scrum följs, hjälper teamet och tar bort hinder |
| **Developers** | Bygger increment, planerar sprinten och ansvarar för kvaliteten |

Teamet är en enhet. Det finns inga "projektledare" eller "testare" som ligger utanför.

## Artefakter

| Artefakt | Innehåll | Ägare |
|----------|----------|-------|
| **Product Backlog** | Allt som ska göras i produkten, prioriterat | Product Owner |
| **Sprint Backlog** | De objekt som valts för sprinten, plus plan för hur de ska göras | Developers |
| **Increment** | Summan av allt färdigt under sprinten | Developers |
| **Sprint Goal** | Ett mål för sprinten, helst en mening | Teamet |

Definition of Done är kriterierna för att ett objekt är klart. Vanliga exempel: tester är gröna, koden är granskad, och den går att deploya.

## Events

| Event | När | Längd | Syfte |
|-------|-----|-------|-------|
| **Sprint Planning** | Starten av sprinten | Max 8 timmar för en månad, kortare för kortare sprintar | Välja objekt och bestämma Sprint Goal |
| **Daily Scrum** | Varje arbetsdag, samma tid | Max 15 minuter | Planera nästa dygn och lyfta hinder |
| **Sprint Review** | Slutet av sprinten | Proportionell mot sprintlängden | Visa increment och samla feedback |
| **Sprint Retrospective** | Efter Review, innan nästa sprint | Proportionell mot sprintlängden | Förbättra teamets arbetssätt |

Tiderna är maxgränser. Scrum Guide anger dem proportionellt mot sprintens längd, så en sprint på en vecka har kortare event än en månad.

### Vanligt format för Daily Scrum

Många team går igenom tre frågor. Scrum Guide kräver inte dem.

1. Vad blev klart sedan förra mötet?
2. Vad planerar vi att göra fram till nästa möte?
3. Vilka hinder finns?

### Start, Stop, Continue

Ett vanligt format för Retrospective:

| Kategori | Fråga |
|----------|-------|
| Start | Vad ska vi börja göra? |
| Stop | Vad ska vi sluta göra? |
| Continue | Vad fungerar bra och ska vi fortsätta med? |

## Estimering

Story points mäter storlek och komplexitet, inte tid. En vanlig skala är Fibonacci-talen.

| Poäng | Ungefärlig storlek |
|-------|--------------------|
| 1 | Mycket litet |
| 2 | Litet |
| 3 | Medel |
| 5 | Stort |
| 8 | Mycket stort |
| 13 | För stort. Bryt ner det |

**Planning Poker:** alla väljer ett kort samtidigt. Om korten skiljer sig mycket förklarar de med högst och lägst poäng, och teamet röstar igen.

**Velocity** är summan av story points för färdiga objekt per sprint. Den används för att planera nästa sprint, men den är ett underlag, inte ett mål.

## User stories

### INVEST

| Bokstav | Betydelse |
|---------|-----------|
| **I** | Independent: kan byggas separat |
| **N** | Negotiable: kan diskuteras och ändras |
| **V** | Valuable: ger värde för en användare |
| **E** | Estimable: kan uppskattas |
| **S** | Small: får plats i en sprint |
| **T** | Testable: kan verifieras |

### Mall

```markdown
# US-001: Inloggning

**Som** användare
**vill jag** logga in med e-post och lösenord
**så att** jag kommer åt mitt konto

**Acceptanskriterier**

- Given en registrerad användare
  När jag skickar rätt uppgifter
  Då får jag en token och status 200

**Story points:** 5
```

## Jämförelser

| Jämför | Skillnad |
|--------|----------|
| Product Backlog vs Sprint Backlog | Product Backlog är hela produkten. Sprint Backlog är det som ska göras nu |
| Sprint Review vs Retrospective | Review handlar om produkten. Retrospective handlar om arbetssättet |
| Story points vs timmar | Points mäter relativ storlek. Timmar är en tidsuppskattning |

## Vanliga misstag

- **Sprint Goal med tre mål.** Om det är flera mål blir det svårt att veta om sprinten lyckades. Välj ett.
- **Objekt som inte är klart räknas.** Bara det som uppfyller Definition of Done räknas in i increment.
- **Daily Scrum som statusmöte till Scrum Master.** Teamet pratar med varandra, inte med ledaren.
- **Retrospective utan åtgärder.** Varje retro ska ge minst en konkret förbättring till nästa sprint.
- **Velocity som prestationsmått.** Det används för planering, inte för att jämföra personer.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Sprint** | En tidsbegränsad period där en increment skapas |
| **Increment** | Summan av färdiga objekt i produkten |
| **Product Backlog** | Prioriterad lista över allt som kan göras i produkten |
| **User story** | En beskrivning av en funktion ur användarens perspektiv |
| **Story point** | Relativ enhet för storlek och komplexitet |
| **Velocity** | Story points som blivit klara per sprint |
| **Definition of Done** | Kriterierna för att ett objekt är klart |
| **Impediment** | Ett hinder som stoppar arbetet |
