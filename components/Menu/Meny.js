import styles from './menu.module.scss'
import MenuItems from '../MenuItems/MenuItems'
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react'
import {GiHamburgerMenu} from 'react-icons/gi'

export default function Menu() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <nav className={styles.mainMenu}>
      <Button onClick={onOpen} colorScheme="blackAlpha" rightIcon={<GiHamburgerMenu fontSize="2rem"/>} mr="40px">
        Меню
      </Button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Меню</DrawerHeader>
          <DrawerBody>
            <MenuItems />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </nav>
  )
}
