---
title: ER-diagram
description: "ER-diagram i SQL — C#-boken av Marcus Ackre Medina"
layout: default
parent: SQL
nav_order: 40
---
# ER-diagram

Ett ER-diagram (Entity-Relationship Diagram) är en ritning av en databas — vilka tabeller som finns, vad de innehåller och hur de hänger ihop. Rita det innan du skapar tabellerna.

## När du läst detta ska du kunna

- Förklara vad en entitet, ett attribut och en relation är
- Rita ett enkelt ER-diagram
- Tolka kardinalitet (1:1, 1:N, N:M)
- Översätta ett ER-diagram till SQL

## Grundbegrepp

| Begrepp | Vad det är | Exempel |
|---------|-----------|---------|
| **Entitet** | En sak vi vill lagra data om | Customer, Product, Order |
| **Attribut** | Vad entiteten har | Name, Price, Email |
| **Relation** | Hur entiteter hänger ihop | Customer *gör* Orders |
| **Primärnyckel (PK)** | Unikt id per rad | CustomerID |
| **Främmande nyckel (FK)** | Referens till annan tabell | CustomerID i Order |

## En enkel entitet

```
┌────────────────────┐
│      Customer      │
├────────────────────┤
│ PK  CustomerID int │
│     Name    varchar│
│     Email   varchar│
│     Phone   varchar│
└────────────────────┘
```

Varje rad i tabellen är en instans — en specifik kund.

## Kardinalitet — hur många?

Kardinalitet beskriver hur många poster i en tabell som kan kopplas till hur många i en annan.

### 1:1 — en till en

```
┌──────────┐         ┌──────────┐
│  Person  │────────│  Passport│
└──────────┘         └──────────┘
```

En person har exakt ett pass. Ett pass tillhör exakt en person.

### 1:N — en till många

```
┌──────────┐         ┌──────────┐
│ Customer │────────<│  Order   │
└──────────┘         └──────────┘
```

En kund kan ha många orders. Varje order tillhör exakt en kund.

FK (`CustomerID`) läggs i den "många"-sidan — i `Order`.

### N:M — många till många

```
┌──────────┐         ┌──────────┐
│ Student  │>───────<│  Course  │
└──────────┘         └──────────┘
```

En student kan läsa många kurser. En kurs kan ha många studenter.

N:M löses alltid med en **kopplingstabell**:

```
┌──────────┐   ┌──────────────┐   ┌──────────┐
│ Student  │───│ Enrollment   │───│  Course  │
├──────────┤   ├──────────────┤   ├──────────┤
│ PK ID    │   │ FK StudentId │   │ PK ID    │
│ Name     │   │ FK CourseID  │   │ Title    │
└──────────┘   │ EnrolledAt   │   └──────────┘
               └──────────────┘
```

## Crow's foot-notation

Den vanligaste notationen för att rita kardinalitet:

```
─────        exact en
────<        en till many  (1:N)
>────<       many till many (N:M)
────○        zero or en
────○<       zero till many
```

## Fullständigt exempel — webbshop

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Customer   │         │    Order     │         │   Product    │
├──────────────┤         ├──────────────┤         ├──────────────┤
│PK CustomerID │         │PK OrderID    │         │PK ProductID  │
│   Name       │────────<│FK CustomerID │         │   Name       │
│   Email      │         │   OrderDate  │>───────<│   Price      │
│   Phone      │         │   Status     │         │   Stock      │
└──────────────┘         └──────────────┘         └──────────────┘
                                                        ↑
                                          ┌─────────────┘
                                          │  OrderItem (junctionTable)
                                          ├──────────────┐
                                          │PK ItemID     │
                                          │FK OrderID    │
                                          │FK ProductID  │
                                          │   Quantity   │
                                          │   UnitPrice  │
                                          └──────────────┘
```

## Från ER-diagram till SQL

Varje entitet → en tabell. Varje attribut → en kolumn. Varje FK → en `FOREIGN KEY`.

```sql
CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    Name       VARCHAR(100) NOT NULL,
    Email      VARCHAR(100) UNIQUE NOT NULL,
    Phone      VARCHAR(20)
);

CREATE TABLE Product (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    Name      VARCHAR(200) NOT NULL,
    Price     DECIMAL(10,2) NOT NULL,
    Stock     INT DEFAULT 0
);

CREATE TABLE [Order] (
    OrderID    INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT NOT NULL,
    OrderDate  DATETIME DEFAULT GETDATE(),
    Status     VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE OrderItem (
    ItemID     INT PRIMARY KEY AUTO_INCREMENT,
    OrderID    INT NOT NULL,
    ProductID  INT NOT NULL,
    Quantity   INT NOT NULL,
    UnitPrice  DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (OrderID)   REFERENCES [Order](OrderID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);
```

## Verktyg

| Verktyg | Typ | Pris |
|---------|-----|------|
| draw.io | Online / offline | Gratis |
| dbdiagram.io | Online, kod-baserad | Freemium |
| MySQL Workbench | EER-diagram, genererar SQL | Gratis |
| Lucidchart | Online | Freemium |

## TL;DR

Rita ER-diagrammet **innan** du skapar tabellerna.

| Symbol | Kardinalitet |
|--------|-------------|
| `─────` | Exakt en |
| `────<` | En till många |
| `>────<` | Många till många → kopplingstabell |
| FK i "många"-sidan | Alltid |
