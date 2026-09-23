---
title: Testa dig själv
description: "Testa dig själv i Git — C#-boken av Marcus Ackre Medina"
parent: Git
nav_order: 30
---

# Testa dig själv — Git

Utan att kolla:

1. Vad är skillnaden mellan `git add` och `git commit`?

<details markdown="block">
<summary>Visa svar</summary>

`git add` lägger till filer i staging-området — de är "förberedda" för commit men inget är sparat än. `git commit` tar allt i staging och sparar det som en snapshot i historiken med ett meddelande.

</details>

2. Vad händer om du glömmer `git push` efter ett commit?

<details markdown="block">
<summary>Visa svar</summary>

Commiten finns bara lokalt på din dator. Dina lagkamrater ser den inte, och GitHub saknar den. Du måste köra `git push` för att skicka upp ändringarna.

</details>

3. Vad är ett repo, och vad är ett working tree?

<details markdown="block">
<summary>Visa svar</summary>

Ett **repo** (repository) är hela Git-historiken med alla dina commits — en tidsmaskin för koden. **Working tree** är mappen du ser och redigerar på disk just nu.

</details>

4. Varför används `.gitignore`, och vad är ett typiskt exempel på en fil som bör ignoreras?

<details markdown="block">
<summary>Visa svar</summary>

`.gitignore` talar om för Git vilka filer och mappar som aldrig ska committas. Typiska exempel: `bin/`, `obj/`, `.env` (secrets), `node_modules/`. Filerna är antingen genererade automatiskt eller innehåller känslig information.

</details>

5. Vad är skillnaden mellan att klona och att starta ett nytt repo?

<details markdown="block">
<summary>Visa svar</summary>

`git clone <url>` hämtar ett befintligt repo med all historik från GitHub. `git init` skapar ett nytt, tomt lokalt repo utan historik. Du klonar när projektet redan finns; du init:ar när du startar från noll.

</details>
