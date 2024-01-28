import { Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverProps, Container, useColorMode, Tabs, TabList, Tab, TabPanels, TabPanel} from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react';
import { DateRange } from '../../interfaces/Date';
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { Label, Operation } from '../../interfaces/Operation';
// import LabelTag from '../atoms/LabelTag';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DateRangeSelectorProps extends PopoverProps {
  dateRangeDisplayed: DateRange,
  setDateRangeDisplayed: Dispatch<SetStateAction<DateRange>>
}

export const DateRangeSelector = ({dateRangeDisplayed,...props}: DateRangeSelectorProps) => {
  const { colorMode } = useColorMode();
  const {t} = useTranslation('ns1',{ i18n } );

  const [value, onChange] = useState<Value>(new Date());

  const popoverColor = () => {
    if(colorMode === 'light') return 'purple.200'
    else return 'purple.800' 
  }
  
  const hoverColor = () => {
    if(colorMode === 'light') return 'secondary.600'
    else return 'secondary.600' 
  }

  const buttonColor = () => {
    if(colorMode === 'light') return 'secondary.500'
    else return 'secondary.400'
  }
  // line,enclosed, enclosed-colored, soft-rounded, solid-rounded, and unstyled
  return (
    <>
    <Container centerContent padding={2}>
      <Popover {...props}>
        <PopoverTrigger>
          <Button bg={buttonColor()} 
            color={'white'} _hover={{ bg: hoverColor() }}> {t(dateRangeDisplayed.rangeDisplayed)}</Button>
        </PopoverTrigger>
        <PopoverContent bg={popoverColor()}>
          <PopoverArrow bg={popoverColor()}/>
          {/* <PopoverCloseButton /> */}
          {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
          <PopoverBody >
            <Tabs isFitted colorScheme={'purple'} variant={'solid-rounded'}>
              <TabList>
                {/* <Tab>{t('custom range')}</Tab> */}
                <Tab>{t('week')}</Tab>
                <Tab>{t('month')}</Tab>
                <Tab>{t('year')}</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Calendar onChange={onChange} value={value} />
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
                <TabPanel>
                  <p>four!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Container>
    </>
  );
};

export default DateRangeSelector;