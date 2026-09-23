---
title: StringBuilder
description: "StringBuilder i Variabler — C#-boken av Marcus Ackre Medina"
layout: default
parent: Variabler
nav_order: 42
---
# StringBuilder

Strängar i C# är oföränderliga. Varje gång du lägger ihop strängar med `+` skapas ett nytt strängobjekt i minnet. Gör du det hundra gånger skapas hundra objekt.

```csharp
string result = "";
for (int i = 0; i < 100; i++)
{
    result += "rad " + i + "\n";  // Skapar ett nytt strängobjekt varje varv
}
```

Det fungerar, men är ineffektivt vid många upprepningar. `StringBuilder` löser det genom att bygga strängen i en intern buffert och bara skapa den färdiga strängen när du ber om det.

## När du läst detta ska du kunna

- Förklara varför strängar är oföränderliga och vad det innebär i praktiken
- Använda `StringBuilder` för effektiv strängbyggnad
- Välja rätt verktyg — `+` och interpolation för enkla fall, `StringBuilder` för loopar

## Grundsyntax

```csharp
using System.Text;

var sb = new StringBuilder();

sb.Append("Hej");
sb.Append(", ");
sb.Append("världen");
sb.Append("!");

Console.WriteLine(sb.ToString());  // Hej, världen!
```

Du anropar `.ToString()` när du är klar och vill ha ut strängen.

## Vanliga metoder

```csharp
var sb = new StringBuilder();

sb.Append("rad ett");          // Lägg till text
sb.AppendLine("rad två");      // Lägg till text + radbrytning
sb.AppendLine("rad tre");

sb.Insert(0, "RUBRIK\n");      // Sätt in text på position 0

sb.Replace("ett", "1");        // Ersätt alla förekomster

Console.WriteLine(sb.ToString());
```

### Output

```
HEADING
row 1
row two
row tre
```

## I en loop

Här är `StringBuilder` som tydligast motiverat:

```csharp
var sb = new StringBuilder();

string[] products = { "Kaffe", "Te", "Juice", "Mjölk" };

foreach (var product in products)
{
    sb.AppendLine($"- {product}");
}

Console.Write(sb.ToString());
```

### Output

```
- Coffee
- Te
- Juice
- Milk
```

## När ska du använda det?

| Situation | Använd |
|-----------|--------|
| Enstaka sammanslagning | `$"Hej {name}"` eller `+` |
| Loopa och bygga en sträng | `StringBuilder` |
| Kombinera några fasta delar | `string.Join()` |
| Tusentals sammanslagningar | `StringBuilder` |

**Tumregel:** om du bygger strängar i en loop — använd `StringBuilder`. Annars räcker interpolation eller `+`.

## string.Join() — ett alternativ

För enkla fall räcker ofta `string.Join`:

```csharp
string[] words = { "ett", "två", "tre" };
string joined = string.Join(", ", words);
Console.WriteLine(joined);  // ett, två, tre
```

## TL;DR

Strängar är oföränderliga — sammanslagning med `+` i loopar är ineffektivt. `StringBuilder` bygger strängen i en buffert och skapar ett enda objekt när du anropar `.ToString()`. Använd det i loopar. Använd interpolation för enkla fall.
