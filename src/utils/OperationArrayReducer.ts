import { Operation } from '../interfaces/Operation';
import { OperationsAction } from '../interfaces/OperationTypes';

export const operationArrayReducer = (state: Operation[], action: OperationsAction): Operation[] => {
  switch (action.type) {
    case "add":
      return [...state, ...action.payload];
    
    case 'init':
      return action.payload;
    
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
