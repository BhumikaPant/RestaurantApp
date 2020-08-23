var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose= require('mongoose');
var session= require('express-session');
var FileStore= require('session-file-store')(session);



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter= require('./routes/dishRouter');
var leaderRouter= require('./routes/leaderRouter');
var promoRouter= require('./routes/promoRouter');


//database
const url="mongodb+srv://User:user@cluster0.tzr8k.mongodb.net/confusion?retryWrites=true&w=majority";
const connect= mongoose.connect(url);
connect.then((db)=>{
  console.log("connected to database server");

},(err)=>{
  console.log(err);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(session({
  name: 'session-id',
  secret: '12345-678',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth(req,res,next){

  if(!req.session.user){

    var err= new Error('You are not authenticated');
    res.setHeader('WWW.Authenticare','Basic');
    err.status=401;
    next(err);
    return;
  }
  else{
    if(req.session.user==='authenticated'){
      next();
    }
  else{
    var err= new Error('You are not authenticated');
    err.status=403;
    next(err);
  }
}
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));


app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);
app.use('/dishes', dishRouter);

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
