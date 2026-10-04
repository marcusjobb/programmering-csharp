---
title: Events
description: "@onclick, @oninput och resten av Blazors event-attribut kör C#-metoder direkt när något händer i webbläsaren — ingen JavaScript inblandad."
parent: Blazor
nav_order: 20
---

# @onclick — klick kör en metod

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

`e.Value` är `object?` — därav `?.ToString()` och `?? ""` för att alltid landa på en giltig sträng, även om värdet skulle vara `null`.
