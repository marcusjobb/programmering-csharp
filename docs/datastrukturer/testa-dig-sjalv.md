---
title: Testa dig själv
parent: Datastrukturer
nav_order: 99
---

# Testa dig själv — Datastrukturer

Utan att kolla:

1. Vad är skillnaden mellan en array och en `List<T>`?

<details>
<summary>Visa svar</summary>

En **array** har fast storlek — du bestämmer hur många element den rymmer när du skapar den, och det går inte att lägga till fler. En **`List<T>`** är dynamisk — den växer automatiskt när du lägger till element med `.Add()`.

</details>

2. Vad är ett index, och varför börjar det på 0?

<details>
<summary>Visa svar</summary>

Ett index är positionen för ett element i arrayen/listan. Det börjar på 0 eftersom det representerar *offset från start* — element 0 är precis i början, element 1 är ett steg bort, osv. Det är hur minnet adresseras internt.

</details>

3. Vad händer om du försöker komma åt index 10 i en array med 5 element?

<details>
<summary>Visa svar</summary>

Programmet kastar ett `IndexOutOfRangeException` vid körning och kraschar om du inte fångar felet. Kompilatorn ser inte felet i förväg — det syns bara när koden faktiskt körs.

</details>

4. Vad är skillnaden mellan `List<string>` och `Dictionary<string, int>`?

<details>
<summary>Visa svar</summary>

En `List<string>` är en ordnad samling av strängar som du kommer åt med ett numeriskt index (0, 1, 2...). Ett `Dictionary<string, int>` är en nyckel-värde-karta — du slår upp värdet med en nyckel (t.ex. `"poäng"`). Välj lista när ordning spelar roll; välj dictionary när du vill slå upp snabbt på ett namn.

</details>

5. Varför är `enum` bättre än att använda strängar som konstanter?

<details>
<summary>Visa svar</summary>

- **Typsäkerhet** — kompilatorn ser om du skriver ett ogiltigt värde. Med strängar syns stavfelet bara i körtid.
- **Läsbarhet** — `Riktning.Norr` är tydligare än `"norr"` eller `1`.
- **Autocompletion** — IDE:n listar alla giltiga värden automatiskt.
- **Switch-stöd** — `switch` på enum ger kompilatorvarning om du missar ett fall.

</details>
