

export interface DateRange{
  rangeDisplayed: string;
  startDate:Date;
  timeUnit:TimeUnit;
  nTimeUnit:number;
}

export enum TimeUnit {
  NONE = "none",
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export enum PayDay {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
  SUNDAY = "sunday"
}

export const dayOfWeekMap: { [key: string]: PayDay } = {
  '0': PayDay.SUNDAY,
  '1': PayDay.MONDAY,
  '2': PayDay.TUESDAY,
  '3': PayDay.WEDNESDAY,
  '4': PayDay.THURSDAY,
  '5': PayDay.FRIDAY,
  '6': PayDay.SATURDAY
};