import { HStack, Icon, Switch, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export const ThemeChanger = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <HStack> 
        <Switch variant={'switchTheme'}
          isChecked={useColorModeValue(false, true)}
          defaultChecked = {useColorModeValue(false, true)}
          onChange={toggleColorMode} 
          colorScheme={useColorModeValue('white', 'black')} 
          size='lg'
        />
        <Icon
          as={useColorModeValue(FaSun, FaMoon)}
          position="absolute"
          color={useColorModeValue('primary.50', 'white')} 
          marginLeft={useColorModeValue('7', '1.5')}
          pointerEvents="none"
        />
      </HStack>
    
  );
};
export default ThemeChanger;