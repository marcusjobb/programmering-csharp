---
title: "Rekursion"
description: "En metod som anropar sig själv — ett annat sätt att upprepa något, för problem som naturligt delar upp sig i mindre likadana deluppgifter."
parent: "Loopar"
nav_order: 35
---

# Rekursion

Alla loopar hittills har upprepat kod genom att gå runt i en `for`- eller `while`-sats. Rekursion är ett annat sätt att upprepa något: en metod som anropar **sig själv**, med ett mindre problem varje gång, tills problemet är så litet att svaret är uppenbart.

## Grundmönstret — bascase och rekursivt fall

Varje rekursiv metod behöver två delar:

- **Bascase** — ett tillräckligt litet problem som besvaras direkt, utan fler anrop.
- **Rekursivt fall** — anropar sig själv med ett mindre problem, och bygger svaret utifrån det.

```csharp
int Factorial(int n)
{
    if (n <= 1)
        return 1;              // bascase — stoppar rekursionen

    return n * Factorial(n - 1); // rekursivt fall — mindre problem
}
```

`Factorial(4)` löser sig genom att bygga en kedja: `4 * Factorial(3)`, som blir `4 * (3 * Factorial(2))`, som blir `4 * (3 * (2 * Factorial(1)))`. Först när `Factorial(1)` når bascaset (`return 1`) kan kedjan börja lösas upp, bakvägen, tills du får `4 * 3 * 2 * 1 = 24`.

## Vad som faktiskt händer — anropsstacken

Varje anrop till `Factorial` lägger till en ny "ruta" på **anropsstacken** — den finns kvar tills just det anropet fått sitt svar.

```
Factorial(4)
  Factorial(3)
    Factorial(2)
      Factorial(1) → returnerar 1
    → 2 * 1 = 2
  → 3 * 2 = 6
→ 4 * 6 = 24
```

Utan ett bascase växer stacken för evigt — det ger en `StackOverflowException`, rekursionens motsvarighet till en oändlig loop.

```csharp
// Fel — inget bascase, kraschar med StackOverflowException
int Boom(int n) => n * Boom(n - 1);
```

## Fibonacci — ett klassiskt exempel

```csharp
int Fibonacci(int n)
{
    if (n <= 1)
        return n;

    return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Console.WriteLine(Fibonacci(6));   // 8
```

Fibonacci-talföljden (0, 1, 1, 2, 3, 5, 8, 13...) är rekursiv i sin egen definition — varje tal är summan av de två föregående. Koden ovan är i det närmaste en direkt översättning av den matematiska definitionen till C#.

## Rekursion är inte alltid gratis

Den naiva `Fibonacci`-koden ovan har ett dolt problem: för att räkna ut `Fibonacci(6)` räknar den ut `Fibonacci(4)` **två gånger**, `Fibonacci(3)` tre gånger, och så vidare — samma delproblem löses om och om igen. Komplexiteten växer exponentiellt, `O(2ⁿ)`, vilket redan vid `n = 40` tar flera sekunder.

En loop-baserad lösning löser samma problem i linjär tid:

```csharp
int FibonacciLoop(int n)
{
    if (n <= 1) return n;

    int previous = 0, current = 1;
    for (int i = 2; i <= n; i++)
    {
        int next = previous + current;
        previous = current;
        current = next;
    }
    return current;
}
```

Ingen kod är fel — men de har olika prestandaegenskaper. Rekursion är ofta det tydligaste sättet att *uttrycka* ett problem som naturligt delar upp sig i mindre likadana deluppgifter (träd, sökning, matematiska definitioner). En loop är ofta snabbare när samma delproblem annars skulle räknas ut flera gånger. Vet du att du löser samma delproblem upprepade gånger, är det ett tecken på att antingen loopa istället, eller spara redan uträknade svar (en teknik som kallas memoization).

## När passar rekursion bra?

- Trädstrukturer — mappar i mappar, kommentarer med svar på svar, familjeträd
- Sök- och sorteringsalgoritmer som delar upp problemet (se [Sökalgoritmer](../datastrukturer/sokalgoritmer.md))
- Matematiska definitioner som redan är rekursiva (fakultet, Fibonacci, största gemensamma delare)

## Obligatorisk dad-joke

Varför gick funktionen till terapeuten?

Den hade problem med att sluta anropa sig själv om och om igen.
