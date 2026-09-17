---
title: Kontrollstruktur
layout: default
parent: Ordlista
nav_order: 22
---
## Kontrollstruktur

| Ord | Förklaring |
| --- | --- |
| if | Startar en villkorssats — koden innanför `{}` körs bara om villkoret är `true`. |
| else if | Testar ett nytt villkor om det föregående var falskt. |
| else | Körs om inget av de föregående villkoren var sant. Har inget eget villkor. |
| Villkor (condition) | Uttrycket innanför parenteserna efter `if` — måste alltid resultera i `true` eller `false`. |
| Nästlade if-satser | En if-sats innanför en annan if-sats, för att kombinera flera villkor. |
| Iteration | Ett varv i en loop. |
| while | Kontrollerar villkoret innan varje varv. Kan köras noll gånger. |
| do-while | Kör kodblocket en gång innan villkoret kontrolleras första gången. |
| for | Kompakt loop när du vet exakt hur många varv som ska köras — startvärde, villkor och steg på en rad. |
| Loopvariabel | Variabeln som håller reda på vilket varv en loop är på. |
| foreach | Går igenom varje element i en samling (array, lista) ett i taget, utan att hålla reda på index. |
| break | Avslutar en loop eller switch-sats omedelbart. |
| continue | Hoppar över resten av det aktuella varvet i en loop och går till nästa. |
| Oändlig loop | En loop vars villkor aldrig blir falskt — kör för evigt om inget bryter den. |
| switch | Jämför ett värde mot en lista av `case`-etiketter och kör koden för den första som matchar. |
| case | En etikett i en switch-sats som anger ett möjligt värde att matcha mot. |
| default | Switch-satsens motsvarighet till `else` — körs om inget `case` matchade. |
| Fall-through | När körningen faller igenom från en tom `case` till nästa utan att stanna. |
| Pattern matching (switch expression) | Kompakt switch-syntax (C# 9+) som kan matcha intervall och returnera ett värde direkt, t.ex. `< 10 => "Kallt"`. |
