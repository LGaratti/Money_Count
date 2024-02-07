import { Box, Card, CardBody, CardHeader, CardProps, Heading, useTheme } from "@chakra-ui/react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Customized  } from 'recharts';
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import { Label as LabelOp, Operation, OperationsForDate } from "../../interfaces/Operation";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { addDays, differenceInCalendarDays, format } from 'date-fns';
import LabelTag from "../atoms/LabelTag";
import { DateRange } from "../../interfaces/Date";
import { enUS, it } from "date-fns/locale";

interface BarChartData {
  gain:number;
  loss:number;
  name: string;
  startDate:Date;
  endDate:Date;
  operations: Operation[]
} 

interface BalanceTrendCardProps extends CardProps {
  operations?: Operation[],
  labels?: LabelOp[],
  operationIdToDateMap?: OperationsForDate[],
  dateRangeDisplayed: DateRange,
}

export const BalanceTrendCard = ({operations, labels, operationIdToDateMap, dateRangeDisplayed, ...props} : BalanceTrendCardProps) => {
  const {t} = useTranslation('ns1',{ i18n } );
  const currentLocale = i18n.language === 'it' ? it : enUS;
  const theme = useTheme();
  
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);

  useEffect(() => {
    if (operationIdToDateMap && operations) {
      // Creare un oggetto per tenere traccia dei guadagni e delle perdite per ogni data
      
      const dateAmounts: BarChartData[] = [];
      const startDate = new Date(dateRangeDisplayed.startDate);
      const endDate = dateRangeDisplayed.endDate ? new Date(dateRangeDisplayed.endDate) : new Date();
      const totalDays = differenceInCalendarDays(endDate, startDate);

      const segmentRangedDaysKey = (startDate:Date,endDate:Date) => {
          if(endDate.getFullYear() !== startDate.getFullYear()) //TODO Cambiare e inserire solo il giorno in mezzo al range tra startDate e endDate
            return `${format(startDate, 'd/M/yy',{locale:currentLocale})}-${format(endDate, 'd/M/yy',{locale:currentLocale})}`;
          else
            return `${format(startDate, 'd/M',{locale:currentLocale})}-${format(endDate, 'd/M',{locale:currentLocale})}`;
      }
      const segmentDaysKey = (opDate:Date) => {
        if(endDate.getFullYear() !== startDate.getFullYear())
          return `${format(opDate, 'd/M/yy',{locale:currentLocale})}`;
        else
          return `${format(opDate, 'd/M',{locale:currentLocale})}`;
      }
      // const maxSegmNumb = 10;
      // //TODO Da modificare in base al range di date selezionate. fare n segmenti  per rendere comprensibile il grafico.
      switch (dateRangeDisplayed.timeUnit) {
        case 'none':
          if (operationIdToDateMap.length > 9) {
            
            const segmentSize = Math.ceil(totalDays / 9); // Arrotonda per eccesso per avere al massimo 9 segmenti
      
            for (let i = 0; i < 9; i++) {
              // Calcola l'inizio e la fine di ogni segmento
              const segmentStartDate = addDays(startDate, i * segmentSize);
              const segmentEndDate = i === 8 ? endDate : addDays(segmentStartDate, segmentSize); // se è l'ultimo conta fino ad end date
      
              operationIdToDateMap.forEach(opDate => {
                const operationDate = new Date(opDate.date);
                opDate.operations_id.forEach(op => {
                  const operation = operations.find(op2 => op2.operation_id === op);
                  if (operation) {
                    if (operationDate >= segmentStartDate && operationDate < segmentEndDate) {
                      // Aggiungi i valori al segmento corretto
                      const groupName = operation.amount >= 0 ? "gain": "loss";
                      const amount = operation.amount;
                      // Se non esiste lo pusho, se esiste aggiungo il conteggio e l'operazione nell'array operations
                      const tempDateAmounts = dateAmounts.findIndex(dateA => dateA.name === segmentRangedDaysKey(segmentStartDate,segmentEndDate))
                      if (tempDateAmounts !== -1) {
                        dateAmounts[tempDateAmounts][groupName] += Math.abs(amount); 
                        dateAmounts[tempDateAmounts].operations.push(operation);
                      }
                      else {
                        const newObj = {
                          gain: groupName === "gain" ? Math.abs(amount) : 0, // Imposta gain a amount solo se groupName è "gain"
                          loss: groupName === "loss" ? Math.abs(amount) : 0,
                          startDate:segmentStartDate,
                          endDate:segmentEndDate,
                          name: segmentRangedDaysKey(segmentStartDate,segmentEndDate),
                          operations: [operation],
                        };
                        dateAmounts.push(newObj);
                      }
                    }
                  }
                });
              });
            }   
          }
          else {
            operationIdToDateMap.forEach(opDate => {
              opDate.operations_id.forEach(op => {
                const operation = operations.find(op2 => op2.operation_id === op);
                if (operation) {
                  const operationDate = new Date(opDate.date);
                  if (operationDate >= startDate && operationDate < endDate) {
                    // Aggiungi i valori al segmento corretto
                    const groupName = operation.amount >= 0 ? "gain": "loss";
                    const amount = operation.amount;
                    // Se non esiste lo pusho, se esiste aggiungo il conteggio e l'operazione nell'array operations
                    const tempDateAmounts = dateAmounts.findIndex(dateA => {dateA.name === segmentDaysKey(operationDate)})
                    if (tempDateAmounts !== -1) {
                      dateAmounts[tempDateAmounts][groupName] += Math.abs(amount); 
                      dateAmounts[tempDateAmounts].operations.push(operation);
                    }
                    else {
                      const newObj = {
                        gain: groupName === "gain" ? amount : 0, // Imposta gain a amount solo se groupName è "gain"
                        loss: groupName === "loss" ? Math.abs(amount) : 0,
                        startDate:startDate,
                        endDate:endDate,
                        name: segmentDaysKey(operationDate),
                        operations: [operation],
                      };
                      dateAmounts.push(newObj);
                    }
                  }
                }
              });
            });
          }
          break;
        case 'week':
          
          break;
        
        case 'month':
          
          break;

        case 'year':
          
          break;
      
        default:
          break;
      }
      console.log("dateAmounts",dateAmounts)
      setBarChartData(dateAmounts);
    }
  }, [operationIdToDateMap, operations, dateRangeDisplayed]);
  
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
              <Bar dataKey={"gain"} fill={theme.colors.green[400]} /> 
              <Bar dataKey={"loss"} fill={theme.colors.red[500]} />
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