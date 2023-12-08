import { Table, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient';
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';

interface Country {
  id: number;
  name: string;
  population: number;
}

const CountryTable = () => {
  
  const {t} = useTranslation('ns1',{ i18n } );

  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data || []);
  }

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
          {countries.map((country) => (
            <Tr key = {country.id}>
              <Td>{country.id}</Td>
              <Td>{country.name}</Td>
              <Td>{country.population}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    </>
  )
}

export default CountryTable