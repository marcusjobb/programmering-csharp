---
title: "Lathund: MongoDB"
description: "MongoDB i C# i lathundsform: Docker, Atlas, Compass, connection string i JSON, CRUD, transaktioner med replica set och seeding."
parent: Lathund
nav_order: 30
---
# Lathund: MongoDB

MongoDB är en dokumentdatabas. Du lagrar objekt som dokument i en collection, och du behöver ingen tabellstruktur i förväg.

## Välj hur du kör MongoDB

| Alternativ | När du väljer det | Connection string |
|------------|-------------------|-------------------|
| **Docker** | Du vill ha en databas på din egen dator | `mongodb://localhost:27017` |
| **MongoDB Atlas** | Du vill nå databasen från flera datorer, eller slippa installera något | `mongodb+srv://...` från Atlas |

## Skapa projektet

```bash
dotnet new console -n MongoLathund
cd MongoLathund
dotnet add package MongoDB.Driver
```

Läs konfigurationen på samma sätt som i de andra lathundarna:

```bash
dotnet add package Microsoft.Extensions.Configuration.Json
dotnet add package Microsoft.Extensions.Configuration.UserSecrets
dotnet add package Microsoft.Extensions.Configuration.EnvironmentVariables
```

```json
{
  "ConnectionStrings": {
    "MongoLocal": "mongodb://localhost:27017",
    "MongoAtlas": "mongodb+srv://<användarnamn>:<lösenord>@<kluster>.mongodb.net/?retryWrites=true&w=majority"
  }
}
```

Lägg det riktiga Atlas-lösenordet i user secrets:

```bash
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:MongoAtlas" "mongodb+srv://<användarnamn>:<riktigt lösenord>@<kluster>.mongodb.net/?retryWrites=true&w=majority"
```

```csharp
var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .AddUserSecrets<Program>(optional: true)
    .AddEnvironmentVariables()
    .Build();

var connectionString = config.GetConnectionString("MongoLocal");

var client = new MongoClient(connectionString);
var database = client.GetDatabase("webshop");
var products = database.GetCollection<Product>("products");
```

## Docker

```bash
docker run --name mongo1 -p 27017:27017 -v mongo-data:/data/db -d mongo
```

Volymen `mongo-data` gör att datan finns kvar om du tar bort containern.

## Atlas

1. Skapa ett konto på mongodb.com/cloud/atlas. Gratisnivån (M0) räcker.
2. Skapa ett kluster: *Build a Database* → *M0 Free*.
3. Under *Security* → *Database Access*: skapa en databasanvändare med eget lösenord. Det är inte ditt kontolösenord. Spara det direkt.
4. Under *Security* → *Network Access*: lägg till din egen IP-adress med *Add Current IP Address*.
5. Klicka på *Connect* → *Drivers* → C# och kopiera connection string. Byt ut `<password>`.

**På lektionerna** lägger vi till `0.0.0.0/0`, som betyder alla adresser. Ta bort posten efter lektionen.

## Compass

Ladda ner MongoDB Compass från mongodb.com/try/download/compass. Klistra in connection string i fältet *URI* och klicka på *Connect*. Compass visar databaser, collections och dokument.

## CRUD

Modellen är en vanlig klass. `Id` lagras som `_id`:

```csharp
using MongoDB.Bson;

public class Product
{
    public ObjectId Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}
```

```csharp
// Create
products.InsertOne(new Product { Name = "Kaffe", Price = 49m });

// Read
var billiga = products.Find(p => p.Price < 100).ToList();

// Update
products.UpdateOne(
    p => p.Name == "Kaffe",
    Builders<Product>.Update.Set(p => p.Price, 39m));

// Delete
products.DeleteOne(p => p.Name == "Kaffe");
```

Till skillnad från EF Core sparar varje operation direkt. Det finns inget `SaveChanges()`.

## Transaktioner

Transaktioner över flera dokument kräver ett **replica set**. Atlas är redan ett replica set. En lokal Docker-container med en enda nod måste startas som ett replica set:

```bash
docker run --name mongo-rs -p 27017:27017 -d mongo --replSet rs0
docker exec mongo-rs mongosh --eval "rs.initiate()"
```

Om `mongosh` inte finns i containern kan du köra `rs.initiate()` från Compass.

Transaktionen körs i en session:

```csharp
using var session = client.StartSession();
session.StartTransaction();
try
{
    products.UpdateOne(session, p => p.Name == "Kaffe", Builders<Product>.Update.Inc(p => p.Price, -5m));
    orders.InsertOne(session, new Order { ProductName = "Kaffe" });
    session.CommitTransaction();
}
catch
{
    session.AbortTransaction();
    throw;
}
```

Varje operation får `session` som första argument. Glömmer du det körs den utanför transaktionen. Mer om transaktioner finns i [SQL: transaktioner](../sql/transactions.md).

## Seeding

Fyll collectionen bara om den är tom:

```csharp
if (products.CountDocuments(p => true) == 0)
{
    products.InsertMany(new[]
    {
        new Product { Name = "Kaffe", Price = 49m },
        new Product { Name = "Te", Price = 35m }
    });
}
```

## Koppla på från IDE

- **Compass** är det enklaste verktyget.
- **VS Code:** installera *MongoDB for VS Code* av MongoDB och lägg till en anslutning med connection string.
- **Visual Studio och Rider:** inget inbyggt MongoDB-verktyg. Använd Compass vid sidan av.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Dokument** | En post i MongoDB. Ett objekt med fält, inte en rad |
| **Collection** | En samling dokument. Motsvarar en tabell |
| **Database** | En samling collections |
| **BSON** | Det binära formatet dokumenten lagras i. Liknar JSON |
| **_id** | Dokumentets unika nyckel. Skapas automatiskt |
| **Replica set** | Flera servrar som håller samma data. Krävs för transaktioner |
| **Connection string** | Text som beskriver var och hur du ansluter |
| **IP access list** | Adresser som får ansluta till Atlas |

## Tips och tricks

- Connection string fungerar inte mot Atlas? Kontrollera att din IP-adress finns i Network Access.
- Ingen data syns? Kontrollera databasens namn. Det måste vara samma i koden och i Compass.
- Lägg inte `0.0.0.0/0` och glöm bort den. Ta bort posten efter lektionen.
- Använd `_id` när du vill hämta ett specifikt dokument.
