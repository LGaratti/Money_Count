import { Button, HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
export const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack w="full" justify="space-between" p={2} >
      <HStack>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/demo">
          <Button>Demo</Button>
        </Link>
        <IconButton
        aria-label="toggle theme"
        rounded="full"
        // size="xs"
        // position="absolute"
        // bottom={4}
        // left={4}
        onClick={toggleColorMode} icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        />
        {/* <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button> */}
      </HStack>
      {/* <Button variant="text" onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button> */}
    </HStack>
  );
};
