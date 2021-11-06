import isEmpty from '../utils/utils'
import nookies from 'nookies'
import {verifyIdToken} from '../firebaseAdmin'
import {Box, Flex, Heading} from '@chakra-ui/react'
import MainLayout from '../components/layouts/mainLayout'
import {useState, useEffect} from 'react'
import ReviewsList from '../components/ReviewsList/ReviewsList'
import Logout from '../components/Logout/Logout'

export default function ReviewsAdmin({reviews, session}) {
  console.log(session)
  const [state, setState] = useState({
    reviews,
    publishedReviews: null,
    unpublishedReviews: null,
  })

  useEffect(() => {
    isPublished(state.reviews)
  }, [state.reviews])

  async function getReviews() {
    const reviewsRes = await fetch(`${process.env.API_URL}api/reviews`)
    const {data: reviews} = await reviewsRes.json()
    setState({
      ...state,
      reviews,
    })
  }

  async function removeReview(_id) {
    try {
      const deletedReview = await fetch(
        `${process.env.API_URL}api/reviews/${_id}`,
        {
          method: 'Delete',
        }
      )

      const deletedImage = await fetch(
        `${process.env.API_URL}api/images/${_id}`,
        {
          method: 'Delete',
        }
      )
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
      const res = await fetch(`${process.env.API_URL}api/reviews/${_id}`, {
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

    changeReview(_id, review)
    getReviews()
  }

  return (
    <MainLayout title={'Отзывы-модераци'}>
      <Heading as="h1" size="lg" textAlign="center" mt="40px">
        Отзывы - модерация
      </Heading>
      <Flex mt={5} className="flex-center">
        <Box maxW="320px" minW="310px">
          <Heading as="h2" size="md" mb={30} textAlign="center">
            Опубликованы
          </Heading>{' '}
          <ReviewsList
            reviews={state.publishedReviews}
            clickPublishHandler={clickPublishHandler}
            removeItemHandler={removeReview}
          />
        </Box>
        <Box maxW="320px" minW="310px">
          <Heading as="h2" size="md" mb={30} textAlign="center">
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

    // connect to db
    const reviewsRes = await fetch(`${process.env.API_URL}api/reviews`)
    const {data: reviews} = await reviewsRes.json()
    const imagesRes = await fetch(`${process.env.API_URL}api/images`)
    const {data: images} = await imagesRes.json()

    return {
      props: {
        images,
        reviews,
        session: `Your email is ${email} and your UID is ${uid}.`,
      },
    }
  } catch (err) {
    context.res.writeHead(302, {Location: '/login'})
    context.res.end()
    return {props: {}}
  }
}
