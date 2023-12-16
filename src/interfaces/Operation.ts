export interface Operation {
    operation_id: string;
    name: string;
    description: string;
    active: boolean;
    labels: Label[];
    amount: number;
    periodical?: Periodical;
  }
  
  export interface Label {
    label_id: string;
    name: string;
    description: string;
    color_rgb: string; // Formato esadecimale RGB, es: '#FF5733'
  }
  
  export interface Periodical {
    periodical_id: string;
    amount: number;
    unit: TimeUnit;
    firstDate: Date;
    lastDate: Date;
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
  