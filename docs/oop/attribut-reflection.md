---
title: Attribut och Reflection
description: "Du har redan använt attribut — [Required], [Key], [JsonPropertyName] — utan att nödvändigtvis veta hur de faktiskt får effekt. Den här sidan förklarar…"
parent: Objektorienterad programmering (OOP)
nav_order: 67
---

# Attribut och Reflection

Du har redan använt attribut — `[Required]`, `[Key]`, `[JsonPropertyName]` — utan att nödvändigtvis veta hur de faktiskt får effekt. Den här sidan förklarar mekaniken: attribut är bara metadata, och det är **reflection** som läser den metadatan vid körning och gör något med den.

## När du läst detta ska du kunna

- Använda ett inbyggt attribut och förklara vad det faktiskt gör
- Skriva ett eget attribut
- Läsa av ett attribut på en klass med reflection
- Förklara varför EF Core och System.Text.Json är beroende av det här

## Attribut du redan känner igen

```csharp
public class Kund
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Namn { get; set; } = "";

    [JsonPropertyName("email_address")]
    public string Email { get; set; } = "";
}
```

Ett attribut i sig gör ingenting. `[Required]` stoppar inte en ogiltig `Kund` från att skapas — koden `new Kund()` fungerar likadant med eller utan attributet. Det som faktiskt validerar, mappar till en databaskolumn, eller döper om ett JSON-fält är **en annan bit kod** (EF Core, valideringsramverket, JSON-serialiseraren) som läser attributet via reflection och agerar på det.

## Reflection — läsa en typ vid körning

Reflection är förmågan att inspektera din egen kods struktur (klasser, properties, attribut) medan programmet körs, istället för att bara skriva mot den vid kompilering.

```csharp
Type typ = typeof(Kund);

Console.WriteLine(typ.Name);   // "Kund"

foreach (var property in typ.GetProperties())
{
    Console.WriteLine(property.Name);
}
// Id
// Namn
// Email
```

`typeof(Kund)` ger dig ett `Type`-objekt — en beskrivning av klassen `Kund` själv, inte en instans av den. Har du redan en instans, ger `.GetType()` samma sak:

```csharp
Kund kund = new();
Type typ = kund.GetType();
```

## Läsa attribut med reflection

```csharp
var property = typeof(Kund).GetProperty("Namn");
var maxLength = property?.GetCustomAttribute<MaxLengthAttribute>();

if (maxLength is not null)
    Console.WriteLine($"Max längd: {maxLength.Length}");   // Max längd: 100
```

Det här är precis vad EF Core gör bakom kulisserna när den bygger databasschemat: går igenom varje property på `Kund`, läser attributen (`[Key]`, `[MaxLength]`), och översätter dem till kolumndefinitioner — utan att du någonsin skrivit SQL för hand.

## Skriv ditt eget attribut

```csharp
[AttributeUsage(AttributeTargets.Property)]
public class SvensktNamnAttribute : Attribute
{
    public string Namn { get; }
    public SvensktNamnAttribute(string namn) => Namn = namn;
}
```

```csharp
public class Kund
{
    [SvensktNamn("Kundnummer")]
    public int Id { get; set; }

    [SvensktNamn("Namn")]
    public string Namn { get; set; } = "";
}
```

```csharp
foreach (var property in typeof(Kund).GetProperties())
{
    var svensktNamn = property.GetCustomAttribute<SvensktNamnAttribute>();
    Console.WriteLine(svensktNamn?.Namn ?? property.Name);
}
// Kundnummer
// Namn
```

Ett riktigt användningsfall: generera formulärlabels eller exportrubriker på svenska utifrån klassens properties, utan att duplicera namnen någon annanstans i koden.

## Varför det här ligger under huven på så mycket

| Bibliotek | Använder reflection + attribut för |
|---|---|
| Entity Framework Core | Bygga databasschema från `[Key]`, `[MaxLength]` osv — se [Entity Framework](../entityframework/index.md) |
| System.Text.Json | Avgöra fältnamn (`[JsonPropertyName]`), vad som ska ignoreras (`[JsonIgnore]`) — se [Json](../filhantering/Json.md) |
| ASP.NET Core-validering | Köra `[Required]`, `[MaxLength]` osv automatiskt innan en action-metod ens anropas |

Utan reflection skulle varje sådant bibliotek behöva en helt egen konfigurationsfil per klass, istället för att bara läsa metadata direkt från klassen själv.

## Prestandanotis

Reflection är långsammare än direkt kod — att slå upp properties och attribut vid varje anrop kostar. Bibliotek som EF Core och System.Text.Json gör därför den dyra reflection-analysen **en gång** (t.ex. vid appstart) och cachar resultatet, snarare än att köra reflection om och om igen i en het loop. Skriver du egen kod som använder reflection tungt, tänk likadant.

## TL;DR

Attribut är metadata som i sig inte gör något — det är kod som läser attributen via reflection (`GetCustomAttribute`, `GetProperties`, `typeof`) som ger dem effekt. Det är exakt den mekaniken som gör att EF Core och System.Text.Json kan förstå dina klasser bara genom att titta på dem, utan att du skriver separat konfiguration.
