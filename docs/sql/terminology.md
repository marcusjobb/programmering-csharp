---
title: "Ordförklaringar"
description: "Termer du möter när du arbetar med databaser i C# — SQL, NoSQL, EF Core och Docker."
parent: "SQL"
nav_order: 59
---

# Ordförklaringar

---

## Allmänna databastermer

| Term | Förklaring |
|------|------------|
| **ACID** | Atomicity, Consistency, Isolation, Durability — garantier för transaktioner |
| **Connection String** | Text som innehåller information för att ansluta till databas |
| **CRUD** | Create, Read, Update, Delete — grundläggande databasoperationer |
| **Index** | Datastruktur som gör queries snabbare |
| **Migration** | Fil som beskriver ändringar i databasschema |
| **ORM** | Object-Relational Mapping — mappar objekt till databastabeller |
| **Query** | Förfrågan till databas för att hämta eller ändra data |
| **Schema** | Struktur som definierar tabeller, kolumner, datatyper |
| **Transaction** | Grupp av operationer som utförs som en enhet |

---

## SQL-specifika termer

| Term | Förklaring |
|------|------------|
| **Foreign Key** | Kolumn som refererar till primärnyckel i annan tabell |
| **JOIN** | Kombinerar rader från flera tabeller |
| **Primary Key** | Unik identifierare för rad i tabell |
| **Stored Procedure** | Fördefinierad SQL-kod som kan återanvändas |
| **Trigger** | Automatisk åtgärd vid INSERT/UPDATE/DELETE |
| **View** | Virtuell tabell baserad på query |

---

## Entity Framework Core-termer

| Term | Förklaring |
|------|------------|
| **DbContext** | Klass som representerar en databas-session |
| **DbSet** | Samling av entiteter (motsvarar tabell) |
| **Migration** | Kod som uppdaterar databasschema |
| **Navigation Property** | Property som representerar relation till annan tabell |
| **Tracking** | EF håller koll på ändringar i objekt |
| **Include()** | Eager loading av relaterade entiteter |
| **SaveChanges()** | Sparar alla ändringar till databasen |

---

## Docker-termer

| Term | Förklaring |
|------|------------|
| **Container** | Isolerad körande instans av en image |
| **Image** | Mall för att skapa containers |
| **Volume** | Persistent lagring för containers |
| **docker-compose** | Verktyg för att definiera multi-container-appar |
| **Port Mapping** | Exponera container-port till host |
