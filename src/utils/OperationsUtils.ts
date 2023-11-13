import lodash from "lodash";
import { Operation } from "../interfaces/Operation";
import { OperationsAction } from "../interfaces/OperationTypes";
import axios from 'axios';

export const addOperations = (operationArrayReducer: React.Dispatch<OperationsAction>, operation: Operation[]) => {
  operationArrayReducer({
      type: 'add',
      payload: operation
  })
};

export const removeOperations = (operationArrayReducer: React.Dispatch<OperationsAction>, operation: Operation[]) => {
  operationArrayReducer({
      type: 'remove',
      payload: operation
  })
};

export const modifyOperations = (operationArrayReducer: React.Dispatch<OperationsAction>, updatedOperation: Operation[]) => {
  operationArrayReducer({
    type: 'modify',
    payload: updatedOperation
  })
};

export const initOperations = (operationArrayReducer: React.Dispatch<OperationsAction>, updatedOperation: Operation[]) => {
  operationArrayReducer({
    type: 'init',
    payload: updatedOperation
  })
};

export function fromJsonToOperations(jsonObj: any): Operation[] {
  // Assicurati che l'oggetto JSON contenga la proprietà "operations" e che sia un array
  if (!jsonObj.operations || !Array.isArray(jsonObj.operations)) {
    throw new Error("JSON object does not have a valid 'operations' property.");
  }

  return jsonObj.operations.map((opJson: any) => {
    // TODO verificare che nei json non manchino parametri fondamentali

    // Se l'operazione ha la proprietà "periodic", converti le stringhe delle date in oggetti Date
    if (opJson.periodic) {
      if (opJson.periodic.lastDate) {
        opJson.periodic.lastDate = new Date(opJson.periodic.lastDate);
      }
      if (opJson.periodic.firstDate) {
        opJson.periodic.firstDate = new Date(opJson.periodic.firstDate);
      }
    }

    // Se hai bisogno di altre conversioni, puoi farle qui

    return opJson as Operation; // Dichiara che il JSON convertito è di tipo Operation
  });
}

export function recvOpArrayFromServer(setServerOpArray: React.Dispatch<React.SetStateAction<Operation[]>>, 
  operationArrayReducer: React.Dispatch<OperationsAction>, activeOpsArrayReducer: React.Dispatch<OperationsAction>, inactiveOpsArrayReducer: React.Dispatch<OperationsAction>,
  ): void {

  axios.post('/load-operations', {})
  .then((response) => {
    const operations = fromJsonToOperations(response.data);
    setServerOpArray(operations);
    initOperations(operationArrayReducer, operations);
    // initOperations(activeOpsArrayReducer, operations.filter((operation) => operation.active))
    // initOperations(inactiveOpsArrayReducer, operations.filter((operation) => !operation.active))
    console.log("Operazioni ricevute dal server:", operations);
  })
  .catch((error) => {
    console.error('Errore nella richiesta:', error);
    // In caso di errore, potresti voler gestire lo stato o mostrare un messaggio all'utente
  });
}

export function sendOpArrayToServer(operationArray:Operation[], serverOpArray:Operation[]): boolean {
  // Codice per effettuare la chiamata POST al server Node.js
  if (lodash.isEqual(operationArray, serverOpArray) )
  {
    console.log("OperationArray===serverOperationArray")
    return true;
  }
  axios.post('/save-operations', { "operations":operationArray})
  .then((response) => {
    // Gestisci la risposta dal server se necessario
    console.log(response.data);
  })
  .catch((error) => {
    // Gestisci gli errori qui
    console.error('Errore nella richiesta:', error);
    return false;
  });
  return true;
}