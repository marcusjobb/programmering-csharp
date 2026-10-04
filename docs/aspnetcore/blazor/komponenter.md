---
title: Komponenter
description: "Livscykel, parametrar mellan komponenter, och egen CSS per komponent — byggstenarna för att sätta ihop en Blazor-app av mer än en sida."
parent: Blazor
nav_order: 40
---

# Komponentens livscykel

```csharp
protected override void OnInitialized()
{
    // Körs när komponenten skapas — ladda data här
    // Motsvarar Form_Load i Windows Forms, se gui/windows-forms/events.md
}

protected override void OnAfterRender(bool firstRender)
{
    if (firstRender)
    {
        // Körs efter att HTML:en renderades för första gången
    }
}
```

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

Den här CSS-isoleringen är unik för Blazor jämfört med vanlig webbutveckling — ingen risk att en klass i en komponent råkar krocka med en likanämnd klass någon annanstans i appen.
