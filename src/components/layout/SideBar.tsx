import { Box, CloseButton, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Heading, Icon, Spacer, Stack, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ThemeChanger from "../atoms/ThemeChanger";
import { PagesConfig } from "./PagesConfig";

export interface SideBarPros {
  collapseTopBarElements: boolean;
  isOpenSideBar: boolean;
  onCloseSideBar: () => void;
}

export const SideBar = ({collapseTopBarElements, isOpenSideBar, onCloseSideBar}: SideBarPros) => {
  
  return (
    <Drawer 
      isOpen={isOpenSideBar} 
      placement="left" 
      onClose={onCloseSideBar} 
      returnFocusOnClose={false} 
      onOverlayClick={onCloseSideBar}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Stack padding="10px" w="full" direction="row" align="center" justify="space-between" position="sticky">
          
          <CloseButton onClick={onCloseSideBar}/>
          
          <Spacer />

          <Box>
            <Heading size={{ base: 'md', lg: 'md' }}>
                <Link onClick={onCloseSideBar} to="/">Money Count</Link>
            </Heading>
          </Box>

          <Spacer />
          
          {collapseTopBarElements && (<ThemeChanger/>)}

        </Stack>
        <DrawerBody>
          <VStack>
            {PagesConfig.map((page) => (   
              <Link to={page.link!} onClick={onCloseSideBar}>
                <Icon  mr="4" fontSize="16" as={page.icon}/>
                {page.name}
              </Link>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideBar;
