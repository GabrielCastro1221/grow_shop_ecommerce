const TicketRepository = require("../repositories/TicketRepository");
const CartRepository = require("../repositories/CartRepository");
const { ticketNumberRandom } = require("../utils/cart.util");
const { logger } = require("../middlewares/logger.middleware");
const mailer = require("../services/mailer/nodemailer.service");

class TicketController {
    async finishPurchase(req, res) {
        const cartId = req.params.cid;
        const { amount, shipping, subtotal } = req.body;
        try {
            const cart = await CartRepository.getProductsInCart(cartId);
            const user = await TicketRepository.findUserByCartId(cartId);
            if (!cart || !user) {
                return res
                    .status(404)
                    .json({ error: "Carrito o usuario no encontrado" });
            }
            const productsData = Array.isArray(cart.products)
                ? cart.products.map((product) => ({
                    productId: product.product._id,
                    title: product.product.title,
                    price: product.product.price,
                    quantity: product.quantity,
                }))
                : [];

            const ticketData = {
                code: ticketNumberRandom(),
                amount,
                shipping,
                subtotal,
                purchaser: user._id,
                cart: cartId,
                purchase_datetime: new Date(),
                products: productsData,
            };
            const ticket = await TicketRepository.createTicket(ticketData);
            await TicketRepository.addTicketToUser(user._id, ticket._id);
            await CartRepository.emptyCart(cartId);
            await mailer.SendPurchaseConfirmation(user.email, ticketData);
            res.status(201).json({ _id: ticket._id });
        } catch (error) {
            logger.error(error.message);
            res
                .status(500)
                .json({ error: "Error al realizar la compra, intenta nuevamente" });
        }
    }

    async getTicketById(req, res) {
        const { id } = req.params;
        try {
            const Ticket = await TicketRepository.getTicketById(id);
            res
                .status(200)
                .json({ message: "Ticket", ticket: Ticket });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteTicket(req, res) {
        const { id } = req.params;
        try {
            const deleteTicket = await TicketRepository.deleteTicket(id);
            res
                .status(200)
                .json({ message: "Ticket eliminado", ticket: deleteTicket });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async payTicket(req, res) {
        const id = req.params.id;
        try {
            const updatedTicket = await TicketRepository.payTicket(id);
            res.status(200).json({
                message: "El estado del ticket se actualizó a pagado",
                ticket: updatedTicket,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || "Error al cambiar el estado del ticket",
            });
        }
    }

    async cancelTicket(req, res) {
        const id = req.params.id;
        try {
            const updatedTicket = await TicketRepository.payCancel(id);
            res.status(200).json({
                message: "El estado del ticket se actualizó a cancelado",
                ticket: updatedTicket,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || "Error al cambiar el estado del ticket",
            });
        }
    }

    async processTicket(req, res) {
        const id = req.params.id;
        try {
            const updatedTicket = await TicketRepository.payProcess(id);
            res.status(200).json({
                message: "El estado del ticket se actualizó a en proceso",
                ticket: updatedTicket,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || "Error al cambiar el estado del ticket",
            });
        }
    }
}

module.exports = new TicketController();
