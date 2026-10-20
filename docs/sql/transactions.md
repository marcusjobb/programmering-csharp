---
title: Transaktioner och ACID
description: "Vad transaktioner är, varför de behövs och vad ACID-garantierna innebär — med kodexempel i C# och SQLite."
parent: SQL
nav_order: 5
---

# Transaktioner och ACID

## Problemet utan transaktioner

En banköverföring kräver två operationer — dra från konto A, lägg till på konto B. Vad händer om strömmen går ut exakt mellan de två?

Pengarna är dragna från A men aldrig insatta på B. Ingen av kontona stämmer, och ingenting indikerar att något gick fel.

Det är problemet som transaktioner löser.

---

## Vad är en transaktion?

En transaktion grupperar operationer till ett block. Antingen lyckas alla och ändringarna sparas — eller misslyckas någon och allt rullas tillbaka.

```
BEGIN
  dra 100 kr från konto A
  lägg 100 kr på konto B
COMMIT    ← allt lyckades, spara
```

Om något går fel:

```
ROLLBACK  ← ingenting sparas, databasen är oförändrad
```

---

## ACID — fyra garantier

SQLite (och alla seriösa databaser) är ACID-kompatibla.

### A — Atomicity

Allt eller ingenting. Om en operation misslyckas rullas hela transaktionen tillbaka.

### C — Consistency

Databasen förblir i ett giltigt tillstånd. Regler (NOT NULL, UNIQUE, FOREIGN KEY) bryts aldrig — om en regel bryts: automatisk rollback.

### I — Isolation

Transaktioner ser inte varandras halvfärdiga arbete. Medan du håller på ser andra transaktioner gamla värden.

### D — Durability

Committade ändringar överlever allt — strömavbrott, krasch, omstart. SQLite använder en journal-fil som säkerhetskopierar innan den skriver permanent.

---

## Transaktioner i C# med SQLite

```csharp
using var connection = new SqliteConnection("Data Source=shop.db");
connection.Open();

using var transaction = connection.BeginTransaction();
try
{
    var cmd1 = connection.CreateCommand();
    cmd1.CommandText = "UPDATE konton SET saldo = saldo - 100 WHERE id = 1";
    cmd1.ExecuteNonQuery();

    var cmd2 = connection.CreateCommand();
    cmd2.CommandText = "UPDATE konton SET saldo = saldo + 100 WHERE id = 2";
    cmd2.ExecuteNonQuery();

    transaction.Commit();   // båda lyckades — spara
}
catch
{
    transaction.Rollback(); // något gick fel — rulla tillbaka allt
}
```

---

## Sammanfattning

| Bokstav | Egenskap | Garanti |
|---------|----------|---------|
| A | Atomicity | Allt eller ingenting |
| C | Consistency | Regler bryts aldrig |
| I | Isolation | Transaktioner stör inte varandra |
| D | Durability | Committade data överlever krasch |

---

## Träna vidare

| Resurs | Vad |
|--------|-----|
| [W3Schools SQL Transactions](https://www.w3schools.com/sql/sql_ref_transactions.asp) | Transaktionssyntax — BEGIN, COMMIT, ROLLBACK |
| [SQLZoo Using NULL](https://sqlzoo.net/wiki/Using_Null) | Träna på data-integritet och NULL-hantering |
| [SQLite WAL-dokumentation](https://www.sqlite.org/wal.html) | Hur SQLite implementerar durability med Write-Ahead Logging |
