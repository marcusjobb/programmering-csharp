---
title: Proxy
description: "Du vill lägga till kontroll innan ett objekt faktiskt nås — t.ex. skjuta upp en dyr initiering tills den verkligen behövs (lazy loading), eller…"
parent: "Strukturmönster (Structural)"
nav_order: 70
---

# Proxy

## Problemet

Du vill lägga till kontroll innan ett objekt faktiskt nås — t.ex. skjuta upp en dyr initiering tills den verkligen behövs (lazy loading), eller kontrollera behörighet innan åtkomst tillåts.

## Lösningen

```csharp
public interface IImage
{
    void Display();
}

// Det riktiga, dyra objektet
public class RealImage : IImage
{
    private readonly string _filnamn;

    public RealImage(string filnamn)
    {
        _filnamn = filnamn;
        LoadFromDisk();   // Dyr operation — vill undvikas tills den faktiskt behövs
    }

    private void LoadFromDisk() => Console.WriteLine($"Laddar {_filnamn} från disk...");
    public void Display() => Console.WriteLine($"Visar {_filnamn}");
}

// Proxyn — samma interface, men skjuter upp den dyra delen
public class ImageProxy : IImage
{
    private readonly string _filnamn;
    private RealImage? _realImage;   // Skapas inte förrän den behövs

    public ImageProxy(string filnamn) => _filnamn = filnamn;

    public void Display()
    {
        _realImage ??= new RealImage(_filnamn);   // Lazy loading — laddas första gången Display() anropas
        _realImage.Display();
    }
}
```

```csharp
IImage bild = new ImageProxy("stor_bild.jpg");
Console.WriteLine("Proxyn skapad — inget laddat än");

bild.Display();   // Först HÄR laddas filen faktiskt
```

Anroparen ser bara `IImage` — den vet aldrig om den pratar med den riktiga bilden eller en proxy som skjuter upp arbetet.

## Liknelsen — en webbproxy

En vanlig webbproxy gör samma sak för nätverkstrafik: agerar mellanhand mellan dig och servern, och kan lägga till cache, loggning eller säkerhetskontroller utan att varken klienten eller servern märker det.

## TL;DR

Proxy har samma gränssnitt som det riktiga objektet men lägger till kontroll — lazy loading, behörighetskontroll, loggning — innan (eller istället för) att faktiskt nå det. Anroparen märker aldrig skillnaden.
