---
title: Dependency Injection
description: "ASP.NET Core har en dependency injection-container inbyggd från grunden — du behöver inte lägga till något separat bibliotek för att komma igång. Se…"
parent: ASP.net Core
nav_order: 15
---

# Dependency Injection

ASP.NET Core har en dependency injection-container inbyggd från grunden — du behöver inte lägga till något separat bibliotek för att komma igång. Se [Dependency Inversion](../designmonster/repository-dependency-inversion.md) för principen bakom, den här sidan handlar om själva mekaniken.

## När du läst detta ska du kunna

- Registrera en service i containern
- Förklara skillnaden mellan `AddScoped`, `AddSingleton` och `AddTransient`
- Ta emot en registrerad service via constructor injection

## Registrera och injicera

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IKundRepository, EfKundRepository>();

var app = builder.Build();
```

```csharp
public class KundController : ControllerBase
{
    private readonly IKundRepository _repo;

    // Containern skickar in rätt implementation automatiskt
    public KundController(IKundRepository repo)
    {
        _repo = repo;
    }
}
```

Du skriver aldrig `new EfKundRepository()` i `KundController`. När ASP.NET Core skapar en `KundController` för att hantera en förfrågan, ser den att konstruktorn vill ha en `IKundRepository`, kollar i containern, och skickar in den registrerade implementationen. Det här är precis mekaniken som beskrevs som "Dependency Injection" på sidan om Dependency Inversion.

## De tre livslängderna

Skillnaden mellan `Add`-metoderna är **hur länge samma instans lever**:

```csharp
builder.Services.AddTransient<IEmailSender, SmtpEmailSender>();
builder.Services.AddScoped<IKundRepository, EfKundRepository>();
builder.Services.AddSingleton<ICacheService, MemoryCacheService>();
```

| Metod | Ny instans skapas | Använd för |
|---|---|---|
| `AddTransient` | Varje gång servicen efterfrågas | Lätta, tillståndslösa tjänster — t.ex. en e-postavsändare |
| `AddScoped` | En gång per HTTP-förfrågan, delas inom den | Databaskontext, repositories — samma `DbContext` för hela förfrågan |
| `AddSingleton` | En gång för hela applikationens livstid | Delad, långlivad tjänst — cache, konfiguration |

## Varför det spelar roll — ett vanligt misstag

Att registrera en `DbContext` som `AddSingleton` är ett klassiskt fel: en enda instans skulle då delas av *alla* samtidiga förfrågningar, vilket EF Core inte är trådsäkert för. Krockande förfrågningar kan korrumpera varandras data eller kasta konstiga undantag som är svåra att koppla till orsaken.

```csharp
// Fel — en delad DbContext-instans för hela appens livstid
builder.Services.AddSingleton<AppDbContext>();

// Rätt — en ny instans per förfrågan
builder.Services.AddScoped<AppDbContext>();
```

Faktiskt registrerar `builder.Services.AddDbContext<AppDbContext>(...)` (den vanliga EF Core-hjälpmetoden) automatiskt med `Scoped`-livslängd — just för att undvika det här misstaget.

## TL;DR

ASP.NET Cores inbyggda DI-container kopplar ihop interfaces med konkreta implementationer, och skickar in dem via konstruktorn — du skriver aldrig `new` för dina egna services. Välj livslängd efter hur delat tillståndet ska vara: `Transient` för varje användning, `Scoped` för en förfrågan, `Singleton` för hela appens livstid. Fel val — särskilt `Singleton` för en `DbContext` — är en vanlig källa till svårfelsökta buggar.
