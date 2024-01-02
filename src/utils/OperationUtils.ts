// import axios from 'axios';

import { Label, Operation, OperationsAction } from "../interfaces/Operation";

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

export function fromJsonToOperations(jsonObj: unknown): Operation[] {
  if (!jsonObj || !Array.isArray(jsonObj)) {
    throw new Error("JSON object does not have a valid 'operations' property.");
  }
  // TODO altre verifiche

  return jsonObj.map((opJson: unknown) => {
    return opJson as Operation; // Dichiara che il JSON convertito è di tipo Operation
  });
}

export function fromJsonToLabels(jsonObj: unknown): Label[] {
  if (!jsonObj || !Array.isArray(jsonObj)) {
    throw new Error("JSON object does not have a valid 'labels' property.");
  }
  // TODO altre verifiche

  return jsonObj.map((opJson: unknown) => {
    return opJson as Label; // Dichiara che il JSON convertito è di tipo Operation
  });
}