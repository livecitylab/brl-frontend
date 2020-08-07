import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import fetch from 'node-fetch'
const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache,
  link: new HttpLink({
    fetch,
    uri: process.env.NUXT_ENV_GRAPHQL_URI
  })
})
