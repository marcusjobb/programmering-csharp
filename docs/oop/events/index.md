---
title: Events
description: "En händelse en klass sänder ut, som andra delar av koden kan välja att lyssna på — utan att klassen som sänder behöver veta vem som lyssnar."
parent: Objektorienterad programmering (OOP)
nav_order: 20
has_children: True
---
# Events

Ett event är en signal en klass skickar ut när något hänt — och andra delar av koden kan prenumerera på den signalen utan att klassen som skickar den vet eller bryr sig om vem som lyssnar. Det bygger vidare på [Delegater](../delegater/index.md): ett event är i grunden en delegat, bara med extra regler för hur den får användas utifrån.

## När du läst detta ska du kunna

- Deklarera ett event med `EventHandler`
- Utlösa ett event från insidan av klassen
- Prenumerera på ett event utifrån med `+=`
- Förklara varför events är säkrare än publika delegater

## Ett exempel — en hjälte som levlar upp

```csharp
public class Hero
{
    public event EventHandler? LevelUp;
    public event EventHandler? Died;

    public int Level { get; private set; } = 1;
    public int XP { get; private set; }
    public int MaxXP => Level * 100;

    public void IncreaseXP(int amount)
    {
        XP += amount;

        if (XP >= MaxXP)
        {
            Level++;
            LevelUp?.Invoke(this, EventArgs.Empty);
        }
    }

    public void Die() => Died?.Invoke(this, EventArgs.Empty);
}
```

```csharp
Hero hero = new();
hero.LevelUp += (sender, e) => Console.WriteLine("Hjälten har nått en ny nivå!");
hero.Died    += (sender, e) => Console.WriteLine("Hjälten har dött!");

hero.IncreaseXP(100);
hero.Die();
```

### Output

```
Hjälten har nått en ny nivå!
Hjälten har dött!
```

`Hero` vet ingenting om vad som händer när `LevelUp` utlöses — den bara skickar signalen. Koden som lyssnar bestämmer vad "levla upp" faktiskt innebär: skriva ut ett meddelande, spela ett ljud, spara framsteg. `Hero`-klassen behöver aldrig ändras för att lägga till en ny reaktion.

## Varför inte en vanlig publik delegat?

Du skulle kunna göra `LevelUp` till en publik `Action` istället för ett event. Skillnaden är vad omvärlden får göra med den:

```csharp
public Action? LevelUpAction;      // publik delegat — vem som helst kan skriva över ALLA lyssnare
public event EventHandler? LevelUp; // event — utifrån får du bara += och -=
```

Med en publik delegat kan yttre kod råka skriva `hero.LevelUpAction = NyMetod;` och därmed radera alla tidigare prenumeranter av misstag. Ett `event` tillåter bara `+=` och `-=` utifrån — du kan lägga till och ta bort din egen lyssnare, men aldrig rensa andras eller anropa det direkt (`LevelUp.Invoke(...)` utifrån klassen kompilerar inte). Det är precis den typen av skydd som gör events till rätt val när signalen ska vara publik.

## Obligatorisk dad-joke

Varför är events så bra på fester?

De vet exakt när något värt att fira händer, utan att behöva fråga.
