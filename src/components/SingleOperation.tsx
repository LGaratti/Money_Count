import React, { useState, useRef, useEffect } from "react";
import { MdClear, MdModeEdit } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "../style/Operation.css";
// import "../style/InputField.css";
import { Operation } from "../interfaces/Operation";
import { OperationsAction } from "../interfaces/OperationTypes";

interface Props {
  operation: Operation;
  operationArrayReducer: React.Dispatch<OperationsAction>;
}

/*
	SingleOperation è una funzione che restituisce un elemento JSX (in questo caso, un form con un testo ( o un input di testo ) e 3 pulsanti).
	In questo componente specifico, SingleOperation ha tre Props principali:
		- operation: l'operazione.
		- operationArrayReducer: funzione che chiamata durante invio del form.  Modifica operationArray
*/

export const SingleOperation = ({ operation, operationArrayReducer }: Props) => {

  // Hook per l'abilitazione/disabilitazione della schermata edit
  const [edit, setEdit] = useState<boolean>(false); // se edit è a true

  // Hook per il cambio del titolo dell'operation 
  const [editTitle, setEditTitle] = useState<string>(operation.title);

  // Hook useRef per mettere il focus sull'operation_title-text input quando edit è true
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [edit]); 

  // Funzione che invia i dati contenuti nel form
  const submitForm = () => {
    const updatedOperation: Operation = { ...operation, title: editTitle };
    // TODO aggiornamento e controllo di tutti i valori inseriti nel form
    operationArrayReducer({
      type: 'modify',
      payload: [updatedOperation]
    })
    setEdit(false);
  };

  // Event handler per la gestione del bottone Edit
  const handleEditClick = () => {
    // se sta editando invia il form
    if(edit){
      setTimeout(() => {
        submitForm();
      }, 0);
    }
    // Apre l'edit
    else setEdit(true); 
  };
  
  const deleteOperation = () => {
    operationArrayReducer({
        type: 'remove',
        payload: [operation]
    })
  };

  const toggleOperationActiveVal = () => {
    const updatedOperation = { ...operation, active: !operation.active };
    operationArrayReducer({
        type: 'modify',
        payload: [updatedOperation]
    })
    // operationArrayReducer( operationArray.map((t) => t.id === id ? { ...operation, active: !t.active } : t));
  };

  return (

    <form className="single_operation" onSubmit={(e) => { 
        e.preventDefault(); 
        submitForm();  
      }}>
      {/* Se edit è true crea l'input, altrimenti crea span */}
      {
        edit ? ( <input className="operation_title--text" ref={inputRef} value = {editTitle} onChange={(e) => setEditTitle(e.target.value)} /> ) 
             : ( <span className="operation_title--text"> {operation.title} </span> )
      }
      
      <div className="operation__icons">
        <span className="icon" onClick={handleEditClick} >
          <MdModeEdit />
        </span>
        <span className="icon" onClick={() => deleteOperation()} >
          <MdClear />
        </span>
        {/* Se operation.active è true, mostra IoMdEyeOff, altrimenti mostra IoMdEye */}
        {
          operation.active ? (
            <span className="icon" onClick={() => toggleOperationActiveVal()} >
              <IoMdEyeOff />
            </span>
          ) : (
            <span className="icon" onClick={() => toggleOperationActiveVal()} >
              <IoMdEye />
            </span>
          )
        }
      </div>
    </form>
  );
};

export default SingleOperation;