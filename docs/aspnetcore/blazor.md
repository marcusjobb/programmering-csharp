---
title: Blazor
description: "Bygg webbappar med C# istället för JavaScript. Blazor är Microsofts ramverk för interaktiva webbappar — samma C# du kan, fast i webbläsaren."
parent: ASP.net Core
nav_order: 20
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

---

## @bind — tvåvägsbindning

`@bind` kopplar ett HTML-element till en C#-variabel.

```razor
<input @bind="namn" />
<p>Hej @namn!</p>

@code {
    private string namn = "";
}
```

- Skriver du i fältet → variabeln uppdateras
- Variabeln ändras i koden → fältet uppdateras

`@bind` uppdaterar vid `onchange` — när du klickar ur fältet. Vill du ha live-uppdatering vid varje tangenttryckning:

```razor
<input @bind:event="oninput" @bind="sökord" />
```

---

## select med @bind

```razor
<select @bind="valtLand">
    <option value="">Välj land</option>
    <option value="SE">Sverige</option>
    <option value="NO">Norge</option>
    <option value="DK">Danmark</option>
</select>
<p>Du valde: @valtLand</p>

@code {
    private string valtLand = "";
}
```

---

## @onclick — klick kör en metod

```razor
<button @onclick="SägHej">Klicka</button>
<p>@meddelande</p>

@code {
    private string meddelande = "";

    private void SägHej()
    {
        meddelande = "Hej från Blazor!";
    }
}
```

Sidan uppdateras utan att laddas om. Blazor håller koll på vad som ändrats och uppdaterar bara den biten.

---

## Vanliga events

| Event | Element | När |
|-------|---------|-----|
| `@onclick` | button, div, span | Klick |
| `@oninput` | input, textarea | Varje tangenttryckning |
| `@onchange` | input, select | Fältet lämnas |
| `@onsubmit` | form | Formulär skickas |
| `@onkeydown` | input | Tangent trycks ned |
| `@onmouseover` | Valfritt | Musen förs över elementet |

`@oninput` ger dig texten live via `ChangeEventArgs`:

```razor
<input @oninput="Filtrera" placeholder="Sök..." />
<p>Du söker: @sökord</p>

@code {
    private string sökord = "";

    private void Filtrera(ChangeEventArgs e)
    {
        sökord = e.Value?.ToString() ?? "";
    }
}
```

---

## @if — villkorlig rendering

```razor
@if (inloggad)
{
    <p>Välkommen!</p>
}
else
{
    <p>Logga in för att fortsätta.</p>
}

@code {
    private bool inloggad = false;
}
```

---

## @foreach — visa en lista

```razor
<ul>
    @foreach (var sak in saker)
    {
        <li>@sak</li>
    }
</ul>

<input @bind="nySak" />
<button @onclick="LaggTill">Lägg till</button>

@code {
    private string nySak = "";
    private List<string> saker = new();

    private void LaggTill()
    {
        if (!string.IsNullOrWhiteSpace(nySak))
        {
            saker.Add(nySak);
            nySak = "";
        }
    }
}
```

Samma `List<T>` du kan — den visas nu i webbläsaren och uppdateras direkt.

---

## Komponentens livscykel

```csharp
protected override void OnInitialized()
{
    // Körs när komponenten skapas — ladda data här
    // Motsvarar Form_Load i WinForms
}

protected override void OnAfterRender(bool firstRender)
{
    if (firstRender)
    {
        // Körs efter att HTML:en renderades för första gången
    }
}
```

---

## Parametrar — skicka data till en komponent

Du kan skapa egna komponenter och skicka data till dem via parametrar:

```razor
<!-- Föräldrakomponent -->
<MittKort Titel="Hej" Färg="blue" />
```

```razor
<!-- MittKort.razor -->
<div style="color: @Färg">
    <h2>@Titel</h2>
</div>

@code {
    [Parameter] public string Titel { get; set; } = "";
    [Parameter] public string Färg { get; set; } = "black";
}
```

---

## Styling

CSS skrivs i `wwwroot/app.css` och gäller hela appen.

Varje komponent kan ha sin **egen** CSS-fil som bara gäller den komponenten: skapa `MittKort.razor.css` bredvid `MittKort.razor`.

```css
/* MittKort.razor.css */
div {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
}
```

---

## Blazor Server vs WebAssembly

| | Server | WebAssembly |
|-|--------|-------------|
| Koden körs på | Servern | I webbläsaren |
| Kräver serveranslutning | Ja | Nej (kan köra offline) |
| Laddningstid | Snabb | Långsammare första gången |
| Börja med | Ja | — |

Börja alltid med Blazor Server — det är enklast att komma igång med.

---

## Var används Blazor?

Blazor växer snabbt och används för interna system, dashboards och webbappar där teamet redan kan C#. Det är ett realistiskt alternativ till React eller Angular — men med C# i stället för JavaScript.

I databaskursen kopplar vi C# mot en databas via Entity Framework. Samma princip fungerar i Blazor — du skriver vanlig C# och visar datan i komponenten.
