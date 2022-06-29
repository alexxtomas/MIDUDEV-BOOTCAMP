import axios from "axios"

export const deletePhone = (id, name, setPersons) => {
    setPersons((prevPersons) => prevPersons.filter(prevPerson => prevPerson.name !== name) )
    axios.delete(`http://localhost:3001/api/persons/${id}`)
  }