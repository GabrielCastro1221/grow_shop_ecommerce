const configObject = require("../config/enviroment.config");
const jwt = require("jsonwebtoken");

generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        configObject.auth.jwt_secret,
        {
            expiresIn: "15d",
        }
    );
};

module.exports = { generateToken };
