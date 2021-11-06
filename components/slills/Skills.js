import data from './data.js'
import styles from './skills.module.scss'
import {Heading, Text, Box, Flex} from '@chakra-ui/react'

export default function Skills() {
  return (
    <Flex className={styles.skills}>
      {data.map((skill, index) => {
        return (
          <Flex className={styles.skills__item} key={index}>
            <Box className={styles.skills__img}>
              <img
                className={styles.skills__pic}
                src={`./img/icons/${skill.img}`}
              />
            </Box>
            <Box>
              <Heading as="h3" size="md">
                {skill.heading}
              </Heading>
              <Text fontSize="xl">{skill.text}</Text>
            </Box>
          </Flex>
        )
      })}
    </Flex>
  )
}
