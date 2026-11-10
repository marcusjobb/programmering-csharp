---
title: "Lathund: while"
description: "while-loopen i C#: villkor, break, continue, nästlade loopar och vanliga misstag."
parent: Lathund
nav_order: 51
---
# Lathund: while

`while` upprepar ett kodblock så länge ett villkor är sant. Används när antalet varv beror på något som händer under körningen.

Läs mer: [Loopar](../loops/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Typ | Förvillkorsloop: villkoret prövas före varje varv |
| Antal varv | 0 eller fler. Körs aldrig om villkoret är falskt från början |
| Villkor | Ett `bool`-uttryck |
| Avslut | När villkoret blir falskt, eller med `break` |

## Operationer

| Nyckelord | Betydelse | Exempel | Resultat |
|-----------|-----------|---------|----------|
| `while (villkor)` | Upprepar blocket så länge villkoret är sant | `while (i < 5) { ... }` | Blocket körs 5 gånger om `i` börjar på 0 |
| `break` | Avslutar loopen direkt | `if (i == 5) break;` | Loopen slutar, koden efter loopen körs |
| `continue` | Hoppar till nästa varv | `if (i == 3) continue;` | Resten av varvet hoppas över |
| `while (true)` | Villkoret är alltid sant | `while (true) { ... }` | Loopen slutar bara med `break` eller `return` |

```csharp
int i = 0;
while (i < 5)
{
    Console.WriteLine($"Varv {i}");         // Skriver ut 0 till 4
    i++;
}
```

Nästlad loop, en multiplikationstabell:

```csharp
int i = 1;
while (i <= 3)
{
    int j = 1;
    while (j <= 3)
    {
        Console.Write($"{i * j} ");
        j++;
    }
    Console.WriteLine();
    i++;
}
```

`break` avslutar loopen när `i` blir 5. Utskriften sker innan `break`, så 5 skrivs ut:

```csharp
int i = 0;
while (i < 10)
{
    Console.WriteLine(i);                   // Skriver ut 0 till 5
    if (i == 5)
    {
        break;
    }
    i++;
}
```

`continue` hoppar över utskriften när `i` är 3:

```csharp
int i = 0;
while (i < 5)
{
    i++;
    if (i == 3)
    {
        continue;
    }
    Console.WriteLine(i);                   // Skriver ut 1, 2, 4, 5
}
```

## Vanliga misstag

- **Villkorsvariabeln ändras aldrig.** `while (i < 5) { Console.WriteLine(i); }` ger en oändlig loop. Glöm inte `i++`.
- **Semikolon efter villkoret.** `while (i < 5);` gör att blocket är en tom sats. Villkoret ändras aldrig och loopen blir oändlig.
- **Fel gräns.** `i < 5` ger 0 till 4. `i <= 5` ger 0 till 5.
- **Oavsiktlig `while (true)`.** Kontrollera att det finns ett `break` eller `return`, annars slutar programmet aldrig.

## Terminologi

| Term | Betydelse |
|------|-----------|
| Varv | En körning av loopens kodblock. Kallas även iteration |
| Villkor | Uttrycket som prövas före varje varv |
| Oändlig loop | En loop som aldrig slutar, eftersom villkoret alltid är sant |
| `break` | Avslutar loopen |
| `continue` | Hoppar till nästa varv |
