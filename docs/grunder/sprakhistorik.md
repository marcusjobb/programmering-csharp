---
title: Språkhistorik — C# 4 till C# 15
description: "Referenssida över vad som tillkommit i C# sedan version 4.0 (2010). Tänkt som komplement till ämnessidorna — inte en ersättning. Se Varför C# ser ut som…"
parent: Grunder
nav_order: 20
---

# Språkhistorik

Referenssida över vad som tillkommit i C# sedan version 4.0 (2010). Tänkt som komplement till ämnessidorna — inte en ersättning. Se [Varför C# ser ut som det gör](csharp-ursprung) för sammanhanget bakom varför språket utvecklas som det gör.

## C# 4.0 — 2010 (.NET Framework 4)

| Funktion | Användning |
|---|---|
| `dynamic` | Sen bindning vid runtime — mest COM-interop |
| Named/optional parameters | `Metod(namn: "x", ålder: 5)` |
| Co-/contravariance i generics | `IEnumerable<out T>`, `IComparer<in T>` |

## C# 5.0 — 2012 (.NET Framework 4.5)

| Funktion | Användning |
|---|---|
| `async`/`await` | Asynkron kod utan trådblockering — se [Asynkron](../asynkron/) |
| Caller info-attribut | `[CallerMemberName]`, `[CallerLineNumber]` — bra för loggning |

## C# 6.0 — 2015

| Funktion | Användning |
|---|---|
| Expression-bodied members | `int Kvadrat(int x) => x * x;` |
| Null-conditional operator | `person?.Namn` |
| String interpolation | `$"Hej {namn}"` |
| `nameof` | `nameof(person)` — refaktoreringssäkra strängar |
| Exception filters | `catch (Exception e) when (e.Message.Contains("x"))` |
| Auto-property initializers | `public int Ålder { get; set; } = 18;` |

## C# 7.0 — 2017

| Funktion | Användning |
|---|---|
| Tuples & deconstruction | `(string namn, int ålder) = Hämta();` |
| Pattern matching (is/switch) | `if (obj is Person p)` |
| Local functions | Hjälpfunktion inuti en metod |
| `out`-variabler inline | `if (int.TryParse(s, out int tal))` |
| `ref` returns/locals | Returnera referens istället för kopia |
| Discards | `_` för ointressanta värden |

## C# 7.1–7.3 — 2017–2018

| Funktion | Användning |
|---|---|
| Async Main | `static async Task Main()` |
| Default literal | `int x = default;` |
| `in`-parametrar, `readonly struct`, `ref struct` | Värdesemantik för prestanda |
| `private protected` | Ny access modifier |
| Generic constraints | `unmanaged`, `Enum`, `delegate` |

## C# 8.0 — 2019 (.NET Core 3.0)

| Funktion | Användning |
|---|---|
| Nullable reference types | `string?` vs `string` — se [Nullable typer](../variabler/nullable) |
| Switch expressions | `var x = tal switch { 1 => "ett", _ => "annat" };` |
| `using`-deklarationer | `using var fil = ...;` — disposas i slutet av scope |
| Ranges & indices | `arr[1..3]`, `arr[^1]` |
| Async streams | `IAsyncEnumerable<T>`, `await foreach` |
| Default interface methods | Implementation direkt i interface |

## C# 9.0 — 2020 (.NET 5)

| Funktion | Användning |
|---|---|
| Records | `record Person(string Namn, int Ålder);` — immutable data med värdelikhet |
| Init-only setters | `{ get; init; }` — sätts bara vid objektskapande |
| Top-level statements | Program.cs utan `Main`-boilerplate — se [Programstruktur](programstruktur) |
| Target-typed `new` | `Person p = new("Anna", 30);` |
| Pattern matching | Relational (`> 10`) och logiska (`and`/`or`/`not`) patterns |

## C# 10 — 2021 (.NET 6)

| Funktion | Användning |
|---|---|
| Record structs | Records med värdesemantik istället för referenssemantik |
| Global using | En using-fil täcker hela projektet |
| File-scoped namespace | `namespace Foo;` utan block, en indenteringsnivå mindre |
| `CallerArgumentExpression` | Fångar uttrycket som skickades in, t.ex. för assert-meddelanden |

## C# 11 — 2022 (.NET 7)

| Funktion | Användning |
|---|---|
| Raw string literals | `"""..."""` — strängar med citattecken/backslash utan escaping |
| Required members | `required string Namn;` — måste sättas vid objektskapande |
| Generic math | `static abstract` medlemmar i interfaces |
| List patterns | `if (arr is [1, 2, ..])` |
| UTF-8 string literals | `"text"u8` |

## C# 12 — 2023 (.NET 8)

| Funktion | Användning |
|---|---|
| Primary constructors | `class Person(string namn, int ålder)` — även för klasser, inte bara records |
| Collection expressions | `int[] arr = [1, 2, 3];` med spread `[..a, ..b]` |
| Default lambda-parametrar | `(int x = 5) => x * 2` |
| Alias any type | `using Point = (int x, int y);` |

## C# 13 — 2024 (.NET 9)

| Funktion | Användning |
|---|---|
| `params`-collections | `params IEnumerable<int>` — inte bara array längre |
| Nytt lock-objekt | `System.Threading.Lock` — snabbare än `lock` på `object` |
| Partial properties/indexers | Dela deklaration/implementation, t.ex. för källgenererad kod |
| `\e`-escape | Escape-tecken i strängar |

## C# 14 — 2025 (.NET 10)

| Funktion | Användning |
|---|---|
| Extension members | Nytt `extension`-block-syntax för metoder/properties/statics |
| `field`-nyckelordet | Åtkomst till kompilatorgenererat backing field i en property |
| Null-conditional assignment | `person?.Namn = "Anna";` |
| Implicit span conversions | Mindre friktion mellan array och `Span<T>` |

## C# 15 — preview, GA nov 2026 (.NET 11)

> Preview 7 (aug 2026). Listan kan växa fram till GA.

| Funktion | Användning |
|---|---|
| Union types | `public union Pet(Cat, Dog, Bird);` — värdet är exakt en av de angivna typerna, med exhaustive pattern matching i switch |
| Collection expression arguments | Utökning av `[...]`-syntaxen (C# 12) med argument till collection-initialiseringen |
| Closed hierarchies | `closed`-modifierare på en klass — låser vilka typer som får ärva den inom samma assembly, gör switch exhaustive utan `default` |
| Extension indexers | Indexers (`obj[i]`) kan definieras via extension members |
| Labeled break/continue | `break label;`/`continue label;` — hoppa ur nästlade loopar utan flaggvariabler |
| Memory safety (unsafe-modell) | Första previewen av en uppdaterad `unsafe`-modell |

### Not implementerat / droppat — bra att veta om

**`!!`-operatorn för parameternull-check** (`void M(string name!!)`) var föreslagen till C# 11 men **droppades** efter negativ feedback. Ersattes av `ArgumentNullException.ThrowIfNull(param)` (.NET 6, BCL-metod — inte språksyntax).

## TL;DR

Varje ny C#-version löser antingen ett skrivbördeproblem (mindre boilerplate) eller ett säkerhetsproblem (nullable, required members). Ingen enskild version är "den stora" — förändringarna är kumulativa.
