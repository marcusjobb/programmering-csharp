---
title: Windows Forms
description: "Bygg skrivbordsprogram med knappar, fönster och textrutor i C#. Windows Forms är Microsofts ramverk för GUI-program med drag-and-drop-designer i Visual Studio."
parent: Grafiska gränssnitt (GUI)
nav_order: 10
has_children: True
---

# Windows Forms

Windows Forms (WinForms) är Microsofts ramverk för att bygga skrivbordsprogram med grafiskt gränssnitt. Det har funnits sedan 2002 och ingår i .NET — samma plattform du redan använder.

Du har lärt dig C# genom att skriva program som körs i terminalen. WinForms låter dig istället bygga program med knappar, textrutor, menyer och fönster — det som brukar kallas GUI (Graphical User Interface).

---

## Projektstrukturen

```
MittProgram/
├── Form1.cs           ← Din kod — den du redigerar
├── Form1.Designer.cs  ← Genererad kod från designern — rör ALDRIG
└── Program.cs         ← Startar appen
```

`Form1.Designer.cs` skrivs automatiskt av Visual Studio när du drar ut kontroller i designern. Om du redigerar den manuellt kan appen sluta fungera.

---

## Designern

Öppna designern med **Shift+F7** eller dubbelklick på `Form1.cs` och välj "View Designer".

Härifrån drar du ut komponenter från **Toolbox** och placerar dem visuellt på formuläret. Allt du ändrar i designern syns som en egenskap i **Properties-panelen** (F4) — och tvärtom.

---

## Visuella objekt vs kodobjekt

**Visuella objekt** syns i fönstret när appen körs: `Label`, `Button`, `TextBox`, `PictureBox`, `ListBox`.

**Kodobjekt** finns bara i koden och syns inte direkt i fönstret: `Timer`, `ImageList`, `ContextMenuStrip`, `ToolTip`. Båda sätts upp i designern, men kodobjekten visas i en separat yta längst ner i designern.

---

## Kontrollernas hierarki

```
Form (fönstret)
└── Panel (grupperar kontroller)
    ├── Label
    ├── TextBox
    └── Button
```

En `Form` är en container. Du kan lägga kontroller direkt på Form, eller i `Panel` och `GroupBox` för att hålla ordning. Varje kontroll är ett objekt — en `Button` är en instans av klassen `Button`.

## Nästa steg

- [Kontroller](kontroller.md) — de vanligaste komponenterna och deras viktigaste properties
- [Layout](layout.md) — `Dock` och `Anchor`, så gränssnittet håller ihop när fönstret ändrar storlek
- [Events](events.md) — kod som körs som svar på klick, textändringar och formulärets livscykel
- [OOP i Windows Forms](oop-i-winforms.md) — dina klasser, `List` och `Dictionary` fungerar exakt likadant här
