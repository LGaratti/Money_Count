// import axios from 'axios';

import { SetStateAction } from "react";
import { OperationDates, Label, Operation, OperationsAction, TimeUnit, dayOfWeekMap } from "../interfaces/Operation";

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

export function fetchOpsIdToDateMap(startDate:string, endDate:string, numberOfOps: number, priorityStartDate: boolean, filteredLabels: Label[], operations: Operation[], setOperationsDates: React.Dispatch<SetStateAction<OperationDates[]>>) {
  // Converti le stringhe startDate ed endDate in oggetti Date
  const startDateDate = new Date(startDate);
  const endDateDate = new Date(endDate);

  // eslint-disable-next-line prefer-const
  let tempOperationsDates: OperationDates[] = [];

  // operations.forEach(operation => {
  for (const operation of operations) {

    // Filters Check
    if(filteredLabels.length < 0) {
      let atLeastOneLabel:boolean = false;
      filteredLabels.forEach( label => {
        if(operation.labels.find(tempLabel => (tempLabel.label_id === label.label_id))) {
          atLeastOneLabel = true;
        }
      })
      if(!atLeastOneLabel) continue;
    }

    // Time Check
    if(operation.periodic_unit) {
      // Not periodical calculation
      if (operation?.last_date && operation?.last_date < startDateDate) continue;

      switch (operation.periodic_unit) {
        case TimeUnit.DAY: {
          // Calcola il numero di giorni tra first_date e la data finale (endDateDate o last_date)
          let dayCount = Math.round((endDateDate.getTime() - operation.first_date.getTime()) / (1000 * 60 * 60 * 24));
          // Limita il conteggio dei giorni se c'è un last_date definito
          if (operation?.last_date) {
            dayCount = Math.min(dayCount, Math.round((operation.last_date.getTime() - operation.first_date.getTime()) / (1000 * 60 * 60 * 24)));
          }

          // Calcola e aggiungi le date
          const count: number = operation.periodic_count || 1;
          for (let i = 0; i <= dayCount; i+count) {
            // eslint-disable-next-line prefer-const
            let newDate = new Date(operation.first_date);
            newDate.setDate(newDate.getDate() + i);
            // Se payday è definito, regola newDate per cadere su uno dei payday validi
            if (operation.payday && operation.payday.length > 0) {
              while (!operation.payday.includes(dayOfWeekMap[newDate.getDay().toString()])) {
                newDate.setDate(newDate.getDate() + 1);  // Vai al prossimo giorno
              }
            }
            // Aggiungi la data calcolata (che cade su un payday valido se definito) a tempOperationsDates
            if (newDate >= startDateDate && newDate <= endDateDate)
              tempOperationsDates.push({ operation_id: operation.operation_id, date: [newDate] });
          }
          break;
        }
        
        case TimeUnit.WEEK: {
          // Calcola il numero di settimane tra first_date e la data finale (endDateDate o last_date)
          let weekCount = Math.round((endDateDate.getTime() - operation.first_date.getTime()) / (1000 * 60 * 60 * 24 * 7));
          // Limita il conteggio delle settimane se c'è un last_date definito
          if (operation?.last_date) {
            weekCount = Math.min(weekCount, Math.round((operation.last_date.getTime() - operation.first_date.getTime()) / (1000 * 60 * 60 * 24 * 7)));
          }
        
          // Calcola e aggiungi le date
          const count: number = (operation.periodic_count || 1) * 7; // Moltiplica per 7 per convertire in giorni
          for (let i = 0; i <= weekCount; i += count) {
            // eslint-disable-next-line prefer-const
            let newDate = new Date(operation.first_date);
            newDate.setDate(newDate.getDate() + i);
            // Se payday è definito, regola newDate per cadere su uno dei payday validi
            if (operation.payday && operation.payday.length > 0) { 
              while (!operation.payday.includes(dayOfWeekMap[newDate.getDay().toString()])) { //DA MODIFICARE NELLA SETTIMANA DI PAGA CONTABILIZZO TUTTI I GIORNI PRESENTI NELLA SETTIMANA CONTINUARE DA QUI <----------------------
                newDate.setDate(newDate.getDate() + 1);  // Vai al prossimo giorno
              }
            }
            // Aggiungi la data calcolata (che cade su un payday valido se definito) a tempOperationsDates
            if (newDate >= startDateDate && newDate <= endDateDate)
              tempOperationsDates.push({ operation_id: operation.operation_id, date: [newDate] });
          }
          break;
        }
        

        case TimeUnit.MONTH :

          break;

        case TimeUnit.YEAR :

          break;
      
        default:
          break;
      }
    }
    else if (operation.first_date < startDateDate || operation.first_date > endDateDate) continue;
    else tempOperationsDates.push({operation_id:operation.operation_id,date:[operation.first_date]})
  }

  setOperationsDates(tempOperationsDates);
  console.log('PIPPO',tempOperationsDates,numberOfOps,priorityStartDate)
}