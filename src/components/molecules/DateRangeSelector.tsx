import { Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverProps, Container, useColorMode, Tabs, TabList, Tab, TabPanels, TabPanel, Box} from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react';
import { DateRange, TimeUnit } from '../../interfaces/Date';
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
  
  const [startDate,setStartDate] = useState<Date>(new Date());
  const [endDate,setEndDate] = useState<Date>(new Date());

  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const closePopover = () => {
    setPopoverOpen(false);
  };


  const setGeneralDate = (choosenDate?:Date, choosenEndDate?:Date,typeOfRange?:TimeUnit) => {
    if(!choosenDate)
      return;
    setStartDate(choosenDate);
    if(choosenEndDate)
      setEndDate(choosenEndDate);
    // eslint-disable-next-line prefer-const
    let tempDateRange: DateRange = dateRangeDisplayed;
    tempDateRange.nTimeUnit = 1;
    tempDateRange.timeUnit = TimeUnit.NONE;
    tempDateRange.startDate = startDate;
    tempDateRange.endDate = endDate;
    tempDateRange.rangeDisplayed = format(startDate, 'd/M/yy') + ' - ' + format(endDate, 'd/M/yy');
    tempDateRange.timeUnit = typeOfRange || TimeUnit.NONE;
    switch (typeOfRange) {
      case 'none':
        if(choosenEndDate)
        {
          setEndDate(choosenEndDate)
          tempDateRange.nTimeUnit = 0;
        }
        break;
      case 'week':
        setEndDate(new Date( choosenDate.getFullYear(), choosenDate.getMonth(), choosenDate.getDate() + 6));
          break;
      case 'month':
        setEndDate(new Date( choosenDate.getFullYear(), choosenDate.getMonth() + 1 , 0));
        tempDateRange.rangeDisplayed = format(startDate, 'MMMM', {locale:currentLocale}) + " " + startDate.getFullYear();
          break;
      case 'year':
        setEndDate(new Date( choosenDate.getFullYear() + 1, choosenDate.getMonth() , 0));
        tempDateRange.rangeDisplayed = format(choosenDate, 'yyyy')
          break;
      //   
      default:
        break;
    }
    if ( endDate !== startDate) {
      setDateRangeDisplayed(tempDateRange);
      closePopover();
    }
    console.log(tempDateRange);
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
                      selected={startDate}
                      onChange={(dates) => setGeneralDate(dates[0] || undefined, dates[1] || undefined, TimeUnit.NONE)}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      inline
                    />
                    </Box>    
                  </TabPanel>
                  <TabPanel>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      
                      <DatePicker
                        locale={currentLocale}
                        selected={startDate}
                        onChange={(date) => date && setGeneralDate(date,undefined,TimeUnit.MONTH)}
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
                        selected={startDate}
                        onChange={(date) => date && setGeneralDate(date,undefined,TimeUnit.YEAR)}
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