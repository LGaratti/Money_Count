import { Operation } from "../interfaces/Operation";
import { OperationsAction } from "../interfaces/OperationTypes";

export const deleteOperations = (operationArrayReducer: React.Dispatch<OperationsAction>, operation: Operation[]) => {
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
