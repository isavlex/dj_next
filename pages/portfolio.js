import {Heading, Flex} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import {GalleryBox} from '../components/Fancy/Fancy'

import MainLayout from '../components/layouts/mainLayout'

const PREFIX_URL = './img/gallery/'

export default function Portfolio() {
  const [images, setImages] = useState([])
  useEffect(() => {
    setImages(getImages())
  }, [])

  function getImages() {
    let images = [
      {
        video: true,
        src: 'https://www.youtube.com/watch?v=7nXNidDKQo0&t=1s',
        thumb: './img/pics/plug-gallery.jpg',
        caption:
          'Диджей на праздник, выездное караоке.',
      },
      {
        video: true,
        src: 'https://www.youtube.com/embed/bAYPViYuTGs',
        thumb: './img/pics/plug-gallery.jpg',
        caption: 'Диджей на праздник. djkaraoke.ru',
      },
    ]
    for (let i = 0; i < 12; i++) {
      images.push({
        src: `${PREFIX_URL}big/img${i + 1}.jpg`,
        thumb: `${PREFIX_URL}min/img${i + 1}-min.jpg`,
        caption: 'Портфолио DJKARAOKE',
      })
    }
    return images
  }
  return (
    <MainLayout title={'Портфолио'}>
      <Heading textAlign="center" m="30px 0 0" fontSize="4xl" as="h1">
        Портфолио
      </Heading>
      <Flex mt={30} justifyContent="space-around" flexWrap="wrap">
        <GalleryBox>
          {images.map((img, index) => {
            return (
              <div
                data-fancybox="gallery"
                data-src={img.src}
                key={index}
                className="gallery__frame"
              >
                {img.video && <div className="play-button"></div>}
                <img
                  src={img.thumb}
                  width="200"
                  height="150"
                  className="gallery__thumb"
                  alt={img.caption}
                />
              </div>
            )
          })}
        </GalleryBox>
      </Flex>
    </MainLayout>
  )
}
