import { 
  Card, CardBody, Heading, CardHeader, FormControl,
  FormLabel, Input, Button, NumberInput, NumberInputField,
  NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
   FormErrorMessage, Textarea, Select, Grid, GridItem} from '@chakra-ui/react'
import {  useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { Label, Operation, TimeUnit } from '../../interfaces/Operation';
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
import LabelsComponent from '../molecules/LabelsComponent';
import { getLabelsFromServer } from '../../utils/supabaseClient';
// import { Operation } from '../../interfaces/Operation';

export const AddOperationCard = ({...props}) => {
  const {t} = useTranslation('ns1',{ i18n } );
  
  const [serverLabels, setServerLabels] = useState<Label[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [amount, setAmount] = useState(0);
  const [periodic_unit, setPeriodic_unit] = useState<TimeUnit>();

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

  useEffect(() => { 
    getLabelsFromServer(setServerLabels);
  },[]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Operation>();

  const onSubmit: SubmitHandler<Operation> = (data) => {
    // Qui puoi inserire il codice per l'invio dei dati al server Supabase
    console.log(data);
  };

  const handlePeriodicUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as TimeUnit;
    setPeriodic_unit(value);
  };

  const handleAmountChange = (_: string, valueAsNumber: number) => {
    setAmount(valueAsNumber);
  };

  return (
    <> 
      <Card {...props}>
        <CardHeader>
          <Heading>Add Operation</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              // h='200px'
              templateRows='repeat(4, 1fr)'
              templateColumns='repeat(3, 1fr)'
              gap={4}
            >
              <GridItem>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel htmlFor='name'>{t('name')}</FormLabel>
                  <Input id='name' {...register('name', { required: 'This is required' })} />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colStart={3} >
                <FormControl isInvalid={!!errors.description}>
                  <FormLabel htmlFor='description'>{t('description')}</FormLabel>
                  <Textarea id='description' {...register('description')}></Textarea>
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem>
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
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>{t('labels')}</FormLabel>
                  <LabelsComponent serverLabels={serverLabels} setServerLabels={setServerLabels} labels={labels} setLabels={setLabels}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={!!errors.first_date}>
                  <FormLabel htmlFor='first_date'>{t('date')}</FormLabel>
                  <Input
                  id='first_date'
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  />
                  <FormErrorMessage>
                    {errors.first_date && errors.first_date.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={!!errors.periodic_unit}>
                    <FormLabel htmlFor='periodic_unit'>{t('recurrence')}</FormLabel>
                    <Select id='periodic_unit' onChange={handlePeriodicUnitChange}>
                      <option value='none'>{t('none')}</option>
                      <option value='day'>{t('dayly')}</option>
                      <option value='week'>{t('weekly')}</option>
                      <option value='month'>{t('monthly')}</option>
                      <option value='year'>{t('yearly')}</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.periodic_unit && errors.periodic_unit.message}
                    </FormErrorMessage>
                  </FormControl>
              </GridItem>
              {periodic_unit && periodic_unit !== 'none' && (
                <GridItem>
                    <FormControl isInvalid={!!errors.periodic_count}>
                  <FormLabel htmlFor='periodic_count'>{t('periodic_count')}</FormLabel>
                  <NumberInput defaultValue={0} id='periodic_count'>
                    <NumberInputField {...register('periodic_count', {
                      valueAsNumber: true,
                      required: 'This is required'
                    })} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormErrorMessage>
                    {errors.periodic_count && errors.periodic_count.message}
                  </FormErrorMessage>

                  </FormControl>
                </GridItem>
              )}
              <GridItem colSpan={3} rowStart={4}> {/* Aggiusta rowStart basandoti sul numero di righe */}
                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                  Add
                </Button>
              </GridItem>

            </Grid>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default AddOperationCard
