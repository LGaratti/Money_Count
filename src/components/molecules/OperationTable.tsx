import { Table, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
import { Operation } from '../../interfaces/Operation';

interface Props {
  operations: Operation[];
}

const OperationTable = ({operations}: Props) => {
  
  const {t} = useTranslation('ns1',{ i18n } );

  return (
    <>
      <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>{t('id')}</Th>
            <Th>{t('name')}</Th>
            <Th>{t('population')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {operations.map((operation) => (
            <Tr key = {operation.operation_id}>
              <Td>{operation.operation_id}</Td>
              <Td>{operation.name}</Td>
              <Td>{operation?.description}</Td>
              {/* <Td>{operation?.labels.map((label) => ( label.name))}</Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    </>
  )
}

export default OperationTable