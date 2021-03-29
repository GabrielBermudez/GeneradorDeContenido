var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cookieSession = require('cookie-session')
var fileUpload = require('express-fileupload')

var indexRouter = require('./routes/index')
var adminRouter = require('./routes/admin')
var empresaRouter = require('./routes/empresa')
var noticiaRouter = require('./routes/noticia')
var clientRouter = require('./routes/client')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// server.js
app.use(cookieSession({
	name: 'session',
	keys: ['keyboard cat'],

	// Cookie Options
	maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(function(req,res,next){
	res.locals.session = req.session
	next()
})

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/admin', adminRouter)
app.use('/admin/empresa', empresaRouter)
app.use('/admin/noticia', noticiaRouter)
app.use('/client',clientRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
