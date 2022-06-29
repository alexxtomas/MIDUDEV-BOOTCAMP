const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { json } = require('express')



usersRouter.get('/', async (req ,res) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})
    res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
    const {id} = req.params

    const user = await User.findById(id)

    res.json(user)
})
usersRouter.post('/', async (req, res) => {


    try {
    const {username, name, password} = req.body
    console.log(password)

    if(!password || password.length < 3  )  return res.status(400).json({error: 'Password is missing or malformed'})

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
        username,
        name,
        passwordHash,
        
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
    } catch (err) {
        res.status(400).json(err.errors.username.message)
    }
    
})

module.exports = usersRouter