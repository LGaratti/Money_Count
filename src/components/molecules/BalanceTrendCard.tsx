import { Box, Card, CardBody, CardHeader, CardProps, Heading, useTheme } from "@chakra-ui/react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Customized  } from 'recharts';
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import { Label as LabelOp, Operation, OperationsForDate } from "../../interfaces/Operation";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from 'date-fns';
import LabelTag from "../atoms/LabelTag";

interface BarChartData {
  [x: string]: string | number; //gain and loss, declared in this way to allow translaction
  name: string;
  // operations: Operation[]                                                                       //TODO 
  // Necessario aggiungere l'array di operazione per poi mostrare nel tooltip che customizzeremo le varie operazioni che compongono la bar
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

      //TODO Da modificare in base al range di date selezionate. fare n segmenti  per rendere comprensibile il grafico.

      operationIdToDateMap.forEach(opDate => {
        // const date = opDate.date;
        opDate.operations_id.forEach( op => {
          const operation = operations.find(op2 => op2.operation_id === op);
          if(operation)
          {
            const amount = operation ? operation.amount : 0;
            const dateString = format(opDate.date, 'd/M/yy');
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
      const gainNameTransl = t('gain');
      const lossNameTransl = t('loss');
      const newBarChartData = Object.keys(dateAmounts).map(date => {
        
        return {
          name: date,
          [gainNameTransl]: dateAmounts[date].gain,
          [lossNameTransl]: dateAmounts[date].loss,
        }
      });
      setBarChartData(newBarChartData);
    }
  }, [operationIdToDateMap, operations]);
  
  return (
    <Card {...props} minH={'331.19px'}>
      <CardHeader>
        <Heading size={'md'} m={1}>{t('budget chart')}</Heading>
      </CardHeader>
      <CardBody>
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
              <XAxis dataKey="name" />{/* <XAxis dataKey="name" ticks={weekLabels} /> */}
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey={t('gain')} fill={theme.colors.green[400]} /> 
              <Bar dataKey={t('loss')} fill={theme.colors.red[500]} />
            </BarChart>
          </ResponsiveContainer>
        </Box> 
        <Box display="flex" justifyContent="space-evenly">
            {labels?.map( label => {
              if (label.name === "gain" || label.name === 'loss')
                return <><LabelTag key={label.label_id} label={label}/></>
            })}
        </Box>        
      </CardBody>
    </Card>
  );
}

export default BalanceTrendCard;