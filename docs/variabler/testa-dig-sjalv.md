---
title: Testa dig själv
parent: Variabler
nav_order: 99
---

# Testa dig själv — Variabler och datatyper

Utan att kolla:

1. Vad är skillnaden mellan att *deklarera* och att *tilldela* en variabel?

<details markdown="block">
<summary>Visa svar</summary>

**Deklarera** betyder att du skapar variabeln och berättar vilken typ den ska ha: `int ålder;`. **Tilldela** betyder att du ger den ett värde: `ålder = 25;`. Du kan göra båda på en gång: `int ålder = 25;`

</details>

2. Varför kan du inte lagra ett decimaltal i en `int`?

<details markdown="block">
<summary>Visa svar</summary>

`int` reserverar exakt den minnesmängd som behövs för ett heltal. Decimaldelen ryms inte — kompilatorn tillåter det inte och kastar ett fel. Vill du ha decimaler behöver du `double` eller `decimal`.

</details>

3. Vad händer om du skriver `Console.WriteLine("Ålder: " + 25)`?

<details markdown="block">
<summary>Visa svar</summary>

`+` med en sträng på ena sidan konverterar automatiskt det andra värdet till text och limmar ihop dem. Utskriften blir: `Ålder: 25`.

</details>

4. Vad är syftet med en datatyp?

<details markdown="block">
<summary>Visa svar</summary>

Datatypen talar om för kompilatorn hur mycket minne som behövs, vilka värden som är tillåtna och vilka operationer som är giltiga. En `bool` tar bara 1 bit; en `string` kan ta hur mycket som helst. Utan typer vet kompilatorn inte hur den ska hantera värdet.

</details>

5. Vad är skillnaden mellan `double` och `int`?

<details markdown="block">
<summary>Visa svar</summary>

`int` lagrar heltal (inga decimaler), t.ex. `42`. `double` lagrar decimaltal med flytande punkt, t.ex. `3.14`. Division med `int` trunkerar: `7 / 2 == 3`. Division med `double` ger decimaler: `7.0 / 2.0 == 3.5`.

</details>
