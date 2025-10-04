# 📊 Estratti Conto PDF → CSV

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash--Lite-orange)](https://ai.google.dev/)

**Applicazione web self-hosted per convertire estratti conto bancari (PDF, CSV, XLS, XLSX, OFX, QIF) in file CSV strutturati pronti per l'importazione nei gestionali.**

✨ **100% Self-hosted** • 🔒 **Privacy-first** • 🆓 **Completamente gratuito** • ⚡ **Powered by Gemini AI**

---

## 🎯 Caratteristiche

- ✅ **Interfaccia moderna e intuitiva** con Tailwind CSS e dark mode
- ✅ **Drag & drop** per caricare file facilmente
- ✅ **Anteprima CSV** completa con scroll e pulsante copia
- ✅ **Multi-formato**: PDF, CSV, XLS, XLSX, OFX, QIF
- ✅ **AI intelligente**: Gemini 2.5 Flash-Lite riconosce automaticamente le colonne
- ✅ **Privacy garantita**: i dati restano sul tuo server
- ✅ **Nessun costo**: tier gratuito Gemini (1000 richieste/giorno)
- ✅ **Descrizioni complete**: estrae i testi integrali senza abbreviazioni
- ✅ **Output personalizzabile**: formato CSV con separatore `;`

---

## 📋 Requisiti

### Software Necessario

- **Node.js** ≥ 16.0.0 ([Scarica qui](https://nodejs.org/))
- **npm** (incluso con Node.js)
- **API Key Gemini** gratuita ([Ottienila qui](https://aistudio.google.com/app/apikey))

### Limiti Tier Gratuito Gemini 2.5 Flash-Lite

| Metrica | Limite Gratuito |
|---------|-----------------|
| Richieste al minuto (RPM) | 15 |
| Token al minuto (TPM) | 250.000 |
| Richieste al giorno (RPD) | 1.000 |
| **Costo** | **€0,00** |

---

## 🚀 Installazione Rapida

### 1. Clona il repository

```bash
git clone https://github.com/giulio2005/estratto-conto-pdf-csv.git
cd estratto-conto-pdf-csv
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Configura l'API Key di Gemini

#### a) Ottieni la tua API Key gratuita

1. Vai su [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Clicca su **"Create API Key"**
3. Copia la chiave generata

#### b) Crea il file `.env`

```bash
cp .env.example .env
```

#### c) Modifica `.env` e inserisci la tua API key

```bash
# Apri .env con il tuo editor preferito
nano .env
# oppure
code .env
```

Inserisci:

```env
GEMINI_API_KEY=la_tua_api_key_qui
PORT=3000
```

### 4. Avvia l'applicazione

#### ⚡ Metodo Rapido (Consigliato)

Dopo la prima installazione, usa lo script di avvio:

**macOS / Linux:**
```bash
./start.sh
```

**Windows:**
- Doppio click su `start.bat`

Lo script controllerà automaticamente:
- ✅ Presenza di Node.js
- ✅ Configurazione `.env`
- ✅ Installazione dipendenze
- ✅ Avvio del server

#### Metodo Manuale

```bash
# Modalità Produzione
npm start

# Modalità Sviluppo (con auto-reload)
npm run dev
```

### 5. Apri il browser

```
http://localhost:3000
```

---

## 🎨 Utilizzo

1. **Trascina** il tuo PDF estratto conto nella zona di drop (o clicca per selezionare)
2. **Clicca** su "Converti in CSV"
3. **Attendi** l'elaborazione (20-60 secondi a seconda della dimensione)
4. **Visualizza** l'anteprima completa del CSV generato
5. **Scarica** il file CSV o **copia** il contenuto negli appunti

### Formato Output

```csv
Data;Descrizione;Uscite;Entrate
01/01/2024;Stipendio gennaio azienda XYZ riferimento 12345;;2500.00
03/01/2024;Bolletta energia elettrica ENEL periodo dicembre;85.50;
05/01/2024;Bonifico ricevuto da cliente ABC società;;1200.00
10/01/2024;Prelievo bancomat Unicredit via Roma;100.00;
```

**Caratteristiche del CSV:**
- Separatore: punto e virgola (`;`)
- Formato data: `DD/MM/YYYY`
- Importi: formato numerico con 2 decimali (es: `150.00`)
- NO intestazioni colonne
- Descrizioni complete e integrali dal PDF originale

---

## 📂 Struttura del Progetto

```
pdf-csv-statement/
├── server.js              # Server Express principale
├── package.json           # Dipendenze e script
├── .env                   # Configurazione (API key) - NON committare!
├── .env.example           # Template configurazione
├── .gitignore            # File da ignorare su Git
├── README.md             # Questa documentazione
├── public/
│   └── index.html        # Frontend (HTML + Tailwind CSS)
├── utils/
│   ├── pdfExtractor.js   # Estrazione testo da PDF
│   └── geminiProcessor.js # Processing con Gemini AI
├── uploads/              # PDF temporanei (auto-puliti)
└── outputs/              # CSV generati (temporanei)
```

---

## 🔧 Configurazione Avanzata

### Variabili d'Ambiente (`.env`)

```env
# API Key di Google Gemini (OBBLIGATORIA)
GEMINI_API_KEY=your_api_key_here

# Porta del server (default: 3000)
PORT=3000
```

### Personalizzazione del Prompt AI

Puoi modificare il prompt in `utils/geminiProcessor.js` per:
- Cambiare il formato delle colonne
- Aggiungere/rimuovere campi
- Migliorare il riconoscimento per banche specifiche

### Cambiare il Modello AI

In `utils/geminiProcessor.js`:

```javascript
// Modello corrente: veloce e gratuito
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

// Alternative:
// const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // Più accurato
// const model = genAI.getGenerativeModel({ model: 'gemini-pro' }); // Stabile
```

---

## 🐛 Troubleshooting

### Errore: "GEMINI_API_KEY non configurata"

```bash
# Verifica che .env esista
ls -la .env

# Verifica il contenuto
cat .env

# Deve contenere:
GEMINI_API_KEY=AIza...la_tua_chiave
```

### Errore: "Nessun testo estratto dal PDF"

**Possibili cause:**
- PDF protetto da password
- PDF contenente solo immagini (non testo selezionabile)
- PDF corrotto

**Soluzione:** Usa un PDF con testo selezionabile

### Errore: "Port 3000 already in use"

```bash
# Cambia porta in .env
echo "PORT=3001" >> .env

# Oppure termina il processo sulla porta 3000
lsof -ti:3000 | xargs kill -9
```

---

## 🤝 Contribuire

I contributi sono benvenuti! Se vuoi contribuire:

1. Fai un **Fork** del progetto
2. Crea un **Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** le modifiche (`git commit -m 'Add AmazingFeature'`)
4. **Push** al Branch (`git push origin feature/AmazingFeature`)
5. Apri una **Pull Request**

---

## 📄 Licenza

Questo progetto è rilasciato sotto licenza **MIT**. Vedi il file [LICENSE](LICENSE) per i dettagli.

---

## 🔗 Link Utili

- [Documentazione Google Gemini API](https://ai.google.dev/docs)
- [Google AI Studio (API Key)](https://aistudio.google.com/app/apikey)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [pdf-parse NPM](https://www.npmjs.com/package/pdf-parse)

---

## 📊 Roadmap

- [ ] Supporto OCR per PDF scansionati
- [ ] Export multi-formato (JSON, Excel)
- [ ] Template personalizzabili per banca
- [ ] Docker support
- [ ] Batch processing (multipli file)

---

## ⭐ Supporto

Se questo progetto ti è utile:
- Metti una ⭐ **Star** su GitHub
- Condividi il progetto
- Segnala bug tramite [Issues](https://github.com/tuo-username/pdf-csv-statement/issues)

---

<p align="center">
  Fatto con ❤️ • Self-hosted • Privacy-first • Open Source
</p>
