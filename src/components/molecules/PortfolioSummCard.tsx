import { Box, Card, CardBody, CardProps, Grid, GridItem, Heading } from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label  } from 'recharts';
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

// interface CustomLabelProps {
//   viewBox: {
//     cx: number;
//     cy: number;
//   };
//   value: number; // o string, a seconda di cosa intendi visualizzare
// }

// const CustomLabel: React.FC<CustomLabelProps> = ({ viewBox, value }) => {
//   const { cx, cy } = viewBox;
//   return (
//     <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontWeight="bold">
//       {value}
//     </text>
//   );
// };

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
      const count = operations?.filter(operation => operation.labels.some(opLabel => opLabel.label_id === label.label_id)).length || 0;
      return { name: label.name, value: count, label: label };
    }) || [];
    setDataForLabelsPie(tempOperationsLabelsPie);
  },[operations, labels]);
  
  // useEffect(() => {
  //   console.log('pie 1:',dataInOutPie,'pie 2:',dataForLabelsPie);
  // }),[dataInOutPie,dataForLabelsPie]

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
              // label
              // label={({ viewBox }) => <CustomLabel viewBox={viewBox} value={balance} />}
            >
              {dataInOutPie.map((data, index) => (
                data.name === 'gain' &&
                <Cell key={`cell-${index}`} fill={theme.colors.green[300]} />
                ||
                <Cell key={`cell-${index}`} fill={theme.colors.red[400]} />
              ))}
            </Pie>
            <Tooltip />
            <Label value={balance} width={30} position="center" />
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