import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { EDIT_BORN } from '../authors-books/graphql-mutations'
import Select from 'react-select'

const Authors = ({ authors, show, notifyError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editBorn] = useMutation(EDIT_BORN)

  const options = []

  authors.map((author) =>
    options.push({ value: author.name, label: author.name })
  )

  const handleSubmit = (evt) => {
    evt.preventDefault()
    editBorn({ variables: { name, setBornTo: Number(born) } })
    setBorn('')
  }

  if (!show) {
    return null
  }
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Select
            options={options}
            onChange={(choice) => setName(choice.value)}
          />
        </div>
        <div>
          <label>
            Born:
            <input
              placeholder="1990"
              type="number"
              value={born}
              onChange={(evt) => setBorn(evt.target.value)}
            />
          </label>
        </div>
        <button>Update Author</button>
      </form>
    </div>
  )
}

export default Authors
