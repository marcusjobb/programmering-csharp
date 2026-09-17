---
title: Strängar
layout: default
parent: Ordlista
nav_order: 24
---
## Strängar

| Ord | Förklaring |
| --- | --- |
| Trim() | Tar bort blanksteg i början och slutet av en sträng. |
| TrimStart() / TrimEnd() | Som `Trim()`, men bara på en sida i taget. |
| ToUpper() / ToLower() | Gör om hela strängen till versaler respektive gemener. |
| Contains() | Kollar om en sträng finns någonstans inuti en annan. Returnerar `true`/`false`, inte var. |
| IndexOf() | Letar upp var en delsträng börjar, som index. Ger `-1` om den inte hittas. |
| LastIndexOf() | Som `IndexOf()`, men letar bakifrån och ger den sista förekomsten. |
| Replace() | Byter ut alla förekomster av en delsträng mot en annan. |
| Substring() | Plockar ut en bit av en sträng, baserat på startindex och antal tecken. |
| Split() | Delar en sträng till en array av strängar, baserat på ett avgränsartecken. |
| string.Join() | Motsatsen till `Split()` — limmar ihop en array av strängar till en enda, med ett valfritt mellantecken. |
| StartsWith() / EndsWith() | Kollar om en sträng börjar eller slutar med en specifik delsträng. |
| IsNullOrEmpty() / IsNullOrWhiteSpace() | Statiska metoder som kollar om en sträng är tom respektive tom eller bara blanksteg. |
| PadLeft() / PadRight() | Fyller ut en sträng till en viss längd med ett tecken, på vänster respektive höger sida. |
| Insert() / Remove() | Klistrar in text på en position, respektive tar bort ett antal tecken från en position. |
| Raw string literals `"""..."""` | Text mellan tre citattecken tas exakt som den står — inget behöver escapas. |
| String interpolation `$"{}"` | Blandar text och variabelvärden direkt i strängen, t.ex. `$"Hej {namn}"`. |
| string.Format() | Föregångaren till string interpolation — samma idé men med numrerade platshållare: `{0}`, `{1}`. |
