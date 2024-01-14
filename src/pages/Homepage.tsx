import { Skeleton, Grid, GridItem, Card} from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { fetchLabelsFromServer, fetchOpsLabelsFromServer } from "../utils/supabaseClient";
import { operationArrayReducer } from "../utils/OperationArrayReducer";
import LastOperationsCard from "../components/molecules/LastOperationsCard";
import PortfolioSummCard from "../components/molecules/PortfolioSummCard";
import { Label } from "../interfaces/Operation";

export default function Homepage() {
  const [operationArray, dispatch] = useReducer(operationArrayReducer, []);
  const [labelsArray, setLabelsArray] = useState<Label[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { 
    fetchOpsLabelsFromServer(dispatch);
    fetchLabelsFromServer(setLabelsArray);
    setIsLoading(false);
  },[]);
  return (
    <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(2, 1fr)'gap={4}>
      <GridItem>
        <Skeleton fadeDuration={1} isLoaded = {!isLoading}> 
          <LastOperationsCard operations={operationArray}/>
        </Skeleton>
      </GridItem>
      <GridItem>
        <Skeleton fadeDuration={1} isLoaded = {!isLoading}>
          <PortfolioSummCard operations={operationArray} labels={labelsArray}/>
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