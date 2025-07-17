const ticketModel = require("../models/ticket.model");
const userModel = require("../models/user.model");
const { logger } = require("../middlewares/logger.middleware");

class TicketRepository {
    async createTicket(data) {
        const ticket = new ticketModel(data);
        await ticket.save();
        return ticket;
    }

    async findUserByCartId(cartId) {
        return await userModel.findOne({ cart: cartId });
    }

    async addTicketToUser(userId, ticketId) {
        const user = await userModel.findById(userId);
        if (!user) return null;
        user.tickets.push(ticketId);
        await user.save();
        return user;
    }

    async getTickets() {
        try {
            const tickets = await ticketModel.find({}).populate("purchaser").lean();
            if (tickets.length === 0) {
                logger.warning("No se encontraron tickets");
            }
            return tickets;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getTicketById(id) {
        try {
            const ticket = await ticketModel
                .findById(id)
                .populate("purchaser", "last_name name email phone address city")
                .populate({
                    path: "cart",
                    populate: {
                        path: "products.product",
                        select: "image title price",
                    },
                })
                .lean();
            if (!ticket) {
                throw new Error("Ticket no encontrado");
            }
            return ticket;
        } catch (error) {
            logger.error("Error al obtener ticket:", error.message);
            throw new Error(error.message);
        }
    }

    async deleteTicket(id) {
        try {
            const ticket = await ticketModel.findByIdAndDelete(id);
            if (!ticket) {
                throw new Error("Ticket no encontrado");
            }
            return ticket;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async payTicket(id) {
        try {
            const ticket = await ticketModel.findById(id);
            if (!ticket) {
                throw new Error("Ticket no encontrado");
            }
            ticket.status = "pagado";
            await ticket.save();
            return ticket;
        } catch (error) {
            logger.error("Error al actualizar el estado del ticket:", error.message);
            throw new Error(error.message);
        }
    }

    async payCancel(id) {
        try {
            const ticket = await ticketModel.findById(id);
            if (!ticket) {
                throw new Error("Ticket no encontrado");
            }
            ticket.status = "cancelado";
            await ticket.save();
            return ticket;
        } catch (error) {
            logger.error("Error al actualizar el estado del ticket:", error.message);
            throw new Error(error.message);
        }
    }

    async payProcess(id) {
        try {
            const ticket = await ticketModel.findById(id);
            if (!ticket) {
                throw new Error("Ticket no encontrado");
            }
            ticket.status = "en proceso";
            await ticket.save();
            return ticket;
        } catch (error) {
            logger.error("Error al actualizar el estado del ticket:", error.message);
            throw new Error(error.message);
        }
    }
}

module.exports = new TicketRepository();