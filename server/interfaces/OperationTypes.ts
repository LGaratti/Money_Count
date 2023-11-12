import { Operation } from "./Operation";
export interface PeriodicOperation {
  amount: number;
  unit: TimeUnit;
	lastDate: Date;
	firstDate: Date;
}
// function createPeriodicOperation():
// {
// 	
// }
export enum TimeUnit {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export interface OperationsAction {
  type: 'add' | 'addMore' | 'remove' | 'modify';
  payload:  Operation[];
}
