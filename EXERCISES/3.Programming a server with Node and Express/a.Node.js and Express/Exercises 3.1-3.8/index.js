const express = require('express')

const app = express()


app.use(express.json())



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(resquest, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const toSend = `
    <div>
        <p>Phonebook has info for ${persons.length}</p>
        <p>${new Date().toUTCString()}</p>
    </div>`
    response.send(toSend)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const toShow = persons.filter(person => person.id === id)
    if(toShow.length === 0) {
        response.status(404)
        response.end()
    } else response.json(toShow)
})

app.delete('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.use(express.json)

app.post('/api/persons', (request, response) => {
  request.setTimeout(200)
  const person = request.body
  if (!person.name || !person.number) {
    response.status(400).json({
      error: 'person.name or person.number is missing'
    }).end()
  } else if (persons.some(p => p.name === person.name)) {
    response.status(400).json({
      error: "error name must be unique"
    })
  } else if (persons.some(p => p.number === person.number)) {
    response.status(400).json({
      error: 'error number must be unique'
    })
  } else {
    const ids = persons.map(person => person.id)
    const maxId = Math.max(...ids)
  
    const newPerson = {
      id: maxId + 1,
      name: person.name,
      number: person.number,
    }
    persons = [...persons, newPerson]
    response.status(201).json(newPerson)
  }
  
})


const PORT = 3001
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
}) 