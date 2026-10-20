---
title: Normalisering
description: "Normalisering är processen att strukturera en databas så att data lagras på ett ställe, inte flera. Det handlar om att ta bort redundans och förhindra att…"
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
| StudentId | Name  | Courses                    |
|-----------|-------|---------------------------|
| 1         | Pelle | Maths,Physics,Chemistry      |
```

Bättre:
```sql
CREATE TABLE CourseRegistrations (
    StudentId INTEGER,
    CourseId    INTEGER,
    PRIMARY KEY (StudentId, CourseId)
);
```

Nu kan du fråga på enskilda kurser med `WHERE CourseId = 3`.

---

## 2NF — inga partiella beroenden

**Regel:** alla kolumner beror på hela primärnyckeln. Om primärnyckeln är sammansatt (två eller fler kolumner) ska inga kolumner bero på bara en del av den.

Dåligt (primärnyckel är `StudentId + CourseId`):
```
| StudentId | CourseId | Grade | StudentName | CourseName      |
|-----------|--------|-------|-------------|---------------|
| 1         | 101    | A     | Pelle       | Maths     |
```

`StudentName` beror bara på `StudentId` — inte på `CourseId`. Det är ett partiellt beroende.

Bättre:
```sql
CREATE TABLE Students (
    StudentId   INTEGER PRIMARY KEY,
    Name        TEXT
);

CREATE TABLE Courses (
    CourseId  INTEGER PRIMARY KEY,
    Name    TEXT
);

CREATE TABLE Grade (
    StudentId INTEGER REFERENCES Students,
    CourseId    INTEGER REFERENCES Courses,
    Grade     TEXT,
    PRIMARY KEY (StudentId, CourseId)
);
```

---

## 3NF — inga transitiva beroenden

**Regel:** kolumner ska bero direkt på primärnyckeln — inte på varandra.

Dåligt:
```
| StudentId | DepartmentId | DepartmentName |
|-----------|--------------|----------------|
| 1         | 10           | Technique         |
```

`DepartmentName` beror på `DepartmentId`, inte direkt på `StudentId`. Det är ett transitivt beroende (`StudentId → DepartmentId → DepartmentName`).

Bättre:
```sql
CREATE TABLE Departments (
    DepartmentId   INTEGER PRIMARY KEY,
    DepartmentName TEXT
);

CREATE TABLE Students (
    StudentId    INTEGER PRIMARY KEY,
    Name         TEXT,
    DepartmentId INTEGER REFERENCES Departments
);
```

---

## Praktiskt exempel — orderdatabas

Onormaliserad:
```
| OrderId | CustomerName | KundEmail        | Product | Price |
|---------|----------|------------------|---------|------|
| 1       | Pelle    | pelle@example.see | Book     | 199  |
| 2       | Pelle    | pelle@example.see | Pen   | 25   |
| 3       | Kalle    | kalle@example.see | Book     | 199  |
```

Normaliserad (3NF):
```sql
CREATE TABLE Customers (
    CustomerId  INTEGER PRIMARY KEY,
    Name    TEXT,
    Email   TEXT
);

CREATE TABLE Products (
    ProductId  INTEGER PRIMARY KEY,
    Name       TEXT,
    Price       DECIMAL
);

CREATE TABLE Orders (
    OrderId   INTEGER PRIMARY KEY,
    CustomerId    INTEGER REFERENCES Customers,
    ProductId INTEGER REFERENCES Products
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
