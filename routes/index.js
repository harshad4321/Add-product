var express = require('express');
var router = express.Router()

var productHelpers = require('../helpers/productHelpers')


/* GET home page. */
router.get('/', function (req, res, next) {
  productHelpers.getAllProducts().then((products) => {
    res.render('index', { title: 'Node js project', products });
  });
});



module.exports = router;
