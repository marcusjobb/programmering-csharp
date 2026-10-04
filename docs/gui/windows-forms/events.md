---
title: Events
description: "I ett konsolprogram körs koden uppifrån och ned. I WinForms körs kod som svar på händelser — klick, textändringar, formulärets livscykel."
parent: Windows Forms
nav_order: 30
---

# Events — kod som körs vid händelser

I ett konsolprogram körs koden uppifrån och ned. I WinForms körs kod som svar på **händelser** — events.

```csharp
private void btnSpara_Click(object sender, EventArgs e)
{
    lblStatus.Text = "Sparat!";
}
```

Du skapar ett event-handler genom att dubbelklicka på en kontroll i designern. VS skapar metoden och kopplar den automatiskt.

## Form-events — formulärets livscykel

| Event | När körs det? |
|-------|---------------|
| `Load` | När formuläret öppnas — perfekt för att ladda data |
| `Shown` | Efter att formuläret visats för första gången |
| `Resize` | Varje gång fönstret ändrar storlek |
| `FormClosing` | Precis innan formuläret stängs — bra för att spara |
| `FormClosed` | Efter att formuläret stängts |

```csharp
private void Form1_Load(object sender, EventArgs e)
{
    // Körs när appen startar
    cboLand.Items.AddRange(new[] { "Sverige", "Norge", "Danmark" });
    cboLand.SelectedIndex = 0;
}

private void Form1_FormClosing(object sender, FormClosingEventArgs e)
{
    var svar = MessageBox.Show("Spara innan du stänger?", "Spara",
        MessageBoxButtons.YesNo);
    if (svar == DialogResult.Yes)
        Spara();
}
```

## Kontroll-events — vanligast

| Event | Kontroll | När |
|-------|----------|-----|
| `Click` | Button, Label, PictureBox | Klick |
| `TextChanged` | TextBox | Varje gång texten ändras |
| `CheckedChanged` | CheckBox, RadioButton | Kryssrutan ändras |
| `SelectedIndexChanged` | ComboBox, ListBox | Annat val görs |
| `KeyDown` / `KeyUp` | TextBox, Form | Tangent trycks/släpps |
| `MouseEnter` / `MouseLeave` | Alla | Musen rör sig in/ut |

```csharp
private void txtSök_TextChanged(object sender, EventArgs e)
{
    string sök = txtSök.Text.ToLower();
    lstResultat.Items.Clear();
    foreach (var namn in alleNamn)
        if (namn.ToLower().Contains(sök))
            lstResultat.Items.Add(namn);
}
```

Notera parallellen till webben: samma idé som `@onclick` och `TextChanged` i [Blazor](../../aspnetcore/blazor/events.md) — kod som körs som reaktion på en händelse, inte i en fast ordning uppifrån och ner.
