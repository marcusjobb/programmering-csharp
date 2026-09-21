---
title: Stack och Queue
description: "Stack och Queue i Datastrukturer — C# bok av Marcus Ackre Medina"
parent: Datastrukturer
nav_order: 55
---

# Stack och Queue

Stack och Queue är specialiserade samlingar med en enkel regel: du kan bara lägga till och ta bort element på ett bestämt ställe. Regeln är det som gör dem användbara.

## TL;DR

- `Stack<T>` — LIFO. Sist in, först ut. Tänk tallrikar i en stapel.
- `Queue<T>` — FIFO. Först in, först ut. Tänk en vanlig kö.
- Båda ger `O(1)` för add/remove. Sökning (`Contains`) kostar `O(n)`.

---

## Stack&lt;T&gt; — LIFO

Det sista som lades på stapeln tas bort först.

```csharp
var history = new Stack<string>();

history.Push("Öppnade fil");
history.Push("Skrev text");
history.Push("Formaterade");

history.Peek();  // "Formaterade" — kika utan att ta bort
history.Pop();   // "Formaterade" — tas bort och returneras
history.Pop();   // "Skrev text"
```

### Viktiga metoder

```csharp
var stack = new Stack<int>();
stack.Push(10);
stack.Push(20);

stack.Peek();               // 20 — kasta om tom: InvalidOperationException
stack.Pop();                // 20
stack.Contains(10);         // true — O(n)
stack.Count;                // 1
stack.ToArray();            // { 10 } — i LIFO-ordning
stack.Clear();

// Säker variant (.NET Core 2.0+)
if (stack.TryPop(out int v)) { /* v är värdet */ }
if (stack.TryPeek(out int t)) { /* t är toppen */ }
```

### Undo/redo

Stack är standardvalet för undo-funktionalitet:

```csharp
var undo = new Stack<ICommand>();
var redo = new Stack<ICommand>();

void Run(ICommand cmd)
{
    cmd.Execute();
    undo.Push(cmd);
    redo.Clear(); // ny action rensar redo
}

void Undo()
{
    if (undo.TryPop(out var cmd))
    {
        cmd.Undo();
        redo.Push(cmd);
    }
}

void do_if()
{
    if (redo.TryPop(out var cmd))
    {
        cmd.Execute();
        undo.Push(cmd);
    }
}
```

### Parenteser-matchning

```csharp
bool IsBalanced(string expression)
{
    var stack = new Stack<char>();
    foreach (char c in expression)
    {
        if (c is '(' or '[' or '{')
            stack.Push(c);
        else if (c is ')' or ']' or '}')
        {
            if (!stack.TryPop(out char open)) return false;
            if (!ÄrPar(open, c)) return false;
        }
    }
    return stack.Count == 0;
}

bool ÄrPar(char ö, char s) =>
    (ö == '(' && s == ')') ||
    (ö == '[' && s == ']') ||
    (ö == '{' && s == '}');
```

---

## Queue&lt;T&gt; — FIFO

Det som lades in först tas också ut först.

```csharp
var ko = new Queue<string>();

ko.Enqueue("Pelle");
ko.Enqueue("Kalle");
ko.Enqueue("Sara");

ko.Peek();     // "Pelle" — kika utan att ta bort
ko.Dequeue();  // "Pelle" — tas bort och returneras
ko.Dequeue();  // "Kalle"
```

### Viktiga metoder

```csharp
var queue = new Queue<int>();
queue.Enqueue(1);
queue.Enqueue(2);

queue.Peek();              // 1 — kasta om tom: InvalidOperationException
queue.Dequeue();           // 1
queue.Contains(2);         // true — O(n)
queue.Count;               // 1
queue.ToArray();           // { 2 } — i FIFO-ordning
queue.Clear();

// Säker variant
if (queue.TryDequeue(out int v)) { /* v är värdet */ }
if (queue.TryPeek(out int t)) { /* t är fronten */ }
```

### Jobbschemaläggning

```csharp
var jobCop = new Queue<string>();

jobCop.Enqueue("Backup");
jobCop.Enqueue("Skicka e-post");
jobCop.Enqueue("Generera rapport");

while (jobCop.Count > 0)
{
    string job = jobCop.Dequeue();
    Console.WriteLine($"Bearbetar: {job}");
}
```

### Bredden-först-sökning (BFS)

Queue är standardvalet för BFS i träd och grafer:

```csharp
void BFS(TreeNode rot)
{
    var ko = new Queue<TreeNode>();
    ko.Enqueue(rot);

    while (ko.Count > 0)
    {
        var nod = ko.Dequeue();
        Console.WriteLine(nod.Value);
        foreach (var barn in nod.Barn)
            ko.Enqueue(barn);
    }
}
```

---

## Stack vs Queue — när vilket?

| Situation                                 | Välj       |
|-------------------------------------------|------------|
| Undo/redo                                 | Stack      |
| Parenteser, uttryckseval, backtracking    | Stack      |
| Webbläsarhistorik (bakåtknapp)            | Stack      |
| Jobbschemaläggning, printköer             | Queue      |
| Bredden-först-sökning (BFS)               | Queue      |
| Buffert för strömmande data               | Queue      |

---

## Vanliga misstag

- **Anropa `Pop`/`Dequeue` på en tom samling**: kastar `InvalidOperationException`. Använd `TryPop`/`TryDequeue` när du inte är säker.
- **Modifiera samlingen under iteration**: kastar `InvalidOperationException`. Kopiera till lista om du behöver iterera och modifiera.

---

## Övningar

1. Implementera en miniräknare som evaluerar ett postfix-uttryck (`3 4 + 2 *`) med hjälp av en Stack.
2. Bygg en enkel uppgiftsschemaläggare med Queue — lägg till jobb, bearbeta ett i taget, skriv ut statusen.
3. Kontrollera om en sträng är ett palindrom med hjälp av både Stack och Queue.
