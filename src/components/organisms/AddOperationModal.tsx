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
import {  useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { Label, Operation } from '../../interfaces/Operation';
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
import LabelsComponent from '../molecules/LabelsComponent';
import { fetchLabelsFromServerFastify } from '../../utils/ServerUtils';
import { FaEuroSign } from 'react-icons/fa';
import { TimeUnit } from '../../interfaces/Date';

export const AddOperationModal = ({onClose,...props}:ModalProps) => {
  const {t} = useTranslation('ns1',{ i18n } );
  const [serverLabels, setServerLabels] = useState<Label[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [amount, setAmount] = useState(0);
  const [periodic_unit, setPeriodic_unit] = useState<TimeUnit>();

  // Labels updated from server at first render
  useEffect(() => { 
    fetchLabelsFromServerFastify(setServerLabels);
  },[]);

  // gain and loss label assigned due to amount sign
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

  const handlePeriodicUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as TimeUnit;
    setPeriodic_unit(value);
  };

  const handleAmountChange = (_: string, valueAsNumber: number) => {
    setAmount(valueAsNumber);
  };

  // Form Handling
  // Stato per mantenere i dati del primo step
  const [stepOneData, setStepOneData] = useState({});
  const formStep1Ref = useRef<HTMLFormElement>(null);
  const formStep2Ref = useRef<HTMLFormElement>(null); 


  const {
    handleSubmit,
    register,
    // formState: { errors, isSubmitting },
    formState: { errors },
    reset,
  } = useForm<Operation>();

  // Gestione del submit per il primo form
  const onSubmitStep1: SubmitHandler<Operation> = (data) => {
    data.labels = labels;
    // Salva i dati del primo step nello stato
    console.log(data)
    setStepOneData(data);
    // Passa al prossimo step
    handleStep(true);
  };

  // OLD
  // const onSubmitStep2: SubmitHandler<Operation> = (data) => {
  //   data.labels = labels;
  //   data.first_date;
  //   if(data?.periodic_unit === 'none')
  //     data.periodic_unit = undefined;
  //   InsertOpFromServer(data);
  // };
  const onSubmitStep2: SubmitHandler<Operation> = (data) => {
    // Combina i dati del primo e secondo step
    const finalData = {
      ...stepOneData,
      ...data,
      labels,
      first_date: data.first_date,
      periodic_unit: data?.periodic_unit === 'none' ? undefined : data.periodic_unit,
    };
  
    console.log("SPARATOOOOOOOOO", finalData);
    // Inserimento dei dati combinati al server TODO DA SCOMMENTARE
    // InsertOpFromServer(finalData);
    onClose();
  };

  // Step Handling
  const steps = [
    {title:"first step", description: "operation info"},
    {title:"second step", description: "temporal info"}
  ];

  const { activeStep,setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  // Modifica la funzione handleStep per accettare una funzione callback opzionale
  const handleStep = (increase: boolean, callback?: () => void) => {
    const nextStep = increase ? activeStep + 1 : activeStep - 1;
    
    if (nextStep >= 0 && nextStep < steps.length) {
      setActiveStep(nextStep);
      if (callback) callback(); // Esegui la callback se presente
    }
  };

  // Quando l'utente clicca su "Next" nel primo step
  const handleNextClick = () => {
    if (formStep1Ref.current) {
      // Questo simula un evento di submit sul form del primo step // TODO cercare cancelable e bubbles
      formStep1Ref.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  // Funzione per resettare lo stato del form
  const resetFormState = () => {
    setLabels([]);       
    // setAmount(0);
    setPeriodic_unit(undefined);
    // setStepOneData({});
    setActiveStep(0);
    reset({
      name: '', // Assicurati di includere tutti i campi del tuo form qui
      amount: 0,
      labels: [],
      description: '',
      first_date: undefined,
      periodic_unit: undefined, // o qualsiasi valore iniziale appropriato
      periodic_count: 0, // o qualsiasi valore iniziale appropriato
      // ...qualsiasi altro campo che necessita di essere resettato
    });
  };

  const handleClose = () => {
    resetFormState();
    onClose();
  }


  return (
    <> 
      <Modal onClose={handleClose} {...props} >
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
            {/* OLD <form onSubmit={handleSubmit(onSubmitStep2)}> */}
              
              { activeStep == 0 ?
                (
                  <form key="step1" ref={formStep1Ref} onSubmit={handleSubmit(onSubmitStep1)}>
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
                  </form>
                ) : (
                  <form key="step2" ref={formStep2Ref} onSubmit={handleSubmit(onSubmitStep2)}>
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
                  </form>
                )
              }              
          </ModalBody>
          <ModalFooter display={'flex'} justifyContent="space-between">
          {
            activeStep < 1 ? (
              <>
                <Box></Box>
                <Button onClick={handleNextClick}>{t('next')}</Button>
              </>
            ) : (
              <>
                <Button onClick={() => handleStep(false)}>{t('previous')}</Button>
                <Button colorScheme='green' onClick={() => {
                  if (formStep2Ref && formStep2Ref.current) {
                    // Questo simula un evento di submit sul form del secondo step
                    formStep2Ref.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                  }
                }}>{t('add')}</Button>
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