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

// Middleware for JSON request body parsing
app.use(express.json());

// Endpoint to save operations to operations.json
app.post('/save-operations', (req, res) => {
  
  const operations = req.body;
  
  // Define the file path
  const filePath = path.join(__dirname, 'data', 'operations.json');

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Read the current content of the file
    let operationsSaved = JSON.parse(fs.readFileSync(filePath));

    // Compare the contents of the file with the submitted data
    if (lodash.isEqual(operations, operationsSaved)) {
      console.log('File not overwritten because it is the same.');
      return res.status(200).send('No need to update the file.');
    }
  }

  // Write the file
  fs.writeFile(filePath, JSON.stringify(operations, null, 2), (err) => {
    if (err) {
      console.error('An error occurred while saving the file:', err);
      res.status(500).send('Error during file saving.');
    } else {
      console.log('File saved successfully.');
      res.status(200).send('Operations saved successfully.');
    }
  });
});

// Serve the React build
// Ensure the build directory path is correct
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  // Ensure the index.html file path is correct
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
