import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
// import Notify from './components/Notify'
import { ALL_AUTHORS, ALL_BOOKS } from './authors-books/graphql-queries'
import { useQuery } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  // const [errorMessage, setErrorMessage] = useState(null)
  const { data: authors, loading: loadingAuthors } = useQuery(ALL_AUTHORS)
  const { data: books, loading: loadingBooks } = useQuery(ALL_BOOKS)

  // const notifyError = (error) => {
  //   setErrorMessage(error)
  // }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      {/* <Notify message={errorMessage} /> */}
      {loadingAuthors ? (
        'Loading...'
      ) : (
        <Authors
          // notifyError={notifyError}
          authors={authors.allAuthors}
          show={page === 'authors'}
        />
      )}
      {loadingBooks ? (
        'Loading...'
      ) : (
        <Books books={books.allBooks} show={page === 'books'} />
      )}

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
