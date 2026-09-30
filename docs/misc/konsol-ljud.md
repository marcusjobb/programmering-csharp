---
title: Console.Beep
description: "Console.Beep — ljud och musik från terminalen — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Övrigt
nav_order: 12
---
# Console.Beep

Ja, det finns kvar. C# kan fortfarande producera ljud direkt ur terminalen — precis som BASIC på 80-talet. Du kan spela enskilda toner, och med lite ihärdighet: hela melodier.

Studerandes öron har aldrig ångrat något de inte kan stoppa.

## Grundläggande beep

```csharp
Console.Beep();   // standard-beep, 800 Hz i 200 ms
```

Det är allt. Ett ljud. Existensen bekräftad.

## Anpassad frekvens och längd

```csharp
Console.Beep(int frequency, int duration);
// frequency: 37–32767 Hz
// duration: millisekunder
```

```csharp
Console.Beep(440, 500);    // A4 — standardstämning, 500 ms
Console.Beep(880, 250);    // A5 — en oktav upp, 250 ms
Console.Beep(262, 1000);   // C4 — en hel sekund av lidande
```

## Bell-tecknet — \a

`\a` är Bell-tecknet (ASCII 7). Det producerar ett beep i terminalen utan att använda `Console.Beep()`:

```csharp
Console.Write("\a");       // beep via terminalen
Console.WriteLine("\a");   // beep + radbrytning
```

Fungerar i de flesta terminaler men inte nödvändigtvis med specifik frekvens.

## Notfrekvenser

Varje musikalisk ton har en frekvens. Här är de vanligaste:

| Not | Frekvens (Hz) | Not | Frekvens (Hz) |
|-----|--------------|-----|--------------|
| C4  | 262          | C5  | 523          |
| D4  | 294          | D5  | 587          |
| E4  | 330          | E5  | 659          |
| F4  | 349          | F5  | 698          |
| G4  | 392          | G5  | 784          |
| A4  | 440          | A5  | 880          |
| B4  | 494          | B5  | 988          |

## Spela en C-durskala

```csharp
int[] scale = [262, 294, 330, 349, 392, 440, 494, 523];

foreach (int note in scale)
{
    Console.Beep(note, 300);
    Thread.Sleep(50);  // liten paus mellan noterna
}
```

## Blinka och pipa — fullständig terror

```csharp
// Kombinera \e (ANSI-färger) och \a (beep) för maximal upplevelse
for (int i = 0; i < 5; i++)
{
    Console.Write("\e[31m\a VARNING! \e[0m");
    Thread.Sleep(500);
    Console.Write("\e[0m");
    Thread.Sleep(500);
}
```

## Imperial March — en klassiker

```csharp
// (int frekvens, int längd i ms)
(int, int)[] imperialMarch =
[
    (440, 500), (440, 500), (440, 500), (349, 375), (523, 125),
    (440, 500), (349, 375), (523, 125), (440, 750),
    (659, 500), (659, 500), (659, 500), (698, 375), (523, 125),
    (415, 500), (349, 375), (523, 125), (440, 750),
];

foreach (var (freq, dur) in imperialMarch)
{
    Console.Beep(freq, dur);
    Thread.Sleep(30);
}
```

## Twinkle Twinkle — det mildare alternativet

```csharp
const int C = 262, D = 294, E = 330, F = 349, G = 392, A = 440;
const int Q = 400, H = 800;  // kvarts- och halvnotslängd

(int, int)[] twinkle =
[
    (C,Q),(C,Q),(G,Q),(G,Q),(A,Q),(A,Q),(G,H),
    (F,Q),(F,Q),(E,Q),(E,Q),(D,Q),(D,Q),(C,H),
    (G,Q),(G,Q),(F,Q),(F,Q),(E,Q),(E,Q),(D,H),
    (G,Q),(G,Q),(F,Q),(F,Q),(E,Q),(E,Q),(D,H),
    (C,Q),(C,Q),(G,Q),(G,Q),(A,Q),(A,Q),(G,H),
    (F,Q),(F,Q),(E,Q),(E,Q),(D,Q),(D,Q),(C,H),
];

foreach (var (note, length) in twinkle)
{
    Console.Beep(note, length);
    Thread.Sleep(20);
}
```

## Plattform

`Console.Beep(frequency, duration)` med anpassad frekvens fungerar på **Windows**. På Linux och macOS kan den kasta `PlatformNotSupportedException` — kontrollera plattform om din kod ska köras på flera system:

```csharp
if (OperatingSystem.IsWindows())
    Console.Beep(440, 500);
else
    Console.Write("\a");  // bell-tecknet som fallback
```

`Console.Beep()` utan argument (standard-beep) fungerar på de flesta plattformar.

## TL;DR

```csharp
Console.Beep();                    // standard-beep
Console.Beep(440, 500);            // A4, 500 ms
Console.Write("\a");               // bell-tecken — fungerar i terminalen
```

Veteraner från BASIC-eran kan nu andas ut. Det är kvar.
