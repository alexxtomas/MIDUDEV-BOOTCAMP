const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
        "id": 1,
        "content": "Hola buenos dias",
        "date": "2019-05-30",
        "important": true
    }, {
        "id": 2,
        "content": "Tengo que estudiar",
        "date": "2019-05-31",
        "important": false
    }, {
        "id": 3,
        "content": "Hola buenas tardes",
        "date": "2019-06-1",
        "important": true
    },
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })


app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note) response.json(note)
    else response.status(404).end()
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body
    if (!note.content) {
        response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = notes.map(note => note.id )
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: note.important === true ? note.important : false,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]
  
    
    response.status(201).json(newNote)
})






const PORT =  3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
