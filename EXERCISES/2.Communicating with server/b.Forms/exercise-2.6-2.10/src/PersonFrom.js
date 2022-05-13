import { useState } from "react"

const PersonForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
  
    const handlerChangeName = event => {
      setNewName(event.target.value)
    }
    const handlerChangeNumber = event => {
        setNewNumber(event.target.value)
    }
  
    const handlerSubmit = event => {
      event.preventDefault()
      let alredyAdded = false 
      persons.forEach((person) => {
        if (person.name === newName) {
            alredyAdded = true
            alert(`${newName} is alredy added to phonebook`)
            return alredyAdded
      } 
  
      })
      if(!alredyAdded) {
        setPersons(persons.concat({
              name: newName,
              number: newNumber
          }))
          
  
      }
      setNewName('')
      setNewNumber('')
  }
  
  return (
    <form onSubmit={handlerSubmit}>
      <div>name: <input onChange={handlerChangeName} value={newName} required/></div>
      <div>number: <input onChange={handlerChangeNumber} value={newNumber} required/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
  }

export default PersonForm