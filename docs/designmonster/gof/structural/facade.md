---
title: Facade
description: "Ett subsystem (t.ex. att spara till en databas: öppna anslutning, starta transaktion, köra fråga, hantera fel, committa, stänga anslutning) har många steg…"
parent: "Strukturmönster (Structural)"
nav_order: 50
---

# Facade

## Problemet

Ett subsystem (t.ex. att spara till en databas: öppna anslutning, starta transaktion, köra fråga, hantera fel, committa, stänga anslutning) har många steg som måste göras i rätt ordning. Att kräva att varje anropare känner till alla steg är sköra och upprepande.

## Lösningen

```csharp
// Det komplexa subsystemet — flera klasser, flera steg
public class DatabaseConnection { public void Open() => Console.WriteLine("Ansluter..."); public void Close() => Console.WriteLine("Stänger..."); }
public class TransactionManager { public void Begin() => Console.WriteLine("Startar transaktion..."); public void Commit() => Console.WriteLine("Committar..."); }
public class QueryExecutor { public void Execute(string sql) => Console.WriteLine($"Kör: {sql}"); }

// Facade — döljer alla stegen bakom en enda metod
public class DatabaseFacade
{
    private readonly DatabaseConnection _connection = new();
    private readonly TransactionManager _transaction = new();
    private readonly QueryExecutor _executor = new();

    public void SparaKund(string sql)
    {
        _connection.Open();
        _transaction.Begin();
        _executor.Execute(sql);
        _transaction.Commit();
        _connection.Close();
    }
}
```

```csharp
var db = new DatabaseFacade();
db.SparaKund("INSERT INTO Kunder ...");   // Anroparen ser bara ETT anrop
```

Du har redan sett det här mönstret i praktiken — `DbContext` i [Entity Framework](../../../entityframework/index.md) *är* en facade framför hela ADO.NET:s anslutnings- och kommandologik.

## TL;DR

Facade samlar interaktionen med ett komplext subsystem bakom ett litet, enkelt gränssnitt — subsystemets komplexitet finns kvar, men bara facaden behöver känna till den.
