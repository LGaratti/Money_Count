import { Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverProps, Container, useColorMode, Tabs, TabList, Tab, TabPanels, TabPanel, Box} from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react';
import { DateRange } from '../../interfaces/Date';
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
// import {
//   Calendar,
//   CalendarControls,
//   CalendarDays,
//   CalendarMonth,
//   CalendarMonthName,
//   CalendarMonths,
//   CalendarNextButton,
//   CalendarPrevButton,
//   CalendarValues,
//   CalendarDate,
//   CalendarWeek,
//   // CalendarDefaultTheme
// } from "@uselessdev/datepicker";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// import 'react-calendar/dist/Calendar.css';
// import { Label, Operation } from '../../interfaces/Operation';
// import LabelTag from '../atoms/LabelTag';
// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DateRangeSelectorProps extends PopoverProps {
  dateRangeDisplayed: DateRange,
  setDateRangeDisplayed: Dispatch<SetStateAction<DateRange>>
}

export const DateRangeSelector = ({dateRangeDisplayed,...props}: DateRangeSelectorProps) => {
  const { colorMode } = useColorMode();
  const {t} = useTranslation('ns1',{ i18n } );

  // const [dates, setDates] = useState<CalendarValues>({});
  const [startDate, setStartDate] = useState(new Date());
  // const handleDateSelect = (value: CalendarValues | CalendarDate) => {
  //   if (typeof value === 'number') {
  //     // Il valore è un CalendarDate (timestamp), quindi convertilo in Date
  //     const dateValue = new Date(value);
  //     // Imposta questo valore Date come sia l'inizio che la fine
  //     const newDates: CalendarValues = { start: dateValue, end: dateValue };
  //     setDates(newDates);
  //   } else if(value instanceof Date) {
  //     // Il valore è già CalendarValues, quindi può essere passato direttamente
  //   } else
  //     setDates(value);
  // };
  
  // useEffect(() => {
  //   console.log(dates);
  // },[dates])

  

  const popoverColor = () => {
    if(colorMode === 'light') return 'purple.100'
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

  return (
    <>
    
      <Container centerContent padding={2}>
        <Popover {...props}>
          <PopoverTrigger>
            <Button bg={buttonColor()} 
              color={'white'} _hover={{ bg: hoverColor() }}> {t(dateRangeDisplayed.rangeDisplayed)}</Button>
          </PopoverTrigger>
          <PopoverContent overflow={'visible'}  bg={popoverColor()}>
            <PopoverArrow bg={popoverColor()}/>
            {/* <PopoverCloseButton /> */}
            {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
            <PopoverBody>
              <Tabs defaultIndex={1} isFitted colorScheme={'purple'} variant={'solid-rounded'}>
                <TabList>
                  <Tab>{t('week')}</Tab>
                  <Tab>{t('month')}</Tab>
                  <Tab>{t('year')}</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    {/* <Calendar weekStartsOn={1} value={dates} onSelectDate={handleDateSelect} allowOutsideDays weekDateSelection>
                      <CalendarControls>
                        <CalendarPrevButton />
                        <CalendarNextButton />
                      </CalendarControls>
                      <CalendarMonths>
                        <CalendarMonth>
                          <CalendarMonthName />
                          <CalendarWeek />
                          <CalendarDays />
                        </CalendarMonth>
                      </CalendarMonths>
                    </Calendar> */}
                    <DatePicker
                    selected={startDate}
                    onChange={(date) => date && setStartDate(date)}
                    dateFormat="I/R"
                    locale="en-GB"
                    showWeekNumbers
                    showWeekPicker
                    inline
                    />
                  </Box>    
                  </TabPanel>
                  <TabPanel>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => date && setStartDate(date)}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      showFullMonthYearPicker
                      inline
                    />
                  </Box> 
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