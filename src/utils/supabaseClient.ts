import { createClient } from "@supabase/supabase-js";
import { Label, Operation, OperationsAction } from "../interfaces/Operation";
import { initOperations } from "./OperationUtils";
import { Dispatch, SetStateAction } from "react";
import { OperationLabel } from "../interfaces/Server";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchOpsLabelsFromServer(operationArrayReducer: Dispatch<OperationsAction>) {
  const { data , error } = await supabase
  .from('operations_labels')
  .select(`
    operation:operations (operation_id,name,description,amount,first_date,periodic_count,periodic_unit,last_date),
    label:labels (label_id, name, description, color_rgb)
  `)
  .returns<OperationLabel[]>();

  if (error)
    throw error;
  if(!data)
    throw new Error("empty response from server");
  const tempOperations: Operation[] = [];

  data.forEach((operationLabel) => {
    const foundOperation = tempOperations.find(operation => operation.operation_id === operationLabel.operation.operation_id);

    if (!foundOperation) {
      // Se l'operazione non esiste, creala con un array vuoto per labels
      const newOperation = { ...operationLabel.operation, labels: [operationLabel.label] };
      tempOperations.push(newOperation);
    } else {
      // Se l'operazione esiste già, aggiungi la label
      foundOperation.labels = foundOperation.labels || []; 
      foundOperation.labels.push(operationLabel.label);
    }
  });
  const sortedOperations = tempOperations.sort((op1, op2) => {
    const firstDate1 = new Date(op1.first_date).getTime(); // Converti la data in millisecondi
    const firstDate2 = new Date(op2.first_date).getTime();
    return firstDate1 - firstDate2; // Ordina in base all'ordine cronologico crescente
  });
  initOperations(operationArrayReducer, sortedOperations);
}

export async function fetchLabelsFromServer( setLabel: Dispatch<SetStateAction<Label[]>>) {
  const { data , error } = await supabase
  .from('labels')
  .select(`
    label_id, name, description, color_rgb
  `)
  .returns<Label[]>();

  if (error)
    throw error;
  if(!data)
    throw new Error("empty response from server");

  const tempLabels: Label[] = [];
  data.forEach((labelFromServer) => {
    const foundLabel = tempLabels.find(label => label.label_id === labelFromServer.label_id);
    if (!foundLabel)  tempLabels.push(labelFromServer);
  });
  setLabel(tempLabels);
}

export async function InsertOpFromServer(operation: Operation) {
  if(!operation)
    throw new Error("trying to send an empty operation")
  const operationsData = [{
    operation: {
      name: operation.name,
      description: operation.description,
      amount: operation.amount,
      first_date: operation.first_date,
      last_date: operation.last_date,
      periodic_count: operation.periodic_count,
      periodic_unit: operation.periodic_unit,
      payday: operation.payday,
      labels: operation.labels // Assicurati che questo sia un array anche se c'è una sola label
    }
  }];
  const { error } = await supabase
  .rpc('insert_operation_with_labels', {operation_data: operationsData})
  if (error)
    throw error;
  console.log("Operazione inviata al server: ", operationsData);
}