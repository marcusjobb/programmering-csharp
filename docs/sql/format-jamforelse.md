---
title: "Dataformat — JSON, XML, CSV, BSON"
description: "Samma data i fyra format och en jämförelsetabell som visar när du väljer vilket."
parent: "SQL"
nav_order: 60
---

# Dataformat — JSON, XML, CSV, BSON

Samma kundpost uttryckt i fyra olika format.

---

## JSON

```json
{
  "id": 1,
  "name": "Anna Andersson",
  "email": "anna@example.com",
  "address": {
    "street": "Storgatan 1",
    "city": "Stockholm",
    "zip": "11122"
  },
  "tags": ["vip", "premium"]
}
```

---

## XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<customer>
  <id>1</id>
  <name>Anna Andersson</name>
  <email>anna@example.com</email>
  <address>
    <street>Storgatan 1</street>
    <city>Stockholm</city>
    <zip>11122</zip>
  </address>
  <tags>
    <tag>vip</tag>
    <tag>premium</tag>
  </tags>
</customer>
```

---

## CSV

```csv
id,name,email,address_street,address_city,address_zip,tags
1,"Anna Andersson","anna@example.com","Storgatan 1","Stockholm","11122","vip;premium"
```

CSV kan inte representera nested data — adressen plattas ut till separata kolumner.

---

## BSON

BSON (Binary JSON) är Mongos lagringsformat — ett binärt format som ser ut ungefär så här konceptuellt:

```
\x16\x00\x00\x00               // Document size
\x10id\x00\x01\x00\x00\x00    // int32 id = 1
\x02name\x00\x10\x00\x00\x00Anna Andersson\x00
...
```

Du skriver aldrig BSON för hand — MongoDB sköter det automatiskt.

---

## Jämförelsetabell

| Funktion | JSON | XML | CSV | BSON |
|----------|------|-----|-----|------|
| **Läsbarhet** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ (binärt) |
| **Kompakthet** | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Nested data** | ✅ | ✅ | ❌ | ✅ |
| **Datatyper** | Begränsade | String-baserade | Inga | Rika (Date, ObjectId, etc.) |
| **Parsing-hastighet** | Snabb | Långsam | Mycket snabb | Mycket snabb |
| **Vanlig användning** | API:er, config | SOAP, äldre system | Excel, export | MongoDB |
