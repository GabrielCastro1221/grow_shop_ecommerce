const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const exphbs = require("express-handlebars");

const configObject = require('./config/enviroment.config');
const { logger } = require('./middlewares/logger.middleware');

const viewsRouter = require('./routes/views.routes');

const app = express();
const PORT = configObject.server.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use('/', viewsRouter);

app.listen(PORT, () => {
    try {
        logger.info(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        logger.error(`Error occurred while starting the server: ${error.message}`);
    }
});