import { Heading, useColorMode, Switch, HStack, Icon, Button, Wrap, Box, Grid, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import AddOperationModal from "../organisms/AddOperationModal";

export const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const {t} = useTranslation('ns1',{ i18n } );

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Grid templateColumns="repeat(3, 1fr)" w="full" p={2} position="sticky">
      <Wrap spacing={4}>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/demo">
          <Button>Demo</Button>
        </Link>
     </Wrap>
      <Box justifySelf="center">
        <Heading size={'2xl'}>
          <Link to="/">Money Count</Link>
        </Heading>
      </Box>
      <Wrap justifySelf="end" spacing={4}>
        {/* <Link to="/demo"> */}
          <Button
            rightIcon={<MdPostAdd/>} 
            bg={colorMode === 'light' ? 'primary.600' : 'primary.300'} 
            color={colorMode === 'light' ? 'white' : 'black'}
            onClick={onOpen}>
            {t('add operation')}
          </Button>
          <AddOperationModal isCentered size={'xl'} isOpen={isOpen} onClose={onClose} children={undefined}/>
        {/* </Link> */}
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
            position="absolute"     //TODO Da modificare
            color={colorMode === 'light' ? 'primary.50' : 'white'} 
            marginLeft={colorMode === 'light' ? '7' : '1.5'}
            pointerEvents="none"
          />
        </HStack>
      </Wrap>
    </Grid>
  );
};
