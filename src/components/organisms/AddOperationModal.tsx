import { Modal, ModalBody, ModalHeader, FormControl, FormLabel, Input, Button, NumberInput, NumberInputField,
  NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormErrorMessage, Textarea, Select, Grid, GridItem,
  ModalProps,
  ModalContent,
  ModalOverlay,
  useSteps,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  Box,
  StepTitle,
  StepDescription,
  StepSeparator,
  ModalFooter } from '@chakra-ui/react'
import {  useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { Label, Operation } from '../../interfaces/Operation';
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
import LabelsComponent from '../molecules/LabelsComponent';
import { InsertOpFromServer, fetchLabelsFromServer } from '../../utils/supabaseClient';
import { FaEuroSign } from 'react-icons/fa';
import { TimeUnit } from '../../interfaces/Date';

export const AddOperationModal = ({...props}:ModalProps) => {
  const {t} = useTranslation('ns1',{ i18n } );
  const [serverLabels, setServerLabels] = useState<Label[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [amount, setAmount] = useState(0);
  const [periodic_unit, setPeriodic_unit] = useState<TimeUnit>();

  useEffect(() => {
    let tempLabels = [...labels];
    tempLabels = tempLabels.filter(label => label.name !== 'gain' && label.name !== 'loss');
  
    if (Number(amount) < 0) {
      // Aggiungi 'loss' se non è già presente
      const lossLabel = serverLabels.find(label => label.name === 'loss');
      if (lossLabel) {
        tempLabels.push(lossLabel);
      }
    } else {
      // Aggiungi 'gain' se non è già presente e l'importo non è zero
      if(Number(amount) > 0) {
        const gainLabel = serverLabels.find(label => label.name === 'gain');
        if (gainLabel) {
          tempLabels.push(gainLabel);
        }
      }
    }
    const sortedLabels = tempLabels.sort((n1, n2) => Number(n1.label_id) - Number(n2.label_id));
    setLabels(sortedLabels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  useEffect(() => { 
    fetchLabelsFromServer(setServerLabels);
  },[]);

  const {
    handleSubmit,
    register,
    // formState: { errors, isSubmitting },
    formState: { errors },
  } = useForm<Operation>();

  const onSubmit: SubmitHandler<Operation> = (data) => {
    data.labels = labels;
    data.first_date;
    if(data?.periodic_unit === 'none')
      data.periodic_unit = undefined;
    InsertOpFromServer(data);
  };

  const handlePeriodicUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as TimeUnit;
    setPeriodic_unit(value);
  };

  const handleAmountChange = (_: string, valueAsNumber: number) => {
    setAmount(valueAsNumber);
  };

  const steps = [
    {title:"first step", description: "operation info"},
    {title:"second step", description: "temporal info"}
  ];

  const { activeStep,setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  const handleStep = (increase:boolean) => {
    const nextStep = increase ? activeStep + 1 : activeStep - 1;
    
    // Verifica se il prossimo step è all'interno dei limiti degli step definiti
    if (nextStep >= 0 && nextStep <= 1) {
      setActiveStep(nextStep);
    }
  }

  return (
    <> 
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t('add operation')}
          </ModalHeader>
          <ModalBody>
            <Stepper index={activeStep} colorScheme='purple'>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink='0'>
                      <StepTitle>{t(step.title)}</StepTitle>
                      <StepDescription>{t(step.description)}</StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
            </Stepper>
            <form onSubmit={handleSubmit(onSubmit)}>
              
              { activeStep == 0 ?
                (
                  <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)'gap={4}>
                    <GridItem>
                      <FormControl isInvalid={!!errors.name}>
                        <FormLabel htmlFor='name'>{t('name')}</FormLabel>
                        <Input size={'sm'} id='name' {...register('name', { required: t('required field') })} />
                        <FormErrorMessage>
                          {errors.name && errors.name.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={!!errors.amount}>
                        <FormLabel htmlFor='amount'>{t('amount')}</FormLabel>
                          <NumberInput size={'sm'} id='amount' precision={2} min={-9999.99} max={9999.99} onChange={handleAmountChange}>
                            <NumberInputField pattern="(-)?[0-9]*(.[0-9]+)?" {...register('amount', {
                              valueAsNumber: true,
                              required: t('required field'),
                              validate: value => value !== 0 || t('amount equal to 0')
                            })} />
                            <NumberInputStepper top={'calc(100% - 1.5rem )'}>
                              <FaEuroSign/>
                            </NumberInputStepper>
                          </NumberInput>
                        <FormErrorMessage>
                          {errors.amount && errors.amount.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                    <FormControl>
                      <FormLabel htmlFor='labels'>{t('labels')}</FormLabel>
                      <LabelsComponent serverLabels={serverLabels} setServerLabels={setServerLabels} labels={labels} setLabels={setLabels} {...register('labels')}/>
                    </FormControl>
                  </GridItem>
                    <GridItem colSpan={3}>
                      <FormControl isInvalid={!!errors.description}>
                        <FormLabel htmlFor='description'>{t('description')}</FormLabel>
                        <Textarea id='description' {...register('description')}></Textarea>
                        <FormErrorMessage>
                          {errors.description && errors.description.message}
                        </FormErrorMessage>
                    </FormControl>

                    </GridItem>
                  </Grid>
                ) : (
                  <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(2, 1fr)'gap={4}>
                    <GridItem>
                      <FormControl isInvalid={!!errors.first_date}>
                        <FormLabel htmlFor='first_date'>{t('date')}</FormLabel>
                        <Input
                          id='first_date'
                          placeholder="Select Date and Time"
                          size={'sm'}
                          type="date"
                          {...register('first_date', { required: t('required field') })}
                        />
                        <FormErrorMessage>
                          {errors.first_date && errors.first_date.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={!!errors.periodic_unit}>
                        <FormLabel htmlFor='periodic_unit'>{t('recurrence')}</FormLabel>
                        <Select size={'sm'} id='periodic_unit' {...register('periodic_unit')} onChange={handlePeriodicUnitChange} >
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
                    <GridItem>
                      {periodic_unit && periodic_unit !== 'none' && (
                      <FormControl isInvalid={!!errors.periodic_count}>
                        <FormLabel htmlFor='periodic_count'>{t('recurrence count')}</FormLabel>
                        <NumberInput defaultValue={0} id='periodic_count' size={'sm'}>
                          <NumberInputField {...register('periodic_count', { valueAsNumber: true, required: t('required field') })} />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>
                          {errors.periodic_count && errors.periodic_count.message}
                        </FormErrorMessage>
                      </FormControl>
                      )}
                    </GridItem>
                  </Grid>
                )
              }              
            </form>
          </ModalBody>
          <ModalFooter display={'flex'} justifyContent="space-between">
          {/* <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'> Add </Button> */}
          {
            activeStep < 1 ? (
              <>
                <Box></Box>
                <Button onClick={() => handleStep(true)}>{t('next')}</Button>
              </>
            ) : (
              <>
                <Button onClick={() => handleStep(false)}>{t('previous')}</Button>
                <Button colorScheme='green' type='submit'>{t('add')}</Button>
              </>
            )
          }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddOperationModal