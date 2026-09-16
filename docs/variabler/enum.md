---
title: Enum
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb"
school: Nion Education
date: "2026-09-16"
updated: "2026-09-16"
parent: Variabler
nav_order: 25
---
# Enum

Föreställ dig att du skriver ett program som hanterar årstider. Du behöver lagra vilken årstid det är. Du _kan_ använda strängar:

```csharp
string årstid = "Sommar";
```

Men strängar är oprecisa. Ingenting hindrar att du råkar skriva `"sommar"` (liten bokstav), `"SOMMAR"`, eller `"Sommmar"` med ett extra m. Kompilatorn ser ingenting fel — men programmet beter sig fel.

Det finns ett bättre verktyg: **enum**. En enum (uppräkning) är en namngiven uppsättning av fasta heltalsvärden. Du definierar en begränsad uppsättning tillåtna värden, och kompilatorn ser till att du bara kan använda dem.

```csharp
enum Säsong
{
    Vår,
    Sommar,
    Höst,
    Vinter
}
```

Nu är `Säsong.Sommar` ett giltigt värde. `Säsong.Sommmar` är ett kompileringsfel. Det felet hittar du direkt — inte en timme in i felsökning.

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
- Omöjligt att stava fel — du skriver `Säsong.Sommar`, inte en fri sträng

```csharp
// Med sträng — kompilatorn ser inget fel, men programmet kanske beter sig fel
string väder = "regnigt";          // Korrekt är "Regnigt" med stor bokstav

// Med enum — kompilatorn stoppar dig direkt om du skriver fel
Väderlek väder = Väderlek.Regnigt; // Enda möjliga stavningen
```

Enums är också tydligare att läsa. `Väderlek.Soligt` berättar mer än `"soligt"` — du vet direkt att det tillhör en definierad kategori.

## Grundsyntax

Du definierar en enum utanför klassen, på samma nivå som `class`. Konventionen är PascalCase för både enum-namnet och varje värde.

```csharp
enum Veckodag
{
    Måndag,
    Tisdag,
    Onsdag,
    Torsdag,
    Fredag,
    Lördag,
    Söndag
}
```

Standardvärdet börjar på 0 och ökar med 1. `Måndag = 0`, `Tisdag = 1`, osv.

## Använda en enum

```csharp
Veckodag idag = Veckodag.Onsdag;

Console.WriteLine(idag);       // Onsdag
Console.WriteLine((int)idag);  // 2
```

### Output

```
Onsdag
2
```

<details>
<summary>Vad är enum egentligen under huven?</summary>

En enum är i grunden ett heltal. Varje värde mappas till ett nummer som börjar på 0:

```csharp
// Implicit:
// Måndag  = 0
// Tisdag  = 1
// Onsdag  = 2
// Torsdag = 3
// ...
```

Det betyder att du kan casta mellan enum och int:

```csharp
int nummer = (int)Veckodag.Onsdag;  // 2
Veckodag dag = (Veckodag)4;          // Fredag
```

I praktiken gör du sällan det här. Det är mer en förklaring till varför enums finns och fungerar som de gör — de är ett säkert lager ovanpå tal.

</details>

## Enum i switch

Enums och `switch` är gjorda för varandra. När du har en begränsad uppsättning möjliga värden kan en `switch` hantera varje fall.

Klassisk switch:

```csharp
Väderlek dagensVäder = Väderlek.Regnigt;

switch (dagensVäder)
{
    case Väderlek.Soligt:
        Console.WriteLine("Ta med solglasögon!");
        break;
    case Väderlek.Molnigt:
        Console.WriteLine("Det är grått ute, men torrt.");
        break;
    case Väderlek.Regnigt:
        Console.WriteLine("Ta med ett paraply!");
        break;
    case Väderlek.Snöigt:
        Console.WriteLine("Klä dig varmt och ta på vinterskorna!");
        break;
}
```

Switch-uttryck (modern C#):

```csharp
Veckodag dag = Veckodag.Lördag;

string typ = dag switch
{
    Veckodag.Lördag => "Helg",
    Veckodag.Söndag => "Helg",
    _               => "Vardag"
};

Console.WriteLine(typ);
```

### Output

```
Helg
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

HttpStatus svar = HttpStatus.NotFound;
Console.WriteLine((int)svar);  // 404
```

### Output

```
404
```

## Konvertera mellan int och enum

```csharp
// int → enum
Veckodag dag = (Veckodag)3;
Console.WriteLine(dag);    // Torsdag

// string → enum
Veckodag parsed = Enum.Parse<Veckodag>("Fredag");
Console.WriteLine(parsed); // Fredag
```

## [Flags] — kombinerbara värden

Med attributet `[Flags]` kan du kombinera enum-värden med `|` (bitvis eller). Varje värde måste vara en tvåpotens.

```csharp
[Flags]
enum Behörighet
{
    Ingen   = 0,
    Läsa    = 1,
    Skriva  = 2,
    Radera  = 4,
    Admin   = Läsa | Skriva | Radera
}

Behörighet roll = Behörighet.Läsa | Behörighet.Skriva;
Console.WriteLine(roll);                             // Läsa, Skriva
Console.WriteLine(roll.HasFlag(Behörighet.Läsa));    // True
Console.WriteLine(roll.HasFlag(Behörighet.Radera));  // False
```

### Output

```
Läsa, Skriva
True
False
```

## Enum i praktiken

Enums dyker upp naturligt när ett värde tillhör en känd, begränsad uppsättning alternativ.

```csharp
enum Säsong { Vår, Sommar, Höst, Vinter }

class Program
{
    static void Main()
    {
        Säsong säsong = Säsong.Vinter;

        Console.WriteLine("Aktuell säsong: " + säsong);  // Vinter

        switch (säsong)
        {
            case Säsong.Vår:
                Console.WriteLine("Det börjar bli varmt igen.");
                break;
            case Säsong.Sommar:
                Console.WriteLine("Semester!");
                break;
            case Säsong.Höst:
                Console.WriteLine("Löven faller.");
                break;
            case Säsong.Vinter:
                Console.WriteLine("Plocka fram vinterkläderna.");
                break;
        }
    }
}
```

Vanliga användningsfall för enum:

- **Riktningar** — `Norr`, `Söder`, `Öster`, `Väster`
- **Status** — `Aktiv`, `Inaktiv`, `Väntande`
- **Kortfärger** — `Hjärter`, `Ruter`, `Spader`, `Klöver`
- **Svårighetsgrad** — `Lätt`, `Medel`, `Svår`

Varje gång du ser dig själv skriva en sträng som ett av ett begränsat antal alternativ — fundera på om det är ett enum i förklädnad.

## TL;DR

Enum ger namn åt fasta heltalsvärden. Bättre än magiska siffror och strängar — kompilatorn kontrollerar att du använder giltiga värden. Passar perfekt med `switch`. Använd `[Flags]` när värden kan kombineras.

**Se även:** [programmeringstermer/listor.md](../programmeringstermer/listor.md)
