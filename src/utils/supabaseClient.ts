import { createClient } from "@supabase/supabase-js";
import { Label, Operation, OperationsAction } from "../interfaces/Operation";
import { fromJsonToLabels, fromJsonToOperations, initOperations } from "./OperationUtils";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getOpsFromServer(operationArrayReducer: React.Dispatch<OperationsAction>) {
  const { data , error } = await supabase
  .from('operations')
  .select(`
    operation_id,
    name,
    active,
    description,
    amount,
    periodical:periodicals (periodical_id, amount, unit, last_timestamp, first_timestamp)
  `);
  if (error)
    console.log(error);
  const operations: Operation[] = fromJsonToOperations(data);
  if (operations) {
    for (const op of operations) {
      // Converti op.operation_id in un numero intero
      const operationId = parseInt(op.operation_id, 10);      
      const { data: labelsData, error: labelsError } = await supabase
        .from('operations_labels')
        .select(`
            label:labels (label_id, name, description, color_rgb)
        `)
        .eq('operation_id', operationId);
  
      if (labelsError)
        console.log(labelsError);
  
      const labels: Label[] = fromJsonToLabels(labelsData);
      if (labels) {
          // Aggiungi le labels all'operazione
          op.labels = labels;
      }
    }
  }
  
  setServerOpArray(operations!);
  initOperations(operationArrayReducer, operations!);
  console.log("Operazioni ricevute dal server:", operations);
}
