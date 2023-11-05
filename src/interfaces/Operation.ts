import { PeriodicOperation } from "./OperationTypes";

export interface Operation {
    id: string;
    title: string;
    active: boolean;
    description: string;
    filters: string[];
    amount: number;
    periodic?: PeriodicOperation;
}

