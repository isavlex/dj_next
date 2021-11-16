import MainLayout from '../components/layouts/mainLayout'
import {Heading, Text, Image, Box, Flex, Button} from '@chakra-ui/react'
import {GalleryBox} from '../components/Fancy/Fancy'

const IMG_PATH = './img/gallery/big/img7.jpg'
const VIDEO_PATH = 'https://www.youtube.com/embed/6HeeDmfQWgc'

export default function Leading() {
  return (
    <MainLayout title={'Ведущий'}>
      <Heading m="30px 0 0" fontSize="3xl" as="h1" textAlign="center">
        Евгений Александров
      </Heading>
      <Text fontSize="xl" mb={15} textAlign="center">
        Ведущий, Dj, музыкант
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
        <Box textAlign="center" maxW="600px">
          <Text fontSize="xl" m="20px 0">
            Он точно знает, как сделать нужную атмосферу на мероприятии. Драйв,
            энергетика, стиль и уверенность, а так же свободная импровизация,
            вот что отличает его от других.
          </Text>
          <a href="https://aesproduction.ru/" target="blank">
            <Button type="submit" colorScheme="blackAlpha" bg="black">
              Подробнее
            </Button>
          </a>
        </Box>
      </Flex>
    </MainLayout>
  )
}
