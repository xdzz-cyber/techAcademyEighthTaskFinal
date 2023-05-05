var createError = require('http-errors');
var express = require('express');

var booksRouter = require('./routes/books');
var reviewsRouter = require('./routes/reviews');

var app = express();
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/books', booksRouter);
app.use('/reviews', reviewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
    // res.render('error');
});

app.listen(port, () => {
    console.log(`Server is listening on port - ${port}...`)
})
