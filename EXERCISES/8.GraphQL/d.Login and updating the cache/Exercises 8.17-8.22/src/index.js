import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'

const getAuth = () => {
  const token = window.localStorage.getItem('loggedUserToken')
  return token ? `bearer ${token}` : null
}

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    headers: {
      authorization: getAuth()
    },
    uri: 'http://localhost:4000'
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
