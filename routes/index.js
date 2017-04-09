// @flow

import express from 'express'
var router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'History Scraper' })
})

router.post('/', (req) => {
  let waybackifiedUrl: string = req.body.waybackifiedUrl
  console.log(waybackifiedUrl)
})

export default router
