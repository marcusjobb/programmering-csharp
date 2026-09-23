---
title: Testa dig själv
description: "Testa dig själv i Metoder — C#-boken av Marcus Ackre Medina"
parent: Metoder
nav_order: 99
---

# Testa dig själv — Metoder

Utan att kolla:

1. Vad är skillnaden mellan `void` och en metod med returvärde?

<details markdown="block">
<summary>Visa svar</summary>

`void` betyder att metoden *gör* något men inte skickar tillbaka något värde. En metod med returvärde (t.ex. `int`, `string`, `bool`) beräknar något och skickar resultatet tillbaka med `return`. Anroparen kan sedan använda det värdet.

</details>

2. Vad är skillnaden mellan en *parameter* och ett *argument*?

<details markdown="block">
<summary>Visa svar</summary>

**Parameter** är platshållarvariabeln i metoddefinitionen: `void GreetOn(string name)` — `name` är parametern. **Argument** är det faktiska värdet du skickar in när du anropar metoden: `GreetOn("Anna")` — `"Anna"` är argumentet.

</details>

3. Vad gör `return` inuti en metod?

<details markdown="block">
<summary>Visa svar</summary>

`return` avslutar metoden direkt och skickar tillbaka ett värde till anroparen. I en `void`-metod kan `return;` (utan värde) användas för att avsluta tidigt.

</details>

4. Varför är det bra att dela upp kod i metoder?

<details markdown="block">
<summary>Visa svar</summary>

- **Återanvändning** — skriv en gång, anropa flera gånger
- **Läsbarhet** — `Main` berättar *vad* som händer, metoderna *hur*
- **Testbarhet** — lättare att testa en sak åt gången
- **Underhållbarhet** — en bugg fixas på ett ställe, inte femton

</details>

5. Vad händer om du anropar en metod som tar `int` men skickar in en `string`?

<details markdown="block">
<summary>Visa svar</summary>

Kompilatorn kastar ett fel direkt — koden kompilerar inte ens. C# är ett statiskt typat språk: typen på argumentet måste matcha parametern vid kompileringstillfället, inte bara i körtid.

</details>
