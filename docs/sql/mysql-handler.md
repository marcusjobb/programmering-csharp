---
title: "MySQL med DbHandler"
description: "Flytta MySQL-koden till en separat klass och håll Program.cs ren — samma projekt som förut, bättre struktur."
parent: "SQL"
nav_order: 64
---

# MySQL med DbHandler

**Verktyg:** .NET 10, NuGet-paketet `MySqlConnector`, MySQL (t.ex. via Docker)

I [MySQL i C#](mysql-csharp.md) lade vi all kod direkt i `Program.cs`. Det fungerar för enkla program, men när antalet frågor växer blir filen rörig. Lösningen är att flytta all databaskod till en **separat klass** — en `DbHandler`.

Principen är densamma som för [SQLite med DbHandler](sqlite-handler.md): `Program.cs` vet ingenting om hur SQL fungerar. Den ber `DbHandler` om data och litar på att det funkar.

---

## 1. Projektstruktur

Vi utgår från samma projekt (`MySQL_Live`) och lägger till en fil:

```
MySQL_Live/
├── MySQL_Live.csproj
├── Program.cs        ← bara menyer och logik
└── DbHandler.cs      ← all databaskod
```

---

## 2. DbHandler.cs — skelettet

```csharp
using MySqlConnector;

public class DbHandler
{
    private readonly string _connString;

    public DbHandler(string connString)
    {
        _connString = connString;
    }

    private MySqlConnection GetConnection()
    {
        var conn = new MySqlConnection(_connString);
        conn.Open();
        return conn;
    }
}
```

Connection string sparas i konstruktorn. `GetConnection()` är en hjälpmetod som öppnar en ny anslutning — varje publik metod använder den.

---

## 3. Skapa tabellen — CreateTable

```csharp
public void CreateTable()
{
    using var conn = GetConnection();
    using var cmd  = new MySqlCommand(@"
        CREATE TABLE IF NOT EXISTS produkter (
            Id         INT AUTO_INCREMENT PRIMARY KEY,
            Namn       VARCHAR(200) NOT NULL,
            Pris       DECIMAL(10,2) NOT NULL,
            Lagersaldo INT DEFAULT 0
        )", conn);
    cmd.ExecuteNonQuery();
}
```

`CreateTable` skapar tabellen om den inte finns. `IF NOT EXISTS` gör att vi kan anropa den varje gång programmet startar utan att det kraschar.

---

## 4. Lägg till en produkt — AddProduct

```csharp
public void AddProduct(string namn, decimal pris, int lagersaldo)
{
    using var conn = GetConnection();
    using var cmd  = new MySqlCommand(
        "INSERT INTO produkter (Namn, Pris, Lagersaldo) VALUES (@namn, @pris, @lager)",
        conn);

    cmd.Parameters.AddWithValue("@namn",  namn);
    cmd.Parameters.AddWithValue("@pris",  pris);
    cmd.Parameters.AddWithValue("@lager", lagersaldo);
    cmd.ExecuteNonQuery();
}
```

Parametrar (`@namn`, `@pris`, `@lager`) skyddar mot SQL injection. Värden skrivs aldrig direkt in i SQL-strängen.

---

## 5. Hämta alla produkter — GetProducts

```csharp
public List<(int Id, string Namn, decimal Pris, int Lager)> GetProducts()
{
    var result = new List<(int, string, decimal, int)>();

    using var conn = GetConnection();
    using var cmd  = new MySqlCommand(
        "SELECT Id, Namn, Pris, Lagersaldo FROM produkter ORDER BY Pris DESC",
        conn);
    using var reader = cmd.ExecuteReader();

    while (reader.Read())
    {
        result.Add((
            reader.GetInt32("Id"),
            reader.GetString("Namn"),
            reader.GetDecimal("Pris"),
            reader.GetInt32("Lagersaldo")
        ));
    }

    return result;
}
```

Metoden returnerar en lista med tupler. `Program.cs` slipper veta vad `MySqlDataReader` är — det är ett implementationsdetalj som stannar i `DbHandler`.

---

## 6. Hela DbHandler.cs

```csharp
using MySqlConnector;

public class DbHandler
{
    private readonly string _connString;

    public DbHandler(string connString)
    {
        _connString = connString;
    }

    private MySqlConnection GetConnection()
    {
        var conn = new MySqlConnection(_connString);
        conn.Open();
        return conn;
    }

    public void CreateTable()
    {
        using var conn = GetConnection();
        using var cmd  = new MySqlCommand(@"
            CREATE TABLE IF NOT EXISTS produkter (
                Id         INT AUTO_INCREMENT PRIMARY KEY,
                Namn       VARCHAR(200) NOT NULL,
                Pris       DECIMAL(10,2) NOT NULL,
                Lagersaldo INT DEFAULT 0
            )", conn);
        cmd.ExecuteNonQuery();
    }

    public void AddProduct(string namn, decimal pris, int lagersaldo)
    {
        using var conn = GetConnection();
        using var cmd  = new MySqlCommand(
            "INSERT INTO produkter (Namn, Pris, Lagersaldo) VALUES (@namn, @pris, @lager)",
            conn);
        cmd.Parameters.AddWithValue("@namn",  namn);
        cmd.Parameters.AddWithValue("@pris",  pris);
        cmd.Parameters.AddWithValue("@lager", lagersaldo);
        cmd.ExecuteNonQuery();
    }

    public List<(int Id, string Namn, decimal Pris, int Lager)> GetProducts()
    {
        var result = new List<(int, string, decimal, int)>();

        using var conn = GetConnection();
        using var cmd  = new MySqlCommand(
            "SELECT Id, Namn, Pris, Lagersaldo FROM produkter ORDER BY Pris DESC",
            conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            result.Add((
                reader.GetInt32("Id"),
                reader.GetString("Namn"),
                reader.GetDecimal("Pris"),
                reader.GetInt32("Lagersaldo")
            ));
        }

        return result;
    }
}
```

---

## 7. Program.cs — ren och tydlig

```csharp
var db = new DbHandler("Server=localhost;User=root;Password=root;Database=produkter;");

db.CreateTable();

db.AddProduct("Tangentbord", 649.00m, 12);
db.AddProduct("Mus",         299.00m, 24);
db.AddProduct("Skärm",      3499.00m,  5);

Console.WriteLine($"{"Id",-5} {"Namn",-20} {"Pris",12}  {"Lager",6}");
Console.WriteLine(new string('─', 48));

foreach (var (id, namn, pris, lager) in db.GetProducts())
{
    Console.WriteLine($"{id,-5} {namn,-20} {pris,12:C}  {lager,6}");
}
```

`Program.cs` vet nu inte ens att det finns en MySQL-databas bakom — det är exakt den separation vi vill ha.

---

## Varför en DbHandler?

| Utan klass | Med klass |
|------------|-----------|
| All SQL blandas med menylogiken | SQL är isolerat i en fil |
| Svårt att återanvända en fråga | Anropa metoden från flera ställen |
| Program.cs är 200+ rader | Program.cs är 20 rader |
| Svårt att byta databas | Byt bara `DbHandler` |

Det här är **separation of concerns** i praktiken — varje fil har ett ansvar.

> **Nästa projekt:** i [DBMarketplace](../../CLO26/) bygger vi vidare på samma mönster med flera tabeller, transaktioner och MySQL-roller.
