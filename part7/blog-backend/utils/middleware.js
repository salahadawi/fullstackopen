
const errorHandler = (error, request, response, next) => {
  if (process.env.NODE_ENV !== 'test')
    console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid authorization token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'authorization token expired' })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    request.token = authorization.substring(7)
  else
    request.token = null
  next()
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
}