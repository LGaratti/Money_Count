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
  
  export interface OperationsAction {
    type: 'add' | 'init' | 'remove' | 'modify';
    payload:  Operation[];
  }
  