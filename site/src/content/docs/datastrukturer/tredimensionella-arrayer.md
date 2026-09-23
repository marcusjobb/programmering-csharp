---
title: Tredimensionella arrayer
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-23"
updated: "2026-09-23"
parent: Datastrukturer
nav_order: 22
---
# Tredimensionella arrayer

Samma idé som en [tvådimensionell array](tvadimensionella-arrayer.md), fast med ytterligare ett steg: en tredje dimension utöver rad och kolumn. Tänk en Rubiks kub, ett voxel-baserat 3D-rutnät i ett spel, eller flera "våningar" av samma 2D-rutnät staplade på varandra.

## När du läst detta ska du kunna

- Skapa en tredimensionell array och förstå vad `[,,]` betyder
- Läsa och skriva en cell med tre index
- Loopa igenom alla tre dimensioner med kapslade loopar

## Skapa en tredimensionell array

```csharp
int[,,] rymd = new int[4, 4, 4];

rymd[1, 2, 3] = 7;
```

Ett komma till i hakparenteserna — `[,,]` istället för `[,]` — lägger till ytterligare en dimension. `new int[4, 4, 4]` ger dig 4×4×4 = 64 platser, alla `int`, alla satta till `0` från start. En cell adresseras med tre index i samma ordning du skapade dimensionerna i: `rymd[x, y, z]`. Tänk `x` och `y` som rad och kolumn precis som i den tvådimensionella varianten, och `z` som "vilken våning" eller "vilket lager".

## Loopa igenom alla tre dimensioner

Precis som en tvådimensionell array kräver två kapslade `for`-loopar för full kontroll, kräver en tredimensionell array tre — en för varje dimension:

```csharp
for (int x = 0; x < 4; x++)
{
    for (int y = 0; y < 4; y++)
    {
        for (int z = 0; z < 4; z++)
        {
            Console.Write(rymd[x, y, z] + " ");
        }
        Console.WriteLine();
    }
    Console.WriteLine("--- nästa lager ---");
}
```

Innersta loopen (`z`) går genom ett enda "streck" i djupled, mellersta loopen (`y`) går genom raderna i ett lager, och yttersta loopen (`x`) går genom lagren själva. Samma mönster som den tvådimensionella arrayen — bara en nivå djupare.

## Är det här verkligen vanligt?

Inte i vardagskod — de flesta program klarar sig med en eller två dimensioner. Tredimensionella arrayer dyker upp i mer specialiserade sammanhang: 3D-spel och simuleringar, voxel-grafik (tänk Minecraft), bildbehandling med flera kanaler, eller vetenskapliga beräkningar med tre fysiska axlar. Om du känner att du behöver fler än tre dimensioner är det oftast ett tecken på att en annan datastruktur (till exempel en `Dictionary` med en sammansatt nyckel) skulle vara tydligare.

## TL;DR

| Vad | Syntax |
|-----|--------|
| Skapa | `int[,,] rymd = new int[x, y, z];` |
| Läsa/skriva en cell | `rymd[x, y, z]` |
| Loopa och besöka varje cell | tre kapslade `for`-loopar |
