---
title: Abstract Factory
description: "Factory Method skapar en produkt. Ibland behöver du skapa flera produkter som måste höra ihop — t.ex. en knapp och en scrollbar som båda matchar samma…"
parent: "Skapande mönster (Creational)"
nav_order: 20
---

# Abstract Factory

## Problemet

Factory Method skapar **en** produkt. Ibland behöver du skapa flera produkter som **måste höra ihop** — t.ex. en knapp och en scrollbar som båda matchar samma UI-tema. Blandar du en mörk knapp med en ljus scrollbar får du ett trasigt gränssnitt.

## Lösningen

```csharp
public interface IButton { void Render(); }
public interface IScrollbar { void Render(); }

public interface IUIFactory
{
    IButton CreateButton();
    IScrollbar CreateScrollbar();
}

public class DarkThemeFactory : IUIFactory
{
    public IButton CreateButton() => new DarkButton();
    public IScrollbar CreateScrollbar() => new DarkScrollbar();
}

public class LightThemeFactory : IUIFactory
{
    public IButton CreateButton() => new LightButton();
    public IScrollbar CreateScrollbar() => new LightScrollbar();
}
```

```csharp
IUIFactory factory = darkModeAktiverat ? new DarkThemeFactory() : new LightThemeFactory();

var knapp = factory.CreateButton();
var scroll = factory.CreateScrollbar();
// Garanterat samma tema för båda — omöjligt att blanda dark button med light scrollbar
```

## Skillnad mot Factory Method

Factory Method ger dig **en** fabriksmetod för **en** produkttyp. Abstract Factory ger dig ett helt gränssnitt med flera skapandemetoder för en **familj** av produkter som ska fungera ihop.

## TL;DR

Abstract Factory garanterar att en grupp relaterade objekt (t.ex. hela UI-temat) skapas konsekvent tillsammans — byt hela familjen genom att byta en enda factory-instans.
