---
title: "appsettings.json och connection strings"
description: "Hur du strukturerar connection strings för SQLite, MySQL, SQL Server och MongoDB i appsettings.json och läser dem i C#."
parent: "SQL"
nav_order: 57
---

# appsettings.json och connection strings

Istället för att hårdkoda connection strings i koden lägger du dem i `appsettings.json`.

---

## Struktur för alla databaser

```json
{
  "ConnectionStrings": {
    "SQLite": "Data Source=app.db",

    "MySQL": "Server=localhost;Port=3306;Database=myapp;User=appuser;Password=apppassword;",

    "LocalDB": "Server=(localdb)\\MSSQLLocalDB;Database=MyApp;Integrated Security=true;",

    "SQLServer": "Server=localhost,1433;Database=MyApp;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=true;",

    "MongoDB": "mongodb://admin:adminpassword@localhost:27017"
  },

  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.EntityFrameworkCore": "Warning"
    }
  }
}
```

---

## Läsa i C# (konsolapp)

```csharp
using Microsoft.Extensions.Configuration;

var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();

string connectionString = config.GetConnectionString("SQLite")!;
```

NuGet-paket som krävs:

```bash
dotnet add package Microsoft.Extensions.Configuration
dotnet add package Microsoft.Extensions.Configuration.Json
```

---

## Med Dependency Injection (ASP.NET Core)

```csharp
// Program.cs
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SQLite")));
```

I ASP.NET Core-projekt är `IConfiguration` redan tillgängligt via DI — du behöver inte lägga till paket manuellt.
