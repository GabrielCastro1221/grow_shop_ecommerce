const userModel = require('../models/user.model');
const cartModel = require("../models/cart.model");
const wishlistModel = require("../models/wishlist.model");
const { createHash } = require("../utils/hash.util");

class UserRepository {
    async createUser(userData) {
        try {
            const existingUser = await userModel.findOne({ email: userData.email });
            if (existingUser) {
                throw new Error("El usuario ya esta registrado en la plataforma");
            }
            const hashedPassword = createHash(userData.password);
            const newCart = new cartModel();
            await newCart.save();
            const newWishlist = new wishlistModel();
            await newWishlist.save();
            const newUser = new userModel({
                ...userData,
                password: hashedPassword,
                cart: newCart._id,
                wishlist: newWishlist._id,
            });
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUsers({ page = 1, role, gender }) {
        try {
            const query = {};

            if (role) query.role = role;
            if (gender) query.gender = gender;

            const options = {
                page: parseInt(page),
                limit: 10,
                sort: { createdAt: -1 },
                lean: true,
            };

            const result = await userModel.paginate(query, options);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener los usuarios: ${error.message}`);
        }
    }

    async updateUser(id, updateData) {
        try {
            const user = await userModel.findById(id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }

            Object.assign(user, updateData);
            await user.save();
            return user;
        } catch (error) {
            throw new Error(`Error al actualizar el usuario: ${error.message}`);
        }
    }

    async deleteUser(id) {
        try {
            const user = await userModel.findByIdAndDelete(id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async changeRole(id, newRole) {
        try {
            const user = await userModel.findById(id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            const updatedUser = await userModel.findByIdAndUpdate(
                id,
                { role: newRole },
                { new: true }
            );
            return updatedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async subscribeToNewsletter(email) {
        try {
            if (!email) throw new Error("El email es requerido.");

            const user = await userModel.findOne({ email });
            if (!user) throw new Error("Usuario no encontrado.");

            if (user.newsletter === "suscrito") {
                throw new Error("Ya estas suscrito al boletin informativo.");
            }

            user.newsletter = "suscrito";
            await user.save();
            return { message: "Suscripción al boletin informativo exitosa." };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new UserRepository();
