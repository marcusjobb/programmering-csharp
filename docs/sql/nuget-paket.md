---
title: "NuGet-paket för databaser"
description: "Vilka NuGet-paket du behöver för SQLite, MySQL, SQL Server och MongoDB — med ADO.NET och Entity Framework Core."
parent: "SQL"
nav_order: 56
---

# NuGet-paket för databaser

Snabbreferens — välj paket beroende på databastyp och om du använder ADO.NET eller EF Core.

---

## SQLite

```bash
# ADO.NET
dotnet add package Microsoft.Data.Sqlite

# Entity Framework Core
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
```

---

## MySQL

```bash
# ADO.NET
dotnet add package MySql.Data

# Entity Framework Core
dotnet add package Pomelo.EntityFrameworkCore.MySql
dotnet add package Microsoft.EntityFrameworkCore.Design
```

---

## SQL Server / LocalDB

```bash
# ADO.NET
dotnet add package Microsoft.Data.SqlClient

# Entity Framework Core
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
```

---

## MongoDB

```bash
# MongoDB Driver (INGET EF Core — MongoDB har eget API)
dotnet add package MongoDB.Driver
```

---

## EF Core Tools — installeras globalt, en gång

```bash
dotnet tool install --global dotnet-ef

# Uppdatera
dotnet tool update --global dotnet-ef

# Verifiera
dotnet ef
```
