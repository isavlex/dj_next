import MainLayout from '../components/layouts/mainLayout'
import isEmpty from '../utils/utils'
// import Button from '../components/UI/Button/Button'
import {createControl, validate, validateForm} from '../form/formUtils'
// import Input from '../components/UI/Input/Input'
// import TextArea from '../components/UI/TextArea/TextArea'
import {useEffect, useRef, useState} from 'react'
import React from 'react'
import firebaseClient from '../firebaseClient'
import Cropper from 'react-cropper'
import {
  Tooltip,
  IconButton,
  Heading,
  Box,
  Image,
  Flex,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  HStack,
  Stack,
  useToast,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react'
import 'cropperjs/dist/cropper.css'
import classes from '../styles/add-review.module.scss'
import {FiRotateCw} from 'react-icons/fi'
import {BsCrop} from 'react-icons/bs'
import {AiOutlineZoomIn, AiOutlineZoomOut} from 'react-icons/ai'
import imageCompression from 'browser-image-compression'
import validator from 'validator'

export default function AddReview() {
  const db = firebaseClient()
  const [dash, setDash] = useState('none')
  const [choose, setChoose] = useState('Добавить фото')
  const [cropper, setCropper] = useState()
  const [image, setImage] = useState(null)
  const [cropImage, setCropImage] = useState(null)
  const toast = useToast()
  const [name, setName] = useState('')
  const [eventState, setEventState] = useState('')
  const [invalidEvent, setInvalidEvent] = useState('')
  const [invalidName, setInvalidName] = useState(false)
  const [text, setText] = useState('')
  const [invalidText, setInvalidText] = useState(false)
  const [review, setReview] = useState({})
  const [imageBlob, setImageBlob] = useState()
  const [link, setLink] = useState('')
  const [invalidLink, setInvalidLink] = useState()

  useEffect(async () => {
    if (isEmpty(review)) {
      const idReview = Date.now()
      const updatesReview = {}
      const updatesImage = {}
      const url = 'mail_review.php'
      updatesImage[idReview] = cropImage
      updatesReview[idReview] = review
      await db
        .ref('reviews')
        .update(updatesReview)
        .catch((error) => {
          console.log(error)
        })
      await db
        .ref('images')
        .update(updatesImage)
        .catch((error) => {
          console.log(error)
        })
      
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      toast({
        title: 'Отзыв отправлен',
        description: 'Ваш отзыв появится после модерации',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [review])

  useEffect(() => {
    if (imageBlob) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(imageBlob)
    }
  }, [imageBlob])

  const getToast = (message) => {
    toast({
      title: message,
      status: 'error',
      duration: 9000,
      isClosable: true,
    })

    return
  }
  const compressImage = (file) => {
    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: 600,
    }
    imageCompression(file, options)
      .then((compressedBlob) => {
        setImageBlob(compressedBlob)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const addReviewHandler = (event) => {
    event.preventDefault()
    if (!cropImage) {
      getToast('Добавьте фото и нажмите кнопку "Обрезать"')
      return
    }

    if (!name || !text || !eventState) {
      getToast('Заполните все поля!')
      return
    }

    setReview({
      checked: false,
      published: false,
      name,
      review: text,
      event: eventState,
      link,
    })

    setText('')
    setName('')
    setEventState('')
    setLink('')
  }

  const fileChangeHandler = (e) => {
    e.preventDefault()
    // const limitSize = 3145728
    if (e.target) {
      const file = e.target.files[0]

      compressImage(file)
      setChoose(`Выбрано ${e.target.files.length} фото`)
      setDash('block')
      // const reader = new FileReader()
      // reader.onload = () => {
      //   setImage(reader.result)
      // }
      // reader.readAsDataURL(file)
      // if (file[0].size <= limitSize) {
      //   setChoose(`Выбрано ${e.target.files.length} фото`)
      //   setDash('block')
      //   const reader = new FileReader()

      //   reader.onload = () => {
      //     setImage(reader.result)
      //   }
      //   reader.readAsDataURL(file[0])
      // }
    } else {
      toast({
        title: 'Большой размер',
        description: 'Размер фото не должен превышать 3-х мегабайт.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    // compressImage(file)
  }

  const cropHandler = () => {
    if (typeof cropper !== 'undefined') {
      setCropImage(cropper.getCroppedCanvas().toDataURL())
    }
  }

  const rotateHandler = () => {
    setCropper(cropper.rotate(90))
  }

  const zoomHandlerPlus = () => {
    setCropper(cropper.zoom(0.1))
  }

  const zoomHandlerMinus = () => {
    setCropper(cropper.zoom(-0.1))
  }

  const nameBlurHandler = () => {
    if (name.length < 2) {
      setInvalidName(true)
      toast({
        title: 'Введите корректное имя!',
        description: 'Имя должно содержать 2 и более символов.',
        status: 'info',
        duration: 9000,
        isClosable: true,
      })
    } else {
      setInvalidName(false)
    }
  }

  const textBlurHandler = () => {
    if (text.length < 5) {
      setInvalidText(true)
      toast({
        title: 'Слишком коротко!',
        description: 'Текст отзыва должен содержать минимум 5 символов.',
        status: 'info',
        duration: 9000,
        isClosable: true,
      })
    } else {
      setInvalidText(false)
    }
  }

  const eventBlurHandler = () => {
    if (eventState.length < 4) {
      setInvalidEvent(true)
      toast({
        title: 'Слишком коротко!',
        description: 'Текст мероприятия должен содержать минимум 4 символов.',
        status: 'info',
        duration: 9000,
        isClosable: true,
      })
    } else {
      setInvalidEvent(false)
    }
  }

  const linkChangeHandler = (e) => {
    const reg = /^(http|https):\/\//
    const value = e.target.value
    const newValue = value.replace(reg, '')

    validator.isURL(newValue) ? setLink(newValue.trim()) : getToast('Введите корректный URL-адрес')
  }

  return (
    <MainLayout title="Добавить отзыв">
      <Heading as="h1">Добавить отзыв</Heading>
      <form>
        <Box maxWidth={320}>
          <HStack display={dash} mt={30} mb={30}>
            <Tooltip hasArrow placement="top" label="Перевернуть" bg="black">
              <IconButton onClick={rotateHandler} icon={<FiRotateCw />} />
            </Tooltip>
            <Tooltip hasArrow placement="top" label="Увеличить" bg="black">
              <IconButton
                onClick={zoomHandlerPlus}
                icon={<AiOutlineZoomIn />}
              />
            </Tooltip>
            <Tooltip hasArrow placement="top" label="Уменьшить" bg="black">
              <IconButton
                onClick={zoomHandlerMinus}
                icon={<AiOutlineZoomOut />}
              />
            </Tooltip>
            <Tooltip hasArrow placement="top" label="Обрезать" bg="black">
              <Button
                onClick={cropHandler}
                leftIcon={<BsCrop />}
                colorScheme="teal"
              >
                Обрезать
              </Button>
            </Tooltip>
          </HStack>
          <Stack>
            <Cropper
              style={{maxHeight: 320, width: '100%'}}
              zoomTo={0.1}
              initialAspectRatio={1}
              aspectRatio={1 / 1}
              src={image}
              viewMode={1}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance)
              }}
            />
            <Image src={cropImage} />
          </Stack>

          <Box>
            <FormControl isRequired>
              <Box w={160} mb={15} mt={15}>
                <FormLabel className={classes.addPhoto} textAlign="center">
                  {choose}
                </FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  className={classes.choose}
                  onChange={fileChangeHandler}
                  w={0.1}
                  h={0.1}
                  pos="absolute"
                ></Input>

                <FormErrorMessage></FormErrorMessage>
              </Box>
            </FormControl>
          </Box>
          <Box flexBasis={320}>
            <FormControl isRequired>
              <FormLabel>Введите ваше имя</FormLabel>
              <Input
                isInvalid={invalidName}
                type="text"
                onChange={(e) => {
                  setName(e.target.value)
                }}
                value={name}
                onBlur={nameBlurHandler}
                errorBorderColor="red.500"
              ></Input>
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Ссылка на профиль</FormLabel>
              <InputGroup size="sm">
                <InputLeftAddon children="https://" />
                <Input
                  isInvalid={invalidLink}
                  type="text"
                  onChange={linkChangeHandler}
                  value={link}
                  errorBorderColor="red.500"
                ></Input>
              </InputGroup>
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Мероприятие</FormLabel>
              <Input
                isInvalid={invalidEvent}
                type="text"
                onChange={(e) => {
                  setEventState(e.target.value)
                }}
                value={eventState}
                onBlur={eventBlurHandler}
                errorBorderColor="red.500"
              ></Input>
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Введите ваш отзыв</FormLabel>
              <Textarea
                value={text}
                isInvalid={invalidText}
                onChange={(e) => {
                  setText(e.target.value)
                }}
                onBlur={textBlurHandler}
              ></Textarea>
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <Box>
              <Button
                onClick={addReviewHandler}
                bg="black"
                color="white"
                isDisabled={text === '' || cropImage === null || name === null}
                _hover={{opacity: 0.7}}
                _active={{opacity: 0.9}}
              >
                Добавить отзыв
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </MainLayout>
  )
}
