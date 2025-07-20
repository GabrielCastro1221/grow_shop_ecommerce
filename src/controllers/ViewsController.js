const { logger } = require('../middlewares/logger.middleware');
const ProductRepository = require("../repositories/ProductRepository")
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

    async renderProfileAdmin(req, res) {
        try {
            const { page, limit, sort, query } = req.query;
            const products = await ProductRepository.getPaginatedProducts({
                page,
                limit,
                sort,
                query,
            });

            if (products.productos.length === 0) {
                return res.status(404).json({ message: "No se encontraron productos" });
            }

            if (req.headers.accept?.includes('application/json')) {
                return res.json(products);
            }

            res.render('profileAdmin', { products, limit, sort, query, page });
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

    renderBlog(req, res) {
        try {
            res.render('blog');
        } catch (error) {
            logger.error(`Error occurred while rendering blog view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    renderAbout(req, res) {
        try {
            res.render('about');
        } catch (error) {
            logger.error(`Error occurred while rendering about view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    renderContact(req, res) {
        try {
            res.render('contact');
        } catch (error) {
            logger.error(`Error occurred while rendering contact view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    renderEmailConfirm(req, res) {
        try {
            res.render('emailConfirm');
        } catch (error) {
            logger.error(`Error occurred while rendering email confirm view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new ViewsController();