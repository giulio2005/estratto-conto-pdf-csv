const fs = require('fs');
const pdf = require('pdf-parse');

/**
 * Estrae il testo completo da un file PDF
 * @param {string} pdfPath - Percorso del file PDF
 * @returns {Promise<string>} Testo estratto dal PDF
 */
async function extractTextFromPDF(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);

    // Restituisce il testo completo estratto
    return data.text;
  } catch (error) {
    console.error('Errore nell\'estrazione del testo dal PDF:', error);
    throw new Error('Impossibile estrarre il testo dal PDF');
  }
}

module.exports = { extractTextFromPDF };
