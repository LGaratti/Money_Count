import { useColorMode, Switch, HStack, Spacer, Icon, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

export const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleChangeTheme = () => {
    setTimeout(toggleColorMode,150);
  };
  return (
    <HStack w="full" p={2} justify="space-between">
      <HStack spacing={4}>
      <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/demo">
          <Button>Demo</Button>
        </Link>
      </HStack>
      <Spacer />
      <HStack>
        <Switch variant={'switchTheme'}
          // isChecked={pippo === 'dark' ? true : false}
          defaultChecked = {colorMode === 'light' ? false : true } 
          onChange={handleChangeTheme} 
          colorScheme={colorMode === 'light' ? 'white' : 'black'} 
          size='lg'
        />
        <Icon
          as={colorMode === 'light' ? FaSun : FaMoon}
          position="absolute"
          color={colorMode === 'light' ? 'primary.50' : 'white'} 
          marginLeft={colorMode === 'light' ? '7' : '1.5'}
          pointerEvents="none"
        />
      </HStack>
    </HStack>
  );
};
