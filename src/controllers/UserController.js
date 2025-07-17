const UserRepository = require('../repositories/UserRepository');

class UserController {
    async createUser(req, res) {
        try {
            const userData = req.body;
            await UserRepository.createUser(userData);
            res.status(200).json({ message: "Usuario creado exitosamente", user: userData });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUsers(req, res) {
        try {
            const { page, role, gender } = req.query;
            const users = await UserRepository.getUsers({ page, role, gender });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        try {
            const updatedUser = await UserRepository.updateUser(id, req.body);
            res.status(200).json({
                message: "Usuario actualizado correctamente",
                user: updatedUser
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const deletedUser = await UserRepository.deleteUser(id);
            res
                .status(200)
                .json({ message: "Usuario eliminado", usuario: deletedUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async changeRolAdmin(req, res) {
        const { id } = req.params;
        try {
            const updatedUser = await UserRepository.changeRole(id, "admin");
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async changeRolUser(req, res) {
        const { id } = req.params;
        try {
            const updatedUser = await UserRepository.changeRole(id, "usuario");
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async subscribeToNewsletter(req, res) {
        try {
            const { email } = req.body;
            const result = await UserRepository.subscribeToNewsletter(email);
            res.status(200).json(result);
        } catch (error) {
            if (
                error.message === "El email es requerido." ||
                error.message === "Usuario no encontrado." ||
                error.message === "Ya estas suscrito al boletin informativo."
            ) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: "Error del servidor." });
        }
    }

    async getUserProfile(req, res) {
        const userId = req.user._id;
        try {
            const user = await UserRepository.getUserProfile(userId);
            const { password, ...rest } = user._doc;
            res.status(200).json({
                success: true,
                message: "Información del perfil obtenida exitosamente",
                data: { ...rest },
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: "Error al obtener la información del perfil",
            });
        }
    }
}

module.exports = new UserController();