const wishlistModel = require('../models/wishlist.model');

class WishlistRepository {
    async addProductInWish(wishId, productId) {
        try {
            const wishlist = await wishlistModel.findById(wishId);
            if (!wishlist) throw new Error("Wishlist no encontrada");

            const alreadyAdded = wishlist.products.some(
                (item) => item.product.toString() === productId
            );

            if (alreadyAdded) {
                throw new Error("El producto ya ha sido agregado a la wishlist");
            }

            wishlist.products.push({ product: productId });
            wishlist.markModified("products");
            await wishlist.save();

            return wishlist;
        } catch (error) {
            throw new Error("Error al agregar producto a la wishlist: " + error.message);
        }
    }

    async getProductsInWishlist(wishId) {
        try {
            const wishlist = await wishlistModel.findById(wishId);
            if (!wishlist) {
                logger.warning("La wishlist no existe");
                return null;
            }
            return wishlist.products;
        } catch (error) {
            throw new Error("Error al obtener los productos de la wishlist: " + error.message);
        }
    }

    async deleteProductInWish(wishId, productId) {
        try {
            const wishlist = await wishlistModel.findById(wishId);
            if (!wishlist) throw new Error("Wishlist no encontrada");

            const initialLength = wishlist.products.length;

            wishlist.products = wishlist.products.filter(
                (item) => item.product.toString() !== productId
            );

            if (wishlist.products.length === initialLength) {
                throw new Error("El producto no está en la wishlist");
            }

            wishlist.markModified("products");
            await wishlist.save();
            return wishlist;
        } catch (error) {
            throw new Error("Error al eliminar producto de la wishlist: " + error.message);
        }
    }

    async emptyWishlist(wishId) {
        try {
            const wishlist = await wishlistModel.findByIdAndUpdate(
                wishId,
                { products: [] },
                { new: true }
            );
            if (!wishlist) {
                throw new Error("Wishlist no encontrada");
            }
            return wishlist;
        } catch (error) {
            throw new Error("Error al vaciar wishlist: " + error.message);
        }
    }

    async emptyWishlist(wishId) {
        try {
            const wishlist = await wishlistModel.findByIdAndUpdate(
                wishId,
                { products: [] },
                { new: true }
            );
            if (!wishlist) {
                throw new Error("Wishlist no encontrada");
            }
            return wishlist;
        } catch (error) {
            throw new Error("Error al vaciar wishlist: " + error.message);
        }
    }

    async getWishlistById(id) {
        try {
            const wishlist = await wishlistModel
                .findById(id)
                .populate("products.product", "_id title price image")
                .lean();
            if (!wishlist) {
                throw new Error("Wishlist no encontrada");
            }
            return wishlist;
        } catch (error) {
            logger.error("Error al obtener wishlist:", error.message);
            throw new Error(error.message);
        }
    }
}

module.exports = new WishlistRepository();