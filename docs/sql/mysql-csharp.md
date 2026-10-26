---
title: "MySQL i C#"
description: "Från tom konsolapplikation till en MySQL-databas i C# med MySqlConnector: anslutning, CREATE TABLE, INSERT och SELECT steg för steg."
parent: "SQL"
nav_order: 63
---

# MySQL i C#

**Verktyg:** .NET 10, NuGet-paketet `MySqlConnector`, MySQL (t.ex. via Docker)

Hittills har vi pratat med SQLite — en fil på hårddisken. Nu ansluter vi till **MySQL**, en riktig databasserver. Principen är densamma: vi skickar SQL och läser svaret. Skillnaden är att vi ansluter via nätverket, vilket kräver en connection string med server, användare och lösenord.

> **Behöver du MySQL?** Enklaste sättet är via Docker. Se [MySQL med Docker](mysql-docker.md) för hur du startar en container med ett kommando.

---

## 1. Skapa projektet

Vi döper projektet till `MySQL_Live`.

**I terminalen:**

```bash
dotnet new console -n MySQL_Live
cd MySQL_Live
```

**I Visual Studio:**
*Create a new project* → **Console App** (C#) → döp projektet till `MySQL_Live` → **.NET 10** → *Create*.

**I Rider:**
*New Solution* → **Console Application** → döp projektet till `MySQL_Live` → **net10.0** → *Create*.

---

## 2. Lägg till NuGet-paketet

Vi använder **MySqlConnector** — en snabb och modern MySQL-driver för .NET.

**I terminalen:**

```bash
dotnet add package MySqlConnector
```

**I Visual Studio:**
Högerklicka på projektet → *Manage NuGet Packages...* → **Browse** → sök på `MySqlConnector` → *Install*.

**I Rider:**
Högerklicka på projektet → *Manage NuGet Packages* → sök på `MySqlConnector` → klicka på **+**.

---

## 3. Projektfilen

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="MySqlConnector" Version="2.3.7" />
  </ItemGroup>

</Project>
```

---

## 4. Connection string

En connection string berättar var databasen finns och vem vi är:

```csharp
string connString = "Server=localhost;Port=3306;User=root;Password=root;Database=produkter;";
```

| Del | Vad det betyder |
|-----|-----------------|
| `Server=localhost` | Databasservern körs på samma dator |
| `Port=3306` | MySQL:s standardport (kan utelämnas om du använder 3306) |
| `User=root` | MySQL-användarnamn |
| `Password=root` | Lösenord |
| `Database=produkter` | Vilken databas vi vill ansluta till |

---

## 5. Anslut till databasen

```csharp
using MySqlConnector;

string connString = "Server=localhost;User=root;Password=root;Database=produkter;";

using var conn = new MySqlConnection(connString);
conn.Open();

Console.WriteLine("Ansluten till MySQL!");
```

`using var` ser till att anslutningen stängs automatiskt när programmet är klart med den. Om lösenordet är fel eller servern inte svarar kastas ett `MySqlException`.

---

## 6. Skapa tabellen — CREATE TABLE

```csharp
string createSql = @"
    CREATE TABLE IF NOT EXISTS produkter (
        Id          INT AUTO_INCREMENT PRIMARY KEY,
        Namn        VARCHAR(200) NOT NULL,
        Pris        DECIMAL(10,2) NOT NULL,
        Lagersaldo  INT DEFAULT 0
    )";

using var createCmd = new MySqlCommand(createSql, conn);
createCmd.ExecuteNonQuery();

Console.WriteLine("Tabell skapad (eller fanns redan).");
```

`IF NOT EXISTS` gör att vi kan köra programmet flera gånger utan att få ett felmeddelande om tabellen redan finns.

`ExecuteNonQuery` kör SQL-kommandon som inte returnerar rader — CREATE TABLE, INSERT och UPDATE passar här.

---

## 7. Lägg till produkter — INSERT

```csharp
string insertSql = @"
    INSERT INTO produkter (Namn, Pris, Lagersaldo)
    VALUES (@namn, @pris, @lager)";

using var insertCmd = new MySqlCommand(insertSql, conn);

insertCmd.Parameters.AddWithValue("@namn",  "Tangentbord");
insertCmd.Parameters.AddWithValue("@pris",  649.00m);
insertCmd.Parameters.AddWithValue("@lager", 12);
insertCmd.ExecuteNonQuery();

insertCmd.Parameters.Clear();
insertCmd.Parameters.AddWithValue("@namn",  "Mus");
insertCmd.Parameters.AddWithValue("@pris",  299.00m);
insertCmd.Parameters.AddWithValue("@lager", 24);
insertCmd.ExecuteNonQuery();

insertCmd.Parameters.Clear();
insertCmd.Parameters.AddWithValue("@namn",  "Skärm");
insertCmd.Parameters.AddWithValue("@pris",  3499.00m);
insertCmd.Parameters.AddWithValue("@lager", 5);
insertCmd.ExecuteNonQuery();

Console.WriteLine("Tre produkter tillagda.");
```

`@namn`, `@pris` och `@lager` är parametrar — vi skriver aldrig in värden direkt i SQL-strängen. Det skyddar mot SQL injection och är alltid rätt sätt att göra det.

`Parameters.Clear()` rensar parametrarna så att vi kan återanvända samma `MySqlCommand` för nästa INSERT.

---

## 8. Läs produkterna — SELECT

```csharp
string selectSql = "SELECT Id, Namn, Pris, Lagersaldo FROM produkter ORDER BY Pris";

using var selectCmd = new MySqlCommand(selectSql, conn);
using var reader    = selectCmd.ExecuteReader();

Console.WriteLine();
Console.WriteLine($"{"Id",-5} {"Namn",-20} {"Pris",10}  {"Lager",6}");
Console.WriteLine(new string('─', 46));

while (reader.Read())
{
    int     id     = reader.GetInt32("Id");
    string  namn   = reader.GetString("Namn");
    decimal pris   = reader.GetDecimal("Pris");
    int     lager  = reader.GetInt32("Lagersaldo");

    Console.WriteLine($"{id,-5} {namn,-20} {pris,10:C}  {lager,6}");
}
```

`ExecuteReader` returnerar en `MySqlDataReader`. `reader.Read()` returnerar `true` för varje rad och `false` när det inte finns fler — perfekt för en `while`-loop.

Vi hämtar värden per kolumnnamn med `GetString`, `GetInt32` och `GetDecimal`. Det är tydligare och säkrare än att hämta på index.

**Output:**

```
Id    Namn                       Pris   Lager
──────────────────────────────────────────────
3     Skärm                 3 499,00 kr      5
1     Tangentbord             649,00 kr     12
2     Mus                     299,00 kr     24
```

---

## 9. Hela Program.cs

```csharp
using MySqlConnector;

string connString = "Server=localhost;User=root;Password=root;Database=produkter;";

using var conn = new MySqlConnection(connString);
conn.Open();
Console.WriteLine("Ansluten till MySQL!");

// CREATE TABLE
using var createCmd = new MySqlCommand(@"
    CREATE TABLE IF NOT EXISTS produkter (
        Id         INT AUTO_INCREMENT PRIMARY KEY,
        Namn       VARCHAR(200) NOT NULL,
        Pris       DECIMAL(10,2) NOT NULL,
        Lagersaldo INT DEFAULT 0
    )", conn);
createCmd.ExecuteNonQuery();
Console.WriteLine("Tabell klar.");

// INSERT
using var insertCmd = new MySqlCommand(
    "INSERT INTO produkter (Namn, Pris, Lagersaldo) VALUES (@namn, @pris, @lager)", conn);

var produkter = new[]
{
    ("Tangentbord", 649.00m, 12),
    ("Mus",         299.00m, 24),
    ("Skärm",      3499.00m,  5),
};

foreach (var (namn, pris, lager) in produkter)
{
    insertCmd.Parameters.Clear();
    insertCmd.Parameters.AddWithValue("@namn",  namn);
    insertCmd.Parameters.AddWithValue("@pris",  pris);
    insertCmd.Parameters.AddWithValue("@lager", lager);
    insertCmd.ExecuteNonQuery();
}
Console.WriteLine("Produkter tillagda.");

// SELECT
using var selectCmd = new MySqlCommand(
    "SELECT Id, Namn, Pris, Lagersaldo FROM produkter ORDER BY Pris DESC", conn);
using var reader = selectCmd.ExecuteReader();

Console.WriteLine();
Console.WriteLine($"{"Id",-5} {"Namn",-20} {"Pris",12}  {"Lager",6}");
Console.WriteLine(new string('─', 48));

while (reader.Read())
{
    Console.WriteLine(
        $"{reader.GetInt32("Id"),-5} " +
        $"{reader.GetString("Namn"),-20} " +
        $"{reader.GetDecimal("Pris"),12:C}  " +
        $"{reader.GetInt32("Lagersaldo"),6}");
}
```

> **Nästa steg:** i [MySQL-handler](mysql-handler.md) flyttar vi databaskoden till en egen klass, precis som vi gjorde med SQLite.
