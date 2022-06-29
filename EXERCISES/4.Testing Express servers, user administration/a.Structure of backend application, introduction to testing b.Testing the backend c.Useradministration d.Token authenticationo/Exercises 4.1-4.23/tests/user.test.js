const { default: mongoose } = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../index')
const User = require('../models/User')
const {initialUsers, getUsers, getUserById} = require('./helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})


describe('POST /api/users', () => {
    test.skip('a valid username and password can be added in the database without issues', async () => {
        
        const user = {
            username: 'alex',
            password: 'alex'
        }

        const req = await getUsers()
        await api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const secReq = await getUsers()
        
        expect(secReq).toHaveLength(req.length + 1)

        const userAdded = secReq.find(u => u.username === user.username)

        expect(userAdded).toBeDefined()
        
        
    })
    test.skip('an username with lenght less than 3 characters cannot be added in the database and server sends appropiate message and status code', async () => {
        
        const user = {
            username: 'al',
            password: 'alex'
        }

        const req = await getUsers()
        const data = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        console.log(data.error.text)

        const secReq = await getUsers()
        
        expect(secReq).toHaveLength(req.length)

        const userAdded = secReq.find(u => u.username === user.username)

        const {text: errorMessage} = data.error

        expect(userAdded).not.toBeDefined()
        expect(errorMessage).toBe("\"Path `username` (`al`) is shorter than the minimum allowed length (3).\"")
    })

    test('a password with lenght less than 3 characters cannot be added in the database and server sends appropiate message and status code', async () => {
        
        const user = {
            username: 'alex',
            password: 'a'
        }

        const req = await getUsers()
        const data = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        console.log(data.error.text)

        const secReq = await getUsers()
        
        expect(secReq).toHaveLength(req.length)

        const userAdded = secReq.find(u => u.username === user.username)

        const {error: errorMessage} = data.body

        expect(userAdded).not.toBeDefined()
        expect(errorMessage).toBe("Password is missing or malformed")
        
        
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})