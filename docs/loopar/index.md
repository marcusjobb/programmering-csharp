---
title: Loopar
description: "Att köra samma kod flera gånger utan att skriva den flera gånger — for, while, do-while, foreach, och vad som händer när en loop inte har något slut."
parent: C# bok
nav_order: 50
has_children: True
---
# Loopar

En loop låter dig köra samma kodblock upprepade gånger, med ett värde som ändras för varje varv. Det är ett av de mest grundläggande verktygen i programmering — nästan varje program du skriver kommer använda minst en.

## Vilken loop ska jag välja?

| Situation | Loop |
|-----------|------|
| Du vet hur många varv i förväg | `for` |
| Du loopar genom en samling (lista, array, dictionary) | `foreach` |
| Du loopar tills ett villkor uppfylls, antalet varv okänt i förväg | `while` |
| Du vill köra blocket minst en gång, oavsett villkor | `do-while` |
| Problemet delar upp sig naturligt i mindre likadana deluppgifter | rekursion |

## Sidor i detta avsnitt

- [Grunderna — for, while, do-while](grunder/) — de tre grundläggande looptyperna, med jämförelsetabell och en verklig historia om en oändlig loop som skalade potatis i en timme
- [Foreach](Foreach/) — den vanligaste loopen för listor, arrayer och dictionaries
- [Break och Continue](break-continue/) — hoppa ut ur en loop tidigt, eller hoppa över ett varv
- [Nästlade loopar](nastlade-loopar/) — en loop inuti en annan, och varför antalet varv växer snabbt
- [Rekursion](rekursion/) — en metod som anropar sig själv, och när det är ett bättre val än en loop
- [Testa dig själv](testa-dig-sjalv/) — kontrollera att det satt sig
