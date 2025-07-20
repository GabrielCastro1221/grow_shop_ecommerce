const WishlistRepository = require('../repositories/WishlistRepository');

class WishlistController {
    async addProductsToWishlist(req, res) {
        const wishlistId = req.params.wid;
        const productId = req.params.pid;

        try {
            const updatedWishlist = await WishlistRepository.addProductInWish(wishlistId, productId);
            res.redirect(`/wishlist/${wishlistId}`);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getProductsInWishlist(req, res) {
        const wishlistId = req.params.wid;
        try {
            const products = await WishlistRepository.getProductsInWishlist(wishlistId);

            if (!products) {
                return res.status(404).json({ error: "Wishlist no encontrada" });
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).send("Error al obtener productos de la wishlist");
        }
    }

    async deleteProductInWishlist(req, res) {
        const wishlistId = req.params.wid;
        const productId = req.params.pid;

        try {
            const updatedWishlist = await WishlistRepository.deleteProductInWish(wishlistId, productId);
            res.status(200).json({
                message: "Producto eliminado correctamente de la wishlist",
                wishlist: updatedWishlist
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async emptyWishlist(req, res) {
        const wishlistId = req.params.wid;
        try {
            const updateWishlist = await WishlistRepository.emptyWishlist(wishlistId);
            res.status(200).json({ "Wishlist vacía": updateWishlist });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new WishlistController();