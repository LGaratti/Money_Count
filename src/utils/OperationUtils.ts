// import axios from 'axios';

import { SetStateAction } from "react";
import { OperationsForDate, Label, Operation, OperationsAction, } from "../interfaces/Operation";
import { TimeUnit, dayOfWeekMap } from "../interfaces/Date";

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

function isLeapYear(year: number): boolean {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

export function fetchOpsIdToDateMap(startDate:Date, endDate:Date, numberOfOps: number, descendingOrder: boolean, filteredLabels: Label[], operations: Operation[], setOperationsDates: React.Dispatch<SetStateAction<OperationsForDate[]>>) {

  const operationsForDates: OperationsForDate[] = [];

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

      const addDateToOperations = (date: Date) => {
        let opForDate = operationsForDates.find(opDate => opDate.date.toDateString() === date.toDateString());
        if (!opForDate) {
          opForDate = { date: date, operations_id: [] };
          operationsForDates.push(opForDate);
        }
        opForDate.operations_id.push(operation.operation_id);
      };

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
          for (let i = 0; i <= dayCount; i += count) {
            const newDate = new Date(operation.first_date);
            newDate.setDate(newDate.getDate() + i);
            if (operation.payday && operation.payday.length > 0) {
              while (!operation.payday.includes(dayOfWeekMap[newDate.getDay().toString()])) {
                newDate.setDate(newDate.getDate() + 1);  // Vai al prossimo giorno
              }
            }
            if (newDate >= startDate && newDate <= endDate) {
              addDateToOperations(newDate);
            }
          }
          break;
        }
        
        case TimeUnit.WEEK: {
          let weekCount = Math.round((endDate.getTime() - operation.first_date.getTime()) / (1000 * 60 * 60 * 24 * 7));
          if (operation?.last_date) {
            weekCount = Math.min(weekCount, Math.round((operation.last_date.getTime() - operation.first_date.getTime()) / (1000 * 60 * 60 * 24 * 7)));
          }
          
          const count: number = (operation.periodic_count || 1) * 7;
          for (let i = 0; i <= weekCount; i += count) {
            const weekStartDate = new Date(operation.first_date);
            weekStartDate.setDate(weekStartDate.getDate() + i);
            
            if (operation.payday && operation.payday.length > 0) {
              operation.payday.forEach(payday => {
                const paydayDate = new Date(weekStartDate);
                while (dayOfWeekMap[paydayDate.getDay().toString()] !== payday) {
                  paydayDate.setDate(paydayDate.getDate() + 1);
                }
                if (paydayDate.getTime() >= startDate.getTime() && paydayDate.getTime() <= endDate.getTime()) {
                  addDateToOperations(paydayDate);
                }
              });
            } else {
              if (weekStartDate >= startDate && weekStartDate <= endDate) {
                addDateToOperations(weekStartDate);
              }
            }
          }
          break;
        }      

        case TimeUnit.MONTH: {
          let monthCount = (endDate.getFullYear() - operation.first_date.getFullYear()) * 12 + endDate.getMonth() - operation.first_date.getMonth();
          if (operation?.last_date) {
            const maxMonthCount = (operation.last_date.getFullYear() - operation.first_date.getFullYear()) * 12 + operation.last_date.getMonth() - operation.first_date.getMonth();
            monthCount = Math.min(monthCount, maxMonthCount);
          }
        
          const count: number = operation.periodic_count || 1;
          for (let i = 0; i <= monthCount; i += count) {
            let newDate = new Date(operation.first_date);
            newDate.setMonth(newDate.getMonth() + i);
            if (newDate.getDate() != operation.first_date.getDate()) {
              newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0); // Ultimo giorno del mese precedente
            }
            
            if (operation.payday && operation.payday.length > 0) {
              while (!operation.payday.includes(dayOfWeekMap[newDate.getDay().toString()])) {
                newDate.setDate(newDate.getDate() + 1);
              }
            }
            
            if (newDate >= startDate && newDate <= endDate) {
              addDateToOperations(newDate);
            }
          }
          break;
        }     

        case TimeUnit.YEAR: {
          let yearCount = endDate.getFullYear() - operation.first_date.getFullYear();
          if (operation?.last_date) {
            const maxYearCount = operation.last_date.getFullYear() - operation.first_date.getFullYear();
            yearCount = Math.min(yearCount, maxYearCount);
          }
        
          const count: number = operation.periodic_count || 1;
          for (let i = 0; i <= yearCount; i += count) {
            const newDate = new Date(operation.first_date);
            newDate.setFullYear(newDate.getFullYear() + i);
            if (newDate.getMonth() === 1 && newDate.getDate() === 29 && !isLeapYear(newDate.getFullYear())) {
              newDate.setDate(28);
            }
            
            if (operation.payday && operation.payday.length > 0) {
              while (!operation.payday.includes(dayOfWeekMap[newDate.getDay().toString()])) {
                newDate.setDate(newDate.getDate() + 1);
              }
            }
            
            if (newDate >= startDate && newDate <= endDate) {
              addDateToOperations(newDate);
            }
          }
          break;
        }
      
        default:
          break;
      }
    } else if (operation.first_date >= startDate && operation.first_date <= endDate) {
      let opForDate = operationsForDates.find(opDate => opDate.date.toDateString() === operation.first_date.toDateString());
      if (!opForDate) {
        opForDate = { date: operation.first_date, operations_id: [operation.operation_id] };
        operationsForDates.push(opForDate);
      } else {
        opForDate.operations_id.push(operation.operation_id);
      }
    }
  }
  // TODO utilizzo dei parametri numberOfOps e descendingOrder per filtrare l'output (es. casi come ultime operazioni)
  if(descendingOrder) {
    operationsForDates.sort((a, b) => b.date.getTime() - a.date.getTime());
  }
  else {
    operationsForDates.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
  console.log('',operationsForDates,numberOfOps)
  setOperationsDates(operationsForDates);
  
}