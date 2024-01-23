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

export function fetchOpsIdToDateMap(startDate:Date, endDate:Date, numberOfOps: number, priorityStartDate: boolean, filteredLabels: Label[], operations: Operation[], setOperationsDates: React.Dispatch<SetStateAction<OperationDates[]>>) {


  // eslint-disable-next-line prefer-const
  let tempOperationsDates: OperationDates[] = [];

  // operations.forEach(operation => {
  for (const operation of operations) {

    operation.first_date = new Date(operation.first_date);
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
      if (operation?.last_date && operation?.last_date < startDate) continue;

      switch (operation.periodic_unit) {
        case TimeUnit.DAY: {
          // Calcola il numero di giorni tra first_date e la data finale (endDate o last_date)
          let dayCount = Math.round((endDate.getTime() - operation.first_date.getTime()) / (1000 * 60 * 60 * 24));
          // Limita il conteggio dei giorni se c'è un last_date definito
          if (operation?.last_date) {
            dayCount = Math.min(dayCount, Math.round((operation.last_date.getTime() - operation.first_date.getTime()) / (1000 * 60 * 60 * 24)));
          }

          // Calcola e aggiungi le date
          const count: number = operation.periodic_count || 1;
          for (let i = 0; i <= dayCount; i+=count) {
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
            if (newDate >= startDate && newDate <= endDate)
              tempOperationsDates.push({ operation_id: operation.operation_id, date: [newDate] });
          }
          break;
        }
        
        case TimeUnit.WEEK: {
          // Calcola il numero di settimane tra first_date e la data finale (endDate o last_date)
          let weekCount = Math.round((endDate.getTime() - operation.first_date.getTime()) / (1000 * 60 * 60 * 24 * 7));
          // Limita il conteggio delle settimane se c'è un last_date definito
          if (operation?.last_date) {
            weekCount = Math.min(weekCount, Math.round((operation.last_date.getTime() - operation.first_date.getTime()) / (1000 * 60 * 60 * 24 * 7)));
          }
          
          // Calcola e aggiungi le date
          const count: number = (operation.periodic_count || 1) * 7; // Moltiplica per 7 per convertire in giorni
          for (let i = 0; i <= weekCount; i += count) {
            // eslint-disable-next-line prefer-const
            let weekStartDate = new Date(operation.first_date);
            weekStartDate.setDate(weekStartDate.getDate() + i);
            
            // Se payday è definito, aggiungi una data per ogni payday valido in quella settimana
            if (operation.payday && operation.payday.length > 0) {
              operation.payday.forEach(payday => {
                // eslint-disable-next-line prefer-const
                let paydayDate = new Date(weekStartDate);
                // Trova il giorno della settimana per payday
                while (dayOfWeekMap[paydayDate.getDay().toString()] !== payday) {
                  paydayDate.setDate(paydayDate.getDate() + 1);
                }
                // Aggiungi la data calcolata (che cade su un payday valido) a tempOperationsDates
                if (paydayDate.getTime() >= startDate.getTime() && paydayDate.getTime() <= endDate.getTime()) {
                  tempOperationsDates.push({ operation_id: operation.operation_id, date: [paydayDate] });
                }
              });
            } else {
              // Se non ci sono payday definiti, aggiungi solo la data di inizio settimana
              if (weekStartDate >= startDate && weekStartDate <= endDate) {
                tempOperationsDates.push({ operation_id: operation.operation_id, date: [weekStartDate] });
              }
            }
          }
          break;
        }        
        

        case TimeUnit.MONTH: {
          // Calcola il numero di mesi tra first_date e la data finale (endDate o last_date)
          let monthCount = (endDate.getFullYear() - operation.first_date.getFullYear()) * 12 + endDate.getMonth() - operation.first_date.getMonth();
          
          // Limita il conteggio dei mesi se c'è un last_date definito
          if (operation?.last_date) {
            const maxMonthCount = (operation.last_date.getFullYear() - operation.first_date.getFullYear()) * 12 + operation.last_date.getMonth() - operation.first_date.getMonth();
            monthCount = Math.min(monthCount, maxMonthCount);
          }
        
          // Calcola e aggiungi le date
          const count: number = operation.periodic_count || 1;
          for (let i = 0; i <= monthCount; i += count) {
            let newDate = new Date(operation.first_date);
            newDate.setMonth(newDate.getMonth() + i);
        
            // Gestisci il caso in cui il giorno non è presente nel mese (ad esempio, 31 aprile diventa 1 maggio)
            // Se la data supera il mese atteso, imposta il giorno all'ultimo del mese precedente
            if (newDate.getDate() != operation.first_date.getDate()) {
              newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0); // 0 qui restituisce l'ultimo giorno del mese precedente
            }
        
            // Se payday è definito, regola newDate per cadere su uno dei payday validi
            if (operation.payday && operation.payday.length > 0) {
              while (!operation.payday.includes(dayOfWeekMap[newDate.getDay().toString()])) {
                newDate.setDate(newDate.getDate() + 1);  // Vai al prossimo giorno
              }
            }
        
            // Aggiungi la data calcolata (che cade su un payday valido se definito) a tempOperationsDates
            if (newDate >= startDate && newDate <= endDate) {
              const indexOps: number = tempOperationsDates.findIndex(opDate => (opDate.operation_id === operation.operation_id));
              const tempOpDate = { operation_id: operation.operation_id, date: [newDate] };
              if(indexOps < 0)
                tempOperationsDates.push(tempOpDate);
              else
                tempOperationsDates.at(indexOps)?.date.push(newDate)
            }
          }
          break;
        }        

        case TimeUnit.YEAR :
            //TODO
          break;
      
        default:
          break;
      }
    }
    else if (operation.first_date < startDate || operation.first_date > endDate) continue;
    else tempOperationsDates.push({operation_id:operation.operation_id,date:[operation.first_date]})
  }
  // TODO utilizzo dei parametri numberOfOps e priorityStartDate per filtrare l'output (es. casi come ultime operazioni)
  setOperationsDates(tempOperationsDates);
  console.log('tempOperationsDates: ',tempOperationsDates,numberOfOps,priorityStartDate)
}