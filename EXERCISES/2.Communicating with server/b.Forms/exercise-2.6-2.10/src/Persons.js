const Persons = ({persons, filter}) => {
    if (filter === '') return persons.map(person=> <p key={person.id}>{person.name} {person.number}</p>)
    else {
      const filtredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      return filtredPersons.map(filtredPerson => <p key={filtredPerson.id}>{filtredPerson.name} {filtredPerson.number}</p>)
    }
      
  
  }

export default Persons