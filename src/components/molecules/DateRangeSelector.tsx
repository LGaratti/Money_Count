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

export const DateRangeSelector = ({dateRangeDisplayed , setDateRangeDisplayed, ...props}: DateRangeSelectorProps) => {
  const { colorMode } = useColorMode();
  const {t} = useTranslation('ns1',{ i18n } );
  const currentLocale = i18n.language === 'it' ? it : enUS;
  
  const [startDate,setStartDate] = useState<Date>();
  const [endDate,setEndDate] = useState<Date>();
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [, setTabIndex] = useState(0)

  const closePopover = () => {
    setPopoverOpen(false);
  };


  const setGeneralDate = (choosenDate?:Date, choosenEndDate?:Date,typeOfRange?:TimeUnit) => {
    if(choosenDate)
      setStartDate(choosenDate);
    else return;
    setEndDate(choosenEndDate);
    
    const tempDateRange: DateRange = { ...dateRangeDisplayed };
    tempDateRange.timeUnit = typeOfRange || TimeUnit.NONE;
    tempDateRange.startDate = choosenDate;
    tempDateRange.nTimeUnit = 0;

    switch (typeOfRange) {
      case 'none':
        if(choosenEndDate) {
          tempDateRange.nTimeUnit = 0;
          tempDateRange.rangeDisplayed = format(choosenDate, 'd/M/yy') + ' - ' + format(choosenEndDate, 'd/M/yy');
          tempDateRange.endDate = new Date( choosenEndDate.getFullYear(), choosenEndDate.getMonth(), choosenEndDate.getDate(), 23,59,59);
        }
        else return;
        break;
      case 'week': {
          const tempEndDate: Date = new Date( choosenDate.getFullYear(), choosenDate.getMonth(), choosenDate.getDate() + 6, 23,59,59);
          tempDateRange.timeUnit = TimeUnit.WEEK;
          tempDateRange.nTimeUnit = 1;
          tempDateRange.rangeDisplayed = format(choosenDate, 'd/M/yy') + ' - ' + format(tempEndDate, 'd/M/yy');
          tempDateRange.endDate = tempEndDate;
          setEndDate(tempEndDate);
        }  
        break;
      case 'month': {
        const tempEndDate: Date = new Date( choosenDate.getFullYear(), choosenDate.getMonth() + 1 , 0, 23, 59, 59)
        tempDateRange.timeUnit = TimeUnit.MONTH;
        tempDateRange.nTimeUnit = 1;
        tempDateRange.rangeDisplayed = format(choosenDate, 'MMMM', {locale:currentLocale}) + " " + choosenDate.getFullYear();
        tempDateRange.endDate = tempEndDate;
        setEndDate(tempEndDate);
      }
        break;
      case 'year': {
        const tempEndDate: Date = new Date( choosenDate.getFullYear() + 1, choosenDate.getMonth(), 0, 23, 59, 59);
        tempDateRange.timeUnit = TimeUnit.YEAR;
        tempDateRange.nTimeUnit = 1;
        tempDateRange.rangeDisplayed = format(choosenDate, 'yyyy');
        tempDateRange.endDate = tempEndDate;
        setEndDate(tempEndDate);
      }
          break;
      //   
      default:
        break;
    }
    if( choosenEndDate )
      tempDateRange.rangeDisplayed = format(choosenDate, 'd/M/yy') + ' - ' + format(choosenEndDate, 'd/M/yy');
    setDateRangeDisplayed(tempDateRange);
    closePopover();
  };

  const resetDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  } 

  const popoverColor = () => (colorMode === 'light' ? 'secondary.100' : 'purple.800');
  const hoverColor = () => ('secondary.600');
  const buttonColor = () => (colorMode === 'light' ? 'secondary.500' : 'secondary.400');

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
              <Tabs defaultIndex={1} isFitted colorScheme={'purple'} onChange={(index) => {
                setTabIndex(index)
                resetDates();
              }}> {/*variant={'customTabsVariant'} >*/}
                <TabList>
                  <Tab>{t('range')}</Tab>
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
                      disabledKeyboardNavigation
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
                        disabledKeyboardNavigation
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
                        disabledKeyboardNavigation
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