---
title: Testa dig själv
parent: If
nav_order: 99
---

# Testa dig själv — if / else

Utan att kolla:

1. Vad händer om inget villkor stämmer i en `if / else if`-kedja utan `else`?

<details markdown="block">
<summary>Visa svar</summary>

Inget av blocken körs. Programmet fortsätter bara på raden efter hela if-kedjan. Om du alltid vill att *något* ska hända, lägg till ett `else`-block sist.

</details>

2. Vad är skillnaden mellan `=` och `==` i C#?

<details markdown="block">
<summary>Visa svar</summary>

`=` är *tilldelning* — du ger en variabel ett värde: `ålder = 25`. `==` är *jämförelse* — du kontrollerar om två värden är lika: `if (ålder == 18)`. Att blanda ihop dem är ett klassiskt nybörjarfel.

</details>

3. Vad gör `&&`, och när är ett uttryck med `&&` sant?

<details markdown="block">
<summary>Visa svar</summary>

`&&` är logiskt *och*. Uttrycket är sant **bara om båda sidorna är sanna**. `if (ålder >= 18 && harBiljett)` kräver att båda villkoren uppfylls.

</details>

4. Vad är skillnaden mellan `||` och `&&`?

<details markdown="block">
<summary>Visa svar</summary>

`||` är logiskt *eller* — sant om **minst ett** av villkoren är sant. `&&` är logiskt *och* — sant bara om **båda** är sanna. Exempel: `if (ärMedlem || harRabattkod)` kräver bara ett av villkoren.

</details>

5. Varför bör du undvika djupt nästlade if-satser?

<details markdown="block">
<summary>Visa svar</summary>

Ju djupare nästling, desto svårare blir koden att läsa och felsöka. Ofta kan du bryta ut villkor till egna metoder, använda `&&`/`||` för att kombinera, eller invertera villkoret och returnera tidigt (early return).

</details>
