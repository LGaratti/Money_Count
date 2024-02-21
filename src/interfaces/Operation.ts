import { PayDay, TimeUnit } from "./Date";

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

export interface OperationsAction {
  type: 'add' | 'init' | 'remove' | 'modify';
  payload:  Operation[];
}
  