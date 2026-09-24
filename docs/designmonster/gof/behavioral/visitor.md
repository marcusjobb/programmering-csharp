---
title: Visitor
description: "Du har en objektstruktur (filer och mappar, olika sorters element i ett dokument) och vill lägga till nya operationer på den (beräkna total storlek…"
parent: "Beteendemönster (Behavioral)"
nav_order: 80
---

# Visitor

## Problemet

Du har en objektstruktur (filer och mappar, olika sorters element i ett dokument) och vill lägga till nya operationer på den (beräkna total storlek, exportera till XML, validera) — utan att lägga till en ny metod i *varje* klass i strukturen varje gång du behöver en ny operation.

## Lösningen

```csharp
public interface IElement
{
    void Accept(IVisitor visitor);
}

public interface IVisitor
{
    void Visit(Fil fil);
    void Visit(Mapp mapp);
}

public class Fil : IElement
{
    public string Namn { get; }
    public int StorlekKb { get; }
    public Fil(string namn, int storlekKb) => (Namn, StorlekKb) = (namn, storlekKb);

    public void Accept(IVisitor visitor) => visitor.Visit(this);   // Vet bara att "besökas"
}

public class Mapp : IElement
{
    public string Namn { get; }
    public List<IElement> Innehåll { get; } = new();
    public Mapp(string namn) => Namn = namn;

    public void Accept(IVisitor visitor) => visitor.Visit(this);
}

// Den nya operationen lever HÄR — inte utspridd i Fil och Mapp
public class StorleksVisitor : IVisitor
{
    public int TotalStorlek { get; private set; }

    public void Visit(Fil fil) => TotalStorlek += fil.StorlekKb;

    public void Visit(Mapp mapp)
    {
        foreach (var element in mapp.Innehåll)
            element.Accept(this);   // Besök varje element i mappen rekursivt
    }
}
```

```csharp
var rot = new Mapp("Dokument");
rot.Innehåll.Add(new Fil("rapport.pdf", 500));
rot.Innehåll.Add(new Fil("bild.png", 1200));

var visitor = new StorleksVisitor();
rot.Accept(visitor);
Console.WriteLine(visitor.TotalStorlek);   // 1700
```

Vill du lägga till en ny operation — t.ex. räkna antal filer — skriver du en ny `IVisitor`-implementation. `Fil` och `Mapp` ändras aldrig.

## Avvägningen

Visitor gör det enkelt att lägga till nya **operationer** utan att röra `Fil`/`Mapp`, men priset är motsatsen: lägger du till en ny **elementtyp** (t.ex. `Genväg`) måste du uppdatera `IVisitor` och alla dess implementationer. Använd Visitor när elementstrukturen är stabil men operationerna växer — inte tvärtom.

## TL;DR

Visitor flyttar en operation som annars skulle sprids ut över flera klasser till en egen klass — nya operationer blir nya Visitor-klasser istället för nya metoder i varje elementklass. Bäst när strukturen är stabil men antalet operationer växer.
