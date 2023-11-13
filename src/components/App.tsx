import React, { useState, useEffect, useReducer } from 'react'
import { v4 as uuidv4 } from "uuid";

// import jsonObject from '../data/operations.json';

import '../style/App.css';
import OperationsList from './OperationsList';
import { Operation } from '../interfaces/Operation';
import { operationArrayReducer } from '../utils/OperationArrayReducer'
import { addOperations, initOperations, recvOpArrayFromServer, sendOpArrayToServer } from '../utils/OperationsUtils'
import  InputField from './InputField'
import { DragDropContext } from 'react-beautiful-dnd'
import { onDragEnd } from '../utils/AppUtils';
// import { OperationsAction } from '../interfaces/OperationTypes';


// VERA qua reinderizza alle varie pagine, log ecc+++
const App:React.FC = () => {
  
  // Hook useState per la sincronizzazione delle operation nel server
  const [serverOpArray, setServerOpArray] = useState<Operation[]>([]);
  // Hook useState per la modifica della stringa operationName
  const [operationName, setOperationName] = useState<string>(""); // Inizializza operationName come stringa vuota. checkOperationName è la funzione per aggiornare il valore di operationName.
  // Hook useReducer per la gestione delle operazione sull'operationArray
  const [operationArray, dispatch] = useReducer(operationArrayReducer, []);
  // Hook useReducer per la gestione delle operation active ed inactive
  const [activeOpArray, dispatchActive] = useReducer(operationArrayReducer, []);
  const [inactiveOpArray, dispatchInactive] = useReducer(operationArrayReducer, []);

  // Hook per ricevere l'array dal server
  useEffect(() => { 
    console.log("initOpArray")
    recvOpArrayFromServer(setServerOpArray, dispatch, dispatchActive, dispatchInactive);
  },[]);

  // Hook useEffect per inviare operationArray al server
  useEffect(() => { 
    if (sendOpArrayToServer(operationArray,serverOpArray)) {
      setServerOpArray(operationArray);
      initOperations(dispatchActive, operationArray.filter((operation) => operation.active));
      initOperations(dispatchInactive, operationArray.filter((operation) => !operation.active));
    }
  }, [operationArray]); 

  // funzione onSumit del form di aggiunta di una nuova operation.
  const checkAndAddOperation = (e: React.FormEvent) => {  // React.FormEvent è un tipo definito nella libreria React che rappresenta l'evento associato al form.
    e.preventDefault(); //funzione standard degli eventi in javascript, in questo caso previene l'evento default dell'form che in questo caso è ricaricare la pagina
    if(operationName) { // se operationName non è vuoto
      addOperations(dispatch,[{ id: uuidv4(), title: operationName, active: true, description: "prova", filters: [], amount: 300 }])
      setOperationName(""); // svuoto il form
    }
  };  
  return (

    <DragDropContext onDragEnd={onDragEnd(dispatch,activeOpArray,inactiveOpArray)}>
      <div className="App">
        <span className='heading'>Money Count</span>
        {/* Dichiaro il form di ingresso nome operation  */}
        <InputField operationName={operationName} setOperationName={setOperationName} checkAndAddOperation={checkAndAddOperation} />
        {/* Dichiaro la lista di Operations */}
        <OperationsList activeOpArray={activeOpArray} activeOpArrayReducer={dispatch} inactiveOpArray={inactiveOpArray} inactiveOpArrayReducer={dispatchInactive}/>      
      </div>
    </DragDropContext>

  );
}

export default App;
