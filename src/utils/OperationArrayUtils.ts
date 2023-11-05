import { Operation } from '../interfaces/Operation';
import { OperationsAction } from '../interfaces/OperationTypes';

export const operationArrayReducer = (state: Operation[], action: OperationsAction): Operation[] => {
  switch (action.type) {
    case "add":
      return [...state, ...action.payload];
    
      case "remove":
        const idsToRemove = new Set(action.payload.map(item => item.id));
        return state.filter(operation => !idsToRemove.has(operation.id));      
    
      case "modify":
        // Il payload è un array di Operation con le modifiche già applicate
        const updatedOperations = new Map(action.payload.map(operation => [operation.id, operation]));
      
        // Mappiamo lo stato corrente per aggiornare solo le Operation che sono cambiate
        return state.map(operation =>
          updatedOperations.has(operation.id)
            ? { ...operation, ...updatedOperations.get(operation.id) }
            : operation
        );
    default:
      return state; // Dovresti ritornare lo stato attuale se nessun caso corrisponde
  }
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
