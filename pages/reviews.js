import Link from 'next/link'
import nookies from 'nookies'
import {verifyIdToken} from '../firebaseAdmin'
// import {useRouter} from 'next/router'
import {Box, Flex, Heading} from '@chakra-ui/react'
import MainLayout from '../components/layouts/mainLayout'
import {useState, useEffect, useRef} from 'react'
import classes from '../styles/reviews.module.scss'
import ReviewsList from '../components/ReviewsList/ReviewsList'
import firebaseClient from '../firebaseClient'
import Logout from '../components/Logout/Logout'
import Container from '../components/Container'

function isEmpty(obj) {
  return obj ? !!Object.keys(obj).length : false
}

export default function Reviews({session}) {
  const db = firebaseClient()
  const [state, setState] = useState({
    reviews: null,
    publishedReviews: null,
    unpublishedReviews: null,
  })
  // const router = useRouter()
  useEffect(() => {
    getReviews()
  }, [])

  useEffect(() => {
    isPublished(state.reviews)
  }, [state.reviews])

  async function getReviews() {
    const reviews = await db
      .ref('reviews')
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

    setState({...state, reviews})
  }

  async function removeReview(reviewName) {
    await db
      .ref(`reviews/${reviewName}`)
      .remove()
      .catch((error) => {
        console.log(error)
      })
    await db
      .ref(`images/${reviewName}`)
      .remove()
      .catch((error) => {
        console.log(error)
      })
    getReviews()
  }

  function isPublished(reviews) {
    const publishedReviews = {}
    const unpublishedReviews = {}
    if (isEmpty(reviews)) {
      Object.keys(reviews).map((reviewName) => {
        if (reviews[reviewName].published) {
          publishedReviews[reviewName] = reviews[reviewName]
        } else {
          unpublishedReviews[reviewName] = reviews[reviewName]
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

  async function clickCheckboxHandler(reviewName) {
    const reviews = {...state.reviews}

    if (!state.reviews[reviewName].checked) {
      // unchecked
      reviews[reviewName].checked = true
      setState({
        ...state,
        reviews,
      })

      if (!state.reviews[reviewName].published) {
        // not published
        await db
          .ref(`reviews/${reviewName}/published`)
          .set(true)
          .catch((error) => {
            console.log(error)
          })
        getReviews()
      } else {
        //published
        await db
          .ref(`reviews/${reviewName}/published`)
          .set(false)
          .catch((error) => {
            console.log(error)
          })
        getReviews()
      }
    } else {
      // checked
      reviews[reviewName].checked = false
      setState({
        ...state,
        reviews,
      })
    }
  }

  return (
    <MainLayout title={'Отзывы'}>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
          <Flex justifyContent="space-between">
              <Heading as="h1" size="2xl">Отзывы - модерация</Heading>
              <Logout />
            </Flex>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            
            <div className="d-flex justify-content-between mb-3">
              <Heading as="h2" size="xl">Опубликованы</Heading>
            </div>
            <ReviewsList
              reviews={state.publishedReviews}
              inputCheckboxHandler={clickCheckboxHandler}
              checked={state.reviews}
              removeItemHandler={removeReview}
            />
          </div>
          <div className="col">
            <div className="d-flex justify-content-between mb-3">
              <Heading as="h2" size="xl">Не опубликованы</Heading>
            </div>
            <ReviewsList
              reviews={state.unpublishedReviews}
              inputCheckboxHandler={clickCheckboxHandler}
              checked={state.reviews}
              removeItemHandler={removeReview}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)
    const {uid, email} = token
    return {
      props: {session: `Your email is ${email} and your UID is ${uid}.`},
    }
  } catch (err) {
    context.res.writeHead(302, {Location: '/login'})
    context.res.end()
    return {props: {}}
  }
}
