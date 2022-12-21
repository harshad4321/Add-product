var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/productHelpers')





/* GET users listing. */
router.get("/", (req, res) => {


  let products = [
    {
      Name: 'sdsds',
    }
  ]



  res.render("users/view-products", { products });


});

router.get("/add-product", (req, res) => {
  res.render("users/add-product");
});


router.post("/add-product", (req, res, next) => {


  productHelpers.addProduct(req.body, (id) => {

    let image = req.files.Image;
    const imageName = id.jpg;

    image.mv('./public/product-images/' + id + '.jpg', (err) => {
      if (!err) {
        res.render("users/add-product");
        res.redirect('/users')
      } else {
        console.log(err);
      }
    });
  });
});



module.exports = router;
