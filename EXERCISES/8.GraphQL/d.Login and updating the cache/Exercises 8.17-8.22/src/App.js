import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import { ALL_AUTHORS, ALL_BOOKS } from './authors-books/graphql-queries'
import { useApolloClient, useQuery } from '@apollo/client'
import Login from './components/Login'
import Recomendations from './components/Recomendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const { data: authors, loading: loadingAuthors } = useQuery(ALL_AUTHORS)
  const { data: books, loading: loadingBooks } = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    const savedToken = window.localStorage.getItem('loggedUserToken')
    if (savedToken) setToken(savedToken)
  }, [])

  const logout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
    window.location.reload()
  }

  const notifyError = (messsage) => {
    setErrorMessage(messsage)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <Notify message={errorMessage} />
      {loadingAuthors ? (
        'Loading...'
      ) : (
        <Authors authors={authors.allAuthors} show={page === 'authors'} />
      )}
      {loadingBooks ? (
        'Loading...'
      ) : (
        <Books books={books.allBooks} show={page === 'books'} />
      )}
      {token ? (
        <>
          <NewBook notifyError={notifyError} show={page === 'add'} />
          {loadingBooks ? (
            <h1>Loading...</h1>
          ) : (
            <Recomendations
              notifyError={notifyError}
              books={books.allBooks}
              show={page === 'recommend'}
            />
          )}
        </>
      ) : (
        <Login
          show={page === 'login'}
          notifyError={notifyError}
          setToken={setToken}
        />
      )}
    </div>
  )
}

export default App
