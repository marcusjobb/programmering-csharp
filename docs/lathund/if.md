---
title: "Lathund: if-satsen"
description: "if, else och else if i C# i lathundsform: syntax, jämförelser, exempel och de vanligaste misstagen."
parent: Lathund
nav_order: 31
---
# Lathund: if-satsen

`if` kör ett kodblock bara när ett villkor är sant. `else` och `else if` används när du vill välja mellan flera alternativ.

Läs mer: [Villkorssatser](../conditionals/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Villkor | Ett `bool`-uttryck, alltså `true` eller `false` |
| Antal grenar | Valfritt antal `else if`, högst en `else` |
| Ordning | Villkoren prövas uppifrån och ned. Första sanna grenen körs, resten hoppas över |
| Klammerparenteser | Krävs om blocket har fler än en sats. Använd dem alltid |

## Operationer

| Nyckelord | Betydelse | Exempel | Resultat |
|-----------|-----------|---------|----------|
| `if` | Kör blocket om villkoret är sant | `if (poäng >= 90) { ... }` | Blocket körs bara om `poäng` är 90 eller mer |
| `else` | Kör blocket när alla föregående villkor är falska | `else { ... }` | Körs när inget tidigare villkor var sant |
| `else if` | Prövar ett nytt villkor när föregående var falskt | `else if (poäng >= 80) { ... }` | Körs bara om föregående villkor var falskt och detta är sant |

```csharp
int poäng = 85;

if (poäng >= 90)
{
    Console.WriteLine("Mycket bra!");
}
else if (poäng >= 80)
{
    Console.WriteLine("Bra!");              // Skrivs ut: Bra!
}
else
{
    Console.WriteLine("Övning krävs.");
}
```

## Jämförelser

Med `else if` körs högst en gren. Med flera `if` efter varandra prövas varje villkor för sig.

```csharp
int poäng = 85;

// Med else if: bara en gren körs
if (poäng >= 80)
{
    Console.WriteLine("Bra!");              // Skrivs ut
}
else if (poäng >= 70)
{
    Console.WriteLine("Godkänt!");          // Skrivs inte ut
}

// Med flera if: alla sanna villkor körs
if (poäng >= 80)
{
    Console.WriteLine("Bra!");              // Skrivs ut
}
if (poäng >= 70)
{
    Console.WriteLine("Godkänt!");          // Skrivs ut
}
```

## Vanliga misstag

- **Fel ordning i `else if`.** Skriv det strängaste villkoret först. Om `poäng >= 70` står först hamnar 85 i den grenen och de andra prövas aldrig.
- **Semikolon efter villkoret.** `if (poäng >= 90);` gör att det tomma semikolonet är blocket. Det `{ }` som kommer efter körs alltid.
- **`=` i stället för `==`.** `if (klar = true)` kompilerar men tilldelar värdet i stället för att jämföra. Skriv `if (klar)` eller `if (klar == true)`.
- **Flera `if` där du menar `else if`.** Då körs fler än en gren om flera villkor är sanna.

## Terminologi

| Term | Betydelse |
|------|-----------|
| Villkor | Uttryck inom parenteserna som ger `true` eller `false` |
| Gren | Det kodblock som körs när ett villkor är sant |
| `bool` | Datatyp med värdena `true` och `false` |
| Kodblock | Satserna mellan `{` och `}` |
