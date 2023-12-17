import { HStack, Table, TableContainer, TableProps, Tag, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
import { Operation } from '../../interfaces/Operation';

interface OperationCardProps extends TableProps {
  operations?: Operation[];
}

// const OperationCard = ({operations}: Props) => {
  export const OperationCard = ({operations,...props}: OperationCardProps) => {
  const {t} = useTranslation('ns1',{ i18n } );

  return (
    <>
      <TableContainer>
      <Table variant='simple'{...props}>
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
              <HStack spacing={2}>
                {operation?.labels.map((label) => (<Tag key={label?.label_id} color={'#1a202c'} bg={label?.color_rgb+'.100'}>{label.name}</Tag>))}
              </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    </>
  )
}

export default OperationCard