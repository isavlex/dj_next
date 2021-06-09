import NextNprogress from 'nextjs-progressbar'
import {AuthProvider} from '../auth'
import {ChakraProvider} from '@chakra-ui/react'
import '../styles/globals.scss'

// import {CookiesProvider} from 'react-cookie'


export default function MyApp({Component, pageProps}) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height="3"
        />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}
