---
title: TDD
description: "TDD i Testa din kod — C# bok av Marcus Ackre Medina"
parent: Testa din kod
nav_order: 10
---

# Testdriven utveckling (TDD)

TDD vänder på ordningen: skriv testet innan du skriver koden. Det låter bakvänt — men det tvingar dig att tänka igenom vad metoden ska göra innan du skriver den.

## TL;DR

- Röd → Grön → Refaktorera. Upprepa.
- Skriv minimalt med kod för att få testet att passera — inte mer.
- Testerna dokumenterar beteende. Framtida du tackar nuvarande dig.

---

## Red-Green-Refactor

```mermaid
graph LR
    A[Röd: skriv test] --> B[Grön: implementera]
    B --> C[Refaktorera]
    C --> A
```

**Röd**: skriv ett test som misslyckas. Det ska misslyckas — du har inte implementerat något än.

**Grön**: skriv minsta möjliga kod som får testet att passera. Inga gissningar om framtida krav.

**Refaktorera**: förbättra strukturen utan att ändra beteendet. Testerna skyddar dig.

---

## Steg för steg

### 1. Skriv testet

```csharp
using Xunit;

public class KalkylatornTests
{
    [Fact]
    public void Addera_TvåPositivaTal_ReturnererarKorektSumma()
    {
        var calculator = new Calculator();

        int result = calculator.Add(2, 3);

        Assert.Equal(5, result);
    }
}
```

Det kompilerar inte än — `Calculator` finns inte. Det är okej.

### 2. Implementera minimalt

```csharp
public class Calculator
{
    public int Add(int a, int b) => a + b;
}
```

Enklast möjliga implementation. Inget mer.

### 3. Refaktorera

Nu när testet är grönt — finns det något att förbättra? I det här fallet nej. Men i ett riktigt scenario kanske du extraherar hjälpmetoder, byter namn, eller rensar duplicerad logik.

---

## Fler tester — bygg upp täckning

```csharp
[Fact]
public void add_negative_number_returns_correct_sum()
{
    var calculator = new Calculator();
    Assert.Equal(-5, calculator.Add(-2, -3));
}

[Fact]
public void Addera_NollOchPositivt_ReturnerarSammaTal()
{
    var calculator = new Calculator();
    Assert.Equal(7, calculator.Add(0, 7));
}

[Theory]
[InlineData(2, 3, 5)]
[InlineData(-1, 1, 0)]
[InlineData(0, 0, 0)]
public void add_different_combinations(int a, int b, int expected)
{
    var calculator = new Calculator();
    Assert.Equal(expected, calculator.Add(a, b));
}
```

`[Theory]` + `[InlineData]` låter dig köra samma test med olika indata utan att duplicera testkoden.

---

## Struktur för ett test — AAA

Arrange–Act–Assert är standardstrukturen:

```csharp
[Fact]
public void NameForTest()
{
    // Arrange — förbered allt som behövs
    var object = new MinClass();
    int input = 5;

    // Act — kör det som testas
    int result = object.MinMethod(input);

    // Assert — kontrollera att resultatet är korrekt
    Assert.Equal(10, result);
}
```

---

## Testnamn

Namnge testerna så att de beskriver beteendet:

```
add_two_positive_number_returns_correct_sum
Dela_MedNoll_KastarDivideByZeroException
Hämta_EjBefintligtId_ReturnerarNull
```

Mönstret: `Metod_Scenario_FörväntatResultat`. Det gör felsökning snabbare — du ser vilket scenario som bröt utan att öppna koden.

---

## Varför TDD?

- **Tvingar fram design**: om koden är svår att testa är den troligen svår att använda också.
- **Dokumentation som alltid stämmer**: testerna beskriver vad koden faktiskt gör, inte vad du trodde den skulle göra.
- **Regressionsskydd**: när du lägger till ny funktionalitet ser du direkt om du bröt något gammalt.
- **Refaktorering utan rädsla**: gröna tester = trygg förändring.

---

## Komma igång med xUnit i .NET

```bash
# Skapa testprojekt
dotnet new xunit -n MittProjekt.Tests

# Lägg till referens till ditt projekt
dotnet add MittProjekt.Tests/MittProjekt.Tests.csproj reference MittProjekt/MittProjekt.csproj

# Kör tester
dotnet test
```

---

## Övningar

1. Implementera en metod `IsPrimeNumber(int n)` med TDD — skriv testerna först för: `1` (ej primtal), `2` (primtal), `4` (ej primtal), `17` (primtal).
2. Bygg en miniräknare med TDD som stöder addition, subtraktion, multiplikation och division (inklusive division med noll).
3. Skriv tester för en metod som tar en lista med heltal och returnerar den med alla dubletter borttagna — implementera sedan metoden.
