export interface Operation {
    operation_id: string;
    name: string;
    description: string;
    amount: number;
    first_date: Date;
    periodic_count?: number;
    periodic_unit?: TimeUnit;
    last_date?: Date;
    labels: Label[];
  }
  
  export interface Label {
    label_id: string;
    name: string;
    description: string;
    color_rgb: string; // Formato esadecimale RGB, es: '#FF5733'
  }
  
  export enum TimeUnit {
    DAY = "day",
    WEEK = "week",
    MONTH = "month",
    YEAR = "year",
  }
  
  export interface OperationsAction {
    type: 'add' | 'init' | 'remove' | 'modify';
    payload:  Operation[];
  }
  