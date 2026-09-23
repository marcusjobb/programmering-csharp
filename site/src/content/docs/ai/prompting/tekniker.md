---
title: Promptingtekniker
description: "Promptingtekniker i Prompting — C#-boken av Marcus Ackre Medina"
layout: default
parent: Prompting
nav_order: 20
---
# Promptingtekniker

Utöver grundstrukturen finns det beprövade tekniker som förbättrar svar dramatiskt.

## Chain-of-thought — tänk högt

Be AI att visa sitt resonemang. Det ger bättre svar och avslöjar om den resonerar fel.

```
"Lös detta steg för steg. Visa ditt resonemang."
"Tänk högt innan du svarar."
"Förklara varför du väljer den här lösningen."
```

Bra för: debuggning, arkitekturbeslut, komplexa algoritmer.

## Few-shot — ge exempel

Visa vad du vill ha genom att ge 1–3 exempel:

```
Transform these methods till expression-bodied syntax.

Example:
Before: public int Fetch() { return _value; }
After:  public int Fetch() => _value;

Nu transform:
public string Describe() { return $"Namn: {Name}, Ålder: {Age}"; }
```

AI förstår mönstret och upprepar det korrekt.

## Negativa krav — vad du INTE vill ha

```
"Använd INTE LINQ — bara vanliga loopar."
"Inga externa NuGet-paket."
"Inga kommentarer i koden."
"Förklara INTE vad koden gör — bara koden."
```

## Persona för code review

```
Du is en strict code reviewer. Din task is to find ALL problem i code below.
Var direct — none politePhrases. Prioritise:
1. SecurityIssue
2. Bugs
3. PerformanceIssues
4. Clean Code-crime

Code:
[paste in code]
```

## Konversationsminne — utnyttja kontexten

AI:t minns tidigare meddelanden i samma konversation. Bygg vidare:

```
Conversation:
→ "Skriv en Stack-klass i C#"
← [AI ger code]
→ "Lägg till en Peek-metod"
← [AI updates class]
→ "Skriv enhetstester för alla metoder"
← [AI writes tester based on class]
```

Börja om i ny konversation när ämnet byter — gammalt kontext förvirrar.

## Temperatur — kreativitet vs. precision

I API-anrop kan du styra kreativiteten med `temperature`:

```csharp
// temperature: 0.0 = deterministiskt, alltid samma svar (bra för kod)
// temperature: 1.0 = kreativt, mer variation (bra för text)
var request = new { temperature = 0.2, ... };
```

## Strukturerat output

Be om JSON eller specifikt format för att lättare bearbeta svaret i kod:

```
Answer med JSON i this format:
{
  "bedömning": "OK" | "Varning" | "Fel",
  "problem": ["problem 1", "problem 2"],
  "förslag": "kort förslag"
}
```

## TL;DR

| Teknik | När |
|--------|-----|
| Chain-of-thought | Komplexa problem, debuggning |
| Few-shot | Formatering, repetitiva transformationer |
| Negativa krav | Undvika bibliotek, stilpreferenser |
| Code review persona | Hitta problem i befintlig kod |
| Strukturerat output | API-svar du ska bearbeta i kod |
