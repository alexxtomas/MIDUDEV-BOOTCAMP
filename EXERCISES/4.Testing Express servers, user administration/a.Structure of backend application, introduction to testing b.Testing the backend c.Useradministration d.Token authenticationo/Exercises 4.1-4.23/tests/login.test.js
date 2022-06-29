const supertest = require('supertest')
const {app} = require('../index')
const User = require('../models/User')
const {initialUsers} = require('./helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    for(const user of initialUsers) {
        await api.post('/api/users')
                 .send(user)
    }
})

describe('POST /api/login', () => {
    test('valid username and password can login and server send the token ', async () => {
        const validCredentiales = {username: 'admin', password: 'admin'}
        const data = await api
            .post('/api/login')
            .send(validCredentiales)
            .expect(200)
        const {token} = data.body
        expect(token).toBeDefined()
    })

    test('invalid username and password cannot login and server does not send the token ', async () => {
        const validCredentiales = {username: 'invalidusername', password: 'invalidpassword'}
        const data = await api
            .post('/api/login')
            .send(validCredentiales)
            .expect(401)
        const {token} = data.body
        expect(token).not.toBeDefined()
        
        
    })
})