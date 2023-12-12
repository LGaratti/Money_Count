import { createClient } from "@supabase/supabase-js";
import { Label, Operation, OperationsAction } from "../interfaces/Operation";
import { initOperations } from "./OperationUtils";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface OperationLabel {
  operation:Operation,
  label:Label
}

export async function getOpsFromServer(operationArrayReducer: React.Dispatch<OperationsAction>) {
  const { data , error } = await supabase
  .from('operations_labels')
  .select(`
    operation:operations (operation_id,name,active,description,amount,periodical:periodicals (periodical_id, amount, unit, last_timestamp, first_timestamp)),
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
        // Se l'operazione esiste già, aggiungi la label (assicurandosi che labels sia un array)
        foundOperation.labels = foundOperation.labels || []; // Assicura che labels sia un array
        foundOperation.labels.push(operationLabel.label);
      }
    });
  initOperations(operationArrayReducer, tempOperations);
  console.log("Operazioni ricevute dal server:", tempOperations);
}

export async function setOpsFromServer(operations: Operation[]) {
  // TODO
  console.log("Operazioni inviate al server:", operations);
}

