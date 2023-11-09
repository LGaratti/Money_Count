// COME CREARLO
// cd .\server\
// yarn init -y
// yarn add express

// COME USARLO
// cd .\server\
// node server.js

// P.S. Assicurati di eseguire yarn build nella directory root del tuo progetto React per generare la build di produzione prima di avviare il server Node.js con node server.js.

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per il parsing del body delle richieste in JSON
app.use(express.json());

// Endpoint per salvare le operazioni in operations.json
app.post('/save-operations', (req, res) => {
  // Prendi il path assoluto della directory principale del progetto
  const projectRoot = path.join(__dirname, '..');
  
  const operations = req.body;
  // Assicurati che il path del file sia corretto
  fs.writeFile(path.join(projectRoot, 'data', 'operations.json'), JSON.stringify(operations, null, 2), (err) => {
    if (err) {
      console.error('Si è verificato un errore durante il salvataggio del file:', err);
      res.status(500).send('Errore durante il salvataggio del file');
    } else {
      console.log('File salvato con successo');
      res.status(200).send('Operazioni salvate con successo');
    }
  });
});

// Servire la build di React
// Assicurati che il path della directory build sia corretto
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  // Assicurati che il path del file index.html sia corretto
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
