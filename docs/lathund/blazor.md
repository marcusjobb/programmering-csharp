---
title: "Lathund: Blazor"
description: "Blazor: skapa en Blazor Web App med interaktiv server, komponenter, parametrar, dependency injection, formulär och tester med bUnit."
parent: Lathund
nav_order: 132
---
# Lathund: Blazor

Blazor är ett ramverk för webbappar där både gränssnitt och logik skrivs i C#. Varje komponent är en `.razor`-fil som innehåller HTML och C# tillsammans. Den här lathunden använder Blazor Web App med interaktiv server (Interactive Server), där komponenterna körs på servern och uppdateringarna skickas via SignalR.

Läs mer: [Webb](../web/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Ramverk | Blazor, .NET 10 |
| Projektmall | `blazor` med `--interactivity Server` |
| Komponent | Fil med ändelsen `.razor` |
| Startfil | `Program.cs` i webbprojektet |
| Rotkomponent | `Components/App.razor` |
| Sidor | `Components/Pages/` |

## Skapa projektet

```bash
dotnet new sln -n MyProject
dotnet new blazor -n MyProject.Web --interactivity Server
dotnet new classlib -n MyProject.Core
dotnet new xunit -n MyProject.Tests

dotnet sln add MyProject.Web
dotnet sln add MyProject.Core
dotnet sln add MyProject.Tests

dotnet add MyProject.Web reference MyProject.Core
dotnet add MyProject.Tests reference MyProject.Web MyProject.Core
```

<details markdown="1">
<summary>Alternativ: Interactive WebAssembly</summary>

Med `--interactivity WebAssembly` körs komponenterna i webbläsaren, och appen kan publiceras som statiska filer. Då finns ingen server-anslutning, men appen laddar ner .NET-runtime första gången. Mallen och `Program.cs` skiljer sig åt, så använd samma val i hela projektet.

```bash
dotnet new blazor -n MyProject.Web --interactivity WebAssembly
```

</details>

## Program.cs

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Services.AddScoped<ITeamService, TeamService>();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAntiforgery();
app.MapStaticAssets();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
```

## Komponent

Filen ligger i `Components/Pages/Teams.razor`.

```razor
@page "/teams"
@rendermode InteractiveServer
@inject ITeamService TeamService

<PageTitle>Teams</PageTitle>

<h1>Teams</h1>

@if (teams is null)
{
    <p>Laddar...</p>
}
else
{
    <ul>
        @foreach (var team in teams)
        {
            <li>@team.Name</li>
        }
    </ul>
}

<button class="btn btn-primary" @onclick="LaggTillTeam">Nytt team</button>

@code {
    private List<Team>? teams;

    protected override async Task OnInitializedAsync()
    {
        teams = await TeamService.GetAllAsync();
    }

    private void LaggTillTeam()
    {
        teams?.Add(new Team { Id = teams.Count + 1, Name = $"Team {teams.Count + 1}" });
    }
}
```

| Del | Syntax | Betydelse |
|-----|--------|-----------|
| Route | `@page "/teams"` | Sidans adress |
| Renderläge | `@rendermode InteractiveServer` | Gör sidan interaktiv. Krävs om sidan har knappar eller formulär |
| Injicering | `@inject ITeamService TeamService` | Hämtar en tjänst från DI-behållaren |
| Händelse | `@onclick="Metod"` | Kör en C#-metod när knappen klickas |
| Logik | `@code { ... }` | C#-kod för komponenten |

## Parametrar

En parametriserad route tar emot värdet som en `[Parameter]`:

```razor
@page "/teams/{TeamId:int}"

<h2>Team @team?.Name</h2>

@code {
    [Parameter]
    public int TeamId { get; set; }

    private Team? team;

    protected override async Task OnParametersSetAsync()
    {
        team = await TeamService.GetByIdAsync(TeamId);
    }
}
```

## Egen komponent med callback

Filen ligger i `Components/Shared/TeamCard.razor`:

```razor
<div class="card mb-3">
    <div class="card-body">
        <h5>@Team.Name</h5>
        <button class="btn btn-primary" @onclick="() => OnViewClicked.InvokeAsync(Team.Id)">
            Visa
        </button>
    </div>
</div>

@code {
    [Parameter, EditorRequired]
    public Team Team { get; set; } = default!;

    [Parameter]
    public EventCallback<int> OnViewClicked { get; set; }
}
```

Användning i en annan komponent:

```razor
<TeamCard Team="team" OnViewClicked="VisaTeam" />

@code {
    private void VisaTeam(int id)
    {
        Navigation.NavigateTo($"/teams/{id}");
    }
}
```

## Formulär och validering

```razor
<EditForm Model="nyttTeam" OnValidSubmit="SparaTeam" FormName="nyttTeam">
    <DataAnnotationsValidator />
    <ValidationSummary />

    <InputText @bind-Value="nyttTeam.Name" />
    <button type="submit" class="btn btn-success">Spara</button>
</EditForm>

@code {
    [SupplyParameterFromForm]
    private Team nyttTeam { get; set; } = new();

    private async Task SparaTeam()
    {
        await TeamService.CreateAsync(nyttTeam);
        nyttTeam = new();
    }
}
```

`Team.Name` får `[Required]` från `System.ComponentModel.DataAnnotations`. Med Interactive Server sker valideringen på servern innan `OnValidSubmit` körs. `OnInvalidSubmit` körs vid fel.

## Test med bUnit

```csharp
using Bunit;
using NSubstitute;
using MyProject.Core.Entities;
using MyProject.Core.Services;
using MyProject.Web.Components.Pages;
using Xunit;

public class TeamsTests : TestContext
{
    [Fact]
    public void Visar_rubriken_och_teamen()
    {
        var service = Substitute.For<ITeamService>();
        service.GetAllAsync()
               .Returns(Task.FromResult(new List<Team> { new() { Id = 1, Name = "Team A" } }));
        Services.AddSingleton(service);

        var cut = RenderComponent<Teams>();

        Assert.Equal("Teams", cut.Find("h1").TextContent);
        Assert.Contains("Team A", cut.Markup);
    }
}
```

## Operationer

| Vad | Kommando |
|-----|----------|
| Kör appen | `dotnet run --project MyProject.Web` |
| Kör appen och starta om vid ändring | `dotnet watch --project MyProject.Web` |
| Kör tester | `dotnet test` |

## Vanliga misstag

- **Knappen gör ingenting.** Sidan saknar `@rendermode InteractiveServer`, och då finns ingen interaktivitet.
- **Listan uppdateras inte.** Efter ändring av data utanför Blazors händelser kan du anropa `StateHasChanged()`.
- **`NullReferenceException` i markupen.** Sätt `List<Team>?` och kontrollera med `if` innan du använder värdet. Eller använd `?.`.
- **Anropar JavaScript från C#.** `confirm()` finns inte i C#. Använd `IJSRuntime` och `JS.InvokeAsync<bool>("confirm", "Är du säker?")`.
- **Tjänsten inte registrerad.** Lägg till den med `AddScoped` i `Program.cs`.
- **Gamla mallar i material.** `AddServerSideBlazor`, `MapBlazorHub` och `_Host.cshtml` är från .NET 6. Använd `AddRazorComponents` och `MapRazorComponents<App>` i .NET 10.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **Komponent** | En `.razor`-fil med markup och C# |
| **Renderläge** | Var och hur komponenten körs, till exempel Interactive Server |
| **Parameter** | Värde som skickas från en förälder till en komponent |
| **EventCallback** | Sätt för en underkomponent att anropa en metod i föräldern |
| **Dependency Injection** | Tjänster tas emot i stället för att skapas i komponenten |
| **SignalR** | Teknik som skickar uppdateringar mellan server och webbläsare i realtid |
| **bUnit** | Testbibliotek för Blazor-komponenter |
