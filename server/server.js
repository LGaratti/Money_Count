// Come inizializzare la cartella server dopo aver clonato il repo
// cd .\server\
// yarn init -y

// Come avviare il server dopo l'init
// ATTENZIONE 
//    Assicurati di eseguire yarn build nella directory root del tuo progetto React per generare la build di produzione prima di avviare il server Node.js con node server.js.
// cd .\server\
// per release
//    node server.js
// per debug
//    node --inspect server.js
//    Apri Google Chrome.
//    Digita chrome://inspect nella barra degli indirizzi.
//    Clicca su "Open dedicated DevTools for Node" o trova il tuo processo Node.js nell'elenco dei dispositivi di destinazione e clicca su "inspect".
// apri un browser e collegati a questa pagina: http://localhost:3000/


const express = require('express');
const fs = require('fs');
const path = require('path');
const lodash = require('lodash');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per il parsing del body delle richieste in JSON
app.use(express.json());

// Endpoint per salvare le operazioni in operations.json
app.post('/save-operations', (req, res) => {
  
  const operations = req.body;
  
//   // Definisci il percorso del file
  const filePath = path.join(__dirname, 'data', 'operations.json');
  let operationsSaved = {};
  // Controlla se il file esiste
  if (fs.existsSync(filePath)) {
    // Leggi il contenuto corrente del file
    // operationsSaved = JSON.parse(fs.readFileSync(filePath));

    operationsSaved = require(filePath)

    // Confronta i contenuti del file con i dati inviati
    if (lodash.isEqual(operations, operationsSaved)) {
      console.log('File non sovrascritto perché uguale');
      return res.status(200).send('Operazioni non modificate');
    }
    // if (JSON.stringify(operations) === JSON.stringify(operationsSaved)) {
      
    // }
  }

  //Scrive il file
  fs.writeFile(path.join(__dirname, 'data', 'operations.json'), JSON.stringify(operations, null, 2), (err) => {
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