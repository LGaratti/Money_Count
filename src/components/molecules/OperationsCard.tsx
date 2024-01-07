import { Card, CardBody, Heading, Table, TableContainer, CardProps, Tbody, Td, Th, Thead, Tr, Wrap} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
import { Operation } from '../../interfaces/Operation';
import LabelTag from '../atoms/LabelTag';

interface OperationsCardProps extends CardProps {
  operations?: Operation[];
  cardTitle: string;
}

export const OperationsCard = ({operations, cardTitle, ...props}: OperationsCardProps) => {
  const {t} = useTranslation('ns1',{ i18n } );

  return (
    <> 
    <Card {...props}>
      <CardBody>
      <Heading size={'sm'}>{t(cardTitle)}</Heading>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>{t('name')}</Th>
                <Th>{t('amount')}</Th>
                <Th>{t('labels')}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {operations?.map((operation) => (
                <Tr key = {operation.operation_id}>
                  <Td>{operation?.name}</Td>
                  <Td color={ operation?.amount >= 0 ? 'green' : 'red'}> {
                    ( operation?.amount >= 0 ? '+': '') + operation.amount + ' €'
                  }</Td>
                  <Td>
                  <Wrap spacing={2}>
                    {operation?.labels.map((label) => (<LabelTag label={label} />))}
                  </Wrap>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
    </>
  )
}

export default OperationsCard