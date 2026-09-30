---
title: Planera innan du kodar
description: "Användare-first, user stories och API-design — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Övrigt
nav_order: 25
---
# Planera innan du kodar

Det pratas mycket om hur man kodar — vilka verktyg, vilka mönster, vilka ramverk. Det pratas för lite om vad man tänker på **innan** det första tecknet skrivs i editorn.

> Fördjupning: [Tänk innan du kodar](https://marcusmedina.pro/sv/junior-tips/tank-innan-du-kodar/) på marcusmedina.pro

## När du läst detta ska du kunna

- Förklara vad "user-first design" innebär
- Skriva user stories på formeln Som / Vill / För att
- Identifiera tekniska "måsten" innan du kodar
- Designa API:er ur anroparen's perspektiv

## Steg 1 — Börja med användaren

Innan du öppnar Visual Studio: vem ska använda det du bygger?

```
Fråga dig:
1. Vad behöver användaren faktiskt göra?
2. Hur vill de att det ska kännas? (Snabbt? Enkelt?)
3. Vad vill de se på skärmen?
```

Det kallas ibland "user-first design" och det är grunden för all bra mjukvara — oavsett om det är en mobilapp, ett API eller ett internt verktyg.

## User stories — Som / Vill / För att

En user story formulerar ett behov ur användarens perspektiv:

```
Som [vem]
Vill jag [vad]
För att [varför / vilket värde]
```

**Exempel:**
```
Som inloggad kund
Vill jag se mina tidigare beställningar
För att kunna följa upp leveransstatus

Som administrator
Vill jag kunna blockera ett konto
För att stoppa obehörig åtkomst

Som ny användare
Vill jag kunna registrera mig med min e-postadress
För att slippa ett separat konto
```

User stories håller fokus på **vad och varför** — inte hur. Tekniken väljer du sen.

## Steg 2 — Identifiera "måstena"

När du har en bild av användaren och deras behov: tekniska beslut.

```
// Pseudokod för tankesättet

start:
  förstå användaren
  förstå deras mål
  förstå deras smärtpunkter
  ← SEDAN: tekniska beslut
```

Checklista:
- Autentisering? Behövs inloggning, eller är det öppet?
- Databas? Vad behöver sparas? Hur länge?
- Server eller lokal? Webbapp, desktop, API?
- Integrationer? Ska det prata med andra system?

## API-design — din användare är ofta en annan utvecklare

Om du bygger ett API är användaren av koden en programmerare. Samma princip gäller: hur enkelt är det att använda?

```csharp
// Tekniker-first — vad är det ens för skillnad på de tre bool-parametrarna?
public object GetUserData(int id, bool includeInternalMetadata, bool throwOnMissing)
```

```csharp
// Användare-first — tydligt vad varje metod gör
public UserProfile? GetUser(int id)
public UserProfile GetUserOrThrow(int id)
public UserProfile GetUserWithMetadata(int id)
```

Varje metod gör en sak. Namnet förklarar vad som händer — inklusive om den kastar undantag.

## Flödet — klart i huvudet innan fingrarna rör tangenterna

```csharp
// Innan du skriver implementationen, skriv anropet
// Hur vill du att det ska se ut att använda din klass?

var order = new Order(customerId: 42, items: cart.Items);
await orderService.PlaceAsync(order);

// När du gillar anropet — SEDAN designar du klassen och metoden.
```

Det här kallas "API-first thinking" och ger renare, mer användbar kod.

## Tre frågor att ställa innan du kodar

1. **Vem är användaren?** (person, system, annan klass?)
2. **Vad försöker de uppnå?** (inte hur — vad)
3. **Hur enkelt ska det vara att nå dit?** (antal klick, rader kod, läsbarhet)

Svar på de tre frågorna klara → öppna editorn.

## TL;DR

```
Som [vem] Vill jag [vad] För att [varför]
```

- Börja alltid med användaren — inte tekniken
- Skriv user stories för att hålla fokus på behovet
- Designa API:er ur anroparen's perspektiv — testa anropet innan du skriver implementationen
- Fem minuters planering sparar timmar av omskrivning
