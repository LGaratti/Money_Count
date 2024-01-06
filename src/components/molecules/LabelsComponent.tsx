import { Button, Grid, GridItem, Input, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/react";
import { Label } from "../../interfaces/Operation";
import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import LabelTag from "../atomes/LabelTag";

export interface LabelsComponentProps {
  serverLabels: Label[];
  setServerLabels: Dispatch<SetStateAction<Label[]>>;
  labels: Label[];
  setLabels: Dispatch<SetStateAction<Label[]>>;
}

export const LabelsComponent = ({ serverLabels,//  setServerLabels, // TOADD
  labels,  setLabels,}: LabelsComponentProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [displayedLabels, setDisplayedLabels] = useState<Label[]>([]);

  useEffect(() => {
    const tempLabels: Label[] = serverLabels.filter(label => label.name !== "gain" && label.name !== "loss");
    setDisplayedLabels(tempLabels);
  }, [serverLabels]);

  useEffect(() => {
    let tempLabels = serverLabels.filter((label) =>
      label.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    tempLabels = tempLabels.filter(label => label.name !== "gain" && label.name !== "loss");

    //TODO logica visualizzazione Labels se tempLabels non vuoto sennò creazione ed invio al server la nuova label ed aspetto aggiornamento dal server per aggiugnerla
    if(tempLabels !== displayedLabels)
      setDisplayedLabels(tempLabels);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue,serverLabels]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const matchingLabel = displayedLabels.find(label => label.name === inputValue);
      if (matchingLabel) {
        handleSelectLabel(matchingLabel.label_id);
      }
      // Gestisci qui la creazione di una nuova etichetta, se necessario
    }
  };  

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value !== "") {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
  }, []);

  function handleSelectLabel(selectedLabelId: string) {
    if (labels.find((label) => label.label_id === selectedLabelId)) {
      setLabels(
        labels.filter((label) => label.label_id !== selectedLabelId)
      );
    } else {
      const temp = displayedLabels.find((label) => label.label_id === selectedLabelId);
      if(temp)
        setLabels([...labels, temp]);
    }
    setInputValue("");
    setMenuIsOpen(false);
  }

  return (
    <>
      <Grid gap={2}>
        <GridItem>
          <Menu isOpen={menuIsOpen} closeOnBlur={true} initialFocusRef={inputRef} placement="bottom-start">
            <MenuButton as={Button} variant={'text'} cursor={'text'} p={0} m={0} h={8} w={'full'} onClick={() => inputRef.current?.focus()}>
            <Input ref={inputRef} value={inputValue} onKeyDown={handleKeyDown} onChange={handleChangeInput} onClick={() => setMenuIsOpen(!menuIsOpen)} size="sm"/>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup type="checkbox">
                {displayedLabels.map(
                  (label) =>
                  <MenuItemOption value={label?.name} key={label?.label_id} onClick={() => handleSelectLabel(label.label_id)} cursor="pointer"
                    icon={ labels.some((labelT) => labelT?.label_id === label?.label_id) ? (<CheckIcon/>) : null } >
                    <LabelTag label={label} />
                  </MenuItemOption>    
                )}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </GridItem>
        <GridItem>
          {labels.map((label) => ( <LabelTag label={label} /> ))}
        </GridItem>
      </Grid>
    </>
  );
};
export default LabelsComponent;
