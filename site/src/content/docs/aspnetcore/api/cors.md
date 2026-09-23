---
title: Cors
description: "Cors i API — C#-boken av Marcus Ackre Medina"
layout: default
author: Marcus Ackre Medina
author_github: marcusjobb
author_url: "https://github.com/marcusjobb/"
school: Nion Education
date: "2025-08-18 15:37:40"
updated: "2026-09-16"
parent: API
nav_order: 20
---
# Cors

Låt oss ta en titt på Cors, och nej, jag pratar inte om [tjejgruppen Cors från 90-talet](https://www.thecorrsofficial.com/). Jag pratar om Cross-Origin Resource Sharing (Cors), en kraftfull teknik som möjliggör kommunikation mellan olika webbapplikationer. Cors fungerar som en nyckel som säkerställer att webbapplikationer endast kan komma åt data som de har behörighet till.

## TL;DR

Cors är en säkerhetsfunktion som ser till att webbapplikationer inte kan komma åt data som de inte har behörighet till. Detta uppnås genom att begränsa åtkomsten till resurser på andra ursprung (origins). Genom att tillämpa Cors-regler kan en webbapplikation bestämma vilka ursprung som tillåts kommunicera med den och vilka metoder och headers som är tillåtna. Detta förhindrar obehörig åtkomst till data och skyddar användarnas integritet.

## Fördjupning

Cors är avgörande för att upprätthålla säkerheten i webbapplikationer genom att begränsa åtkomsten till resurser på andra ursprung (origins). Genom att tillämpa Cors-regler kan en webbapplikation bestämma vilka ursprung som tillåts kommunicera med den och vilka metoder och headers som är tillåtna. Detta förhindrar obehörig åtkomst till data och skyddar användarnas integritet.

## Exempel

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddCors(options =>
    {
        options.AddPolicy("AllowAllOrigins",
            builder =>
            {
                builder.AllowAnyOrigin() // Tillåt alla ursprung
                    .AllowAnyMethod() // Tillåt alla metoder
                    .AllowAnyHeader(); // Tillåt alla headers
            });
    });
}
```

I metoden `ConfigureServices` konfigureras Cors-regler i ASP.NET Core-applikationen. Detta görs genom att lägga till en Cors-tjänst i DI-kontainern. I detta exempel läggs en Cors-policy med namnet "AllowAllOrigins" till. Den här policyn tillåter alla ursprung (origins), alla metoder och alla headers.

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseCors("AllowAllOrigins");
}
```

I metoden `Configure` konfigureras middleware för Cors. Detta middleware används för att tillämpa Cors-reglerna på inkommande begäranden och svar i ASP.NET Core-applikationen.

> **OBS:** Att tillåta alla ursprung, metoder och headers kan vara osäkert i en produktionsmiljö. Det rekommenderas att vara mer restriktiv och specificera tillåtna ursprung baserat på säkerhetskraven.

## Obligatorisk Dad-joke

Varför var webbutvecklare så oroliga över myrorna vid ängen?

För att de fruktade att myrorna skulle försöka "CORS"-a deras picknick! 😄
