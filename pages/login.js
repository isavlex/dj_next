import React, {useState} from 'react'
import Link from 'next/link'
import router, { useRouter } from 'next/router'
import firebaseClient from '../firebaseClient'
import firebase from 'firebase/app'
import 'firebase/auth'
import validator from 'validator'
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Stack,
  Button,
  Heading,
  useToast,
} from '@chakra-ui/react'


export default function Login({props}) {
  firebaseClient()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [pass, setPass] = useState('')
  const router = useRouter()

  const emailBlurHandler = () => {
    validator.isEmail(email) ? setInvalidEmail(false) : setInvalidEmail(true)
  }

  const loginHandler = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(function (firebaseUser) {
        // window.location.href = '/'
        router.push('/reviews')
      })
      .catch(function (error) {
        const message = error.message
        toast({
          title: 'An error occurred.',
          description: message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  return (
    <Flex>
      <Box w={500} p={4} my={12} mx="auto">
        <Heading textAlign="center" as="h2">
          Login
        </Heading>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={invalidEmail}
            onBlur={emailBlurHandler}
            type="email"
            id="emailAddress"
            value={email}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Пароль</FormLabel>
          <Input
            onChange={(e) => setPass(e.target.value)}
            type="password"
            id="pass"
            value={pass}
          />
        </FormControl>
        <Stack mt={6} isInline spacing={10}>
          {/* <Button
            minWidth="40%"
            variant="solid"
            variantcolor="blue"
            isDisabled={email === '' || pass === ''}
            onClick={async () => {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, pass)
                .then(function (firebaseUser) {
                  window.location.href = '/'
                })
                .catch(function (error) {
                  const message = error.message
                  toast({
                    title: 'An error occurred.',
                    description: message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
                })
            }}
          >
            Create account
          </Button> */}
          <Button
            minWidth="40%"
            variant="solid"
            variantcolor="green"
            isDisabled={invalidEmail || pass.length < 6}
            colorScheme="green"
            onClick={loginHandler}
          >
            Log in
          </Button>
        </Stack>
      </Box>
    </Flex>
  )
}
