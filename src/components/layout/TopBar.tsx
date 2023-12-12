import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const TopBar = () => {
  // const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack w="full" justify="space-between" p={2} >
      <HStack>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/demo">
          <Button>Demo</Button>
        </Link>
      </HStack>
      {/* <Button variant="text" onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button> */}
    </HStack>
  );
};
