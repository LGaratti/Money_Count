import "../style/OperationList.css";
import { SingleOperation } from "./SingleOperation";
import { Operation } from "../interfaces/Operation";
import { OperationsAction } from "../interfaces/OperationTypes";
import { Droppable } from "react-beautiful-dnd";

/*
	OperationList è una funzione che restituisce un React FunctionComponent con 2 parametri in ingresso che sono:
		- operationArray: array di operazioni
		- operationArrayReducer: funzione per modificare l'array
    - inactiveOpArray
    - inactiveOpArrayReducer
*/

interface Props {
  activeOpArray: Operation[];
  activeOpArrayReducer: React.Dispatch<OperationsAction>;
  inactiveOpArray: Operation[];
  inactiveOpArrayReducer: React.Dispatch<OperationsAction>;
}
const OperationsList: React.FC<Props> = ({
  activeOpArray,
  activeOpArrayReducer,
  inactiveOpArray,
  inactiveOpArrayReducer,
}: Props) => {
  
  return (

    <div className="container">
      <Droppable droppableId="ActiveOpsList">
        {(provided) => (
          <div className="active" ref={provided.innerRef} {...provided.droppableProps}> 
            <span className="active__heading"> Active Operations </span>
            {activeOpArray.map((operation,index) => (
              <SingleOperation
                index={index}          
                key={operation.id}
                operation={operation}
                operationArrayReducer={activeOpArrayReducer}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="InactiveOpsList">
        {(provided) => (
          <div className="inactive" ref={provided.innerRef} {...provided.droppableProps}> 
            <span className="inactive__heading">Inactive Operations</span>
            {inactiveOpArray.map((operation, index) => (
              <SingleOperation           
                index={index}
                key={operation.id}
                operation={operation}
                operationArrayReducer={inactiveOpArrayReducer}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default OperationsList;
