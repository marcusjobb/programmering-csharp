---
title: "CRUD-kodexempel"
description: "Färdiga kodexempel för Create, Read, Update och Delete med Entity Framework Core mot SQL-databaser."
parent: "SQL"
nav_order: 58
---

# CRUD-kodexempel

Färdiga mönster för de fyra grundläggande databasoperationerna med EF Core.

---

## CREATE

```csharp
using (var context = new AppDbContext())
{
    var customer = new Customer { Name = "Test", Email = "test@example.com" };
    context.Customers.Add(customer);
    context.SaveChanges();
}
```

---

## READ — alla

```csharp
using (var context = new AppDbContext())
{
    var customers = context.Customers.ToList();
}
```

---

## READ — filtrerad

```csharp
using (var context = new AppDbContext())
{
    var customers = context.Customers
        .Where(c => c.Email.EndsWith("@example.com"))
        .OrderBy(c => c.Name)
        .ToList();
}
```

---

## READ — med relationer

```csharp
using (var context = new AppDbContext())
{
    var customers = context.Customers
        .Include(c => c.Orders)
        .ThenInclude(o => o.OrderItems)
        .ToList();
}
```

---

## UPDATE

```csharp
using (var context = new AppDbContext())
{
    var customer = context.Customers.Find(1);
    if (customer != null)
    {
        customer.Email = "nyepost@example.com";
        context.SaveChanges();
    }
}
```

---

## DELETE

```csharp
using (var context = new AppDbContext())
{
    var customer = context.Customers.Find(1);
    if (customer != null)
    {
        context.Customers.Remove(customer);
        context.SaveChanges();
    }
}
```

---

> **EF Core-mönstret:** hämta → ändra → spara. `SaveChanges()` skriver allt till databasen på en gång. Om du hoppar över det händer ingenting.
