import Link from 'next/link'
import isEmpty from '../../utils/utils'
import {
  OrderedList,
  ListItem,
  Text,
  IconButton,
} from '@chakra-ui/react'
import Remove from '../Remove/Remove'
import {CgArrowsExchangeAltV} from 'react-icons/cg'

export default function ReviewsList(props) {
  return (
    <OrderedList>
      {!isEmpty(props.reviews) ? (
        props.reviews.map((review, index) => {
          return (
            <ListItem
              key={index}
              className="list-group-item"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                onClick={props.clickPublishHandler.bind(this, review._id)}
                icon={<CgArrowsExchangeAltV />}
                mr={3}
              />
              <Link href={`/review/[id]`} as={`/review/${review._id}`}>
                {review.name}
              </Link>
              <Remove
                trash={true}
                onClick={props.removeItemHandler.bind(this, review._id)}
              />
            </ListItem>
          )
        })
      ) : (
        <Text>Нет отзывов!</Text>
      )}
    </OrderedList>
  )
}
