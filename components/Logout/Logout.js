import {Box, Button} from '@chakra-ui/react'
import firebase from 'firebase/app'
export default function Logout() {
  const logoutHandler = async () => {
    await firebase.auth().signOut()
    window.location.href = '/'
  }

  return (
    <Box>
      <Button variant="solid" colorScheme="red" onClick={logoutHandler}>
        Выйти
      </Button>
    </Box>
  )
}
