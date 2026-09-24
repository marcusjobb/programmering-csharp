---
title: Programstruktur
description: "Varje C#-program börjar med samma kod — men vad betyder den egentligen?"
parent: Grunder
nav_order: 10
---

# Programstruktur

Varje C#-program börjar med samma kod — men vad betyder den egentligen?

```csharp
namespace myProgram
{
    class Program
    {
        public static void Main()
        {
        }
    }
}
```

Här är tre delar som alltid är med, och det är värt att förstå vad var och en gör.

---

## namespace

```csharp
namespace myProgram
```

Ett namespace är en kategorisering — det bestämmer var i projektet dina klasser "bor".
Tänk på det som en mapp i filsystemet. Två klasser med samma namn kan samexistera om de
ligger i olika namespaces.

```csharp
namespace Invoicing
{
    class Customer { }
}

namespace Warehouse
{
    class Customer { }  // Ingen krock — de bor i olika namespaces
}
```

I små projekt spelar namespace-namnet sällan någon roll. I större projekt håller det ordning
på vad som hör ihop.

### Undermappar blir namespaces

I .NET följer namespaces mappstrukturen automatiskt. Varje undermapp lägger till ett
lager till projektets grundnamespace:

```
MyProject/
├── Utils/          →  namespace MyProject.Utils
├── Helpers/        →  namespace MyProject.Helpers
│   └── Strings/    →  namespace MyProject.Helpers.Strings
└── Models/         →  namespace MyProject.Models
```

En klass i `Utils/`-mappen deklarerar sig själv så här:

```csharp
namespace MyProject.Utils
{
    class DataParser { }
}
```

Punkten är en separator — `MyProject.Utils` läses som "Utils-delen av MyProject".

### Vanliga namespaces du kommer att se

Det finns inga hårda regler för namngivning, men vissa mönster är så vanliga att de
i praktiken är standard:

| Namespace | Innehåller vanligtvis |
|-----------|----------------------|
| `Helpers` | Hjälpklasser för återkommande uppgifter |
| `Extensions` | Extension methods (mer om det i OOP-kapitlet) |
| `Models` | Dataklasser som representerar information |
| `POCOs` | Plain Old C# Objects — enkla dataklasser utan logik |
| `Services` | Klasser som hanterar affärslogik |
| `Repositories` | Klasser som pratar med databasen |

I ASP.NET-projekt ser du dessutom:

| Namespace | Innehåller vanligtvis |
|-----------|----------------------|
| `Controllers` | Klasser som tar emot HTTP-förfrågningar |
| `Views` | Mallar för vad användaren ser |
| `Data` | Databaskontext och konfiguration |

Det ser ut som mycket — och det är det — men du lär dig dem ett i taget allteftersom
du behöver dem. Varje avsnitt i den här boken tar upp sina egna namespaces när de
blir relevanta.

---

## class Program

```csharp
class Program
```

`Program` är en helt vanlig klass — precis som alla andra klasser du kommer att skriva.
Det speciella är inte klassen i sig, utan vad som finns inuti den.

Klassen kan heta vad som helst. `Program` är bara en konvention.

---

## static void Main()

```csharp
public static void Main()
```

Det här är startpunkten för programmet. När du kör din app är det den här metoden som körs
först — inget annat.

| Del | Vad det gör |
|-----|-------------|
| `public` | Metoden är synlig utifrån (körtidsmiljön behöver hitta den) |
| `static` | Metoden tillhör klassen, inte en instans — den kan anropas utan att skapa ett objekt |
| `void` | Returnerar ingenting |
| `Main()` | Exakt det här namnet känner körtidsmiljön igen som startpunkt |

Det får bara finnas **en** `Main`-metod i hela projektet. Om du har flera vet inte
körtidsmiljön var den ska börja, och du får ett kompileringsfel.

---

## Varför är Main static?

Eftersom `Main` är startpunkten måste den kunna anropas utan att du först skapar ett
objekt — det finns ju inget som kan skapa ett objekt innan programmet startat.
`static` löser det: metoden finns direkt på klassen, inte på en instans.

---

## Modern C# — utan ramverket

Från C# 9 kan du skriva ett program utan namespace, class och Main. Körtidsmiljön förstår
ändå vad du menar:

```csharp
Console.WriteLine("Hej!");
```

Det kallas *top-level statements* och fungerar utmärkt för enkla program och skripta.
Ramverket med namespace och class finns fortfarande kvar i bakgrunden — det är bara dolt.

I yrkeslivet ser du båda varianterna, men för allt utom de allra minsta projekten är
den explicita strukturen tydligare.
