---
title: Asynkron validering
description: "Asynkron validering med AsyncValidationAttribute — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://www.linkedin.com/in/marcusmedina/"
school: Nion Education
date: "2026-09-30"
updated: "2026-09-30"
parent: Asynkron
nav_order: 20
---
# Asynkron validering

Vanliga valideringsattribut som `[Required]` och `[Range]` körs synkront. Behöver du validera mot en databas eller ett API — till exempel kontrollera att ett användarnamn inte redan är taget — behöver du asynkron validering.

## När du läst detta ska du kunna

- Skriva ett eget `AsyncValidationAttribute`
- Validera en modell asynkront med `Validator.ValidateObjectAsync`
- Kombinera synkrona och asynkrona valideringsregler
- Förstå var asynkron validering passar in (och inte passar in)

## Grunderna — synkron validering

Synkrona attribut känner du igen sedan tidigare:

```csharp
public class UserRegistration
{
    [Required(ErrorMessage = "Namn krävs")]
    [StringLength(50, MinimumLength = 2)]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }
}
```

```csharp
var model = new UserRegistration { Name = "A", Email = "inte-epost" };
var results = new List<ValidationResult>();

bool valid = Validator.TryValidateObject(model, new ValidationContext(model), results, true);

foreach (var error in results)
    Console.WriteLine(error.ErrorMessage);
```

## AsyncValidationAttribute

`AsyncValidationAttribute` är basklassen för valideringsattribut som behöver göra asynkrona operationer:

```csharp
public class UniqueUsernameAttribute : AsyncValidationAttribute
{
    protected override async Task<ValidationResult?> IsValidAsync(
        object? value,
        ValidationContext context)
    {
        if (value is not string username)
            return new ValidationResult("Ogiltigt värde");

        // Hämta en tjänst via DI
        var userService = context.GetService<IUserService>();

        bool exists = await userService!.UsernameExistsAsync(username);

        return exists
            ? new ValidationResult($"'{username}' är redan taget")
            : ValidationResult.Success;
    }
}
```

### Applicera attributet

```csharp
public class UserRegistration
{
    [Required]
    [UniqueUsername]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }
}
```

## Validator.ValidateObjectAsync

Det nya `ValidateObjectAsync` kör alla valideringsattribut — synkrona och asynkrona:

```csharp
var model = new UserRegistration
{
    Username = "marcus",
    Email    = "marcus@exempel.se"
};

var context = new ValidationContext(model, serviceProvider, null);
var results = new List<ValidationResult>();

bool valid = await Validator.ValidateObjectAsync(
    model,
    context,
    results,
    validateAllProperties: true);

if (!valid)
{
    foreach (var error in results)
        Console.WriteLine(error.ErrorMessage);
}
```

## Komplett exempel — registreringsflöde

```csharp
// Tjänsten som valideras mot
public interface IUserService
{
    Task<bool> UsernameExistsAsync(string username);
    Task<bool> EmailExistsAsync(string email);
}

// Attribut för unikt e-postattribut
public class UniqueEmailAttribute : AsyncValidationAttribute
{
    protected override async Task<ValidationResult?> IsValidAsync(
        object? value,
        ValidationContext context)
    {
        if (value is not string email) return null;

        var service = context.GetService<IUserService>()!;
        bool exists = await service.EmailExistsAsync(email);

        return exists
            ? new ValidationResult("E-postadressen är redan registrerad")
            : ValidationResult.Success;
    }
}

// Modellen
public class RegistrationForm
{
    [Required, StringLength(30, MinimumLength = 3)]
    [UniqueUsername]
    public string Username { get; set; }

    [Required, EmailAddress]
    [UniqueEmail]
    public string Email { get; set; }

    [Required, MinLength(8)]
    public string Password { get; set; }
}
```

```csharp
// Validering i en minimal API-endpoint
app.MapPost("/register", async (RegistrationForm form, IServiceProvider sp) =>
{
    var context = new ValidationContext(form, sp, null);
    var errors  = new List<ValidationResult>();

    bool valid = await Validator.ValidateObjectAsync(form, context, errors, true);

    return valid
        ? Results.Ok("Registrering lyckades")
        : Results.ValidationProblem(errors.ToDictionary(
            e => e.MemberNames.FirstOrDefault() ?? "",
            e => new[] { e.ErrorMessage ?? "" }));
});
```

## Var passar asynkron validering?

| Situationen | Rätt val |
|-------------|----------|
| Kontrollera format, längd, null | Synkront attribut |
| Kontrollera unikhet i databas | `AsyncValidationAttribute` |
| Validera mot externt API | `AsyncValidationAttribute` |
| Komplex affärslogik som kräver tjänster | Separat valideringslager |

Asynkron validering i attribut är bra för enkel databas- eller API-kontroll. För komplex affärslogik är ett separat valideringslager (t.ex. FluentValidation) oftast ett bättre val.

## TL;DR

```csharp
// 1. Ärv AsyncValidationAttribute
public class UniqueUsernameAttribute : AsyncValidationAttribute
{
    protected override async Task<ValidationResult?> IsValidAsync(
        object? value, ValidationContext ctx)
    {
        var service = ctx.GetService<IUserService>()!;
        return await service.UsernameExistsAsync(value as string ?? "")
            ? new ValidationResult("Taget")
            : ValidationResult.Success;
    }
}

// 2. Validera asynkront
bool valid = await Validator.ValidateObjectAsync(model, context, results, true);
```
