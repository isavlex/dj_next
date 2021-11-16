import isEmpty from '../utils/utils'
import nookies from 'nookies'
import {verifyIdToken} from '../firebaseAdmin'
import {Box, Flex, Heading} from '@chakra-ui/react'
import MainLayout from '../components/layouts/mainLayout'
import {useState, useEffect} from 'react'
import ReviewsList from '../components/ReviewsList/ReviewsList'
import Logout from '../components/Logout/Logout'

export default function ReviewsAdmin() {
  const [state, setState] = useState({
    reviews: null,
    publishedReviews: null,
    unpublishedReviews: null,
  })

  useEffect(async () => {
    getReviews()
  }, [])

  useEffect(() => {
    isPublished(state.reviews)
  }, [state.reviews])

  async function getReviews() {
    const reviewsRes = await fetch(`api/reviews`)
    const {data: reviews} = await reviewsRes.json()
    setState({
      ...state,
      reviews,
    })
  }

  async function removeReview(_id) {
    try {
      const deletedReview = await fetch(`api/reviews/${_id}`, {
        method: 'Delete',
      })

      const deletedImage = await fetch(`api/images/${_id}`, {
        method: 'Delete',
      })
    } catch (error) {
      console.log(error)
    }

    getReviews()
  }

  function isPublished(reviews) {
    const publishedReviews = []
    const unpublishedReviews = []
    if (!isEmpty(reviews)) {
      reviews.map((review) => {
        if (review.published) {
          publishedReviews.push(review)
        } else {
          unpublishedReviews.push(review)
        }
      })
      setState({
        ...state,
        publishedReviews,
        unpublishedReviews,
      })
    } else {
      setState({
        ...state,
        publishedReviews,
        unpublishedReviews,
      })
    }
  }

  async function changeReview(_id, review) {
    try {
      const res = await fetch(`api/reviews/${_id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function clickPublishHandler(_id) {
    const reviews = state.reviews
    const [review] = state.reviews.filter((rev) => rev._id === _id)

    delete review._id

    if (review.published) {
      review.published = false
    } else {
      review.published = true
    }

    await changeReview(_id, review)
    getReviews()
  }

  return (
    <MainLayout title={'Отзывы-модераци'}>
      <Heading as="h1" size="lg" textAlign="center" mt="40px">
        Отзывы - модерация
      </Heading>
      <Flex mt={5} className="flex-center">
        <Box maxW="320px" minW="310px">
          <Heading as="h2" size="md" m="15px 0" textAlign="center">
            Опубликованы
          </Heading>{' '}
          <ReviewsList
            reviews={state.publishedReviews}
            clickPublishHandler={clickPublishHandler}
            removeItemHandler={removeReview}
          />
        </Box>
        <Box maxW="320px" minW="310px">
          <Heading as="h2" size="md" m="15px 0" textAlign="center">
            Не опубликованы
          </Heading>
          <ReviewsList
            reviews={state.unpublishedReviews}
            clickPublishHandler={clickPublishHandler}
            removeItemHandler={removeReview}
          />
        </Box>
      </Flex>
      <Flex justifyContent="flex-end" mt={30} mr="40px">
        <Logout />
      </Flex>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  try {
    // verify user
    const cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)
    const {uid, email} = token

    return {
      props: {
        session: `Your email is ${email} and your UID is ${uid}.`,
      },
    }
  } catch (err) {
    context.res.writeHead(302, {Location: '/login'})
    context.res.end()
    return {props: {}}
  }
}
