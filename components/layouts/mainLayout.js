import Head from 'next/head'
import Meny from '../Menu/Meny'
import Link from 'next/link'
import Social from '../Social/Social'
import {Box, Flex, Heading, Text} from '@chakra-ui/layout'


export default function MainLayout({children, title = ''}) {

  return (
    <>
      <Head>
        <title>DJKaraoke | {title}</title>
        <meta
          name="keywords"
          content="аренда караоке в москве, аренда караоке оборудования, выездное караоке, диджей на свадьбу, ведущий и диджей на свадьбу недорого, ведущий и диджей недорого, ведущий свадьба, тамада на свадьбу, ведущий на корпоратив, ведущий недорого, диджей на юбилей в москве, диджей недорого,поющий ведущий, певец на свадьбу, певец на юбилей,"
        />
        <meta
          name="description"
          content="Все для Вашего мероприятия, исполнители напрямую."
        />
        <meta charSet="utf-8" />
      </Head>
      <div className="fluid fluid--black">
        <header className="header wrapper">
          <div className="header__logo">
            <Link href="/">
              <a className="header__link">DJKARAOKE</a>
            </Link>
          </div>
          <Meny />
        </header>
      </div>
      <div className="fluid">
        <main className="main wrapper">{children}</main>
      </div>
      <Box className="fluid fluid--bt" mt="40px">
        <Flex
          className="wrapper"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          minHeight="100px"
          mt="40px"
          mb="40px"
        >
          <Heading as="h2" mb="15px" size="lg" textAlign="center">Позвоните нам, чтобы забронировать дату</Heading>
          <a className="link" href="tel:+79164942042">+7 (916) 494-20-42</a>
          <a className="link" href="mailto:e.alexandrov68@gmail.com?subject=Мероприятие">e.alexandrov68@gmail.com</a>
          <Text className="center" mb="15px">Адрес: ул. Нижняя Красносельская, д. 45/17</Text>
          
          <Social />
        </Flex>
      </Box>
    </>
  )
}
