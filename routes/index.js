var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'History Scraper' });
});

router.post('/', function(req, res) {
  var waybackifiedUrl = req.body.waybackifiedUrl;
  console.log(waybackifiedUrl);
});

module.exports = router;
