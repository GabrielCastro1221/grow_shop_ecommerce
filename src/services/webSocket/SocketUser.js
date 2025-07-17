const userRepository = require("../../repositories/UserRepository");
const { logger } = require("../../middlewares/logger.middleware");

class SocketUser {
    constructor(io) {
        this.io = io;
        this.initSocketEvents();
    }

    initSocketEvents() {
        this.io.on("connection", async (socket) => {
            logger.info("WebSocket usuarios conectado");

            try {
                const users = await userRepository.getAllUsers();
                socket.emit("usersList", users);
            } catch (error) {
                logger.error("Error al obtener usuarios al conectar:", error.message);
                socket.emit("error", "Error al obtener la lista de usuarios.");
            }

            socket.on("getAllUsers", async () => {
                try {
                    const users = await userRepository.getAllUsers();
                    socket.emit("usersList", users);
                } catch (error) {
                    socket.emit("error", "Error al obtener la lista de usuarios");
                }
            });

            socket.on("createUser", async (userData) => {
                try {
                    const newUser = await userRepository.createUser(userData);
                    socket.emit("userCreated", newUser);
                } catch (error) {
                    socket.emit("error", error.message);
                }
            });

            socket.on("updateUser", async ({ id, updateData }) => {
                try {
                    const updatedUser = await userRepository.updateUser(id, updateData);
                    socket.emit("userUpdated", updatedUser);
                } catch (error) {
                    socket.emit("error", "Error al actualizar usuario");
                }
            });

            socket.on("deleteUser", async (id) => {
                try {
                    const deletedUser = await userRepository.deleteUser(id);
                    socket.emit("userDeleted", deletedUser);
                } catch (error) {
                    socket.emit("error", "Error al eliminar usuario");
                }
            });

            socket.on("changeRole", async ({ id, newRole }) => {
                try {
                    const updatedUser = await userRepository.changeRole(id, newRole);
                    socket.emit("roleChanged", updatedUser);
                } catch (error) {
                    socket.emit("error", "Error al cambiar rol del usuario");
                }
            });

            socket.on("getUserProfile", async (id) => {
                try {
                    const userProfile = await userRepository.getUserProfile(id);
                    socket.emit("userProfile", userProfile);
                } catch (error) {
                    socket.emit("error", "Error al obtener perfil de usuario");
                }
            });

            socket.on("getOrders", async (userId) => {
                try {
                    const orders = await userRepository.getOrders(userId);
                    socket.emit("userOrders", orders);
                } catch (error) {
                    socket.emit("error", "Error al obtener órdenes del usuario");
                }
            });

            socket.on("subscribeToNewsletter", async (email) => {
                try {
                    const response = await userRepository.subscribeToNewsletter(email);
                    socket.emit("newsletterSubscribed", response);
                } catch (error) {
                    socket.emit("error", error.message);
                }
            });
        });
    }
}

module.exports = SocketUser;
