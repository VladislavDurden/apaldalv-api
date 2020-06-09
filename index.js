const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');
const DB_LOGIN = 'admin';
const DB_PASSWORD = 'wbMuYre6';
const DB_NAME = 'apaldalv';
const uri = `mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@cluster0-1qm9j.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&useUnifiedTopology=true`;

const authRouts = require('./routes/auth');
const app = express();

const DB = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })};
DB().then(() => {
  console.log('DB connected');
}).catch((err) => {
    console.log('Error while connecting to DB:', err);
});

app.use(logger('dev'));
app.use(express.json({ extended: true}));
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouts);

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
  res.render('error');
});

module.exports = app;
