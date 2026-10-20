---
title: Factory Method
description: "Simple Factory samlar skapandet på ett ställe, men det stället måste fortfarande veta om alla konkreta klasser via sin switch. Factory Method flyttar…"
parent: "Skapande mönster (Creational)"
nav_order: 10
---

# Factory Method

## Problemet

Simple Factory samlar skapandet på ett ställe, men det stället måste fortfarande veta om *alla* konkreta klasser via sin `switch`. Factory Method flyttar istället beslutet till subklasser — varje subklass ansvarar för att skapa sin egen typ.

## Lösningen

```csharp
public abstract class DocumentCreator
{
    // Factory method — subklasser bestämmer VAD som skapas
    public abstract Document CreateDocument();

    // Gemensam logik som använder resultatet, oberoende av typ
    public void ExportDocument()
    {
        var doc = CreateDocument();
        doc.Open();
        doc.Save();
    }
}

public class TextDocumentCreator : DocumentCreator
{
    public override Document CreateDocument() => new TextDocument();
}

public class PdfDocumentCreator : DocumentCreator
{
    public override Document CreateDocument() => new PdfDocument();
}
```

```csharp
DocumentCreator creator = new PdfDocumentCreator();
creator.ExportDocument();   // Vet inte, och bryr sig inte om, att det blev en PdfDocument
```

Lägger du till en `WordDocumentCreator` senare ändrar du ingenting i `DocumentCreator` eller befintlig klientkod — bara en ny subklass.

## Skillnad mot Simple Factory

| | Simple Factory | Factory Method |
|---|---|---|
| Nya typer kräver | Ändring i factory-klassens `switch` | En ny subklass, ingen ändring av befintlig kod |
| Flexibilitet | Lägre | Högre — följer Open/Closed-principen |

## TL;DR

Factory Method flyttar objektskapandet till en abstrakt metod som subklasser överskuggar — ny typ betyder ny subklass, inte en ändrad `switch`.
