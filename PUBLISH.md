# 🚀 Guida Pubblicazione su GitHub

Segui questi passaggi per pubblicare il progetto su GitHub.

## Preparazione

### 1. Verifica i file

```bash
# Controlla che tutti i file siano presenti
ls -la

# Dovresti vedere:
# - README.md
# - LICENSE
# - .gitignore
# - package.json
# - server.js
# - public/
# - utils/
```

### 2. Rimuovi file sensibili (IMPORTANTE!)

```bash
# Verifica che .env NON sia committato
cat .gitignore | grep .env

# Output atteso: .env
```

## Pubblicazione su GitHub

### Step 1: Inizializza Git (se non già fatto)

```bash
# Inizializza repository
git init

# Verifica status
git status
```

### Step 2: Aggiungi tutti i file

```bash
# Aggiungi tutti i file al staging
git add .

# Verifica cosa stai per committare
git status
```

### Step 3: Primo commit

```bash
# Crea il primo commit
git commit -m "🎉 Initial commit - PDF to CSV converter with Gemini AI

- Add modern web interface with Tailwind CSS
- Implement PDF text extraction
- Add Gemini AI integration for smart column recognition
- Support multiple formats (PDF, CSV, XLS, XLSX, OFX, QIF)
- Add CSV preview with copy functionality
- Include comprehensive documentation"
```

### Step 4: Crea repository su GitHub

1. Vai su [github.com/new](https://github.com/new)
2. **Repository name**: `pdf-csv-statement`
3. **Description**: Self-hosted bank statement PDF to CSV converter using Gemini AI
4. **Visibility**: Public o Private (a tua scelta)
5. **NON** selezionare "Add README" (ce l'abbiamo già)
6. **NON** selezionare "Add .gitignore" (ce l'abbiamo già)
7. Clicca **"Create repository"**

### Step 5: Collega repository remoto

```bash
# Sostituisci 'yourusername' con il tuo username GitHub
git remote add origin https://github.com/yourusername/pdf-csv-statement.git

# Verifica
git remote -v
```

### Step 6: Push su GitHub

```bash
# Rinomina branch in 'main' (se necessario)
git branch -M main

# Push del codice
git push -u origin main
```

## Aggiornamenti Futuri

Quando fai modifiche al codice:

```bash
# 1. Aggiungi i file modificati
git add .

# 2. Commit con messaggio descrittivo
git commit -m "Descrizione delle modifiche"

# 3. Push su GitHub
git push
```

## Comandi Utili

### Verifica status

```bash
git status
```

### Visualizza cronologia

```bash
git log --oneline
```

### Crea un nuovo branch per feature

```bash
# Crea e passa a nuovo branch
git checkout -b feature/nome-feature

# Lavora sulla feature...
git add .
git commit -m "Add feature X"

# Push del branch
git push -u origin feature/nome-feature
```

### Aggiorna .env.example (se cambi configurazione)

```bash
# Modifica .env.example (NON .env!)
nano .env.example

# Commit
git add .env.example
git commit -m "Update environment variables template"
git push
```

## ⚠️ Checklist Pre-Push

Prima di ogni push, verifica:

- [ ] `.env` NON è nel commit (controllare con `git status`)
- [ ] README.md è aggiornato
- [ ] Nessun file sensibile (API key, password) nel codice
- [ ] File `uploads/` e `outputs/` sono vuoti (solo `.gitkeep`)
- [ ] Codice testato in locale

## 🏷️ Creare una Release

Quando vuoi creare una versione stabile:

```bash
# 1. Crea un tag
git tag -a v1.0.0 -m "Release v1.0.0 - Initial stable release"

# 2. Push del tag
git push origin v1.0.0
```

Poi vai su GitHub → Releases → "Create a new release" → Seleziona il tag `v1.0.0`

## 📝 Esempio Messaggio Commit

Segui questo formato:

```bash
# Feature
git commit -m "✨ Add CSV preview with scroll"

# Bug fix
git commit -m "🐛 Fix double file picker opening"

# Documentation
git commit -m "📝 Update installation guide"

# Performance
git commit -m "⚡ Optimize Gemini API prompt"

# Refactor
git commit -m "♻️ Refactor PDF extraction logic"
```

## 🎯 Badge per README (opzionale)

Aggiungi badge dinamici al README:

```markdown
[![GitHub stars](https://img.shields.io/github/stars/yourusername/pdf-csv-statement?style=social)](https://github.com/yourusername/pdf-csv-statement/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/pdf-csv-statement?style=social)](https://github.com/yourusername/pdf-csv-statement/network/members)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/pdf-csv-statement)](https://github.com/yourusername/pdf-csv-statement/issues)
```

---

## ✅ Completato!

Il tuo progetto è ora pubblico su GitHub! 🎉

**Link repository**: `https://github.com/yourusername/pdf-csv-statement`

Condividilo, ricevi feedback e contributi dalla community! ⭐
