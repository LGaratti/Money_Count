import { Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverProps, Container, useColorMode, Tabs, TabList, Tab, TabPanels, TabPanel, Box} from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react';
import { DateRange, TimeUnit, templateDateRange } from '../../interfaces/Date';
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import '../../styles/calendar.css';
import { enUS, it } from 'date-fns/locale';
import { format } from 'date-fns';

interface DateRangeSelectorProps extends PopoverProps {
  dateRangeDisplayed: DateRange,
  setDateRangeDisplayed: Dispatch<SetStateAction<DateRange>>
}

export const DateRangeSelector = ({dateRangeDisplayed,setDateRangeDisplayed,...props}: DateRangeSelectorProps) => {
  const { colorMode } = useColorMode();
  const {t} = useTranslation('ns1',{ i18n } );
  const currentLocale = i18n.language === 'it' ? it : enUS;
  
  const startWeekDate:Date = (new Date());
  const startMonthDate:Date = (new Date());
  const startYearDate:Date = (new Date());

  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const closePopover = () => {
    setPopoverOpen(false);
  };


  const setGeneralDate = (choosenDate:Date, typeOfRange:string) => {
    closePopover();
    let tempEndDate:Date = new Date();
    let tempDateRange: DateRange = templateDateRange;
    
    switch (typeOfRange) {
      case 'week':
        tempEndDate = new Date( choosenDate.getFullYear(), choosenDate.getMonth(), choosenDate.getDate() + 6);
        tempDateRange = {
          nTimeUnit:1,
          timeUnit:TimeUnit.WEEK,
          startDate:choosenDate,
          endDate:tempEndDate,
          rangeDisplayed: format(choosenDate, 'd/M/yy') + ' - ' + format(tempEndDate, 'd/M/yy')
        }
        break;
      case 'month':
        
        break;
      case 'year':
        
        break;
    
      default:
        break;
    }
    console.log(tempDateRange);
    setDateRangeDisplayed(tempDateRange);

  };

  // useEffect( () => {
  //   console.log(startMonthDate);
  //   closePopover();
  // }, [startMonthDate])
  // useEffect( () => {
  //   console.log(startYearDate);
  //   closePopover();
  // }, [startYearDate])

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
        <Popover {...props} isOpen={isPopoverOpen} onClose={closePopover}>
          <PopoverTrigger>
            <Button onClick={() => setPopoverOpen(!isPopoverOpen)} bg={buttonColor()} 
              color={'white'} _hover={{ bg: hoverColor() }}> {t(dateRangeDisplayed.rangeDisplayed)}</Button>
          </PopoverTrigger>
          <PopoverContent overflow={'visible'}  bg={popoverColor()} shadow={'md'}>
            <PopoverArrow bg={popoverColor()}/>
            <PopoverBody>
              <Tabs defaultIndex={1} isFitted colorScheme={'purple'} > {/*variant={'customTabsVariant'} >*/}
                <TabList>
                  <Tab>{t('week')}</Tab>
                  <Tab>{t('month')}</Tab>
                  <Tab>{t('year')}</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <DatePicker
                      locale={currentLocale}
                      selected={startWeekDate}
                      onChange={(date) => date && setGeneralDate(date,'week')}
                      dateFormat="I/R"
                      showWeekNumbers
                      showWeekPicker
                      inline
                      />
                    </Box>    
                  </TabPanel>
                  <TabPanel>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      
                      <DatePicker
                        locale={currentLocale}
                        selected={startMonthDate}
                        onChange={(date) => date && setGeneralDate(date,'month')}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                        inline
                      />
                    </Box> 
                  </TabPanel>
                  <TabPanel>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <DatePicker
                        locale={currentLocale}
                        selected={startYearDate}
                        onChange={(date) => date && setGeneralDate(date,'year')}
                        showYearPicker
                        dateFormat="yyyy"
                        inline
                      />
                    </Box>
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