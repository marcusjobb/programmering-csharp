---
title: "if / else"
description: "if / else i If — C#-boken av Marcus Ackre Medina"
layout: default
parent: "If"
nav_order: 5
---

# Lästext — if / else

## Vad är ett villkor?

Program behöver fatta beslut. Ska rabatt ges eller inte? Är användaren inloggad? Är poängen tillräcklig för ett godkänt betyg? Det är just det ett villkor gör — det avgör om ett kodblock ska köras eller hoppas över.

I C# bygger alla villkor på ett **bool-uttryck**: ett uttryck som antingen är `true` eller `false`. Beroende på svaret väljer programmet vilken väg det ska ta.

---

## if — enklaste formen

`if` är det enklaste sättet att ställa en fråga i kod. Om villkoret är sant körs blocket inuti klamrarna. Om det är falskt händer ingenting och programmet fortsätter vidare.

```csharp
int age = 20;

if (age >= 18)
{
    Console.WriteLine("Du är myndig.");
}
```

Lägg märke till att klamrarna `{ }` inte är obligatoriska om blocket bara har en rad — men det är god vana att alltid skriva dem. Det minskar risken för logikfel när du lägger till fler rader senare.

---

## if / else — antingen eller

Ibland vill du göra något också när villkoret är falskt. Då lägger du till en `else`-gren. Det är ett "antingen-eller" — exakt en av grenarna körs alltid.

```csharp
int age = 15;

if (age >= 18)
{
    Console.WriteLine("Du är myndig.");
}
else
{
    Console.WriteLine("Du är inte myndig ännu.");
}
```

Tänk på det som en vägkorsning: du tar antingen vänster eller höger, men aldrig båda.

---

## if / else if / else — kedja av villkor

När du har fler än två möjliga utfall kan du kedja ihop villkor med `else if`. Villkoren testas uppifrån och ner, och **det första** som är sant vinner. Resten hoppas över.

```csharp
int score = 72;

if (score >= 90)
{
    Console.WriteLine("Du fick A — Utmärkt!");
}
else if (score >= 70)
{
    Console.WriteLine("Du fick B — Bra jobbat!");
}
else
{
    Console.WriteLine("Du fick F — Försök igen.");
}
```

Ordningen spelar roll. Om du vänder på de två första raderna och skriver `>= 70` innan `>= 90` — vad händer då med en som har 95 poäng?

```mermaid
flowchart TD
    A[Starta] --> B{score >= 90?}
    B -->|Ja| C[Skriv: Du fick A]
    B -->|Nej| D{score >= 70?}
    D -->|Ja| E[Skriv: Du fick B]
    D -->|Nej| F[Skriv: Du fick F]
    C --> G[Slut]
    E --> G
    F --> G
```

---

## Jämförelseoperatorer

För att bygga villkor behöver du jämföra värden. Här är de operatorer du använder:

| Operator | Betydelse | Exempel |
|----------|-----------|---------|
| `==` | Lika med | `score == 100` |
| `!=` | Inte lika med | `name != "Admin"` |
| `<` | Mindre än | `age < 18` |
| `>` | Större än | `score > 90` |
| `<=` | Mindre än eller lika med | `temperature <= 0` |
| `>=` | Större än eller lika med | `score >= 70` |

En vanlig nybörjarfälla: `=` tilldelar ett värde, `==` jämför två värden. Det är en liten skillnad som ger stora fel.

---

## Logiska operatorer

Du kan kombinera flera villkor i ett enda uttryck med logiska operatorer.

**`&&` — och:** Båda villkoren måste vara sanna.

```csharp
int age = 22;
bool hasDriversLicence = true;

if (age >= 18 && hasDriversLicence)
{
    Console.WriteLine("Du får hyra bil.");
}
```

**`||` — eller:** Minst ett av villkoren måste vara sant.

```csharp
bool isAdmin = false;
bool isTeacher = true;

if (isAdmin || isTeacher)
{
    Console.WriteLine("Du har tillgång till materialet.");
}
```

**`!` — inte:** Vänder på sanningsvärdet. `true` blir `false`, och tvärtom.

```csharp
bool isLoggedIn = false;

if (!isLoggedIn)
{
    Console.WriteLine("Du måste logga in först.");
}
```

---

## Nästlade if

Det är möjligt att placera ett `if`-block inuti ett annat. Det kallas nästling.

```csharp
int age = 20;
bool hasTicket = true;

if (age >= 18)
{
    if (hasTicket)
    {
        Console.WriteLine("Välkommen in!");
    }
    else
    {
        Console.WriteLine("Du saknar biljett.");
    }
}
else
{
    Console.WriteLine("Du är för ung för att komma in.");
}
```

Nästling fungerar, men var försiktig. Mer än två nivåer djup brukar vara ett tecken på att koden kan förenklas — antingen med `&&`, eller genom att bryta ut logiken i en egen metod. Djup nästling är svår att läsa och ännu svårare att felsöka.

---

## Fördjupning — Labyrinth och logiska operatorer

I filmen *Labyrinth* (1986) vaktar två karaktärer två dörrar. En talar alltid sanning, en ljuger alltid — men du vet inte vem som är vem. Du får bara ställa en fråga.

Den klassiska lösningen: *"Om jag frågade den andre vakten vilken dörr som leder till slottet, vad skulle hen svara?"* — och välj sedan motsatsen.

Det fungerar för att `!(!x)` är samma som `x`. Lögnarens svar är `!sanning`, och om du vänder på det igen (`!`) får du tillbaka sanningen.

I kod:

```csharp
bool guardTellsTruth = false; // vi vet inte om detta är sant
bool doorIsRight = true;

// Vaktens svar om den ljuger:
bool answer = guardTellsTruth ? doorIsRight : !doorIsRight;

// Välj alltid motsatsen till vad den tillfrågade vakten säger:
bool rightChoice = !answer;
```

Se scenen: [youtu.be/ReFhu8KYbmU](https://www.youtube.com/watch?v=ReFhu8KYbmU)

**Se även:** [switch.md](switch.md) för ett alternativ när du har många fasta värden att jämföra, och `operatorer.md` i `programmeringstermer/` för en fullständig genomgång av operatorer.
