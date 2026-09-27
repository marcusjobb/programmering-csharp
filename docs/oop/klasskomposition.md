---
title: Klasskomposition
description: "En klass kan innehålla objekt av andra klasser som medlemmar — och bygga sitt beteende genom att delegera till dem, istället för att göra allt själv."
parent: Objektorienterad programmering (OOP)
nav_order: 5
---
# Klasskomposition

En klass behöver inte göra allt själv. Den kan innehålla objekt av andra klasser som medlemmar och delegera jobbet till dem. Det är klasskomposition: bygga en "har en"-relation mellan klasser, snarare än att skriva en enda klass som sväller för att den försöker göra för mycket.

## Ett exempel: en beställning som håller en kundvagn

```csharp
public class CartItem
{
    public string ProductName { get; }
    public decimal Price { get; }
    public int Quantity { get; set; }

    public CartItem(string productName, decimal price, int quantity)
    {
        ProductName = productName;
        Price = price;
        Quantity = quantity;
    }

    public decimal Total => Price * Quantity;
}

public class ShoppingCart
{
    private readonly List<CartItem> _items = new();

    public void Add(CartItem item) => _items.Add(item);

    public decimal Total => _items.Sum(item => item.Total);

    public void PrintReceipt()
    {
        foreach (var item in _items)
            Console.WriteLine($"{item.Quantity}x {item.ProductName} — {item.Total:C}");

        Console.WriteLine($"Summa: {Total:C}");
    }
}
```

```csharp
var cart = new ShoppingCart();
cart.Add(new CartItem("Kaffe", 89m, 2));
cart.Add(new CartItem("Croissant", 32m, 3));

cart.PrintReceipt();
```

### Output

```
2x Kaffe — 178,00 kr
3x Croissant — 96,00 kr
Summa: 274,00 kr
```

`ShoppingCart` innehåller en lista av `CartItem`-objekt, men **är** inte en `CartItem` — det finns inget arv här. `ShoppingCart` bara äger och samordnar sina `CartItem`-objekt. Det är hela idén med komposition: separera ansvaret så att `CartItem` vet hur man räknar sin egen totalsumma, medan `ShoppingCart` vet hur man håller reda på flera av dem och summerar helheten.

## Varför inte en enda stor klass?

Alternativet — allt i en klass — fungerar tekniskt:

```csharp
public class MonolithicCart
{
    private List<string> _names = new();
    private List<decimal> _prices = new();
    private List<int> _quantities = new();
    // ... och metoder som håller reda på vilket index hör ihop med vilket
}
```

Tre parallella listor som måste hållas synkroniserade för hand är en klassisk källa till buggar — lägg till ett objekt i `_names` men glöm `_prices`, och du har redan ett inkonsekvent tillstånd. Med `CartItem` som egen klass hänger namn, pris och antal ihop av sig själva — det finns inget sätt att råka ha dem osynkade.

## Delegering — komposition i praktiken

Ofta betyder komposition att den yttre klassen bara **vidarebefordrar** anrop till sina delar istället för att implementera logiken själv:

```csharp
public class Engine
{
    public void Start() => Console.WriteLine("Motorn startar.");
}

public class Radio
{
    public void TurnOn() => Console.WriteLine("Radion spelar musik.");
}

public class Car
{
    private readonly Engine _engine = new();
    private readonly Radio _radio = new();

    public void Start()
    {
        _engine.Start();
        _radio.TurnOn();
    }
}
```

`Car.Start()` gör inget själv — den ber sina delar göra sitt jobb. `Car` känner till *att* den har en motor, inte *hur* motorn faktiskt startar. Den detaljen är inkapslad i `Engine`.

## Komposition vs arv — vilken hör hit?

Klasskomposition (den här sidan) och [Komposition över arv](compbeforeinherit.md) svarar på två olika frågor:

- **Den här sidan:** "Hur bygger jag en klass av mindre, samarbetande delar?" — en generell teknik, oavsett om arv alls är inblandat.
- **Komposition över arv:** "Jag överväger att ärva för att återanvända beteende — är komposition ett bättre val här?" — ett specifikt designbeslut när alternativet är en klasshierarki.

I praktiken används de tillsammans hela tiden: `ShoppingCart` ovan har ingen arvshierarki att välja bort — den är bara byggd av delar, vilket är precis vad komposition handlar om i grunden.

## Obligatorisk dad-joke

Varför var kundvagnen så bra på lagarbete?

Den lät varje `CartItem` sköta sin egen totalsumma.
