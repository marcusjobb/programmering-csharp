---
title: SQL injection
description: "SQL injection i SQL — C#-boken av Marcus Ackre Medina"
layout: default
parent: SQL
nav_order: 50
---
# SQL injection

SQL injection är en av de äldsta och farligaste säkerhetsbristerna inom webbutveckling — och en av de enklaste att undvika, om man vet vad man ska se upp med. Den uppstår när användarens input klistras rakt in i en SQL-fråga istället för att skickas som ett separat, ofarligt värde.

## När du läst detta ska du kunna

- Förklara vad SQL injection är och varför det uppstår
- Känna igen sårbar kod som bygger SQL-frågor genom strängkonkatenering
- Skydda dig med parametriserade frågor

## Problemet — att bygga en fråga med strängar

Tänk dig en inloggningsruta som letar upp en användare baserat på det angivna användarnamnet:

```csharp
string username = Console.ReadLine() ?? "";
string sql = "SELECT * FROM Users WHERE Username = '" + username + "'";
```

Så länge `username` är ett vanligt namn fungerar det här utmärkt. Problemet är att `username` kommer direkt från användaren — och SQL-motorn kan inte skilja på "data" och "kod" i den hopklistrade strängen. Om någon skriver in `' OR '1'='1` som användarnamn blir frågan:

```sql
SELECT * FROM Users WHERE Username = '' OR '1'='1'
```

`'1'='1'` är alltid sant, så villkoret matchar **alla** rader i tabellen — inloggningen returnerar plötsligt hela användarlistan istället för noll träffar. Med lite mer avancerad input kan en angripare på samma sätt läsa ut data de inte ska se, ändra data, eller i värsta fall radera hela tabeller:

```sql
SELECT * FROM Users WHERE Username = ''; DROP TABLE Users; --'
```

Det som gör SQL injection farligt är just det här: koden ser oskyldig ut, kompilerar utan varning, och fungerar felfritt i alla vanliga tester — sårbarheten syns först när någon aktivt utnyttjar den.

> Om du undrar varifrån skämtet "Bobby Tables" kommer: [xkcd #327 — Exploits of a Mom](https://xkcd.com/327/) är den klassiska förklaringen av SQL injection, med en son som döpts till `Robert'); DROP TABLE Students;--`. Skolans elevregister raderas när namnet sparas okritiskt i databasen.

## Lösningen — parametriserade frågor

Istället för att klistra in värdet i själva SQL-strängen skickar du det som en **parameter**. Databasmotorn vet då att värdet alltid är data, aldrig kod, oavsett vad det innehåller:

```csharp
string username = Console.ReadLine() ?? "";
string sql = "SELECT * FROM Users WHERE Username = @Username";

using var command = new SqlCommand(sql, connection);
command.Parameters.AddWithValue("@Username", username);
```

Skriver användaren `' OR '1'='1` nu, söks det bokstavligen efter en användare som heter `' OR '1'='1` — ingen match, ingen bugg. Parametern kan aldrig "läcka ut" ur sin roll som värde och bli en del av frågans struktur.

## Entity Framework skyddar dig automatiskt

Använder du Entity Framework (LINQ-frågor mot en `DbContext`) parametriseras frågorna automatiskt bakom kulisserna — du behöver inte tänka på det:

```csharp
var user = context.Users.FirstOrDefault(u => u.Username == username);
```

Det är en av de starkaste anledningarna att föredra en ORM som EF Core framför handskriven SQL med strängkonkatenering: skyddet mot SQL injection kommer på köpet, så länge du inte kringgår det.

## Om du ändå måste bygga SQL dynamiskt

Ibland behöver du bygga en fråga dynamiskt (t.ex. valfria sökfilter). Bygg då strukturen dynamiskt, men **skicka fortfarande värdena som parametrar** — aldrig genom att klistra in dem i strängen:

```csharp
// Rätt: bara SQL-strukturen är dynamisk, värdet är alltid en parameter
string sql = "SELECT * FROM Users WHERE Username = @Username";
if (!string.IsNullOrEmpty(department))
{
    sql += " AND Department = @Department";
    command.Parameters.AddWithValue("@Department", department);
}
```

## TL;DR

SQL injection uppstår när användarinput klistras in direkt i en SQL-sträng, vilket låter angriparen förvandla data till kod. Lösningen är alltid densamma: skicka användarinput som **parametrar** (`command.Parameters.Add...`), aldrig genom strängkonkatenering — och använder du EF Core får du det skyddet automatiskt via LINQ.
