import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContextProvider } from '../contexts/UserContext'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo/client'
import { FinnhubContextProvider } from '../contexts/FinnhubContext'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router';


function MyApp({ Component, pageProps }: AppProps) {
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())
  return (
    <ApolloProvider client={client}>
      <FinnhubContextProvider>
        <UserContextProvider> 
          <Component {...pageProps} /> 
        </UserContextProvider>
      </FinnhubContextProvider>
    </ApolloProvider>
  )
}

export default MyApp
