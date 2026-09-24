---
title: Composite
description: "Du har en trädstruktur — precis som ett filsystem, där en mapp kan innehålla både filer och andra mappar. Du vill kunna behandla en enskild fil och en hel…"
parent: "Strukturmönster (Structural)"
nav_order: 30
---

# Composite

## Problemet

Du har en trädstruktur — precis som ett filsystem, där en mapp kan innehålla både filer och andra mappar. Du vill kunna behandla en enskild fil och en hel mapp med undermappar på **exakt samma sätt**, utan att koden behöver skilja på dem.

## Lösningen

```csharp
public interface IGraphic
{
    void Draw();
}

// Leaf — ett enskilt objekt, inga barn
public class Circle : IGraphic
{
    public void Draw() => Console.WriteLine("Ritar en cirkel");
}

// Composite — kan innehålla andra IGraphic, inklusive andra Composite
public class GraphicGroup : IGraphic
{
    private readonly List<IGraphic> _children = new();

    public void Add(IGraphic child) => _children.Add(child);

    public void Draw()
    {
        foreach (var child in _children)
            child.Draw();   // Fungerar likadant oavsett om child är en Circle eller en hel grupp
    }
}
```

```csharp
var grupp = new GraphicGroup();
grupp.Add(new Circle());
grupp.Add(new Circle());

var undergrupp = new GraphicGroup();
undergrupp.Add(new Circle());
grupp.Add(undergrupp);   // En grupp inuti en grupp — fungerar utan specialfall

grupp.Draw();   // Ritar alla fyra cirklarna, oavsett nästlingsdjup
```

Anroparen skriver `grupp.Draw()` en gång — den bryr sig aldrig om huruvida `grupp` innehåller enstaka objekt eller djupt nästlade undergrupper.

## TL;DR

Composite låter enskilda objekt och sammansättningar av objekt implementera samma interface, så att kod som använder dem aldrig behöver skilja på "ett objekt" och "en hel gren av trädet".
