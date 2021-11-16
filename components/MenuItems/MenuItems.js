import Link from 'next/link'
import {useAuth} from '../../auth'
import {Box} from '@chakra-ui/react'
import {useRouter} from 'next/router'

const listItems = [
  {adress: '/', ancor: 'Главная'},
  {adress: '/karaoke', ancor: 'Караоке'},
  {adress: '/dj', ancor: 'DJ на праздник'},
  {adress: '/reviews', ancor: 'Отзывы'},
  {adress: '/addreview', ancor: 'Добавить отзыв'},
  {adress: '/portfolio', ancor: 'Портфолио'},
  {adress: '/leading', ancor: 'Ведущий'},
  {adress: '/smoke', ancor: 'Тяжелый дым на свадьбу'},
]

export default function MenuItems() {
  const {user} = useAuth()
  const router = useRouter()

  const itemStyle = ['list-group-item', 'list-group-item-action']
  const isActive = router.pathname === '/reviews-admin' ? 'active' : ''
  itemStyle.push(isActive)
  return (
    <Box className="list-group" ml="0">
      {listItems.map((item, index) => {
        const itemStyle = ['list-group-item', 'list-group-item-action']
        const isActive = router.pathname === item.adress ? 'active' : ''
        itemStyle.push(isActive)
        return (
          <Link href={item.adress} key={index}>
            <a className={itemStyle.join(' ')}>{item.ancor}</a>
          </Link>
        )
      })}
      {user && (
        <Link href="/reviews-admin">
          <a className={itemStyle.join(' ')}>Модерация отзывов</a>
        </Link>
      )}
    </Box>
  )
}
