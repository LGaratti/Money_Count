import { 
  Card, CardBody, Heading, BoxProps, CardHeader, FormControl,
  FormLabel, Input, Button, HStack, NumberInput, NumberInputField,
  NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  Spacer, VStack, Tag, Wrap, WrapItem} from '@chakra-ui/react'
import {  useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import i18n from '../../locales/i18n';
// import { Operation } from '../../interfaces/Operation';

export const AddOperationBox = ({...props}: BoxProps) => {
  // const {t} = useTranslation('ns1',{ i18n } );
  // const formatAmount = (val: string) => val+' €'; 
  // const parseAmount = (val: string) => val.replace(/^€/, '');

  const [_, setAmount] = useState(0);
  const handleAmountChange = (_: string, valueAsNumber: number) => {
    setAmount(valueAsNumber);
  };
//DA SCOMMENTARE
  // const [labels, setLabels] = useState([]);

  // useEffect(() => { 
  //   if (amount < 0) {
  //     setLabels()
  //   }
  // }, [amount]);

  // const { colorMode } = useColorMode();
  return (
    <> 
      <Card {...props}>
        <CardHeader>
          <Heading>Add Operation</Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            <VStack>
              <HStack>
                <FormLabel>Name</FormLabel>
                <Input size={'sm'} type="text" placeholder="Inserisci il nome" />
                <FormLabel>Description</FormLabel>
                <Input type="text" placeholder="Descrizione" />
              </HStack>
              <Spacer/>            
              <HStack>
                <FormLabel>Labels</FormLabel>
                <Wrap>
                  {[...Array(6)].map((_, index) => (
                    <WrapItem key={index}>
                      <Tag>Pippo</Tag>
                    </WrapItem>
                  ))}
                </Wrap>
                <FormLabel>Amount</FormLabel>
                <NumberInput precision={2} onChange={handleAmountChange}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </VStack>
            <Button colorScheme="green" mt={4}>Aggiungi</Button>
          </FormControl>
        </CardBody>
      </Card>
    </>
  )
}

export default AddOperationBox