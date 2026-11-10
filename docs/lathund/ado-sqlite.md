---
title: "Lathund: ADO.NET med SQLite"
description: "ADO.NET med SQLite i lathundsform: connection, command, parametrar, CRUD, transaktioner och seeding utan ORM."
parent: Lathund
nav_order: 20
---
# Lathund: ADO.NET med SQLite

ADO.NET är lägsta lagret. Du skriver SQL själv och hanterar anslutningen själv. EF Core gör samma saker bakom kulisserna, så det är bra att kunna det här först. Se även [SQLite i C#](../sql/sqlite-in-csharp.md).

## Skapa projektet

```bash
dotnet new console -n AdoLathund
cd AdoLathund
dotnet add package Microsoft.Data.Sqlite
dotnet add package Microsoft.Extensions.Configuration.Json
```

## Connection string

```json
{
  "ConnectionStrings": {
    "Sqlite": "Data Source=webshop.db"
  }
}
```

SQLite har inget lösenord, så det finns inget hemligt att gömma. Filen skapas första gången anslutningen öppnas.

```csharp
var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

var connectionString = config.GetConnectionString("Sqlite");
```

## Skapa tabellen

```csharp
using var connection = new SqliteConnection(connectionString);
connection.Open();

using var command = connection.CreateCommand();
command.CommandText = @"
    CREATE TABLE IF NOT EXISTS Products (
        Id    INTEGER PRIMARY KEY AUTOINCREMENT,
        Name  TEXT    NOT NULL,
        Price REAL    NOT NULL
    );";
command.ExecuteNonQuery();
```

`ExecuteNonQuery()` används för kommandon som inte returnerar rader: CREATE, INSERT, UPDATE och DELETE.

## CRUD

Mönstret är alltid detsamma: öppna anslutningen, skapa ett kommando, kör det och läs resultatet.

```csharp
// Create
using var insert = connection.CreateCommand();
insert.CommandText = "INSERT INTO Products (Name, Price) VALUES ($name, $price)";
insert.Parameters.AddWithValue("$name", "Kaffe");
insert.Parameters.AddWithValue("$price", 49);
int antal = insert.ExecuteNonQuery();

// Read
using var select = connection.CreateCommand();
select.CommandText = "SELECT Id, Name, Price FROM Products";
using var reader = select.ExecuteReader();
while (reader.Read())
{
    Console.WriteLine($"{reader.GetInt32(0)} {reader.GetString(1)} {reader.GetDouble(2)}");
}

// Update
using var update = connection.CreateCommand();
update.CommandText = "UPDATE Products SET Price = $price WHERE Name = $name";
update.Parameters.AddWithValue("$price", 39);
update.Parameters.AddWithValue("$name", "Kaffe");
update.ExecuteNonQuery();

// Delete
using var delete = connection.CreateCommand();
delete.CommandText = "DELETE FROM Products WHERE Name = $name";
delete.Parameters.AddWithValue("$name", "Kaffe");
delete.ExecuteNonQuery();
```

`reader.Read()` returnerar `false` när det inte finns fler rader, inte när något gått fel.

## Parametrar

Bygg aldrig SQL genom att klistra ihop strängar med värden från användaren. Då kan användaren skriva in egen SQL. Det kallas SQL-injektion. Parametrar skickar värdet separat, och det tolkas aldrig som SQL. Mer om det finns i [SQL-injektion](../sql/sql-injection.md).

```csharp
command.CommandText = "SELECT Id, Name, Price FROM Products WHERE Name = $name";
command.Parameters.AddWithValue("$name", inmatatNamn);
```

I SQLite börjar parametrar med `$`, `:` eller `@`. Parametern måste finnas i kommandot.

## Transaktioner

Flera ändringar som lyckas eller ångras tillsammans:

```csharp
using var connection = new SqliteConnection(connectionString);
connection.Open();

using var transaction = connection.BeginTransaction();
try
{
    using var command = connection.CreateCommand();
    command.Transaction = transaction;

    command.CommandText = "UPDATE Products SET Price = Price - 5 WHERE Name = 'Kaffe'";
    command.ExecuteNonQuery();

    command.CommandText = "INSERT INTO Orders (ProductName) VALUES ('Kaffe')";
    command.ExecuteNonQuery();

    transaction.Commit();
}
catch (SqliteException ex)
{
    transaction.Rollback();
    Console.WriteLine($"Ändringen ångrades: {ex.Message}");
}
```

Varje kommando i transaktionen måste få `Transaction` satt till den.

## Seeding

Kontrollera först om tabellen är tom. Skriv startdatan i en transaktion, så blir det antingen alla rader eller ingen:

```csharp
using var connection = new SqliteConnection(connectionString);
connection.Open();

using var check = connection.CreateCommand();
check.CommandText = "SELECT COUNT(*) FROM Products";
int antal = Convert.ToInt32(check.ExecuteScalar());

if (antal == 0)
{
    using var transaction = connection.BeginTransaction();
    using var insert = connection.CreateCommand();
    insert.Transaction = transaction;
    insert.CommandText = "INSERT INTO Products (Name, Price) VALUES ($name, $price)";

    insert.Parameters.AddWithValue("$name", "Kaffe");
    insert.Parameters.AddWithValue("$price", 49);
    insert.ExecuteNonQuery();

    insert.Parameters.Clear();
    insert.Parameters.AddWithValue("$name", "Te");
    insert.Parameters.AddWithValue("$price", 35);
    insert.ExecuteNonQuery();

    transaction.Commit();
}
```

## Hjälpmedel och IDE

| Verktyg | Hur du använder det |
|---------|---------------------|
| **DB Browser for SQLite** | Öppna `webshop.db`. Fliken *Browse Data* visar tabellerna. Ladda ner från sqlitebrowser.org. |
| **Rider** | *View* → *Tool Windows* → *Database* → *+* → *Data Source* → *SQLite*. |
| **VS Code** | Installera tillägget *SQLite* av alexcvzz. |
| **Visual Studio** | Inget inbyggt verktyg. Använd DB Browser for SQLite. |

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Connection** | Den öppna förbindelsen till databasen. Stäng den när du är klar |
| **Command** | En SQL-sats som ska köras |
| **Parameter** | Ett värde som skickas separat till en SQL-sats |
| **DataReader** | Läser rader ett i taget, framåt |
| **ExecuteNonQuery** | Kör en sats som inte returnerar rader |
| **Transaction** | Flera ändringar som lyckas eller ångras tillsammans |

## Tips och tricks

- Använd alltid parametrar.
- Glöm inte `using`. En öppen anslutning kan låsa filen för andra program.
- `ExecuteScalar()` returnerar ett enda värde, till exempel `SELECT COUNT(*)`.
- Radera `webshop.db` om du vill börja om från början.
