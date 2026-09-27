---
title: DB Browser for SQLite
description: "Installera och använd DB Browser for SQLite — det visuella verktyget för att se och redigera .db-filer på Windows, Mac och Linux."
parent: SQL
nav_order: 3
---

# DB Browser for SQLite

DB Browser for SQLite är ett gratis verktyg med grafiskt gränssnitt för SQLite-databaser. Det låter dig öppna `.db`-filer och se vad som finns i dem utan att skriva SQL — perfekt för att förstå och felsöka vad din kod gör mot databasen.

Ladda ner på **[sqlitebrowser.org](https://sqlitebrowser.org)**.

---

## Windows

1. Gå till sqlitebrowser.org → **Download**
2. Välj **Windows** → ladda ner `.msi`-filen (64-bit)
3. Kör installationen och följ guiden
4. Starta från startmenyn

---

## macOS

**Homebrew (rekommenderas):**

```bash
brew install --cask db-browser-for-sqlite
```

**Direkt nedladdning:**

1. Gå till sqlitebrowser.org → **Download**
2. Välj **macOS** → ladda ner `.dmg`-filen
3. Öppna DMG och dra appen till Applications
4. Starta via Launchpad eller Spotlight

> Om macOS blockerar appen: högerklicka → Öppna. Gatekeeper kräver detta för appar utanför App Store.

---

## Linux

**Ubuntu / Debian:**

```bash
sudo apt update && sudo apt install sqlitebrowser
```

**Fedora:**

```bash
sudo dnf install sqlitebrowser
```

**Arch:**

```bash
sudo pacman -S sqlitebrowser
```

---

## Verifiera

1. Starta DB Browser
2. Klicka **New Database**, ge den ett namn (`test.db`)
3. Gå till fliken **Execute SQL** och kör:

```sql
SELECT * FROM sqlite_master;
```

Ser du ett resultat fungerar allt.

---

## Hur du använder det

Öppna din `.db`-fil parallellt med koden. Varje gång du kör ett INSERT, UPDATE eller DELETE — växla till DB Browser och se resultatet. Det är det snabbaste sättet att förstå vad som faktiskt händer i databasen.

| sqliteonline.com | DB Browser for SQLite |
|-----------------|----------------------|
| Snabb lek i webbläsaren | Riktiga `.db`-filer lokalt |
| Ingen installation | Installeras en gång |
| Inget sparas | Sparar till disk |
