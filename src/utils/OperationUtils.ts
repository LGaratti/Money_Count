
// import axios from 'axios';

import { Operation, OperationsAction } from "../interfaces/Operation";

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
  if (!jsonObj || !Array.isArray(jsonObj)) {
    throw new Error("JSON object does not have a valid 'operations' property.");
  }
  // TODO altre verifiche

  return jsonObj.map((opJson: any) => {
    return opJson as Operation; // Dichiara che il JSON convertito è di tipo Operation
  });
}

export function fromJsonToLabels(jsonObj: any): Label[] {
  if (!jsonObj || !Array.isArray(jsonObj)) {
    throw new Error("JSON object does not have a valid 'labels' property.");
  }
  // TODO altre verifiche

  return jsonObj.map((opJson: any) => {
    return opJson as Label; // Dichiara che il JSON convertito è di tipo Operation
  });
}

export function isOperationExpired(operation: Operation) {
  if (
    !operation.periodical ||
    !operation.periodical.lastDate ||
    !operation.periodical.firstDate
  ) {
    return false;
  }

  const now = new Date();
  const diff = now.getTime() - operation.periodical.lastDate.getTime();

  switch (operation.periodical.unit) {
    case TimeUnit.DAY:
      return diff >= operation.periodical.amount * 24 * 60 * 60 * 1000;
    case TimeUnit.WEEK:
      return diff >= operation.periodical.amount * 7 * 24 * 60 * 60 * 1000;
    case TimeUnit.MONTH:
      // TODO: Questo è un esempio semplificato, potresti voler considerare la durata esatta dei mesi
      return diff >= operation.periodical.amount * 30 * 24 * 60 * 60 * 1000;
    case TimeUnit.YEAR:
      // TODO: Questo è un esempio semplificato, potresti voler considerare anni bisestili, ecc.
      return diff >= operation.periodical.amount * 365 * 24 * 60 * 60 * 1000;
    default:
      return false;
  }
}