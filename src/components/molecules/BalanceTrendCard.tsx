import { Box, Card, CardBody, CardHeader, CardProps, Heading, useTheme } from "@chakra-ui/react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Customized  } from 'recharts';
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import { Label as LabelOp, Operation, OperationsForDate } from "../../interfaces/Operation";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import LabelTag from "../atoms/LabelTag";
import { DateRange } from "../../interfaces/Date";
import { enUS, it } from "date-fns/locale";
// import { BarCharSegment } from "../../utils/RechartsUtils";

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
  
  // const [barChartData, setBarCharSegment] = useState<BarCharSegment[]>([]);

  useEffect(() => {
    if (operationIdToDateMap && operations) {

      // TODO da scommentare
//       const dateAmounts: BarCharSegment[] = calculateSegments(currentLocale,dateRangeDisplayed)


//       OLD---------------------------------------------------------------------------------------------------------------------
//       const segmentSize = Math.ceil(totalDays / 9); // Arrotonda per eccesso per avere al massimo 9 segmenti
//             
//       for (let i = 0; i < 9; i++) {
//         // Calcola l'inizio e la fine di ogni segmento
//         const segmentStartDate = addDays(startDate, i * segmentSize);
//         const segmentEndDate = i === 8 ? endDate : addDays(segmentStartDate, segmentSize); // se è l'ultimo conta fino ad end date
//         const segmentKeyString:string = segmentKey(segmentStartDate,segmentEndDate,currentLocale,dateRangeDisplayed);
// 
//         operationIdToDateMap.forEach(opDate => {
//           const operationDate = new Date(opDate.date);
//           opDate.operations_id.forEach(op => {
//             const operation = operations.find(op2 => op2.operation_id === op);
//             if (operation) {
//               if (operationDate >= segmentStartDate && operationDate < segmentEndDate) {
//                 // Aggiungi i valori al segmento corretto
//                 const groupName = operation.amount >= 0 ? "gain": "loss";
//                 const amount = operation.amount;
//                 // Se non esiste lo pusho, se esiste aggiungo il conteggio e l'operazione nell'array operations
//                 const tempDateAmounts = dateAmounts.findIndex(dateA => dateA.name === segmentKeyString)
//                 if (tempDateAmounts !== -1) {
//                   dateAmounts[tempDateAmounts][groupName] += Math.abs(amount); 
//                   dateAmounts[tempDateAmounts].operations.push(operation);
//                 }
//                 else {
//                   const newObj = {
//                     gain: groupName === "gain" ? Math.abs(amount) : 0, // Imposta gain a amount solo se groupName è "gain"
//                     loss: groupName === "loss" ? Math.abs(amount) : 0,
//                     startDate:segmentStartDate,
//                     endDate:segmentEndDate,
//                     name: segmentKeyString,
//                     operations: [operation],
//                   };
//                   dateAmounts.push(newObj);
//                 }
//               }
//             }
//           });
//         });
//       }
// console.log("dateAmounts",dateAmounts)
// setBarCharSegment(dateAmounts);
// !OLD---------------------------------------------------------------------------------------------------------------------
  console.log(currentLocale)
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
              // data={barChartData} TODO da scommentare
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