---
title: Testa dig själv
parent: Loopar
nav_order: 99
---

# Testa dig själv — Loopar

Utan att kolla:

1. Vad är skillnaden mellan `while` och `for`?

<details>
<summary>Visa svar</summary>

`while` kör så länge ett villkor är sant — du vet inte alltid hur många gånger i förväg. `for` används när du vet exakt hur många iterationer som ska ske — räknaren är inbyggd i syntaxen. Välj `for` när du räknar; välj `while` när du väntar på ett tillstånd.

</details>

2. Hur uppstår en infinite loop, och hur märker du att du råkat skapa en?

<details>
<summary>Visa svar</summary>

En infinite loop uppstår när villkoret aldrig blir falskt — t.ex. att räknaren inte ökar inuti `while`. Programmet hänger sig, konsolen svarar inte längre. I Visual Studio kan du stoppa det med Ctrl+C eller Stop-knappen.

</details>

3. När passar `foreach` bättre än `for`?

<details>
<summary>Visa svar</summary>

`foreach` passar när du bara behöver läsa varje element i ordning och inte behöver indexet. Koden blir enklare och du kan inte råka skriva fel index. `for` behövs om du vill ändra elementen, hoppa bakåt, eller behöver indexet.

</details>

4. Vad de tre delarna i en `for`-loop?

<details>
<summary>Visa svar</summary>

```csharp
for (int i = 0; i < 10; i++)
//   [1]       [2]        [3]
```

1. **Initiering** — körs en gång innan loopen startar (`int i = 0`)
2. **Villkor** — kontrolleras innan varje iteration (`i < 10`)
3. **Steg** — körs efter varje iteration (`i++`)

</details>

5. Vad händer om loopens villkor är falskt redan från början?

<details>
<summary>Visa svar</summary>

Loopkroppen körs aldrig — programmet hoppar direkt förbi loopen. För `while` och `for` kontrolleras villkoret *innan* första körningen. (`do-while` är undantaget — den kör minst en gång.)

</details>
