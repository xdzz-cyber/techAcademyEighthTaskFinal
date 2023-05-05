var express = require('express');
var router = express.Router();
const books = require("../data/books");
const createError = require("http-errors");
const validateRequestBody = require("../middlewares/validateRequestBody");

// Create router-level middleware. Validate if review does not exist.
router.use('/:id', function(req, res, next) {
    const review = books.find(book => book.reviews.some(review => review.id === parseInt(req.params.id)));
    if (!review && (req.method === 'GET' || req.method === 'DELETE')) {
        return next(createError(404, 'The review with the given book ID was not found.'))
    }
    next();
})


// Get all reviews route by book id
router.get('/:id', function(req, res, next) {
    const reviews = books.find(book => book.reviews.some(review => review.id === parseInt(req.params.id))).reviews;
    res.send(reviews);
})

// Create new review for the book route
router.post('/:bookId', validateRequestBody, function(req, res, next) {
    const book = books.find(book => book.id === parseInt(req.params.bookId));
    const review = {id: Math.floor(Math.random() * 1000 + 1), comment: req.body.comment} //new Review(req.body.comment);
    book.reviews.push(review);
    res.send(review);
})

// Delete review by id route and find it by review id in books
router.delete('/:id', function(req, res, next) {
    const book = books.find(book => book.reviews.some(review => review.id === parseInt(req.params.id)))
    const review = book.reviews.find(review => review.id === parseInt(req.params.id));
    const index = book.reviews.indexOf(review);
    book.reviews.splice(index, 1);
    res.send(review);
})


module.exports = router;
