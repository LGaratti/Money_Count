import { Skeleton, Grid, GridItem, Card} from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { fetchLabelsFromServer, fetchOpsLabelsFromServer } from "../utils/supabaseClient";
import { operationArrayReducer } from "../utils/OperationArrayReducer";
import LastOperationsCard from "../components/molecules/LastOperationsCard";
import PortfolioSummCard from "../components/molecules/PortfolioSummCard";
import { Label, OperationDates } from "../interfaces/Operation";
import BalanceTrendCard from "../components/molecules/BalanceTrendCard";
import { fetchOpsIdToDateMap } from "../utils/OperationUtils";

export default function Homepage() {
  const [operationArray, dispatch] = useReducer(operationArrayReducer, []);
  const [labelsArray, setLabelsArray] = useState<Label[]>([]);
  const [operationIdToDateMap, setOperationIdToDateMap] = useState<OperationDates[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { 
    fetchOpsLabelsFromServer(dispatch);
    fetchLabelsFromServer(setLabelsArray);
    setIsLoading(false);
  },[]);

  useEffect(() => {
    console.log(operationArray)
    const endDate = new Date(); // Supponiamo che tu abbia già endDate inizializzato con una data
    const startDate = new Date(endDate); // Clona la data di endDate
    startDate.setDate(endDate.getDate() - 30); // Sottrai 30 giorni a startDate
    fetchOpsIdToDateMap(startDate, endDate, -1, true, [], operationArray, setOperationIdToDateMap); // TODO sarà da modificare
  },[operationArray])
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
          <BalanceTrendCard operations={operationArray} labels={labelsArray} operationIdToDateMap={operationIdToDateMap} />
        </Skeleton>
      </GridItem>
      <GridItem>
        <Skeleton fadeDuration={1} isLoaded = {!isLoading}>
          <Card>next payments</Card>
        </Skeleton>
      </GridItem>
    </Grid>
  );
}