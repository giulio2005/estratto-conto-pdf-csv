const { GoogleGenerativeAI } = require('@google/generative-ai');

// Inizializza l'API di Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Processa il testo estratto dal PDF usando Gemini AI per generare un CSV strutturato
 * @param {string} extractedText - Testo estratto dal PDF
 * @returns {Promise<string>} CSV formattato con separatore punto e virgola
 */
async function processWithGemini(extractedText) {
  try {
    // Usa il modello Gemini 2.5 Flash-Lite (più veloce, gratuito)
    console.log('🔧 Inizializzazione modello gemini-2.5-flash-lite');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    const prompt = `Estrai tutte le transazioni bancarie dal testo e genera CSV con formato: Data;Descrizione;Uscite;Entrate

REGOLE:
- Separatore: punto e virgola (;)
- NON includere intestazioni colonne
- Data: DD/MM/YYYY esattamente come appare nel testo
- Descrizione: COMPLETA e INTEGRALE, copia l'intera descrizione dal testo senza abbreviare, riassumere o modificare
- Uscite: importo numerico (es: 85,50) se uscita, altrimenti vuoto
- Entrate: importo numerico (es: 2.500,00) se entrata, altrimenti vuoto
- NO simboli valuta (€, EUR)
- Ignora intestazioni, footer, saldi
- IMPORTANTE: Mantieni la descrizione esattamente come appare nel PDF, senza tagli o riassunti

ESEMPIO:
01/01/2024;Stipendio gennaio azienda XYZ riferimento 12345;;2500.00
03/01/2024;Bolletta energia elettrica ENEL periodo dicembre fattura n.987654;85.50;

Testo da analizzare:
${extractedText}

Output (solo CSV, nessun testo aggiuntivo):`;

    console.log('📤 Invio richiesta a Gemini API...');
    const result = await model.generateContent(prompt);
    console.log('📥 Risposta ricevuta da Gemini!');

    const response = result.response;
    let csvText = response.text();
    console.log(`✅ CSV generato: ${csvText.length} caratteri`);

    // Pulisci il CSV da eventuali marker di code block markdown
    csvText = csvText
      .replace(/```csv\n/g, '')
      .replace(/```\n/g, '')
      .replace(/```/g, '')
      .trim();

    return csvText;
  } catch (error) {
    console.error('❌ Errore nel processing con Gemini:', error);
    console.error('Dettagli errore:', error.message);
    if (error.response) {
      console.error('Response error:', error.response);
    }
    throw new Error(`Gemini AI error: ${error.message}`);
  }
}

module.exports = { processWithGemini };
