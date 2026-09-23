---
title: Nullable typer
description: "Nullable typer i Variabler — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Variabler
nav_order: 50
---
# Nullable typer

I C# skiljer man på typer som **kan** vara `null` och typer som **aldrig** ska vara det. Sedan C# 8 kan du aktivera nullable reference types — kompilatorn hjälper dig fånga null-fel innan de kraschar programmet.

## När du läst detta ska du kunna

- Använda `int?` och andra nullable value types
- Förstå vad nullable reference types (C# 8) innebär
- Använda null-operatorerna `?.`, `??`, `??=`, `!`
- Läsa och skriva kod som hanterar null säkert

## Nullable value types — `int?`

Vanliga värdetyper (`int`, `bool`, `DateTime`) kan aldrig vara `null`. Lägger du till `?` blir de nullable:

```csharp
int  a = null;   // Kompileringsfel!
int? b = null;   // OK

int? age = null;

if (age.HasValue)
    Console.WriteLine($"Ålder: {age.Value}");
else
    Console.WriteLine("Ålder okänd");
```

### Output

```
Ålder okänd
```

## Nullable reference types — C# 8 ✨

Sedan C# 8 kan du säga att en referenstyp (t.ex. `string`) **inte** får vara null — kompilatorn varnar om du riskerar en `NullReferenceException`.

Aktiveras med `<Nullable>enable</Nullable>` i `.csproj` (standardvärde i nya .NET 6+-projekt).

```csharp
string  a = null;   // ⚠️ Varning — string ska inte vara null
string? b = null;   // OK — explicit nullable

void Greet(string name)        // name får inte vara null
{
    Console.WriteLine($"Hej {name}!");
}

void GreetMaybe(string? name) // name kan vara null
{
    Console.WriteLine($"Hej {name ?? "okänd"}!");
}
```

## Null-operatorer

### `?.` — null-conditional

Anropar bara om objektet inte är null. Returnerar `null` annars.

```csharp
string? text = null;

int? length = text?.Length;    // null — inget NullReferenceException
Console.WriteLine(length);     // (tomt)

text = "Hej";
Console.WriteLine(text?.Length);  // 3
```

### `??` — null-coalescing

Returnerar höger sida om vänster är `null`.

```csharp
string? name = null;
string displayName = name ?? "Gäst";

Console.WriteLine(displayName);  // Gäst
```

### `??=` — null-coalescing assignment (C# 8)

Tilldelar bara om variabeln är `null`.

```csharp
string? cache = null;
cache ??= "standardvärde";

Console.WriteLine(cache);  // standardvärde
```

### `!` — null-forgiving operator

Säger till kompilatorn "jag vet att detta inte är null". Använd sparsamt.

```csharp
string? text = GetText();
int length = text!.Length;  // Du garanterar att text inte är null
```

## Kedja null-operatorer

```csharp
var city = person?.Address?.City ?? "Okänd stad";
```

Läser: hämta `person.Adress.Stad` — om något längs vägen är null, använd `"Okänd stad"`.

## TL;DR

| Syntax | Vad det gör |
|--------|-------------|
| `int?` | Värdetyp som kan vara null |
| `string?` | Referenstyp som explicit tillåts vara null (C# 8) |
| `?.` | Anropa bara om inte null |
| `??` | Defaultvärde om null |
| `??=` | Tilldela bara om null (C# 8) |
| `!` | "Jag lovar att det inte är null" |
