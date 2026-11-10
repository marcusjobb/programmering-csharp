---
title: "Lathund: for"
description: "for-loopen i C# i lathundsform: initiering, villkor, steg, nästlade loopar, break, continue och vanliga misstag."
parent: Lathund
nav_order: 53
---
# Lathund: for

`for` upprepar ett kodblock ett känt antal gånger. Räknaren, villkoret och steget står på samma rad, vilket gör den lämplig när du vet hur många varv du behöver.

Läs mer: [Loopar](../loops/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Typ | Räknarloop: villkoret prövas före varje varv |
| Delar | Initiering, villkor och steg, separerade med `;` i parenteserna |
| Antal varv | 0 eller fler. Körs aldrig om villkoret är falskt från början |
| Räknarens livslängd | En variabel deklarerad i initieringen finns bara inne i loopen |

## Operationer

| Del | Betydelse | Exempel |
|-----|-----------|---------|
| `int i = 1` | Initiering: startvärdet för räknaren, körs en gång | `int i = 1;` |
| `i <= 5` | Villkor: loopen fortsätter så länge det är sant | `i <= 5;` |
| `i++` | Steg: ökar räknaren efter varje varv | `i++` |
| `break` | Avslutar loopen direkt | `if (i == 3) break;` |
| `continue` | Hoppar till nästa varv, steget körs fortfarande | `if (i == 3) continue;` |
| `for (;;)` | Inget villkor, körs tills `break` eller `return` | `for (;;) { ... }` |

```csharp
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine($"Varv {i}");         // Skriver ut 1 till 5
}
```

Nästlad loop, ett rutnät av utskrifter:

```csharp
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 3; j++)
    {
        Console.WriteLine($"i: {i}, j: {j}");
    }
}
```

`break` avslutar loopen när `i` blir 3. Varv 3 och uppåt skrivs inte ut:

```csharp
for (int i = 1; i <= 5; i++)
{
    if (i == 3)
    {
        break;
    }
    Console.WriteLine($"Varv {i}");         // Skriver ut 1 och 2
}
```

`continue` hoppar över utskriften när `i` är 3. Steget `i++` körs ändå:

```csharp
for (int i = 1; i <= 5; i++)
{
    if (i == 3)
    {
        continue;
    }
    Console.WriteLine($"Varv {i}");         // Skriver ut 1, 2, 4, 5
}
```

## Jämförelser

| Loop | Använd när | Exempel |
|------|------------|---------|
| `for` | Antalet varv är känt i förväg | Skriva ut 10 rader |
| `while` | Antalet varv beror på ett villkor | Läsa in tal tills användaren skriver `sluta` |
| `do-while` | Antalet varv beror på ett villkor och blocket ska köras minst en gång | Visa en meny minst en gång |

## Vanliga misstag

- **Semikolon efter parenteserna.** `for (int i = 1; i <= 5; i++);` gör att blocket under är en separat sats. Det tomma blocket körs fem gånger, sedan körs `Console.WriteLine` en gång.
- **Fel slutvillkor.** Med `i < 5` blir sista varvet 4. Med `i <= 5` blir det 5.
- **Använda räknaren efter loopen.** En variabel deklarerad i initieringen finns inte utanför loopen. Det ger kompileringsfelet CS0103.
- **Räknaren ändras fel.** Om `i` ändras både i steget och i kroppen blir antalet varv svårt att följa.

## Terminologi

| Term | Betydelse |
|------|-----------|
| Initiering | Startvärdet för räknaren, körs bara en gång före första varvet |
| Villkor | Uttrycket som avgör om loopen fortsätter |
| Steg | Uttrycket som ändrar räknaren efter varje varv. Kallas även inkrement |
| Räknare | Variabeln, oftast `i`, som håller reda på var i loopen du är |
| Varv | En körning av loopens kodblock. Kallas även iteration |
| Nästlad loop | En loop inuti en annan loop |
