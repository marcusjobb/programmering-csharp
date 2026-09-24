---
title: "Decision trees och beslutsalgoritmer"
description: "Ett decision tree (beslutsträd) är precis vad namnet säger: en trädstruktur där varje nod är en fråga, varje gren är ett svar, och varje löv är ett…"
parent: Algoritmer
nav_order: 50
---

# Decision trees och beslutsalgoritmer

Ett decision tree (beslutsträd) är precis vad namnet säger: en trädstruktur där varje nod är en fråga, varje gren är ett svar, och varje löv är ett beslut. Det är samma idé oavsett om du bygger ett enkelt regelverk för hand eller om trädet lärs in automatiskt från data (maskininlärning) — den senare delen är utanför den här bokens omfång, men grundstrukturen är identisk.

## När du läst detta ska du kunna

- Förklara vad ett decision tree är och varför det är läsbarare än nästlade `if`-satser
- Modellera ett beslutsträd som en klass-struktur i C#
- Traversera trädet för att fatta ett beslut

## Problemet ett decision tree löser

Nästlade `if`-satser med många villkor blir snabbt oläsbara — och svåra att ändra utan att av misstag bryta en annan gren:

```csharp
// Djungeln av if-satser
if (ålder < 18)
{
    if (harMålsmansGodkännande)
        return "Godkänd med målsmans tillstånd";
    else
        return "Nekad";
}
else
{
    if (kreditScore > 650)
        return "Godkänd";
    else if (harInkomstbevis)
        return "Godkänd med villkor";
    else
        return "Nekad";
}
```

Ett decision tree gör samma logik till **data** istället för hårdkodad kontrollflöde — trädet kan inspekteras, loggas, och till och med byggas dynamiskt.

## Modellera trädet

```csharp
public class BeslutsNod
{
    public string Fråga { get; }
    public Func<Ansökan, bool>? Villkor { get; }
    public BeslutsNod? OmJa { get; set; }
    public BeslutsNod? OmNej { get; set; }
    public string? Beslut { get; set; }   // Bara satt på löv-noder

    public BeslutsNod(string fråga, Func<Ansökan, bool>? villkor = null, string? beslut = null)
    {
        Fråga = fråga;
        Villkor = villkor;
        Beslut = beslut;
    }

    public bool ÄrLöv => Beslut is not null;
}

public record Ansökan(int Ålder, bool HarMålsmansGodkännande, int KreditScore, bool HarInkomstbevis);
```

```csharp
var trädRot = new BeslutsNod("Är sökande under 18?", a => a.Ålder < 18)
{
    OmJa = new BeslutsNod("Har målsmans godkännande?", a => a.HarMålsmansGodkännande)
    {
        OmJa  = new BeslutsNod("Löv", beslut: "Godkänd med målsmans tillstånd"),
        OmNej = new BeslutsNod("Löv", beslut: "Nekad")
    },
    OmNej = new BeslutsNod("Kreditscore över 650?", a => a.KreditScore > 650)
    {
        OmJa  = new BeslutsNod("Löv", beslut: "Godkänd"),
        OmNej = new BeslutsNod("Har inkomstbevis?", a => a.HarInkomstbevis)
        {
            OmJa  = new BeslutsNod("Löv", beslut: "Godkänd med villkor"),
            OmNej = new BeslutsNod("Löv", beslut: "Nekad")
        }
    }
};
```

## Traversera trädet — fatta beslutet

```csharp
public static string Utvärdera(BeslutsNod nod, Ansökan ansökan)
{
    if (nod.ÄrLöv)
        return nod.Beslut!;

    bool svar = nod.Villkor!(ansökan);
    var nästaNod = svar ? nod.OmJa : nod.OmNej;
    return Utvärdera(nästaNod!, ansökan);
}
```

```csharp
var ansökan = new Ansökan(Ålder: 25, HarMålsmansGodkännande: false, KreditScore: 700, HarInkomstbevis: false);
string resultat = Utvärdera(trädRot, ansökan);

Console.WriteLine(resultat);   // Godkänd
```

Samma logik som `if`-djungeln ovan — men nu som en struktur du kan gå igenom, logga varje steg i, eller till och med rita upp som ett diagram automatiskt.

## Varför strukturera det så här?

| Fördel | Varför det spelar roll |
|---|---|
| Läsbarhet | Varje nod är en enda fråga — trädet går att läsa som ett flödesschema |
| Spårbarhet | Du kan logga exakt vilken väg genom trädet ett beslut tog |
| Utbyggbarhet | Lägg till en ny gren utan att röra resten av strukturen |
| Testbarhet | Varje nod kan testas isolerat |

## Släktskap med State-mönstret

Ett decision tree liknar [State-mönstret](../designmonster/gof/behavioral/state.md) — båda representerar förgrenad logik som data/objekt istället för `switch`-satser. Skillnaden: State representerar *var ett objekt befinner sig* över tid, decision tree representerar *ett engångsbeslut* baserat på indata.

## TL;DR

Ett decision tree gör förgrenad beslutslogik till en trädstruktur av frågor och löv istället för nästlade `if`-satser — mer läsbart, spårbart och utbyggbart. Samma grundidé som ligger bakom maskininlärningens beslutsträd, bara handskriven istället för inlärd från data.
