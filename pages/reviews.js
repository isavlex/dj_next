import {
  Heading,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Box,
} from '@chakra-ui/react'
import MainLayout from '../components/layouts/mainLayout'
import {Carousel} from '../components/Fancy/Fancy'
import isEmpty from '../utils/utils'
import {useEffect, useState} from 'react'

export default function Reviews() {
  const [reviews, setReviews] = useState({})
  const [images, setImages] = useState({})
  useEffect(async () => {
    try {
      const reviewsRes = await fetch(`api/reviews`)
      const {data: reviewsData} = await reviewsRes.json()
      const publishedReviews = reviewsData.filter((rev) => rev.published)
      const imagesRes = await fetch(`api/images`)
      const {data: imagesData} = await imagesRes.json()
      setReviews(publishedReviews)
      setImages(imagesData)
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <MainLayout title="Отзывы">
      <Heading as="h1" textAlign="center" m="40px 0">
        Отзывы
      </Heading>

      {!isEmpty(reviews) && !isEmpty(images) ? (
        <Carousel
          items={reviews}
          images={images}
          options={{infinite: true, slidesPerPage: 1}}
        />
      ) : (
        <Box maxW="400px" margin="0 auto">
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <Box display="flex" justifyContent="center" mt={5}>
            <SkeletonCircle size="40" />
          </Box>

          <SkeletonText mt="4" noOfLines={2} spacing="4" />
          <Box display="flex" justifyContent="center" mt={5}>
            <SkeletonCircle size="10" />
          </Box>
        </Box>
      )}
    </MainLayout>
  )
}
