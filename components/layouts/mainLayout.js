import Head from 'next/head'
import Link from 'next/link'
import {useAuth} from '../../auth'

export default function MainLayout({children, title = ''}) {
  const {user} = useAuth()
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
      <nav>
        <Link href="/">Главная</Link>
        <Link href="/karaoke">Караоке</Link>
        {user && <Link href="/reviews">Отзывы</Link>}
        <Link href="/addreview">Добавить отзыв</Link>
      </nav>
      <main>{children}</main>
      <style jsx>{`
        nav {
          position: fixed;
          height: 60px;
          top: 0;
          left: 0;
          right: 0;
          background: black;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        nav a {
          color: white;
        }
        main {
          margin-top: 60px;
          padding: 1rem;
        }
      `}</style>
    </>
  )
}
