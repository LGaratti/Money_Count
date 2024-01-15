import { Box, Card, CardBody, CardProps, Heading } from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import { Label, Operation } from "../../interfaces/Operation";
import { useEffect, useState } from "react";


export interface PortfolioSummCardProps extends CardProps {
  operations?: Operation[],
  labels?: Label[],
}

interface OperationsToPie {
  name?:string,
  value?:number
}
export const PortfolioSummCard = ({operations, labels, ...props} : PortfolioSummCardProps) => {
  // const { colorMode } = useColorMode();
  const {t} = useTranslation('ns1',{ i18n } );

  const [opsForInOutPie, setOpsForInOutPie] = useState<OperationsToPie[]>([]);
  // const [opsForLabelsPie, setOpsForLabelsPie] = useState<OperationsToPie[]>([]);

  useEffect(() => {
    let sumGainOps = 0;
    let sumLossOps = 0;

  
    operations?.forEach( operation => {
      if (operation.amount >= 0) {
        sumGainOps += operation.amount;
      }
      else {
        sumLossOps += operation.amount;
      }
    })
    const tempOperationToPie: OperationsToPie[] = [
      // TOMODIFY Bisogna fare la media
      {name: 'gain', value:sumGainOps},
      {name: 'loss', value:sumLossOps},
    ]  
    setOpsForInOutPie(tempOperationToPie);
    
    // TODO da scommentare
    // const operationsCountForLabels = labels?.map(label => {
    //   const count = operations?.filter(operation => operation.labels.includes(label)).length || 0;
    //   return { name: label, value: count };
    // });
    // setOpsForLabelsPie(operationsCountForLabels);

    // console.log(tempOperationToPie);
  },[operations, labels]);

  useEffect(() => {
    console.log(opsForInOutPie);
  },[opsForInOutPie]);

  
  
  return (
    <Card {...props}>

      <CardBody>
      <Heading size={'md'} m={1}>{t('portfolio summary')}</Heading>
      {/* <Grid templateRows='repeat(1, 1fr)' templateColumns='repeat(2, 1fr)' gap={1}>
          <GridItem>
            <Box height={200}>
              <ResponsiveContainer>
              <PieChart>
              <Pie
                data={opsForInOutPie}
                innerRadius={60}
                outerRadius={80}
                fill={'green'}
                paddingAngle={5}
                dataKey="value"
              >
                {opsForInOutPie.map((op, index) => (
                  op.name === 'gain' &&
                  <Cell key={`cell-${index}`} fill={'green'} />
                  ||
                  <Cell key={`cell-${index}`} fill={'red'} />
                ))}
              </Pie>
              </PieChart>
              </ResponsiveContainer>
            </Box> 
          </GridItem>
          <GridItem>
            
          </GridItem>
        </Grid> */}
            <Box height={200}>
              <ResponsiveContainer>
              <PieChart>
              <Pie
                data={opsForInOutPie}
                innerRadius={60}
                outerRadius={80}
                fill={'green'}
                paddingAngle={5}
                dataKey="value"
              >
                {opsForInOutPie.map((op, index) => (
                  op.name === 'gain' &&
                  <Cell key={`cell-${index}`} fill={'green'} />
                  ||
                  <Cell key={`cell-${index}`} fill={'red'} />
                ))}
              </Pie>
              <Pie
                data={opsForInOutPie}
                innerRadius={60}
                outerRadius={80}
                fill={'green'}
                paddingAngle={5}
                dataKey="value"
              >
                {opsForInOutPie.map((op, index) => (
                  op.name === 'gain' &&
                  <Cell key={`cell-${index}`} fill={'green'} />
                  ||
                  <Cell key={`cell-${index}`} fill={'red'} />
                ))}
              </Pie>
              </PieChart>
              </ResponsiveContainer>
            </Box>
      </CardBody>
    </Card>
  );
}

export default PortfolioSummCard;