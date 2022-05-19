import Logo from '../Logo';
import DesktopMenu from '../Menu';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Header = () => {
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      zIndex="10"
      padding="0 20px"
      height="55px"
      backgroundColor={location.pathname === '/' ? 'transparent' : '#333333'}
    >
      <Logo />
      <Box display={{ base: 'none', md: 'flex' }}>
        <DesktopMenu flexDir="row" />
      </Box>
      <Box display={{ base: 'flex', md: 'none' }}>
        <HamburgerIcon
          cursor="pointer"
          onClick={onOpen}
          color="#ffffff"
          fontSize="26px"
          aria-label="Menu"
        />
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent backgroundColor="#000000">
          <DrawerCloseButton color="#ffffff" />
          <DrawerHeader color="#ffffff">Menu</DrawerHeader>
          <DrawerBody onClick={onClose}>
            <DesktopMenu flexDir="column" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
