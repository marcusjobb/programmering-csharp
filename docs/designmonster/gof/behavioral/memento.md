---
title: Memento
description: "Du vill kunna spara ett objekts tillstånd och återställa det senare (Ångra-funktionalitet) — men utan att exponera objektets interna fält publikt bara för…"
parent: "Beteendemönster (Behavioral)"
nav_order: 45
---

# Memento

## Problemet

Du vill kunna spara ett objekts tillstånd och återställa det senare (Ångra-funktionalitet) — men utan att exponera objektets interna fält publikt bara för att en annan klass ska kunna läsa och återställa dem. Det skulle bryta [inkapslingen](../../../oop/inkapsling.md).

## Lösningen

Tre roller: **Originator** (objektet vars tillstånd ska sparas), **Memento** (en oföränderlig ögonblicksbild), **Caretaker** (håller reda på ögonblicksbilderna, men läser aldrig deras innehåll).

```csharp
// Memento — en oföränderlig ögonblicksbild, bara Originator kan läsa dess innehåll
public class TextMemento
{
    public string Innehåll { get; }
    internal TextMemento(string innehåll) => Innehåll = innehåll;
}

// Originator — objektet vars tillstånd ska kunna sparas/återställas
public class TextEditor
{
    public string Text { get; private set; } = "";

    public void Skriv(string text) => Text += text;

    public TextMemento SparaTillstånd() => new(Text);

    public void ÅterställTillstånd(TextMemento memento) => Text = memento.Innehåll;
}

// Caretaker — håller historiken, men bryr sig aldrig om VAD som faktiskt sparats
public class HistorikHanterare
{
    private readonly Stack<TextMemento> _historik = new();

    public void SparaCheckpoint(TextEditor editor) => _historik.Push(editor.SparaTillstånd());

    public void Ångra(TextEditor editor)
    {
        if (_historik.Count > 0)
            editor.ÅterställTillstånd(_historik.Pop());
    }
}
```

```csharp
var editor = new TextEditor();
var historik = new HistorikHanterare();

editor.Skriv("Hej");
historik.SparaCheckpoint(editor);

editor.Skriv(" världen!");
Console.WriteLine(editor.Text);   // Hej världen!

historik.Ångra(editor);
Console.WriteLine(editor.Text);   // Hej — tillbaka till checkpointen
```

`HistorikHanterare` (Caretaker) lagrar `TextMemento`-objekt utan att någonsin läsa deras `Innehåll` direkt i sin egen logik — den bara skickar dem tillbaka till `TextEditor` (Originator), som är den enda som vet hur de ska tolkas.

## Släktskap med Command

[Command](command.md) och Memento kompletterar varandra ofta i praktiska Ångra-implementationer: Command kapslar in *vad* som gjordes och hur det görs om (`Undo()`), medan Memento kapslar in *tillståndet* som ska återställas. Ett enkelt Ångra kan klara sig med bara Command; ett Ångra som kräver att återställa komplext, sammansatt tillstånd lutar sig ofta på Memento.

## TL;DR

Memento sparar en ögonblicksbild av ett objekts tillstånd i ett separat, oföränderligt objekt — utan att bryta inkapslingen, eftersom bara originalobjektet vet hur innehållet ska tolkas. Grunden för Ångra/Gör om-funktionalitet.
