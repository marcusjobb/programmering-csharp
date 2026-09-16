---
title: Inkapsling
layout: default
author: Campus Mölndal
author_github: CampusMolndalEducation
author_url: "https://github.com/CampusMolndalEducation"
school: Campus Mölndal
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Objektorienterad programmering (OOP)
nav_order: 30
---
# Inkapsling

En artikel som utforskar ämnet "Inkapsling" inom programmering med fokus på C#.

## När du läst detta ska du kunna

- Förstå och förklara vad inkapsling är och dess relevans inom programmering.
- Diskutera fördelar och begränsningar med inkapsling.
- Identifiera olika användningsområden där inkapsling kan tillämpas inom C#-programmering.
- Förstå och tolka ett kodexempel som använder inkapsling.
- Sammanfatta viktiga insikter och rekommendationer för vidare läsning om inkapsling i C#.

## Introduktion

Inkapsling är en viktig princip inom objektorienterad programmering som möjliggör att data och funktioner som hör samman hålls tillsammans inom en enhet, kallad en klass. Genom att använda inkapsling kan vi definiera vilka data som är tillgängliga utanför klassen och hur de kan manipuleras. Detta främjar moduläritet, återanvändbarhet och säkerhet i programkoden.

## Vad är inkapsling?

Inkapsling handlar om att kombinera data och metoder i en enhet som kallas en klass och kontrollera åtkomsten till dessa medlemmar från andra delar av programmet. Genom att använda åtkomstmodifierare, såsom `public`, `private` och `protected`, kan vi specificera vilka medlemmar som är tillgängliga utanför klassen och vilka som är begränsade till klassens interna användning. På så sätt kan vi uppnå informationshiding och skydda data från oavsiktlig manipulation.

## Fördelar med inkapsling

Inkapsling erbjuder flera fördelar inom C#-programmering:

- **Säkerhet**: Genom att använda inkapsling kan vi gömma interna implementationer och bara exponera de nödvändiga gränssnitten för andra delar av programmet. Detta skyddar våra data och förhindrar oönskad manipulation.
- **Moduläritet**: Inkapsling hjälper till att organisera och strukturera kod genom att gruppera relaterade data och funktioner i en klass. Detta gör det lättare att hantera och underhålla programkoden.
- **Återanvändbarhet**: Genom att definiera klasser med väldefinierade gränssnitt kan vi återanvända dem i olika delar av programmet eller i andra projekt. Detta sparar tid och minskar kodupprepning.
- **Kodunderhåll**: Inkapsling främjar bättre kodunderhåll genom att ge tydliga gränssnitt och gömma interna detaljer. Om vi behöver ändra implementationen inuti en klass behöver vi bara uppdatera den interna logiken utan att påverka andra delar av programmet.

## Begränsningar med inkapsling

Trots sina fördelar har inkapsling vissa begränsningar:

- **Överhead**: Att använda inkapsling kan medföra en viss prestandaförlust eftersom åtkomsten till data och metoder måste hanteras genom speciella funktioner, som getter och setter, istället för direkt åtkomst.
- **Komplexitet**: Om inkapslingen inte används på rätt sätt kan det leda till ökad komplexitet och förvirring i koden. Det är viktigt att ha en tydlig struktur och väldefinierade gränssnitt för att undvika oönskade bieffekter.

## Användningsområden för inkapsling

Inkapsling kan tillämpas i olika scenarier inom C#-programmering:

- **Dataklasser**: Genom att använda inkapsling kan vi definiera dataklasser som innehåller attribut och tillhörande metoder för att hantera dessa attribut. Exempelvis kan vi skapa en `Person`-klass med medlemmar som `Namn`, `Ålder` och `Adress`, samt metoder för att manipulera och hämta dessa data.
- **API-design**: När vi skapar offentliga API:er är det viktigt att använda inkapsling för att skydda interna implementationer och erbjuda tydliga och säkra gränssnitt för användare av API:et.
- **Arv och polymorfism**: Inkapsling används tillsammans med arv och polymorfism för att definiera klasser med olika beteenden och gränssnitt, samtidigt som implementationen göms för användare av klassen.

## Exempelkod - Inkapsling i en berättelse

Här presenteras ett kodexempel som illustrerar användningen av inkapsling i C# genom en berättelse. Anta att vi vill skapa en klass för att representera en bankkonto.

```csharp
public class BankAccount
{
    private decimal balance;

    public void Deposit(decimal amount)
    {
        balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount <= balance)
        {
            balance -= amount;
        }
        else
        {
            Console.WriteLine("Insufficient funds.");
        }
    }

    public decimal GetBalance()
    {
        return balance;
    }
}

// Användning av BankAccount-klassen
BankAccount account = new BankAccount();
account.Deposit(1000);
account.Withdraw(500);
decimal balance = account.GetBalance();
Console.WriteLine($"Saldo: {balance}");
```

### Output

```text
Saldo: 500
```

I detta exempel definierar vi en klass `BankAccount` med en privat medlem `balance` som representerar kontots saldo. Vi har också metoder för att göra insättningar, uttag och hämta saldo. Genom att använda inkapsling och göra `balance` privat kan vi kontrollera och skydda åtkomsten till saldot och säkerställa att insättningar och uttag hanteras på rätt sätt.

## Slutsats

Inkapsling är en viktig princip inom objektorienterad programmering, och det är särskilt relevant inom C#-programmering. Genom att använda inkapsling kan vi organisera och strukturera vår kod på ett effektivt sätt, skydda data och erbjuda tydliga gränssnitt för användare av våra klasser. Det är viktigt att förstå fördelarna och begränsningarna med inkapsling för att använda den på rätt sätt och undvika oönskade bieffekter.

## Moderna alternativ (C# 9–12)

Nedanstående visar moderna sätt att skriva samma sak. Den gamla stilen fungerar fortfarande — koden ovan är inte fel. Det här är tillägg, inte ersättningar.

---

### Instansiering

```csharp
// Klassisk (alltid giltigt)
BankAccount account = new BankAccount();

// Med var — typen härleds från höger sida
var account = new BankAccount();

// Target-typed new (C# 9) — typen härleds från vänster sida
BankAccount account = new();
```

> **✨ Modernast (C# 9+):** `BankAccount account = new();` — du slipper upprepa typnamnet när det redan framgår av deklarationen.

---

### Properties — init-only (C# 9)

```csharp
// Gammalt — set tillåter ändring när som helst
public string Owner { get; set; }

// Modernt — init tillåter bara sättning vid skapandet
public string Owner { get; init; }

// Med init kan du använda object initializer men inte ändra efteråt
BankAccount account = new() { Owner = "Marcus" };
account.Owner = "Anna";  // ❌ Kompileringsfel — init-only
```

> **✨ Modernt (C# 9+):** `init` ger dig fördelarna med `set` vid skapandet men skyddar värdet efter det — bra för oföränderliga dataklasser.

---

### Required members (C# 11)

```csharp
public class BankAccount
{
    required public string Owner { get; set; }  // Måste sättas vid skapandet
    private decimal balance;
    // ...
}

// Kompileringsfel om Owner saknas
BankAccount account = new();               // ❌ 'Owner' is required
BankAccount account = new() { Owner = "Marcus" };  // ✅
```

> **✨ Modernt (C# 11+):** `required` ersätter konstruktörskontroller för obligatoriska fält — kompilatorn fångar misstaget direkt.

---

### Object initializer med target-typed new

```csharp
// Gammalt
BankAccount account = new BankAccount { Owner = "Marcus" };

// Modernt (C# 9)
BankAccount account = new() { Owner = "Marcus" };
```

> **✨ Modernt (C# 9+):** Kortare och lättare att läsa, särskilt när typnamnet är långt.

---

### Records som dataklasser (C# 9)

När en klass bara håller data utan logik kan en `record` vara bättre:

```csharp
// Klass — kräver manuell equals, ToString, etc.
public class Transaktion
{
    public string Typ { get; set; }
    public decimal Belopp { get; set; }
}

// Record (C# 9) — immutable, ==, ToString() och with-uttryck gratis
public record Transaktion(string Typ, decimal Belopp);

// Användning
var t = new Transaktion("Insättning", 500);
Console.WriteLine(t);  // Transaktion { Typ = Insättning, Belopp = 500 }

// with skapar en kopia med ändrat värde
var t2 = t with { Belopp = 1000 };
```

> **✨ Modernt (C# 9+):** Använd `record` för rena dataklasser — du får automatisk jämförelse, utskrift och kopiering utan att skriva en rad extra kod.

---

## TL;DR

Inkapsling är en viktig princip inom C#-programmering som handlar om att kombinera data och metoder inom en klass och kontrollera åtkomsten till dem. Det främjar säkerhet, moduläritet, återanvändbarhet och kodunderhåll. Inkapsling kan tillämpas i dataklasser, API-design och användas tillsammans med arv och polymorfism.

## Obligatorisk dad-joke
Varför älskar programmerare att använda inkapsling?<br>För att de inte vill läcka sina privata medlemmar!
