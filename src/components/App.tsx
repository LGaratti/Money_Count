import React, { useState, useEffect, useReducer } from 'react'
import { v4 as uuidv4 } from "uuid";

import jsonObject from '../data/operations.json';

import '../style/App.css';
import OperationsList from './OperationsList';
import { Operation } from '../interfaces/Operation';
import { operationArrayReducer } from '../utils/OperationArrayReducer'
import { fromJsonToOperations } from '../utils/OperationsUtils'
import  InputField from './InputField'
import { DragDropContext } from 'react-beautiful-dnd'
// import { OperationsAction } from '../interfaces/OperationTypes';


// VERA qua reinderizza alle varie pagine, log ecc+++
const App:React.FC = () => {

  // Ricezione Operations da operations.json
  let initialOperation: Operation[] = fromJsonToOperations(jsonObject)

  // TODO studiarsi gli Hook

  // Hook useState per la modifica della stringa operationName
  const [operationName, setOperationName] = useState<string>(""); // Inizializza operationName come stringa vuota. checkOperationName è la funzione per aggiornare il valore di operationName.

  // Hook useReducer per la gestione delle operazione sull'operationArray
  const [operationArray, dispatch] = useReducer(operationArrayReducer, initialOperation);

  // Hook useEffect per stampare operationArray nella console quando subisce un cambiamento 
  useEffect(() => {
    if (operationArray !== initialOperation) {
      console.log(operationArray);
      // TODO salavare operationArray su json
    }
  }, [operationArray, initialOperation]); // Questo array di dipendenza dice a React di eseguire l'effetto solo quando operationArray cambia.


  // funzione onSumit del form di aggiunta di una nuova operation.
  const checkAndAddOperation = (e: React.FormEvent) => {  // React.FormEvent è un tipo definito nella libreria React che rappresenta l'evento associato al form.
    e.preventDefault(); //funzione standard degli eventi in javascript, in questo caso previene l'evento default dell'form che in questo caso è ricaricare la pagina

    if(operationName) { // se operationName non è vuoto
      // setOperationArray([...operationArray, { id: uuidv4() , title: operationName, active: true, description: "prova", filters:[], amount:300 }]) // Aggiungo ad operationArray un oggetto operation
      dispatch({
        type: 'add',
        payload: [{ id: uuidv4(), title: operationName, active: true, description: "prova", filters: [], amount: 300 }]
      });
      setOperationName(""); // svuoto il form
    }

  };  
 
  return (

    <DragDropContext onDragEnd={() => {}}>
      <div className="App">
        <span className='heading'>Money Count</span>
        {/* Dichiaro il form di ingresso nome operation  */}
        <InputField operationName={operationName} setOperationName={setOperationName} checkAndAddOperation={checkAndAddOperation} />
        {/* Dichiaro la lista di Operations */}
        <OperationsList operationArray={operationArray} operationArrayReducer={dispatch} />      
      </div>
    </DragDropContext>

  );
}

export default App;
