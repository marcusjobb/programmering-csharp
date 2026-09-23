---
title: Samlingar
description: "Samlingar i Ordlista — C#-boken av Marcus Ackre Medina"
layout: default
parent: Ordlista
nav_order: 23
---
## Samlingar

| Ord | Förklaring |
| --- | --- |
| Array | En samling värden av samma typ med fast storlek — antalet element bestäms när den skapas och kan inte ändras. |
| array.Length | Talar om hur många element en array innehåller. Sista giltiga indexet är `Length - 1`. |
| Dictionary\<TKey, TValue\> | Lagrar värden i nyckel-värde-par — du hämtar via en nyckel istället för ett numeriskt index. |
| dict.ContainsKey() | Kollar om en nyckel finns i dictionaryt. |
| dict.TryGetValue() | Hämtar ett värde säkert — returnerar `false` istället för att krascha om nyckeln saknas. |
| Flerdimensionell array | En array med mer än en dimension, t.ex. rader och kolumner: `int[,] grid`. |
| Index | Positionen för ett element i en array eller lista. Börjar på 0, inte 1. |
| List\<T\> | En dynamisk samling som kan växa och krympa under körning — till skillnad från en array. |
| list.Add() | Lägger till ett element sist i listan. |
| list.Clear() | Tömmer hela listan. |
| list.Contains() | Kollar om ett värde finns i listan. Returnerar `true`/`false`. |
| list.Count | Antal element i en lista (motsvarande `array.Length` för listor). |
| list.Remove() | Tar bort den första förekomsten av ett angivet värde. |
| List vs Array | Array har fast storlek; `List<T>` kan växa och krympa. Välj List när antalet element varierar. |
| List vs Dictionary | Lista när ordningen spelar roll och du läser i sekvens; Dictionary när du slår upp värden via en meningsfull nyckel. |
| Nyckel och värde | Varje post i ett dictionary: nyckeln (unikt sökbegrepp) och värdet (det du hämtar). |
