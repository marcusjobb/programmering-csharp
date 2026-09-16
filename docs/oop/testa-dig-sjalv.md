---
title: Testa dig själv
parent: Objektorienterad programmering (OOP)
nav_order: 99
---

# Testa dig själv — OOP

Utan att kolla:

1. Vad är skillnaden mellan en klass och ett objekt?

<details markdown="block">
<summary>Visa svar</summary>

En **klass** är ritningen — den beskriver hur något ska se ut och bete sig. Ett **objekt** är en konkret instans av den ritningen. `class Bil { ... }` är ritningen; `var minBil = new Bil()` skapar ett faktiskt objekt i minnet.

</details>

2. Vad är syftet med `private` på ett fält?

<details markdown="block">
<summary>Visa svar</summary>

`private` hindrar kod *utanför* klassen från att läsa eller ändra fältet direkt. Det är kärnan i inkapsling — klassen kontrollerar hur data ändras, t.ex. via properties med validering.

</details>

3. Varför används en konstruktor?

<details markdown="block">
<summary>Visa svar</summary>

Konstruktorn körs automatiskt när ett objekt skapas med `new`. Den ser till att objektet är i ett giltigt starttillstånd — rätt värden är satta från början, inte råkar vara `null` eller `0` av misstag.

</details>

4. Vad heter nyckelordet som markerar att subklasser *får* skriva sin egen version av en metod?

<details markdown="block">
<summary>Visa svar</summary>

`virtual`. Utan `virtual` på basklassens metod kan en subklass inte `override` den. Det är öppet/stängt-principen i praktiken: basklassen är stängd för ändring men öppen för utökning via `virtual` + `override`.

</details>

5. Vad gör `: base(namn)` i en subklasses konstruktor?

<details markdown="block">
<summary>Visa svar</summary>

Det anropar basklassens konstruktor och skickar vidare argumentet. Utan det vet inte basklassen att den ska initieras — och om basklassen saknar en parameterlös konstruktor kompilerar det inte alls.

</details>

6. Vad händer om du skapar `class Orm : Djur` men inte skriver `override LåtaLjud()`?

<details markdown="block">
<summary>Visa svar</summary>

Ormen ärver basklassens version av `LåtaLjud()` — alltså standardbeteendet från `Djur`. Inget kompileringsfel. Men polymorfism fungerar inte som du kanske vill: `orm.LåtaLjud()` kör `Djur`-versionen, inte en orm-specifik.

</details>

7. Vad är skillnaden mellan `override` och metodöverlagring (overloading)?

<details markdown="block">
<summary>Visa svar</summary>

**Override** — en subklass ersätter/utökar en `virtual`-metod från basklassen. Samma namn, samma parametrar, annan klass.

**Overloading** — samma klass har flera metoder med samma namn men *olika* parametrar. Kompilatorn väljer rätt version baserat på argumenten du skickar.

</details>
