import {Heading, Text, Box, Image, Flex} from '@chakra-ui/react'
import MainLayout from '../components/layouts/mainLayout'
import {GalleryBox} from '../components/Fancy/Fancy'

const IMG_PATH = './img/pics/plug-smoke.jpg'
const VIDEO_PATH =
  'https://www.youtube.com/watch?v=MBGjCBg8EuA&feature=youtu.be'

export default function Smoke() {
  return (
    <MainLayout>
      <Heading as="h1" textAlign="center" size="xl">
        Дым на свадьбу
      </Heading>
      <Text fontSize="2xl" textAlign="center" mb={30}>
        Красивое оформление первого танца
      </Text>
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Box position="relative">
          <GalleryBox>
            <div
              data-fancybox="video-gallery"
              data-src={VIDEO_PATH}
              className="image-box"
            >
              <div className="play-button"></div>
              <Image
                src={IMG_PATH}
                alt="Ведущий Евгений Александров"
                maxW="none"
                className="image-circle"
              />
            </div>
          </GalleryBox>
        </Box>
        <Box textAlign="center">
          <Text fontSize="xl" maxW="600px" m="20px 0">
            Для запуска тяжелого дыма используется 20 кг сухого льда, что
            гарантирует высокое качество услуги на площади до 300 метров.
          </Text>
          <Text fontSize="xl" fontWeight="700">
            Запуск 15000₽
          </Text>
        </Box>
      </Flex>
    </MainLayout>
  )
}
