import {
  Box,
  Image,
  Flex,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
} from '@chakra-ui/react'
import {MdCheckCircle} from 'react-icons/md'
import styles from './offers.module.scss'
import ModalWindow from '../ModalWindow/ModalWindow'

export default function Offers(props) {

  return (
    <Flex justifyContent="space-around" flexWrap="wrap">
      {props.offers.map((offer, index) => {
        return (
          <Box key={index} maxWidth={360}>
            <Box h={270} overflow="hidden">
              <Image src={`./img/offers/${offer.img}`} w={'100%'} />
            </Box>

            <Heading as="h3" fontSize="xl" m={'15px 5px'} >
              {offer.heading}
            </Heading>
            <Box className={styles.stretchOut}>
              <Box>
                <List>
                  {offer.equipments.map((equipment, key) => {
                    return (
                      <ListItem key={key}>
                        <ListIcon as={MdCheckCircle} />
                        {equipment}
                      </ListItem>
                    )
                  })}
                </List>
              </Box>
              <Box>
                {offer.note && <Text mb={15}>{offer.note}</Text>}
                <Text className={styles.price}>{offer.price}</Text>
                <ModalWindow heading={offer.heading} textOffer='Забронировать'/>
              </Box>
            </Box>
          </Box>
        )
      })}
    </Flex>
  )
}
