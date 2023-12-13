import { VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { TopBar } from "./TopBar";

function Layout() {
  return (
    <VStack w="100vw" spacing={0}>
      <TopBar />
      <Outlet />
    </VStack>
  );
}

export default Layout;
