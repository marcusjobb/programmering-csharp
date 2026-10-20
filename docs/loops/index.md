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

- [Grunderna — for, while, do-while](basics.md) — de tre grundläggande looptyperna, med jämförelsetabell och en verklig historia om en oändlig loop som skalade potatis i en timme
- [Foreach](foreach.md) — den vanligaste loopen för listor, arrayer och dictionaries
- [Break och Continue](break-continue.md) — hoppa ut ur en loop tidigt, eller hoppa över ett varv
- [Nästlade loopar](nested-loops.md) — en loop inuti en annan, och varför antalet varv växer snabbt
- [Rekursion](recursion.md) — en metod som anropar sig själv, och när det är ett bättre val än en loop
- [Testa dig själv](test-yourself.md) — kontrollera att det satt sig
