---
title: "Lathund: datatyper"
description: "Vanliga datatyper i C#: tal, text, bool, nullbara typer och samlingar, med omfång och exempel."
parent: Lathund
nav_order: 26
---
# Lathund: datatyper

En datatyp säger vilken sorts värde en variabel får innehålla och hur mycket minne den tar. Här är de vanligaste typerna i C#.

Läs mer: [Variabler](../variables/index.md).

## Snabbfakta

| Typ | Beskrivning | Omfång | Exempel |
|-----|-------------|--------|---------|
| `int` | Heltal | -2 147 483 648 till 2 147 483 647 | `int ålder = 30;` |
| `long` | Stort heltal | -9 223 372 036 854 775 808 till 9 223 372 036 854 775 807 | `long stort = 1234567890123L;` |
| `float` | Flyttal, 32 bitar | ±1,5 x 10^-45 till ±3,4 x 10^38 | `float pris = 19.99F;` |
| `double` | Flyttal, 64 bitar | ±5,0 x 10^-324 till ±1,7 x 10^308 | `double pi = 3.14159;` |
| `decimal` | Decimaltal, för pengar | ±1,0 x 10^-28 till ±7,9 x 10^28 | `decimal saldo = 1000.50m;` |
| `int?` | Som `int`, men kan vara `null` | Som `int` | `int? valfrittTal = null;` |

Mer om decimaltalen finns i [decimals](decimals.md).

## Text, tecken och bool

| Typ | Beskrivning | Omfång | Exempel |
|-----|-------------|--------|---------|
| `char` | Ett tecken (UTF-16) | `'\u0000'` till `'￿'` | `char bokstav = 'A';` |
| `string` | Text | Begränsad av minnet | `string namn = "Emma";` |
| `bool` | Sant eller falskt | `true` eller `false` | `bool ärSant = true;` |

## Samlingar

| Typ | Beskrivning | Exempel |
|-----|-------------|---------|
| `int[]` | Array med fast längd | `int[] nummer = [1, 2, 3];` |
| `List<int>` | Lista som kan växa och krympa | `List<int> talLista = [1, 2, 3];` |
| `Dictionary<string, int>` | Nyckel-värde-par | `Dictionary<string, int> poäng = new() { ["Bella"] = 87, ["Carlos"] = 65 };` |

## Vanliga misstag

- **För stort tal för `int`.** `int stor = 3_000_000_000;` ger kompileringsfel. Använd `long` och suffixet `L`.
- **Fel citattecken.** `char c = "A";` ger fel, eftersom `char` använder enkla citattecken. `string s = 'Emma';` ger fel av samma skäl.
- **Flyttal för pengar.** `double` och `float` är approximationer. Använd `decimal` för belopp.
- **`null` i en vanlig `int`.** `int? x = null; int y = x;` ger kompileringsfel. Hantera värdet först, med `x ?? 0` eller `x.HasValue`.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Datatyp** | Vilken sorts värde en variabel får innehålla |
| **Omfång** | Intervallet mellan lägsta och högsta värde för typen |
| **Värdetyp** | Typ som kopieras vid tilldelning, som `int`, `double`, `bool` och `char` |
| **Referenstyp** | Typ som pekar på ett objekt, som arrayer, `List<T>` och `Dictionary<TKey, TValue>` |
| **Nullbar** | En typ som också kan vara `null`, skrivs med `?` (`int?`) |
| **Härledd typ** | Att kompilatorn räknar ut typen från värdet, med `var` |
