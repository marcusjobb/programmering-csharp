---
title: "Lathund: do-while"
description: "do-while-loopen i C#: efterkontroll, jämförelse med while, break, continue och vanliga misstag."
parent: Lathund
nav_order: 52
---
# Lathund: do-while

`do-while` upprepar ett kodblock och kontrollerar villkoret efter varje varv. Blocket körs därför minst en gång. Används till exempel för en meny som ska visas minst en gång.

Läs mer: [Loopar](../loops/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Typ | Efterkontrollsloop: villkoret prövas efter varje varv |
| Antal varv | Minst 1 |
| Semikolon | Krävs efter `while (villkor)` |
| Avslut | När villkoret blir falskt, eller med `break` |

## Operationer

| Nyckelord | Betydelse | Exempel | Resultat |
|-----------|-----------|---------|----------|
| `do { ... }` | Inleder blocket som ska köras | `do { ... }` | Blocket körs minst en gång |
| `while (villkor);` | Avslutar loopen och prövar villkoret | `while (i <= 5);` | Loopen fortsätter om villkoret är sant |
| `break` | Avslutar loopen direkt | `if (i == 3) break;` | Loopen slutar, koden efter loopen körs |
| `continue` | Hoppar till villkoret | `if (i == 3) { i++; continue; }` | Resten av varvet hoppas över |

```csharp
int i = 1;
do
{
    Console.WriteLine($"Varv {i}");         // Skriver ut 1 till 5
    i++;
} while (i <= 5);
```

Blocket körs en gång även när villkoret är falskt från början:

```csharp
int i = 10;
do
{
    Console.WriteLine("Det här skrivs ut en gång.");
} while (i < 5);
```

`break` avslutar loopen när `i` blir 3:

```csharp
int i = 1;
do
{
    if (i == 3)
    {
        break;
    }
    Console.WriteLine($"Varv {i}");         // Skriver ut 1 och 2
    i++;
} while (i <= 5);
```

`continue` går direkt till villkoret. Därför måste `i` ökas före `continue`, annars blir loopen oändlig:

```csharp
int i = 1;
do
{
    if (i == 3)
    {
        i++;
        continue;
    }
    Console.WriteLine($"Varv {i}");         // Skriver ut 1, 2, 4, 5
    i++;
} while (i <= 5);
```

## Jämförelser

| Egenskap | `while` | `do-while` |
|----------|---------|------------|
| Villkoret prövas | Före varje varv | Efter varje varv |
| Minsta antal varv | 0 | 1 |
| Semikolon efter villkoret | Nej | Ja |

## Vanliga misstag

- **Glömt semikolon efter `while (villkor)`.** Det är ett kompileringsfel.
- **Villkorsvariabeln ändras aldrig.** Då blir loopen oändlig.
- **`continue` utan att öka räknaren.** Hoppet går till villkoret, så räknaren måste ändras först.
- **Tro att blocket hoppas över när villkoret är falskt.** Det körs en gång innan villkoret prövas.

## Terminologi

| Term | Betydelse |
|------|-----------|
| Efterkontroll | Villkoret prövas efter att blocket körts |
| Varv | En körning av loopens kodblock. Kallas även iteration |
| `break` | Avslutar loopen |
| `continue` | Hoppar till villkoret för nästa varv |
