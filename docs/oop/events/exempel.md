---
title: Exempel — Bankkonto
description: "Ett bankkonto som sänder ut events för insättningar, uttag och regelbrott — ett realistiskt exempel med fler events än bara ett."
parent: Events
nav_order: 10
---
# Exempel — Bankkonto

Ett bankkonto behöver ofta rapportera mer än en sorts händelse: en insättning, ett uttag, och några saker som gick fel på vägen. Det här exemplet visar en klass med flera events samtidigt, och vad som händer när en insättning bryter mot en regel.

## Modellen

```csharp
public class Account
{
    public event EventHandler<TransactionEventArgs>? Deposited;
    public event EventHandler<TransactionEventArgs>? Withdrawn;
    public event EventHandler<TransactionEventArgs>? DepositRejected;
    public event EventHandler<TransactionEventArgs>? WithdrawalRejected;
    public event EventHandler<TransactionEventArgs>? LargeDepositFlagged;

    public int Balance { get; private set; }

    private const int LargeDepositThreshold = 15000;

    public void Deposit(int amount)
    {
        if (amount <= 0)
        {
            DepositRejected?.Invoke(this, new TransactionEventArgs(amount));
            return;
        }

        if (amount > LargeDepositThreshold)
            LargeDepositFlagged?.Invoke(this, new TransactionEventArgs(amount));

        Balance += amount;
        Deposited?.Invoke(this, new TransactionEventArgs(amount));
    }

    public void Withdraw(int amount)
    {
        if (amount <= 0 || amount > Balance)
        {
            WithdrawalRejected?.Invoke(this, new TransactionEventArgs(amount));
            return;
        }

        Balance -= amount;
        Withdrawn?.Invoke(this, new TransactionEventArgs(amount));
    }
}

public class TransactionEventArgs : EventArgs
{
    public int Amount { get; }
    public TransactionEventArgs(int amount) => Amount = amount;
}
```

Lägg märke till namnen: `Deposited`/`Withdrawn`, inte `Deposit`/`Withdraw`. Metoderna heter `Deposit` och `Withdraw` — händelserna som utlöses **efter** att de lyckats heter i dåtid. Det är inte bara stil: en metod och ett event kan inte heta exakt samma sak i samma klass, C# tillåter det inte. Dåtidsformen löser namnkonflikten och gör samtidigt tydligt att eventet betyder "det här har redan hänt", inte "gör det här nu".

## Prenumerera på flera events

```csharp
var account = new Account();

account.Deposited            += (s, e) => Console.WriteLine($"Insättning på {e.Amount} kr.");
account.Withdrawn            += (s, e) => Console.WriteLine($"Uttag på {e.Amount} kr.");
account.DepositRejected       += (s, e) => Console.WriteLine($"Insättning på {e.Amount} kr nekad.");
account.WithdrawalRejected    += (s, e) => Console.WriteLine($"Uttag på {e.Amount} kr nekat — otillräckligt saldo eller ogiltigt belopp.");
account.LargeDepositFlagged   += (s, e) => Console.WriteLine($"Insättning på {e.Amount} kr flaggad för manuell granskning.");

account.Deposit(1000);
account.Withdraw(500);
account.Withdraw(600);       // nekas — mer än saldot
account.Deposit(-100);       // nekas — ogiltigt belopp
account.Deposit(20000);      // går igenom, men flaggas också
```

### Output

```
Insättning på 1000 kr.
Uttag på 500 kr.
Uttag på 600 kr nekat — otillräckligt saldo eller ogiltigt belopp.
Insättning på -100 kr nekad.
Insättning på 20000 kr flaggad för manuell granskning.
Insättning på 20000 kr.
```

`Account` känner inte till vad som ska hända när gränsen på 15 000 kr överskrids — den bara flaggar det. Om det ska betyda en logg, ett mejl till en handläggare eller en spärr av kontot är upp till vem som lyssnar, inte upp till `Account`. Det är samma idé som i [Events](index.md): sändaren beskriver *vad som hände*, aldrig *vad som ska göras åt det*.

## Obligatorisk dad-joke

Varför fick banktjänstemannen sparken?

Han lyssnade aldrig på sina events — missade varenda varning.
