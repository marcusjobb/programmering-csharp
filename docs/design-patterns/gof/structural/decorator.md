---
title: Decorator
description: "Du vill lägga till extra funktionalitet på ett objekt — men arv skulle ge dig en explosion av underklasser för varje kombination (EmailNotifier…"
parent: "Strukturmönster (Structural)"
nav_order: 40
---

# Decorator

## Problemet

Du vill lägga till extra funktionalitet på ett objekt — men arv skulle ge dig en explosion av underklasser för varje kombination (`EmailNotifier`, `EmailWithSmsNotifier`, `EmailWithSmsWithPushNotifier`...).

## Lösningen

```csharp
public interface INotifier
{
    void Send(string message);
}

public class EmailNotifier : INotifier
{
    public void Send(string message) => Console.WriteLine($"E-post: {message}");
}

// Decorator — omsluter en INotifier, lägger till egen logik, skickar vidare
public abstract class NotifierDecorator : INotifier
{
    protected readonly INotifier _wrapped;
    protected NotifierDecorator(INotifier wrapped) => _wrapped = wrapped;

    public virtual void Send(string message) => _wrapped.Send(message);
}

public class SmsDecorator : NotifierDecorator
{
    public SmsDecorator(INotifier wrapped) : base(wrapped) { }

    public override void Send(string message)
    {
        base.Send(message);               // Skicka vidare till det inslagna objektet
        Console.WriteLine($"SMS: {message}");   // Lägg till egen funktionalitet
    }
}
```

```csharp
INotifier notifier = new SmsDecorator(new EmailNotifier());
notifier.Send("Din beställning har skickats.");
// E-post: Din beställning har skickats.
// SMS: Din beställning har skickats.
```

Vill du lägga till Push-notiser också, skriv en `PushDecorator` och wrappa in ytterligare ett lager — ingen befintlig kod ändras, och kombinationerna byggs vid körning istället för att vara fastlåsta i en klasshierarki.

## Inbyggt i .NET

Det här är exakt hur `Stream`-klasserna i .NET fungerar:

```csharp
Stream stream = new FileStream("data.txt", FileMode.Open);
stream = new GZipStream(stream, CompressionMode.Decompress);   // Wrappar in — lägger till dekomprimering
stream = new CryptoStream(stream, decryptor, CryptoStreamMode.Read);   // Wrappar in igen — lägger till dekryptering
```

Varje lager omsluter det förra och lägger till en egen funktion, precis som `SmsDecorator` gjorde ovan.

## TL;DR

Decorator wrappar ett objekt i ett annat objekt med samma interface, lägger till beteende, och skickar vidare — funktionalitet byggs upp genom att kombinera lager vid körning, inte genom en fast klasshierarki. `Stream`-wrappning i .NET är samma mönster.
