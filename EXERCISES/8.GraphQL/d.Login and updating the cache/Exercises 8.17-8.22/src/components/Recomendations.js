import { USER_INFO } from '../authors-books/graphql-queries'
import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

const Recomendations = ({ notifyError, books, show }) => {
  const [getUserInfo, result] = useLazyQuery(USER_INFO)
  const [favoriteGenre, setFavoriteGenre] = useState(null)

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  useEffect(() => {
    if (result.data) setFavoriteGenre(result.data.me.favoriteGenre)
  }, [result])

  //   const { favoriteGenre } = data.me

  //   if (error) notifyError(error.messeage)

  const filtredBooks = books.filter((book) => {
    return book.genres.includes(favoriteGenre)
  })

  if (!show || !favoriteGenre) return null

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        Books in your favorite genre <strong>{favoriteGenre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filtredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recomendations
