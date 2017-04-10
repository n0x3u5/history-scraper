// @flow

import express from 'express'
var router: Object = express.Router()

/* GET users listing. */
router.get('/', (req: Object, res: Object) => {
  res.send('respond with a resource')
})

export default router
