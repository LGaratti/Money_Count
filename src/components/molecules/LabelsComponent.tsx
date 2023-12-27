import { useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { Label } from '../../interfaces/Operation'; // Assicurati di importare le interfacce corrette
import { Dispatch, SetStateAction } from 'react';
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList, AutoCompleteTag } from '@choc-ui/chakra-autocomplete';

export interface LabelsComponentProps {
  serverLabels: Label[],
  setServerLabels: Dispatch<SetStateAction<Label[]>>,
  labels: Label[],
  setLabels: Dispatch<SetStateAction<Label[]>>,
} 

export const LabelsComponent = ({ serverLabels, setServerLabels, labels, setLabels }:LabelsComponentProps) => {

  // const [labels, setLabels] = useState<Label[]>(serverLabels);
  // const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const labelList: string[] = serverLabels.map(label => {
    if(label.name !== 'gain' && label.name !=='loss')
      return label.name;
    return "";
    });

  // Gestore per i cambiamenti delle etichette selezionate.
  const handleChange = (selectedItems: string[]) => {
    // Converti le stringhe selezionate in oggetti Label, assumendo che il serverLabels
    // abbia tutti i possibili Label inclusi.
    const newLabels = selectedItems.map(item => 
      serverLabels.find(label => label.name === item)
    ).filter(label => label !== undefined) as Label[];

    setLabels(newLabels);
  };

  const handleClickOnBox = () => {
    // Gestisci la logica di modifica qui
    
    onOpen(); // Apri un modale di modifica o simile
  };

  const handleDelete = (labelId: string) => {
    // Aggiorna lo stato e potenzialmente il database qui
    setLabels(currentLabels => currentLabels.filter(label => label.label_id !== labelId));
  };

  const handleEdit = (labelId: string) => {
    // Gestisci la logica di modifica qui
    // onOpen(); // Apri un modale di modifica o simile
  };


  
  return (
    
        <AutoComplete multiple onChange={(vals:string[]) => handleChange(vals)}>
        <AutoCompleteInput size={'sm'}>

        {labels.map((label) => (
            <AutoCompleteTag
             key={label.label_id}
             label={label.name}
             onRemove={() => handleDelete(label.label_id)}
             borderRadius="full" 
             color={'#1a202c'} 
             bg={label.color_rgb+'.100'}
             disabled={label?.name === 'gain' || label?.name === 'loss'}/>

            // <Tag key={label.label_id} borderRadius="full" color={'#1a202c'} bg={label.color_rgb+'.100'}>
            //   <TagLabel>{label.name}</TagLabel>
            //   {label?.name !== 'gain' && label?.name !== 'loss' && (
            //     <>
            //       <IconButton
            //         aria-label={`Edit ${label.name}`}
            //         icon={<EditIcon />}
            //         size="xs"
            //         variant="ghost"
            //         onClick={() => handleEdit(label.label_id)}
            //       />
            //       <TagCloseButton onClick={() => handleDelete(label.label_id)} />
            //     </>
            //   )}
            // </Tag>
        ))}
        </AutoCompleteInput>
        <AutoCompleteList size={'sm'}>
          {labelList.map((labelName, index) => (
            <AutoCompleteItem
              key={`option-${index}`}
              value={labelName}
              textTransform="capitalize"
              _selected={{ bg: "whiteAlpha.50" }}
              _focus={{ bg: "whiteAlpha.100" }}
            >
              {labelName}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>

  );
};
export default LabelsComponent
