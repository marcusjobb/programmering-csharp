---
title: Private
description: "Private är en åtkomstmoderator som gör att en klassmedlem endast är tillgänglig för den klass där den är deklarerad."
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Åtkomstmoderator
nav_order: 20
---
# Private

Private är en åtkomstmoderator som gör att en klassmedlem endast är tillgänglig för den klass där den är deklarerad.

## Beskrivning

Vi kan använda private för att göra en klassmedlem endast tillgänglig för den klass där den är deklarerad. Detta är bra om vi vill att en klassmedlem endast ska vara tillgänglig för den klass där den är deklarerad och inte för någon annan klass.

## Exempel

Låt oss titta på ett exempel där vi använder private för att göra en klassmedlem endast tillgänglig för den klass där den är deklarerad:

```csharp
public class Person
{
    private string Name { get; set; }
    private int Age { get; set; }
}
```

I detta exempel har vi en klass som heter Person. Vi har också två egenskaper, Name och Age. Båda är privata, vilket innebär att de endast är tillgängliga för klassen Person. Även om Name och Age borde vara tillgängliga för alla klasser som länkar sig till denna, kommer de inte att vara tillgängliga för någon annan klass på grund av att de är privata.

Vilket iofs är lite konstigt, eftersom vi inte kan använda dem i klassen Person heller. Vi kan inte ens använda dem i en konstruktor i Person-klassen. Detta beror på att privata medlemmar endast är tillgängliga för den klass där de är deklarerade.

LOL

Jaja det är ju bara ett exempel.
