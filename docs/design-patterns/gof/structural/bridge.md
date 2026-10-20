---
title: Bridge
description: "Har du två hierarkier som är beroende av varandra (t.ex. olika fjärrkontroller × olika apparater) växer antalet klasser explosivt om du försöker…"
parent: "Strukturmönster (Structural)"
nav_order: 20
---

# Bridge

## Problemet

Har du två hierarkier som är beroende av varandra (t.ex. olika fjärrkontroller × olika apparater) växer antalet klasser explosivt om du försöker representera varje kombination som en egen klass — `TVRemote`, `RadioRemote`, `TVAdvancedRemote`, `RadioAdvancedRemote`... Bridge separerar de två hierarkierna så de kan variera var för sig.

## Lösningen

```csharp
public interface IDevice
{
    void TurnOn();
    void TurnOff();
}

public class TV : IDevice
{
    public void TurnOn()  => Console.WriteLine("TV: På");
    public void TurnOff() => Console.WriteLine("TV: Av");
}

public class Radio : IDevice
{
    public void TurnOn()  => Console.WriteLine("Radio: På");
    public void TurnOff() => Console.WriteLine("Radio: Av");
}

// Abstraktionen — bryggan till IDevice, inte en specifik apparat
public abstract class RemoteControl
{
    protected IDevice _device;
    protected RemoteControl(IDevice device) => _device = device;

    public abstract void TogglePower();
}

public class BasicRemote : RemoteControl
{
    public BasicRemote(IDevice device) : base(device) { }
    public override void TogglePower() => _device.TurnOn();
}
```

```csharp
RemoteControl fjärr = new BasicRemote(new TV());
fjärr.TogglePower();   // TV: På

RemoteControl radioFjärr = new BasicRemote(new Radio());
radioFjärr.TogglePower();   // Radio: På
```

`RemoteControl` (abstraktionen) och `IDevice` (implementationen) kan nu utökas var för sig — en ny `SmartRemote` eller en ny `SmartLamp` kräver ingen ändring i den andra hierarkin.

## TL;DR

Bridge håller "vad du gör" (abstraktionen) och "hur det faktiskt utförs" (implementationen) i två separata, oberoende hierarkier istället för en enda som växer exponentiellt.
