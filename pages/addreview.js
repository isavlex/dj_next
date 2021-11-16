import MainLayout from '../components/layouts/mainLayout'
import {useEffect, useState} from 'react'
import React from 'react'
import Cropper from 'react-cropper'
import {
  Tooltip,
  IconButton,
  Heading,
  Flex,
  Box,
  Image,
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
} from '@chakra-ui/react'
import 'cropperjs/dist/cropper.css'
import classes from '../styles/add-review.module.scss'
import {FiRotateCw} from 'react-icons/fi'
import {BsCrop} from 'react-icons/bs'
import {AiOutlineZoomIn, AiOutlineZoomOut} from 'react-icons/ai'
import imageCompression from 'browser-image-compression'
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/router'
import {route} from 'next/dist/next-server/server/router'

export default function AddReview() {
  const [chooseImage, setChooseImage] = useState({
    dash: 'none',
    buttonText: 'Выбрать фото',
    image: null,
    cropImage: null,
    error: false,
  })

  const [cropper, setCropper] = useState()
  const [review, setReview] = useState(null)
  const toast = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm()

  useEffect(async () => {
    if (review) {
      addReview()
      addImage()
      sendNotification()
    }
  }, [review])

  const addReview = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}api/reviews`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      })
      setReview(null)
    } catch (error) {
      console.log(error)
    }
  }

  const addImage = async () => {
    const img = {
      _id: review._id,
      image: chooseImage.cropImage,
    }
    try {
      const res = await fetch(`${process.env.API_URL}api/images`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(img),
      })
      setChooseImage({
        dash: 'none',
        buttonText: 'Выбрать фото',
        image: null,
        cropImage: null,
        error: false,
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const sendNotification = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}api/contact`, {
        method: 'POST',
        headers: {
          'Contents-Type': 'application/json',
        },
        body: JSON.stringify({
          id: review._id,
          text: review.review,
        }),
      })
    } catch (err) {
      console.log(err)
    } finally {
      toast({
        title: 'Отзыв отправлен',
        description: 'Ваш отзыв появится после модерации',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const getToast = (message) => {
    toast({
      title: message,
      status: 'error',
      duration: 9000,
      isClosable: true,
    })

    return
  }

  const fileChangeHandler = async (e) => {
    e.preventDefault()

    if (e.target) {
      const file = e.target.files[0]
      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 600,
      }
      try {
        const compressedImage = await imageCompression(file, options)
        const reader = new FileReader()
        reader.onload = () => {
          setChooseImage({
            ...chooseImage,
            dash: 'block',
            buttonText: `Выбрано ${e.target.files.length} фото`,
            image: reader.result,
          })
        }
        reader.readAsDataURL(compressedImage)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const cropHandler = () => {
    if (typeof cropper !== 'undefined') {
      setChooseImage({
        ...chooseImage,
        cropImage: cropper.getCroppedCanvas().toDataURL(),
      })
    }
  }

  const submitHandler = (values) => {
    const _id = Date.now()
    if (!chooseImage.cropImage) {
      getToast('Добавьте фото и нажмите кнопку "Обрезать"')
      return
    }

    setReview({
      _id,
      checked: false,
      published: false,
      name: values.name,
      review: values.text,
      event: values.event,
      link: values.link,
    })
    reset()
  }

  return (
    <MainLayout title="Добавить отзыв">
      <Heading as="h1" textAlign="center" m="40px 0">
        Добавить отзыв
      </Heading>
      <Box maxWidth={320} p={3}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Flex justifyContent="center">
            <HStack display={chooseImage.dash} mt={30} mb={30}>
              <Tooltip hasArrow placement="top" label="Перевернуть" bg="black">
                <IconButton
                  onClick={() => setCropper(cropper.rotate(90))}
                  icon={<FiRotateCw />}
                />
              </Tooltip>
              <Tooltip hasArrow placement="top" label="Увеличить" bg="black">
                <IconButton
                  onClick={() => setCropper(cropper.zoom(0.1))}
                  icon={<AiOutlineZoomIn />}
                />
              </Tooltip>
              <Tooltip hasArrow placement="top" label="Уменьшить" bg="black">
                <IconButton
                  onClick={() => setCropper(cropper.zoom(-0.1))}
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
          </Flex>

          <Stack>
            <Cropper
              style={{maxHeight: 320, width: '100%'}}
              zoomTo={0.1}
              initialAspectRatio={1}
              aspectRatio={1 / 1}
              src={chooseImage.image}
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
            <Image src={chooseImage.cropImage} />
          </Stack>

          <Box>
            <FormControl>
              <Box w={160} mb={15} mt={15}>
                <FormLabel className={classes.addPhoto} textAlign="center">
                  {chooseImage.buttonText}
                </FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  className={classes.choose}
                  onChange={fileChangeHandler}
                  w={0.1}
                  h={0.1}
                  pos="absolute"
                />
              </Box>
            </FormControl>
          </Box>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Введите ваше имя</FormLabel>
            <Input
              type="text"
              id="name"
              {...register('name', {
                required: 'Необходимо заполнить',
                minLength: {
                  value: 2,
                  message: 'Минимальное кол-во символов 2',
                },
                maxLength: {
                  value: 80,
                  message: 'Максимальное кол-во символов 80',
                },
              })}
              errorBorderColor="red.500"
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.link}>
            <FormLabel htmlFor="link">Ссылка на профиль</FormLabel>
            <InputGroup size="sm">
              {/* <InputLeftAddon children="https://" /> */}
              <Input
                type="text"
                id="link"
                {...register('link', {
                  required: 'Необходимо заполнить',
                  minLength: {
                    value: 4,
                    message: 'Минимальное кол-во символов 4',
                  },
                  maxLength: {
                    value: 80,
                    message: 'Максимальное кол-во символов 80',
                  },
                })}
                errorBorderColor="red.500"
              ></Input>
            </InputGroup>
            <FormErrorMessage>
              {errors.link && errors.link.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.event}>
            <FormLabel htmlFor="event">Мероприятие</FormLabel>
            <Input
              type="text"
              id="event"
              {...register('event', {
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
            ></Input>
            <FormErrorMessage>
              {errors.event && errors.event.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.text}>
            <FormLabel htmlFor="text">Введите ваш отзыв</FormLabel>
            <Textarea
              id="text"
              {...register('text', {
                required: 'Необходимо заполнить',
                minLength: {
                  value: 5,
                  message: 'Минимальное кол-во символов 5',
                },
                maxLength: {
                  value: 280,
                  message: 'Максимальное кол-во символов 280',
                },
              })}
            ></Textarea>
            <FormErrorMessage>
              {errors.text && errors.text.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            mt="15px"
            type="submit"
            bg="black"
            color="white"
            _hover={{opacity: 0.7}}
            _active={{opacity: 0.9}}
          >
            Добавить отзыв
          </Button>
        </form>
      </Box>
    </MainLayout>
  )
}
