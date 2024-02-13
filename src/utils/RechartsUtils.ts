import { addDays, differenceInCalendarDays, eachMonthOfInterval, eachWeekOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import { DateRange } from "../interfaces/Date";
import { OperationsForDate } from "../interfaces/Operation";

export interface BarCharSegment {
  gain:number;
  loss:number;
  name: string;
  startDate:Date;
  endDate:Date;
  operationsForDate: OperationsForDate[]
} 

export const calculateSegments = (currentLocale:Locale, dateRangeDisplayed:DateRange) => {

  const segmentDaysKey = (opDate:Date, endDate:Date, formatStyle:string ) => {
    if(opDate === endDate) {
      return `${format(opDate, formatStyle,{locale:currentLocale})}`;
    }
    else {
      const averageDate = new Date((opDate.getTime() + endDate.getTime()) / 2);
      return `${format(averageDate, formatStyle,{locale:currentLocale})}`;
    }
  }

  const segmentConstructor = (nameTemp:string,startDateTemp:Date,endDateTemp:Date) => {
    return {
      gain:0,
      loss:0,
      name:nameTemp,
      startDate:startDateTemp,
      endDate:endDateTemp,
      operationsForDate: [],
    }
  };
  
  const startDate = new Date(dateRangeDisplayed.startDate);
  const endDate = dateRangeDisplayed.endDate ? new Date(dateRangeDisplayed.endDate) : addDays(new Date(), -30);
  const totalDays = differenceInCalendarDays(endDate, startDate);
  
  const segmentsTemp: BarCharSegment[] = [];

  let segmentSize:number = 1;
  let formatStyle = endDate.getFullYear() !== startDate.getFullYear() ? "d/M/yy" : "d/M";

  switch (dateRangeDisplayed.timeUnit) {
    case 'none': {
      if(totalDays > 10 && totalDays <= 15) segmentSize = 2;
      else if(totalDays > 15 && totalDays<= 29) segmentSize = 4;
      else if(totalDays > 29 && totalDays<= 40) segmentSize = 5;
      else if(totalDays > 40 && totalDays <= 63)  segmentSize = 7;
      else if(totalDays > 63 && totalDays <= 126) segmentSize = 14;
      else if(totalDays > 126 && totalDays <= 270)  segmentSize = 30;
      else if(totalDays > 270 && totalDays <= 540)  segmentSize = 60;
      else if(totalDays > 540 && totalDays <= 1080) segmentSize = 120;
      else if(totalDays > 1080) segmentSize = 180;
    } break;

    case 'week': {
      // const totalDays = differenceInCalendarDays(endDate,startDate);
      segmentSize = dateRangeDisplayed.nTimeUnit;
      if(segmentSize === 1)
        formatStyle = "EEE"      
    } break;
    
    case 'month': {
      if (dateRangeDisplayed.nTimeUnit === 1) {
        const monthStart = startOfMonth(startDate);
        const monthEnd = endOfMonth(endDate);
        const weeks = eachWeekOfInterval({ start: monthStart, end: monthEnd }, { weekStartsOn: 1 }); // Considerando il lunedì come primo giorno della settimana
        weeks.forEach((weekStart,index) => {
          let weekEnd = addDays(weekStart, 6);
          weekEnd = weekEnd > endDate ? endDate : weekEnd; // Assicurati che non superi la data di fine
          const weekNumber = index + 1;
          const nameTemp = `Week ${weekNumber}`; // Questo sostituisce la chiamata a segmentDaysKey per questo caso specifico
          const segmentTemp: BarCharSegment = segmentConstructor(nameTemp, weekStart, weekEnd);
          segmentsTemp.push(segmentTemp);
        });
        return segmentsTemp;
      }
      else { // TOVERIFY
        formatStyle = "MM/yy";
        segmentSize = 7 * dateRangeDisplayed.nTimeUnit; // <--------------------------------------------------------------------------------------TODO ARRIVATO FINO A QUA----------------------------------------------------------------- 
      }
    } break;
      
    case 'year':{
      if (dateRangeDisplayed.nTimeUnit === 1) {
        const months = eachMonthOfInterval({ start: startDate, end: endDate });
        months.forEach((monthStart) => {
          const monthEnd = endOfMonth(monthStart);
          const nameTemp = format(monthStart, "MMM yyyy", { locale: currentLocale });
          const segmentTemp = segmentConstructor(nameTemp, monthStart, monthEnd > endDate ? endDate : monthEnd);
          segmentsTemp.push(segmentTemp);
        });
        return segmentsTemp;
      }
      else { // TOVERIFY
        formatStyle = "MM/yy";
        segmentSize = 30 * dateRangeDisplayed.nTimeUnit; // <--------------------------------------------------------------------------------------TODO ARRIVATO FINO A QUA----------------------------------------------------------------- 
      }
    } break;
  
    default:
      break;
  }

  for (let i = 0; i < totalDays; i+=segmentSize) {
    const startDateTemp = addDays(startDate,i);
    let endDateTemp = addDays(startDateTemp, segmentSize - 1);
    endDateTemp = endDateTemp > endDate ? endDate : endDateTemp;
    const nameTemp = segmentDaysKey(startDateTemp,endDateTemp,formatStyle);
    const segmentTemp: BarCharSegment = segmentConstructor(nameTemp, startDateTemp, endDateTemp);
    segmentsTemp.push(segmentTemp); 
  }
  return segmentsTemp;
}
