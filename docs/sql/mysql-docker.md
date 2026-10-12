---
title: "MySQL med Docker"
description: "Installera MySQL med Docker och docker-compose, starta phpMyAdmin, anslut från C# med ADO.NET och Entity Framework Core."
parent: "SQL"
nav_order: 62
---

# MySQL med Docker

MySQL är en **serverdatabas** — till skillnad från SQLite finns det en process som körs och lyssnar på nätverksanrop. Docker gör installationen enkel: inga manuella installatörer, inga systemförändringar, och du kan ta bort allt utan spår.

---

## Fördelar och nackdelar

✅ Hanterar många samtidiga användare  
✅ Kraftfull och skalbar  
✅ Open source  
✅ Fungerar bra med PHP (LAMP-stack)

❌ Kräver server (lokal eller fjärr)  
❌ Mer komplex setup än SQLite  

---

## 1. Installera Docker Desktop

1. Ladda ner Docker Desktop från [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Installera med standardinställningar
3. Starta Docker Desktop
4. Verifiera: öppna terminal och kör `docker --version`

---

## 2. Starta MySQL + phpMyAdmin

Skapa filen `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql_dev
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: myapp
      MYSQL_USER: appuser
      MYSQL_PASSWORD: apppassword
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin:latest
    container_name: phpmyadmin_dev
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
    ports:
      - "8080:80"
    depends_on:
      - mysql

volumes:
  mysql_data:
```

Starta:

```bash
docker-compose up -d
```

- MySQL körs på port `3306`
- phpMyAdmin på [http://localhost:8080](http://localhost:8080)
- `mysql_data` är en volym — data överlever omstart

---

## 3. Logga in i phpMyAdmin

1. Öppna [http://localhost:8080](http://localhost:8080)
2. Logga in med `appuser` / `apppassword`
3. Du ser databasen `myapp` i vänstermenyn

---

## 4. Ansluta från C#

### Installera NuGet-paket

```bash
dotnet add package MySql.Data
```

### ADO.NET

```csharp
using MySql.Data.MySqlClient;

string connectionString = "Server=localhost;Port=3306;Database=myapp;User=appuser;Password=apppassword;";

using (var connection = new MySqlConnection(connectionString))
{
    connection.Open();

    var command = connection.CreateCommand();
    command.CommandText = "SELECT * FROM Customers";

    using (var reader = command.ExecuteReader())
    {
        while (reader.Read())
        {
            Console.WriteLine($"{reader.GetInt32("CustomerId")}: {reader.GetString("Name")}");
        }
    }
}
```

### Parametriserade queries

```csharp
command.CommandText = "INSERT INTO Customers (Name, Email) VALUES (@name, @email)";
command.Parameters.AddWithValue("@name", "Erik Svensson");
command.Parameters.AddWithValue("@email", "erik@example.com");
command.ExecuteNonQuery();
```

---

## 5. Entity Framework Core

### Installera paket

```bash
dotnet add package Pomelo.EntityFrameworkCore.MySql
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet tool install --global dotnet-ef
```

### DbContext

```csharp
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string connectionString = "Server=localhost;Port=3306;Database=myapp;User=appuser;Password=apppassword;";

        optionsBuilder.UseMySql(
            connectionString,
            ServerVersion.AutoDetect(connectionString)
        );
    }
}
```

### Migrations

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

EF Core skapar tabellerna automatiskt.

---

## 6. Backup och restore

```bash
# Backup
docker exec mysql_dev mysqldump -u appuser -p myapp > backup.sql

# Restore
docker exec -i mysql_dev mysql -u appuser -papppassword myapp < backup.sql
```

Eller via phpMyAdmin: fliken **Export** / **Import**.

---

## Vanliga fel

| Fel | Lösning |
|-----|---------|
| Unable to connect to any of the specified MySQL hosts | Kör `docker-compose up -d` och vänta 10 sekunder |
| Access denied for user | Kontrollera lösenord i connection string och docker-compose.yml |
| Port 3306 already used | Ändra till `"3307:3306"` i docker-compose.yml, uppdatera `Port=3307` i connection string |
