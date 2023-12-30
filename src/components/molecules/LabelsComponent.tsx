import { Button, Grid, GridItem, Input, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Tag } from "@chakra-ui/react";
import { Label } from "../../interfaces/Operation"; // Assicurati di importare le interfacce corrette
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";

export interface LabelsComponentProps {
  serverLabels: Label[];
  setServerLabels: Dispatch<SetStateAction<Label[]>>;
  labels: Label[];
  setLabels: Dispatch<SetStateAction<Label[]>>;
}

export const LabelsComponent = ({
  serverLabels,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setServerLabels,
  labels,
  setLabels,
}: LabelsComponentProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [displayedLabels, setDisplayedLabels] = useState<Label[]>([]);

  useEffect(() => {
    setDisplayedLabels(serverLabels);
  }, [serverLabels]);

  useEffect(() => {
    const tempLabels = serverLabels.filter((label) =>
      label.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    // if(inputValue !== "")
    //   setMenuIsOpen(true);
    // else
    //   setMenuIsOpen(false);

    //TODO logica visualizzazione Labels se tempLabels non vuoto sennò creazione ed invio al server la nuova label ed aspetto aggiornamento dal server per aggiugnerla
    if(tempLabels !== displayedLabels)
      setDisplayedLabels(tempLabels);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue,serverLabels]);

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // Aggiungi logica per gestire l'apertura del menu qui se necessario
    if (e.target.value !== "") {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
  }, []);

  // function handleDelLabel(label_id: string) {
  //   setLabels(
  //     labels.filter((label) => label.label_id !== label_id)
  //   );
  // }

  function handleSelectLabel(selectedLabelId: string) {
    if (labels.find((label) => label.label_id === selectedLabelId)) {
      // Se l'etichetta è già selezionata, rimuovila
      setLabels(
        labels.filter((label) => label.label_id !== selectedLabelId)
      );
    } else {
      // Altrimenti, aggiungi l'etichetta selezionata all'array
      const temp = displayedLabels.find((label) => label.label_id === selectedLabelId);
      if(temp)
        setLabels([...labels, temp]);
    }
    setInputValue("");
    setMenuIsOpen(false); // Chiudi i suggerimenti dopo la selezione
  }

  return (
    <>
      <Grid gap={2}>
        <GridItem>
          
          <Menu
            isOpen={menuIsOpen}
            closeOnBlur={true}
            // onClose={() => setMenuIsOpen(false)}
            initialFocusRef={inputRef}
            placement="bottom-start"
          >
            <MenuButton as={Button} variant={'text'} cursor={'text'} p={0} m={0} h={8} w={'full'} onClick={() => inputRef.current?.focus()}
            
              // onSubmit={() => handleSelectLabel(inputValue)}
              >
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={handleChangeInput}
              onClick={() => setMenuIsOpen(!menuIsOpen)}
              // onSubmit={() => handleSelectLabel(inputValue)}
              size="sm"
            />
            </MenuButton>
            <MenuList>
              <MenuOptionGroup type="checkbox">
                {displayedLabels.map(
                  (label) =>
                    label?.name !== "gain" &&
                    label?.name !== "loss" && (
                      <MenuItemOption
                        value={label?.name}
                        key={label?.label_id}
                        onClick={() => handleSelectLabel(label.label_id)}
                        cursor="pointer"
                        icon={ labels.some((labelT) => labelT?.label_id === label?.label_id) ? (<CheckIcon/>) : null }>
                        <Tag
                          key={label?.label_id}
                          color={"#1a202c"}
                          bg={label?.color_rgb + ".100"}
                        >
                          {label?.name}
                        </Tag>
                      </MenuItemOption>
                    )
                )}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          {/* </Box> */}
        </GridItem>
        <GridItem>
          {labels.map((label) => (
            <Tag
              key={label?.label_id}
              color={"#1a202c"}
              bg={label?.color_rgb + ".100"}
            >
              {label?.name}
              {/* {label?.name !== "gain" && label?.name !== "loss" && (
                <TagCloseButton
                  onClick={() => handleDelLabel(label?.label_id)}
                />
              )} */}
            </Tag>
          ))}
        </GridItem>
      </Grid>
    </>
  );
};
export default LabelsComponent;
