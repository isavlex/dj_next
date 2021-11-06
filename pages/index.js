
import MainLayout from '../components/layouts/mainLayout'
import {Box, Text, Heading} from '@chakra-ui/react'
import Skills from '../components/slills/Skills'

export default function Index() {
  return (
    <MainLayout>
      <Box>
        <Box mt="40px">
          <Heading as="h1" size="xl" textAlign="center">
            Event dj на мероприятие, ведущий и диджей на свадьбу, аренда караоке
            оборудования
          </Heading>
          <Text fontSize="2xl" textAlign="center" mt={15}>
            Все для Вашего мероприятия без наценок и посредников
          </Text>
        </Box>
        <Box mt={50}>
          <Heading as="h2" size="lg" textAlign="center">
            Выбирая нас, Вы получаете
          </Heading>
          <Skills />
        </Box>
      </Box>
    </MainLayout>
  )
}
