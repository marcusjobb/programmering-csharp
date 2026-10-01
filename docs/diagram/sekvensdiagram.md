---
title: Sekvensdiagram
description: "Ett sekvensdiagram visar vem som pratar med vem, i vilken ordning — ett anrop i taget, uppifrån och ner. Perfekt när du vill förstå eller förklara ett flöde mellan objekt eller tjänster."
parent: Diagram
nav_order: 30
---
# Sekvensdiagram

Ett sekvensdiagram visar **vem som pratar med vem, i vilken ordning**. Tiden går uppifrån och ner, och varje pil är ett anrop eller ett svar. Där klassdiagrammet visar hur koden *ser ut*, visar sekvensdiagrammet hur den *beter sig* när något händer.

## När du läst detta ska du kunna

- Känna igen och namnge delarna i ett sekvensdiagram
- Skilja på anrop och svar
- Rita ett flöde där ett villkor styr vad som händer (`alt`)
- Översätta ett sekvensdiagram till metodanrop i C#

## Vad används det till?

- **Förstå befintlig kod** — vem anropar vem när användaren klickar "Köp"?
- **Planera ett nytt flöde** innan du kodar — inloggning, betalning, API-anrop
- **Förklara för andra** — i en kodgranskning eller dokumentation av ett API
- **Hitta problem** — onödigt många anrop, eller ett objekt som gör för mycket

## Delarna och vad de heter

<svg class="dg" viewBox="0 0 720 360" role="img" aria-labelledby="sq1-t" xmlns="http://www.w3.org/2000/svg">
<title id="sq1-t">Sekvensdiagram med namngivna delar: deltagare, livslinje, aktiveringsstapel, synkront anrop, svar, självanrop, kombinerat fragment och villkor</title>
<defs>
<marker id="sq1-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
<marker id="sq1-o" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10" class="line strong"/></marker>
</defs>
<rect class="box" x="15" y="20" width="110" height="40" rx="4"/><text x="70" y="45" text-anchor="middle" class="title">Kund</text>
<rect class="box" x="195" y="20" width="110" height="40" rx="4"/><text x="250" y="45" text-anchor="middle" class="title">Kassa</text>
<rect class="box" x="375" y="20" width="110" height="40" rx="4"/><text x="430" y="45" text-anchor="middle" class="title">Lager</text>
<line class="line dash" x1="70" y1="60" x2="70" y2="320"/>
<line class="line dash" x1="250" y1="60" x2="250" y2="320"/>
<line class="line dash" x1="430" y1="60" x2="430" y2="320"/>
<rect class="hl" x="243" y="90" width="14" height="210"/>
<rect class="hl" x="423" y="130" width="14" height="50"/>
<line class="line strong" x1="70" y1="100" x2="243" y2="100" marker-end="url(#sq1-f)"/><text x="156" y="93" text-anchor="middle">1: köp(vara)</text>
<line class="line strong" x1="257" y1="140" x2="423" y2="140" marker-end="url(#sq1-f)"/><text x="340" y="133" text-anchor="middle">2: finnsILager(vara)</text>
<line class="line dash" x1="423" y1="170" x2="257" y2="170" marker-end="url(#sq1-o)"/><text x="340" y="163" text-anchor="middle">true</text>
<path class="line strong" d="M257 200H295V225H257" marker-end="url(#sq1-f)"/><text x="302" y="217">3: beräknaPris()</text>
<rect class="line" x="30" y="245" width="250" height="65"/>
<path class="box" d="M30 245H75V257L67 265H30Z"/><text x="38" y="260" class="muted">alt</text>
<text x="85" y="261" class="muted">[betalning godkänd]</text>
<line class="line dash" x1="243" y1="290" x2="70" y2="290" marker-end="url(#sq1-o)"/><text x="156" y="283" text-anchor="middle">kvitto</text>
<line class="leader" x1="488" y1="40" x2="532" y2="40"/><text x="538" y="44" class="part">Deltagare</text>
<line class="leader" x1="434" y1="85" x2="532" y2="85"/><text x="538" y="89" class="part">Livslinje</text>
<line class="leader" x1="400" y1="140" x2="532" y2="118"/><text x="538" y="122" class="part">Synkront anrop</text>
<line class="leader" x1="439" y1="155" x2="532" y2="155"/><text x="538" y="159" class="part">Aktiveringsstapel</text>
<line class="leader" x1="380" y1="170" x2="532" y2="192"/><text x="538" y="196" class="part">Svar (retur)</text>
<line class="leader" x1="422" y1="214" x2="532" y2="228"/><text x="538" y="232" class="part">Självanrop</text>
<line class="leader" x1="280" y1="268" x2="532" y2="265"/><text x="538" y="269" class="part">Kombinerat fragment</text>
<line class="leader" x1="100" y1="266" x2="100" y2="334"/><text x="106" y="348" class="part">Villkor (guard)</text>
</svg>

| Del | Hur den ritas | Vad den betyder |
|-----|---------------|-----------------|
| **Deltagare** (participant) | Ruta högst upp | Ett objekt, en klass, en tjänst eller en person som deltar |
| **Livslinje** (lifeline) | Streckad lodrät linje | Deltagarens "tidslinje" — tiden går nedåt |
| **Aktiveringsstapel** | Smal stapel på livslinjen | Deltagaren håller på att utföra något just nu |
| **Synkront anrop** | Heldragen pil, fylld spets | "Gör det här — jag väntar på svaret" (ett vanligt metodanrop) |
| **Asynkront anrop** | Heldragen pil, öppen spets | "Gör det här — jag väntar inte" (t.ex. ett meddelande på en kö) |
| **Svar** (return) | Streckad pil, öppen spets | Returvärdet som skickas tillbaka |
| **Självanrop** | Pil som går ut och tillbaka till samma livslinje | Objektet anropar en egen metod |
| **Kombinerat fragment** | Ram med etikett i hörnet | En del av flödet med särskild regel: `alt` (om/annars), `opt` (kanske), `loop` (upprepas) |
| **Villkor** (guard) | Text inom `[hakparenteser]` | Villkoret som måste vara sant för att fragmentet ska köras |

Siffrorna framför anropen (`1:`, `2:`, `3:`) är frivilliga, men gör det lättare att prata om diagrammet: "i steg 2 frågar kassan lagret…".

## Exempel — inloggning

En användare loggar in. `LoginController` frågar `AuthService`, som hämtar användaren från databasen. Stämmer lösenordet får användaren en token — annars ett felmeddelande. Ramen `alt` med en streckad skiljelinje är sekvensdiagrammets `if`/`else`.

<svg class="dg" viewBox="0 0 720 410" role="img" aria-labelledby="sq2-t" xmlns="http://www.w3.org/2000/svg">
<title id="sq2-t">Sekvensdiagram för inloggning: Användare, LoginController, AuthService och Databas, med alt-fragment för rätt och fel lösenord</title>
<defs>
<marker id="sq2-f" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10z" class="solid"/></marker>
<marker id="sq2-o" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 0L10 5L0 10" class="line strong"/></marker>
</defs>
<rect class="box" x="20" y="20" width="120" height="40" rx="4"/><text x="80" y="45" text-anchor="middle" class="title">Användare</text>
<rect class="box" x="190" y="20" width="150" height="40" rx="4"/><text x="265" y="45" text-anchor="middle" class="title">LoginController</text>
<rect class="box" x="385" y="20" width="130" height="40" rx="4"/><text x="450" y="45" text-anchor="middle" class="title">AuthService</text>
<rect class="box" x="570" y="20" width="120" height="40" rx="4"/><text x="630" y="45" text-anchor="middle" class="title">Databas</text>
<line class="line dash" x1="80" y1="60" x2="80" y2="400"/>
<line class="line dash" x1="265" y1="60" x2="265" y2="400"/>
<line class="line dash" x1="450" y1="60" x2="450" y2="400"/>
<line class="line dash" x1="630" y1="60" x2="630" y2="400"/>
<rect class="hl" x="258" y="85" width="14" height="305"/>
<rect class="hl" x="443" y="120" width="14" height="230"/>
<rect class="hl" x="623" y="150" width="14" height="40"/>
<line class="line strong" x1="80" y1="95" x2="258" y2="95" marker-end="url(#sq2-f)"/><text x="170" y="88" text-anchor="middle">logIn(namn, lösen)</text>
<line class="line strong" x1="272" y1="130" x2="443" y2="130" marker-end="url(#sq2-f)"/><text x="357" y="123" text-anchor="middle">validera(namn, lösen)</text>
<line class="line strong" x1="457" y1="160" x2="623" y2="160" marker-end="url(#sq2-f)"/><text x="540" y="153" text-anchor="middle">hämtaAnvändare(namn)</text>
<line class="line dash" x1="623" y1="185" x2="457" y2="185" marker-end="url(#sq2-o)"/><text x="540" y="178" text-anchor="middle">användare</text>
<path class="line strong" d="M457 210H495V232H457" marker-end="url(#sq2-f)"/><text x="502" y="225">jämförHash()</text>
<rect class="line" x="160" y="250" width="320" height="110"/>
<path class="box" d="M160 250H202V262L194 270H160Z"/><text x="168" y="265" class="muted">alt</text>
<text x="280" y="266" class="muted">[lösenord stämmer]</text>
<line class="line dash" x1="443" y1="292" x2="272" y2="292" marker-end="url(#sq2-o)"/><text x="357" y="287" text-anchor="middle">token</text>
<line class="line dash" x1="160" y1="305" x2="480" y2="305"/>
<text x="280" y="321" class="muted">[annars]</text>
<line class="line dash" x1="443" y1="340" x2="272" y2="340" marker-end="url(#sq2-o)"/><text x="357" y="335" text-anchor="middle">null</text>
<line class="line dash" x1="258" y1="385" x2="80" y2="385" marker-end="url(#sq2-o)"/><text x="170" y="378" text-anchor="middle">resultat</text>
</svg>

Samma flöde i C# — varje heldragen pil blir ett metodanrop, varje streckad pil ett `return`:

```csharp
public class LoginController
{
    private readonly AuthService _auth;

    public LoginController(AuthService auth) => _auth = auth;

    public string LogIn(string name, string password)
    {
        string? token = _auth.Validate(name, password);   // validera(namn, lösen)
        return token ?? "Fel användarnamn eller lösenord"; // resultat
    }
}

public class AuthService
{
    private readonly UserDatabase _db;

    public AuthService(UserDatabase db) => _db = db;

    public string? Validate(string name, string password)
    {
        User? user = _db.GetUser(name);                    // hämtaAnvändare(namn)

        if (user != null && CompareHash(user, password))   // jämförHash() + alt
        {
            return CreateToken(user);                       // [lösenord stämmer] → token
        }

        return null;                                        // [annars] → null
    }

    private bool CompareHash(User user, string password) { /* ... */ return true; }
    private string CreateToken(User user) { /* ... */ return "abc123"; }
}
```

## När ska du välja ett sekvensdiagram?

| Välj sekvensdiagram när… | Välj något annat när… |
|--------------------------|-----------------------|
| Ordningen mellan anrop är det viktiga | Du vill visa vilka klasser som finns → [klassdiagram](uml-klassdiagram.md) |
| Flera objekt eller tjänster samarbetar | Det är *ett* objekts logik med många beslut → [flödesschema](flodesscheman.md) |
| Du dokumenterar ett API-anrop eller en integration | Du vill visa vilka lägen något kan vara i → [tillståndsdiagram](tillstandsdiagram.md) |

## Vanliga misstag

- **För många deltagare.** Fler än 5–6 livslinjer blir oläsligt. Rita ett diagram per scenario istället.
- **Glömda svar.** Det är lätt att rita anropen men hoppa över returpilarna — då syns inte vad som skickas tillbaka.
- **Varje rad kod som en pil.** Rita de anrop som är intressanta för den som läser, inte varje `ToString()`.

## Övning

Rita ett sekvensdiagram för när en kund tar ut pengar i en bankomat: `Kund`, `Bankomat`, `Bank`. Kunden sätter in kortet och anger PIN, bankomaten frågar banken om PIN stämmer och om det finns täckning. Använd ett `alt`-fragment för "täckning finns" / "annars".

## TL;DR

| Begrepp | Vad det är |
|---------|-----------|
| Sekvensdiagram | Vem pratar med vem, i vilken ordning — tiden går nedåt |
| Heldragen pil | Anrop |
| Streckad pil | Svar |
| `alt` / `opt` / `loop` | Om/annars, kanske, upprepning |
