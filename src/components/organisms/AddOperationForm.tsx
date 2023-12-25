import { 
  Card, CardBody, Heading, CardHeader, FormControl,
  FormLabel, Input, Button, NumberInput, NumberInputField,
  NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
   FormErrorMessage, Textarea, TableContainer, Table, Tbody, Tr, Td, Select} from '@chakra-ui/react'
import {  useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { Label, Operation } from '../../interfaces/Operation';
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
import LabelsComponent from '../molecules/LabelsComponent';
import { getLabelsFromServer } from '../../utils/supabaseClient';
// import { Operation } from '../../interfaces/Operation';

export const AddOperationCard = ({...props}) => {
  const {t} = useTranslation('ns1',{ i18n } );
  
  const [serverLabels, setServerLabels] = useState<Label[]>([]);
  useEffect(() => { 
    getLabelsFromServer(setServerLabels);
  },[]);

  const [labels, setLabels] = useState<Label[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Operation>();

  const onSubmit: SubmitHandler<Operation> = (data) => {
    // Qui puoi inserire il codice per l'invio dei dati al server Supabase
    console.log(data);
  };

  const [amount, setAmount] = useState(0);
  const handleAmountChange = (_: string, valueAsNumber: number) => {
    setAmount(valueAsNumber);
  };

// DA SCOMMENTARE
  // const [serverLabels, setLabels] = useState([]);
  useEffect(() => {
    let tempLabels = labels.filter(label => amount < 0 ? label.name !== 'gain' : label.name !== 'loss');

    if (amount < 0) {
      const lossLabel = serverLabels.find(label => label.name === 'loss');
      if (lossLabel && !tempLabels.some(label => label.name === 'loss')) {
        tempLabels.push(lossLabel);
      }
    }
    else {
      const gainLabel = serverLabels.find(label => label.name === 'gain');
      if (gainLabel && !tempLabels.some(label => label.name === 'gain')) {
        tempLabels.push(gainLabel);
      } 
    }

    setLabels(tempLabels);
  }, [amount]);

  // const { colorMode } = useColorMode();
  return (
    <> 
      <Card {...props}>
        <CardHeader>
          <Heading>Add Operation</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>

            <TableContainer>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>
                    <FormControl isInvalid={!!errors.name}>
                      <FormLabel htmlFor='name'>{t('name')}</FormLabel>
                      <Input id='name' {...register('name', { required: 'This is required' })} />
                      <FormErrorMessage>
                        {errors.name && errors.name.message}
                      </FormErrorMessage>
                    </FormControl>
                    </Td>
                    <Td>
                      <FormControl isInvalid={!!errors.amount}>
                        <FormLabel htmlFor='amount'>{t('amount')}</FormLabel>
                        <NumberInput defaultValue={0} id='amount' precision={2} onChange={handleAmountChange}>
                          <NumberInputField {...register('amount', {
                            valueAsNumber: true,
                            required: 'This is required'
                          })} />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>
                          {errors.amount && errors.amount.message}
                        </FormErrorMessage>
                      </FormControl>
                    </Td>
                    <Td>
                    <FormControl>
                      <FormLabel>{t('labels')}</FormLabel>
                      <LabelsComponent serverLabels={serverLabels} setServerLabels={setServerLabels} labels={labels} setLabels={setLabels}/>
                    </FormControl>
                    </Td>

                  </Tr>
                  <Tr>
                  <Td>
                    <FormControl isInvalid={!!errors.description}>
                      <FormLabel htmlFor='description'>{t('description')}</FormLabel>
                      <Textarea id='description' {...register('description')}></Textarea>
                      <FormErrorMessage>
                        {errors.description && errors.description.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Td>
                  <Td>
                    <FormControl isInvalid={!!errors.first_date}>
                      <FormLabel htmlFor='first_date'>{t('date')}</FormLabel>
                      <Input
                      id='first_date'
                      placeholder="Select Date and Time"
                      size="md"
                      type="datetime-local"
                      />
                      <FormErrorMessage>
                        {errors.description && errors.description.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Td>
                  <Td>
                    <FormControl isInvalid={!!errors.periodic_unit}>
                      <FormLabel htmlFor='periodic_unit'>{t('recurrence')}</FormLabel>
                      <Select id='periodic_unit'>
                        <option value='none'>{t('none')}</option>
                        <option value='day'>{t('dayly')}</option>
                        <option value='week'>{t('weekly')}</option>
                        <option value='month'>{t('monthly')}</option>
                        <option value='year'>{t('yearly')}</option>
                      </Select>
                      <FormErrorMessage>
                        {errors.description && errors.description.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>   
            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
              Add
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default AddOperationCard
