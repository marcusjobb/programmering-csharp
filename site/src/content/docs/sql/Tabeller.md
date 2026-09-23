---
title: Tabeller
description: "Tabeller i SQL — C#-boken av Marcus Ackre Medina"
layout: default
parent: SQL
nav_order: 30
---
# Tabeller

Tabeller är en grundläggande del av databashantering och används för att lagra och organisera data i en strukturerad form. Varje tabell består av rader och kolumner, där varje kolumn representerar en specifik typ av data och varje rad representerar en post med data. Tabeller används i SQL (Structured Query Language) för att skapa och hantera databaser.

### Fördelar med att använda tabeller

- **Organisering av data**: Tabeller tillåter oss att organisera data på ett strukturerat sätt genom att dela upp information i olika kolumner och rader. Detta underlättar förståelsen och hanteringen av data.

- **Dataintegritet**: Genom att använda tabeller kan vi tillämpa olika regler och restriktioner för att säkerställa dataintegritet. Detta kan inkludera att ha unika värden för primärnycklar, begränsningar för inmatade värden och referentiell integritet med hjälp av främmande nycklar.

- **Effektivitetsförbättring**: Genom att använda tabeller kan vi utföra snabba och effektiva sökningar och filtreringar av data. Detta underlättar för att hitta och hämta specifik information baserat på olika kriterier.

### Begränsningar och överväganden med att använda tabeller

- **Komplexitet**: Design och hantering av tabeller kan vara komplexa, särskilt för stora databaser med många tabeller och relationer. Det är viktigt att planera och strukturera tabellerna noggrant för att undvika problem med prestanda och dataintegritet.

- **Dataredundans**: I vissa fall kan användningen av tabeller leda till dataredundans, där samma data upprepas i olika tabeller. Detta kan leda till ineffektivitet och problem med dataintegritet om inte rätt åtgärder vidtas för att hantera redundans.

- **Svårigheter vid ändringar**: När tabeller har skapats och används kan det vara svårt att göra ändringar i deras struktur eller relationer. Detta kan kräva att man tar bort befintlig data eller gör komplexa omstruktureringar, vilket kan vara tidskrävande och riskabelt.

### Användningsområden för tabeller

Tabeller används i en rad olika tillämpningar och branscher där datahantering och organisation är viktiga. Här är några exempel på användningsområden för tabeller:

- **E-handel**: Tabeller används för att lagra produktinformation, kunddata och beställningshistorik i e-handelsplattformar.

- **Bank och finans**: Tabeller används för att lagra kundkonton, transaktionshistorik och finansiella rapporter i banker och finansinstitut.

- **Personalhantering**: Tabeller används för att lagra anställdas uppgifter, löner och anställningshistorik i personalhanteringssystem.

- **Skolor och universitet**: Tabeller används för att lagra studentdata, kursinformation och betyg i utbildningsinstitutioner.

### Kodexempel

Här är några exempel på hur du skapar och arbetar med en tabell i SQL.

**Skapa en tabell:**

```sql
CREATE TABLE Student (
    Id INT PRIMARY KEY,
    Namn VARCHAR(100) NOT NULL,
    Epost VARCHAR(255) UNIQUE,
    Fodelsedatum DATE
);
```

Varje kolumn har ett namn och en datatyp (`INT`, `VARCHAR`, `DATE` osv.), och kan ha begränsningar (`PRIMARY KEY`, `NOT NULL`, `UNIQUE`) som styr vilka värden som tillåts. Se [Constraints](Constraints.md) för en genomgång av dessa.

**Lägga till en rad:**

```sql
INSERT INTO Student (Id, Namn, Epost, Fodelsedatum)
VALUES (1, 'Kim Andersson', 'kim@example.com', '2001-04-12');
```

**Hämta data:**

```sql
SELECT Namn, Epost FROM Student
WHERE Fodelsedatum > '2000-01-01';
```

**Ändra en tabells struktur:**

```sql
ALTER TABLE Student ADD COLUMN Program VARCHAR(100);
```

**Ta bort en tabell:**

```sql
DROP TABLE Student;
```

En tabell hänvisar ofta till en annan tabell via en **främmande nyckel** (foreign key) — det är så relationer mellan tabeller byggs upp:

```sql
CREATE TABLE Kurs (
    Id INT PRIMARY KEY,
    Namn VARCHAR(100) NOT NULL,
    StudentId INT,
    FOREIGN KEY (StudentId) REFERENCES Student(Id)
);
```

`StudentId` i `Kurs` pekar på `Id` i `Student` — varje kursrad hör ihop med en specifik student, utan att studentens data behöver dupliceras i kurs-tabellen.

### Slutsats

Tabeller är byggstenen i en relationsdatabas. Genom att strukturera data i rader och kolumner, koppla ihop tabeller med främmande nycklar och styra vilka värden som tillåts med constraints, får du data som är både organiserad och pålitlig.

### Termer

- **Tabell**: En strukturerad samling data organiserad i rader och kolumner.
- **Rad (post)**: En enskild post av data i en tabell.
- **Kolumn**: Ett fält som representerar en specifik typ av data för varje rad.
- **Primärnyckel**: En kolumn (eller kombination av kolumner) som unikt identifierar varje rad.
- **Främmande nyckel**: En kolumn som refererar till en primärnyckel i en annan tabell, och som bygger relationen mellan dem.

### TL;DR

En tabell = rader + kolumner. `CREATE TABLE` skapar den, `INSERT` lägger till data, `SELECT` hämtar den, `ALTER TABLE` ändrar strukturen, `DROP TABLE` tar bort den helt. Främmande nycklar kopplar ihop tabeller utan att du behöver duplicera data.
