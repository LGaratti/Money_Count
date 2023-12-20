import { Card, CardBody, Heading, BoxProps, CardHeader, FormControl, FormLabel, Input, Button, HStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Spacer, VStack, Box} from '@chakra-ui/react'
import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import i18n from '../../locales/i18n';
// import { Operation } from '../../interfaces/Operation';

export const AddOperationBox = ({...props}: BoxProps) => {
  // const {t} = useTranslation('ns1',{ i18n } );
  const formatAmount = (val: string) => val+' €'; 
  const parseAmount = (val: string) => val.replace(/^€/, '');
  const [amount, setAmount] = useState('');

//DA SCOMMENTARE
//   const [labels, setLabels] = useState([]);
// 
//   useEffect(() => { 
//     const amountValue = parseFloat(amount);
//     if (amountValue < 0) {
//       setLabels()
//     }
//   }, [amount]);

  // const { colorMode } = useColorMode();
  return (
    <> 
    <Card  {...props}>
      <CardHeader>
        <Heading>Add Operation</Heading>
      </CardHeader>
      <CardBody>
        <FormControl>
          <VStack>
            <HStack>
              <VStack>
                <FormLabel>name</FormLabel>
                <Input type="text" placeholder="Inserisci il nome" />
              </VStack>
              <VStack>
                <FormLabel>description</FormLabel>
                <Input type="text" placeholder="Descrizione" />
              </VStack>
              <VStack>
                <FormLabel>amount</FormLabel>
                <NumberInput precision={2}
                  onChange={(valueString) => setAmount(parseAmount(valueString))}
                  value={formatAmount(amount)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </VStack>
            </HStack>

            <Spacer/>
            
            <HStack>
              <VStack>
                <FormLabel>labels</FormLabel>
                <Box>
                  <HStack></HStack>
                </Box>
              </VStack>
              <VStack>
                <FormLabel>Descrizione</FormLabel>
                <Input type="text" placeholder="Descrizione" />
              </VStack>
              <VStack>
                <FormLabel>Ammontare</FormLabel>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </VStack>
            </HStack>
          </VStack>
          
          {/* Qui inserisci il componente DatePicker */}
          <Button colorScheme="green" mt={4}>Aggiungi</Button>
        </FormControl>
      </CardBody>
    </Card>
    </>
  )
}

export default AddOperationBox