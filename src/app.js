const express = require('express');
const parserMiddleware = require("./middlewares/parser.middleware");
const hbsMiddleware = require("./middlewares/hbs.middleware");
const routesMiddleware = require("./middlewares/routes.middleware");
const serverMiddleware = require("./middlewares/server.middleware");

const app = express();

parserMiddleware(app);
hbsMiddleware(app);
routesMiddleware(app);
serverMiddleware(app);
