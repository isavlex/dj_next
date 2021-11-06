import MainLayout from '../components/layouts/mainLayout'
import {Heading, Text, Image, Box, Flex} from '@chakra-ui/react'
import {GalleryBox} from '../components/Fancy/Fancy'

const IMG_PATH = './img/gallery/big/img7.jpg'
const VIDEO_PATH = 'https://www.youtube.com/embed/6HeeDmfQWgc'

export default function Leading() {
  return (
    <MainLayout title={'Ведущий'}>
      <Flex justifyContent="space-between" mb="-40px">
        <Box position="relative">
          <GalleryBox>
            <div data-fancybox="video-gallery" data-src={VIDEO_PATH}>
              <div className="play-button"></div>
              <Image
                src={IMG_PATH}
                alt="Ведущий Евгений Александров"
                maxW="none"
              />
            </div>
          </GalleryBox>
        </Box>
        <Flex
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          padding="5"
          textAlign="center"
        >
          <Heading m="30px 0 0" fontSize="3xl" as="h1">
            Евгений Александров
          </Heading>
          <Text fontSize="xl" mb={15}>
            Ведущий, Dj, музыкант
          </Text>
          <Text fontSize="2xl">*****</Text>
          <Text fontSize="xl">
            Евгений Александров - ведущий, DJ, певец. Профессиональный шоумен
            проведет мероприятие на высшем уровне и сделает незабываемым Ваш
            день рождения, юбилей, корпоратив или свадьбу.
          </Text>
          <Text fontSize="xl">
            Чувство такта дает возможность найти свой подход к каждому гостю, а
            его харизма никого не оставит равнодушным. Для мероприятия готовится
            уникальная программа, сценарий которой не лишен креатива.
          </Text>
          <Text fontSize="xl">
            Евгений Александров не только опытный ведущий, но и великолепный
            музыкант. Имеет сильный вокал, который высоко оценит даже самая
            искушенная публика. Вы сможете услышать как поп, рок хиты, так и
            классику джаза.
          </Text>
          <Text fontSize="xl">
            Он точно знает, как сделать нужную атмосферу на мероприятии. Драйв,
            энергетика, стиль и уверенность, а так же свободная импровизация,
            вот что отличает его от других ведущих.
          </Text>
        </Flex>
      </Flex>
    </MainLayout>
  )
}
