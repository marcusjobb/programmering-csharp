---
title: SQL
layout: default
author: Campus Mölndal
author_github: CampusMolndalEducation
author_url: "https://github.com/CampusMolndalEducation"
school: Campus Mölndal
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: C# bok
nav_order: 9
has_children: True
---
# SQL

SQL erbjuder många fler avancerade funktioner och kommandon för att hantera och manipulera data i databaser. Genom att lära dig SQL kan du få en djupare förståelse för databaser och hur man effektivt hanterar och analyserar data.

## Exempel

Låt oss titta på ett exempel där vi använder SQL för att skapa en databas och en tabell i SQL-Server.

```sql
CREATE DATABASE IF NOT EXISTS test;

USE test;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
```
