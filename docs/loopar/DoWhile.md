---
title: Do While
description: "Do While i Loopar — C#-boken av Marcus Ackre Medina"
layout: default
author: Campus Mölndal
author_github: CampusMolndalEducation
author_url: "https://github.com/CampusMolndalEducation"
school: Campus Mölndal
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Loopar
nav_order: 10
---
# Do While

Do While är en loop som körs minst en gång. Den körs sedan så länge som villkoret är sant.

## Beskrivning

Do While är en loopstruktur i C# som liknar While-loopen. Skillnaden är att i en Do While-loop kontrolleras villkoret efter varje iteration, vilket innebär att loopen alltid körs minst en gång. Detta är användbart när du vill att en viss kod ska utföras minst en gång innan villkoret kontrolleras.

## Exempel

För att förstå hur en Do While-loop fungerar, låt oss titta på följande kodexempel:

```csharp
int i = 0;
do
{
    Console.WriteLine(i);
    i++;
} while (i < 10);
```

I detta exempel deklarerar vi en variabel `i` och tilldelar den värdet 0. Sedan har vi en Do While-loop som kontrollerar om `i` är mindre än 10. Inuti loopen skriver den ut värdet av `i` och ökar sedan värdet med 1. Loopen fortsätter att köras så länge som `i` är mindre än 10.

Medan villkoret i Do While-loopen är sant, körs koden inuti loopen. När villkoret blir falskt, avslutas loopen och programmet fortsätter med resten av koden efter loopen.

I detta specifika exempel kommer loopen att köra 10 gånger och skriva ut värdena från 0 till 9.

## Sammanfattning

Do While är en loopstruktur i C# som körs minst en gång och sedan fortsätter att köra så länge som villkoret är sant. Det är användbart när du behöver utföra en viss kod minst en gång innan villkoret kontrolleras.

## Termer

| Term         | Förklaring                                                                                                      |
|--------------|----------------------------------------------------------------------------------------------------------------|
| Do While-loop | En loopstruktur i C# som körs minst en gång och sedan fortsätter att köra så länge som villkoret är sant.       |
| Loop         | En struktur i programmering som gör att en viss kod kan köras upprepade gånger tills ett visst villkor är uppfyllt. |
| Iteration    | En enskild körning av kod inuti en loop.                                                                         |
| Villkor      | Ett uttryck som avgör om en loop ska fortsätta köras eller inte.                                                 |
