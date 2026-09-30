---
title: Union-typer
description: "Union-typer (discriminated unions) i OOP — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Objektorienterad programmering (OOP)
nav_order: 69
---
# Union-typer

En union-typ är en typ som alltid är exakt ett av ett känt antal alternativ. Kompilatorn vet alla möjliga alternativ och kan kontrollera att du hanterat dem alla i en `switch`.

## När du läst detta ska du kunna

- Deklarera en union-typ med `union` och `case`
- Använda mönstermatchning mot en union-typ
- Förklara varför union-typer är bättre än arv för den här typen av modellering
- Läsa kompilatorfel när ett alternativ saknas

## Syntax

```csharp
public union Result
{
    case Success(string Data);
    case Error(int Code, string Message);
}
```

Varje `case` är ett alternativ. En `Result` är antingen `Success` eller `Error` — aldrig något annat, aldrig `null`.

## Skapa och använda

```csharp
Result ok    = new Result.Success("Sparad!");
Result fail  = new Result.Error(404, "Hittades inte");
```

### Mönstermatchning

```csharp
void PrintResult(Result result)
{
    switch (result)
    {
        case Result.Success(var data):
            Console.WriteLine($"OK: {data}");
            break;
        case Result.Error(var code, var message):
            Console.WriteLine($"Fel {code}: {message}");
            break;
    }
}
```

Kompilatorn kontrollerar att alla case är täckta. Om du lägger till ett nytt alternativ i unionen och glömmer att hantera det i en `switch` — kompileringsfel.

## Praktiskt exempel — HTTP-svar

```csharp
public union HttpResult
{
    case Ok(string Body);
    case NotFound(string Url);
    case ServerError(int StatusCode, string Detail);
    case Unauthorized();
}
```

```csharp
HttpResult Fetch(string url)
{
    if (url.StartsWith("https://"))
        return new HttpResult.Ok("<html>...</html>");

    return new HttpResult.NotFound(url);
}

var result = Fetch("http://exempel.se");

string message = result switch
{
    HttpResult.Ok(var body)                   => $"Svar: {body[..20]}",
    HttpResult.NotFound(var url)              => $"Sidan saknas: {url}",
    HttpResult.ServerError(var code, var msg) => $"Serverfel {code}: {msg}",
    HttpResult.Unauthorized()                 => "Logga in först"
};

Console.WriteLine(message);
```

### Output

```
Sidan saknas: http://exempel.se
```

## Jämförelse med arv

Samma modellering med arv kräver mer kod och kompilatorn kan inte kontrollera att alla fall är täckta:

```csharp
// Med arv — kompilatorn kan inte garantera uttömlighet
abstract class Result { }
class Success(string Data) : Result;
class Error(int Code, string Message) : Result;

// switch behöver ett default-fall
Result r = GetResult();
string msg = r switch
{
    Success s => s.Data,
    Error e   => e.Message,
    _         => throw new Exception("Okänd typ") // nödvändigt men meningslöst
};
```

Med union-typer är `_`-fallet onödigt och kompilatorn flaggar det om du ändå skriver det.

## case utan parametrar

En case kan vara tom — ett rent tillstånd utan data:

```csharp
public union LoginState
{
    case LoggedOut();
    case LoggingIn();
    case LoggedIn(string Username, string Token);
    case SessionExpired(string Username);
}
```

## TL;DR

```csharp
// Deklaration
public union Shape
{
    case Circle(double Radius);
    case Rectangle(double Width, double Height);
    case Triangle(double Base, double Height);
}

// Användning med exhaustive matching
double Area(Shape shape) => shape switch
{
    Shape.Circle(var r)         => Math.PI * r * r,
    Shape.Rectangle(var w, var h) => w * h,
    Shape.Triangle(var b, var h)  => b * h / 2
};
```

Union-typer passar bäst när ett värde alltid är ett av ett känt antal alternativ och du vill ha kompilatorgarantier att alla alternativ hanteras.
