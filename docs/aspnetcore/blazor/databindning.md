---
title: Databindning
description: "@bind kopplar ett HTML-element till en C#-variabel — ändra ett håll och det andra hänger med automatiskt, i båda riktningarna."
parent: Blazor
nav_order: 10
---

# @bind — tvåvägsbindning

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

Samma `@bind` fungerar på `<select>` som på `<input>` — Blazor kopplar det valda `value`-attributet till variabeln, oavsett vilken typ av kontroll det är.
