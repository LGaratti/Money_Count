import { Image, VStack, useBreakpointValue, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { TopBar } from "./TopBar";
import SideBar from "./SideBar";

function Layout() {
  // const [openSideBar, setOpenSideBar] = useState<boolean>(false)
  const { isOpen: isOpenSideBar, onOpen: onOpenSideBar, onClose:onCloseSideBar } = useDisclosure();
  const collapseTopBarElements = useBreakpointValue({ base: true, lg: false }) || false;

  return (
    <VStack w="100vw" h="100vh" spacing={5} overflow="auto">
      <SideBar collapseTopBarElements={collapseTopBarElements} isOpenSideBar={isOpenSideBar} onCloseSideBar={onCloseSideBar}/>
      <TopBar collapseTopBarElements={collapseTopBarElements} onOpenSideBar={onOpenSideBar}/>
      <Image
        w="100%"
        h="100vh" // Imposta l'altezza al 100% della viewport
        src={useColorModeValue("background-light.svg", "background-dark.svg")}
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
