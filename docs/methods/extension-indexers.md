---
title: Extension-indexerare
description: "Extension-indexerare i Metoder — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Metoder
nav_order: 75
---
# Extension-indexerare

Extension-metoder låter dig lägga till metoder på befintliga typer. Extension-indexerare gör samma sak för indexering med `[]`-syntaxen — du kan lägga till `list[^1]`-stöd eller anpassad indexering på typer du inte äger.

## När du läst detta ska du kunna

- Skriva en extension-indexerare med `extension`-blocket
- Använda `Index` och `Range` som indextyper
- Lägga till indexering på befintliga typer utan arv
- Förklara skillnaden mot vanliga extension-metoder

## Syntax

Extension-indexerare definieras med ett `extension`-block inuti en statisk klass:

```csharp
public static class ListExtensions
{
    public extension (List<string> list)
    {
        public string this[Index index] => list[index];
        public List<string> this[Range range] => list[range.GetOffsetAndLength(list.Count).Offset..];
    }
}
```

`extension (List<string> list)` deklarerar en utökning av `List<string>`. Inuti blocket definieras indexeraren precis som en vanlig indexerare.

## Grundexempel — Index och Range på List

```csharp
public static class CollectionExtensions
{
    public extension (List<string> list)
    {
        public string this[Index index] => list[index];

        public List<string> this[Range range]
        {
            get
            {
                var (offset, length) = range.GetOffsetAndLength(list.Count);
                return list.GetRange(offset, length);
            }
        }
    }
}
```

```csharp
var names = new List<string> { "Anna", "Björn", "Clara", "David", "Emma" };

Console.WriteLine(names[^1]);           // Emma
Console.WriteLine(names[^2]);           // David

var last3 = names[2..];
foreach (var name in last3)
    Console.WriteLine(name);
```

### Output

```
Emma
David
Clara
David
Emma
```

## Anpassad nyckeltyp

Du kan indexera med vilken typ som helst — inte bara `int`:

```csharp
public static class ConfigExtensions
{
    public extension (Dictionary<string, string> config)
    {
        public string this[string key, string fallback]
            => config.TryGetValue(key, out var value) ? value : fallback;
    }
}
```

```csharp
var config = new Dictionary<string, string>
{
    ["theme"] = "dark",
    ["language"] = "sv"
};

Console.WriteLine(config["theme", "light"]);       // dark
Console.WriteLine(config["fontsize", "14px"]);     // 14px (fallback)
```

### Output

```
dark
14px
```

## extension-blocket kan innehålla mer

Samma `extension`-block kan samla indexerare, properties och metoder:

```csharp
public static class QueueExtensions
{
    public extension (Queue<int> queue)
    {
        // Indexerare
        public int this[int index] => queue.ElementAt(index);

        // Property
        public bool IsEmpty => queue.Count == 0;

        // Metod
        public int[] ToSortedArray()
        {
            var arr = queue.ToArray();
            Array.Sort(arr);
            return arr;
        }
    }
}
```

```csharp
var q = new Queue<int>(new[] { 5, 2, 8, 1, 9 });

Console.WriteLine(q[0]);                            // 5 (första elementet)
Console.WriteLine(q.IsEmpty);                       // False

var sorted = q.ToSortedArray();
Console.WriteLine(string.Join(", ", sorted));       // 1, 2, 5, 8, 9
```

## Skillnad mot vanliga extension-metoder

| | Extension-metod | Extension-indexerare |
|--|-----------------|---------------------|
| Anropas med | `obj.Method(args)` | `obj[index]` |
| Definieras med | `this Typ param` | `extension`-block + `this[...]` |
| Kan ha getters/setters | Nej | Ja |

## TL;DR

```csharp
public static class StringListExtensions
{
    public extension (List<string> list)
    {
        // Stöd för negativa index och ranges direkt på List<string>
        public string this[Index index] => list[index];
    }
}

var fruits = new List<string> { "Äpple", "Banan", "Citron" };
Console.WriteLine(fruits[^1]);  // Citron
```

Extension-indexerare är ett naturligt komplement till extension-metoder när du vill ge en befintlig typ `[]`-syntax.
