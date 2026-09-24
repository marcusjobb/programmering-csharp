---
title: LinkedList
description: "LinkedList i Datastrukturer — C# bok av Marcus Ackre Medina"
parent: Datastrukturer
nav_order: 45
---

# LinkedList&lt;T&gt;

En `LinkedList<T>` är en samling noder där varje nod håller ett värde och en pekare till nästa — och i .NET även till föregående — nod. Till skillnad från en lista finns inget underliggande array-block. Du kan lägga till och ta bort element i mitten utan att flytta runt data.

## TL;DR

- `LinkedList<T>` är bra när du ofta lägger till eller tar bort element mitt i samlingen.
- Slumpmässig åtkomst (`minList[5]`) är långsam — `O(n)`. Välj `List<T>` om du indexerar ofta.
- .NET:s `LinkedList<T>` är dubbel-länkad — varje nod har både `Next` och `Previous`.

---

## Hur den är uppbyggd

```text
[HEAD] → [Data | Prev | Next] → [Data | Prev | Next] → … → [Data | null]
```

En enkel-länkad lista pekar bara framåt. .NET:s variant är dubbel-länkad och kan traverseras i båda riktningar.

---

## Komplexitet

| Operation                      | LinkedList&lt;T&gt; | List&lt;T&gt;         |
|-------------------------------|---------------------|------------------------|
| Lägg till i början/slutet     | `O(1)`              | `O(1)` (bara slutet)   |
| Lägg till i mitten (med nod)  | `O(1)`              | `O(n)`                 |
| Borttag (med referens)        | `O(1)`              | `O(n)`                 |
| Hitta via index               | `O(n)`              | `O(1)`                 |
| Iteration                     | `O(n)`              | `O(n)`                 |

`O(1)` vid insättning gäller bara när du redan har en referens till noden — att *hitta* rätt nod kostar `O(n)`.

---

## Exempel: använda LinkedList&lt;T&gt;

```csharp
var todo = new LinkedList<string>();

todo.AddLast("Koka kaffe");
var kodaNode = todo.AddLast("Skriva kod");
todo.AddLast("Pusha till GitHub");

// Lägg in något direkt före en känd nod — O(1)
todo.AddBefore(kodaNode, "Sätta på spellistan");

// Ta bort noden direkt — O(1)
todo.Remove(kodaNode);

foreach (var task in todo)
{
    Console.WriteLine(task);
}
```

`AddBefore` och `Remove` tar emot `LinkedListNode<T>` — det är nodreferensen som gör operationerna konstant tid.

---

## Bygg en egen nod

```csharp
public class Node<T>
{
    public T Value { get; set; }
    public Node<T>? Next { get; set; }

    public Node(T value) => Value = value;
}

public class SinglyLinkedList<T>
{
    public Node<T>? Head { get; private set; }

    public void AddFirst(T value)
    {
        var node = new Node<T>(value) { Next = Head };
        Head = node;
    }

    public void RemoveFirst()
    {
        if (Head is not null)
            Head = Head.Next;
    }
}
```

En egen implementation ger förståelse för pekare och vad som händer under huven.

---

## När ska du använda LinkedList?

Välj `LinkedList<T>` när du:
- Bygger undo/redo där du rör dig framåt och bakåt i historiken.
- Implementerar en LRU-cache (flytta senaste elementet till fronten i `O(1)`).
- Ofta lägger till eller tar bort element mitt i samlingen.

Välj `List<T>` när du:
- Läser ofta via index.
- Förändrar samlingen sällan men itererar ofta.
- Behöver serialisera till JSON/XML — `LinkedList<T>` ger mer verbos output.

---

## Vanliga misstag

- **Tappa noder**: vid dubbel-länkning måste du uppdatera både `Next` och `Previous`, annars skapar du noder som aldrig nås.
- **Ta bort under iteration**: spara `current.Next` i en variabel *innan* du anropar `Remove(current)`.
- **Indexering**: `LinkedList<T>` har ingen indexer — behöver du `list[i]` regelbundet är fel struktur vald.

---

## Kombinera med Dictionary

En klassisk kombination för LRU-cache:

```csharp
// Nyckeln ger O(1) till noden, noden ger O(1) flytt i listan
var cache = new Dictionary<string, LinkedListNode<string>>();
var order = new LinkedList<string>();
```

---

## Övningar

1. Implementera `MoveToFront(LinkedListNode<T>)` som flyttar en nod till listans början.
2. Bygg en musikspellista där du kan stega framåt och bakåt utan att tappa nuvarande position.
3. Implementera en enkel LRU-cache med `LinkedList<T>` och `Dictionary<K, LinkedListNode<T>>`.
