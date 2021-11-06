import MainLayout from '../components/layouts/mainLayout'
import Offers from '../components/offers/Offers'
import {karaokeData} from '../components/offers/data'
import {Heading, Text} from '@chakra-ui/react'

export default function Karaoke() {
  return (
    <MainLayout title={'Караоке'}>
      <Heading textAlign="center" m="30px 0 0" fontSize="4xl" as="h1">
        Аренда караоке оборудования
      </Heading>
      <Text fontSize="xl" textAlign="center" mb={30}>
        Всегда качественный звук и обновление базы песен
      </Text>
      <Offers offers={karaokeData} />
    </MainLayout>
  )
}
