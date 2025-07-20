const { logger } = require('../middlewares/logger.middleware');
const ProductRepository = require("../repositories/ProductRepository");
const UserRepository = require("../repositories/UserRepository");
const TicketRepository = require("../repositories/TicketRepository");
const CartRepository = require("../repositories/CartRepository");
const WishRepository = require("../repositories/WishlistRepository");
const ShippingRepository = require("../repositories/ShippingRepository");

class ViewsController {
    renderIndex(req, res) {
        try {
            res.render('index');
        } catch (error) {
            logger.error(`Error occurred while rendering index view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    async renderHome(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;

            const featured = await ProductRepository.getFeaturedProducts(page);
            const arrival = await ProductRepository.getNewArrive(page);

            res.render('home', {
                featured: featured.docs,
                featuredPagination: {
                    page: featured.page,
                    totalPages: featured.totalPages,
                    hasNextPage: featured.hasNextPage,
                    hasPrevPage: featured.hasPrevPage,
                    nextPage: featured.nextPage,
                    prevPage: featured.prevPage,
                },
                arrival: arrival.docs,
                arrivalPagination: {
                    page: arrival.page,
                    totalPages: arrival.totalPages,
                    hasNextPage: arrival.hasNextPage,
                    hasPrevPage: arrival.hasPrevPage,
                    nextPage: arrival.nextPage,
                    prevPage: arrival.prevPage,
                }
            });
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

    async renderProductDetail(req, res) {
        try {
            const { id } = req.params;
            const page = parseInt(req.query.page) || 1;
            const product = await ProductRepository.getProductById(id);
            const arrival = await ProductRepository.getNewArrive(page);

            res.render('productDetail', {
                product,
                arrival: arrival.docs,
                arrivalPagination: {
                    page: arrival.page,
                    totalPages: arrival.totalPages,
                    hasNextPage: arrival.hasNextPage,
                    hasPrevPage: arrival.hasPrevPage,
                    nextPage: arrival.nextPage,
                    prevPage: arrival.prevPage,
                }
            });
        } catch (error) {
            logger.error(`Error occurred while rendering productDetail view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    async renderCart(req, res) {
        try {
            const cartId = req.params.id;
            const cart = await CartRepository.getCartById(cartId);
            if (!cart) {
                return res.redirect("/page-not-found");
            }
            res.render("cart", { cart });
        } catch (error) {
            res.redirect("/page-not-found");
        }
    }

    async renderWishlist(req, res) {
        try {
            const wishId = req.params.id;
            const wish = await WishRepository.getWishlistById(wishId);
            if (!wish) {
                return res.redirect("/page-not-found");
            }
            res.render('wishlist', { wish });
        } catch (error) {
            logger.error(`Error occurred while rendering wishlist view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }

    async renderTicket(req, res) {
        try {
            const ticketId = req.params.id;
            const ticket = await TicketRepository.getTicketById(ticketId);
            if (!ticket) {
                return res.redirect("/page-not-found");
            }

            res.render('ticket', { ticket });
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
            const { page = 1, limit = 1000, sort, query, role, gender } = req.query;

            const products = await ProductRepository.getPaginatedProducts({
                page,
                limit,
                sort,
                query,
            });

            const users = await UserRepository.getUsers({
                page,
                role,
                gender,
            });

            const tickets = await TicketRepository.getTickets({
                page,
                limit,
            });

            if (products.productos.length === 0) {
                return res.status(404).json({ message: "No se encontraron productos" });
            }

            if (req.headers.accept?.includes('application/json')) {
                return res.json({ products, users, tickets });
            }

            res.render('profileAdmin', {
                products,
                users,
                tickets,
                limit,
                sort,
                query,
                role,
                gender,
                page,
            });
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