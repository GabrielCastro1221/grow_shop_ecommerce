const { logger } = require('../middlewares/logger.middleware');

class ViewsController {
    renderIndex(req, res) {
        try {
            res.render('index');
        } catch (error) {
            logger.error(`Error occurred while rendering index view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    renderHome(req, res) {
        try {
            res.render('home');
        } catch (error) {
            logger.error(`Error occurred while rendering home view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    renderStore(req, res) {
        try {
            res.render('store');
        } catch (error) {
            logger.error(`Error occurred while rendering store view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    renderProductDetail(req, res) {
        try {
            res.render('productDetail');
        } catch (error) {
            logger.error(`Error occurred while rendering productDetail view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    renderCart(req, res) {
        try {
            res.render('cart');
        } catch (error) {
            logger.error(`Error occurred while rendering cart view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    renderWishlist(req, res) {
        try {
            res.render('wishlist');
        } catch (error) {
            logger.error(`Error occurred while rendering wishlist view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    renderTicket(req, res) {
        try {
            res.render('ticket');
        } catch (error) {
            logger.error(`Error occurred while rendering ticket view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    renderProfileUser(req, res) {
        try {
            res.render('profileUser');
        } catch (error) {
            logger.error(`Error occurred while rendering profileUser view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    renderProfileAdmin(req, res) {
        try {
            res.render('profileAdmin');
        } catch (error) {
            logger.error(`Error occurred while rendering profileAdmin view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }
    
    renderPageNotFound(req, res) {
        try {
            res.render('pageNotFound');
        } catch (error) {
            logger.error(`Error occurred while rendering pageNotFound view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    renderAccessDenied(req, res) {
        try {
            res.render('accessDenied');
        } catch (error) {
            logger.error(`Error occurred while rendering accessDenied view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new ViewsController();