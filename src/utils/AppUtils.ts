import { DropResult } from "react-beautiful-dnd";
import { Operation } from "../interfaces/Operation";
import { OperationsAction } from "../interfaces/OperationTypes";
import { initOperations } from "./OperationsUtils";


export const refreshOperationsList = (activeOpArray:Operation[], inactiveOpArray:Operation[], dispatch: React.Dispatch<OperationsAction>) => {
  // Create copies of the current active and inactive operations arrays
  let newActiveOpArray = [...activeOpArray];
  let newInactiveOpArray = [...inactiveOpArray];

  // Filter out inactive operations from the active operations array
  newActiveOpArray = newActiveOpArray.filter(operation => {
    if (!operation.active) {
      newInactiveOpArray.push(operation);
      // return false;
    }
  });

  // Filter out active operations from the inactive operations array
  newInactiveOpArray = newInactiveOpArray.filter(operation => {
    if (operation.active) {
      newActiveOpArray.push(operation);
      // return false;
    }
  });

  // Ho dovuto commentare sta roba perchè sennò mando un array vuoto
  // const tempOpArray = [...newActiveOpArray, ...newInactiveOpArray];
  // initOperations(dispatch,tempOpArray)
  return true;
};

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
  // const tempOpArray = [...tempActiveOpArray, ...tempInactiveOpArray];
  // initOperations(dispatch,tempOpArray)
  initOperations(dispatchActive,tempActiveOpArray);
  initOperations(dispatchInactive,tempInactiveOpArray);
  // refreshOperationsList(tempActiveOpArray,tempInactiveOpArray,dispatch);
  
  // refreshOperationsList(tempActiveOpArray, tempInactiveOpArray, dispatch);
};