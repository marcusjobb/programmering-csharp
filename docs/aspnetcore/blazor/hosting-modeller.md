---
title: Hosting-modeller
description: "Blazor Server och Blazor WebAssembly löser samma jobb på olika sätt — samma komponentmodell, olika var koden faktiskt kör."
parent: Blazor
nav_order: 50
---

# Blazor Server vs WebAssembly

| | Server | WebAssembly |
|-|--------|-------------|
| Koden körs på | Servern | I webbläsaren |
| Kräver serveranslutning | Ja | Nej (kan köra offline) |
| Laddningstid | Snabb | Långsammare första gången |
| Börja med | Ja | — |

Börja alltid med Blazor Server — det är enklast att komma igång med.

## Var används Blazor?

Blazor växer snabbt och används för interna system, dashboards och webbappar där teamet redan kan C#. Det är ett realistiskt alternativ till React eller Angular — men med C# i stället för JavaScript.

I databaskursen kopplar vi C# mot en databas via [Entity Framework](../../entityframework/index.md). Samma princip fungerar i Blazor — du skriver vanlig C# och visar datan i komponenten.
