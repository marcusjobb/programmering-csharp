---
title: POCO och DTO
description: "Två vanliga begrepp för \"enkla dataklasser\" som du möter ofta i C#-projekt."
parent: Objektorienterad programmering (OOP)
nav_order: 37
---
# POCO och DTO

Två vanliga begrepp för "enkla dataklasser" som du möter ofta i C#-projekt.

## När du läst detta ska du kunna

- Förklara vad POCO och DTO är
- Skriva en enkel POCO- och DTO-klass
- Skilja dem från klasser med affärslogik
- Använda records som ett modernt alternativ
- Förklara overposting och varför varje operation får egna DTO:er för det som kommer in och det som går ut

## POCO — Plain Old C# Object

**POCO** (Plain Old C# Object) är en klass som inte ärver från något ramverk och inte beror på extern infrastruktur. Den innehåller bara data (properties) och eventuellt enkel logik.

Begreppet kommer från Javas POJO och används i C# för att betona att en klass är "ren" — utan ramverksberoenden.

```csharp
// POCO — en enkel klass utan koppling till databas, nätverk eller UI
public class Product
{
    public int    Id       { get; set; }
    public string Name     { get; set; }
    public double Price    { get; set; }
    public bool   InStock  { get; set; }
}
```

Entity Framework använder POCO-klasser för att mappa tabeller (se [Entiteter](../entityframework/entiteter.md)). Klassen vet ingenting om databasen — EF hanterar det åt dig.

## DTO — Data Transfer Object

**DTO** (Data Transfer Object) är ett designmönster: en klass vars enda syfte är att **flytta data** mellan lager i en applikation — t.ex. från databas till API till klient.

En DTO är:
- Enkel: bara properties, inga metoder med logik
- Anpassad: innehåller bara de fält som mottagaren behöver
- Fristående: inte kopplad till databasens modell

```csharp
// Domänklass — hela modellen i databasen
public class User
{
    public int      Id           { get; set; }
    public string   UserName     { get; set; }
    public string   PasswordHash { get; set; }   // skickas ALDRIG till klienten
    public string   Email        { get; set; }
    public DateTime CreatedDate  { get; set; }
}

// DTO — bara det klienten behöver se
public class UserDto
{
    public int    Id       { get; set; }
    public string UserName { get; set; }
    public string Email    { get; set; }
}
```

`PasswordHash` finns i domänklassen men saknas helt i `UserDto` — inte gömt, bara aldrig med i första taget. Ingen risk att glömma ett `[JsonIgnore]` när fältet inte existerar i den klass som faktiskt serialiseras.

## Varför använda DTO?

- **Säkerhet**: skicka aldrig känsliga fält (lösenord, interna ID:n) till klienten
- **Prestanda**: överför bara det som behövs, inte hela domänmodellen
- **Frikoppling**: API:ets svar förändras inte om du ändrar din databasmodell

## Records som POCO/DTO (C# 9)

> Records har en egen djupdykning: [Records](records.md) — med `with`-uttryck, värdejämförelse, `record struct` och när du ska välja records vs klasser.
> Se även: [Records vs POJOs/DTOs](https://marcusmedina.pro/sv/junior-tips/records-vs-pojos-dtos/) på marcusmedina.pro

Records är ett modernt alternativ som ger dig en kortare och oföränderlig klass.

```csharp
// Gammalt sätt — klass
public class ProductDto
{
    public int    Id    { get; init; }
    public string Name  { get; init; }
    public double Price { get; init; }
}

// C# 9 — record (kortare, inbyggd equality, oföränderlig)
public record ProductDto(int Id, string Name, double Price);

// Används på samma sätt
var p = new ProductDto(1, "Kaffemaskin", 499.0);
Console.WriteLine(p);  // ProductDto { Id = 1, Name = Kaffemaskin, Price = 499 }
```

En record är perfekt för DTO och POCO: inbyggd `ToString()`, `Equals()` och `GetHashCode()` baserade på innehållet, oföränderlig som standard med `init`-properties. Se [Records, structs och klasser](records-structs-classes.md) för hela jämförelsen.

## En DTO per operation — Request och Response

`UserDto` ovan skyddar det som går **ut** från API:et. Men samma problem finns åt andra hållet: det som kommer **in**. Det är lätt att låta en endpoint ta emot entiteten direkt:

```csharp
// ❌ Entiteten tas emot direkt från klienten
app.MapPost("/users", (User user, IUserRepository users) =>
{
    users.Add(user);
    return Results.Created($"/users/{user.Id}", user);
});
```

Det ser oskyldigt ut, men ASP.NET fyller i *alla* properties som finns i JSON:en. En klient kan alltså skicka:

```json
{
  "userName": "kalle",
  "email": "kalle@example.com",
  "passwordHash": "något-kalle-själv-hittat-på",
  "createdDate": "2001-01-01"
}
```

Det kallas **overposting** (eller *mass assignment*): klienten sätter fält som den aldrig borde få röra. Och eftersom endpointen returnerar `user` skickas `PasswordHash` dessutom tillbaka i svaret.

Lösningen är att varje operation får en egen DTO för det den **tar emot** (request) och det den **skickar tillbaka** (response):

```csharp
using System.ComponentModel.DataAnnotations;

// Det klienten skickar för att skapa en användare (POST)
public record CreateUserRequest(
    [Required] string UserName,
    [Required, EmailAddress] string Email,
    [Required, MinLength(12)] string Password);

// Det klienten skickar för att ändra (PUT) — e-post får inte ändras här
public record UpdateUserRequest([Required] string UserName);

// Det klienten får tillbaka (GET, och svaret på POST)
public record UserResponse(int Id, string UserName, string Email);

// Mappningen på ett enda ställe, så att den inte upprepas i varje endpoint
public static class UserMapping
{
    public static UserResponse ToResponse(this User user) => new(user.Id, user.UserName, user.Email);
}
```

Endpointsen tar emot och returnerar bara DTO:er. Entiteten `User` lämnar aldrig servern:

```csharp
app.MapPost("/users", (CreateUserRequest request, IUserRepository users, IPasswordHasher<User> hasher) =>
{
    var user = new User
    {
        UserName    = request.UserName,
        Email       = request.Email,
        CreatedDate = DateTime.UtcNow          // sätts av servern, aldrig av klienten
    };
    user.PasswordHash = hasher.HashPassword(user, request.Password);

    users.Add(user);
    return Results.Created($"/users/{user.Id}", user.ToResponse());
});

app.MapPut("/users/{id:int}", (int id, UpdateUserRequest request, IUserRepository users) =>
{
    var user = users.GetById(id);
    if (user is null) return Results.NotFound();

    user.UserName = request.UserName;          // Email, PasswordHash och CreatedDate finns inte i requesten
    users.Update(user);
    return Results.NoContent();
});
```

(`IUserRepository` är ett vanligt [Repository](../designmonster/repository-dependency-inversion.md). `IPasswordHasher<User>` följer med ASP.NET Core och registreras med `builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>()`.)

Varför det är värt de extra klasserna:

- **Ingen overposting**: fält som inte finns i request-DTO:n kan klienten inte sätta. Det är samma tanke som med `PasswordHash` i `UserDto`: det som inte finns kan inte läcka.
- **Olika regler per operation**: e-post får sättas när användaren skapas men inte ändras. Det syns direkt i typerna i stället för att gömmas i en `if`.
- **Validering per operation**: varje DTO har sina egna attribut. `[ApiController]` i MVC validerar dem automatiskt, och i Minimal API slår du på samma sak med `builder.Services.AddValidation()` (.NET 10).
- **Databasen läcker inte ut i API:t**: du kan byta namn på en kolumn i `User` utan att bryta klienterna.

**Namngivning:** `CreateUserRequest`/`UserResponse` och `CreateUserDto`/`UserDto` är båda vanliga. Välj en stil och håll fast vid den i hela projektet.

**Mappstruktur** — DTO:erna samlas ofta per resurs, skilda från entiteterna:

```text
Api/
├── Contracts/              ← allt som syns utåt (heter ibland Dtos/)
│   └── Users/
│       ├── CreateUserRequest.cs
│       ├── UpdateUserRequest.cs
│       ├── UserResponse.cs
│       └── UserMapping.cs
├── Entities/
│   └── User.cs             ← lämnar aldrig servern
├── Repositories/
│   └── IUserRepository.cs
└── Program.cs              ← endpoints
```

Tar man idén ett steg längre och separerar läsningar och skrivningar i hela arkitekturen heter det **CQRS** (Command Query Responsibility Segregation). Har varje endpoint exakt ett request- och ett response-par i en egen mapp heter det **REPR** (Request–Endpoint–Response). Det är arkitekturmönster snarare än DTO-teknik, men grunden är exakt den här.

## POCO vs DTO — skillnaden

| | POCO | DTO |
|-|------|-----|
| **Syfte** | Representera ett domänobjekt | Flytta data mellan lager |
| **Logik** | Kan ha lite logik | Ingen logik |
| **Livstid** | Länge (används i hela appen) | Kort (skapas för en request/response) |
| **Källa** | Databasen, affärslagret | Domänklassen (mappas från den) |

## Obligatorisk dad-joke

Varför gick DTO:n aldrig ut på en lång resa?

Den packade bara det den faktiskt behövde.
