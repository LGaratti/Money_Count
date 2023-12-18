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
          colorScheme={colorMode === 'light' ? 'white' : 'primary.900'} 
          size='lg'
        />
        <Icon
          as={colorMode === 'light' ? FaSun : FaMoon}
          position="absolute"
          color={colorMode === 'light' ? 'yellow' : 'navy'}
          marginLeft={colorMode === 'light' ? '2' : 'calc(100% - 2rem)'} // Adjust as necessary
          size="24px" // Adjust icon size as necessary
        />
      </HStack>
    </HStack>
  );
};
