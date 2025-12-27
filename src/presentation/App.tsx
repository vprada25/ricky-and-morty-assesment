import RouterProvider from './providers/RouterProvider'
import { apolloClient } from '@infrastructure/index'
import { ApolloProvider } from '@apollo/client'
import { FC } from 'react'

export const App: FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <RouterProvider />
    </ApolloProvider>
  )
}
