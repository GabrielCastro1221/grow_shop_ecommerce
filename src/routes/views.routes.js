const { Router } = require('express');
const viewsController = require('../controllers/ViewsController');

const router = Router();

router.get("/page-not-found", viewsController.renderPageNotFound);
router.get("/acceso-denegado", viewsController.renderAccessDenied);
router.get("/", viewsController.renderHome);
router.get('/login', viewsController.renderIndex);
router.get("/perfil-usuario", viewsController.renderProfileUser);
router.get("/perfil-admin", viewsController.renderProfileAdmin);
router.get("/tienda", viewsController.renderStore);
router.get("/tienda/:id", viewsController.renderProductDetail);
router.get("/cart/:id", viewsController.renderCart);
router.get("/checkout/:id", viewsController.renderTicket);
router.get("/wishlist/:id", viewsController.renderWishlist);

module.exports = router;
