---
title: Kontroller
description: "De vanligaste WinForms-kontrollerna för text, val, layout och bilder — och de properties alla kontroller delar."
parent: Windows Forms
nav_order: 10
---

# Vanliga kontroller — visa och mata in text

| Kontroll | Vad | Viktig property |
|----------|-----|-----------------|
| `Label` | Visar text, kan inte redigeras av användaren | `Text` |
| `TextBox` | Textfält för inmatning | `Text`, `Multiline` |
| `RichTextBox` | Textfält med formatering (fet, kursiv) | `Text`, `Rtf` |
| `MaskedTextBox` | Inmatning med format, t.ex. datum | `Mask` |

```csharp
lblStatus.Text = "Sparat!";
string namn = txtNamn.Text;
```

## Vanliga kontroller — knappar och val

| Kontroll | Vad | Viktig property |
|----------|-----|-----------------|
| `Button` | Klickbar knapp | `Text`, `Enabled` |
| `CheckBox` | Kryssruta — ja eller nej | `Checked` |
| `RadioButton` | Välj ett av flera alternativ | `Checked` |
| `ComboBox` | Rullgardinsmeny | `Items`, `SelectedItem` |
| `ListBox` | Lista med valbara alternativ | `Items`, `SelectedItem` |

```csharp
if (chkGodkänn.Checked)
    lblStatus.Text = "Godkänt!";

string valtLand = cboLand.SelectedItem?.ToString() ?? "";
```

## Vanliga kontroller — layout och bilder

| Kontroll | Vad |
|----------|-----|
| `Panel` | Osynlig container som grupperar kontroller |
| `GroupBox` | Container med synlig ram och titel |
| `PictureBox` | Visar en bild |
| `ProgressBar` | Visar en progress (0–100) |
| `TabControl` | Flikar med olika innehåll |

## Gemensamma properties

Alla kontroller delar dessa egenskaper:

| Property | Vad |
|----------|-----|
| `Name` | Kontrollens variabelnamn i koden |
| `Text` | Texten som visas |
| `Enabled` | `true`/`false` — aktiv eller nedtonad |
| `Visible` | `true`/`false` — synlig eller dold |
| `Size` | Bredd och höjd i pixlar |
| `Location` | Position (X, Y) på formuläret |
| `BackColor` / `ForeColor` | Bakgrunds- och textfärg |
| `Font` | Teckensnitt och storlek |

Sätt dem i Properties-panelen i designern, eller i kod:

```csharp
btnSpara.Enabled = false;
lblStatus.ForeColor = Color.DarkRed;
```
