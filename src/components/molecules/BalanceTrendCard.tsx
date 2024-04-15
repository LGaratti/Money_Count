import { Box, Card, CardBody, CardHeader, CardProps, Heading, useColorMode, useTheme } from "@chakra-ui/react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Customized  } from 'recharts';
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import { Label as LabelOp, Operation, OperationsForDate } from "../../interfaces/Operation";
import { useEffect, useState } from "react";
import { AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Area } from "recharts";
import { DateRange, TimeUnit } from "../../interfaces/Date";
import { enUS, it } from "date-fns/locale";
import { AreaCharSegment, BarCharSegment, calculateSegments } from "../../utils/RechartsUtils";
import { format, startOfDay } from "date-fns";
import CharTooltip, { CharTooltipMode } from "../atoms/CharTooltip";

interface BalanceTrendCardProps extends CardProps {
  operations?: Operation[];
  labels?: LabelOp[];
  operationIdToDateMap?: OperationsForDate[];
  dateRangeDisplayed: DateRange;
}

export const BalanceTrendCard = ({operations, operationIdToDateMap, dateRangeDisplayed, ...props} : BalanceTrendCardProps) => {
  const {t} = useTranslation('ns1',{ i18n } );
  const currentLocale = i18n.language === 'it' ? it : enUS;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const rechartsTextColor = colorMode === 'light' ? 'black' : 'white';
  const [AreaCharData, setAreaCharSegment] = useState<AreaCharSegment[]>([]);

  useEffect(() => {
    if (!operationIdToDateMap || !operations) {
      return;
    }
    const emptySegments: BarCharSegment[] = calculateSegments(currentLocale,dateRangeDisplayed) || [];
    
    const isSameYear = emptySegments[0].startDate.getFullYear() === emptySegments[emptySegments.length - 1].endDate.getFullYear();

    let amountSum = 0;
    const populatedSegments: AreaCharSegment[] = emptySegments.map(segment => {
      const operationsForSegment = operationIdToDateMap.filter(opToDate => {
        const opDate = startOfDay(new Date(opToDate.date));
        return opDate >= startOfDay(segment.startDate) && opDate <= startOfDay(segment.endDate);
      });
  
      operationsForSegment.forEach(opToDate => {
        opToDate.operations_id.forEach(opId => {
          const operationToAdd = operations.find(op => op.operation_id === opId);
          if (operationToAdd) {
            if (operationToAdd.amount >= 0) {
              amountSum += operationToAdd.amount;
            } else {
              amountSum -= Math.abs(operationToAdd.amount);
            }
          }
        });
      });
  
      const updatedSegment:AreaCharSegment = { ...segment, amount: amountSum, operationsForDate: operationsForSegment };

      // Se c'è una sola operationDate con un solo operations_id, aggiorna il nome del segmento con quella data specifica
      if (updatedSegment.operationsForDate.length === 1 && updatedSegment.operationsForDate[0].operations_id.length === 1 && dateRangeDisplayed.timeUnit !== TimeUnit.YEAR) {
        const specificOpDate = new Date(updatedSegment.operationsForDate[0].date);
        const formatStyle = isSameYear ? "d/M" : "d/M/yy";
        updatedSegment.name = format(specificOpDate, formatStyle, { locale: currentLocale });
      }
      return updatedSegment;
    });
    setAreaCharSegment(populatedSegments);
  }, [operationIdToDateMap, operations, dateRangeDisplayed, currentLocale]);
  
  return (
    <Card {...props} minH={'331.19px'}>
      <CardHeader>
        <Heading size={'md'} m={1}>{t('budget chart')}</Heading>
      </CardHeader>
      <CardBody>
        <Box height={200}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={AreaCharData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke={rechartsTextColor}/>{/* <XAxis dataKey="name" ticks={weekLabels} /> */}
              <YAxis stroke={rechartsTextColor} />
              <Tooltip content={<CharTooltip mode={CharTooltipMode.AREA}/>} />
              <Area type="monotone" dataKey="amount" stroke={theme.colors.purple[400]}  fill={theme.colors.purple[400]}  />
            </AreaChart>
          </ResponsiveContainer>
        </Box>       
      </CardBody>
    </Card>
  );
}

export default BalanceTrendCard;