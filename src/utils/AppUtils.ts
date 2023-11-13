import { DropResult } from "react-beautiful-dnd";
import { Operation } from "../interfaces/Operation";
import { OperationsAction } from "../interfaces/OperationTypes";
import { initOperations } from "./OperationsUtils";


// export const refreshOperationsList = (
//   activeOpArray: Operation[],
//   inactiveOpArray: Operation[],
//   dispatch: React.Dispatch<OperationsAction>
// ) => {
//   // Filtra le operazioni attive e inattive negli array corretti
//   let newActiveOpArray = activeOpArray
//     .filter(operation => operation.active)
//     .concat(inactiveOpArray.filter(operation => operation.active));
// 
//   let newInactiveOpArray = inactiveOpArray
//     .filter(operation => !operation.active)
//     .concat(activeOpArray.filter(operation => !operation.active));
// 
//   // Ora puoi combinare i due array e inviare l'array aggiornato
//   const tempOpArray = [...newActiveOpArray, ...newInactiveOpArray];
//   initOperations(dispatch, tempOpArray);
// 
//   return true; // Se necessario, puoi restituire un valore per confermare l'aggiornamento
// };

export const onDragEnd = (
  dispatch: React.Dispatch<OperationsAction>,
  dispatchActive: React.Dispatch<OperationsAction>,
  dispatchInactive: React.Dispatch<OperationsAction>,
  activeOpArray: Operation[],
  inactiveOpArray: Operation[], 
) => (result: DropResult) => {
  const { source, destination } = result;
  if (!destination) return;
  if (destination.droppableId === source.droppableId && destination.index === source.index) return;

  let tempOp;
  let tempActiveOpArray = [...activeOpArray]; // Create a copy to avoid direct mutation
  let tempInactiveOpArray = [...inactiveOpArray]; // Create a copy to avoid direct mutation

  if (source.droppableId === "ActiveOpsList") {
    tempOp = tempActiveOpArray[source.index];
    tempActiveOpArray.splice(source.index, 1);
  } else {
    tempOp = tempInactiveOpArray[source.index];
    tempInactiveOpArray.splice(source.index, 1);
  }
  
  if (destination.droppableId === "ActiveOpsList") {
    tempOp.active = true;
    tempActiveOpArray.splice(destination.index, 0, tempOp);
  } else {
    tempOp.active = false;
    tempInactiveOpArray.splice(destination.index, 0, tempOp);
  
  }
  // Dispatch the new arrays to update the state
  const tempOpArray = [...tempActiveOpArray, ...tempInactiveOpArray];
  initOperations(dispatch,tempOpArray)
  // initOperations(dispatchActive,tempActiveOpArray);
  // initOperations(dispatchInactive,tempInactiveOpArray);

  // refreshOperationsList(tempActiveOpArray,tempInactiveOpArray,dispatch);
  
  // refreshOperationsList(tempActiveOpArray, tempInactiveOpArray, dispatch);
};