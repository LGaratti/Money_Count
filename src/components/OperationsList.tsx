import React from "react";

import "../style/OperationList.css";
import { SingleOperation } from "./SingleOperation";
import { Operation } from "../interfaces/Operation";
import { OperationsAction } from "../interfaces/OperationTypes";

/*
	OperationList è una funzione che restituisce un React FunctionComponent con 2 parametri in ingresso che sono:
		- operationArray: array di operazioni
		- operationArrayReducer: funzione per modificare l'array
*/

interface Props {
  operationArray: Operation[];
  operationArrayReducer: React.Dispatch<OperationsAction>;
}
const OperationsList: React.FC<Props> = ({
  operationArray,
  operationArrayReducer,
}: Props) => {
  return (

    <div className="container">
      <div className="active">
        <span className="active__heading"> Active Operations </span>
        {operationArray.filter(t => t.active).map((operation) => (
          <SingleOperation           
            key={operation.id}
            operation={operation}
            operationArrayReducer={operationArrayReducer}
          />
        ))}
      </div>
      <div className="inactive">
        <span className="inactive__heading">Inactive Operations</span>
        {operationArray.filter(t => !t.active).map((operation) => (
          <SingleOperation           
            key={operation.id}
            operation={operation}
            operationArrayReducer={operationArrayReducer}
          />
        ))}
      </div>
    </div>
  );
};

export default OperationsList;
