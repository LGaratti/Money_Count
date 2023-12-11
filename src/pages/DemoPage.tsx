import { Heading, VStack, } from "@chakra-ui/react";
import OperationTable from "../components/molecules/OperationTable";
import { useEffect, useReducer } from "react";
import { getOpsFromServer } from "../utils/supabaseClient";
import { operationArrayReducer } from "../utils/OperationArrayReducer";

export default function DemoPage() {
  const [operationArray, dispatch] = useReducer(operationArrayReducer, []);

  // Hook per ricevere l'array dal server
  useEffect(() => { 
    getOpsFromServer(dispatch);
  },[]);

  return (
    <VStack>
      <Heading>Demo Page</Heading>
      <OperationTable operations={operationArray}/>
    </VStack>
  );
}