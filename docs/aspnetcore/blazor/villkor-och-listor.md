---
title: Villkor och listor
description: "@if och @foreach fungerar precis som i vanlig C# — bara inbäddade direkt i HTML-markupen."
parent: Blazor
nav_order: 30
---

# @if — villkorlig rendering

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

Samma `List<T>` du kan — den visas nu i webbläsaren och uppdateras direkt. Kombinationen [`@bind`](databindning.md) + `@foreach` + [`@onclick`](events.md) är mönstret bakom nästan varje "lägg till i en lista"-formulär du bygger i Blazor.
