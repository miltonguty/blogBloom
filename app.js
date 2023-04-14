//
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const photosRouter = require('./routes/photos')
const instagramRouter = require('./routes/instagram')
const helmet = require('helmet')
// const videosRouter = require('./routes/videos')
const usersRouter = require('./routes/users')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    frameguard: false
  })
)

app.use('/instagram', instagramRouter)
app.use('/', indexRouter)
app.use('/photos/', photosRouter)
/* app.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>')
}) */
/* app.use((req, res, next) => {
  res.status(404).render('404', {})
}) */
// app.use('/videos', videosRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
/* app.use((req, res, next) => {
  next(createError(404))
}) */

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
