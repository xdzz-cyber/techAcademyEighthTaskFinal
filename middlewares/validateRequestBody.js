const createError = require('http-errors')

const validateRequestBody = (req, res, next) => {

    if (req.baseUrl === '/books' && req.method === 'POST' && !req.body.title) {
        return next(createError(400, 'Title required'))
    }

    if (req.baseUrl === '/reviews' && req.method === 'POST' && !req.body.comment) {
        return next(createError(400, 'Comment required'))
    }

    next()
}

module.exports = validateRequestBody