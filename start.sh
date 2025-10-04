#!/bin/bash

# Script di avvio per Estratti Conto PDF → CSV
# Uso: ./start.sh

echo "🚀 Avvio Estratti Conto PDF → CSV..."
echo ""

# Controlla se Node.js è installato
if ! command -v node &> /dev/null; then
    echo "❌ Node.js non trovato!"
    echo "   Installa Node.js da: https://nodejs.org/"
    exit 1
fi

# Controlla se esiste .env
if [ ! -f .env ]; then
    echo "⚠️  File .env non trovato!"
    echo ""
    echo "Creazione file .env da .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANTE: Devi configurare la tua API Key Gemini!"
    echo "   1. Vai su: https://aistudio.google.com/app/apikey"
    echo "   2. Crea una API Key gratuita"
    echo "   3. Modifica il file .env e inserisci la chiave"
    echo ""
    read -p "Premi INVIO dopo aver configurato .env..."
fi

# Controlla se node_modules esiste
if [ ! -d "node_modules" ]; then
    echo "📦 Installazione dipendenze..."
    npm install
    echo ""
fi

# Verifica che GEMINI_API_KEY sia configurata
if ! grep -q "GEMINI_API_KEY=AIza" .env 2>/dev/null; then
    echo "⚠️  Sembra che GEMINI_API_KEY non sia ancora configurata in .env"
    echo "   Il server potrebbe non funzionare correttamente."
    echo ""
fi

# Avvia il server
echo "✅ Avvio server..."
echo "📊 Apri il browser su: http://localhost:3000"
echo ""
echo "Premi Ctrl+C per terminare il server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm start
