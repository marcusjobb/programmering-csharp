---
title: Varför databaser?
description: "Vad en databas är, vad den löser och när du behöver en — med CSI-exemplet som startpunkt."
parent: SQL
nav_order: 1
---

# Varför databaser?

## En vanlig tisdag på CSI: Göteborg

Kriminalinspektör Lindqvist tittar upp från sitt skrivbord och ber om en lista:

> "Alla män, 25–35 år, brunt hår, hockeyfrilla, utstående öron, minst 195 centimeter lång, skonummer 43."

Det är en rimlig begäran. Men hur löser du den om du inte har en databas?

---

## Utan databas: pappersarkivet

Du börjar gå igenom pappersarkivet manuellt. En mapp per person. Tio sekunder per mapp. Göteborg har 400 000 folkbokförda.

400 000 × 10 sekunder = ungefär **46 dagar**.

---

## Med databas: under en sekund

```sql
SELECT *
FROM personer
WHERE kön       = 'man'
  AND ålder     BETWEEN 25 AND 35
  AND hårfärg   = 'brun'
  AND frisyr    = 'hockeyfrilla'
  AND öron      = 'utstående'
  AND längd     >= 195
  AND skonummer = 43;
```

Svarstid: under en sekund.

---

## Vad är en databas?

En databas är ett organiserat sätt att lagra information så att man kan söka, filtrera och kombinera den snabbt.

| Utan databas | Med databas |
|-------------|------------|
| Pappersarkiv | Strukturerade tabeller |
| Manuell sökning | SQL-fråga |
| 46 dagar | Under en sekund |
| En person åt gången | Tusentals parallellt |

---

## Tre grundbegrepp

En databas organiserar data i **tabeller**:

| id | namn  | ålder | stad     |
|----|-------|-------|----------|
| 1  | Anna  | 28    | Göteborg |
| 2  | Björn | 34    | Malmö    |

- **Tabell** — en samling rader med samma struktur
- **Rad** — ett objekt (en person, en order, en produkt)
- **Kolumn** — en egenskap (namn, ålder, stad)

---

## Varför inte bara Excel?

Excel fungerar för hundratals rader och en person åt gången. En databas är byggd för:

- Miljontals rader utan att tappa hastighet
- Flera användare som läser och skriver *samtidigt*
- Komplexa sökningar och kopplingar mellan tabeller
- Åtkomst från applikationer — utan att öppna en fil

---

## Träna vidare

| Resurs | Vad |
|--------|-----|
| [W3Schools SQL Intro](https://www.w3schools.com/sql/sql_intro.asp) | Snabb introduktion till vad SQL är och varför det används |
| [SQLZoo SELECT Basics](https://sqlzoo.net/wiki/SELECT_basics) | Interaktiva SELECT-övningar direkt i webbläsaren |
