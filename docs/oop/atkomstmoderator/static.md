---
title: Static
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Åtkomstmoderator
nav_order: 60
---
# Static

Static är inte en åtkomstmoderator utan en modifierare. Det gör att en klass, metod eller egenskap är tillgänglig för alla klasser i samma projekt.
<details open markdown="block">
  <summary>
    Innehållsförteckning
  </summary>
  {: .text-delta }

1. TOC
{:toc}

</details>

## Beskrivning

Static klasser instansieras vid programstart och det finns bara en instans tillgänglig under körningen. Detta är bra om vi vill dela data mellan flera klasser i samma projekt. Detta är också bra om vi vill ha en klass som bara innehåller statiska metoder och egenskaper.

## Exempel

```csharp
public static class UserSettings
{
    public static string UserName { get; set; }
    public static int Password { get; set; }
    public static bool DarkMode { get; set; }=true;
}
```

I detta exempel har vi en klass som heter UserSettings. Vi har också tre egenskaper, UserName, Password och DarkMode. Alla är statiska, vilket innebär att de är tillgängliga för alla klasser i samma projekt. Även om UserName, Password och DarkMode borde vara tillgängliga för alla projekt som länkar sig till detta projekt, kommer de inte att vara tillgängliga för klasser i andra projekt på grund av att UserSettings-klassen är statisk.

Static är "publik" enbart för klasser i samma projekt. Detta innebär att om vi har en annan klass i ett annat projekt som länkar till detta projekt, kommer den inte att kunna använda UserSettings-klassen.
