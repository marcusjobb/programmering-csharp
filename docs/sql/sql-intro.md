---
title: SQL — grunder
description: "SELECT, FROM, WHERE, ORDER BY, LIMIT och COUNT — de sex nyckelorden du behöver för att börja ställa frågor till en databas."
parent: SQL
nav_order: 4
---

# SQL — grunder

SQL (Structured Query Language) är det språk du använder för att kommunicera med en databas. Du beskriver **vad** du vill ha — databasen räknar ut hur den hämtar det.

---

## Grundstrukturen

Alla grundläggande SQL-frågor följer samma mönster:

```sql
SELECT  vad_du_vill_ha
FROM    vilket_bord
WHERE   vilket_villkor;
```

---

## SELECT och FROM

```sql
SELECT * FROM customers;
```

`*` hämtar alla kolumner. I produktion: namnge bara de kolumner du behöver.

```sql
SELECT CustomerName, City, Country
FROM customers;
```

---

## WHERE — filtrera

```sql
SELECT CustomerName, City
FROM   customers
WHERE  Country = 'Germany';
```

Textsträngar skrivs med enkelfnuttar. `WHERE` fungerar som en `if`-sats — bara rader där villkoret är sant returneras.

Kombinera villkor med `AND` och `OR`:

```sql
SELECT CustomerName
FROM   customers
WHERE  Country = 'Germany'
  AND  City = 'Berlin';
```

---

## ORDER BY — sortera

```sql
SELECT CustomerName
FROM   customers
ORDER BY CustomerName;         -- stigande (standard)

SELECT CustomerName
FROM   customers
ORDER BY CustomerName DESC;    -- fallande
```

Databaser garanterar ingen ordning utan `ORDER BY` — lita aldrig på att rader kommer ut sorterade av sig självt.

---

## LIMIT — begränsa

```sql
SELECT CustomerName
FROM   customers
ORDER BY CustomerName
LIMIT 10;
```

Klassisk kombination: `ORDER BY` + `LIMIT` för att hämta de tio senaste ordererna, fem billigaste produkterna osv.

---

## COUNT — räkna

```sql
SELECT COUNT(*) FROM customers;

SELECT COUNT(DISTINCT Country)
FROM customers;
```

`COUNT(DISTINCT ...)` räknar bara unika värden — inte totalt antal rader.

---

## Sammanfattning

| Nyckelord  | Vad det gör |
|------------|-------------|
| `SELECT`   | Väljer kolumner |
| `FROM`     | Väljer tabell |
| `WHERE`    | Filtrerar rader |
| `ORDER BY` | Sorterar resultatet |
| `LIMIT`    | Begränsar antal rader |
| `COUNT()`  | Räknar rader |

---

## Träna vidare

| Resurs | Vad |
|--------|-----|
| [SQLZoo SELECT Basics](https://sqlzoo.net/wiki/SELECT_basics) | Grundläggande SELECT-övningar — kör direkt i webbläsaren |
| [SQLZoo SELECT from WORLD](https://sqlzoo.net/wiki/SELECT_from_WORLD_Tutorial) | Träna WHERE och jämförelser mot ett världsdata-dataset |
| [W3Schools SQL SELECT](https://www.w3schools.com/sql/sql_select.asp) | Snabbreferens för SELECT-syntax |
| [W3Schools SQL WHERE](https://www.w3schools.com/sql/sql_where.asp) | WHERE-syntax med exempel |
| [W3Schools SQL ORDER BY](https://www.w3schools.com/sql/sql_orderby.asp) | Sortering med ORDER BY |
| [sqliteonline.com](https://sqliteonline.com) | Prova SQL direkt i webbläsaren mot en färdig Demo DB |
