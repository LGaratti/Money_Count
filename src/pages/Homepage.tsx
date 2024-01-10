import { Skeleton, Grid, GridItem, Card} from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { fetchOpsLabelsFromServer } from "../utils/supabaseClient";
import { operationArrayReducer } from "../utils/OperationArrayReducer";
import LastOperationsCard from "../components/molecules/LastOperationsCard";

export default function Homepage() {
  const [operationArray, dispatch] = useReducer(operationArrayReducer, []);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { 
    fetchOpsLabelsFromServer(dispatch);
    setIsLoading(false);
  },[]);
  return (
    <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(2, 1fr)'gap={4}>
      <GridItem>
        <Skeleton fadeDuration={1} isLoaded = {!isLoading}> 
          <LastOperationsCard operations={operationArray} cardTitle="latest operations"/>
        </Skeleton>
      </GridItem>
      <GridItem>
        <Skeleton fadeDuration={1} isLoaded = {!isLoading}>
        <Card>Template</Card>
        </Skeleton>
      </GridItem>
      <GridItem>
        <Skeleton fadeDuration={1} isLoaded = {!isLoading}>
          <Card>Template</Card>
        </Skeleton>
      </GridItem>
      <GridItem>
        <Skeleton fadeDuration={1} isLoaded = {!isLoading}>
          <Card>Template</Card>
        </Skeleton>
      </GridItem>
    </Grid>
  );
}