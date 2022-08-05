module.exports = (err, req, res, next) => {
  console.error(err)
  if (err.name === 'ValidationError')
    res.status(400).json({ error: 'Error in the post request validation' })
  else if (err.name === 'CastError')
    res.status(400).json({ error: 'id used is malformed' })
  else if (err.name === 'JsonWebTokenError')
    res.status(401).json({ error: 'Token is missing or invalid' })
  else res.status(500)
}
