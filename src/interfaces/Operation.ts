export interface Operation {
  operation_id: string;
  name: string;
  description?: string;
  amount: number;
  first_date: Date;
  last_date?: Date;
  periodic_count?: number;
  periodic_unit?: TimeUnit;
  payday?: PayDay[];
  labels: Label[];
}

export interface Label {
  label_id: string;
  name: string;
  description?: string;
  color_rgb: string;
}

export interface OperationsForDate {
  date: Date;
  operations_id: string[];
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

export interface OperationsAction {
  type: 'add' | 'init' | 'remove' | 'modify';
  payload:  Operation[];
}
  