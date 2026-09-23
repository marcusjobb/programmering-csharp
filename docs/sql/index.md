---
title: SQL
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: C# bok
nav_order: 100
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
