import {Heading, Box} from '@chakra-ui/react'
import firebaseClient from '../firebaseClient'
import {useState, useEffect} from 'react'
export default function Test() {
  const [reviews, setReviews] = useState({})

  useEffect(() => {
    getReviews()
  }, [])

  async function getReviews() {
    const db = firebaseClient()
    const dbPromise = await db
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
    setReviews(dbPromise)
  }
  return (
    <Box>
      <Heading as="h1" textAlign="center">
        Test page
      </Heading>
    </Box>
  )
}
