import { HStack, Table, TableContainer, TableProps, Tag, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
import { Operation } from '../../interfaces/Operation';

interface OperationCardProps extends TableProps {
  operations?: Operation[];
}

// const OperationTable = ({operations}: Props) => {
  export const OperationTable = ({operations,...props}: OperationCardProps) => {
  const {t} = useTranslation('ns1',{ i18n } );

  const amountColor = (amount: number) => {
    if (amount > 0) return 'green.500';
    if (amount < 0) return 'red.500';
  };

  const printWithSign = (amount:number) => {
    if (amount > 0 ) return "+"+amount+" €";
    else if (amount < 0 ) return amount+" €";
    return amount+" €";
  }
  
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
              <Td color={amountColor(operation?.amount)}>{printWithSign(operation?.amount)}</Td>
              <Td>
              <HStack spacing={2}>
                {operation?.labels.map((label) => (<Tag key={label?.label_id} bg={label?.color_rgb+'.100'}>{label.name}</Tag>))}
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

export default OperationTable