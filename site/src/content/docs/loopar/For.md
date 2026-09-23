---
title: For
description: "For i Loopar — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Loopar
nav_order: 20
---
# For

Det finns tre olika typer av for-loopar i C#: vanlig for-loop, foreach-loop och inline for-each-loop.

<details open markdown="block">
 <summary>
 Innehållsförteckning
 </summary>
 {: .text-delta }

1. TOC
   {:toc}

</details>

## Beskrivning

En for-loop är en loop som körs så länge som ett villkor är sant. Det är den vanligaste typen av loop i C#. Den är enkel, lätt att hantera och relativt okomplicerad. Detta gör att den är snabb och effektiv.

### Exempel

Här är ett exempel på en for-loop som räknar från 1 till 10:

```csharp
for (int i = 1; i <= 10; i++)
{
    Console.WriteLine(i);
}
```

Här är ett exempel på en for-loop som räknar från 10 till 0:

```csharp
for (int i = 10; i >= 0; i--)
{
    Console.WriteLine(i);
}
```

## Foreach

Foreach är en loop som används för att iterera över en samling av element. Den är enkel att använda och lättläst. Dock är den inte lika effektiv som en vanlig for-loop. Foreach används när du vill bara iterera över elementen i en samling, men om du behöver bearbeta eller manipulera elementen kan en vanlig for-loop vara mer lämplig. En annan begränsning är att du inte kan iterera baklänges över en samling med foreach utan att påverka samlingen.

### Exempel

Här är ett exempel där vi använder en foreach-loop för att iterera över en lista med namn:

```csharp
string[] names = new string[] { "Superman", "Batman", "Wonder Woman", "Flash" };
foreach (string name in names)
{
    Console.WriteLine(name);
}
```

För att skriva ut listan baklänges kan vi använda metoden `Reverse` på arrayen innan vi använder foreach-loopen:

```csharp
Array.Reverse(names);
foreach (string name in names)
{
    Console.WriteLine(name);
}
```

## Inline Foreach

Inline foreach-funktionen fungerar endast med listor, inte med arrayer.

```csharp
List<string> names = new List<string> { "Superman", "Batman", "Wonder Woman", "Flash" };
names.ForEach(name => Console.WriteLine(name));
```

För att skriva ut listan baklänges kan vi använda metoden `Reverse` på listan innan vi använder inline foreach-funktionen:

```csharp
names.Reverse();
names.ForEach(name => Console.WriteLine(name));
```

## Sammanfattning

- En for-loop används för att upprepa en kodblock ett visst antal gånger baserat på ett villkor.
- Foreach-loop används för att iterera över elementen i en samling.
- Inline foreach-funktionen används för att iterera över elementen i en lista.

## Termer

| Term                    | Förklaring                                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Effektivitet            | Förmågan hos en loop eller algoritm att utföra uppgiften på ett snabbt och resurssnålt sätt.                      |
| Element                 | En individuell enhet eller objekt i en samling.                                                                   |
| Element                 | Ett objekt i en samling.                                                                                          |
| Falsk                   | Ett uttryck som utvärderas till falskt.                                                                           |
| For-loop                | En loop som upprepar en kodblock ett visst antal gånger baserat på ett villkor.                                   |
| For-loop                | En loop som upprepar en kodblock ett visst antal gånger baserat på ett villkor.                                   |
| Foreach-loop            | En loop som används för att iterera över elementen i en samling.                                                  |
| Foreach-loop            | En loop som används för att iterera över elementen i en samling.                                                  |
| Inline foreach-funktion | En funktion som används för att iterera över elementen i en lista och utföra en handling på varje element.        |
| Inline foreach-funktion | En funktion som används för att iterera över elementen i en lista och utföra en handling på varje element.        |
| Iteration               | Processen att upprepa en sekvens av instruktioner eller handlingar ett visst antal gånger.                        |
| Iterera                 | Att upprepa en process ett visst antal gånger.                                                                    |
| Kodblock                | En grupp av relaterade instruktioner eller handlingar som körs tillsammans.                                       |
| Kodblock                | En grupp av satser som utförs tillsammans.                                                                        |
| Kodexempel              | Implementationer av kod som illustrerar användningen av for-loopar, foreach-loopar och inline foreach-funktionen. |
| Operator                | Ett symbol som utför en viss operation på ett eller flera värden.                                                 |
| Samling                 | En grupp av objekt eller element som kan hanteras tillsammans.                                                    |
| Samling                 | En grupp av objekt som kan hanteras som en enhet.                                                                 |
| Sann                    | Ett uttryck som utvärderas till sant.                                                                             |
| Sats                    | En instruktion som utförs av en dator.                                                                            |
| Upprepning              | Att utföra en handling eller köra en kodsekvens flera gånger.                                                     |
| Uttryck                 | En kombination av värden, variabler och operatorer som utvärderas till ett värde.                                 |
| Värde                   | En bit information som kan lagras i en variabel.                                                                  |
| Variabel                | En plats i minnet som innehåller ett värde.                                                                       |
| Villkor                 | En utvärdering eller jämförelse som avgör om en loop fortsätter att köras eller avslutas.                         |
| Villkor                 | Ett uttryck som utvärderas till sant eller falskt.                                                                |

## Mer läsning

Här är några länkar för att lära dig mer om for-loopar och iteration i C#:


- [C# foreach Loop](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/foreach-in)
- [C# Iteration Statements](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/iteration-statements): Officiell dokumentation om iteration i C# som innehåller exempel och förklaringar för for-loopar och foreach-loopar.
- [C# List<T>.ForEach Method](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.foreach)
- [C# Loop Examples](https://www.c-sharpcorner.com/UploadFile/1e050f/c-sharp-loops-for-foreach-while-do-while/): En samling exempel på olika typer av loopar i C#, inklusive for-loopar och foreach-loopar.
- [C# Loops - for, foreach, while, do-while](https://www.c-sharpcorner.com/UploadFile/1e050f/c-sharp-loops-for-foreach-while-do-while/)
- [C# Loops Tutorial](https://www.tutorialspoint.com/csharp/csharp_loops.htm): En detaljerad handledning om olika typer av loopar i C# inklusive for-loopar och foreach-loopar.
- [C# Programming Yellow Book - Looping](https://www.robmiles.com/c-yellow-book/): En onlinebok om programmering med C# som inkluderar kapitel om loopar och iteration med förklaringar och exempel.

Nu har du en grundläggande förståelse för for-loopar, foreach-loopar och inline foreach-funktionen i C#. Du kan använda dessa loopar för att upprepa kodblock och iterera över samlingar av element. Kom ihåg att praktisera och experimentera med kod för att bli mer bekväm med dessa koncept.

## Obligatorisk Dad-joke

Vad sa for-loopen till sin vän?

"Du behöver verkligen en break!".
