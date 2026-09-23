---
title: Enum
description: "Enum i Variabler — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Variabler
nav_order: 25
---
# Enum

Föreställ dig att du skriver ett program som hanterar årstider. Du behöver lagra vilken årstid det är. Du _kan_ använda strängar:

```csharp
string season = "Sommar";
```

Men strängar är oprecisa. Ingenting hindrar att du råkar skriva `"sommar"` (liten bokstav), `"SOMMAR"`, eller `"Sommmar"` med ett extra m. Kompilatorn ser ingenting fel — men programmet beter sig fel.

Det finns ett bättre verktyg: **enum**. En enum (uppräkning) är en namngiven uppsättning av fasta heltalsvärden. Du definierar en begränsad uppsättning tillåtna värden, och kompilatorn ser till att du bara kan använda dem.

```csharp
enum Season
{
    Spring,
    Summer,
    Autumn,
    Winter
}
```

Nu är `Season.Summer` ett giltigt värde. `Season.Sommmar` är ett kompileringsfel. Det felet hittar du direkt — inte en timme in i felsökning.

## När du läst detta ska du kunna

- Deklarera och använda en enum
- Använda enum i switch-satser
- Förstå att enum är baserat på heltal
- Använda `[Flags]` för kombinerbara enum-värden

## Varför inte string?

Det är en rimlig fråga. Strängar är flexibla och lätta att förstå. Men flexibiliteten är också problemet.

**Strängar:**
- Kompilatorn kan inte kontrollera dem — ett stavfel syns inte förrän programmet kör
- Ingen IntelliSense-hjälp — du måste komma ihåg exakt vad du skrivit
- Lätta att råka ändra — `"Sommar"` och `"sommar"` är inte lika

**Enum:**
- Kompilatorn kontrollerar varje användning — ogiltiga värden ger kompileringsfel
- IntelliSense listar alla tillåtna värden åt dig
- Omöjligt att stava fel — du skriver `Season.Summer`, inte en fri sträng

```csharp
// Med sträng — kompilatorn ser inget fel, men programmet kanske beter sig fel
string weather = "regnigt";          // Korrekt är "Regnigt" med stor bokstav

// Med enum — kompilatorn stoppar dig direkt om du skriver fel
Weather weather = Weather.Rainy; // Enda möjliga stavningen
```

Enums är också tydligare att läsa. `Weather.Sunny` berättar mer än `"soligt"` — du vet direkt att det tillhör en definierad kategori.

## Grundsyntax

Du definierar en enum utanför klassen, på samma nivå som `class`. Konventionen är PascalCase för både enum-namnet och varje värde.

```csharp
enum Weekday
{
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}
```

Standardvärdet börjar på 0 och ökar med 1. `Monday = 0`, `Tuesday = 1`, osv.

## Använda en enum

```csharp
Weekday today = Weekday.Wednesday;

Console.WriteLine(today);       // Wednesday
Console.WriteLine((int)today);  // 2
```

### Output

```
Wednesday
2
```

<details markdown="block">
<summary>Vad är enum egentligen under huven?</summary>

En enum är i grunden ett heltal. Varje värde mappas till ett nummer som börjar på 0:

```csharp
// Implicit:
// Monday    = 0
// Tuesday   = 1
// Wednesday = 2
// Thursday  = 3
// ...
```

Det betyder att du kan casta mellan enum och int:

```csharp
int number = (int)Weekday.Wednesday;  // 2
Weekday day = (Weekday)4;              // Friday
```

I praktiken gör du sällan det här. Det är mer en förklaring till varför enums finns och fungerar som de gör — de är ett säkert lager ovanpå tal.

</details>

## Enum i switch

Enums och `switch` är gjorda för varandra. När du har en begränsad uppsättning möjliga värden kan en `switch` hantera varje fall.

Klassisk switch:

```csharp
Weather todaysWeather = Weather.Rainy;

switch (todaysWeather)
{
    case Weather.Sunny:
        Console.WriteLine("Ta med solglasögon!");
        break;
    case Weather.Cloudy:
        Console.WriteLine("Det är grått ute, men torrt.");
        break;
    case Weather.Rainy:
        Console.WriteLine("Ta med ett paraply!");
        break;
    case Weather.Snowy:
        Console.WriteLine("Klä dig varmt och ta på vinterskorna!");
        break;
}
```

Switch-uttryck (modern C#):

```csharp
Weekday day = Weekday.Saturday;

string type = day switch
{
    Weekday.Saturday => "Helg",
    Weekday.Sunday => "Helg",
    _               => "Vardag"
};

Console.WriteLine(type);
```

### Output

```
Weekend
```

Fördelen mot att använda strängar i en switch är att du inte kan missa ett case av misstag — om du lägger till ett nytt värde i enum:en och glömmer att lägga till ett case i switch:en kan verktyg varna dig om det.

## Sätta egna värden

Du kan bestämma exakta heltalsvärden:

```csharp
enum HttpStatus
{
    Ok          = 200,
    NotFound    = 404,
    ServerError = 500
}

HttpStatus response = HttpStatus.NotFound;
Console.WriteLine((int)response);  // 404
```

### Output

```
404
```

## Konvertera mellan int och enum

```csharp
// int → enum
Weekday day = (Weekday)3;
Console.WriteLine(day);    // Thursday

// string → enum
Weekday parsed = Enum.Parse<Weekday>("Friday");
Console.WriteLine(parsed); // Friday
```

## [Flags] — kombinerbara värden

Med attributet `[Flags]` kan du kombinera enum-värden med `|` (bitvis eller). Varje värde måste vara en tvåpotens.

```csharp
[Flags]
enum Permission
{
    None   = 0,
    Read   = 1,
    Write  = 2,
    Delete = 4,
    Admin  = Read | Write | Delete
}

Permission role = Permission.Read | Permission.Write;
Console.WriteLine(role);                             // Read, Write
Console.WriteLine(role.HasFlag(Permission.Read));    // True
Console.WriteLine(role.HasFlag(Permission.Delete));  // False
```

### Output

```
Read, Write
True
False
```

## Enum i praktiken

Enums dyker upp naturligt när ett värde tillhör en känd, begränsad uppsättning alternativ.

```csharp
enum Season { Spring, Summer, Autumn, Winter }

class Program
{
    static void Main()
    {
        Season season = Season.Winter;

        Console.WriteLine("Aktuell säsong: " + season);  // Winter

        switch (season)
        {
            case Season.Spring:
                Console.WriteLine("Det börjar bli varmt igen.");
                break;
            case Season.Summer:
                Console.WriteLine("Semester!");
                break;
            case Season.Autumn:
                Console.WriteLine("Löven faller.");
                break;
            case Season.Winter:
                Console.WriteLine("Plocka fram vinterkläderna.");
                break;
        }
    }
}
```

Vanliga användningsfall för enum:

- **Riktningar** — `North`, `South`, `East`, `West`
- **Status** — `Active`, `Inactive`, `Pending`
- **Kortfärger** — `Hearts`, `Diamonds`, `Spades`, `Clubs`
- **Svårighetsgrad** — `Easy`, `Medel`, `Hard`

Varje gång du ser dig själv skriva en sträng som ett av ett begränsat antal alternativ — fundera på om det är ett enum i förklädnad.

## TL;DR

Enum ger namn åt fasta heltalsvärden. Bättre än magiska siffror och strängar — kompilatorn kontrollerar att du använder giltiga värden. Passar perfekt med `switch`. Använd `[Flags]` när värden kan kombineras.

**Se även:** [programmeringstermer/listor.md](../programmeringstermer/listor.md)
