import { gql } from '@apollo/client'
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      name
      born
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
        id
      }
      genres
      published
      id
    }
  }
`

export const USER_INFO = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String!) {
    booksByGenre(genre: $genre) {
      title
      published
      author {
        name
        born
        bookcount
        id
      }
      genres
      id
    }
  }
`
