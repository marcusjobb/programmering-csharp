---
title: ".NET Framework vs .NET (Core)"
description: "Ser du kod eller tutorials som pratar om \".NET Framework\" och \".NET Core\" — eller bara \".NET 8\" — är det lätt att tro att det är olika saker på olika…"
parent: Grunder
nav_order: 6
---

# .NET Framework vs .NET (Core)

Ser du kod eller tutorials som pratar om ".NET Framework" och "*.NET Core*" — eller bara "*.NET 8*" — är det lätt att tro att det är olika saker på olika sidospår. Historiskt är de det. Idag är det egentligen bara en tidslinje.

## Två separata historier

| | .NET Framework | .NET Core → .NET |
|---|---|---|
| Först släppt | 2002 | 2016 |
| Plattform | **Endast Windows** | Windows, Linux, macOS |
| Senaste versionen | 4.8 (2019) — **inga fler kommer** | .NET 10 (2025), ny version varje år |
| Öppen källkod | Delvis | Helt öppen på GitHub |
| Status | Underhålls, men vidareutvecklas inte | Aktiv utveckling |

## Varför två spår fanns

.NET Framework byggdes när Windows var den enda relevanta plattformen. Det växte sig stort, tungt och — viktigast — omöjligt att köra på annat än Windows.

När Microsoft ville göra .NET plattformsoberoende gick det inte att bygga om Framework i efterhand utan att krossa bakåtkompatibilitet för miljontals appar. Lösningen blev att bygga om grunden från noll: **.NET Core**.

## Varför namnen är förvirrande

```
.NET Framework 1.0 → ... → 4.8   (avslutad, Windows-only)

.NET Core 1.0 → 2.0 → 3.0 → 3.1
                                ↓
                         .NET 5 → 6 → 7 → 8 → 9 → 10 ...
                         (ordet "Core" försvann ur namnet)
```

Från och med **.NET 5** (2020) tog Microsoft bort "Core" ur namnet, för att markera att det här nu *är* .NET — inte ett sidospår. Det hoppades dessutom över version "4" helt, just för att undvika förväxling med .NET Framework 4.x.

## Vad betyder det för dig?

Allt du bygger idag ska vara **.NET** (tidigare "Core") — versionsnumret räcker, ordet "Core" behövs inte längre. Ser du ett gammalt projekt riktat mot ".NET Framework 4.x" vet du nu varför: det är från innan omstarten, låst till Windows, och kommer inte få fler språkfunktioner.

## TL;DR

.NET Framework = det gamla, Windows-bundna spåret, avslutat vid 4.8. .NET Core → .NET 5+ = omstarten, cross-platform, det som gäller idag. "Core" i namnet är historia sedan .NET 5.
