---
title: Layout
description: "Dock och Anchor bestämmer hur kontroller fyller sin container och beter sig när fönstret ändrar storlek."
parent: Windows Forms
nav_order: 20
---

# Dock — fylla ut utrymmet

`Dock` bestämmer hur en kontroll fyller sin container. Istället för att ange en fast position låter du kontrollen "docka" mot en kant.

| Värde | Vad |
|-------|-----|
| `None` | Fast position (standard) |
| `Top` | Fyller kontainerns överkant |
| `Bottom` | Fyller underkanten |
| `Left` | Fyller vänsterkanten |
| `Right` | Fyller högerkanten |
| `Fill` | Fyller hela utrymmet |

```csharp
panelMeny.Dock = DockStyle.Left;
dataGridView1.Dock = DockStyle.Fill;
```

Vanligt mönster: en meny till vänster (`Left`) och ett innehållsområde som fyller resten (`Fill`). Sätts enkelt i Properties-panelen under **Dock**.

## Anchor — sträck när fönstret ändrar storlek

`Anchor` bestämmer vilka kanter en kontroll är "förankrad" vid. När fönstret ändrar storlek rör sig kontrollen eller sträcks ut beroende på förankringen.

- **Top + Left** (standard) — stannar i övre vänstra hörnet, ingen sträckning
- **Top + Right** — följer med höger kant när fönstret breddas
- **Bottom + Left** — följer med underkanten när fönstret höjs
- **Top + Bottom + Left + Right** — sträcker sig åt alla håll

Sätts i Properties-panelen under **Anchor** — klicka på pilarna i det lilla diagrammet.

`Dock` och `Anchor` löser besläktade men olika problem: `Dock` bestämmer var en kontroll sitter i förhållande till sin container just nu, `Anchor` bestämmer hur den *reagerar* när containerns storlek ändras senare. En docked kontroll behöver sällan en anchor-inställning — den fyller redan sin kant oavsett storlek.
