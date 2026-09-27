---
title: SQLite
description: "SQLite är en filbaserad databas utan server — hela databasen bor i en enda .db-fil. Passar perfekt för lokal utveckling och mindre applikationer."
parent: SQL
nav_order: 2
---

# SQLite

## Vad är SQLite?

SQLite är en relationsdatabas utan server. Hela databasen lagras i en enda fil på disk — `shop.db`, `users.db`, vad du vill. Ingen installation, ingen serverprocess, ingen konfiguration.

```
shop.db  ← det är hela databasen
```

SQLite är troligen den mest använda databasen i världen. Firefox, Android och iOS använder den för lokal datalagring. Det är inte en leksaksdatabas — det är ett genomtänkt verktyg för rätt situationer.

---

## Rätt verktyg för rätt situation

**SQLite passar när:**
- En person eller app skriver åt gången
- Databasen ska följa med applikationen, inte ligga på en server
- Du utvecklar och testar — noll friktion

**SQLite passar inte när:**
- Tusentals användare skriver parallellt
- Databasen ska nås från flera servrar samtidigt

---

## Skapa en databas i C#

Installera paketet:

```bash
dotnet add package Microsoft.Data.Sqlite
```

Koppla upp:

```csharp
var connectionString = "Data Source=shop.db";
using var connection = new SqliteConnection(connectionString);
connection.Open();
// Filen shop.db skapas automatiskt om den inte finns
```

---

## Skapa en tabell

```csharp
var cmd = connection.CreateCommand();
cmd.CommandText = """
    CREATE TABLE IF NOT EXISTS böcker (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        titel      TEXT    NOT NULL,
        författare TEXT    NOT NULL,
        år         INTEGER
    );
""";
cmd.ExecuteNonQuery();
```

`IF NOT EXISTS` — kör om igen utan att krascha.  
`AUTOINCREMENT` — id räknas upp automatiskt.

---

## Lägg till data

```csharp
var insert = connection.CreateCommand();
insert.CommandText = """
    INSERT INTO böcker (titel, författare, år)
    VALUES ('Pragmatic Programmer', 'Hunt & Thomas', 1999);
""";
insert.ExecuteNonQuery();
```

---

## Läs data

```csharp
var select = connection.CreateCommand();
select.CommandText = "SELECT * FROM böcker";

using var reader = select.ExecuteReader();
while (reader.Read())
{
    Console.WriteLine($"{reader["id"]}: {reader["titel"]}");
}
```

`ExecuteReader()` — för SELECT som returnerar rader.  
`ExecuteNonQuery()` — för INSERT, UPDATE, DELETE, CREATE.

---

## DB Browser for SQLite

Öppna `.db`-filen visuellt med **DB Browser for SQLite** (sqlitebrowser.org). Perfekt för att se exakt vad din kod gör mot databasen utan att skriva SQL.

---

## Träna vidare

| Resurs | Vad |
|--------|-----|
| [SQLite officiell dokumentation](https://www.sqlite.org/docs.html) | Fullständig referens för SQLite |
| [W3Schools SQL Tutorial](https://www.w3schools.com/sql/) | SQL-syntax som fungerar i SQLite |
| [SQLZoo SELECT Basics](https://sqlzoo.net/wiki/SELECT_basics) | Interaktiv träning på SELECT — kör direkt i webbläsaren |
