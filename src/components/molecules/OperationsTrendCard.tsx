import { Box, Card, CardBody, CardHeader, CardProps, Heading, useColorMode, useTheme } from "@chakra-ui/react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Customized  } from 'recharts';
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import { Label as LabelOp, Operation, OperationsForDate } from "../../interfaces/Operation";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import LabelTag from "../atoms/LabelTag";
import { DateRange, TimeUnit } from "../../interfaces/Date";
import { enUS, it } from "date-fns/locale";
import { BarCharSegment, calculateSegments } from "../../utils/RechartsUtils";
import { format, startOfDay } from "date-fns";
import CharTooltip, { CharTooltipMode } from "../atoms/CharTooltip";

// import { BarCharSegment } from "../../utils/RechartsUtils";

interface OperationTrendCardProps extends CardProps {
  operations?: Operation[],
  labels?: LabelOp[],
  operationIdToDateMap?: OperationsForDate[],
  dateRangeDisplayed: DateRange,
}

export const OperationTrendCard = ({operations, labels, operationIdToDateMap, dateRangeDisplayed, ...props} : OperationTrendCardProps) => {
  const {t} = useTranslation('ns1',{ i18n } );
  const currentLocale = i18n.language === 'it' ? it : enUS;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const rechartsTextColor = colorMode === 'light' ? 'black' : 'white';
  const [barChartData, setBarCharSegment] = useState<BarCharSegment[]>([]);

  useEffect(() => {
    if (!operationIdToDateMap || !operations) {
      return;
    }
    const emptySegments: BarCharSegment[] = calculateSegments(currentLocale,dateRangeDisplayed) || [];
    
    const isSameYear = emptySegments[0].startDate.getFullYear() === emptySegments[emptySegments.length - 1].endDate.getFullYear();

    const populatedSegments: BarCharSegment[] = emptySegments.map(segment => {
      let gainSum = 0;
      let lossSum = 0;
  
      const operationsForSegment = operationIdToDateMap.filter(opToDate => {
        const opDate = startOfDay(new Date(opToDate.date));
        return opDate >= startOfDay(segment.startDate) && opDate <= startOfDay(segment.endDate);
      });
  
      operationsForSegment.forEach(opToDate => {
        opToDate.operations_id.forEach(opId => {
          const operationToAdd = operations.find(op => op.operation_id === opId);
          if (operationToAdd) {
            if (operationToAdd.amount >= 0) {
              gainSum += operationToAdd.amount;
            } else {
              lossSum += Math.abs(operationToAdd.amount);
            }
          }
        });
      });
  
      const updatedSegment = { ...segment, gain: gainSum, loss: lossSum, operationsForDate: operationsForSegment };

      // Se c'è una sola operationDate con un solo operations_id, aggiorna il nome del segmento con quella data specifica
      if (updatedSegment.operationsForDate.length === 1 && updatedSegment.operationsForDate[0].operations_id.length === 1 && dateRangeDisplayed.timeUnit !== TimeUnit.YEAR) {
        const specificOpDate = new Date(updatedSegment.operationsForDate[0].date);
        const formatStyle = isSameYear ? "d/M" : "d/M/yy";
        updatedSegment.name = format(specificOpDate, formatStyle, { locale: currentLocale });
      }
      return updatedSegment;
    });

  
    setBarCharSegment(populatedSegments);    
  }, [operationIdToDateMap, operations, dateRangeDisplayed, currentLocale]);
  
  return (
    <Card {...props} minH={'331.19px'}>
      <CardHeader>
        <Heading size={'md'} m={1}>{t('operations chart')}</Heading>
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
              <XAxis dataKey="name" stroke={rechartsTextColor}/>
              <YAxis stroke={rechartsTextColor} />
              <Tooltip content={<CharTooltip mode={CharTooltipMode.BAR}/>} />
              <Bar dataKey={"gain"} fill={theme.colors.green[400]} /> 
              <Bar dataKey={"loss"} fill={theme.colors.red[500]} />
            </BarChart>
          </ResponsiveContainer>
        </Box> 
        <Box display="flex" justifyContent="space-evenly">
            {labels?.map( label => {
              if (label.name === "gain" || label.name === 'loss')
                return <LabelTag key={label.label_id} label={label}/>
            })}
        </Box>        
      </CardBody>
    </Card>
  );
}

export default OperationTrendCard;