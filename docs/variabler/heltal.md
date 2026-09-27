---
title: Heltal
description: "int, long, short, byte — samma idé (ett heltal, inga decimaler) i olika storlekar, med olika gränser för hur stort talet får bli."
parent: Variabler
nav_order: 12
---
# Heltal

C# har inte bara `int` — det finns en hel familj av heltalstyper, och skillnaden mellan dem är hur mycket minne varje värde tar och därmed hur stort eller litet talet får bli.

## De vanliga typerna

| Typ | Storlek | Minsta värde | Största värde |
|---|---|---|---|
| `sbyte` | 1 byte | -128 | 127 |
| `byte` | 1 byte | 0 | 255 |
| `short` | 2 byte | -32 768 | 32 767 |
| `ushort` | 2 byte | 0 | 65 535 |
| `int` | 4 byte | -2 147 483 648 | 2 147 483 647 |
| `uint` | 4 byte | 0 | 4 294 967 295 |
| `long` | 8 byte | -9 223 372 036 854 775 808 | 9 223 372 036 854 775 807 |
| `ulong` | 8 byte | 0 | 18 446 744 073 709 551 615 |

`u`-prefixet betyder **unsigned** (osignerad) — ingen negativ del, hela intervallet går åt det positiva hållet istället. `int` är standardvalet för nästan allt; de andra finns för specifika situationer.

```csharp
int poäng = 1500;          // det vanliga valet för vardagliga heltal
byte ålder = 34;            // känt litet intervall (0–255) — sparar minne i stora datamängder
long folkmängd = 8_200_000_000; // större än int rymmer
```

Understreck i talkonstanter (`8_200_000_000`) är bara läsbarhet — kompilatorn ignorerar dem helt.

## Varför inte alltid `long`, för säkerhets skull?

Det skulle fungera, men `int` räcker för nästan allt du kommer skriva i den här boken (upp till ~2,1 miljarder), och tar hälften så mycket minne som `long`. Använd den mindre typen som täcker ditt behov — det är standardpraxis, inte en optimering du behöver jaga i förväg.

## Overflow — vad händer vid gränsen?

Ett heltal kan inte bli större än sin typs maxvärde. Går du över gränsen "wrappar" värdet runt till motsatt ände av intervallet, tyst, utan varning:

```csharp
int max = int.MaxValue;        // 2147483647
Console.WriteLine(max + 1);    // -2147483648 — hoppade till minsta värdet!
```

Det här kallas **overflow**, och det är en av de mer förrädiska buggkällorna eftersom koden kompilerar och kör helt normalt — den ger bara fel svar. Ett känt exempel är buggen "Nuclear Gandhi" i spelet *Civilization*: en karaktärs aggressivitet lagrades som en `byte` (0–255), och när ett fredsavtal sänkte värdet under 0 wrappade det runt till 255 — den mest fredliga ledaren i spelet blev plötsligt den mest krigslystna.

```csharp
checked
{
    int max = int.MaxValue;
    Console.WriteLine(max + 1);   // kastar OverflowException istället för att wrappa tyst
}
```

`checked`-blocket tvingar C# att kasta ett fel vid overflow istället för att tyst wrappa — bra när du vill upptäcka buggen direkt, inte sex månader senare i produktion.

## Heltalsdivision — en vanlig fälla

```csharp
int a = 7;
int b = 2;
Console.WriteLine(a / b);          // 3 — inte 3.5!

double result = (double)a / b;
Console.WriteLine(result);         // 3.5 — nu räknas det som decimaltal
```

Delar du två heltal med `/` får du ett heltal tillbaka — decimaldelen trunkeras bort, den avrundas inte. Vill du ha ett exakt svar måste minst en av operanderna vara ett decimaltal (`double`/`decimal`), därav castningen ovan.

## Obligatorisk dad-joke

Varför blev `byte` orolig inför sin femtioförsta födelsedag?

Den visste inte om den skulle överleva till 256.
