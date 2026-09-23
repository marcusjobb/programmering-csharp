---
title: Internal
description: "Internal i Åtkomstmoderator — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Åtkomstmoderator
nav_order: 10
---
# Internal

Internal är en åtkomstmoderator som gör att en klass, metod eller egenskap är tillgänglig för alla klasser i samma projekt.
<details open markdown="block">
  <summary>
    Innehållsförteckning
  </summary>
  {: .text-delta }

1. TOC
{:toc}

</details>

## Beskrivning

Vi kan använda internal för att göra en klass, metod eller egenskap tillgänglig för alla klasser i samma projekt. Detta är bra om vi vill dela kod mellan flera klasser i samma projekt men inte med klasser i andra projekt.

## Exempel

Låt oss titta på ett exempel där vi använder internal för att göra en klass tillgänglig för alla klasser i samma projekt:

```csharp
internal class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}
```

I detta exempel har vi en klass som heter Person. Vi har också två egenskaper, Name och Age. Båda är offentliga, vilket innebär att de är tillgängliga för alla klasser i samma projekt. Även om Name och Age borde vara tillgängliga för alla projekt som länkar sig till denna, kommer de inte att vara tillgängliga för klasser i andra projekt på grund av att Person-klassen är internal.

Internal är "publik" enbart för klasser i samma projekt. Detta innebär att om vi har en annan klass i ett annat projekt som länkar till detta projekt, kommer den inte att kunna använda Person-klassen.
