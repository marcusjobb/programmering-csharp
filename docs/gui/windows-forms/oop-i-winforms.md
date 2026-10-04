---
title: OOP i Windows Forms
description: "Alla dina klasser, Dictionary och List fungerar exakt likadant i WinForms som i konsolprogram — GUI:t är bara ett nytt skal runt samma C#."
parent: Windows Forms
nav_order: 40
---

# OOP fungerar direkt

Alla dina klasser, Dictionary och List fungerar exakt likadant i WinForms som i konsolprogram.

```csharp
public class Djur
{
    public string Namn { get; set; }
    public string Ljud { get; set; }
    public string GörLjud() => $"{Namn} säger: {Ljud}!";
}
```

```csharp
private Dictionary<string, Djur> djur;

private void Form1_Load(object sender, EventArgs e)
{
    djur = new Dictionary<string, Djur>
    {
        { "Hund", new Djur { Namn = "Hund", Ljud = "Voff" } },
        { "Katt", new Djur { Namn = "Katt", Ljud = "Mjau" } }
    };
}

private void btnHund_Click(object sender, EventArgs e)
{
    lblLjud.Text = djur["Hund"].GörLjud();
    this.BackColor = Color.LightYellow;
}
```

`Dictionary<string, Djur>` fylls i `Form1_Load` — se [Events](events.md) för formulärets livscykel — och läses av i en knapps `Click`-hanterare. Ingenting av det här är WinForms-specifikt: det är samma klass, samma dictionary, samma kunskap du redan har. Det enda nya är *var* koden anropas ifrån.

## Var används WinForms?

Mer än man tror. Interna system i banker, sjukvård och industri körs ofta på WinForms. Det är stabil, välbeprövad teknik och snabb att bygga med — du kan stöta på det som C#-utvecklare.
