---
title: Lathund
description: "Snabbreferens för databaser i C#: Entity Framework Core, ADO.NET med SQLite och MongoDB. Installation, connection strings, CRUD, transaktioner och seeding på ett ställe."
parent: C# bok
nav_order: 990
has_children: true
---
# Lathund

Här samlar vi det du behöver när du jobbar med databaser i C#. Varje sida har samma upplägg: installation, connection string, CRUD, transaktioner, seeding och terminologi.

| Sida | Vad den täcker |
|------|----------------|
| [Entity Framework Core](ef-core.md) | ORM: DbContext, LINQ, migrationer, relationer med Fluent API |
| [ADO.NET med SQLite](ado-sqlite.md) | Lägsta lagret: du skriver SQL och hanterar anslutningen själv |
| [MongoDB](mongodb.md) | Dokumentdatabas: Docker, Atlas, Compass, CRUD och transaktioner |

Om du vill förstå grunderna först finns de i [Entity Framework](../orm/index.md) och [SQL](../sql/index.md).

## Connection strings i JSON

Alla lathundar läser connection strings från `appsettings.json`. Lösenord hör inte hemma i filen. De ligger i user secrets eller i miljövariabler:

```json
{
  "ConnectionStrings": {
    "Sqlite": "Data Source=webshop.db",
    "SqlServer": "Server=localhost,1433;Database=Webshop;User Id=sa;Password=<lösenord>;TrustServerCertificate=True"
  }
}
```

Två understreck i en miljövariabel motsvarar ett nivåsteg i JSON: `ConnectionStrings__SqlServer`.
