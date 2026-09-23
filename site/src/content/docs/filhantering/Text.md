---
title: Textfiler
description: "Textfiler i Filhantering — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Filhantering
nav_order: 110
---
# Textfiler

Textfiler är en vanlig filtyp som används för att lagra text. Det är ett textbaserat filformat som används för att lagra data rent allmänt.
<details open markdown="block">
  <summary>
    Innehållsförteckning
  </summary>
  {: .text-delta }

1. TOC
{:toc}

</details>

## Skapa en textfil

Hur man skapar en textfil i C#

```csharp
string contents="Goodmorning Mr Bond! I have a message for you.";
string fileName="Message.txt";
File.WriteAllText(filename, contents);
```

## Läs in en textfil

```csharp
string contents = File.ReadAllText("Message.txt");
```

## Spara en lista i en textfil

```csharp
List<string> names = new List<string>();
names.Add("Picard");
names.Add("Janeway");
names.Add("Kirk");
names.Add("Sisko");
names.Add("Archer");
File.WriteAllLines("names.txt", names);
```

## Läs in en lista från en textfil

```csharp
List<string> names = File.ReadAllLines("names.txt").ToList();
```

## Kodförklaring

### File.WriteAllText

Skriver en sträng till en fil. Om filen inte finns skapas den. Om filen finns skrivs den över.

### File.ReadAllText

Läser in en fil och returnerar innehållet som en sträng.

### File.WriteAllLines

Skriver en lista till en fil. Varje element i listan hamnar på en egen rad.

### File.ReadAllLines

Läser in en fil och returnerar innehållet som en lista. Varje rad i filen hamnar på en egen plats i listan.

### List<string>

En vanlig generisk lista som innehåller strängar.
