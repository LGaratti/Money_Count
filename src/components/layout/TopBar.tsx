import { Heading, Button, Box, useBreakpointValue, Stack, Spacer, IconButton, useColorModeValue } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { MdPostAdd } from "react-icons/md";
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import { useModal } from "../../utils/ModalContext";
import ThemeChanger from "../atoms/ThemeChanger";
import { HamburgerIcon } from "@chakra-ui/icons";
import { PagesConfig } from "./PagesConfig";


export interface TopBarProps {
  collapseTopBarElements: boolean;
  onOpenSideBar : () => void
}

export const TopBar = ( {collapseTopBarElements, onOpenSideBar}: TopBarProps ) => {
  const {t} = useTranslation('ns1',{ i18n } );
  const buttonAddOperationText = useBreakpointValue({ base: '', lg: t('add operation') });
  const { onOpen } = useModal();
  const location = useLocation();
  const currentPage = PagesConfig.find((page) => (page.link === location.pathname));

  return (
    <Stack padding="10px" w="full" direction="row" align="center" justify="space-between" position="sticky">

      <Button
        as={IconButton}
        aria-label='Open Menu'
        icon={<HamburgerIcon />}
        onClick={onOpenSideBar}
      />
      
      <Box position="absolute" left="50%" transform="translateX(-50%)">
        <Heading size={{ base: 'lg', sm: 'xl'}} textAlign="center">
          <Link to={currentPage?.link || '/'}>{currentPage?.name}</Link>
        </Heading>
      </Box>

      <Spacer />

      <Button
        rightIcon={!collapseTopBarElements ? <MdPostAdd/> : undefined} 
        bg={ useColorModeValue('primary.600', 'primary.300')} 
        color={useColorModeValue('white', 'black')}
        onClick={onOpen}>
        { collapseTopBarElements ? <MdPostAdd/> : buttonAddOperationText}
      </Button>

      {!collapseTopBarElements && (
        <ThemeChanger/>
      )}


    </Stack>
  );
};
export default TopBar;