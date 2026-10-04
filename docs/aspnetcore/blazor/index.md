---
title: Blazor
description: "Bygg webbappar med C# istället för JavaScript. Blazor är Microsofts ramverk för interaktiva webbappar — samma C# du kan, fast i webbläsaren."
parent: ASP.net Core
nav_order: 20
has_children: True
---

# Blazor

Blazor är Microsofts ramverk för att bygga webbappar med C#. Normalt skriver man frontend-kod i JavaScript. Blazor låter dig skriva C# istället — hela vägen.

Det innebär att du som C#-utvecklare kan bygga kompletta webbappar utan att lära dig ett nytt programmeringsspråk.

---

## Projektstrukturen

```
MinBlazorApp/
├── Components/
│   ├── Pages/         ← En .razor-fil per sida
│   ├── Layout/        ← Meny, sidhuvud, sidfot
│   └── App.razor      ← Rot-komponenten
├── wwwroot/           ← CSS, bilder, statiska filer
└── Program.cs         ← Startar webbservern
```

Du arbetar nästan uteslutande i `Components/Pages/`.

---

## En .razor-komponent — uppbyggnad

Varje sida är en komponent. En `.razor`-fil har HTML överst och C# i ett `@code`-block.

```razor
@page "/minSida"
@rendermode InteractiveServer

<h1>Rubrik</h1>
<p>@meddelande</p>

@code {
    private string meddelande = "Hej!";
}
```

`@page` bestämmer URL:en. `@rendermode InteractiveServer` krävs för att knappar och inmatning ska fungera — utan det renderas sidan bara en gång och uppdateras inte.

---

## @page och routing

```razor
@page "/produkter"
```

Navigera till sidan via `/produkter` i webbläsaren.

Du kan ta emot parametrar från URL:en:

```razor
@page "/produkter/{id:int}"

@code {
    [Parameter]
    public int Id { get; set; }
}
```

---

## Vanliga HTML-element i Blazor

| Element | Vad |
|---------|-----|
| `<h1>` – `<h3>` | Rubriker |
| `<p>` | Stycke |
| `<input>` | Textfält, kryssruta, radioknapp |
| `<textarea>` | Stort textfält, flera rader |
| `<button>` | Klickbar knapp |
| `<select>` | Rullgardinsmeny |
| `<ul>` + `<li>` | Punktlista |
| `<table>` | Tabell med rader och kolumner |
| `<div>` | Osynlig container för layout |

Samma HTML-element som på alla webbsidor — men du styr dem med C# i stället för JavaScript.

## Nästa steg

- [Databindning](databindning.md) — koppla ett fält direkt till en variabel med `@bind`
- [Events](events.md) — kör C#-kod när användaren klickar, skriver eller väljer något
- [Villkor och listor](villkor-och-listor.md) — `@if` och `@foreach` i markupen
- [Komponenter](komponenter.md) — livscykel, parametrar och egen CSS
- [Hosting-modeller](hosting-modeller.md) — Blazor Server vs WebAssembly, och var Blazor faktiskt används
