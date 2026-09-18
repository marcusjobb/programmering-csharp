---
title: HashSet
description: "HashSet i Datastrukturer — C# bok av Marcus Ackre Medina"
parent: Datastrukturer
nav_order: 50
---

# HashSet&lt;T&gt;

`HashSet<T>` lagrar element utan dubletter och utan garanterad ordning. `Contains`, `Add` och `Remove` kostar `O(1)` — oberoende av hur stor samlingen är.

## TL;DR

- Inga dubletter — `Add` ignorerar element som redan finns och returnerar `false`.
- Ingen ordning — iterationsordning är odefinierad.
- `Contains` är konstant tid, till skillnad från `List<T>` som är `O(n)`.
- Stöd för mängdoperationer: union, snitt, differens.

---

## Grundläggande användning

```csharp
var unikaFarger = new HashSet<string>();

bool tillagd1 = unikaFarger.Add("Röd");    // true
bool tillagd2 = unikaFarger.Add("Blå");    // true
bool tillagd3 = unikaFarger.Add("Röd");    // false — finns redan

Console.WriteLine(unikaFarger.Count); // 2

// Skapa från array — dubletter faller bort automatiskt
string[] arr = { "Röd", "Blå", "Grön", "Röd", "Blå", "Gul" };
var unika = new HashSet<string>(arr);
Console.WriteLine(unika.Count); // 4
```

---

## Vanliga metoder

```csharp
var tal = new HashSet<int> { 1, 2, 3, 4, 5 };

tal.Add(6);              // true — lades till
tal.Add(3);              // false — finns redan
tal.Contains(3);         // true  — O(1)
tal.Remove(5);           // true — borttaget
tal.Count;               // antal element

// Jämförelse
var annan = new HashSet<int> { 4, 3, 2, 1, 6 };
tal.SetEquals(annan);            // true — samma element, ordning spelar ingen roll

var delmangd = new HashSet<int> { 1, 2, 3 };
delmangd.IsSubsetOf(tal);        // true
tal.IsSupersetOf(delmangd);      // true
tal.Overlaps(new HashSet<int> { 3, 7, 8 }); // true — delar elementet 3
```

---

## Mängdoperationer

```csharp
var a = new HashSet<string> { "Anna", "Pelle", "Kalle" };
var b = new HashSet<string> { "Pelle", "Sara", "Johan" };

// Union — alla element från båda (inga dubletter)
var union = new HashSet<string>(a);
union.UnionWith(b); // { Anna, Pelle, Kalle, Sara, Johan }

// Snitt — bara vad som finns i båda
var snitt = new HashSet<string>(a);
snitt.IntersectWith(b); // { Pelle }

// Differens — vad som finns i a men inte b
var differens = new HashSet<string>(a);
differens.ExceptWith(b); // { Anna, Kalle }

// Symmetrisk differens — vad som finns i exakt ett av dem
var symDiff = new HashSet<string>(a);
symDiff.SymmetricExceptWith(b); // { Anna, Kalle, Sara, Johan }
```

Metoderna modifierar originalet. Skapa alltid en kopia (`new HashSet<T>(original)`) om du vill behålla ursprungssamlingen.

---

## Praktiska användningsfall

```csharp
// Ta bort dubletter från en lista
List<string> medDubletter = new List<string> { "Anna", "Pelle", "Anna", "Kalle", "Pelle" };
List<string> unika = new HashSet<string>(medDubletter).ToList();

// Snabb behörighetskontroll
var tillatnaAnvandare = new HashSet<string> { "admin", "moderator", "editor" };
if (tillatnaAnvandare.Contains(inloggadUser)) { /* ... */ }

// Spåra besökta noder i en graftraversering
var besokta = new HashSet<int>();
void DFS(GraphNode nod)
{
    if (!besokta.Add(nod.Id)) return; // Add returnerar false om den redan finns
    foreach (var granne in nod.Grannar)
        DFS(granne);
}
```

---

## HashSet vs List — när vilket?

| Egenskap          | HashSet&lt;T&gt;    | List&lt;T&gt;         |
|-------------------|---------------------|------------------------|
| Dubletter         | Tillåts inte        | Tillåts                |
| Ordning           | Ingen               | Bevaras                |
| Indexering        | Nej                 | Ja                     |
| Contains          | `O(1)`              | `O(n)`                 |
| Add               | `O(1)` amorterat    | `O(1)` amorterat       |
| Mängdoperationer  | Inbyggda            | Saknas                 |

Välj `HashSet<T>` när du behöver unikhet eller snabb uppslagning. Välj `List<T>` när ordning eller indexering spelar roll.

---

## Anpassad likhetslogik

Om du lagrar egna objekt måste du implementera `Equals` och `GetHashCode`, annars jämförs referenserna — inte innehållet.

```csharp
public class Person
{
    public string Namn { get; set; }
    public int Alder { get; set; }

    public override bool Equals(object? obj) =>
        obj is Person p && Namn == p.Namn && Alder == p.Alder;

    public override int GetHashCode() => HashCode.Combine(Namn, Alder);
}

var personer = new HashSet<Person>();
personer.Add(new Person { Namn = "Pelle", Alder = 25 });
personer.Add(new Person { Namn = "Pelle", Alder = 25 }); // ignoreras — lika
```

Case-insensitiv jämförelse för strängar:

```csharp
var mailar = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
mailar.Add("pelle@example.com");
mailar.Add("PELLE@EXAMPLE.COM"); // ignoreras
```

---

## Övningar

1. Ta bort dubletter från en lista med 10 namn och skriv ut hur många unika som finns kvar.
2. Givet två listor med behörigheter, hitta vilka behörigheter som är gemensamma.
3. Bygg en besöksräknare som skiljer på första besök och återkommande besök.
