const { logger } = require("../middlewares/logger.middleware");
const configObject = require("../config/enviroment.config");
require("../config/connection.config");
const { Server } = require("socket.io");

const socketModules = [
    require("../services/webSocket/SocketProducts"),
    require("../services/webSocket/SocketTicket"),
];

const serverListenMiddleware = (app) => {
    const PORT = configObject.server.port;

    const httpServer = app.listen(PORT, () => {
        try {
            logger.info(`Server is running on PORT:${PORT}`);
            logger.info(`Server is running on URL http://localhost:${PORT}`);
        } catch (error) {
            logger.error(`Error occurred while starting the server: ${error.message}`);
        }
    });
    
    const io = new Server(httpServer);
    socketModules.forEach((SocketClass) => new SocketClass(io));
};

module.exports = serverListenMiddleware;
