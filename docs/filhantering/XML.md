---
title: XML
description: "XML i Filhantering — C#-boken av Marcus Ackre Medina"
layout: default
author: Campus Mölndal
author_github: CampusMolndalEducation
author_url: "https://github.com/CampusMolndalEducation"
school: Campus Mölndal
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Filhantering
nav_order: 120
---
# XML

XML (Extensible Markup Language) är ett filformat som används för att lagra data i en strukturerad form.
<details open markdown="block">
  <summary>
    Innehållsförteckning
  </summary>
  {: .text-delta }

1. TOC
{:toc}

</details>

## Beskrivning

XML används för att beskriva en struktur som datan lagrats i. Den har olika taggar som beskriver innehållet. Den kan även innehålla rådata som bilder och Pdf filer.

## Exempel

```xml
<?xml version="1.0" encoding="UTF-8"?>
<people>
    <person>
        <name>Clark Kent</name>
        <age>32</age>
    </person>
    <person>
        <name>Bruce Wayne</name>
        <age>35</age>
    </person>
</people>
```

## Hur man läser XML i Csharp

```csharp
string file="myfile.xml";
XmlDocument doc = new XmlDocument();
doc.Load(file);
XmlNodeList people = doc.GetElementsByTagName("person");
foreach (XmlNode person in people)
{
    string name = person["name"].InnerText;
    string age = person["age"].InnerText;
    string alias = person["alias"].InnerText;
    Console.WriteLine(name + " " + alias + " " + age);
}
```

## Hur man sparar XML i Csharp

```csharp
class people
{
    public int id { get; set; }
    public string name { get; set; }
    public string alias { get; set; }
    public int age { get; set; }
}
// Create a list of people
List<people> people = new List<people>();
people.Add(new people() { id = 1, name = "Clark Kent", alias = "Superman", age = 35 });
people.Add(new people() { id = 2, name = "Bruce Wayne", alias = "Batman", age = 40 });
people.Add(new people() { id = 3, name = "Barry Allen", alias = "Flash", age = 25 });
// Create XML document
XmlDocument doc = new XmlDocument();
XmlDeclaration xmlDeclaration = doc.CreateXmlDeclaration("1.0", "UTF-8", null);
XmlElement root = doc.DocumentElement;
doc.InsertBefore(xmlDeclaration, root);
// Create people element
XmlElement peopleElement = doc.CreateElement(string.Empty, "people", string.Empty);
doc.AppendChild(peopleElement);
// Create person elements
foreach (people person in people)
{
    XmlElement personElement = doc.CreateElement(string.Empty, "person", string.Empty);
    peopleElement.AppendChild(personElement);
    XmlElement nameElement = doc.CreateElement(string.Empty, "name", string.Empty);
    XmlText nameText = doc.CreateTextNode(person.name);
    nameElement.AppendChild(nameText);
    personElement.AppendChild(nameElement);
    XmlElement ageElement = doc.CreateElement(string.Empty, "age", string.Empty);
    XmlText ageText = doc.CreateTextNode(person.age.ToString());
    ageElement.AppendChild(ageText);
    personElement.AppendChild(ageElement);
}
// Save XML file
doc.Save("people.xml");
```

## Kodförklaring

### XmlNodeList

XmlNodeList är en lista av noder. Det är en lista av alla noder som har taggen "person".

### XmlNode

XmlNode är en nod i XML dokumentet. Det är en nod som har taggen "person".

### person["name"]

Det är en nod som har taggen "person".

### person["name"].InnerText

Texten som finns mellan taggarna

### XMLElement

XmlElement är en nod som har taggen "person".

### XmlText

XmlText är texten som finns mellan taggarna.

### XmlDocument

XmlDocument är hela XML dokumentet.

### XmlDeclaration

Det är den första raden i XML dokumentet. Den innehåller versionen av XML dokumentet, teckenkodningen och om det är standalone eller inte.

### CreateXmlDeclaration

Skapar en XmlDeclaration.

### CreateElement

Skapar en XmlElement.

### CreateTextNode

Skapar en XmlText.

### Appendchild

Lägger till en nod som barn till en annan nod.
