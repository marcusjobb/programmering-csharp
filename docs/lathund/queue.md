---
title: "Lathund: kö (Queue<T>)"
description: "Queue<T> i C#: FIFO-ordning med Enqueue, Dequeue och Peek, säker användning med TryDequeue, och jämförelse med Java."
parent: Lathund
nav_order: 77
---
# Lathund: kö (Queue\<T\>)

En `Queue<T>` fungerar som en kö i en affär: den som kommer först blir betjänad först. Ordningen kallas FIFO, First In First Out.

Läs mer: [Stack och Queue](../data-structures/stack-queue.md) och [Datastrukturer](../data-structures/index.md).

## Snabbfakta

| Egenskap | Värde |
|----------|-------|
| Namnrymd | `System.Collections.Generic` |
| Ordning | FIFO. Först in, först ut |
| Index | Nej. Du kommer bara åt första elementet |
| Tom kö | `new Queue<string>()` |
| Dequeue eller Peek på tom kö | Kastar `InvalidOperationException` |

## Operationer

```csharp
Queue<string> utskrifter = new Queue<string>();
utskrifter.Enqueue("Dokument 1");
utskrifter.Enqueue("Dokument 2");

Console.WriteLine(utskrifter.Peek());       // Dokument 1, står först
Console.WriteLine(utskrifter.Dequeue());    // Dokument 1, tas bort
Console.WriteLine(utskrifter.Count);        // 1
```

| Metod / egenskap | Betydelse | Exempel | Resultat |
|------------------|-----------|---------|----------|
| `Enqueue(värde)` | Lägger sist i kön | `utskrifter.Enqueue("Dokument 3")` | Värdet står sist |
| `Dequeue()` | Tar bort och returnerar första | `utskrifter.Dequeue()` | Första elementet. Kastar om kön är tom |
| `Peek()` | Returnerar första utan att ta bort | `utskrifter.Peek()` | Första elementet |
| `TryDequeue(out värde)` | Som `Dequeue`, men returnerar `false` om kön är tom | `utskrifter.TryDequeue(out string? dokument)` | `true` och `dokument` får värdet |
| `TryPeek(out värde)` | Som `Peek`, men returnerar `false` om kön är tom | `utskrifter.TryPeek(out string? dokument)` | `true` och `dokument` får värdet |
| `Contains(värde)` | Finns värdet i kön? | `utskrifter.Contains("Dokument 2")` | `true` eller `false` |
| `Count` | Antal element | `utskrifter.Count` | Antalet |
| `ToArray()` | Kopia som array, första först | `utskrifter.ToArray()` | Ny array i köordning |
| `Clear()` | Tar bort alla element | `utskrifter.Clear()` | Tom kö |
| `TrimExcess()` | Frigör reserverat minne som inte används | `utskrifter.TrimExcess()` | Kön ändras inte |

## Jämförelser

| Java | C# |
|------|-----|
| `queue.add(v)` eller `queue.offer(v)` | `queue.Enqueue(v)` |
| `queue.remove()` | `queue.Dequeue()` |
| `queue.poll()` (ger `null` om tom) | `queue.TryDequeue(out värde)` |
| `queue.peek()` | `queue.Peek()` |
| `queue.isEmpty()` | `queue.Count == 0` |
| `queue.size()` | `queue.Count` |

## Vanliga misstag

- **`Dequeue` på en tom kö** kastar `InvalidOperationException`. Kontrollera `Count` först, eller använd `TryDequeue`.
- **`Enqueue` lägger alltid sist.** Du kan inte lägga ett element först i en kö. Då behöver du en annan struktur.
- **Ingen åtkomst till mitten.** `Contains` fungerar, men du kan inte läsa ett element på en viss plats.

## Terminologi

| Term | Betydelse |
|------|-----------|
| **FIFO** | First In, First Out. Det först inlagda tas ut först |
| **Enqueue** | Lägga ett element sist i kön |
| **Dequeue** | Ta bort och returnera det första elementet |
| **Peek** | Titta på det första elementet utan att ta bort det |
