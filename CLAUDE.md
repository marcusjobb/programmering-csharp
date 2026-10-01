# programmering-csharp

## Länkar mellan sidor

Skriv interna länkar **relativt till källfilen**, med `.md` — som du skulle göra i VS Code eller på GitHub:

```markdown
[Records](records.md)                          <!-- samma mapp -->
[LINQ](../datastrukturer/linq.md)              <!-- annan avdelning -->
[GoF-mönster](../designmonster/gof/index.md)   <!-- en avdelnings index -->
[Rubrik](records.md#with-uttryck)              <!-- med ankare -->
```

Pluginet `site/src/plugins/doc-links.mjs` gör om dem till rätt absoluta URL:er vid bygget.

Skriv **inte** länkar utifrån den publicerade URL:en (`../records/`, `records/`) — de räknas från fel mapp och blir trasiga.

Kontrollera innan commit: `npm run check:links`. CI kör samma kontroll och stoppar deployen om någon länk är trasig.
