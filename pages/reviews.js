import {Heading} from '@chakra-ui/react'
import MainLayout from '../components/layouts/mainLayout'
import {Carousel} from '../components/Fancy/Fancy'
import isEmpty from '../utils/utils'

export default function Reviews({reviews, images}) {
  const publishedReviews = reviews.filter((rev) => rev.published)
  return (
    <MainLayout title="Отзывы">
      <Heading as="h1" textAlign="center" m="40px 0">
        Отзывы
      </Heading>
      {!isEmpty(reviews) && !isEmpty(images) ? (
        <Carousel
          items={publishedReviews}
          images={images}
          options={{infinite: true}}
        />
      ) : (
        <p>Загрузка отзывов...</p>
      )}
    </MainLayout>
  )
}

export async function getServerSideProps() {
  const reviewsRes = await fetch(`${process.env.API_URL}api/reviews`)
  const {data: reviews} = await reviewsRes.json()
  const imagesRes = await fetch(`${process.env.API_URL}api/images`)
  const {data: images} = await imagesRes.json()
  return {
    props: {
      reviews,
      images,
    },
  }
}
