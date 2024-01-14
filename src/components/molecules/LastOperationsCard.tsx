import { Card, CardBody, Heading, Table, TableContainer, CardProps, Tbody, Td, Th, Thead, Tr, Wrap, Grid, Box, GridItem, useColorMode} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
import { Label, Operation } from '../../interfaces/Operation';
import LabelTag from '../atoms/LabelTag';

interface LastOperationsCardProps extends CardProps {
  operations?: Operation[];
}

export const LastOperationsCard = ({operations, ...props}: LastOperationsCardProps) => {
  const { colorMode } = useColorMode();
  const {t} = useTranslation('ns1',{ i18n } );

 // Filter operations into gains and losses
  const gains = operations?.filter(operation => operation.amount >= 0) || [];
  const losses = operations?.filter(operation => operation.amount < 0) || [];

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
    console.log(atLeastOne);
    return atLeastOne;
  }

  const OperationsTable = ({ operations, title, color}: { operations: Operation[], title: string, color: string}) => (
    <Box>
      <Heading size={'sm'} textAlign="center" m={2} color={ colorMode === 'light' && color+'.500' || color+'.600'}>{t(title)}</Heading>
      <TableContainer>
        <Table variant='simple' size={'sm'} >
          <Thead>
            <Tr>
              {/* TODO ADD Date */}
              <Th>{t('name')}</Th>
              <Th>{t('amount')}</Th>
              {atLeastOneLabel(operations) && <Th>{t('labels')}</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {operations.map((operation) => (
              <Tr key={operation.operation_id}>
                <Td>{operation.name}</Td>
                <Td >
                  {operation.amount + ' €'}
                </Td>
                {atLeastOneLabel(operations) &&
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
    </Box>
  );

  return (
    <>
    <Card {...props}>
      <CardBody>
      <Heading size={'md'} m={1}>{t('latest operations')}</Heading>
        <Grid templateRows='repeat(1, 1fr)' templateColumns='repeat(2, 1fr)' gap={1}>
          <GridItem > 
            <OperationsTable operations={gains} title='In ingresso' color='green'/>
          </GridItem>
          <GridItem>
            <OperationsTable operations={losses} title='In uscita' color='red'/>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
    </>
  );
};

export default LastOperationsCard;