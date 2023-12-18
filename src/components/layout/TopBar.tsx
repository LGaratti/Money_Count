import { useColorMode, Switch, HStack, Spacer, Icon, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";



export const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
        <Switch 
          isChecked={colorMode === 'dark'} 
          onChange={toggleColorMode} 
          colorScheme={colorMode === 'light' ? 'white' : 'black'} 
          size='lg'
        />
        <Icon
          as={colorMode === 'light' ? FaSun : FaMoon}
          position="absolute"
          color={colorMode === 'light' ? 'white' : 'white'}
          marginLeft={colorMode === 'light' ? '1.5' : '7'}
        />
      </HStack>
    </HStack>
  );
};
