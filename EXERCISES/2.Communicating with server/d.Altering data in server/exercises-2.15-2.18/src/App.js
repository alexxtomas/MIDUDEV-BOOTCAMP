import { useState, useEffect } from 'react'
import PersonForm from './components/PersonFrom'
import Persons from './components/Persons'
import Filter from './components/Filter'


import { getPhones } from './services/phonebook/getPhones'

const App = () => {
  const [persons, setPersons] = useState([]) 
  useEffect(() => {
    getPhones()
      .then(persons => setPersons(persons))
  }, [])
  
  const [newFilter, setNewFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setNewFilter={setNewFilter} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} setPersons={setPersons}/>
    </div>
  )
}

export default App