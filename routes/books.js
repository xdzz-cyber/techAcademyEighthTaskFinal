var express = require('express');
var router = express.Router();
var books = require('../data/books');
const createError = require("http-errors");
const validateRequestBody = require("../middlewares/validateRequestBody");


// Create router-level middleware. Validate if book does not exist.
router.use('/:id', function(req, res, next) {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book && (req.method === 'GET' || req.method === 'PUT')) {
        return next(createError(404, 'The book with the given ID was not found.'))
    }
    next();
})


// Get all books route
router.get('/', function(req, res, next) {
    res.send(books);
})

// Create new book route
router.post('/', validateRequestBody, function(req, res, next) {
    const book = {id: Math.floor(Math.random() * 1000 + 1), title: req.body.title, reviews: req.body.reviews}//new Book(req.body.title, req.body.reviews);
    books.push(book);
    console.log(req.body)
    res.send(book);
})

// Get book by id route
router.get('/:id', function(req, res, next) {
    const book = books.find(book => book.id === parseInt(req.params.id));
    res.send(book);
})

// Update book title by id route
router.put('/:id', function(req, res, next) {
    const book = books.find(book => book.id === parseInt(req.params.id));
    book.title = req.body.title;
    res.send(book);
})


module.exports = router;
