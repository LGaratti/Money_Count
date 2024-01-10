import { Card, CardBody, Heading, Table, TableContainer, CardProps, Tbody, Td, Th, Thead, Tr, Wrap, Grid, Box, GridItem} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
import { Label, Operation } from '../../interfaces/Operation';
import LabelTag from '../atoms/LabelTag';

interface LastOperationsCardProps extends CardProps {
  operations?: Operation[];
  cardTitle: string;
}

export const LastOperationsCard = ({operations, cardTitle, ...props}: LastOperationsCardProps) => {
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

  // Table component for operations
  const OperationsTable = ({ operations, title, titleColor }: { operations: Operation[], title: string, titleColor: string }) => (
      
      
      <Box>
        <Heading color={titleColor} size={'sm'}>{t(title)}</Heading>
        <TableContainer>
          <Table variant='simple' size={'sm'}>
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
                  <Td color={operation.amount >= 0 ? 'green' : 'red'}>
                    {(operation.amount >= 0 ? '+' : '') + operation.amount + ' €'}
                  </Td>
                  <Td>
                    <Wrap spacing={2}>
                      {labelsWithoutGainAndLoss(operation.labels).map((label, index) => (
                        <LabelTag key={index} label={label} />
                      ))}
                    </Wrap>
                  </Td>
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
      <Heading size={'md'}>{t(cardTitle)}</Heading>
      <Grid templateRows='repeat(1, 1fr)' templateColumns='repeat(2, 1fr)' gap={1} border={'3px'}>
        <GridItem>
      <OperationsTable operations={gains} title='In ingresso' titleColor='green' />

        </GridItem>
        <GridItem>
      <OperationsTable operations={losses} title='In uscita' titleColor='red' />
          
        </GridItem>
      </Grid>
        {/* <Heading size={'sm'} mb={4}>{t(title)}</Heading> */}
      </CardBody>
    </Card>
    </>
  );
};

export default LastOperationsCard;