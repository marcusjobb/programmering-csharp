---
title: Break och Continue
description: "break och continue är satser som styr vad som händer inuti en loop. De används för att hoppa ut ur loopen eller hoppa vidare till nästa varv."
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Loopar
nav_order: 45
---
# Break och Continue

`break` och `continue` är satser som styr vad som händer inuti en loop. De används för att hoppa ut ur loopen eller hoppa vidare till nästa varv.

## När du läst detta ska du kunna

- Förklara skillnaden mellan `break` och `continue`
- Använda `break` för att avsluta en loop tidigt
- Använda `continue` för att hoppa över ett varv

## break — avsluta loopen direkt

`break` avslutar loopen omedelbart. Koden efter loopen fortsätter.

```csharp
for (int i = 1; i <= 10; i++)
{
    if (i == 5)
        break;

    Console.WriteLine(i);
}

Console.WriteLine("Klart");
```

### Output

```
1
2
3
4
Clear
```

Loopen slutade vid 5 — 5 skrevs aldrig ut.

## continue — hoppa över detta varv

`continue` hoppar direkt till nästa iteration. Resten av koden i det varvet körs inte.

```csharp
for (int i = 1; i <= 10; i++)
{
    if (i % 2 == 0)
        continue;

    Console.WriteLine(i);
}
```

### Output

```
1
3
5
7
9
```

Alla jämna tal hoppades över — `continue` skickade loopen vidare innan `WriteLine` hann köras.

## break i while

`break` fungerar likadant i `while` och `foreach`.

```csharp
var searchWord = "Björn";
var list  = new List<string> { "Anna", "Björn", "Clara", "David" };

foreach (var name in list)
{
    if (name == searchWord)
    {
        Console.WriteLine($"Hittade {name}!");
        break;
    }
}
```

### Output

```
Found Björn!
```

## break i switch

`break` används också obligatoriskt i `switch`-satser för att avsluta varje `case`. Det är en annan kontext — se `switch`-artikeln.

## TL;DR

| Sats | Vad den gör |
|------|-------------|
| `break` | Avslutar loopen direkt och fortsätter med koden efter |
| `continue` | Hoppar över resten av detta varv och går till nästa iteration |
