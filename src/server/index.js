// @flow

import express from 'express'
import compression from 'compression'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import stylus from 'stylus'

import { STATIC_PATH, WEB_PORT } from '../shared/config'
import { isProd } from '../shared/util'

import index from '../shared/routes/index'
import users from '../shared/routes/users'

const app: Object = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(stylus.middleware('public'))
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use((req: Object, res: Object, next: ({status?: number}) => void) => {
  let err: {status?: number} = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err: Error, req: Object, res: Object) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)'
    : '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})
