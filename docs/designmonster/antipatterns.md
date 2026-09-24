---
title: Antipatterns
description: "Ett antipattern är motsatsen till ett designmönster — en lösning som är vanlig, kanske till och med \"fungerar\", men som i praktiken skapar fler problem än…"
parent: Designmönster
nav_order: 40
---

# Antipatterns

Ett antipattern är motsatsen till ett designmönster — en lösning som är vanlig, kanske till och med "fungerar", men som i praktiken skapar fler problem än den löser. Se [Anti-pattern i ordlistan](../ordlista/Programmering.md).

## Katten och fönstret — en illustration

Det finns en klassisk anekdot om ett kontor där fönstren ständigt stod öppna och drog in kyla på vintern. Lösningen som växte fram: en katt satte sig vid fönstret när det var kallt, och människor som gick förbi öppnade och stängde fönstret åt katten efter behov. Det "fungerade" — kylan minskade. Men det var en hemsk lösning: katten visste om problemet, löste det indirekt, och alla i kontoret anpassade sig runt den utan att någonsin fråga *varför* fönstret behövde stängas manuellt varje gång. Ingen byggde faktiskt en fungerande stängningsmekanism.

Det är precis vad ett antipattern är — en lösning som "råkar funka" genom att alla anpassar sig runt ett underliggande problem, istället för att lösa det. Designmönster är motsatsen: strukturerade, namngivna, begripliga lösningar — inte "det bara funkar om vi gör så här".

## God Object (God Class)

En enda klass som vet och gör alldeles för mycket.

```csharp
public class App
{
    public void ConnectDb() { /* ... */ }
    public void SaveUser(User user) { /* ... */ }
    public void SendEmail(string to, string subject, string body) { /* ... */ }
    public void GenerateReport() { /* ... */ }
    public void CalculateTax(decimal amount) { /* ... */ }
    public void RenderHomepage() { /* ... */ }
}
```

En ändring i e-postleverantören rör samma klass som en ändring i skatteberäkningen. Sammanslagningskonflikter i git blir vanliga eftersom alla ändrar samma fil. Går inte att testa isolerat — vill du testa `CalculateTax` drar du med dig hela klassens övriga beroenden. Klassen växer och växer, ingen vågar röra den.

**Fix:** Bryt isär enligt Single Responsibility-principen (se [Interfaces](../oop/polymorfism/interfaces/index.md), [Repository](gof/../repository-dependency-inversion.md)) — en klass, ett ansvar.

## Spaghetti Code

Ingen tydlig struktur — allt anropar allt, inga lager.

- UI-kod anropar databasfunktioner direkt, utan lager emellan.
- Affärslogik ligger inbäddad i event-hanterare istället för i egna klasser.
- Globala variabler delas mellan helt orelaterade delar av applikationen.

Symptomet märks vid felsökning: en bugg i ett UI-element kräver att du förstår databaslogik, e-postutskick och rapportgenerering samtidigt, eftersom allt är hoptrasslat i samma kodväg.

**Fix:** Inför lager (UI → affärslogik → datalager) med tydliga gränser — se [Facade](gof/structural/facade.md) och [Repository](repository-dependency-inversion.md) för konkreta sätt att dra de gränserna.

## Copy-Paste Inheritance (Copy-Paste-programmering)

Att kopiera en klass och ändra kopian, istället för att faktiskt återanvända kod via arv eller komposition.

```csharp
// Kopierad och lätt ändrad — istället för återanvändning
public class EmailValidator { public bool Validera(string s) => s.Contains("@"); }
public class UsernameValidator { public bool Validera(string s) => s.Length > 3; }
// ... och nu finns samma struktur duplicerad fem gånger, med fem separata buggar att fixa
```

Hittar du en bugg i en av kopiorna måste du komma ihåg att fixa den i *alla* kopior — och det är precis det som glöms bort.

**Fix:** Extrahera ett gemensamt interface eller basklass, använd [komposition eller arv](../oop/compbeforeinherit.md) på riktigt istället för att duplicera.

## Golden Hammer

Redan täckt i detalj på [Generics-sidan](../datastrukturer/generics.md#vanliga-antipatterns) — att använda samma verktyg eller mönster på allt, oavsett om det passar. Värt att nämna här igen: det gäller inte bara generics. Att tvinga in Singleton, Factory eller Observer överallt "för att det är ett mönster" är samma antipattern, bara med ett annat verktyg i handen.

## Magic Numbers och Magic Strings

Hårdkodade värden utan förklaring, utspridda i koden:

```csharp
if (user.Role == 3) { /* ... */ }          // Vad är 3?
if (status == "PROC_CMPLT") { /* ... */ }  // Vad betyder detta?
```

Sex månader senare vet ingen — inte ens den som skrev det — vad `3` eller `"PROC_CMPLT"` faktiskt representerar.

**Fix:** Namnge värdet — en konstant eller ett [enum](../variabler/enum.md):

```csharp
if (user.Role == UserRole.Admin) { /* ... */ }
```

## Lava Flow

Död kod som ingen vågar ta bort, eftersom ingen längre vet om den faktiskt används eller varför den finns. Namnet kommer av att den "stelnat" som lava — svår att röra utan att riskera att något går sönder.

**Fix:** Testtäckning gör det säkert att ta bort — om testerna fortfarande är gröna efter borttagning, var koden faktiskt död. Se [Testa din kod](../testa-din-kod/index.md).

## TL;DR

Ett antipattern är en lösning som "fungerar" ytligt men bygger på att alla anpassar sig runt ett olöst problem, istället för att lösa det. De vanligaste: God Object (en klass gör allt), Spaghetti Code (inga lager), Copy-Paste Inheritance (duplicering istället för återanvändning), Golden Hammer (fel verktyg används på allt), Magic Numbers (oförklarade värden) och Lava Flow (död kod ingen vågar röra).
