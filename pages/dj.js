import MainLayout from '../components/layouts/mainLayout'
import Offers from '../components/offers/Offers'
import {djData} from '../components/offers/data'
import {Heading, Text} from '@chakra-ui/react'

export default function Karaoke() {
  return (
    <MainLayout title={'DJ/MC'}>
      <Heading textAlign="center" m="30px 0 0" fontSize="4xl" as="h1">
        Заказать диджея на праздник
      </Heading>
      <Text fontSize="xl" textAlign="center" mb={30}>
        Создаст необходимую атмосферу и драйв на танцполе
      </Text>
      <Offers offers={djData} />
    </MainLayout>
  )
}
