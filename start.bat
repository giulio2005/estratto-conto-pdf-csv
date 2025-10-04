@echo off
REM Script di avvio per Estratti Conto PDF -> CSV (Windows)
REM Uso: Doppio click su start.bat

echo.
echo ======================================
echo  Estratti Conto PDF -^> CSV
echo ======================================
echo.

REM Controlla se Node.js è installato
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRORE] Node.js non trovato!
    echo.
    echo Installa Node.js da: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Controlla se esiste .env
if not exist .env (
    echo [ATTENZIONE] File .env non trovato!
    echo.
    echo Creazione file .env da .env.example...
    copy .env.example .env >nul
    echo.
    echo [IMPORTANTE] Devi configurare la tua API Key Gemini!
    echo   1. Vai su: https://aistudio.google.com/app/apikey
    echo   2. Crea una API Key gratuita
    echo   3. Modifica il file .env e inserisci la chiave
    echo.
    echo Premi un tasto dopo aver configurato .env...
    pause >nul
)

REM Controlla se node_modules esiste
if not exist node_modules (
    echo [INFO] Installazione dipendenze...
    echo.
    call npm install
    echo.
)

REM Avvia il server
echo [OK] Avvio server...
echo.
echo Apertura browser su: http://localhost:3000
echo.
echo Premi Ctrl+C per terminare il server
echo ======================================
echo.

REM Apri il browser dopo 2 secondi (in background)
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000"

npm start
