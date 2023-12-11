import { Operation, OperationsAction } from "../interfaces/Operation";


export const operationArrayReducer = (state: Operation[], action: OperationsAction): Operation[] => {
  let idsToRemove:Set<string>;
  let updatedOperations:Map<string,Operation>;
  switch (action.type) {
    case "add":
      return [...state, ...action.payload];
    
    case 'init':
      return action.payload;
    
    case "remove":
      idsToRemove = new Set(action.payload.map(item => item.operation_id));
      return state.filter(operation => !idsToRemove.has(operation.operation_id));      
  
    case "modify":
      // Il payload è un array di Operation con le modifiche già applicate
      updatedOperations = new Map(action.payload.map(operation => [operation.operation_id, operation]));
    
      // Mappiamo lo stato corrente per aggiornare solo le Operation che sono cambiate
      return state.map(operation =>
        updatedOperations.has(operation.operation_id)
          ? { ...operation, ...updatedOperations.get(operation.operation_id) }
          : operation
      );
    
    default:
      return state; // Dovresti ritornare lo stato attuale se nessun caso corrisponde
  }
};
