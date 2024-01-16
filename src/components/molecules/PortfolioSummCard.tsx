import { Box, Card, CardBody, CardProps, Grid, GridItem, Heading } from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import { Label, Operation } from "../../interfaces/Operation";
import { useEffect, useState } from "react";
import LabelTag from "../atoms/LabelTag";


export interface PortfolioSummCardProps extends CardProps {
  operations?: Operation[],
  labels?: Label[],
}

interface DataPie {
  name?:string,
  value?:number,
  label?:Label
}
export const PortfolioSummCard = ({operations, labels, ...props} : PortfolioSummCardProps) => {
  // const { colorMode } = useColorMode();
  const {t} = useTranslation('ns1',{ i18n } );

  const [dataInOutPie, setDataInOutPie] = useState<DataPie[]>([]);
  const [dataForLabelsPie, setDataForLabelsPie] = useState<DataPie[]>([]);

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
    
    let tempLabels = labels || [];
    tempLabels = tempLabels.filter(label => label.name !== "gain" && label.name !== "loss");
    const tempOperationsLabelsPie: DataPie[] = tempLabels?.map(label => {
      const count = operations?.filter(operation => operation.labels.some(opLabel => opLabel.label_id === label.label_id)).length || 0;
      return { name: label.name, value: count, label: label };
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
            >
              {dataInOutPie.map((data, index) => (
                data.name === 'gain' &&
                <Cell key={`cell-${index}`} fill={'green'} />
                ||
                <Cell key={`cell-${index}`} fill={'red'} />
              ))}
            </Pie>
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
            >
              {dataForLabelsPie.map((labelName, index) => (
                <Cell key={`cell-${index}`} fill={labelName.label?.color_rgb} /> 
              ))}
            </Pie>
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