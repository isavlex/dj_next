import Link from 'next/link'
import {useAuth} from '../../auth'

export default function MenuItems() {
  const {user} = useAuth()

  return (
    <ul className="menu">
      <li>
        <Link href="/">Главная</Link>
      </li>
      <li>
        <Link href="/karaoke">Караоке</Link>
      </li>
      <li>
        <Link href="/dj">DJ на праздник</Link>
      </li>
      {user && (
        <li>
          <Link href="/reviews-admin">Модерация отзывов</Link>
        </li>
      )}
      <li>
        <Link href="/reviews">Отзывы</Link>
      </li>
      <li>
        <Link href="/addreview">Добавить отзыв</Link>
      </li>
      <li>
        <Link href="/portfolio">Портфолио</Link>
      </li>
      <li>
        <Link href="/leading">Ведущий</Link>
      </li>
      <li>
        <Link href="/smoke">Тяжелый дым на свадьбу</Link>
      </li>
    </ul>
  )
}
