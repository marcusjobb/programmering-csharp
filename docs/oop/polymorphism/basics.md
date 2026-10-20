---
title: Grunderna — virtual och override
description: "Innan interfaces och abstrakta klasser: den enklaste formen av polymorfism bygger bara på vanligt arv, virtual och override. Det här är fundamentet resten…"
parent: Polymorfism
nav_order: 5
---
# Grunderna — virtual och override

Innan interfaces och abstrakta klasser: den enklaste formen av polymorfism bygger bara på vanligt arv, `virtual` och `override`. Det här är fundamentet resten av kapitlet bygger vidare på.

## När du läst detta ska du kunna

- Förklara vad `virtual` och `override` gör
- Förklara skillnaden på deklarerad typ och faktisk typ
- Skapa en `List<BasKlass>` med blandade subklasser och loopa polymorft
- Använda `is`/cast för att komma åt medlemmar som bara finns på subklassen

## Vad polymorfism faktiskt betyder

Ordet kommer från grekiskans *poly* (många) och *morphe* (form) — många former av samma sak. I praktiken: samma metodanrop ger olika resultat beroende på vilket objekt som faktiskt tar emot det.

Mekaniken bakom är två nyckelord. `virtual` på en metod i basklassen säger "subklasser får skriva sin egen version av den här". `override` i subklassen gör det. Glömmer du `virtual` i basklassen fungerar inte `override`; glömmer du `override` i subklassen körs basklassens (ofta tomma) version istället.

```csharp
class Djur
{
    public string Namn { get; set; }
    public virtual void LåtaLjud() { }
}

class Hund : Djur
{
    public override void LåtaLjud() => Console.WriteLine("Voff!");
}

class Katt : Djur
{
    public override void LåtaLjud() => Console.WriteLine("Mjau!");
}
```

## Deklarerad typ och faktisk typ är inte samma sak

Skriver du `Djur mittDjur = new Hund("Fido");` har variabeln en **deklarerad** typ (`Djur` — det du får skriva och vad kompilatorn tillåter) och en **faktisk** typ (`Hund` — vad objektet verkligen är). C# håller reda på båda samtidigt. När du anropar `mittDjur.LåtaLjud()` är det den faktiska typen som avgör vilken kod som körs — det blir "Voff!", inte tystnad, trots att variabeln bara vet att den är en `Djur`.

Att spara ett `Hund`-objekt i en `Djur`-variabel kallas **uppcastning**, och det är alltid säkert eftersom en `Hund` per definition är en `Djur`.

## Varför det här är användbart

Utan polymorfism tvingas du hålla en separat lista och en separat loop per djurtyp — en för hundar, en för katter, och en till för varje ny typ du lägger till. Med polymorfism räcker en enda `List<Djur>` med blandat innehåll och en enda loop:

```csharp
List<Djur> djur = new() { new Hund("Fido"), new Katt("Luna"), new Hund("Buster") };

foreach (Djur d in djur)
    d.LåtaLjud();   // kör automatiskt rätt override, oavsett faktisk typ
```

Lägg till `class Orm : Djur` med sin egen `LåtaLjud()`, och den här loopen ändras aldrig. Det är kärnan i principen "öppen för arv, stängd för ändring" — ny funktionalitet utan att röra befintlig kod.

## När basklassen inte räcker till

`LåtaLjud()` fungerar rakt av i loopen eftersom den finns på `Djur`. Men lägger du en metod som `Bit()` bara på `Hund`, vet `Djur` inget om den — `d.Bit()` kompilerar inte när `d` är deklarerad som `Djur`. Då behöver du fråga vad objektet faktiskt är, och C# ger dig `is` med mönstermatchning för det: `if (d is Hund hund) hund.Bit();` kollar den faktiska typen och skapar samtidigt en färdigt typad variabel (`hund`) att jobba med om det stämmer.

Tumregeln är enkel: metoder som finns på basklassen (`virtual`/`override`) behöver aldrig `is` eller cast — polymorfismen sköter det automatiskt. Först när du vill åt något som bara finns på en specifik subklass behöver du fråga vilken typ det faktiskt är. Det finns också en explicit variant, `(Hund)vov`, som fungerar likadant men kraschar med ett `InvalidCastException` om typen inte stämmer — `is`-mönstret är det säkrare valet av de två, eftersom det aldrig kraschar, bara svarar nej.

## TL;DR

| Begrepp | Vad det gör |
|---------|-------------|
| `virtual` (basklass) | Markerar att subklasser får skriva sin egen version |
| `override` (subklass) | Skriver den egna versionen |
| Uppcastning | Subklass-objekt sparas i basklass-variabel — alltid säkert  |
| `List<BasKlass>` | En lista, blandade subklasser, en loop |
| `is`/mönstermatchning | Kollar faktisk typ, ger dig en typad variabel att jobba med |
| `(Typ)objekt` | Explicit nedcastning — kan kasta `InvalidCastException` om fel |
