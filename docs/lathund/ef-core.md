---
title: "Lathund: Entity Framework Core"
description: "Entity Framework Core i lathundsform: installation per databas, connection string, CRUD, transaktioner, migrationer, relationer med Fluent API och seeding."
parent: Lathund
nav_order: 111
---
# Lathund: Entity Framework Core

Den här sidan är en snabbreferens. Förklaringarna finns i [Entity Framework](../orm/index.md). Här hittar du kommandona och mönstren när du väl vet vad du letar efter.

Läs mer: [Entity Framework](../orm/index.md) och [Seeding](../orm/seeding.md).

## Skapa projektet

```bash
dotnet new console -n EfLathund
cd EfLathund
dotnet tool install --global dotnet-ef
```

## Installera paket per databas

Varje avsnitt har sina egna paket. Konfigurationspaketen behövs alltid.

### SQLite

```bash
dotnet add package Microsoft.Extensions.Configuration.Json
dotnet add package Microsoft.Extensions.Configuration.UserSecrets
dotnet add package Microsoft.Extensions.Configuration.EnvironmentVariables
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

### SQL Server

```bash
dotnet add package Microsoft.Extensions.Configuration.Json
dotnet add package Microsoft.Extensions.Configuration.UserSecrets
dotnet add package Microsoft.Extensions.Configuration.EnvironmentVariables
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

### MySQL

Paketet `Pomelo.EntityFrameworkCore.MySql` är ett community-paket för MySQL.

```bash
dotnet add package Microsoft.Extensions.Configuration.Json
dotnet add package Microsoft.Extensions.Configuration.UserSecrets
dotnet add package Microsoft.Extensions.Configuration.EnvironmentVariables
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Pomelo.EntityFrameworkCore.MySql
```

## Connection string

```json
{
  "ConnectionStrings": {
    "Sqlite": "Data Source=webshop.db",
    "SqlServer": "Server=localhost,1433;Database=Webshop;User Id=sa;Password=<lösenord>;TrustServerCertificate=True",
    "LocalDb": "Server=(localdb)\\MSSQLLocalDB;Database=Webshop;Trusted_Connection=True;TrustServerCertificate=True",
    "MySql": "Server=localhost;Port=3306;Database=webshop;User=root;Password=<lösenord>"
  }
}
```

Sätt **Copy to Output Directory** på `appsettings.json` till *Copy if newer*.

## Hemligheter

```bash
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:SqlServer" "Server=localhost,1433;Database=Webshop;User Id=sa;Password=<riktigt lösenord>;TrustServerCertificate=True"
```

Miljövariabler fungerar också. Två understreck betyder ett nivåsteg:

```bash
export ConnectionStrings__SqlServer="Server=localhost,1433;Database=Webshop;User Id=sa;Password=<lösenord>;TrustServerCertificate=True"
```

## Databasen

Välj den databas du använder. Varje alternativ har sin egen connection string, som du lägger i `appsettings.json`.

<details>
<summary>SQL Server med LocalDB (Windows och Visual Studio)</summary>

LocalDB följer med Visual Studio. Ingen installation behövs. Använd connection string `LocalDb`.

</details>

<details>
<summary>SQL Server i Docker</summary>

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<starkt lösenord>" -p 1433:1433 --name sql1 -d mcr.microsoft.com/mssql/server:2022-latest
```

Lösenordet måste vara minst 8 tecken och innehålla stora och små bokstäver, siffror och ett specialtecken.

</details>

<details>
<summary>MySQL i Docker</summary>

```bash
docker run --name mysql1 -e MYSQL_ROOT_PASSWORD=<lösenord> -p 3306:3306 -d mysql:8.4
```

</details>

<details>
<summary>SQLite (ingen server)</summary>

Ingen server behövs. Filen `webshop.db` skapas i projektmappen när du kör migrationerna.

</details>

## DbContext

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}

public class WebshopContext : DbContext
{
    public DbSet<Product> Products => Set<Product>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .AddUserSecrets<WebshopContext>(optional: true)
            .AddEnvironmentVariables()
            .Build();

        // Välj EN rad, beroende på databas:
        optionsBuilder.UseSqlite(config.GetConnectionString("Sqlite"));
        // optionsBuilder.UseSqlServer(config.GetConnectionString("SqlServer"));
        // optionsBuilder.UseMySql(config.GetConnectionString("MySql"), ServerVersion.AutoDetect(config.GetConnectionString("MySql")));
    }
}
```

Konstruktorn är tom med avsikt. Migrationsverktyget behöver kunna skapa kontexten utan argument.

## CRUD

```csharp
using var db = new WebshopContext();

// Create
db.Products.Add(new Product { Name = "Kaffe", Price = 49m });
db.SaveChanges();

// Read
var produkt = db.Products.Find(1);
var billiga = db.Products.Where(p => p.Price < 100).ToList();

// Update
var kaffe = db.Products.First(p => p.Name == "Kaffe");
kaffe.Price = 39m;
db.SaveChanges();

// Delete
db.Products.Remove(kaffe);
db.SaveChanges();
```

`First` kastar ett undantag om ingen rad finns. Använd `FirstOrDefault` när raden kanske saknas.

## Transaktioner

`SaveChanges()` körs redan i en transaktion, så alla ändringar i ett anrop lyckas eller misslyckas tillsammans. För flera anrop använder du en egen transaktion:

```csharp
using var db = new WebshopContext();
using var transaction = db.Database.BeginTransaction();
try
{
    db.Products.First(p => p.Name == "Kaffe").Price -= 5;
    db.Orders.Add(new Order { ProductId = 1 });
    db.SaveChanges();
    transaction.Commit();
}
catch
{
    transaction.Rollback();
    throw;
}
```

Mer om transaktioner finns i [SQL: transaktioner](../sql/transactions.md).

## Migrationer

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet ef migrations add LaggTillDescription
```

## Relationer med Fluent API

Det mesta kan du uttrycka direkt i klasserna med navigationsegenskaper:

```csharp
public class Order
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public List<Order> Orders { get; set; } = new();
}
```

För specialfall använder du Fluent API i `OnModelCreating`:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Order>()
        .HasOne(o => o.Product)
        .WithMany(p => p.Orders)
        .HasForeignKey(o => o.ProductId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<Product>()
        .Property(p => p.Name)
        .HasMaxLength(100)
        .IsRequired();
}
```

`DeleteBehavior.Restrict` hindrar att en produkt tas bort så länge det finns ordrar som pekar på den. Mer om relationer finns i [Relationer](../orm/relationships.md).

## Seeding

Fyll bara på om tabellen är tom. Då blir det inga dubbletter när programmet startar igen:

```csharp
public static class DbSeeder
{
    public static void Seed(WebshopContext db)
    {
        if (db.Products.Any())
        {
            return;
        }

        db.Products.AddRange(
            new Product { Name = "Kaffe", Price = 49m },
            new Product { Name = "Te", Price = 35m });
        db.SaveChanges();
    }
}
```

```csharp
using var db = new WebshopContext();
db.Database.Migrate();
DbSeeder.Seed(db);
```

EF Core har också `HasData` i `OnModelCreating`. Då blir startdatan en del av migrationen, och varje ändring kräver en ny migration. För allmän seeding rekommenderas `UseSeeding` och `UseAsyncSeeding`. Mer finns i [Seeding](../orm/seeding.md).

## Koppla på från IDE

- **Visual Studio:** *Visa* → *SQL Server Object Explorer*. Högerklicka på *SQL Server* → *Add SQL Server*. Ange `(localdb)\MSSQLLocalDB` eller `localhost,1433`.
- **Rider:** *View* → *Tool Windows* → *Database* → *+* → *Data Source*. Välj *SQL Server*, *MySQL* eller *SQLite*.
- **VS Code:** installera *SQL Server (mssql)* av Microsoft, *MySQL* av cweijan eller *SQLite* av alexcvzz.

## Hjälpmedel

| Verktyg | För |
|---------|-----|
| SQL Server Management Studio (SSMS) | SQL Server, Windows |
| MySQL Workbench | MySQL |
| phpMyAdmin i Docker | MySQL i webbläsaren |
| DB Browser for SQLite | SQLite |

## Terminologi

| Term | Betydelse |
|------|-----------|
| **DbContext** | Klassen som pratar med databasen |
| **DbSet&lt;T&gt;** | En tabell, uttryckt som en samling objekt |
| **Migration** | En fil som beskriver en ändring i databasstrukturen |
| **Change tracking** | EF Core håller reda på vilka objekt som lagts till, ändrats eller tagits bort |
| **LINQ** | Frågespråket i C# som EF Core översätter till SQL |
| **Scaffold** | Skapa modellklasser från en befintlig databas |
