const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const authorization = req.get('authorization')
    let token = null
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) token = authorization.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken) return res.status(401).json({error: 'token is missing or invalid'})

    const {id: userId} = decodedToken

    req.userId = userId

    next()
}