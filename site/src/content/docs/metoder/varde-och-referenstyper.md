---
title: Värde- och referenstyper
description: "Värde- och referenstyper i Metoder — C#-boken av Marcus Ackre Medina"
layout: default
parent: Metoder
nav_order: 28
---
# Värde- och referenstyper — vem skickas hur?

[`out`](out.md) och [`ref`](ref.md) handlar om att skicka en referens istället för en kopia. Men innan de blir begripliga behöver du veta något mer grundläggande: **vissa typer skickas som kopior by default, andra skickas som referenser by default** — helt utan `ref` eller `out`. Det är den skillnaden som avgör varför `Dubbla(ref value)` ens behövs för ett `int`, men aldrig för en `List<T>`.

## När du läst detta ska du kunna

- Förklara skillnaden mellan värdetyper och referenstyper
- Avgöra om en given typ skickas by value eller by reference som standard
- Förklara varför `string` beter sig som en värdetyp fast den tekniskt sett inte är det
- Undvika den klassiska "klona en array"-buggen

## Värdetyper — skickas som kopior

`int`, `double`, `bool`, `char`, `struct` och liknande är **värdetyper**. När du skickar en värdetyp till en metod får metoden en **kopia**. Ändrar metoden kopian, är originalet opåverkat:

```csharp
void Dubbla(int tal)
{
    tal *= 2;   // ändrar bara kopian
}

int mitt = 5;
Dubbla(mitt);
Console.WriteLine(mitt);  // 5 — oförändrat
```

Det är exakt det `ref` löser — `ref` tvingar fram en referens till originalet istället för en kopia, även för en värdetyp. Se [ref-parametrar](ref.md).

## string — konstigt nog också en värdetyp på ytan

Här blir det lite lurigt: `string` är **tekniskt sett en referenstyp** i C# (den är en klass, `System.String`). Men den beter sig i praktiken som en värdetyp, och det finns en bra anledning: **strängar i C# är oföränderliga (immutable)**. Ingen metod kan någonsin ändra en existerande sträng — varje "ändring" (`+`, `.ToUpper()`, `.Replace()` osv.) skapar en helt **ny** sträng i minnet istället.

```csharp
void FörsökÄndra(string text)
{
    text = text.ToUpper();  // skapar en NY sträng, pekar bara om den lokala variabeln
}

string namn = "kim";
FörsökÄndra(namn);
Console.WriteLine(namn);  // "kim" — oförändrat
```

Eftersom ingen kan skriva över en strängs innehåll bakom din rygg spelar det ingen roll att `string` egentligen är en referens — den *känns* som en värdetyp, för det finns aldrig något delat, muterbart tillstånd att bli överraskad av. Det är därför strängar ofta radas upp tillsammans med `int` och `double` som "enkla" typer, trots att de tekniskt hör hemma i referenstypernas läger.

## Referenstyper — skickas som referenser

Klasser, arrayer och samlingar som `List<T>` och `Dictionary<K,V>` är **referenstyper**. När du skickar ett objekt av en referenstyp till en metod skickas *referensen* (adressen till objektet i minnet) — inte en kopia av själva innehållet. Metoden och anroparen pekar då på **samma** objekt. Ändrar metoden objektets innehåll syns det hos anroparen också:

```csharp
class Person
{
    public string Namn = "";
}

void ÄndraNamn(Person p)
{
    p.Namn = "Ändrad";  // ändrar det delade objektet
}

var person = new Person { Namn = "Original" };
ÄndraNamn(person);
Console.WriteLine(person.Namn);  // "Ändrad" — påverkades!
```

## Den klassiska buggen — "klona" en array

Det här mönstret dyker upp om och om igen hos nybörjare, oftast av misstag:

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };
int[] copy = Clone(numbers);

copy[0] = 999;

foreach (int n in numbers)
    Console.Write(n + " ");
// Output: 999 2 3 4 5   <- originalet ändrades också!

int[] Clone(int[] source)
{
    int[] result = source;   // kopierar bara REFERENSEN, inte innehållet
    return result;
}
```

`Clone` ser ut som att den skapar en kopia — den returnerar ju ett `int[]`. Men `int[] result = source;` kopierar inte arrayens innehåll, bara **referensen** till samma array i minnet. `numbers` och `copy` pekar efteråt på exakt samma data. Ändrar du `copy[0]`, ändrar du samtidigt `numbers[0]` — det är samma objekt, bara två namn på det.

### Så klonar du på riktigt

```csharp
int[] Clone(int[] source)
{
    int[] result = new int[source.Length];
    for (int i = 0; i < source.Length; i++)
        result[i] = source[i];
    return result;
}
```

Eller kortare, med inbyggda verktyg:

```csharp
int[] copy1 = (int[])numbers.Clone();       // Array.Clone()
int[] copy2 = numbers.ToArray();            // LINQ — vanligast i modern kod
int[] copy3 = new int[numbers.Length];
Array.Copy(numbers, copy3, numbers.Length); // Array.Copy()
```

Alla tre skapar en **ny** array med samma innehåll — ändrar du kopian påverkas inte originalet. Samma sak gäller `List<T>`: `var copy = new List<int>(original);` eller `original.ToList()` — aldrig `var copy = original;`.

## Tumregel

| Typ | Kategori | Skickas som | Effekt |
|-----|----------|--------------|--------|
| `int`, `double`, `bool`, `char`, `struct` | Värdetyp | Kopia | Ändring i metoden syns inte hos anroparen |
| `string` | Referenstyp (men immutable) | Kopia av referensen — men beter sig som en kopia | Kan aldrig muteras — "ändring" skapar en ny sträng |
| Klasser (`class`) | Referenstyp | Referens | Ändring av objektets fält syns hos anroparen |
| Arrayer (`int[]` osv) | Referenstyp | Referens | Ändring av ett element syns hos anroparen |
| `List<T>`, `Dictionary<K,V>` osv | Referenstyp | Referens | Samma som arrayer |

## TL;DR

Värdetyper skickas som kopior — ändringar i metoden stannar i metoden, om du inte använder `ref`/`out`. Referenstyper (klasser, arrayer, listor) skickas som referenser — metoden och anroparen delar samma objekt, så ändringar syns hos båda. `string` är tekniskt en referenstyp men beter sig som en värdetyp eftersom den är oföränderlig. Vill du kopiera innehållet i en array eller lista, kopiera det explicit — att bara skriva `a = b` kopierar bara referensen, inte innehållet.
