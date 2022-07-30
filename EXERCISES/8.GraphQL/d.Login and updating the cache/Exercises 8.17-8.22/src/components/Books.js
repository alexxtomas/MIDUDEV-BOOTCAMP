import { useState } from 'react'
const Books = ({ show, books }) => {
  const [filter, setFilter] = useState(null)
  const [filtredBooks, setFiltredBooks] = useState([])

  const setGenres = () => {
    const extractGenres = books.map((book) => {
      return book.genres
    })
    let a = []
    for (let gen of extractGenres) {
      a = [...a, ...gen]
    }
    let outputArray = Array.from(new Set(a))
    return outputArray
  }

  const handleClick = (evt) => {
    const clickOn = evt.target.outerText
    console.log(typeof genre)
    setFiltredBooks(
      books.filter((book) => {
        return book.genres.includes(clickOn)
      })
    )
    setFilter(true)
  }

  const genres = setGenres()

  if (!show) return null
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filter
            ? filtredBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {genres.map((g, i) => (
        <button onClick={handleClick} key={i}>
          {g}
        </button>
      ))}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books
