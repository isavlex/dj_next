import Link from 'next/link'
import {useState, useEffect} from 'react'
import MainLayout from '../../components/layouts/mainLayout'
import {
  Image,
  Box,
  Textarea,
  Heading,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react'
import firebaseClient from '../../firebaseClient'

export default function Review({review, image, query}) {
  const db = firebaseClient()
  const [area, setArea] = useState()
  const [reviewState, setReviewState] = useState(review.review)
  const toast = useToast()
  useEffect(() => {
    setArea(review.review)
  }, [])

  const changeAreaHandler = (e) => {
    setArea(e.target.value)
  }

  const ckickChangeHandler = async () => {
    await db
      .ref(`reviews/${query.id}/review`)
      .set(area)
      .catch((error) => {
        console.log(error)
      })
    toast({
      title: 'Отзыв обновлен',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    setReviewState(area)
  }
  

  if (!review) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    )
  }
  return (
    <MainLayout title={'Reviews page'}>
      <Heading as="h1" mb={30}>
        {review.name}
      </Heading>
      <Box boxSize="sm">
        <Image boxSize="300px" mb={30} src={image} />
        
        <Textarea value={area} onChange={changeAreaHandler}></Textarea>
        <Flex justifyContent="space-between" alignItems="center" mt={30}>
          <Button
            onClick={ckickChangeHandler}
            colorScheme="teal"
            variant="solid"
            isDisabled={area === reviewState}
          >
            Изменить
          </Button>
          <Link href="/reviews">Назад ко всем отзываам</Link>
        </Flex>
      </Box>
    </MainLayout>
  )
}

export async function getServerSideProps({req, query}) {
  if (!req) {
    return {
      reviews: null,
    }
  }

  const db = firebaseClient()

  const review = await db
    .ref(`reviews/${query.id}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log('No data available')
      }
    })
    .catch((error) => {
      console.error(error)
    })

  const image = await db
    .ref(`images/${query.id}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log('No data available')
      }
    })
    .catch((error) => {
      console.error(error)
    })

  return {
    props: {
      image,
      review,
      query,
    },
  }
}
