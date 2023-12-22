import { Tag, TagLabel, TagCloseButton, IconButton, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { Label } from '../../interfaces/Operation'; // Assicurati di importare le interfacce corrette
import { Dispatch, SetStateAction, useState } from 'react';

export interface LabelsComponentProps {
  serverLabels: Label[],
  setServerLabels: Dispatch<SetStateAction<Label[]>>,
} 

export const LabelsComponent = ({ serverLabels, setServerLabels }:LabelsComponentProps) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [labels, setLabels] = useState<Label[]>(serverLabels);

  const handleDelete = (labelId: string) => {
    // Aggiorna lo stato e potenzialmente il database qui
    setLabels(currentLabels => currentLabels.filter(label => label.label_id !== labelId));
  };

  const handleEdit = (labelId: string) => {
    // Gestisci la logica di modifica qui
    onOpen(); // Apri un modale di modifica o simile
  };

  return (
    <Wrap>
      {labels.map((label) => (
        <WrapItem key={label.label_id}>
          <Tag  borderRadius="full" color={'#1a202c'} bg={label.color_rgb+'.100'}>
            <TagLabel>{label.name}</TagLabel>
            <IconButton
              aria-label={`Edit ${label.name}`}
              icon={<EditIcon />}
              size="xs"
              onClick={() => handleEdit(label.label_id)}
            />
            <TagCloseButton onClick={() => handleDelete(label.label_id)} />
          </Tag>
        </WrapItem>
      ))}
    </Wrap>
  );
};
export default LabelsComponent
