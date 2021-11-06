import {
  useToast,
  Input,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import {useState, useEffect, useRef} from 'react'
import {useForm} from 'react-hook-form'
import NumberFormat from 'react-number-format'


export default function ModalWindow(props) {
  const toast = useToast()
  const [phone, setPhone] = useState('')
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm()

  const submitHandler = async (values) => {
    const url = `${process.env.API_URL}api/order`
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Contents-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.userName,
          phone: values.userPhone,
          order: props.heading,
        }),
      })
      setPhone('')
      reset()
      onClose()
    } catch (err) {
      console.log(err)
    } finally {
      toast({
        title: 'Сообщение отправлено!',
        description: 'В ближайшее время мы с Вами свяжемся!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Button
        mt={15}
        data-order={props.heading}

        colorScheme="blackAlpha"
        bg="black"
        onClick={onOpen}
      >
        {props.textOffer ? props.textOffer : 'Забронировать'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.heading}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(submitHandler)}>
            <ModalBody>
              <FormControl isInvalid={errors.userName}>
                <FormLabel htmlFor="userName">Ваше имя:</FormLabel>
                <Input
                  id="userName"
                  type="text"
                  {...register('userName', {
                    required: 'Необходимо заполнить',
                    minLength: {
                      value: 2,
                      message: 'Минимальное кол-во символов 2',
                    },
                    maxLength: {
                      value: 60,
                      message: 'Максимальное кол-во символов 60',
                    },
                  })}
                  errorBorderColor="red.500"
                />
                <FormErrorMessage>
                  {errors.userName && errors.userName.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.userPhone}>
                <FormLabel htmlFor="userPhone">Номер телефона:</FormLabel>

                <NumberFormat
                  placeholder="+7 (777) 777-7777"
                  format="+7 (###) ###-####"
                  mask="_"
                  id="userPhone"
                  name="userPhone"
                  type="tel"
                  customInput={Input}
                  errorBorderColor="red.500"
                  {...register('userPhone', {
                    required: 'Необходимо заполнить',
                    pattern: {
                      value:
                        /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/i,
                      message: 'Введите правильный номер телефона',
                    },
                  })}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <FormErrorMessage>
                  {errors.userPhone && errors.userPhone.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blackAlpha" bg="black">
                {props.textOffer ? props.textOffer : 'Забронировать'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
