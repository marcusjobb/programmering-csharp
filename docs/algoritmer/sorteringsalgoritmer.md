---
title: Sorteringsalgoritmer
description: "Du har redan använt .Sort() och .OrderBy() (se LINQ) utan att tänka på vad som faktiskt händer under huven. Den här sidan öppnar upp den svarta lådan."
parent: Algoritmer
nav_order: 20
---

# Sorteringsalgoritmer

Du har redan använt `.Sort()` och `.OrderBy()` (se [LINQ](../datastrukturer/linq.md)) utan att tänka på vad som faktiskt händer under huven. Den här sidan öppnar upp den svarta lådan.

> **Se dem i rörelse:** [Sorteringsalgoritmer som folkdans — spellista](https://www.youtube.com/playlist?list=PLKz9ISqcKAGDRVYAlEpWwbOwQTvLLPDq1). Varje algoritm visualiserad som en dans — det låter absurt, men att *se* jämförelserna och bytena ske i rörelse gör komplexiteten mycket mer konkret än att bara läsa kod.

## TL;DR

- **Bubble Sort** och **Selection Sort** — enkla att förstå, `O(n²)`, bra för undervisning, dåliga för stora listor.
- **Insertion Sort** — `O(n²)` värsta fall, men riktigt snabb på nästan sorterad data.
- **Merge Sort** — `O(n log n)` garanterat, stabil, men använder extra minne.
- **Quick Sort** — `O(n log n)` i snitt, snabbast i praktiken, men `O(n²)` i värsta fall.
- I C# behöver du sällan skriva någon av dem för hand — `.Sort()`/`.OrderBy()` räcker. Förstå dem ändå — det är grunden för att veta *varför* vissa operationer är långsamma.

## Bubble Sort — den enklaste att förstå

Jämför grannar, byt om de står fel, upprepa tills inget byts längre. Namnet kommer av att stora värden "bubblar upp" mot slutet, ett steg i taget.

```csharp
public static void BubbleSort(int[] data)
{
    for (int i = 0; i < data.Length - 1; i++)
        for (int j = 0; j < data.Length - i - 1; j++)
            if (data[j] > data[j + 1])
                (data[j], data[j + 1]) = (data[j + 1], data[j]);
}
```

**Komplexitet:** `O(n²)` — för varje element, gå igenom nästan hela resten av listan igen.

## Selection Sort — hitta minsta, byt in

Gå igenom listan, hitta det minsta elementet, byt plats med det första osorterade elementet. Upprepa för nästa position.

```csharp
public static void SelectionSort(int[] data)
{
    for (int i = 0; i < data.Length - 1; i++)
    {
        int minIndex = i;
        for (int j = i + 1; j < data.Length; j++)
            if (data[j] < data[minIndex])
                minIndex = j;

        (data[i], data[minIndex]) = (data[minIndex], data[i]);
    }
}
```

**Komplexitet:** `O(n²)` — men gör alltid exakt lika många jämförelser oavsett indata, till skillnad från Bubble Sort som kan avsluta tidigt på nästan sorterad data.

## Insertion Sort — som att sortera spelkort i handen

Bygg upp en sorterad del av listan i taget, genom att sätta in nästa element på rätt plats — precis som när du sorterar kort i handen medan du delas dem.

```csharp
public static void InsertionSort(int[] data)
{
    for (int i = 1; i < data.Length; i++)
    {
        int current = data[i];
        int j = i - 1;

        while (j >= 0 && data[j] > current)
        {
            data[j + 1] = data[j];
            j--;
        }
        data[j + 1] = current;
    }
}
```

**Komplexitet:** `O(n²)` värsta fall, men `O(n)` om listan redan nästan är sorterad — betydligt snabbare i praktiken för sådan data än Bubble och Selection Sort.

## Merge Sort — dela, sortera, slå ihop

Dela listan i halvor rekursivt tills varje del bara har ett element (redan "sorterat" per definition), slå sedan ihop halvorna i sorterad ordning.

```csharp
public static int[] MergeSort(int[] data)
{
    if (data.Length <= 1) return data;

    int mid = data.Length / 2;
    var left  = MergeSort(data[..mid]);
    var right = MergeSort(data[mid..]);

    return Merge(left, right);
}

private static int[] Merge(int[] left, int[] right)
{
    var result = new int[left.Length + right.Length];
    int i = 0, j = 0, k = 0;

    while (i < left.Length && j < right.Length)
        result[k++] = left[i] <= right[j] ? left[i++] : right[j++];

    while (i < left.Length)  result[k++] = left[i++];
    while (j < right.Length) result[k++] = right[j++];

    return result;
}
```

**Komplexitet:** `O(n log n)` garanterat — alltid, oavsett indata. Priset: den allokerar nya arrayer under vägen, till skillnad från de tidigare algoritmerna som sorterar på plats.

## Quick Sort — snabbast i praktiken

Välj ett "pivot"-element, partitionera listan så att allt mindre hamnar till vänster och allt större till höger, sortera sedan varje sida rekursivt.

```csharp
public static void QuickSort(int[] data, int low, int high)
{
    if (low >= high) return;

    int pivot = data[high];
    int i = low - 1;

    for (int j = low; j < high; j++)
    {
        if (data[j] < pivot)
        {
            i++;
            (data[i], data[j]) = (data[j], data[i]);
        }
    }
    (data[i + 1], data[high]) = (data[high], data[i + 1]);

    int pivotIndex = i + 1;
    QuickSort(data, low, pivotIndex - 1);
    QuickSort(data, pivotIndex + 1, high);
}
```

**Komplexitet:** `O(n log n)` i genomsnitt — och i praktiken ofta snabbast av alla här, tack vare bra cache-lokalitet. Värsta fall är `O(n²)` (redan sorterad data med ett dåligt pivot-val), men moderna implementationer väljer pivot smart för att nästan alltid undvika det.

## Jämförelse

| Algoritm | Bäst | Värsta | Extra minne | Stabil |
|---|---|---|---|---|
| Bubble Sort | `O(n)` | `O(n²)` | Nej | Ja |
| Selection Sort | `O(n²)` | `O(n²)` | Nej | Nej |
| Insertion Sort | `O(n)` | `O(n²)` | Nej | Ja |
| Merge Sort | `O(n log n)` | `O(n log n)` | Ja | Ja |
| Quick Sort | `O(n log n)` | `O(n²)` | Nej (in-place) | Nej |

"Stabil" betyder att element med lika värde behåller sin inbördes ordning efter sortering — relevant t.ex. om du sorterar en redan namnsorterad lista på ålder, och vill att personer med samma ålder fortfarande står i bokstavsordning.

## Använd ramverket i praktiken

```csharp
int[] tal = { 5, 2, 8, 1 };
Array.Sort(tal);          // Introsort — en hybrid av Quick Sort, Heap Sort och Insertion Sort

var namn = new List<string> { "Björn", "Anna", "Cesar" };
namn.Sort();               // Samma sak för List<T>

var sorterade = namn.OrderBy(n => n).ToList();   // LINQ — stabil, skapar en ny lista
```

`.Sort()` i .NET väljer algoritm åt dig (en hybrid, kallad Introsort) — snabb i praktiken, och du behöver aldrig implementera Quick Sort för hand i produktionskod. Förståelsen ovan är till för att veta *varför* den är snabb, och för att kunna resonera om komplexitet när du väljer datastruktur.

## TL;DR

Fem klassiska sorteringsalgoritmer, alla med samma mål men olika avvägningar mellan enkelhet, minnesanvändning och värsta-falls-prestanda. I C# räcker `.Sort()`/`.OrderBy()` nästan alltid — men att förstå vad de gör under huven gör dig bättre på att avgöra *varför* en operation är långsam.
