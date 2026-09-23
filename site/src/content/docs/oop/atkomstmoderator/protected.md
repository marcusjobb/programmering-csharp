---
title: Protected
description: "Protected i Åtkomstmoderator — C#-boken av Marcus Ackre Medina"
layout: default
parent: Åtkomstmoderator
nav_order: 30
---
# Protected

Protected är en åtkomstmoderator som gör att en klass, metod eller egenskap är tillgänglig för klassen den är deklarerad i och alla klasser som ärver från den.

## Beskrivning

När vi arbetar med Polymorfism kan det vara bra att göra en metod eller egenskap tillgänglig för alla klasser som ärver från en klass. Detta gör vi genom att använda protected.
Protected är som private för alla klasser, utom den som ärver. Klasser kan inte ärva private medlemmar, så detta är det bästa alternativet.

## Exempel

```csharp
using System;

class Person
{
    protected string Name { get; set; }

}

class Student : Person
{
    public Student(string name)
    {
        Name = name;
    }

    public void PrintInfo()
    {
        Console.WriteLine("Student Info: " + Name);
    }
}
```

## Förklaring

I exemplet ovan är Namn propertyn i klassen person låst för alla utom för ärvande klasser, detta gör att Student kan lägga till ett namn och skriva ut det, när inga andra klasser kan.

- [Microsoft - Protected (C# Reference)](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/protected)
