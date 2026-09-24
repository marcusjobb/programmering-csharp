---
title: Delegater
description: "Delegater är en typ av referenstyp som kan användas för att referera till metoder med en viss signatur. Detta gör det möjligt för oss att skapa metoder…"
parent: Objektorienterad programmering (OOP)
nav_order: 20
has_children: True
---
# Delegater

Delegater är en typ av referenstyp som kan användas för att referera till metoder med en viss signatur. Detta gör det möjligt för oss att skapa metoder som kan ta emot andra metoder som argument. Detta är användbart när vi vill skapa metoder som kan användas för att utföra olika uppgifter beroende på vilken metod som skickas in som argument.

Knasigt va! Du kan skicka metoder som argument till andra metoder. Detta är användbart när du vill skapa metoder som kan användas för att utföra olika uppgifter beroende på vilken metod som skickas in som argument. Hur coolt är inte det?

## Exempel

Låt oss titta på ett exempel där vi använder en delegat för att skicka en metod som argument till en annan metod:

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        // Skapa en delegat som tar en sträng som argument.
        // Vi använder nyckelordet delegate för att skapa en delegat.
        PrintDelegate printDelegate = Print;

        // Anropa metoden som tar en delegat som argument.
        printDelegate("Hello World!");
    }

    // Skapa en Delegate som tar en sträng som argument.
    delegate void PrintDelegate(string message);

    // Skapa en metod som tar en delegat som argument.
    static void Print(string message)
    {
        Console.WriteLine(message);
    }
}
```

I detta exempel har vi en delegat som heter PrintDelegate. Vi använder nyckelordet delegate för att skapa en delegat. Vi har också en metod som heter Print. Denna metod tar en sträng som argument och skriver ut den till konsolen.


- [Delegates](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/delegates/)
- [Delegates W3Schools](https://www.w3schools.com/cs/cs_delegates.asp)
- [Jeremybytes Delegates](https://www.youtube.com/watch?v=v6Zb0nD7PHA&list=PLdbkZkVDyKZVvizO94tJNmTfRzXWGDFZ3)
