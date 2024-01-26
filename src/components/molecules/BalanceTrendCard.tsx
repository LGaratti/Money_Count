import { Box, Card, CardBody, CardHeader, CardProps, Heading, useTheme } from "@chakra-ui/react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Customized  } from 'recharts';
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import { Label as LabelOp, Operation, OperationsForDate } from "../../interfaces/Operation";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface BarChartData {
  name: string;
  // operations: Operation[]                                                                       //TODO <----------------------------------------------------------Partire da qui
  gain: number;                                                                                    // Necessario aggiungere l'array di operazione per poi mostrare nel tooltip che customizzeremo le varie operazioni che compongono la bar
  loss: number;
} 

interface BalanceTrendCardProps extends CardProps {
  operations?: Operation[],
  labels?: LabelOp[],
  operationIdToDateMap?: OperationsForDate[],
}

export const BalanceTrendCard = ({operations, labels, operationIdToDateMap, ...props} : BalanceTrendCardProps) => {
  const {t} = useTranslation('ns1',{ i18n } );
  const theme = useTheme();
  
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);

  useEffect(() => {
    if (operationIdToDateMap && operations) {
      // Creare un oggetto per tenere traccia dei guadagni e delle perdite per ogni data
      const dateAmounts: Record<string, { gain: number; loss: number; }> = {};


      operationIdToDateMap.forEach(opDate => {
        // const date = opDate.date;
        opDate.operations_id.forEach( op => {
          const operation = operations.find(op2 => op2.operation_id === op);
          if(operation)
          {
            const amount = operation ? operation.amount : 0;
            const dateString = opDate.date.toLocaleDateString();
            // Inizializzare i valori se non esistono già per quella data
            if (!dateAmounts[dateString]) {
              dateAmounts[dateString] = { gain: 0, loss: 0 };
            }

            // Sommare i guadagni e le perdite per quella data
            if (operation.amount > 0) {
              dateAmounts[dateString].gain += amount;
            } else {
              dateAmounts[dateString].loss += Math.abs(amount);
            }
          }
        })
      })

      // Convertire l'oggetto in un array per il grafico
      let newBarChartData: BarChartData[] = Object.keys(dateAmounts).map(date => ({
        name: date,
        gain: dateAmounts[date].gain,
        loss: dateAmounts[date].loss,
      }));

      newBarChartData = newBarChartData.sort((a, b) => {
        const dateA = new Date(a.name);
        const dateB = new Date(b.name);
        return dateA.getTime() - dateB.getTime();
      });
      setBarChartData(newBarChartData);
    }
  }, [operationIdToDateMap, operations]);

  useEffect(() => {
    console.log(barChartData);
  }, [barChartData]);
  
  return (
    <Card {...props}>
      <CardHeader>
        
      </CardHeader>
      <CardBody>
        <Heading size={'md'} m={1}>{t('balance trend')}</Heading>
        <Box height={200}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={400}
              data={barChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* TODO vedere se c'è il modo di attribuire un dataKey ma mostrare un  */}
              <Bar dataKey='gain' fill={theme.colors.green[400]} /> 
              <Bar dataKey='loss' fill={theme.colors.red[500]} />
            </BarChart>
          </ResponsiveContainer>
        </Box> 
        {operations?.length}-
        {labels?.length}-
        {operationIdToDateMap?.length}
        
      </CardBody>
    </Card>
  );
}

export default BalanceTrendCard;