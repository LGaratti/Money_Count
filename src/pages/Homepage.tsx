import { Skeleton, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { fetchOpsLabelsFromServer } from "../utils/supabaseClient";
import { operationArrayReducer } from "../utils/OperationArrayReducer";
import OperationsCard from "../components/molecules/OperationsCard";

export default function Homepage() {
  const [operationArray, dispatch] = useReducer(operationArrayReducer, []);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { 
    fetchOpsLabelsFromServer(dispatch);
    setIsLoading(false);
  },[]);
  return (
    <SimpleGrid columns={3} spacing={4}>
        <Skeleton fadeDuration={1} isLoaded = {!isLoading}> 
          <OperationsCard operations={operationArray} cardTitle="latest operations"/>
        </Skeleton>
        <Skeleton fadeDuration={1} isLoaded = {!isLoading}>
          <OperationsCard cardTitle="income operations" operations = { operationArray.filter( operation => {
            if (operation?.amount >= 0) {
              return operation
            }})}/>
        </Skeleton>
        <Skeleton fadeDuration={1} isLoaded = {!isLoading}>
          <OperationsCard cardTitle="outcome operations" operations = { operationArray.filter( operation => {
            if (operation?.amount < 0) {
              return operation
            }})}/>
        </Skeleton>
    </SimpleGrid>
  );
}