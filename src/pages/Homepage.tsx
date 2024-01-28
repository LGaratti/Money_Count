import { Skeleton, Grid, GridItem, Card, Box} from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { fetchLabelsFromServer, fetchOpsLabelsFromServer } from "../utils/supabaseClient";
import { operationArrayReducer } from "../utils/OperationArrayReducer";
import LastOperationsCard from "../components/molecules/LastOperationsCard";
import PortfolioSummCard from "../components/molecules/PortfolioSummCard";
import { Label, OperationsForDate } from "../interfaces/Operation";
import BalanceTrendCard from "../components/molecules/BalanceTrendCard";
import { fetchOpsIdToDateMap } from "../utils/OperationUtils";
import DateRangeSelector from "../components/molecules/DateRangeSelector";
import { DateRange, TimeUnit } from "../interfaces/Date";
// import { useTranslation } from "react-i18next";
// import i18n from "../locales/i18n";

const inizializeDateRange: DateRange = {
  rangeDisplayed:'current month',
  startDate: new Date(),
  timeUnit: TimeUnit.MONTH,
  nTimeUnit:1
}

export default function Homepage() {
  // const {t} = useTranslation('ns1',{ i18n } );
  const [operationArray, dispatch] = useReducer(operationArrayReducer, []);
  const [labelsArray, setLabelsArray] = useState<Label[]>([]);
  const [operationIdToDateMap, setOperationIdToDateMap] = useState<OperationsForDate[]>([]);
  const [dateRangeDisplayed, setDateRangeDisplayed] = useState<DateRange>(inizializeDateRange);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    fetchOpsLabelsFromServer(dispatch);
    fetchLabelsFromServer(setLabelsArray);
    setIsLoading(false);
  },[]);

  useEffect(() => {
    const endDate = new Date(); // Supponiamo che tu abbia già endDate inizializzato con una data
    const startDate = new Date(endDate); // Clona la data di endDate
    startDate.setDate(endDate.getDate() - 30); // Sottrai 30 giorni a startDate
    fetchOpsIdToDateMap(startDate, endDate, -1, false, [], operationArray, setOperationIdToDateMap); // TODO sarà da modificare
  },[operationArray])

  return (
    <Box>
    <DateRangeSelector dateRangeDisplayed={dateRangeDisplayed} setDateRangeDisplayed={setDateRangeDisplayed}></DateRangeSelector>
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
    </Box>
  );
}