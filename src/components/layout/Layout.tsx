import { Image, VStack, useColorMode } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { TopBar } from "./TopBar";

function Layout() {
  const { colorMode } = useColorMode();
  return (
    <VStack w="100vw" h="100vh" spacing={5} overflow="auto">
      <TopBar />
      <Image
        w="100%"
        h="100vh" // Imposta l'altezza al 100% della viewport
        src={colorMode === "dark" ? "background-dark.svg" : "background-light.svg"}
        position="absolute"
        zIndex={-1}
        objectFit="cover" // Assicurati che l'immagine copra l'intera area senza perdere le proporzioni
        objectPosition="center" // Centra l'immagine nella viewport
      />
      <Outlet />
    </VStack>
  );
}

export default Layout;
