import React, { useRef } from 'react'
import '../style/InputField.css';

/*
	InputField è Funzione che restituisce un elemento JSX (in questo caso, un form con un campo di input e un pulsante).
	In questo componente specifico, InputField ha tre Props principali:
		- operationName: stringa che rappresenta il valore attuale dell'input field.
		- setOperationName: funzione che aggiorna il valore di operationName al nuovo valore dell'input.
		- checkAndAddOperation: funzione che chiamata durante invio del form.  Aggiunge operation ad operationArray
*/

// Props sono gli argomenti richiesti dalla funzione InputField
interface Props {
	operationName: string; 
	setOperationName: React.Dispatch<React.SetStateAction<string>>
	checkAndAddOperation: (e: React.FormEvent) => void; 
}

const InputField = ({ operationName, setOperationName, checkAndAddOperation }: Props) => {
	//hook useRef per togliere il blur 
	const inputRef = useRef<HTMLInputElement>(null); // HTMLInputElement perchè è il tipo di elemento di cui è ref

  return (
		<form className='input' onSubmit= { (e) => { 
				checkAndAddOperation(e); 
				inputRef.current?.blur();	
		}}>
			<input 
				ref={inputRef}
				type="input" 
				placeholder='Enter a new operation' 
				className='input__box' 
				value = {operationName} // Il valore visualizzato nell'input è sempre sincronizzato con operationName.
				onChange={ (e)=>setOperationName(e.target.value) }  // Ogni volta che cambia il valore nell'input, setOperationName aggiorna il valore di operationName al nuovo valore
			/> 
			<button className='input__submit' type='submit'>Go</button>
		</form>
  )
}

export default InputField
