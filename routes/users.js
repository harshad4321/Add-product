var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/productHelpers')





/* GET users listing. */
router.get("/", (req, res) => {
  productHelpers.getAllProducts().then((products) => {
    res.render("users/view-products", { products });
  });
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


router.get('/delete-product/:id', (req, res) => {
  let proId = req.params.id
  productHelpers.deleteProduct(proId).then((response) => {
    res.redirect('/admin/')
  })
})
router.get('/edit-product/:id', async (req, res) => {
  let product = await productHelpers.getProductDetails(req.params.id)
  res.render('admin/edit-product', { product })
})
router.post('/edit-product/:id', (req, res) => {
  let id = req.params.id  // image id 
  productHelpers.updateProduct(req.params.id, req.body).then(() => {
    res.redirect('/admin')
    if (req.files && req.files.Image) {
      const imageName = id.jpg;
      let image = req.files.Image
      image.mv('./public/product-images/' + id + '.jpg')
    }
    else {
      console.log(' image is not')
    }
  })
})



module.exports = router;
