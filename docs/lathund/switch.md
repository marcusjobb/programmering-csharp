---
title: "Lathund: switch"
description: "switch-sats och switch-uttryck i C#: case, break, default, when, jämförelser och vanliga misstag."
parent: Lathund
nav_order: 32
---
# Lathund: switch

`switch` väljer ett kodblock utifrån värdet på ett uttryck. Det är ett alternativ till långa `if`/`else if`-kedjor när alla villkor jämför samma värde.

Läs mer: [Villkorssatser](../conditionals/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Varianter | Switch-sats (från C# 1) och switch-uttryck (från C# 8) |
| Jämförelse | Mönstermatchning, till exempel konstanter, typer och `when`-villkor |
| Fallthrough | Inte tillåtet. Varje `case` med innehåll måste sluta med `break`, `return`, `throw` eller `continue` |
| Standardgren | `default` i satsen, `_` i uttrycket |

## Operationer

| Nyckelord | Betydelse | Exempel |
|-----------|-----------|---------|
| `switch` | Inleder en switch-sats eller ett switch-uttryck | `switch (dagNummer)` |
| `case` | Ett värde eller mönster som ska matchas | `case 1:` |
| `break` | Avslutar ett `case` i en switch-sats | `break;` |
| `default` | Körs när inget `case` matchar | `default:` |
| `when` | Lägger till ett villkor på ett `case` | `case int n when n < 0:` |
| `_` | Fångar alla värden som inte matchats (i uttryck) | `_ => "Okänd dag"` |

Två varianter av samma sak:

<details>
<summary>Switch-sats</summary>

Används när varje gren gör något, till exempel skriver ut text.

```csharp
int dagNummer = 2;

switch (dagNummer)
{
    case 1:
        Console.WriteLine("Måndag");
        break;
    case 2:
        Console.WriteLine("Tisdag");        // Skrivs ut: Tisdag
        break;
    case 6:
    case 7:                                 // Flera case som delar samma kodblock
        Console.WriteLine("Helg");
        break;
    default:
        Console.WriteLine("Vardag");
        break;
}
```

</details>

<details>
<summary>Switch-uttryck (C# 8+)</summary>

Används när switchen ska ge ett värde tillbaka. Lägg märke till `;` efter den avslutande `}`.

```csharp
int dagNummer = 6;

string dag = dagNummer switch
{
    1 => "Måndag",
    2 => "Tisdag",
    6 or 7 => "Helg",
    _ => "Okänd dag"
};

Console.WriteLine(dag);                     // Helg
```

</details>

## Jämförelser

| Egenskap | Switch-sats | Switch-uttryck |
|----------|-------------|----------------|
| Ger ett värde | Nej | Ja |
| Kräver `break` | Ja, i varje `case` med innehåll | Nej |
| Standardgren | `default:` | `_ =>` |
| Avslutas med `;` | Nej (efter sista `}` i satsen) | Ja |
| Användning | Utför handlingar | Tilldelar eller returnerar ett värde |

## Vanliga misstag

- **Glömt `break`.** Ett `case` med innehåll måste avslutas. C# tillåter inte att koden fortsätter in i nästa `case`.
- **Glömt `;` efter switch-uttryckets `}`.** Då tolkas raden inte som färdig.
- **Switch-uttryck utan `_`.** Om inte alla värden täcks får du varningen CS8509. Lägg till `_ => ...` för att hantera övriga värden.
- **`break` i ett switch-uttryck.** Uttryck returnerar ett värde direkt, så `break` hör inte hemma där.

## Terminologi

| Term | Betydelse |
|------|-----------|
| Switch-sats | En `switch` som utför kod men inte ger ett värde |
| Switch-uttryck | En `switch` som ger ett värde, med `=>` för varje gren |
| `case` | Ett värde eller mönster som matchas mot uttrycket |
| Fallthrough | Att koden fortsätter från ett `case` till nästa. Förbjudet i C# när det finns innehåll |
| Discard | `_`, ett platshållare för värden som inte används |
| Mönster | Villkor som kan kombinera typ, värde och `when` |
