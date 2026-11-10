---
title: "Lathund: stack (Stack<T>)"
description: "Stack<T> i C#: LIFO-ordning med Push, Pop och Peek, säker användning med TryPop och TryPeek, och jämförelse med Java."
parent: Lathund
nav_order: 76
---
# Lathund: stack (Stack\<T\>)

En `Stack<T>` fungerar som en hög med tallrikar: det du lägger överst är det du tar bort först. Ordningen kallas LIFO, Last In First Out.

Läs mer: [Stack och Queue](../data-structures/stack-queue.md) och [Datastrukturer](../data-structures/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Namnrymd | `System.Collections.Generic` |
| Ordning | LIFO. Sist in, först ut |
| Index | Nej. Du kommer bara åt översta elementet |
| Tom stack | `new Stack<string>()` |
| Pop eller Peek på tom stack | Kastar `InvalidOperationException` |

## Operationer

```csharp
Stack<string> sidor = new Stack<string>();
sidor.Push("Startsidan");
sidor.Push("Kurssidan");
sidor.Push("Övning 3");

Console.WriteLine(sidor.Peek());            // Övning 3, ligger överst
Console.WriteLine(sidor.Pop());             // Övning 3, tas bort
Console.WriteLine(sidor.Pop());             // Kurssidan
```

| Metod / egenskap | Betydelse | Exempel | Resultat |
|------------------|-----------|---------|----------|
| `Push(värde)` | Lägger överst | `sidor.Push("Hem")` | `Hem` blir översta |
| `Pop()` | Tar bort och returnerar översta | `sidor.Pop()` | Översta elementet. Kastar om stacken är tom |
| `Peek()` | Returnerar översta utan att ta bort | `sidor.Peek()` | Översta elementet |
| `TryPop(out värde)` | Som `Pop`, men returnerar `false` om stacken är tom | `sidor.TryPop(out string? sida)` | `true` och `sida` får värdet |
| `TryPeek(out värde)` | Som `Peek`, men returnerar `false` om stacken är tom | `sidor.TryPeek(out string? sida)` | `true` och `sida` får värdet |
| `Contains(värde)` | Finns värdet i stacken? | `sidor.Contains("Hem")` | `true` eller `false` |
| `Count` | Antal element | `sidor.Count` | Antalet |
| `ToArray()` | Kopia som array, översta först | `sidor.ToArray()` | Ny array i uttagsordning |
| `Clear()` | Tar bort alla element | `sidor.Clear()` | Tom stack |
| `TrimExcess()` | Frigör reserverat minne som inte används | `sidor.TrimExcess()` | Stacken ändras inte |

## Jämförelser

| Java | C# |
|------|-----|
| `stack.push(v)` | `stack.Push(v)` |
| `stack.pop()` | `stack.Pop()` |
| `stack.peek()` | `stack.Peek()` |
| `stack.isEmpty()` | `stack.Count == 0` |
| `stack.size()` | `stack.Count` |

## Vanliga misstag

- **`Pop` på en tom stack** kastar `InvalidOperationException`. Kontrollera `Count` först, eller använd `TryPop`.
- **`ToArray` börjar med det översta elementet**, inte med det som lades in först.
- **Ingen åtkomst till mitten.** Behöver du läsa eller ta bort ett element i mitten är en stack fel val. Använd [List\<T\>](list.md).

## Terminologi

| Term | Betydelse |
|------|-----------|
| **LIFO** | Last In, First Out. Det sist inlagda tas ut först |
| **Push** | Lägga ett element överst |
| **Pop** | Ta bort och returnera det översta elementet |
| **Peek** | Titta på det översta elementet utan att ta bort det |
