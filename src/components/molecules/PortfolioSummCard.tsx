import { Box, Card, CardBody, CardProps, Grid, GridItem, Heading } from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Customized  } from 'recharts';
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import { Label as LabelOp, Operation } from "../../interfaces/Operation";
import { useEffect, useState } from "react";
import LabelTag from "../atoms/LabelTag";
import { useTheme } from "@chakra-ui/react";

interface PortfolioSummCardProps extends CardProps {
  operations?: Operation[],
  labels?: LabelOp[],
}

interface DataPie {
  name?:string,
  value?:number,
  label?:LabelOp
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

export const PortfolioSummCard = ({operations, labels, ...props} : PortfolioSummCardProps) => {
  // const { colorMode } = useColorMode();
  const {t} = useTranslation('ns1',{ i18n } );
  const theme = useTheme();

  const [dataInOutPie, setDataInOutPie] = useState<DataPie[]>([]);
  const [dataForLabelsPie, setDataForLabelsPie] = useState<DataPie[]>([]);
  const [balance,setBalance] = useState<number>(0);

  useEffect(() => {
    let sumGainOps = 0;
    let sumLossOps = 0;
    operations?.forEach( operation => {
      if (operation.amount >= 0) {
        sumGainOps += operation.amount;
      }
      else {
        sumLossOps = sumLossOps + (-1 * operation.amount);
      }
    })
    const tempOperationToPie: DataPie[] = [
      {name: 'gain', value:sumGainOps},
      {name: 'loss', value:sumLossOps},
    ]  
    setDataInOutPie(tempOperationToPie);
    setBalance(sumGainOps - sumLossOps);
    
    let tempLabels = labels || [];
    tempLabels = tempLabels.filter(label => label.name !== "gain" && label.name !== "loss");
    const tempOperationsLabelsPie: DataPie[] = tempLabels?.map(label => {
      const tempOperations: Operation[] = operations?.filter(operation => operation.labels.some(opLabel => opLabel.label_id === label.label_id)) || [];
      let sum = 0; 
      tempOperations.forEach(operation => { sum = operation.amount }); // TODO Da modificare con amount negativi
      return { name: label.name, value: sum, label: label };
    }) || [];
    setDataForLabelsPie(tempOperationsLabelsPie);
  },[operations, labels]);

  return (
    <Card {...props}>
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
                data.name === 'gain' &&
                <Cell key={`cell-${index}`} fill={theme.colors.green[300]} />
                ||
                <Cell key={`cell-${index}`} fill={theme.colors.red[400]} />
              ))}
            </Pie>
            <Tooltip />
            <Customized component={ <CustomLabel value={balance} viewBox={{cx: 0,cy: 0}}/>}></Customized>
            </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box display="flex" justifyContent="space-evenly">
            {labels?.map( label => {
              if (label.name === "gain" || label.name === 'loss')
                return <><LabelTag label={label}/></>
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
            <Tooltip />
            </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box display="flex" justifyContent="space-evenly">
            {labels?.map( label => {
              if (label.name !== "gain" && label.name !== 'loss')
                return <><LabelTag label={label}/></>
            })}
          </Box>
        </GridItem>
      </Grid>
      </CardBody>
    </Card>
  );
}

export default PortfolioSummCard;