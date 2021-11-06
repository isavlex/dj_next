import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  IconButton,
} from '@chakra-ui/react'
import {FaTrash} from 'react-icons/fa'

import {useState, useRef} from 'react'

export default function Remove(props) {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()
  return (
    <>
      {props.trash ? (
        <IconButton onClick={() => setIsOpen(true)} icon={<FaTrash/>} ml={3}/>
      ) : (
        <Button colorScheme="red" onClick={() => setIsOpen(true)}>
          Удалить
        </Button>
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Удалить отзыв
            </AlertDialogHeader>

            <AlertDialogBody>
              Ты уверен, что хочешь удалить отзыв?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Отмена
              </Button>
              <Button colorScheme="red" onClick={props.onClick} ml={3}>
                Удалить
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
