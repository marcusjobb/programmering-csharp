---
title: Normalisering
description: "Normalisering i SQL — C# bok av Marcus Ackre Medina"
parent: SQL
nav_order: 45
---

# Normalisering

Normalisering är processen att strukturera en databas så att data lagras på ett ställe, inte flera. Det handlar om att ta bort redundans och förhindra att en ändring behöver göras på hundra rader istället för en.

## TL;DR

- 1NF: inga listor i celler, atomära värden.
- 2NF: varje kolumn beror på hela primärnyckeln — inte bara delar av den.
- 3NF: kolumner beror direkt på primärnyckeln, inte på varandra.
- De tre första normalformerna täcker 95 % av praktiska databaser.

---

## Varför det spelar roll

En onormaliserad tabell kan råka ut för tre typer av problem:

**Insättningsanomalier** — du kan inte lägga till en kund utan att samtidigt skapa en beställning (om kunddata lagras i beställningstabellen).

**Uppdateringsanomalier** — Anna byter e-post. Du uppdaterar 49 av hennes 50 beställningsrader. Nu finns hon med två e-postadresser i systemet.

**Raderingsanomalier** — du tar bort en beställning och förlorar all kunddata med den.

Normalisering löser alla tre.

---

## 1NF — atomära värden

**Regel:** varje cell innehåller ett och bara ett värde. Inga komma-separerade listor.

Dåligt:
```
| StudentId | Namn  | Kurser                    |
|-----------|-------|---------------------------|
| 1         | Pelle | Matematik,Fysik,Kemi      |
```

Bättre:
```sql
CREATE TABLE Kursregistreringar (
    StudentId INTEGER,
    KursId    INTEGER,
    PRIMARY KEY (StudentId, KursId)
);
```

Nu kan du fråga på enskilda kurser med `WHERE KursId = 3`.

---

## 2NF — inga partiella beroenden

**Regel:** alla kolumner beror på hela primärnyckeln. Om primärnyckeln är sammansatt (två eller fler kolumner) ska inga kolumner bero på bara en del av den.

Dåligt (primärnyckel är `StudentId + KursId`):
```
| StudentId | KursId | Betyg | StudentNamn | KursNamn      |
|-----------|--------|-------|-------------|---------------|
| 1         | 101    | A     | Pelle       | Matematik     |
```

`StudentNamn` beror bara på `StudentId` — inte på `KursId`. Det är ett partiellt beroende.

Bättre:
```sql
CREATE TABLE Studenter (
    StudentId   INTEGER PRIMARY KEY,
    Namn        TEXT
);

CREATE TABLE Kurser (
    KursId  INTEGER PRIMARY KEY,
    Namn    TEXT
);

CREATE TABLE Betyg (
    StudentId INTEGER REFERENCES Studenter,
    KursId    INTEGER REFERENCES Kurser,
    Betyg     TEXT,
    PRIMARY KEY (StudentId, KursId)
);
```

---

## 3NF — inga transitiva beroenden

**Regel:** kolumner ska bero direkt på primärnyckeln — inte på varandra.

Dåligt:
```
| StudentId | AvdelningsId | AvdelningsNamn |
|-----------|--------------|----------------|
| 1         | 10           | Teknik         |
```

`AvdelningsNamn` beror på `AvdelningsId`, inte direkt på `StudentId`. Det är ett transitivt beroende (`StudentId → AvdelningsId → AvdelningsNamn`).

Bättre:
```sql
CREATE TABLE Avdelningar (
    AvdelningsId   INTEGER PRIMARY KEY,
    AvdelningsNamn TEXT
);

CREATE TABLE Studenter (
    StudentId    INTEGER PRIMARY KEY,
    Namn         TEXT,
    AvdelningsId INTEGER REFERENCES Avdelningar
);
```

---

## Praktiskt exempel — orderdatabas

Onormaliserad:
```
| OrderId | KundNamn | KundEmail        | Produkt | Pris |
|---------|----------|------------------|---------|------|
| 1       | Pelle    | pelle@example.se | Bok     | 199  |
| 2       | Pelle    | pelle@example.se | Penna   | 25   |
| 3       | Kalle    | kalle@example.se | Bok     | 199  |
```

Normaliserad (3NF):
```sql
CREATE TABLE Kunder (
    KundId  INTEGER PRIMARY KEY,
    Namn    TEXT,
    Email   TEXT
);

CREATE TABLE Produkter (
    ProduktId  INTEGER PRIMARY KEY,
    Namn       TEXT,
    Pris       DECIMAL
);

CREATE TABLE Ordrar (
    OrderId   INTEGER PRIMARY KEY,
    KundId    INTEGER REFERENCES Kunder,
    ProduktId INTEGER REFERENCES Produkter
);
```

Nu uppdateras Pelles e-post på ett ställe. Produktpriset ändras på ett ställe. Inga anomalier.

---

## När man inte ska normalisera

Normalisering är inte alltid rätt val. Denormalisering — att medvetet bryta normaliseringsregler — kan vara motiverat när:

- Läsprestanda är kritisk och du har många `JOIN`-tunga queries.
- Data är historisk och aldrig uppdateras (data warehouse, reporting).
- Du bygger en read model i CQRS-arkitektur.

Grundregeln: normalisera först. Denormalisera bara om du har mätbara prestandaproblem.

---

## Högre normalformer

Utöver 1NF–3NF finns BCNF (Boyce-Codd), 4NF och 5NF. De hanterar kantfall som uppstår i tabeller med flera kandidatnycklar eller flervärdesberoenden. De flesta praktiska databaser behöver aldrig gå längre än 3NF.

---

## Övningar

1. Givet en onormaliserad tabell med kundbeställningar — identifiera alla anomalier och normalisera till 3NF.
2. Skapa ett databasschema för ett enkelt bibliotekssystem (böcker, exemplar, låntagare, lån) i 3NF.
3. Argumentera för eller emot denormalisering i ett rapportsystem som kör dagliga aggregeringar över 10 miljoner rader.
