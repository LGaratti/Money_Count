import { Label, Operation } from "./Operation"

export interface OperationLabel {
  operation:Operation,
  label:Label
}

export interface LabelFromServer {
  label:Label
}
