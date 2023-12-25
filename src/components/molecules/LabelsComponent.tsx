import { Tag, TagLabel, TagCloseButton, IconButton, useDisclosure, Wrap, WrapItem, Box } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { Label } from '../../interfaces/Operation'; // Assicurati di importare le interfacce corrette
import { Dispatch, SetStateAction } from 'react';

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
    <Box cursor="pointer"
    onClick={handleClickOnBox} 
    borderWidth='1px' 
    borderRadius='lg' 
    overflow='hidden'>
      <Wrap>
        {labels.map((label) => (
          <WrapItem key={label.label_id}>
            <Tag  borderRadius="full" color={'#1a202c'} bg={label.color_rgb+'.100'}>
              <TagLabel>{label.name}</TagLabel>
              {label?.name !== 'gain' && label?.name !== 'loss' && (
                <>
                  <IconButton
                    aria-label={`Edit ${label.name}`}
                    icon={<EditIcon />}
                    size="xs"
                    variant="ghost"
                    onClick={() => handleEdit(label.label_id)}
                  />
                  <TagCloseButton onClick={() => handleDelete(label.label_id)} />
                </>
              )}
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};
export default LabelsComponent
