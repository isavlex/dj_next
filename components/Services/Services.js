import {List, ListItem, Heading, Collapse, Button, Box} from '@chakra-ui/react'
import Link from 'next/link'
import {useState} from 'react'

export default function Services() {
  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)
  return (
    <Box mt={30}>
      <Heading as="h2" fontSize="2xl" textAlign="center" mb={30}>
        Djkaraoke оказывает услуги по организации мероприятий:
      </Heading>

      <List>
        <ListItem className="list-group-item" fontSize="xl">
          <Link href="/karaoke" className="text-link">
            заказать выездное караоке
          </Link>
          &nbsp;или взять караоке оборудование в аренду. Профессиональное
          оборудование и звукорежиссёр гарантируют высокий уровень услуг. Если
          желаете почувствовать себя звездой, то все что вам нужно - это
          заказать караоке у нас!
        </ListItem>
        <ListItem className="list-group-item" fontSize="xl">
          заказать диджея с оборудованием и без. Диджей на праздник,&nbsp;
          <Link href="/dj" className="text-link">
            диджей на юбилей
          </Link>
          , диджей на свадьбу, диджей на корпоратив, диджей на выпускной, диджей
          на новый год - это ваша любимая музыка. Диджей и караоке на выезд
          удобно и весело! Всегда обновленная база песен и отличный звук!
        </ListItem>
        <ListItem className="list-group-item" fontSize="xl">
          а если вам наскучила поп музыка, вы с легкостью можете заказать DJ,
          который порадует ваш слух стильной музыкой любимых направлений будь то
          Tech, Deep, Soul, Disco или Techno.
        </ListItem>
        <Collapse in={show} animateOpacity>
          <ListItem className="list-group-item" fontSize="xl">
            за нашими плечами не только организация караоке и диджей вечеринок,
            но и красивые семейные торжества. В команде есть отличный ведущий на
            свадьбу и ведущий на юбилей, который создаст необходимую дружескую
            атмосферу на вашем празднике. Слаженный тандем ведущий и диджей на
            свадьбу - это гарантия отличного праздника.
          </ListItem>
          <ListItem className="list-group-item" fontSize="xl">
            <Link href="/leading" className="text-link">
              ведущий певец
            </Link>
            &nbsp;- отличное решение для любого торжества, драйв, энергия и
            любимые песни будут сопровождать вас весь вечер
          </ListItem>
          <ListItem className="list-group-item" fontSize="xl">
            так же возможна свадьба без ведущего, наш DJ/MC с легкостью общается
            с публикой, предоставит слово и встретит гостей.
          </ListItem>
          <ListItem className="list-group-item" fontSize="xl">
            если вы хотите неповторимый свадебный танец, то стоит заказать
            тяжелый дым на свадьбу. Красивые фото и видео наполнят ваш семейный
            альбом.
          </ListItem>
          <ListItem className="list-group-item" fontSize="xl">
            <Link
              href="https://djkaraoke.ru"
              className="text-link"
              target="blank"
            >
              https://djkaraoke.ru
            </Link>
            &nbsp;- это лучшее решение для вашего праздника. Чтобы вы были
            спокойны, мы приезжаем за два часа до начала мероприятия, доставка и
            монтаж входят в стоимость услуг. Позвоните или напишите нам, и мы
            подробно расскажем какие услуги: диджей на праздник, свадебный
            ведущий, аренда караоке оборудования или тяжелый дым на свадьбу
            подойдут именно вам. Так же мы сможем обсудить тайминг,
            интерактивную часть программы, индивидуальный плейлист и ключевые
            моменты вашего торжества.
          </ListItem>
        </Collapse>
      </List>

      <Box display="flex" justifyContent="center">
        <Button size="sm" onClick={handleToggle} mt="1rem">
          {show ? 'Скрыть' : 'Показать'}
        </Button>
      </Box>
    </Box>
  )
}
