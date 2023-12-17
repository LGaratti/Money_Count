import { Heading, VStack, } from "@chakra-ui/react";
import OperationCard from "../components/molecules/OperationCard";
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
      <OperationCard operations={operationArray}/>
    </VStack>
  );
}