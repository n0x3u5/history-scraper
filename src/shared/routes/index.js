// @flow

import express from 'express'
import renderApp from '../../server/render-app'
import { APP_NAME } from '../config'

var router: Object = express.Router()

/* GET home page. */
router.get('/', (req: Object, res: Object) => {
  res.send(renderApp(APP_NAME))
})

router.post('/', (req: Object) => {
  let waybackifiedUrl: string = req.body.waybackifiedUrl
  console.log(waybackifiedUrl)
})

export default router
