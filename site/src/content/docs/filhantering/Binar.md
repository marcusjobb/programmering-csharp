---
title: Binär
description: "Binär i Filhantering — C#-boken av Marcus Ackre Medina"
layout: default
parent: Filhantering
nav_order: 10
---
## Binär

Vi ska nu utforska hur man skapar och läser binära filer i C#. Det är faktiskt ganska coolt!


## Beskrivning

Binära filer är filer som består av bytes. Istället för att spara data som text, kan vi spara allt möjligt i dessa filer. Till exempel kan vi spara bilder, ljudfiler eller en lista med objekt. Detta ger oss stora möjligheter att lagra och hantera olika typer av data på ett effektivt sätt.

## Exempel

Här är ett exempel som visar hur man skapar och läser en binär fil med hjälp av C#:

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

public class Program
{
    public static void Main(string[] args)
    {
        // Skapa en lista med objekt
        List<Person> persons = new List<Person>()
        {
            new Person() { Name = "Bruce Willis", Age = 32 },
            new Person() { Name = "Bonnie Bedelia", Age = 39 },
            new Person() { Name = "Alan Rickman", Age = 42 },
        };

        // Skapa en binär formatterare
        BinaryFormatter formatter = new BinaryFormatter();

        // Skapa en filström för att skriva till binärfilen
        using (FileStream stream = new FileStream("diehard.bin", FileMode.Create))
        {
            // Serialisera och spara listan med personer i filen
            formatter.Serialize(stream, persons);
        }

        // Skapa en filström för att läsa från binärfilen
        using (FileStream stream = new FileStream("diehard.bin", FileMode.Open))
        {
            // Deserialisera och läs in listan med personer från filen
            List<Person> personsFromFile = (List<Person>)formatter.Deserialize(stream);

            // Nu kan vi göra vad vi vill med datan från filen!
            foreach (var person in personsFromFile)
            {
                Console.WriteLine($"Namn: {person.Name}, Ålder: {person.Age}");
            }
        }

        Console.WriteLine("Hur coolt är inte det? Vi kan spara och läsa binära filer!");

        Console.ReadLine();
    }
}
```

I exemplet skapar vi en lista med personobjekt och fyller den med några exempelobjekt. Sedan skapar vi en binär formatterare (`BinaryFormatter`) som möjliggör serialisering och deserialisering av objekt till och från binära filer.

Vi använder `FileStream` för att skapa en filström som ska användas för att skriva och läsa från filen "diehard.bin". Vi använder `FileMode.Create` för att skapa filen om den inte redan finns, eller ersätta den om den redan existerar.

För att spara objekten i filen, används `Serialize`-metoden för att serialisera listan med personer och skriva den till filströmmen.

För att läsa objekten från filen använder vi `Deserialize`-metoden för att deserialisera data från filströmmen till en ny lista med personer.

Slutligen, i slutet av programmet, skriver vi ut informationen om personerna från den inlästa listan.

Nu kan vi använda detta fantastiska verktyg för att spara och läsa binära filer i C#. Hur coolt är inte det?

## Slutsats

Att kunna skapa och läsa binära filer ger oss möjlighet att lagra och hantera olika typer av data på ett flexibelt sätt. Genom att använda `BinaryFormatter` kan vi enkelt serialisera och deserialisera objekt till och från binära filer. Detta gör det möjligt att spara och hämta data som bilder, ljudfiler eller andra komplexa datastrukturer. Så nästa gång du behöver spara eller läsa in binära filer i C#, vet du nu hur du kan göra det på ett enkelt och effektivt sätt!

## Obligatorisk Dad-joke

Vet du vad som är binärens favoritdryck?

Byte-kaffe! ☕️
