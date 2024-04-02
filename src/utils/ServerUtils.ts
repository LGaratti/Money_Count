import { Label, Operation, OperationsAction } from "../interfaces/Operation";
import { initOperations } from "./OperationUtils";
import { Dispatch, SetStateAction } from "react";
import { OperationLabel } from "../interfaces/Server";


const BASE_URL = 'http://localhost:3000/api'; // URL di base del tuo server Fastify

export async function fetchOpsLabelsFromServerFastify(operationArrayReducer: Dispatch<OperationsAction>) {
    try {
      const response = await fetch(`${BASE_URL}/operations_labels`);

      if (!response.ok) throw new Error('Network response was not ok');
      const data: OperationLabel[] = await response.json();
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
      console.log("sortedOperations",sortedOperations);
    } catch (error) {
      console.error("Errore durante il fetch delle operazioni con etichette:", error);
    }
}

export async function fetchLabelsFromServerFastify(setLabel: Dispatch<SetStateAction<Label[]>>) {
  try {
    const response = await fetch(`${BASE_URL}/labels`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data: Label[] = await response.json();

    const tempLabels: Label[] = [];
    data.forEach((labelFromServer) => {
      const foundLabel = tempLabels.find(label => label.label_id === labelFromServer.label_id);
      if (!foundLabel)  tempLabels.push(labelFromServer);
    });
    setLabel(tempLabels);

  //   setLabel(data);
  } catch (error) {
    console.error("Errore durante il fetch delle etichette:", error);
  }
}

export async function InsertOpToServerFastify(operation: Operation, dispatchOp: Dispatch<OperationsAction>) {
  if(!operation)
    throw new Error("trying to send an empty operation")
  const operationsData = {
    name: operation.name,
    description: (operation.description === '' ? undefined : operation.description),
    amount: operation.amount,
    first_date: operation.first_date,
    last_date: operation.last_date,
    periodic_count: operation.periodic_count,
    periodic_unit: operation.periodic_unit,
    payday: operation.payday,
    labels: operation.labels // Assicurati che questo sia un array anche se c'è una sola label
  };
  try {
    const response = await fetch(`${BASE_URL}/insert_operation_with_labels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(operationsData),
    });

    if(!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server returned error: ${errorText}`)
    }

    // const responseData = response.json();
    console.log("Operazione inviata al server ", operationsData);
    fetchOpsLabelsFromServerFastify(dispatchOp);
  } catch (error) {
    console.error("Errore nell'invio dell'operazione al server:",error)
    throw error;
  }
}