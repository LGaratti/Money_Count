import { Card, CardBody, Heading, Table, TableContainer, CardProps, Tbody, Td, Th, Thead, Tr, Wrap, Grid, Box, GridItem, useColorMode} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
import { Label, Operation, OperationsForDate } from '../../interfaces/Operation';
import LabelTag from '../atoms/LabelTag';
import { useEffect, useState } from 'react';
import { enUS, it } from 'date-fns/locale';
import { format } from 'date-fns';

interface LastOperationsCardProps extends CardProps {
  operations?: Operation[];
  opsToDate: OperationsForDate[];
}

export const LastOperationsCard = ({operations, opsToDate, ...props}: LastOperationsCardProps) => {
  const { colorMode } = useColorMode();
  const {t} = useTranslation('ns1',{ i18n } );
  const currentLocale = i18n.language === 'it' ? it : enUS;
  const [gains,setGains] = useState<Operation[]>();
  const [losses,setLosses] = useState<Operation[]>();
  useEffect( () => {
    if(!operations || !opsToDate)
      return;
    // eslint-disable-next-line prefer-const
    let tempGains:Operation[] = []
    // eslint-disable-next-line prefer-const
    let tempLosses:Operation[] = [];
    opsToDate.forEach( opToDate => {
      opToDate.operations_id.forEach( opId => {
        const operation = operations.find(op2 => op2.operation_id === opId) || undefined;
      if(operation){
          operation.last_date = opToDate.date;
          if(operation.amount > 0)
            tempGains.push(operation)
          else
            tempLosses.push(operation)
        }
      })
    })

    setGains(tempGains);
    setLosses(tempLosses);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[opsToDate])
 // Filter operations into gains and losses
  // const gains = operations?.filter(operation => operation.amount >= 0) || [];
  // const losses = operations?.filter(operation => operation.amount < 0) || [];

  const labelsWithoutGainAndLoss = (labels: Label[])  => {
    const filteredLabels = labels.filter(label => label.name != 'gain' && label.name != 'loss')
    return filteredLabels;
  }

  const atLeastOneLabel = (tableOps: Operation[]) => {
    let atLeastOne = false;
    tableOps?.map(operation => {
      const labels = labelsWithoutGainAndLoss(operation.labels)
      if( labels.length > 0 )
        atLeastOne = true;
    })
    return atLeastOne;
  }

  const formatDate = (date:Date) => {
    return format(date, 'P', { locale: currentLocale }); // Utilizza il formato di data desiderato
  };

  const OperationsTable = ({ ops, title, color}: { ops?: Operation[], title: string, color: string}) => (
    
    <Box>
      <Heading size={'sm'} textAlign="center" m={2} color={ colorMode === 'light' && color+'.500' || color+'.600'}>{t(title)}</Heading>
      {
        ops &&
        <TableContainer>
          <Table variant='simple' size={'sm'} >
            <Thead>
              <Tr>
                <Th>{t('date')}</Th>
                <Th>{t('name')}</Th>
                <Th>{t('amount')}</Th>
                {atLeastOneLabel(ops) && <Th>{t('labels')}</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {ops.map((operation) => (
                <Tr key={operation.operation_id}>
                  <Td>{operation.last_date ? formatDate(operation.last_date) : formatDate(operation.first_date)}</Td>
                  <Td>{operation.name}</Td>
                  <Td >
                    {operation.amount + ' €'}
                  </Td>
                  {atLeastOneLabel(ops) &&
                    <Td>
                      <Wrap spacing={2}>
                        {labelsWithoutGainAndLoss(operation.labels).map((label, index) => (
                          <LabelTag key={index} label={label} />
                        ))}
                      </Wrap>
                    </Td>
                  }
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      }
    </Box>
  );

  return (
    <>
    <Card {...props} minH={'331.19px'}>
      <CardBody>
      <Heading size={'md'} m={1}>{t('latest operations')}</Heading>
        <Grid templateRows='repeat(1, 1fr)' templateColumns='repeat(2, 1fr)' gap={1}>
          <GridItem > 
            <OperationsTable ops={gains} title='In ingresso' color='green'/>
          </GridItem>
          <GridItem>
            <OperationsTable ops={losses} title='In uscita' color='red'/>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
    </>
  );
};

export default LastOperationsCard;