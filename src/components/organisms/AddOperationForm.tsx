import { 
  Card, CardBody, Heading, CardHeader, FormControl,
  FormLabel, Input, Button, NumberInput, NumberInputField,
  NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  Wrap, WrapItem, FormErrorMessage} from '@chakra-ui/react'
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
            <Wrap>
              <WrapItem>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel htmlFor='name'>{t('name')}</FormLabel>
                  <Input id='name' {...register('name', { required: 'This is required' })} />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
              </WrapItem>
              <WrapItem>
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
              </WrapItem>
            </Wrap>
            <Wrap>
              <WrapItem>
              <FormControl>
                <FormLabel>Labels</FormLabel>
                <LabelsComponent serverLabels={serverLabels} setServerLabels={setServerLabels} labels={labels} setLabels={setLabels}/>
              </FormControl>
              </WrapItem>

              <WrapItem>
                <FormControl isInvalid={!!errors.description}>
                  <FormLabel htmlFor='description'>{t('description')}</FormLabel>
                  <Input id='description' {...register('description')} />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
              </WrapItem>
            </Wrap>    
            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default AddOperationCard
