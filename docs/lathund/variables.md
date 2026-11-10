---
title: "Lathund: variabler"
description: "Deklaration, initialisering, modifierare och vanliga operationer för variabler i C#."
parent: Lathund
nav_order: 21
---
# Lathund: variabler

En variabel är ett namngivet minne för ett värde. Du deklarerar den med en datatyp, ger den ett värde och ändrar värdet vid behov.

Läs mer: [Variabler](../variables/index.md).

## Snabbfakta

| Syntax | Betydelse | Exempel |
|--------|-----------|---------|
| `int x;` | Deklarerar utan startvärde | `int x;` |
| `int x = 10;` | Deklarerar och tilldelar ett värde | `int x = 10;` |
| `var y = 20;` | Typen härleds från värdet, här `int` | `var y = 20;` |

```csharp
int antal;                  // Ingen tilldelning ännu. Att läsa den ger kompileringsfel
int ålder = 30;
var poäng = 87;             // Blir int, eftersom värdet är ett heltal
```

## Modifierare

| Modifierare | Betydelse | Exempel |
|-------------|-----------|---------|
| `const` | Värdet sätts vid deklarationen och ändras aldrig | `const int maxVärde = 100;` |
| `readonly` | Fält som bara kan tilldelas i deklarationen eller i konstruktorn | `readonly int minVärde;` |
| `static` | Tillhör klassen, inte ett enskilt objekt | `static int antal;` |

```csharp
class Bil
{
    readonly string registreringsnummer;   // Sätts i konstruktorn och ändras sedan inte
    static int antalBilar;                 // Delas av alla Bil-objekt

    public Bil(string registreringsnummer)
    {
        this.registreringsnummer = registreringsnummer;
        antalBilar++;
    }
}
```

```csharp
const int maxVärde = 100;   // Lokal konstant
maxVärde = 200;             // Kompileringsfel: en konstant kan inte ändras
```

## Operationer

| Syntax | Betydelse | Exempel |
|--------|-----------|---------|
| `x = y + z;` | Tilldelar summan | `total = pris + moms;` |
| `x += 5;` | Adderar och tilldelar | `poäng += 5;` |
| `x *= 2;` | Multiplicerar och tilldelar | `x *= 2;` |
| `x -= 5;` | Subtraherar och tilldelar | `poäng -= 5;` |
| `x++;` | Ökar med 1 | `ålder++;` |
| `x--;` | Minskar med 1 | `antal--;` |

## Jämförelser

| Villkor | Betydelse | Exempel |
|---------|-----------|---------|
| `if (x > y)` | `x` är större än `y` | `if (ålder > 18)` |
| `if (x == y)` | `x` är lika med `y` | `if (svar == rättSvar)` |
| `if (x != y)` | `x` är inte lika med `y` | `if (lösenord != "hemligt")` |

## Vanliga misstag

- **Använda en variabel utan värde.** Kompilatorn säger `CS0165`. Ge variabeln ett värde före första användning.
- **`var` utan värde.** `var x;` ger fel, eftersom typen inte kan härledas.
- **`=` i stället för `==`.** `if (x = 5)` tilldelar i stället för att jämföra. C# ger kompileringsfel här eftersom villkoret inte är `bool`, men `if (sant = true)` kompilerar och tilldelar i stället för att jämföra.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Variabel** | Ett namngivet minne som håller ett värde |
| **Deklaration** | Att ange datatyp och namn för en variabel |
| **Initialisering** | Att ge variabeln ett första värde |
| **Tilldelning** | Att sätta ett värde med `=` |
| **Konstant** | Ett värde som inte kan ändras (`const`) |
| **Härledd typ** | Att kompilatorn räknar ut typen, med `var` |
