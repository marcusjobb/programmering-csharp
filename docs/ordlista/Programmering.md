---
title: Programmering
description: "Programmering i Ordlista — C#-boken av Marcus Ackre Medina"
parent: Ordlista
nav_order: 20
---
## Programmering

| Ord | Förklaring |
| --- | --- |
| Abstraktion | Att dölja komplexitet bakom ett enkelt gränssnitt — du behöver bara veta hur du använder något, inte hur det fungerar inuti. |
| Algorithm | En algoritm är lista av kommandon i steg för steg- beskrivning, för att lösa ett problem. |
| Anrop | Att köra koden i en metod genom att skriva dess namn följt av parenteser. |
| Anti-pattern | En lösning som ser ut att fungera, kanske till och med är vanlig, men som i praktiken skapar fler problem än den löser — t.ex. Golden Hammer. |
| Argument | Det konkreta värde du skickar in till en metod när du anropar den. |
| Arv | Att en klass ärver fält, properties och metoder från en annan klass. |
| Attribut | En variabel som tillhör ett objekt. |
| Console.ReadKey() | Läser in ett enda tangenttryck, utan att vänta på Enter. |
| Console.ReadLine() | Läser in en rad text som användaren skriver, tills Enter trycks. |
| Console.Write() | Skriver ut text utan att hoppa till en ny rad. |
| Console.WriteLine() | Skriver ut text och hoppar till en ny rad direkt efteråt. |
| Constraint (generisk begränsning) | Ett `where T : ...`-villkor som begränsar vilka typer som får användas som `T` i en generisk klass eller metod. |
| Copy-Paste Inheritance (Copy-Paste-programmering) | Ett anti-pattern: att kopiera en klass och ändra kopian istället för att återanvända kod via arv eller komposition — samma bugg måste då fixas i varje kopia. |
| Deklaration | Att berätta för C# att en variabel finns, och bestämma dess typ och namn. |
| Deserialisera | Att göra om en sträng till ett objekt. |
| Design pattern (designmönster) | En namngiven, återanvändbar lösning på ett återkommande designproblem — t.ex. Factory eller Strategy. Inte färdig kod, utan ett mönster du anpassar till ditt eget problem. |
| Fält | En privat variabel som lagrar data inuti ett objekt, normalt exponerad utåt via en property. |
| Generics | Att skriva en klass eller metod som fungerar typsäkert för valfri typ, med en platshållare (`T`) som bestäms när klassen/metoden används — t.ex. `List<T>`. |
| Get | En metod som returnerar en variabel. |
| Git Bash | Terminalen som följer med Git-installationen — fungerar likadant på Windows, Mac och Linux. |
| God Object (God Class) | Ett anti-pattern: en enda klass som vet och gör alldeles för mycket — databasanslutning, e-post, rapporter och affärslogik i samma klass. Svår att testa, ändra och samarbeta kring. |
| Golden Hammer | Ett anti-pattern: att använda samma verktyg eller mönster på allt, oavsett om det passar problemet — t.ex. göra en klass generisk "för säkerhets skull" trots att den bara någonsin används med en typ. |
| IDE | Integrated Development Environment — programmet du skriver, kör och felsöker kod i. |
| Identifierare | Det tekniska namnet på något du döper själv i koden — variabler, metoder, klasser. |
| Inkapsling | Att skydda ett objekts inre data genom att exponera den kontrollerat via properties och metoder, istället för direkt. |
| Initialisering | Att ge en variabel dess första värde. |
| Instansvariabel | En variabel som tillhör ett objekt. |
| Interface | En mall för en klass. |
| Klass | En mall för ett objekt. |
| Klassvariabel | En variabel som tillhör en klass. |
| Konstruktor | En metod som körs när ett objekt skapas. |
| Lava Flow | Ett anti-pattern: död kod som ingen vågar ta bort, eftersom ingen längre vet om den används eller varför den finns. |
| Magic Number / Magic String | Ett hårdkodat värde utan förklaring i koden, t.ex. `if (status == 3)` — ingen vet sex månader senare vad `3` betyder. Namnge värdet istället, t.ex. med ett enum. |
| Metod | En funktion som tillhör ett objekt. |
| Metodsignatur | Metodens kontrakt — returtyp, namn och parameterlista. |
| Modifierare | En modifierare är en modifierare som ändrar hur en variabel eller metod fungerar. |
| Namespace | En grupp av klasser. |
| Namespace alias | Att ge en namespace ett alias. |
| Namespace import | Att importera en namespace. |
| Namespace using | Att använda en namespace. |
| Namnkonvention (camelCase) | Namngivningsregeln för variabler och parametrar i C# — första ordet med liten bokstav, varje nytt ord med stor bokstav. |
| .NET SDK | Verktyget som kompilerar och kör din C#-kod under huven, oavsett vilken IDE du klickar i. |
| Objekt | En instans av en klass. |
| Parameter | En variabel som en metod tar emot som indata, deklarerad i metodsignaturen. |
| Polymorfism | Att olika objekt kan svara på samma anrop på olika sätt. |
| Property | En metod som sätter och returnerar en variabel. |
| Returtyp | Vad en metod skickar tillbaka till den som anropade den — eller `void` om ingenting. |
| Scope (räckvidd) | Var i koden en variabel finns och kan användas — t.ex. bara inom det block den deklarerades i. |
| Serialisera | Att göra om ett objekt till en sträng. |
| Set | En metod som sätter en variabel. |
| Spaghetti Code | Ett anti-pattern: kod utan tydlig struktur, där allt anropar allt och det inte finns några tydliga lager mellan UI, affärslogik och data. |
| Static | En modifierare som gör att en variabel tillhör klassen och inte objektet. |
| using static | Att använda en klass som namespace och dess statiska metoder. |
| Variabel | En namngiven lagringsplats i minnet för ett värde som kan ändras under körningen. |
