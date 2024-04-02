import { useDisclosure } from '@chakra-ui/react';
import { createContext, PropsWithChildren, useContext } from 'react';

interface ModalContextType {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }
  
  // Fornisce un valore di default che corrisponde all'interfaccia definita
  const defaultValue: ModalContextType = {
    isOpen: false,
    onOpen: () => {},
    onClose: () => {}
  };
  
const ModalContext = createContext<ModalContextType>(defaultValue);

export const useModal = () => useContext(ModalContext);

export const ModalProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ModalContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </ModalContext.Provider>
  );
};
