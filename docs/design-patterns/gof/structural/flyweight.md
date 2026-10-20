---
title: Flyweight
description: "Ett program som ritar en skog med 100 000 träd — skapar du ett fullständigt Tree-objekt per träd (namn, färg, textur, modelldata) slösas enorma mängder…"
parent: "Strukturmönster (Structural)"
nav_order: 60
---

# Flyweight

## Problemet

Ett program som ritar en skog med 100 000 träd — skapar du ett fullständigt `Tree`-objekt per träd (namn, färg, textur, modelldata) slösas enorma mängder minne på att lagra **identisk** data om och om igen. Bara positionen (x, y) skiljer sig faktiskt åt mellan träden.

## Lösningen

```csharp
// Flyweight — den delade, tunga datan (samma för alla ekar t.ex.)
public class TreeType
{
    private readonly string _namn, _färg, _textur;
    public TreeType(string namn, string färg, string textur)
        => (_namn, _färg, _textur) = (namn, färg, textur);

    public void Draw(int x, int y) =>
        Console.WriteLine($"Ritar {_namn} ({_färg}) vid ({x}, {y})");
}

// Factory som återanvänder befintliga TreeType-instanser
public static class TreeTypeFactory
{
    private static readonly Dictionary<string, TreeType> _cache = new();

    public static TreeType Get(string namn, string färg, string textur)
    {
        var key = $"{namn}-{färg}-{textur}";
        if (!_cache.ContainsKey(key))
            _cache[key] = new TreeType(namn, färg, textur);
        return _cache[key];
    }
}

// Det lilla, unika objektet — bara positionen
public class Tree
{
    private readonly int _x, _y;
    private readonly TreeType _type;   // Delad referens, inte en kopia

    public Tree(int x, int y, TreeType type) => (_x, _y, _type) = (x, y, type);
    public void Draw() => _type.Draw(_x, _y);
}
```

```csharp
var ekTyp = TreeTypeFactory.Get("Ek", "Grön", "Barktextur");

var träd = new List<Tree>();
for (int i = 0; i < 100_000; i++)
    träd.Add(new Tree(i, i * 2, ekTyp));   // Alla 100 000 delar SAMMA TreeType-instans
```

100 000 `Tree`-objekt, men bara **en** `TreeType`-instans i minnet — inte 100 000 kopior av namn, färg och textur.

## TL;DR

Flyweight delar den tunga, identiska delen av data mellan många objekt istället för att varje objekt lagrar sin egen kopia — relevant när du har väldigt många liknande objekt och minnesanvändning faktiskt är ett problem.
