---
title: SQLite, MySQL och PostgreSQL
description: "Jämförelse av tre vanliga databasmotorer — när SQLite räcker, när MySQL behövs och när PostgreSQL är rätt val."
parent: SQL
nav_order: 6
---

# SQLite, MySQL och PostgreSQL

## Varför valet spelar roll

I C# är det tekniskt enkelt att byta databas — du ändrar connection string och NuGet-paket:

```csharp
optionsBuilder.UseSqlite("Data Source=shop.db");
optionsBuilder.UseMySql("Server=localhost;...", ...);
optionsBuilder.UseNpgsql("Host=localhost;...");
```

Men valet påverkar deploy, skalbarhet, kostnad och vad du kan lagra.

---

## SQLite

Filbaserad, ingen server. Hela databasen är en `.db`-fil.

**Passar för:** lokal utveckling, prototyper, mobilappar, enkla appar med en användare.

**Passar inte för:** tusentals parallella skrivningar, nätverksdelad databas.

```csharp
optionsBuilder.UseSqlite("Data Source=shop.db");
```

---

## MySQL

Serverbaserad. Separat process, anslutning via nätverk.

**Passar för:** produktionsappar, team som delar databas, "vanliga" webbappar.

**Fördelar:** brett stöd hos hostingleverantörer, Docker-vänlig, hanterar tusentals parallella användare.

```bash
docker run --name mysql-dev -e MYSQL_ROOT_PASSWORD=hemligt \
    -p 3306:3306 -d mysql:8
```

---

## PostgreSQL

Serverbaserad precis som MySQL — men med ett striktare typsystem och bättre stöd för avancerade datatyper.

**Passar för:** projekt som ska växa, komplex data med JSON-fält, molnmiljöer (Azure, GCP, Supabase).

**Fördelar:** följer SQL-standarden hårdare, inbyggt stöd för arrays och JSON, vanlig i molntjänster.

---

## Jämförelsetabell

| Motor | Serverkrav | Bäst för |
|-------|-----------|----------|
| **SQLite** | Nej — bara en fil | Utveckling, prototyper, enkla appar |
| **MySQL** | Ja | Produktion, team, webbappar |
| **PostgreSQL** | Ja | Växande projekt, komplex data, molnmiljöer |

---

## Tre frågor som styr valet

1. **Hur många skriver samtidigt?**  
   En person → SQLite. Flera parallellt → server.

2. **Var körs appen?**  
   Lokalt → SQLite funkar. Molnet / produktion → MySQL eller Postgres.

3. **Hur komplex är datan?**  
   Enkla tabeller → vilken som helst. JSON, arrays, strikt typning → Postgres.

---

## Träna vidare

| Resurs | Vad |
|--------|-----|
| [W3Schools SQL Tutorial](https://www.w3schools.com/sql/) | SQL-syntax som fungerar i alla tre databasmotorer |
| [SQLZoo](https://sqlzoo.net/) | Interaktiva övningar mot en MySQL-liknande motor |
| [DB-Engines Ranking](https://db-engines.com/en/ranking) | Aktuell popularitetsranking för alla databasmotorer |
