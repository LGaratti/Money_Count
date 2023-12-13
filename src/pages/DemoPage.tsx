import { Heading, VStack, } from "@chakra-ui/react";
import OperationTable from "../components/molecules/OperationTable";
import { useEffect, useReducer } from "react";
import { getOpsFromServer } from "../utils/supabaseClient";
import { operationArrayReducer } from "../utils/OperationArrayReducer";

export default function DemoPage() {
  const [operationArray, dispatch] = useReducer(operationArrayReducer, []);

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