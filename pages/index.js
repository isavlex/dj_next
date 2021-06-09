import Link from 'next/link'
import MainLayout from '../components/layouts/mainLayout'
import {useAuth} from '../auth'
import Container from '../components/Container'
import {Flex, Box, Button, Text, Heading, Stack} from '@chakra-ui/react'

export default function Index() {
  const {user} = useAuth()

  return (
    // <MainLayout title={'Главная'}>
    //   <h1>Index</h1>
    //   <p>
    //     <Link href="/reviews">
    //       <a>reviews</a>
    //     </Link>
    //   </p>
    //   <p>
    //     <Link href="/karaoke">
    //       <a>karaoke</a>
    //     </Link>
    //   </p>
    // </MainLayout>

    <MainLayout>
      <Container>
        <Flex>
          <Box w={500} p={4} mt={12} mx="auto">
            <Heading as="h2" textAlign="center">
              Welcome!
            </Heading>
            <Text mt={8} textAlign="center">
              {`User ID: ${user ? user.uid : 'No user signed in'}`}
            </Text>
            <Stack
              mt={8}
              alignItems="center"
              justifyContent="center"
              isInline
              width="100%"
            >
              <Link href="/authenticated">
                <Button
                  variant="solid"
                  variantcolor="blue"
                  width="100%"
                  // isDisabled={!user}
                >
                  Go to authenticated route
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="solid"
                  variantcolor="green"
                  width="100%"
                  isDisabled={user}
                >
                  Login
                </Button>
              </Link>
            </Stack>
          </Box>
        </Flex>
      </Container>
    </MainLayout>
  )
}
