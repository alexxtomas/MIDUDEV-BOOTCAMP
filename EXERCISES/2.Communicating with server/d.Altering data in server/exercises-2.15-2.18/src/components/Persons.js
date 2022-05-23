import { deletePhone } from "../services/phonebook/deletePhone"

// CUANDO SE AÑADE UN NÚMERO NO SE LE AÑADE UNA ID AL OBJETO HASTA QUE NO SE RECARGA LA PAGÍNA 
const Persons = ({persons, filter, setPersons}) => {
    if (filter === '') {
      return (
        persons.map(person=> {
        return (
          <div key={person.id}>
              <p>{person.name} {person.number} 
              <button onClick={() => { 
                if(window.confirm(`Delete ${person.name} ?`)) {
                  deletePhone(person.id, person.name, setPersons)
                }
                }
            }>Delete
              </button>
            </p>
          </div>
          )
      })
      
    )}
    else {
      const filtredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      return (
        filtredPersons.map(person=> {
        return (
          <div key={person.id}>
              <p>{person.name} {person.number} 
              <button onClick={() => { 
                if(window.confirm(`Delete ${person.name} ?`)) {
                  deletePhone(person.id, person.name, setPersons)
                }
                }
            }>Delete
              </button>
            </p>
          </div>
          )
      })
      
    )
    }
      
  
  }

export default Persons