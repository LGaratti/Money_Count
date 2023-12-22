import { Heading, AbsoluteCenter, useColorMode, Switch, HStack, Spacer, Icon, Button, Wrap } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

export const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack w="full" p={2} justify="space-between">
      <Wrap spacing={4}>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/demo">
          <Button>Demo</Button>
        </Link>
      </Wrap>
      <HStack >
        <AbsoluteCenter axis='horizontal'>
          <Heading size={'2xl'}>
            <Link to="/">
              Money Count
            </Link>
          </Heading>
        </AbsoluteCenter>
      </HStack>
      <Spacer />
      <HStack>
        <Switch variant={'switchTheme'}
          isChecked={colorMode === 'dark'}
          defaultChecked = {colorMode === 'dark'}
          onChange={toggleColorMode} 
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
