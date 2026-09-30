---
title: Domänkunskap och AI
description: "Varför du fortfarande måste förstå kod — AI, vibe-coding och 168 potentiella fel — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: AI
nav_order: 10
---
# Domänkunskap och AI

AI kan generera kod snabbare än du någonsin kan skriva den. Det gör inte din kodkunskap värdelös — det gör den mer värdefull.

> Utökat resonemang: [Det är inte kört](https://marcusmedina.pro/sv/junior-tips/det-ar-inte-kort/) på marcusmedina.pro

## När du läst detta ska du kunna

- Förklara vad "domänkunskap" innebär i programmeringssammanhang
- Identifiera kod som AI genererat men som innehåller fel
- Sätta rätt förväntningar på vad AI-assisterad kodning kan och inte kan

## Tre sorters fel som AI gör

AI-genererad kod har tre typiska källorna till problem — och ingen av dem är AI:ns fel.

### 1. Bristande domänkunskap

AI svarar på frågan du ställde — inte på frågan du *borde* ha ställt. Den känner inte ditt systems affärslogik, säkerhetsmodell eller varför just den regeln finns.

```csharp
// Du: "Optimera den här användarfrågan"
var users = db.Users
    .Where(u => u.IsActive)
    .ToList()                    // ← Laddar ALLA aktiva användare i minnet
    .Where(u => u.LastLogin > DateTime.Now.AddDays(-30));
```

Koden kompilerar. Den ser rimlig ut. Men `.ToList()` exekverar frågan mot databasen direkt — allt som återstår är LINQ på en C#-lista i minnet. Har du 50 000 aktiva användare laddar du alla 50 000 och filtrerar sedan lokalt.

Rätt version:

```csharp
// Hela filtret körs i databasen — ett anrop, bara relevanta rader
var users = db.Users
    .Where(u => u.IsActive && u.LastLogin > DateTime.Now.AddDays(-30))
    .ToList();
```

Utan kännedom om hur LINQ deferred execution fungerar ser du inte felet — ens när du läser koden.

### 2. Systematisk okunskap

Det du inte vet kan du inte efterfråga. Om du ber AI:n om ett autentiseringssystem men inte känner till OWASP session management-regler, vet du inte vilka frågor du ska ställa — och AI:n svarar på de du ställde.

```csharp
// AI genererade en "enkel inloggning" — ser rimlig ut
public bool Login(string username, string password)
{
    var user = db.Users.FirstOrDefault(u => u.Username == username);
    return user?.Password == password;   // ← Lösenord i klartext jämfört
}
```

Den systematiska okunskapen är inte att du gjorde fel fråga — det är att du inte visste att lösenord inte ska lagras i klartext.

### 3. Otydliga instruktioner

"Förbättra namngivningen" är en otydlig instruktion. AI:n vet inte vad som är "heligt" i din kodbas.

```csharp
// Instruktion: "förbättra namngivningen"
// Innan:
public class UserManager { }
public void ProcessUser(User u) { }

// Efter (AI döpte om allt):
public class PersonHandler { }
public void HandlePerson(Person p) { }

// Resultat: kompilerar inte — hela resten av kodbasen refererar till det gamla namnet
```

## Vad du faktiskt lär dig

Att studera programmering idag handlar om att se felen som AI inte ser.

```python
# Vad som saknas i ren vibe-coding
def vibe_code(prompt):
    result = ai.generate(prompt)
    # - Domänkunskap: matchar detta affärsreglerna?
    # - Systematisk kunskap: finns dolda prestanda/säkerhetsproblem?
    # - Tydliga instruktioner: vad är "heligt" i kodbasen?
    return result
```

AI ersätter inte en programmerare som förstår koden. Den ger dig en produktiv **junior kollega** som du måste granska.

## Praktiskt — läs AI-kod kritiskt

Nästa gång du tar emot AI-genererad kod, fråga:

```
Checklista för AI-kod

☐ Kompilerar det?
☐ Gör det vad jag bad om?
☐ Gör det mer än vad jag bad om? (sidoeffekter)
☐ Är det säkert? (SQL-injektion, autentisering, lösenord)
☐ Presterar det rimligt? (onödiga anrop, saknade index, LINQ-fällor)
☐ Passar det kodbasens konventioner och struktur?
```

Tre nej på listan → kasta det och försök igen med bättre instruktioner.

## TL;DR

- AI svarar på frågan du ställde — du ansvarar för att ställa rätt fråga
- Domänkunskap låter dig se felen i annars rimlig kod
- Behandla AI som en produktiv junior: granska alltid, lita aldrig blint
- Du blir inte ersatt av AI — du blir den som håller koll på felen AI-kod innehåller
