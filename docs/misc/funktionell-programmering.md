---
title: Funktionell programmering
description: "C# är objektorienterat i grunden, men LINQ, lambdas och immutable data lånar rakt av från funktionell programmering — ett annat sätt att tänka på kod."
parent: Övrigt
nav_order: 20
---
# Funktionell programmering

Du har redan skrivit funktionell kod utan att nödvändigtvis tänka på det så — varje gång du skickat ett lambda-uttryck till `.Where()` eller `.Select()` har du använt idéer som kommer från funktionell programmering, ett paradigm där själva grundtanken skiljer sig från den objektorienterade stilen du lärt dig i övriga delar av boken.

## Objektorienterat vs funktionellt — grundskillnaden

Objektorienterad kod modellerar världen som **objekt med tillstånd** som ändras över tid — ett `BankAccount`-objekt vars `Balance` muteras när du anropar `Deposit()`. Funktionell kod modellerar istället **data som flödar genom funktioner** som inte ändrar något — varje funktion tar in data och returnerar ny data, utan att röra det som skickades in.

```csharp
// Objektorienterad stil — muterar tillstånd
public class Counter
{
    public int Value { get; private set; }
    public void Increment() => Value++;
}

// Funktionell stil — ingen mutation, ny data varje gång
int Increment(int value) => value + 1;

int a = 5;
int b = Increment(a);   // a är fortfarande 5, b är 6
```

C# är inte ett rent funktionellt språk — det är objektorienterat med starka funktionella inslag. Du väljer stil beroende på vad problemet passar bäst för, inte det ena eller det andra hela tiden.

## Rena funktioner — samma indata, samma utdata, alltid

En **ren funktion** gör bara en sak: räknar ut ett värde utifrån sina argument. Den läser inget utanför sig själv, ändrar inget utanför sig själv, och ger garanterat samma resultat varje gång den anropas med samma indata.

```csharp
// Ren funktion — beror bara på sina argument
int Square(int x) => x * x;

// Inte ren — beror på och ändrar yttre tillstånd
int total = 0;
void AddToTotal(int x) => total += x;
```

`Square` går att testa isolerat, går att köra parallellt utan krockrisk, och går att resonera om utan att spåra resten av programmet. `AddToTotal` kräver att du vet vad `total` var innan för att förstå vad som händer — det är precis den typen av dold koppling funktionell programmering försöker undvika.

## Immutability — data som aldrig ändras

Istället för att mutera ett objekt skapar funktionell kod en **ny** kopia med den ändring du ville göra. Du har redan sett det här mönstret i [Records](../oop/records.md):

```csharp
public record Point(int X, int Y);

var p1 = new Point(1, 2);
var p2 = p1 with { X = 99 };   // ny instans — p1 är orörd

Console.WriteLine(p1);   // Point { X = 1, Y = 2 }
Console.WriteLine(p2);   // Point { X = 99, Y = 2 }
```

Fördelen är spårbarhet: `p1` kan aldrig ha ändrats bakom din rygg av kod någon annanstans i programmet, eftersom ingen kod kan mutera den. Se [Records](../oop/records.md) för hela resonemanget om varför det spelar roll i till exempel bankapplikationer.

## Funktioner som värden — lambdas och delegater

I funktionell programmering är funktioner **förstaklassens värden** — du kan skicka dem som argument, spara dem i en variabel, och returnera dem från andra funktioner, precis som ett tal eller en sträng.

```csharp
Func<int, int> dubbla = x => x * 2;
Console.WriteLine(dubbla(5));   // 10

// En funktion som tar emot en annan funktion
int Applicera(int värde, Func<int, int> operation) => operation(värde);

Console.WriteLine(Applicera(5, dubbla));           // 10
Console.WriteLine(Applicera(5, x => x * x));       // 25
```

Det är exakt samma mekanik som gör [Strategy-mönstret](../designmonster/gof/behavioral/strategy.md) och `.Sort()` med ett `Comparison<T>`-lambda möjliga — en funktion behandlad som data, skickad in där beteendet ska avgöras.

## LINQ — funktionell programmering i praktiken

LINQ är C#:s tydligaste funktionella ansikte. Varje metod tar en samling, en ren funktion, och returnerar en **ny** samling — originalet rörs aldrig:

```csharp
var numbers = new List<int> { 1, 2, 3, 4, 5, 6 };

var doubled = numbers.Select(n => n * 2);          // ny samling: 2, 4, 6, 8, 10, 12
var evens   = numbers.Where(n => n % 2 == 0);       // ny samling: 2, 4, 6
var sum     = numbers.Aggregate((a, b) => a + b);   // ett värde: 21

Console.WriteLine(string.Join(", ", numbers));   // 1, 2, 3, 4, 5, 6 — orörd
```

`Select` (transformera varje element), `Where` (filtrera), och `Aggregate` (kombinera allt till ett värde — kallas ofta *reduce* eller *fold* i andra funktionella språk) är tre av de vanligaste byggstenarna i funktionell programmering, färdigimplementerade i .NET. Se [LINQ](../datastrukturer/linq.md) för hela metodkatalogen.

## Funktionskomposition — bygg stort av litet

Två små funktioner kan kombineras till en större genom att kedja dem:

```csharp
Func<int, int> dubbla = x => x * 2;
Func<int, int> läggTillEtt = x => x + 1;

Func<int, int> dubblaOchLäggTill = x => läggTillEtt(dubbla(x));

Console.WriteLine(dubblaOchLäggTill(5));   // (5 * 2) + 1 = 11
```

Det är samma princip som en LINQ-kedja (`.Where(...).Select(...).OrderBy(...)`) — små, väldefinierade steg satta ihop till ett större flöde, istället för en stor funktion som gör allt på en gång.

## När passar funktionell stil?

Funktionell stil lyser när du transformerar data — filtrera, omforma, aggregera en samling. Objektorienterad stil lyser när du modellerar något med identitet och beteende som förändras över tid — ett bankkonto, en spelkaraktär, en pågående beställning. De flesta C#-program blandar båda: objekt för det som har tillstånd och identitet, LINQ och rena funktioner för det som är ren databehandling.

## Obligatorisk dad-joke

Varför litade alla på den rena funktionen?

Den hade inget att dölja — samma indata gav alltid samma svar.
