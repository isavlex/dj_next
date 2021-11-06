import Link from 'next/link'
import {useState, useEffect} from 'react'
import MainLayout from '../../components/layouts/mainLayout'
import {
  FormControl,
  FormLabel,
  Input,
  Image,
  Box,
  Textarea,
  Heading,
  Button,
  Flex,
  Switch,
  useToast,
  Skeleton,
} from '@chakra-ui/react'
import {useAuth} from '../../auth'
import Remove from '../../components/Remove/Remove'

export default function Review({query}) {
  const {user} = useAuth()
  const [imageState, setImageState] = useState('')
  const [reviewState, setReviewState] = useState({
    event: '',
    link: '',
    name: '',
    published: '',
    review: '',
  })
  const [reviewOnServer, setReviewOnServer] = useState({})
  const toast = useToast()

  useEffect(async () => {
    try {
      const reviewRes = await fetch(
        `${process.env.API_URL}api/reviews/${query.id}`
      )
      const {data: review} = await reviewRes.json()
      const imageRes = await fetch(
        `${process.env.API_URL}api/images/${query.id}`
      )
      const {data: image} = await imageRes.json()
      setImageState(image.image)
      setReviewState(review)
      setReviewOnServer(review)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const changeAreaHandler = (e) => {
    setReviewState({
      ...reviewState,
      review: e.target.value,
    })
  }

  const changeLinkHandler = (e) => {
    setReviewState({
      ...reviewState,
      link: e.target.value,
    })
  }

  const changeEventHandler = (e) => {
    setReviewState({
      ...reviewState,
      event: e.target.value,
    })
  }

  const publicChangeHandler = () => {
    setReviewState({
      ...reviewState,
      published: !reviewState.published,
    })
  }

  const ckickChangeHandler = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}api/reviews/${query.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewState),
      })
    } catch (error) {
      console.log(error)
    }
    setReviewOnServer(reviewState)
    toast({
      title: 'Отзыв обновлен',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  const clickRemoveHandler = async () => {
    try {
      const deletedReview = await fetch(
        `${process.env.API_URL}api/reviews/${query.id}`,
        {
          method: 'Delete',
        }
      )

      const deletedImage = await fetch(
        `${process.env.API_URL}api/images/${query.id}`,
        {
          method: 'Delete',
        }
      )
    } catch (error) {
      console.log(error)
    }
    window.location.href = '/reviews-admin'
  }

  if (user) {
    return (
      <MainLayout title={'Reviews page'}>
        <Flex className="flex-center">
          <Box maxW="320px">
            <Heading as="h1" mt={30} mb={30} textAlign="center">
              {reviewState.name}
            </Heading>
            <Skeleton isLoaded={imageState}>
              <Flex justifyContent="center">
                <Image boxSize="300px" mb={30} src={imageState} />
              </Flex>
            </Skeleton>
            <Flex mb={30} alignItems="center">
              <Remove onClick={clickRemoveHandler} />
              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <FormLabel htmlFor="isPublic">
                  {reviewState.published ? 'Опубликован' : 'Не опубликован'}
                </FormLabel>
                <Switch
                  id="isPublic"
                  onChange={publicChangeHandler}
                  isChecked={reviewState.published}
                />
              </FormControl>
            </Flex>

            <Input
              value={reviewState.link}
              onChange={changeLinkHandler}
              mb={30}
            />
            <Input
              value={reviewState.event}
              onChange={changeEventHandler}
              mb={30}
            />

            <Textarea
              value={reviewState.review}
              onChange={changeAreaHandler}
            ></Textarea>

            <Flex justifyContent="space-between" alignItems="center" mt={30}>
              <Button
                onClick={ckickChangeHandler}
                colorScheme="teal"
                variant="solid"
                isDisabled={
                  reviewState.review === reviewOnServer.review &&
                  reviewState.link === reviewOnServer.link &&
                  reviewState.event === reviewOnServer.event &&
                  reviewState.published === reviewOnServer.published
                }
              >
                Изменить
              </Button>
              <Link href="/reviews-admin">Назад ко всем отзываам</Link>
            </Flex>
          </Box>
        </Flex>
      </MainLayout>
    )
  } else {
    return (
      <MainLayout>
        <a href="/login">Авторизуйся</a>
      </MainLayout>
    )
  }
}

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query,
    },
  }
}
