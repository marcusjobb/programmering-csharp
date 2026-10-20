---
title: "Skapande mönster (Creational)"
description: "Skapande mönster löser samma grundfråga på fem olika sätt: hur skapar vi objekt utan att låsa fast koden vid exakt vilken klass som skapas?"
parent: GoF-mönster
nav_order: 10
has_children: true
---

# Skapande mönster (Creational)

Skapande mönster löser samma grundfråga på fem olika sätt: **hur skapar vi objekt utan att låsa fast koden vid exakt vilken klass som skapas?**

## Innan GoF — Simple Factory

Innan vi går in på de fem GoF-mönstren, ett besläktat men enklare knep som ofta förväxlas med dem: **Simple Factory**. Det är inte ett av de 23 GoF-mönstren, men det är den naturliga första stationen dit.

```csharp
public static class DocumentFactory
{
    public static IDocument Create(string typ) => typ switch
    {
        "text" => new TextDocument(),
        "pdf"  => new PdfDocument(),
        _      => throw new ArgumentException($"Okänd typ: {typ}")
    };
}
```

En enda statisk metod med en `switch`, som samlar allt `new`-skapande på ett ställe. Enkelt — men varje ny dokumenttyp kräver att du ändrar `DocumentFactory` själv. De fem mönstren nedan löser det på mer sofistikerade sätt.
