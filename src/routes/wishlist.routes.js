const { Router } = require('express');
const WishlistController = require('../controllers/WishlistController');

const router = Router();

router.post("/:wid/products/:pid", WishlistController.addProductsToWishlist);

router.get("/:wid", WishlistController.getProductsInWishlist);

router.delete("/:wid/products/:pid", WishlistController.deleteProductInWishlist);
router.delete("/:wid", WishlistController.emptyWishlist);

module.exports = router;
