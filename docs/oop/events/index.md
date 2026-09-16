---
title: Events
layout: default
author: Campus Mölndal
author_github: CampusMolndalEducation
author_url: "https://github.com/CampusMolndalEducation"
school: Campus Mölndal
date: "2025-08-18 15:37:40"
updated: "2025-09-06 23:35:21"
parent: Objektorienterad programmering (OOP)
nav_order: 20
has_children: True
---
# Events

I denna överblick kommer vi att utforska konceptet events i C#. Events är en funktion som låter oss reagera på händelser som inträffar under körningen av vårt program.

## Vad är Events?

Events kan ses som en mekanism för att anropa metoder när något specifikt händer i programmet. Istället för att använda if-satser eller liknande för att kontrollera och reagera på olika scenarier, kan vi definiera events som triggas när en händelse uppstår.

En händelse kan vara något som att en knapp klickas, en fil ändras, en timer slår till eller ett objekt uppdateras. Genom att använda events kan vi separera logiken för att hantera händelsen från den del av koden som utlöser händelsen.

## Användningsområden för Events

Events kan vara till nytta i en mängd olika scenarier, inklusive:

1. Grafiska användargränssnitt (GUI): I GUI-applikationer kan events användas för att hantera händelser som knappklickar, musinmatning eller fönsterfokusändringar.

2. Spelprogrammering: I spel kan events användas för att hantera händelser som spelarens interaktion, karaktärsdöd eller nivåuppgradering.

3. Multitrådad programmering: I flertrådade applikationer kan events användas för att synkronisera och kommunicera mellan olika trådar.

4. Kommunikation med externa enheter: Events kan användas för att hantera händelser som inträffar vid kommunikation med externa enheter eller system, t.ex. sensorer eller nätverksanslutningar.

## Kodexempel

För att ge dig en bättre förståelse för hur events fungerar i C#, låt oss titta på ett exempel:

```csharp
public class Hero
{
    public event EventHandler LevelUp;
    public event EventHandler Died;

    public int Level { get; set; } = 1;
    public int XP { get; set; }
    public int MaxXP { get => Level * 100; }

    public void IncreaseXP(int amount)
    {
        XP += amount;

        if (XP >= MaxXP)
        {
            Level++;
            OnLevelUp();
        }
    }

    public void Die()
    {
        OnDied();
    }

    private void OnLevelUp()
    {
        LevelUp?.Invoke(this, EventArgs.Empty);
    }

    private void OnDied()
    {
        Died?.Invoke(this, EventArgs.Empty);
    }
}

public class Program
{
    public static void Main()
    {
        Hero hero = new Hero();
        hero.LevelUp += OnLevelUp;
        hero.Died += OnDied;

        hero.IncreaseXP(100);
        hero.Die();
    }

    private static void OnLevelUp(object sender, EventArgs e)
    {
        Console.WriteLine("Hjälten har nått en ny nivå!");
    }

    private static void OnDied(object sender, EventArgs e)
    {
        Console.WriteLine("Hjälten har dött!");
    }
}
```

I detta exempel har vi en klass som heter `Hero`, som representerar en spelkaraktär. Klassen har två events, `LevelUp` och `Died`, som utlöses när hjälten når en ny nivå eller dör.

När hjältens erfarenhetspoäng (`XP`) ökar, kontrolleras om XP överstiger det maximala värdet (`MaxXP`). Om så är fallet, ökar hjältens nivå och eventet `LevelUp` utlöses. På samma sätt, när hjältens hälsopoäng (`HP`) når 0 eller mindre, utlöses eventet `Died`.

I `Program`-klassen skapar vi en instans av `Hero` och prenumererar på eventen genom att lägga till metoder `OnLevelUp` och `OnDied` i respektive eventlista. När vi sedan ökar hjältens XP eller simulerar dess död, kommer de tillhörande metoderna att anropas och en meddelandetext skrivs ut i konsolen.

Detta är bara ett grundläggande exempel för att illustrera hur events kan användas. I praktiken kan de vara mycket kraftfulla och användas för att skapa interaktion och dynamik i programmet.

## Summering

Events i C# möjliggör reaktioner på händelser under programkörningen. Genom att separera händelsehanteringen från den del av koden som utlöser händelsen, kan vi skapa mer modulära och underhållbara program. Events kan användas i olika scenarier, inklusive GUI-programmering, spelutveckling och multitrådad programmering. Genom att följa principerna om ren kod (Clean Code) kan vi skriva läsbar och effektiv kod som är lätt att förstå och underhålla.
