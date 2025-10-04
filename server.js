require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { extractTextFromPDF } = require('./utils/pdfExtractor');
const { processWithGemini } = require('./utils/geminiProcessor');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Configurazione Multer per upload PDF
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'statement-' + uniqueSuffix + '.pdf');
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accetta PDF e altri formati
    const allowedMimes = [
      'application/pdf',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    if (allowedMimes.includes(file.mimetype) || file.originalname.match(/\.(pdf|csv|xls|xlsx|ofx|qif)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Formato non supportato'), false);
    }
  },
  limits: { fileSize: 20 * 1024 * 1024 } // Max 20MB
});

// Nuovo endpoint per il frontend moderno - restituisce direttamente il CSV
app.post('/api/convert', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nessun file caricato' });
    }

    console.log('📄 File ricevuto:', req.file.filename);

    // Step 1: Estrai testo dal PDF
    console.log('🔍 Estrazione testo dal file...');
    const extractedText = await extractTextFromPDF(req.file.path);

    if (!extractedText || extractedText.trim().length === 0) {
      throw new Error('Nessun testo estratto dal file');
    }

    console.log(`✅ Testo estratto: ${extractedText.length} caratteri`);

    // Step 2: Processa con Gemini AI
    console.log('🤖 Processing con Gemini AI...');
    const csvData = await processWithGemini(extractedText);

    console.log('✅ CSV generato');

    // Step 3: Pulisci il file caricato
    fs.unlinkSync(req.file.path);

    // Step 4: Restituisci il CSV come blob
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="estratto-converted.csv"`);
    res.send(csvData);

  } catch (error) {
    console.error('❌ Errore nel processing:', error);

    // Pulisci il file caricato in caso di errore
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: error.message || 'Errore nel processamento del file'
    });
  }
});

// Endpoint vecchio per retrocompatibilità
app.post('/api/process-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nessun file PDF caricato' });
    }

    console.log('📄 PDF ricevuto:', req.file.filename);

    // Step 1: Estrai testo dal PDF
    console.log('🔍 Estrazione testo dal PDF...');
    const extractedText = await extractTextFromPDF(req.file.path);

    if (!extractedText || extractedText.trim().length === 0) {
      throw new Error('Nessun testo estratto dal PDF');
    }

    console.log(`✅ Testo estratto: ${extractedText.length} caratteri`);

    // Step 2: Processa con Gemini AI
    console.log('🤖 Processing con Gemini AI...');
    const csvData = await processWithGemini(extractedText);

    // Step 3: Salva il CSV
    const csvFilename = `statement-${Date.now()}.csv`;
    const csvPath = path.join(__dirname, 'outputs', csvFilename);
    fs.writeFileSync(csvPath, csvData, 'utf-8');

    console.log('✅ CSV generato:', csvFilename);

    // Step 4: Pulisci il PDF caricato
    fs.unlinkSync(req.file.path);

    // Ritorna il CSV
    res.json({
      success: true,
      csvFilename: csvFilename,
      downloadUrl: `/api/download/${csvFilename}`,
      preview: csvData.split('\n').slice(0, 6).join('\n') // Primi 5 righe + header
    });

  } catch (error) {
    console.error('❌ Errore nel processing:', error);

    // Pulisci il file caricato in caso di errore
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: 'Errore nel processamento del PDF',
      details: error.message
    });
  }
});

// Endpoint per scaricare il CSV
app.get('/api/download/:filename', (req, res) => {
  const csvPath = path.join(__dirname, 'outputs', req.params.filename);

  if (!fs.existsSync(csvPath)) {
    return res.status(404).json({ error: 'File non trovato' });
  }

  res.download(csvPath, req.params.filename, (err) => {
    if (err) {
      console.error('Errore nel download:', err);
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    geminiConfigured: !!process.env.GEMINI_API_KEY
  });
});

// Avvia server
app.listen(PORT, () => {
  console.log(`\n🚀 Server avviato su http://localhost:${PORT}`);
  console.log(`📊 API disponibile su http://localhost:${PORT}/api`);

  if (!process.env.GEMINI_API_KEY) {
    console.warn('\n⚠️  ATTENZIONE: GEMINI_API_KEY non configurata!');
    console.warn('   Crea un file .env e aggiungi la tua API key da https://aistudio.google.com/app/apikey\n');
  }
});
