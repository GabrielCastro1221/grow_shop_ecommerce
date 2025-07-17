const userModel = require("../models/user.model");
const { generateToken } = require("../utils/generateToken.util");
const { createHash, isValidPassword } = require("../utils/hash.util");
const userR = require("../repositories/UserRepository");
const mailer = require("../services/mailer/nodemailer.service");

class AuthController {
    register = async (req, res) => {
        try {
            const userData = req.body;
            await userR.createUser(userData);
            await mailer.userRegister(userData);
            await mailer.notifyAdminOnUserRegister(userData.email);
            res.status(201).json({ message: "Registro exitoso" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            const isPasswordMatch = isValidPassword(password, user);
            if (!isPasswordMatch) {
                return res.status(400).json({ message: "Credenciales incorrectas" });
            }

            const token = generateToken(user);
            const { password: userPassword, ...rest } = user._doc;

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60,
            });

            res.status(200).json({
                message: "Inicio de sesión exitoso",
                data: {
                    ...rest,
                    role: user.role,
                    token,
                },
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = new AuthController();