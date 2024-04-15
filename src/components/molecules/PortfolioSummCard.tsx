import { Box, Card, CardBody, CardProps, Grid, GridItem, Heading } from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Customized  } from 'recharts';
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import { Label as LabelOp, Operation, OperationsForDate } from "../../interfaces/Operation";
import { useEffect, useState } from "react";
import LabelTag from "../atoms/LabelTag";
import { useTheme } from "@chakra-ui/react";
import CharTooltip, { CharTooltipMode } from "../atoms/CharTooltip";
import { PieCharSegment } from "../../utils/RechartsUtils";

interface PortfolioSummCardProps extends CardProps {
  operations?: Operation[],
  labels?: LabelOp[],
  operationIdToDateMap?: OperationsForDate[]
}

interface CustomLabelProps {
  viewBox: {
    cx: number;
    cy: number;
  };
  value: number; // o string, a seconda di cosa intendi visualizzare
}

const CustomLabel: React.FC<CustomLabelProps> = ({ value }) => {
  const theme = useTheme();
  const isPositive = () => {
    if (value >= 0) return true;
    else return false;
  }
  return (
    <text x='50%' y='50%' textAnchor="middle" dominantBaseline="central" fontWeight="bold" 
    fill= {
      isPositive() && 
      theme.colors.green[500] || 
      theme.colors.red[500]
    }>
      {isPositive() && '+ ' + value + '€' || value + '€'}
    </text>
  );
};

export const PortfolioSummCard = ({operations, labels, operationIdToDateMap, ...props} : PortfolioSummCardProps) => {
  // const { colorMode } = useColorMode();
  const {t} = useTranslation('ns1',{ i18n } );
  const theme = useTheme();

  const [dataInOutPie, setDataInOutPie] = useState<PieCharSegment[]>([]);
  const [dataForLabelsPie, setDataForLabelsPie] = useState<PieCharSegment[]>([]);
  const [balance,setBalance] = useState<number>(0);

  useEffect(() => {
    let sumGainOps = 0;
    let sumLossOps = 0;

    const tempLabelPieData: PieCharSegment[] = [];

    operationIdToDateMap?.forEach( opForDate => {
      opForDate.operations_id.forEach( op_id => {
        const operationToAdd = operations?.find(op => op.operation_id === op_id);
        if (operationToAdd) {
          if (operationToAdd.amount >= 0) {
            sumGainOps += operationToAdd.amount;
          }
          else {
            sumLossOps += Math.abs(operationToAdd.amount);
          }

          operationToAdd.labels.forEach( label => {
            if(label.name !== "gain" && label.name !== "loss") {
              const existingLabel = tempLabelPieData.find(labelPie => labelPie.label?.label_id === label.label_id)
              if(existingLabel && existingLabel.value) {
                existingLabel.value += Math.abs(operationToAdd.amount)
              }
              else {
                tempLabelPieData.push({
                  value: Math.abs(operationToAdd.amount),
                  label: label,
                  name: label.name
                })
              }
            }
          })
        }
      })
    })

    const tempOperationToPie: PieCharSegment[] = [
        {name: 'gain', value:sumGainOps},
        {name: 'loss', value:sumLossOps},
      ]  
    setDataInOutPie(tempOperationToPie);
    setBalance(sumGainOps - sumLossOps);
    setDataForLabelsPie(tempLabelPieData);
  },[operations, labels, operationIdToDateMap]);

  return (
    <Card minH={'331.19px'} {...props}>
      <CardBody>
      <Heading size={'md'} m={1}>{t('portfolio summary')}</Heading>
      <Grid templateRows='repeat(1, 1fr)' templateColumns='repeat(2, 1fr)' gap={1}>
        <GridItem>
          <Heading size={'sm'} textAlign="center" m={2} >{t('gain/loss summary')}</Heading>
          <Box height={200}>
            <ResponsiveContainer>
            <PieChart>
            <Pie
              data={dataInOutPie}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              isAnimationActive={true}
              label 
            >
              {dataInOutPie.map((data, index) => (
                <Cell key={`cell-${index}`} fill={data.name === 'gain' && theme.colors.green[300] || theme.colors.red[400]} />
              ))}
            </Pie>
            <Tooltip content={<CharTooltip mode={CharTooltipMode.PIE}/>} />
            <Customized component={ <CustomLabel value={balance} viewBox={{cx: 0,cy: 0}}/>}></Customized>
            </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box display="flex" justifyContent="space-evenly">
            {labels?.map( label => {
              if (label.name === "gain" || label.name === 'loss')
                return <LabelTag key={label.label_id} label={label}/>
            })}
          </Box>
        </GridItem>
        <GridItem>
          <Heading size={'sm'} textAlign="center" m={2} >{t('labels summary')}</Heading>
          <Box height={200}>
            <ResponsiveContainer>
            <PieChart>
            <Pie
              data={dataForLabelsPie}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              isAnimationActive={true}
              label
            >
              {dataForLabelsPie.map((labelName, index) => (
                <Cell key={`cell-${index}`} fill={theme.colors[labelName.label?.color_rgb || "grey"][500]} /> 
              ))}
            </Pie>
            <Tooltip content={<CharTooltip mode={CharTooltipMode.PIE}/>} />
            </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box display="flex" justifyContent="space-evenly">
            {dataForLabelsPie?.map( segmLabelPie => {
              if (segmLabelPie.label && segmLabelPie.label.name !== "gain" && segmLabelPie.label.name !== 'loss')
                return <LabelTag key={segmLabelPie.label.label_id} label={segmLabelPie.label}/>
            })}
          </Box>
        </GridItem>
      </Grid>
      </CardBody>
    </Card>
  );
}

export default PortfolioSummCard;