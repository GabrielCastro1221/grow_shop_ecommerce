const { Router } = require('express');
const CartController = require('../controllers/CartController');

const router = Router();

router.post("/:cid/products/:pid", CartController.addProductsToCart);

router.get("/:cid", CartController.getProductsToCart);

router.delete("/:cid/products/:pid", CartController.deleteProductToCart);
router.delete("/:cid", CartController.emptyCart);

module.exports = router;
